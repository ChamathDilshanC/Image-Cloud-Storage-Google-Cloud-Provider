# Image Cloud Storage - Backend API

A Spring Boot REST API for image management with Google Cloud Platform storage integration. This project provides robust endpoints for uploading, retrieving, listing, and deleting images stored in Google Cloud Storage.

## 📋 Overview

This backend service demonstrates enterprise-level cloud architecture with RESTful APIs, enabling scalable image storage management using Google Cloud Platform.

## 🏗️ Architecture

- **Backend Framework**: Spring Boot 4.0.2 (Java 25)
- **Cloud Storage**: Google Cloud Platform (GCP)
- **Build Tool**: Maven
- **API Design**: RESTful

## ✨ Features

- ✅ Upload images to Google Cloud Storage
- ✅ List all stored images with metadata
- ✅ Retrieve specific images by filename
- ✅ Delete images from cloud storage
- ✅ RESTful API design
- ✅ Cloud-native storage integration
- ✅ Service abstraction for easy storage provider switching
- ✅ Configurable file size limits

## 📁 Project Structure

```
Image-Cloud-Storage/
├── src/
│   ├── main/
│   │   ├── java/lk/ijse/eca/cloud_storage/
│   │   │   ├── CloudStorageInActionApplication.java  # Main application
│   │   │   ├── controller/
│   │   │   │   └── ImageController.java              # REST endpoints
│   │   │   └── service/
│   │   │       ├── StorageService.java               # Service interface
│   │   │       └── impl/
│   │   │           ├── CloudStorageService.java      # GCP implementation
│   │   │           └── FileStorageService.java       # Local storage impl
│   │   └── resources/
│   │       ├── application.yaml                      # Configuration
│   │       ├── application.yaml.example              # Config template
│   │       └── enterprise-cloud-architecture-*.json  # GCP credentials
│   └── test/                                         # Unit tests
├── backend/                                          # Additional backend docs
│   └── README.md                                     # Detailed backend guide
├── pom.xml                                           # Maven dependencies
├── cloud-storage-postman-collection.json             # API testing collection
├── SETUP.md                                          # GCP setup guide
└── README.md                                         # This file
```

## 🚀 Getting Started

### Prerequisites

- **Java 25** or higher
- **Maven 3.8+**
- **Google Cloud Platform account** (with Storage API enabled)
- **GCP Service Account** with Storage permissions
- **Service Account JSON key**

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Image-Cloud-Storage
   ```

2. **Configure Google Cloud Platform credentials**

   ⚠️ **Important**: You must configure your own GCP credentials before running.

   📖 **See [SETUP.md](SETUP.md) for detailed step-by-step configuration instructions.**

   **Quick Summary**:
   - Copy `src/main/resources/application.yaml.example` to `application.yaml`
   - Download your GCP service account JSON key
   - Place the key file in `src/main/resources/`
   - Update `application.yaml` with:
     - Your GCP project ID
     - Your storage bucket name
     - Path to your credentials JSON file

3. **Build the project**

   ```bash
   ./mvnw clean install
   ```

   Or on Windows:

   ```cmd
   mvnw.cmd clean install
   ```

4. **Run the application**

   ```bash
   ./mvnw spring-boot:run
   ```

   Or on Windows:

   ```cmd
   mvnw.cmd spring-boot:run
   ```

The application will start on **`http://localhost:8080`**

### Verify Installation

Once running, test the API:

```bash
curl http://localhost:8080/api/v1/images
```

Expected response: Empty array `[]` (if no images uploaded yet)

## 📡 API Endpoints

| Method   | Endpoint                    | Description               | Request Type        |
| -------- | --------------------------- | ------------------------- | ------------------- |
| `POST`   | `/api/v1/images`            | Upload an image           | multipart/form-data |
| `GET`    | `/api/v1/images`            | List all stored images    | -                   |
| `GET`    | `/api/v1/images/{filename}` | Retrieve a specific image | -                   |
| `DELETE` | `/api/v1/images/{filename}` | Delete a specific image   | -                   |

### API Usage Examples

#### Upload Image

```bash
curl -X POST http://localhost:8080/api/v1/images \
  -F "image=@/path/to/image.jpg"
```

#### List All Images

```bash
curl http://localhost:8080/api/v1/images
```

#### Get Specific Image

```bash
curl http://localhost:8080/api/v1/images/image.jpg --output image.jpg
```

#### Delete Image

```bash
curl -X DELETE http://localhost:8080/api/v1/images/image.jpg
```

## 🧪 Testing with Postman

A complete Postman collection is included for easy API testing.

### 📥 Import Postman Collection

**Collection File**: [`cloud-storage-postman-collection.json`](cloud-storage-postman-collection.json)

**Import Methods**:

