package com.main.api.utils;

import org.springframework.lang.Nullable;

import java.text.Normalizer;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;

public class ConvertStringToSlug {
    public static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    public static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String convertCategoryNameToSlug(String categoryName) {
        String nowhitespace = WHITESPACE.matcher(categoryName).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        UUID uuid = UUID.randomUUID();
        return uuid + "-" + slug.toLowerCase(Locale.ENGLISH);
    }
}
