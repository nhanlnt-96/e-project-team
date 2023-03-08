package com.main.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

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

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public String convertCategoryNameToSlug(String categoryName) {
        String nowhitespace = WHITESPACE.matcher(categoryName).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public ProductCategory() {
    }

    public ProductCategory(String categoryName) {
        this.categoryName = categoryName;
        this.categorySlug = convertCategoryNameToSlug(categoryName);
    }

    @Override
    public String toString() {
        return "ProductCategory{" + "categoryId=" + categoryId + ", categoryName='" + categoryName + '\'' + '}';
    }
}