1. **Via Postman UI**:
   - Open Postman
   - Click "Import" button (top-left)
   - Click "Choose Files"
   - Select `cloud-storage-postman-collection.json`
   - Click "Import"

2. **Via Drag & Drop**:
   - Drag `cloud-storage-postman-collection.json` into Postman window

### What's Included in the Collection

- ✅ Upload Image
- ✅ List All Images
- ✅ Get Image by Filename
- ✅ Delete Image
- ✅ Pre-configured environment variables

### Collection Variables

The collection includes these variables:

- `baseUrl`: `http://localhost:8080` (API base URL)
- `filename`: `example.jpg` (placeholder for testing)

You can modify these in Postman's environment settings.

## 🛠️ Technology Stack

### Backend

- **Framework**: Spring Boot 4.0.2
- **Language**: Java 25
- **Build Tool**: Maven
- **Cloud SDK**: Google Cloud Storage Libraries (v26.74.0)
- **Utilities**: Lombok

### Dependencies

```xml
<!-- Main Dependencies -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>com.google.cloud</groupId>
    <artifactId>google-cloud-storage</artifactId>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

## 🔧 Configuration

### Main Configuration File

**Location**: `src/main/resources/application.yaml`

```yaml
spring:
  application:
    name: cloud-storage-in-action
  servlet:
    multipart:
      max-file-size: 10MB # Maximum size per individual file
      max-request-size: 50MB # Maximum total request size

gcp:
  project-id: your-gcp-project-id
  bucket-name: your-storage-bucket-name
  credentials-path: src/main/resources/your-service-account-key.json
```

### Configuration Options

#### File Upload Limits

To allow larger files, update these values in `application.yaml`:

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 20MB # Increase file size limit
      max-request-size: 100MB # Increase request size limit
```

#### GCP Configuration

- `project-id`: Your Google Cloud project ID
- `bucket-name`: Name of your Cloud Storage bucket
- `credentials-path`: Path to your service account JSON key file

## 🏗️ Service Architecture

The application uses clean architecture with service abstraction:

```
ImageController (REST Layer)
    ↓
StorageService (Interface)
    ↓
┌─────────────────────┬─────────────────────┐
↓                     ↓                     ↓
CloudStorageService   FileStorageService    (Future implementations)
(GCP Implementation)  (Local Implementation)
```

This design allows easy switching between storage providers without changing the controller logic.

## 📚 Documentation

- **[README.md](README.md)** - This file - Project overview
- **[backend/README.md](backend/README.md)** - Detailed backend documentation
- **[SETUP.md](SETUP.md)** - GCP configuration guide
- **[Postman Collection](cloud-storage-postman-collection.json)** - API testing collection

## 🐛 Troubleshooting

### Common Issues

#### 1. "Application failed to start" or "Credentials not found"

**Solution**: Ensure your `application.yaml` is properly configured with valid GCP credentials.

- Check [SETUP.md](SETUP.md) for configuration steps
- Verify service account JSON key is in the correct location
- Ensure credentials path in `application.yaml` is correct

#### 2. "403 Forbidden" when uploading files

**Solution**: Check your GCP service account permissions.

- Ensure service account has "Storage Object Creator" role
- Verify your bucket exists and is accessible

#### 3. "Max upload size exceeded"

**Solution**: Increase file size limits in `application.yaml`:

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 20MB
      max-request-size: 100MB
```

#### 4. Maven build fails

**Solution**:

- Ensure Java 25 is installed: `java -version`
- Try: `./mvnw clean install -U` (force update dependencies)

## 🚀 Deployment

### Building for Production

```bash
./mvnw clean package -DskipTests
```

This creates an executable JAR in `target/cloud-storage-in-action-0.0.1-SNAPSHOT.jar`

### Running the Production JAR

```bash
java -jar target/cloud-storage-in-action-0.0.1-SNAPSHOT.jar
```

### Running with Custom Configuration

```bash
java -jar target/cloud-storage-in-action-0.0.1-SNAPSHOT.jar \
  --spring.config.location=file:/path/to/application.yaml
```

## 🧪 Running Tests

```bash
./mvnw test
```

## 🔐 Security Notes

⚠️ **IMPORTANT**: Never commit your actual credentials to version control!

- The `.gitignore` file excludes:
  - `application.yaml`
  - Any JSON files matching the pattern `*-*.json` in resources directories

- Always keep your service account credentials secure
- Use environment-specific configurations for different environments
- Consider using secret management services for production

## 🤝 Contributing

This is an educational project. Follow these steps for contributions:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📄 License

Educational project - IJSE (Institute of Software Engineering)

---

**Made with ❤️ using Spring Boot & Google Cloud Storage**

**Questions?** Check [SETUP.md](SETUP.md) or [backend/README.md](backend/README.md) for detailed guides.
