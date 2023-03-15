package com.main.api.entity;

import com.main.api.utils.ConvertStringToSlug;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    @Column(name = "category_name")
    private String categoryName;
    @Column(name = "category_slug")
    private String categorySlug;
    @Column(name = "category_image_name")
    private String categoryImageName;
    @Column(name = "storage_name")
    private String storageName;
    @Column(name = "category_description")
    private String categoryDescription;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;

    public ProductCategory() {
    }

    public ProductCategory(String categoryName, String categoryImageName, String storageName, String categoryDescription) {
        this.categoryName = categoryName;
        this.categorySlug = ConvertStringToSlug.convertCategoryNameToSlug(categoryName);
        this.categoryImageName = categoryImageName;
        this.storageName = storageName;
        this.categoryDescription = categoryDescription;
    }

    @Override
    public String toString() {
        return "ProductCategory{" + "categoryId=" + categoryId + ", categoryName='" + categoryName + '\'' + ", categorySlug='" + categorySlug + '\'' + ", categoryImageName='" + categoryImageName + '\'' + ", storageName='" + storageName + '\'' + ", categoryDescription='" + categoryDescription + '\'' + ", products=" + products + '}';
    }
}
