package lk.ijse.eca.cloud_storage.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

import lk.ijse.eca.cloud_storage.service.StorageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService implements StorageService {

    private final Path storageDir = Path.of(
            System.getProperty("user.home"), ".ijse", "eca", "storage");

    @Override
    public String upload(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        String savedFilename = UUID.randomUUID() + extension;

        try {
            Files.copy(file.getInputStream(), storageDir.resolve(savedFilename),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }

        return savedFilename;
    }

    @Override
    public List<String> listAll() {
        try (Stream<Path> paths = Files.list(storageDir)) {
            return paths
                    .filter(Files::isRegularFile)
                    .map(path -> path.getFileName().toString())
                    .toList();
        } catch (IOException e) {
            throw new RuntimeException("Failed to list files", e);
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = storageDir.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists()) {
                throw new IllegalArgumentException("File not found: " + filename);
            }
            return resource;
        } catch (IOException e) {
            throw new RuntimeException("Failed to load file", e);
        }
    }

    @Override
    public void delete(String filename) {
        try {
            Path file = storageDir.resolve(filename).normalize();
            if (!Files.exists(file)) {
                throw new IllegalArgumentException("File not found: " + filename);
            }
            Files.delete(file);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file", e);
        }
    }
}
