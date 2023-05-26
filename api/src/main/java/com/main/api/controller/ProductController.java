package com.main.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.api.constant.Constant;
import com.main.api.constant.Constant.*;
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

import javax.annotation.security.RolesAllowed;
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
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
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
        } else {
            for (ProductModel.ProductQuantityList quantityList : productQuantityListData) {
                if (quantityList.getQuantity() < 1)
                    throw new NoResultException("Quantity of net weight [" + quantityList.getNetWeightId() + "] can not be smaller than 1.");
                if (quantityList.getPrice() < 1)
                    throw new NoResultException("Price of net weight [" + quantityList.getNetWeightId() + "] can not be smaller than 1.");
            }
        }

        try {
            Date currentDate = new Date();
            ProductCategory productCategory = productCategoryRepository.findById(createProductData.getCategoryId()).get();
            Product productData = new Product(createProductData.getDescription(), createProductData.getProductName());
            productData.setCategory(productCategory);
            productData.setCreatedAt(currentDate);

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
                        ProductQuantity saveProductQuantityResponse = handleSaveProductQuantity(saveProductResponse, netWeightData, quantity.getQuantity(), quantity.getPrice());
                        if (saveProductQuantityResponse != null) {
                            productQuantityList.add(new ProductQuantityDto(saveProductQuantityResponse.getQuantityId(), saveProductQuantityResponse.getQuantity(), saveProductQuantityResponse.getPrice(), saveProductQuantityResponse.getNetWeight()));
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

    @GetMapping("/get-product-by-category-slug")
    public ResponseEntity<List<ProductDto>> getProductByCategory(@RequestParam(value = "categorySlug", defaultValue = "all") String categorySlug) {
        List<Product> productList = productRepository.findAll(Specification.where(ProductSpecification.filterByCategorySlug(categorySlug)));
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product, handleGenerateImageDto(product.getProductImages()), product.getCategory(), generateProductQuantityDto(new ArrayList<>(product.getProductQuantities())))).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @GetMapping("/product-search")
    public ResponseEntity<List<ProductDto>> productSearch(@RequestParam(value = "productName", defaultValue = "all") String productName) {
        List<Product> productList = productRepository.findAll(Specification.where(ProductSpecification.searchByName(productName)));
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product, handleGenerateImageDto(product.getProductImages()), product.getCategory(), generateProductQuantityDto(new ArrayList<>(product.getProductQuantities())))).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    @DeleteMapping("/remove-product/{productId}")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
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
            throw new NoResultException("Product does not exits");
        }
    }

    @PutMapping("/update-product")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<ProductDto> updateProduct(@RequestParam("productImages") @Nullable List<MultipartFile> productImages, @RequestParam("productUpdateData") String productUpdateData, @RequestParam(value = "productQuantityList", defaultValue = "[]") String productQuantities) throws IOException {
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
                    if (item.getQuantity() < 1)
                        throw new NoResultException("Quantity of net weight [" + item.getNetWeightId() + "] can not be smaller than 1.");
                    if (item.getPrice() < 1)
                        throw new NoResultException("Price of net weight [" + item.getNetWeightId() + "] can not be smaller than 1.");
                    ProductQuantity checkExist = checkProductExist.getProductQuantities().stream().filter(productQuantity -> Objects.equals(productQuantity.getNetWeight().getNetWeightId(), item.getNetWeightId())).findAny().orElse(null);
                    NetWeight netWeightData = netWeightRepository.findById(item.getNetWeightId()).orElse(null);
                    if (checkExist == null) {
                        if (netWeightData != null) {
                            ProductQuantity saveProductQuantityResponse = handleSaveProductQuantity(checkProductExist, netWeightData, item.getQuantity(), item.getPrice());
                            if (saveProductQuantityResponse != null) {
                                productQuantityList.add(new ProductQuantityDto(saveProductQuantityResponse.getQuantityId(), saveProductQuantityResponse.getQuantity(), saveProductQuantityResponse.getPrice(), saveProductQuantityResponse.getNetWeight()));
                            }
                        } else {
                            throw new NoResultException("Net weight does not exist.");
                        }
                    } else {
                        if (Objects.equals(item.getQuantity(), checkExist.getQuantity()) && Objects.equals(item.getPrice(), checkExist.getPrice())) {
                            throw new NoResultException("Net weight id [" + item.getNetWeightId() + "] is duplicated.");
                        } else {
                            if (netWeightData != null) {
                                if (!checkExist.getQuantity().equals(item.getQuantity()))
                                    checkExist.setQuantity(item.getQuantity());
                                if (!checkExist.getPrice().equals(item.getPrice()))
                                    checkExist.setPrice(item.getPrice());
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
            return new ResponseEntity<>(new ProductDto(updateProductResponse, handleGenerateImageDto(updateProductResponse.getProductImages()), updateProductResponse.getCategory(), productQuantityList), HttpStatus.OK);
        }
    }

    @DeleteMapping("/remove-product-image")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<String> removeProductImage(@RequestParam(value = "productId") Long productId, @RequestParam(value = "imageId") Long imageId) {
        boolean checkProductExist = productRepository.existsById(productId);
        ProductImage checkImageExist = productImageRepository.findById(imageId).orElse(null);
        int countProductImageExist = productImageRepository.countAllByProductProductId(productId);
        if (!checkProductExist) {
            throw new NoResultException("Product does not exist.");
        }
        if (checkImageExist == null) {
            throw new NoResultException("Image does not exist.");
        }
        if (!(countProductImageExist > 1)) {
            throw new NoResultException("Can not remove image. Because product must have at least 1 image.");
        }
        try {
            FileManage.handleRemoveImage(checkImageExist.getStorageName(), checkImageExist.getImageName());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        productImageRepository.delete(checkImageExist);
        return new ResponseEntity<>("Removed image.", HttpStatus.OK);
    }

    @DeleteMapping("/remove-product-quantity")
    @RolesAllowed({"ROLE_ADMIN", "ROLE_EDITOR"})
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<String> removeProductQuantity(@RequestParam(value = "quantityId") Long quantityId) {
        ProductQuantity checkProductQuantityExist = productQuantityRepository.findProductQuantityByQuantityId(quantityId);
        if (checkProductQuantityExist == null) {
            throw new NoResultException("Product quantity does not exist.");
        }
        int countProductQuantityItem = productQuantityRepository.findAllByProductProductId(checkProductQuantityExist.getProduct().getProductId()).size();
        if (countProductQuantityItem == 1) {
            throw new NoResultException("Product quantity list must have at least 1 item.");
        }

        productQuantityRepository.delete(checkProductQuantityExist);

        return new ResponseEntity<>("Removed product quantity", HttpStatus.OK);
    }

    @GetMapping("/get-newest-products")
    public ResponseEntity<List<ProductDto>> getNewestProduct() {
        List<Product> productList = productRepository.findTop10ByOrderByCreatedAtDesc();
        List<ProductDto> productDtoList = productList.stream().map(product -> new ProductDto(product, handleGenerateImageDto(product.getProductImages()), product.getCategory(), generateProductQuantityDto(new ArrayList<>(product.getProductQuantities())))).collect(Collectors.toList());

        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }

    public static List<ProductImageDto> handleGenerateImageDto(Set<ProductImage> productImages) {
        List<ProductImageDto> productImageDto = new ArrayList<>();
        for (ProductImage productImage : productImages) {
            productImageDto.add(new ProductImageDto(productImage.getImageId(), productImage.getImageName(), productImage.getStorageName()));
        }

        return productImageDto.stream().sorted(Comparator.comparing(ProductImageDto::getImageId)).collect(Collectors.toList());
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
        return productRepository.findById(productId).orElse(null);
    }

    private ProductQuantity handleSaveProductQuantity(Product product, NetWeight netWeightData, Integer quantity, Double price) {
        ProductQuantity productQuantityData = new ProductQuantity(quantity, price, product, netWeightData);
        ProductQuantity saveProductQuantityResponse = productQuantityRepository.save(productQuantityData);
        return saveProductQuantityResponse.getQuantityId() != 0 ? saveProductQuantityResponse : null;
    }

    public static List<ProductQuantityDto> generateProductQuantityDto(List<ProductQuantity> productQuantitiesData) {
        List<ProductQuantityDto> productQuantities = new ArrayList<>();
        for (ProductQuantity productQuantity : productQuantitiesData) {
            productQuantities.add(new ProductQuantityDto(productQuantity.getQuantityId(), productQuantity.getQuantity(), productQuantity.getPrice(), productQuantity.getNetWeight()));
        }
        return productQuantities.stream().sorted(Comparator.comparing(i -> i.getNetWeightDto().getNetWeightValue())).collect(Collectors.toList());
    }
}
