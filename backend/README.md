# Image Cloud Storage - Backend API

A Spring Boot REST API for image management with Google Cloud Platform storage integration. This backend service provides robust endpoints for uploading, retrieving, listing, and deleting images with support for both single and batch operations.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Configuration](#-configuration)
- [Documentation](#-documentation)

## 🛠️ Tech Stack

- **Java**: 25
- **Spring Boot**: 4.0.2
- **Build Tool**: Maven
- **Cloud Provider**: Google Cloud Platform (GCP)
- **Storage**: Google Cloud Storage
- **Libraries**:
  - Lombok (Boilerplate reduction)
  - Google Cloud Storage Libraries (v26.74.0)
  - Spring Boot DevTools (Development)

## ✨ Features

- ✅ Upload single or multiple images
- ✅ List all stored images with metadata
- ✅ Retrieve specific images by filename
- ✅ Delete single or multiple images
- ✅ Batch operations support (ZIP download, bulk delete)
- ✅ Cloud-native storage with GCP
- ✅ RESTful API design
- ✅ CORS enabled for frontend integration
- ✅ Configurable file size limits
- ✅ Service abstraction for easy storage provider switching

## 📁 Project Structure

```
backend/
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
├── pom.xml                                           # Maven dependencies
├── README.md                                         # This file
├── SETUP.md                                          # Setup guide
├── SINHALA_GUIDE.md                                  # Sinhala guide
├── POSTMAN_GUIDE.md                                  # Postman guide
├── CODE_CHANGES.md                                   # Technical changes
└── cloud-storage-postman-collection.json             # API collection
```

## 🚀 Getting Started

### Prerequisites

- **Java 25** or higher
- **Maven 3.8+**
- **Google Cloud Platform account** (with Storage API enabled)
- **GCP Service Account** with Storage permissions
- **Service Account JSON key**

### Installation & Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
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

### Single Image Operations

| Method   | Endpoint                    | Description               | Request Type        |
| -------- | --------------------------- | ------------------------- | ------------------- |
| `POST`   | `/api/v1/images`            | Upload an image           | multipart/form-data |
| `GET`    | `/api/v1/images`            | List all stored images    | -                   |
| `GET`    | `/api/v1/images/{filename}` | Retrieve a specific image | -                   |
| `DELETE` | `/api/v1/images/{filename}` | Delete a specific image   | -                   |

### Multiple Images Operations (Batch) 🎉

| Method   | Endpoint                        | Description                     | Request Type        |
| -------- | ------------------------------- | ------------------------------- | ------------------- |
| `POST`   | `/api/v1/images/batch`          | Upload multiple images          | multipart/form-data |
| `POST`   | `/api/v1/images/batch/retrieve` | Download multiple images as ZIP | JSON                |
| `POST`   | `/api/v1/images/batch/info`     | Get metadata for multiple files | JSON                |
| `DELETE` | `/api/v1/images/batch`          | Delete multiple images          | JSON                |

### API Usage Examples

#### Upload Single Image

```bash
curl -X POST http://localhost:8080/api/v1/images \
  -F "image=@/path/to/image.jpg"
```

#### List All Images

```bash
curl http://localhost:8080/api/v1/images
```

#### Get Single Image

```bash
curl http://localhost:8080/api/v1/images/image.jpg --output image.jpg
```

#### Delete Single Image

```bash
curl -X DELETE http://localhost:8080/api/v1/images/image.jpg
```

#### Upload Multiple Images

```bash
curl -X POST http://localhost:8080/api/v1/images/batch \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  -F "images=@image3.jpg"
```

#### Download Multiple Images as ZIP

```bash
curl -X POST http://localhost:8080/api/v1/images/batch/retrieve \
  -H "Content-Type: application/json" \
  -d '{"filenames": ["image1.jpg", "image2.jpg"]}' \
  --output images.zip
```

#### Delete Multiple Images

```bash
curl -X DELETE http://localhost:8080/api/v1/images/batch \
  -H "Content-Type: application/json" \
  -d '{"filenames": ["image1.jpg", "image2.jpg"]}'
```

## 🧪 Testing

### Option 1: Postman Collection (Recommended)

A complete **Postman collection** is included with all API endpoints organized and ready to use:

**📦 Collection File**: [`cloud-storage-postman-collection.json`](cloud-storage-postman-collection.json)

**What's Included**:

- ✅ **Single Image Operations** folder (4 requests)
  - Upload Single Image
  - List All Images
  - Get Single Image by Filename
  - Delete Single Image

- ✅ **Multiple Images Operations (Batch)** folder (4 requests)
  - Upload Multiple Images
  - Download Multiple Images as ZIP
  - Get Multiple Images Info
  - Delete Multiple Images

**How to Import**:

1. Open Postman
2. Click "Import" button (top-left)
3. Select `cloud-storage-postman-collection.json`
4. Click "Import"
5. Start testing! 🚀

📖 **Detailed Instructions**: See [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) for comprehensive testing guide with examples in both English and Sinhala.

### Option 2: Online Postman Collection

Access the collection online in Postman workspace:

[Cloud Storage in Action - Postman Workspace](https://www.postman.com/ijse-eca-5768309/workspace/eca-69-70/collection/47280517-cecdea88-0a8b-4f46-b093-4af12ba9ac0d?action=share&creator=47280517)

### Option 3: cURL Commands

Use the cURL examples provided in the [API Usage Examples](#api-usage-examples) section above, or check [SINHALA_GUIDE.md](SINHALA_GUIDE.md) for more examples.

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
      max-request-size: 50MB # Maximum total request size (for batch uploads)

gcp:
  project-id: your-gcp-project-id
  bucket-name: your-storage-bucket-name
  credentials-path: src/main/resources/your-service-account-key.json
```

### Configuration Options

#### File Upload Limits

- `max-file-size`: Maximum size for a single file (default: 10MB)
- `max-request-size`: Maximum total size for batch uploads (default: 50MB)

**To allow larger files**, update these values in `application.yaml`:

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 20MB # Allow up to 20MB per file
      max-request-size: 100MB # Allow up to 100MB total per request
```

#### GCP Configuration

- `project-id`: Your Google Cloud project ID
- `bucket-name`: Name of your Cloud Storage bucket
- `credentials-path`: Path to your service account JSON key file

### Environment Variables (Optional)

You can also use environment variables:

```bash
export GCP_PROJECT_ID=your-project-id
export GCP_BUCKET_NAME=your-bucket-name
export GCP_CREDENTIALS_PATH=/path/to/credentials.json
```

## 🏗️ Architecture

### Service Layer Architecture

The application uses a clean architecture with service abstraction:

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

### Key Components

- **ImageController**: Handles HTTP requests and responses
- **StorageService**: Defines storage operations interface
- **CloudStorageService**: GCP Cloud Storage implementation
- **FileStorageService**: Local filesystem implementation (for testing)

## 📚 Documentation

- **[README.md](README.md)** - This file - Backend overview and API reference
- **[SETUP.md](SETUP.md)** - Detailed GCP setup and configuration guide
- **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** - Complete Postman collection usage guide
- **[SINHALA_GUIDE.md](SINHALA_GUIDE.md)** - සිංහල භාෂා මාර්ගෝපදේශය (Complete Sinhala guide)
- **[CODE_CHANGES.md](CODE_CHANGES.md)** - Technical implementation details and code changes

## 🐛 Troubleshooting

### Common Issues

#### 1. "Application failed to start" or "Credentials not found"

**Solution**: Ensure your `application.yaml` is properly configured with valid GCP credentials.

- Check [SETUP.md](SETUP.md) for configuration steps
- Verify your service account JSON key is in the correct location
- Ensure the credentials path in `application.yaml` is correct

#### 2. "403 Forbidden" when uploading files

**Solution**: Check your GCP service account permissions.

- Ensure the service account has "Storage Object Creator" role
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

### Need More Help?

- Check the documentation files listed above
- Review error logs in the console output
- Contact via Slack workspace

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

## 📊 Project Statistics

- **Language**: Java
- **Framework**: Spring Boot
- **Endpoints**: 8 (4 single + 4 batch operations)
- **Dependencies**: 6 main dependencies
- **Code Coverage**: Unit tests included

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

**Questions?** Check [SETUP.md](SETUP.md) or [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) for detailed guides.
