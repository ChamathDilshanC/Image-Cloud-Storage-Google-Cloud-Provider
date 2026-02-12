# Code Changes Summary - Multiple Images Support

This document explains all the code changes made to support multiple image operations in a single request.

## 📝 Overview

The application has been upgraded from handling only single images to supporting **batch operations for multiple images** with full CRUD capabilities.

## 🔄 Changes Made

### 1. StorageService Interface

**File:** `src/main/java/lk/ijse/eca/cloud_storage/service/StorageService.java`

**Added Methods:**

```java
// Multiple images operations
List<Map<String, String>> uploadMultiple(List<MultipartFile> files);
Map<String, Resource> loadMultiple(List<String> filenames);
Map<String, Boolean> deleteMultiple(List<String> filenames);
```

**Purpose:**

- `uploadMultiple()`: Upload multiple images and return results for each file
- `loadMultiple()`: Load multiple images by filenames
- `deleteMultiple()`: Delete multiple images and return success status for each

---

### 2. CloudStorageService Implementation

**File:** `src/main/java/lk/ijse/eca/cloud_storage/service/impl/CloudStorageService.java`

**Key Changes:**

- Added imports for `ArrayList`, `HashMap`, and `Map`
- Implemented `uploadMultiple()` method:
  - Iterates through each file
  - Validates each file individually
  - Uploads to GCP bucket
  - Returns detailed results with success/failure status
  - Handles errors gracefully without stopping the entire batch

- Implemented `loadMultiple()` method:
  - Retrieves multiple files from GCP bucket
  - Returns a map of filename → Resource
  - Handles missing files gracefully (returns null)

- Implemented `deleteMultiple()` method:
  - Deletes multiple files from GCP bucket
  - Returns a map of filename → boolean (success/failure)
  - Checks file existence before deletion

**Example Response Structure:**

```json
{
  "originalFilename": "photo.jpg",
  "savedFilename": "uuid-generated-name.jpg",
  "status": "success"
}
```

---

### 3. FileStorageService Implementation

**File:** `src/main/java/lk/ijse/eca/cloud_storage/service/impl/FileStorageService.java`

**Key Changes:**

- Added identical implementations as CloudStorageService
- Uses local file system instead of GCP
- Same method signatures and response structures
- Handles file operations using Java NIO (Files, Path)

**Purpose:** Provides fallback local storage with same functionality as cloud storage.

---

### 4. ImageController REST API

**File:** `src/main/java/lk/ijse/eca/cloud_storage/controller/ImageController.java`

**New Imports:**

```java
import java.io.ByteArrayOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
```

**New Endpoints:**

#### A. Batch Upload

```java
@PostMapping("/batch")
public ResponseEntity<Map<String, Object>> uploadMultiple(
    @RequestParam("images") List<MultipartFile> files)
```

- Accepts multiple files via form-data
- Returns summary: totalFiles, successCount, failedCount, results
- HTTP 201 Created on success

#### B. Batch Retrieve (as ZIP)

```java
@PostMapping("/batch/retrieve")
public ResponseEntity<Resource> getMultipleImages(
    @RequestBody Map<String, List<String>> request)
```

- Accepts JSON with array of filenames
- Creates ZIP file containing all images
- Returns ZIP as download
- Content-Disposition: attachment; filename=images.zip

#### C. Batch Delete

```java
@DeleteMapping("/batch")
public ResponseEntity<Map<String, Object>> deleteMultiple(
    @RequestBody Map<String, List<String>> request)
```

- Accepts JSON with array of filenames
- Deletes all specified images
- Returns summary with success/failure for each file

#### D. Batch Info

```java
@PostMapping("/batch/info")
public ResponseEntity<Map<String, Object>> getMultipleImagesInfo(
    @RequestBody Map<String, List<String>> request)
```

- Accepts JSON with array of filenames
- Returns metadata: filename, exists, size, contentType
- Does not download actual images

**Enhanced Features:**

- Organized code with section comments
- Comprehensive error handling
- Detailed response structures
- ZIP compression for batch downloads

---

### 5. Application Configuration

**File:** `src/main/resources/application.yaml`

**Changed:**

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 50MB # Increased from 10MB
```

**Reason:** To support uploading multiple images (up to 5 images of 10MB each) in a single request.

---

## 🎯 New API Endpoints Summary

| Endpoint                        | Method | Purpose                | Request Type |
| ------------------------------- | ------ | ---------------------- | ------------ |
| `/api/v1/images/batch`          | POST   | Upload multiple images | form-data    |
| `/api/v1/images/batch/retrieve` | POST   | Download images as ZIP | JSON         |
| `/api/v1/images/batch`          | DELETE | Delete multiple images | JSON         |
| `/api/v1/images/batch/info`     | POST   | Get files metadata     | JSON         |

---

## 📊 Request/Response Examples

### Upload Multiple Images

**Request (cURL):**

```bash
curl -X POST http://localhost:8080/api/v1/images/batch \
  -F "images=@photo1.jpg" \
  -F "images=@photo2.png" \
  -F "images=@photo3.jpg"
