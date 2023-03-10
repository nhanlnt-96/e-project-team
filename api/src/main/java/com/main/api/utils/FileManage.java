package com.main.api.utils;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

public class FileManage {
    public static final String storagePath = "upload/images/";

    public static String handleUploadImage(String storageName, MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "-" + ConvertStringToSlug.WHITESPACE.matcher(StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()))).replaceAll("-");
        String storagePath = FileManage.storagePath + storageName;

        Files.copy(file.getInputStream(), Paths.get(storagePath).resolve(fileName));

        return fileName;
    }

    public static void handleRemoveImage(String storageName, String fileName) throws IOException {
        String storagePath = FileManage.storagePath + storageName;
        Path file = Paths.get(storagePath).resolve(fileName);
        Files.deleteIfExists(file);
    }
}
