package com.main.api.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.dao.*;
import com.main.api.dto.ProductImageDto;
import com.main.api.dto.ProductDto;
import com.main.api.dto.ProductQuantityDto;
import com.main.api.entity.*;
import com.main.api.model.ProductModel;
import com.main.api.specification.ProductSpecification;
import com.main.api.utils.FileManage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NoResultException;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ProductController {
    private final ProductRepository productRepository;
    private final Validator validator;
    private final ProductCategoryRepository productCategoryRepository;
    private final ImageRepository productImageRepository;
    private final NetWeightRepository netWeightRepository;
    private final ProductQuantityRepository productQuantityRepository;
    private static final String storageName = "products";
    private static final int maxImageAllowUpload = 5;

    @Autowired
    public ProductController(ProductRepository productRepository, Validator validator, ProductCategoryRepository productCategoryRepository, ImageRepository productImageRepository, NetWeightRepository netWeightRepository, ProductQuantityRepository productQuantityRepository) {
        this.productRepository = productRepository;
        this.validator = validator;
        this.productCategoryRepository = productCategoryRepository;
        this.productImageRepository = productImageRepository;
        this.netWeightRepository = netWeightRepository;
        this.productQuantityRepository = productQuantityRepository;
    }

    @PostMapping("/create-product")
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<ProductDto> createProduct(@RequestParam("createProductData") String createProduct,
                                                    @RequestParam("productImages") List<MultipartFile> productImages, @RequestParam("productQuantityList") String productQuantities) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        ProductModel.CreateProduct createProductData = mapper.readValue(createProduct, ProductModel.CreateProduct.class);
        Set<ConstraintViolation<ProductModel.CreateProduct>> constraintViolation = validator.validate(createProductData);
        List<ProductModel.ProductQuantityList> productQuantityListData = mapper.readValue(productQuantities, new TypeReference<List<ProductModel.ProductQuantityList>>() {
        });

        if (!constraintViolation.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintViolation.stream().forEach((error) -> {
                String message = error.getMessage();
                errors.append(message + ";");
            });
            throw new NoResultException(errors.toString());
        }

        if (productImages.size() > maxImageAllowUpload) {
            throw new NoResultException("Only " + maxImageAllowUpload + " product images are allowed.");
        }
        if (Objects.requireNonNull(productImages.get(0).getOriginalFilename()).isEmpty()) {
            throw new NoResultException("Product image(s) must have at least 1 image.");
        }
        if (productQuantityListData.isEmpty()) {
            throw new NoResultException("Product quantity list must have at least 1 item.");
        }

        try {
            ProductCategory productCategory = productCategoryRepository.findById(createProductData.getCategoryId()).get();
            Product productData = new Product(createProductData.getDescription(), createProductData.getProductName(), createProductData.getProductPrice());
            productData.setCategory(productCategory);

            Product saveProductResponse = productRepository.save(productData);
            if (saveProductResponse.getProductId() != 0) {
                // INFO: save product images
                List<ProductImageDto> images = new ArrayList<>();
                productImages.stream().forEach(image -> {
                    ProductImage uploadProductImageResponse = null;
                    try {
                        uploadProductImageResponse = handleUploadImage(image, saveProductResponse);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    if (uploadProductImageResponse != null) {
                        images.add(new ProductImageDto(uploadProductImageResponse.getImageId(), uploadProductImageResponse.getImageName(), uploadProductImageResponse.getStorageName()));
                    }
                });

                // INFO: save product quantity
                List<ProductModel.ProductQuantityList> productQuantityListArray = new ArrayList<>();
                for (ProductModel.ProductQuantityList item : productQuantityListData) {
                    if (productQuantityListArray.stream().anyMatch(product -> Objects.equals(product.getNetWeightId(), item.getNetWeightId()))) {
                        throw new NoResultException("Net weight id [" + item.getNetWeightId() + "] is duplicated.");
                    } else {
                        productQuantityListArray.add(item);
                    }
                }
                List<ProductQuantityDto> productQuantityList = new ArrayList<>();
                productQuantityListArray.stream().forEach(quantity -> {
                    NetWeight netWeightData = netWeightRepository.findById(quantity.getNetWeightId()).get();
                    if (netWeightData != null) {
                        ProductQuantity saveProductQuantityResponse = handleSaveProductQuantity(saveProductResponse, netWeightData, quantity.getQuantity());
                        if (saveProductQuantityResponse != null) {
                            productQuantityList.add(new ProductQuantityDto(saveProductQuantityResponse.getQuantityId(), saveProductQuantityResponse.getQuantity(), saveProductQuantityResponse.getNetWeight()));
                        }
                    } else {
                        throw new NoResultException("Net weight does not exist.");
                    }
                });

                return new ResponseEntity<>(new ProductDto(saveProductResponse, images, saveProductResponse.getCategory(), productQuantityList), HttpStatus.CREATED);
            }
            throw new NoResultException("Create category failed.");
        } catch (Exception ex) {
            throw new NoResultException(ex.getMessage());
        }
    }

    @GetMapping("/get-all-product")
    public ResponseEntity<List<ProductDto>> getAllProduct() {
        List<Product> productList = productRepository.findAll();
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product, handleGenerateImageDto(product.getProductImages()), product.getCategory(), generateProductQuantityDto(new ArrayList<>(product.getProductQuantities())))).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @GetMapping("/product-search")
    public ResponseEntity<List<ProductDto>> getProductByCategory(@RequestParam(value = "categorySlug", defaultValue = "all") String categorySlug) {
        List<Product> productList = productRepository.findAll(Specification.where(ProductSpecification.filterByCategorySlug(categorySlug)));
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product, handleGenerateImageDto(product.getProductImages()), product.getCategory(), generateProductQuantityDto(new ArrayList<>(product.getProductQuantities())))).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/remove-product/{productId}")
    public ResponseEntity<String> removeProduct(@PathVariable("productId") Long productId) {
        Product checkProductExist = getProductById(productId);
        if (checkProductExist == null) {
            throw new NoResultException("Product does not exist.");
        } else {
            checkProductExist.getProductImages().stream().forEach(productImage -> {
                try {
                    FileManage.handleRemoveImage(productImage.getStorageName(), productImage.getImageName());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            productRepository.delete(checkProductExist);
            return new ResponseEntity<>("Removed product.", HttpStatus.OK);
        }
    }

    @GetMapping("/get-product-by-id/{productId}")
    public ResponseEntity<ProductDto> getProductDetail(@PathVariable("productId") Long productId) {
        Product productData = getProductById(productId);
        if (productData != null) {
            ProductDto productDto = new ProductDto(productData, handleGenerateImageDto(productData.getProductImages()), productData.getCategory(), generateProductQuantityDto(new ArrayList<>(productData.getProductQuantities())));
            return new ResponseEntity<>(productDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/update-product")
    public ResponseEntity<ProductDto> updateProduct(@RequestParam("productImages") @Nullable List<MultipartFile> productImages, @RequestParam("productUpdateData") String productUpdateData, @RequestParam("productQuantityList") String productQuantities) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ProductModel.UpdateProduct updateProductData = mapper.readValue(productUpdateData, ProductModel.UpdateProduct.class);
        Set<ConstraintViolation<ProductModel.UpdateProduct>> constraintViolations = validator.validate(updateProductData);
        List<ProductModel.ProductQuantityList> productQuantityListData = mapper.readValue(productQuantities, new TypeReference<List<ProductModel.ProductQuantityList>>() {
        });

        if (!constraintViolations.isEmpty()) {
            StringBuilder errors = new StringBuilder();
            constraintViolations.stream().forEach((error) -> {
                String message = error.getMessage();
                errors.append(message + ";");
            });
            throw new NoResultException(errors.toString());
        }
        Product checkProductExist = getProductById(updateProductData.getProductId());
        if (checkProductExist == null) {
            throw new NoResultException("Product does not exist.");
        } else {
            if (productImages != null) {
                if (productImages.size() > (maxImageAllowUpload - handleGenerateImageDto(checkProductExist.getProductImages()).size())) {
                    throw new NoResultException("Only " + maxImageAllowUpload + " product images are allowed.");
                }
                List<ProductImageDto> images = new ArrayList<>();

                handleGenerateImageDto(checkProductExist.getProductImages()).stream().forEach(productImage -> images.add(new ProductImageDto(productImage.getImageId(), productImage.getImageName(), productImage.getStorageName())));

                productImages.stream().forEach(image -> {
                    ProductImage uploadProductImageResponse = null;
                    try {
                        uploadProductImageResponse = handleUploadImage(image, checkProductExist);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                    if (uploadProductImageResponse != null) {
                        images.add(new ProductImageDto(uploadProductImageResponse.getImageId(), uploadProductImageResponse.getImageName(), uploadProductImageResponse.getStorageName()));
                    }
                });
            }
            if (updateProductData.getProductPrice() != null) {
                checkProductExist.setProductPrice(updateProductData.getProductPrice());
            }
            if (updateProductData.getProductName() != null) {
                checkProductExist.setProductName(updateProductData.getProductName());
            }
            if (updateProductData.getDescription() != null) {
                checkProductExist.setDescription(updateProductData.getDescription());
            }
            if (updateProductData.getCategoryId() != null) {
                ProductCategory productCategory = productCategoryRepository.findById(updateProductData.getCategoryId()).get();
                checkProductExist.setCategory(productCategory);
            }
            List<ProductQuantityDto> productQuantityList = generateProductQuantityDto(new ArrayList<>(checkProductExist.getProductQuantities()));
            // INFO: update product quantity if yes
            if (!productQuantityListData.isEmpty()) {
                for (ProductModel.ProductQuantityList item : productQuantityListData) {
                    ProductQuantity checkExist = checkProductExist.getProductQuantities().stream().filter(quantity -> quantity.getNetWeight().getNetWeightId() == item.getNetWeightId()).findFirst().get();
                    NetWeight netWeightData = netWeightRepository.findById(item.getNetWeightId()).get();
                    if (checkExist == null) {
                        if (netWeightData != null) {
                            ProductQuantity saveProductQuantityResponse = handleSaveProductQuantity(checkProductExist, netWeightData, item.getQuantity());
                            if (saveProductQuantityResponse != null) {
                                productQuantityList.add(new ProductQuantityDto(saveProductQuantityResponse.getQuantityId(), saveProductQuantityResponse.getQuantity(), saveProductQuantityResponse.getNetWeight()));
                            }
                        } else {
                            throw new NoResultException("Net weight does not exist.");
                        }
                    } else {
                        if (Objects.equals(item.getQuantity(), checkExist.getQuantity())) {
                            throw new NoResultException("Net weight id [" + item.getNetWeightId() + "] is duplicated.");
                        } else {
                            if (netWeightData != null) {
                                checkExist.setQuantity(item.getQuantity());
                                ProductQuantity updateProductQuantityResponse = productQuantityRepository.saveAndFlush(checkExist);
                                if (updateProductQuantityResponse != null) {
                                    productQuantityList.stream().filter(quantity -> Objects.equals(quantity.getQuantityId(), updateProductQuantityResponse.getQuantityId())).findFirst().get().setQuantity(updateProductQuantityResponse.getQuantity());
                                }
                            } else {
                                throw new NoResultException("Net weight does not exist.");
                            }
                        }
                    }
                }
            }

            Product updateProductResponse = productRepository.saveAndFlush(checkProductExist);
            return new ResponseEntity<>(new ProductDto(updateProductResponse, handleGenerateImageDto(updateProductResponse.getProductImages()), updateProductResponse.getCategory(), generateProductQuantityDto(new ArrayList<>(updateProductResponse.getProductQuantities()))), HttpStatus.OK);
        }
    }

    @DeleteMapping("remove-product-image")
    public ResponseEntity<String> removeProductImage(@RequestParam(value = "productId") Long productId, @RequestParam(value = "imageId") Long imageId) {
        boolean checkProductExist = productRepository.existsById(productId);
        ProductImage checkImageExist = productImageRepository.findById(imageId).get();
        if (!checkProductExist) {
            throw new NoResultException("Product does not exist.");
        }
        if (checkImageExist == null) {
            throw new NoResultException("Image does not exist.");
        }
        try {
            FileManage.handleRemoveImage(checkImageExist.getStorageName(), checkImageExist.getImageName());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        productImageRepository.delete(checkImageExist);
        return new ResponseEntity<>("Removed image.", HttpStatus.OK);
    }


    private List<ProductImageDto> handleGenerateImageDto(Set<ProductImage> productImages) {
        List<ProductImageDto> productImageDto = new ArrayList<>();
        for (ProductImage productImage : productImages) {
            productImageDto.add(new ProductImageDto(productImage.getImageId(), productImage.getImageName(), productImage.getStorageName()));
        }

        return productImageDto;
    }

    private ProductImage handleUploadImage(MultipartFile multipartFile, Product product) throws IOException {
        String fileName = FileManage.handleUploadImage(storageName, multipartFile);

        ProductImage productImageData = new ProductImage(fileName, storageName, product);
        ProductImage productImageUploadResponse = productImageRepository.save(productImageData);

        if (productImageUploadResponse.getImageId() != 0) {
            return productImageUploadResponse;
        }

        return null;
    }

    private Product getProductById(Long productId) {
        try {
            Product product = productRepository.findById(productId).get();
            if (product.getProductId() != null) {
                return product;
            } else {
                return null;
            }
        } catch (Exception exception) {
            return null;
        }
    }

    private ProductQuantity handleSaveProductQuantity(Product product, NetWeight netWeightData, Integer quantity) {
        ProductQuantity productQuantityData = new ProductQuantity(quantity, product, netWeightData);
        ProductQuantity saveProductQuantityResponse = productQuantityRepository.save(productQuantityData);
        return saveProductQuantityResponse.getQuantityId() != 0 ? saveProductQuantityResponse : null;
    }

    private List<ProductQuantityDto> generateProductQuantityDto(List<ProductQuantity> productQuantitiesData) {
        List<ProductQuantityDto> productQuantities = new ArrayList<>();
        for (ProductQuantity productQuantity : productQuantitiesData) {
            productQuantities.add(new ProductQuantityDto(productQuantity.getQuantityId(), productQuantity.getQuantity(), productQuantity.getNetWeight()));
        }
        return productQuantities;
    }
}
