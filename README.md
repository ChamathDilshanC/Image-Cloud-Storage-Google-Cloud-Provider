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

The application will start on the default port and create the local storage directory at `~/.ijse/eca/storage` if it does not already exist.

## Testing

A Postman collection is available for testing the API endpoints:

[Cloud Storage in Action - Postman Collection](https://www.postman.com/ijse-eca-5768309/workspace/eca-69-70/collection/47280517-cecdea88-0a8b-4f46-b093-4af12ba9ac0d?action=share&creator=47280517)

## Need Help?

If you encounter any issues during the migration, feel free to reach out and start a discussion via the **Slack workspace**.