```

**Response:**

```json
{
  "totalFiles": 3,
  "successCount": 2,
  "failedCount": 1,
  "results": [
    {
      "originalFilename": "photo1.jpg",
      "savedFilename": "a1b2c3d4-uuid.jpg",
      "status": "success"
    },
    {
      "originalFilename": "photo2.png",
      "savedFilename": "e5f6g7h8-uuid.png",
      "status": "success"
    },
    {
      "originalFilename": "photo3.jpg",
      "status": "failed",
      "error": "File is empty"
    }
  ]
}
```

### Download Multiple Images

**Request (cURL):**

```bash
curl -X POST http://localhost:8080/api/v1/images/batch/retrieve \
  -H "Content-Type: application/json" \
  -d '{"filenames": ["file1.jpg", "file2.png"]}' \
  --output images.zip
```

**Response:** Binary ZIP file containing both images

### Delete Multiple Images

**Request (cURL):**

```bash
curl -X DELETE http://localhost:8080/api/v1/images/batch \
  -H "Content-Type: application/json" \
  -d '{"filenames": ["file1.jpg", "file2.png"]}'
```

**Response:**

```json
{
  "totalFiles": 2,
  "successCount": 2,
  "failedCount": 0,
  "results": {
    "file1.jpg": true,
    "file2.png": true
  }
}
```

---

## 🔍 Technical Implementation Details

### Error Handling Strategy

The batch operations use a **partial success approach**:

- If one file fails, other files continue processing
- Each file result is tracked individually
- Final response includes overall counts and detailed results

### File Validation

Each uploaded file is validated for:

1. **Empty check**: File must not be empty
2. **Content type**: Must be an image (image/\*)
3. **Size limits**: Individual and total request size limits

### UUID File Naming

All files are saved with UUID names:

```java
String savedFilename = UUID.randomUUID() + extension;
```

- Prevents filename conflicts
- Maintains file extensions
- Secure and unique identification

### ZIP Compression

Multiple image retrieval uses ZIP:

```java
ByteArrayOutputStream baos = new ByteArrayOutputStream();
ZipOutputStream zos = new ZipOutputStream(baos);
// Add each file as ZipEntry
```

- Efficient for downloading multiple files
- Preserves original filenames
- Single HTTP response

---

## 🧪 Testing Guide

### Test Batch Upload

1. Create 3-5 test images
2. Use Postman or cURL
3. Select multiple files with key "images"
4. Verify response contains all file results

### Test Batch Download

1. Upload some images first
2. Note the saved filenames
3. Send POST request with filename array
4. Verify ZIP file downloads and contains all images

### Test Batch Delete

1. List all images to get filenames
2. Send DELETE request with filename array
3. Verify deletion success in response
4. List images again to confirm deletion

---

## 🚀 Performance Considerations

### Current Implementation

- **Sequential processing**: Files processed one by one
- **Memory efficient**: Streams used for file operations
- **No transaction support**: Each file operation is independent

### Scalability

- Suitable for 5-10 images per request
- For larger batches, consider:
  - Async processing
  - Background jobs
  - Progress tracking
  - Chunked uploads

### Resource Limits

```yaml
max-file-size: 10MB # Per file
max-request-size: 50MB # Total request (all files)
```

---

## 📋 Migration Checklist

✅ Updated StorageService interface
✅ Implemented CloudStorageService batch methods
✅ Implemented FileStorageService batch methods
✅ Added new REST endpoints in ImageController
✅ Increased request size limit in application.yaml
✅ Created comprehensive README documentation
✅ Added ZIP functionality for batch downloads
✅ Implemented detailed error handling

---

## 🎓 How It Works

### Upload Flow

```
Client → Controller → StorageService → GCP/Local Storage
         (validates)   (processes batch)   (stores files)

Response ← Controller ← StorageService ← Success/Failure
         (formats)      (collects results)
```

### Download Flow

```
Client → Controller → StorageService → GCP/Local Storage
         (validates)   (loads files)      (reads files)

         Controller → Creates ZIP → Returns to Client
         (compresses)               (downloads)
```

### Delete Flow

```
Client → Controller → StorageService → GCP/Local Storage
         (validates)   (deletes batch)    (removes files)

Response ← Controller ← StorageService ← Success/Failure
         (formats)      (tracks results)
```

---

## 🔐 Security Notes

- All files validated before processing
- Only image MIME types accepted
- UUID naming prevents path traversal
- Size limits prevent DoS attacks
- GCP authentication via service account

---

**End of Code Changes Summary**
