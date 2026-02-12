package lk.ijse.eca.cloud_storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class CloudStorageInActionApplication {

    public static void main(String[] args) {
        SpringApplication.run(CloudStorageInActionApplication.class, args);
    }

    @Bean
    CommandLineRunner initStorageDirectory() {
        return args -> {
            Path storagePath = Path.of(System.getProperty("user.home"), ".ijse", "eca", "storage");
            if (Files.exists(storagePath)) {
                log.info("Storage directory already exists: {}", storagePath);
            } else {
                Files.createDirectories(storagePath);
                log.info("Storage directory created: {}", storagePath);
            }
        };
    }

    @Bean
    public Storage storage(@Value("${gcp.project-id}") String projectId,
            @Value("${gcp.credentials-location}") ClassPathResource credentialsResource) throws IOException {

        ServiceAccountCredentials credentials = ServiceAccountCredentials
                .fromStream(credentialsResource.getInputStream());

        System.out.println("Project ID: " + projectId);
        System.out.println("Credentials Location: " + credentialsResource.getFilename());

        return StorageOptions
                .newBuilder()
                .setProjectId(projectId)
                .setCredentials(credentials)
                .build()
                .getService();
    }
}
