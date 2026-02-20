# Image Cloud Storage

A full-stack cloud-based image storage application built with Spring Boot backend and Next.js frontend, integrated with Google Cloud Platform (GCP) for scalable object storage.

## 📋 Overview

This application provides a complete solution for uploading, storing, retrieving, and managing images using cloud storage. It demonstrates enterprise-level architecture with RESTful APIs and modern web technologies.

## 🏗️ Architecture

- **Backend**: Spring Boot 4.0.2 REST API (Java 25)
- **Frontend**: Next.js 16 with React 19 and TypeScript
- **Cloud Storage**: Google Cloud Platform (GCP)
- **Build Tools**: Maven (Backend), npm (Frontend)

## ✨ Features

- ✅ Upload single or multiple images
- ✅ List all stored images
- ✅ Retrieve specific images by filename
- ✅ Delete images from cloud storage
- ✅ RESTful API design
- ✅ Cloud-native storage integration
- ✅ Modern responsive UI

## 📁 Project Structure

```
Image-Cloud-Storage/
├── backend/              # Spring Boot REST API
│   ├── src/
│   ├── pom.xml
│   ├── README.md
│   ├── SETUP.md
│   └── cloud-storage-postman-collection.json
├── frontend/             # Next.js Web Application
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── package.json
└── POSTMAN_GUIDE.md      # API Testing Guide
```

## 🚀 Getting Started

### Prerequisites

- Java 25 or higher
- Node.js 20+ and npm
- Maven 3.8+
- Google Cloud Platform account with Storage API enabled
- GCP Service Account JSON key

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure GCP credentials**
   
   ⚠️ **Important**: You must configure your own GCP credentials before running.
   
   📖 See [backend/SETUP.md](backend/SETUP.md) for detailed instructions.
   
   Quick steps:
   - Copy `application.yaml.example` to `application.yaml`
   - Add your GCP service account JSON key to `src/main/resources/`
   - Update configuration with your project ID and bucket name

3. **Build and run**
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run
   ```

   The API will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

   The web app will be available at `http://localhost:3000`

## 📡 API Endpoints

| Method   | Endpoint                    | Description               |
| -------- | --------------------------- | ------------------------- |
| `POST`   | `/api/v1/images`            | Upload an image           |
| `GET`    | `/api/v1/images`            | List all stored images    |
| `GET`    | `/api/v1/images/{filename}` | Retrieve a specific image |
| `DELETE` | `/api/v1/images/{filename}` | Delete a specific image   |

## 🧪 Testing with Postman

A complete Postman collection is included for easy API testing.

### 📥 Import Postman Collection

**Collection File**: [`backend/cloud-storage-postman-collection.json`](backend/cloud-storage-postman-collection.json)

**Import Methods**:

1. **Via Postman UI**:
   - Open Postman
   - Click "Import" button (top-left)
   - Click "Choose Files"
   - Select `backend/cloud-storage-postman-collection.json`
   - Click "Import"

2. **Via Drag & Drop**:
   - Drag `backend/cloud-storage-postman-collection.json` into Postman window

### 📖 Detailed Testing Guide

For comprehensive instructions on using the Postman collection (including Sinhala guide), see [POSTMAN_GUIDE.md](POSTMAN_GUIDE.md)

The collection includes:
- ✅ Single Image Operations
- ✅ Multiple Images Operations (Batch)
- ✅ Pre-configured request examples
- ✅ Test data samples

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 4.0.2
- **Language**: Java 25
- **Build Tool**: Maven
- **Cloud SDK**: Google Cloud Storage Libraries
- **Utilities**: Lombok

### Frontend
- **Framework**: Next.js 16.1.6
- **Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9

## 📚 Documentation

- [Backend README](backend/README.md) - Backend API documentation
- [Backend SETUP](backend/SETUP.md) - GCP configuration guide
- [Postman Guide](POSTMAN_GUIDE.md) - API testing instructions
- [Sinhala Guide](backend/SINHALA_GUIDE.md) - සිංහල භාෂා උපදෙස්

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.yaml`:
```yaml
gcp:
  project-id: your-project-id
  bucket-name: your-bucket-name
  credentials-path: path/to/service-account-key.json
```

### Frontend Configuration
Edit `frontend/lib/api.ts` to configure API base URL if needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Google Cloud Platform for cloud storage services
- Spring Boot and Next.js communities
- IJSE - Institute of Software Engineering

---

**Need Help?** Check the documentation files or raise an issue in the repository.
