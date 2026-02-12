package lk.ijse.eca.cloud_storage.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String upload(MultipartFile file);
    List<String> listAll();
    Resource load(String filename);
    void delete(String filename);
}
