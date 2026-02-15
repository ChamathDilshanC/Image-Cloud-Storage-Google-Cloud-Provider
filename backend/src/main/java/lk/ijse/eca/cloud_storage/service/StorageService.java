package lk.ijse.eca.cloud_storage.service;

import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    // Single image operations
    String upload(MultipartFile file);

    List<String> listAll();

    Resource load(String filename);

    void delete(String filename);

    // Multiple images operations
    List<Map<String, String>> uploadMultiple(List<MultipartFile> files);

    Map<String, Resource> loadMultiple(List<String> filenames);

    Map<String, Boolean> deleteMultiple(List<String> filenames);
}
