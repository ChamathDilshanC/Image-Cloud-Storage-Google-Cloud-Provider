package lk.ijse.eca.cloud_storage.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lk.ijse.eca.cloud_storage.service.StorageService;

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

    @Override
    public List<Map<String, String>> uploadMultiple(List<MultipartFile> files) {
        List<Map<String, String>> results = new ArrayList<>();

        for (MultipartFile file : files) {
            Map<String, String> result = new HashMap<>();
            try {
                if (file.isEmpty()) {
                    result.put("originalFilename", file.getOriginalFilename());
                    result.put("status", "failed");
                    result.put("error", "File is empty");
                    results.add(result);
                    continue;
                }

                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    result.put("originalFilename", file.getOriginalFilename());
                    result.put("status", "failed");
                    result.put("error", "Only image files are allowed");
                    results.add(result);
                    continue;
                }

                String originalFilename = file.getOriginalFilename();
                String extension = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }

                String savedFilename = UUID.randomUUID() + extension;

                Files.copy(file.getInputStream(), storageDir.resolve(savedFilename),
                        StandardCopyOption.REPLACE_EXISTING);

                result.put("originalFilename", originalFilename);
                result.put("savedFilename", savedFilename);
                result.put("status", "success");
                results.add(result);

            } catch (IOException e) {
                result.put("originalFilename", file.getOriginalFilename());
                result.put("status", "failed");
                result.put("error", "Failed to store file: " + e.getMessage());
                results.add(result);
            }
        }

        return results;
    }

    @Override
    public Map<String, Resource> loadMultiple(List<String> filenames) {
        Map<String, Resource> results = new HashMap<>();

        for (String filename : filenames) {
            try {
                Path file = storageDir.resolve(filename).normalize();
                Resource resource = new UrlResource(file.toUri());
                if (resource.exists()) {
                    results.put(filename, resource);
                } else {
                    results.put(filename, null);
                }
            } catch (Exception e) {
                results.put(filename, null);
            }
        }

        return results;
    }

    @Override
    public Map<String, Boolean> deleteMultiple(List<String> filenames) {
        Map<String, Boolean> results = new HashMap<>();

        for (String filename : filenames) {
            try {
                Path file = storageDir.resolve(filename).normalize();
                if (Files.exists(file)) {
                    Files.delete(file);
                    results.put(filename, true);
                } else {
                    results.put(filename, false);
                }
            } catch (Exception e) {
                results.put(filename, false);
            }
        }

        return results;
    }
}
