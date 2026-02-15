# image-cloud-storage - Google Cloud Provider

A Spring Boot REST API for image management with cloud object storage integration.

## Tech Stack

- Java 25
- Spring Boot 4.0.2
- Maven
- Lombok
- Public Cloud Storage

## API Endpoints

| Method   | Endpoint                    | Description               |
| -------- | --------------------------- | ------------------------- |
| `POST`   | `/api/v1/images`            | Upload an image           |
| `GET`    | `/api/v1/images`            | List all stored images    |
| `GET`    | `/api/v1/images/{filename}` | Retrieve a specific image |
| `DELETE` | `/api/v1/images/{filename}` | Delete a specific image   |

## Getting Started

### Initial Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Cloud-Storage-in-Action
   ```

2. **Configure your GCP credentials**

   ⚠️ **Important**: Before running the application, you must configure your own Google Cloud Platform credentials.

   📖 **See [SETUP.md](SETUP.md) for detailed configuration instructions.**

   Quick summary:
   - Copy `src/main/resources/application.yaml.example` to `application.yaml`
   - Add your GCP service account JSON key to `src/main/resources/`
   - Update the configuration with your project ID, bucket name, and credentials path

3. **Build the project**

   ```bash
   ./mvnw clean install
   ```

4. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080` and create the local storage directory at `~/.ijse/eca/storage` if it does not already exist.

## 🧪 Testing

### Using Postman Collection (Recommended)

A complete **Postman collection** is included in the project with all single and multiple image operations organized into folders:

**File:** `cloud-storage-postman-collection.json`

**What's Included:**

- ✅ **Single Image Operations** folder (4 requests)
  - Upload Single Image
  - List All Images
  - Get Single Image
  - Delete Single Image

- ✅ **Multiple Images Operations (Batch)** folder (4 requests)
  - Upload Multiple Images
  - Download Multiple Images as ZIP
  - Get Multiple Images Info
  - Delete Multiple Images

**How to Import:**

1. Open Postman
2. Click "Import" button
3. Select `cloud-storage-postman-collection.json` from project folder
4. Start testing!

📖 **Detailed Guide:** See [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md) for step-by-step instructions with screenshots and examples.

### Alternative: Online Postman Collection

You can also access the

online collection:

[Cloud Storage in Action - Postman Workspace](https://www.postman.com/ijse-eca-5768309/workspace/eca-69-70/collection/47280517-cecdea88-0a8b-4f46-b093-4af12ba9ac0d?action=share&creator=47280517)

### Using cURL

All API examples with cURL commands are available in the [SINHALA_GUIDE.md](SINHALA_GUIDE.md) for Sinhala speakers, or check the API Usage Examples section below.

## Need Help?

If you encounter any issues during setup or usage, feel free to reach out and start a discussion via the **Slack workspace**.

## 📋 Quick API Reference

### Single Image Endpoints

| Method | Endpoint                    | Description         |
| ------ | --------------------------- | ------------------- |
| POST   | `/api/v1/images`            | Upload single image |
| GET    | `/api/v1/images`            | List all images     |
| GET    | `/api/v1/images/{filename}` | Get single image    |
| DELETE | `/api/v1/images/{filename}` | Delete single image |

### Multiple Images Endpoints (NEW! 🎉)

| Method | Endpoint                        | Description              |
| ------ | ------------------------------- | ------------------------ |
| POST   | `/api/v1/images/batch`          | Upload multiple images   |
| POST   | `/api/v1/images/batch/retrieve` | Download multiple as ZIP |
| POST   | `/api/v1/images/batch/info`     | Get files metadata       |
| DELETE | `/api/v1/images/batch`          | Delete multiple images   |

## 📚 Documentation Files

- **[README.md](README.md)** - This file - Project overview
- **[SINHALA_GUIDE.md](SINHALA_GUIDE.md)** - සිංහල මාර්ගෝපදේශය - Complete guide in Sinhala
- **[POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)** - Postman collection usage guide
- **[CODE_CHANGES.md](CODE_CHANGES.md)** - Technical details of all code changes
- **[SETUP.md](SETUP.md)** - GCP configuration setup guide

## 🔧 Configuration

**File:** `src/main/resources/application.yaml`

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB # Max size per file
      max-request-size: 50MB # Max total request size (for batch)
```

**Adjust for your needs:** Increase `max-request-size` to allow more/larger files in batch uploads.

---

**Made with ❤️ using Spring Boot & Google Cloud Storage**
