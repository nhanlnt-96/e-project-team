package com.main.api.controller;

import com.main.api.utils.FileManage;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = {"http://localhost:3000"}, allowCredentials = "true")
public class ImageController {
    @GetMapping("/{storageName}/{imageName}")
    @ResponseBody
    public ResponseEntity<byte[]> getImage(@PathVariable String storageName, @PathVariable String imageName) throws IOException {
        Path file = Paths.get(FileManage.storagePath + storageName).resolve(imageName);
        Resource resource = new UrlResource(file.toUri());

        if (resource.exists() && resource.isReadable()) {
            return new ResponseEntity<>(FileUtils.readFileToByteArray(resource.getFile()), HttpStatus.OK);
        } else {
            throw new RuntimeException("Could not find the image");
        }
    }
}
