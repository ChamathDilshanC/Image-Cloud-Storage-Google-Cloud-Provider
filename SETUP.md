# Setup Instructions

Welcome! This guide will help you configure the application with your own Google Cloud Platform (GCP) credentials.

## Prerequisites

Before you begin, make sure you have:

- A Google Cloud Platform account
- A GCP project created
- Google Cloud Storage API enabled in your project
- A service account with appropriate permissions
- A Cloud Storage bucket created

## Configuration Steps

### 1. Create Your GCP Service Account Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **IAM & Admin** → **Service Accounts**
3. Create a new service account or use an existing one
4. Grant the service account the **Storage Object Admin** role (or appropriate storage permissions)
5. Create a JSON key for the service account and download it

### 2. Configure Application Files

#### Step 1: Configure application.yaml

1. Copy the example configuration file:

   ```bash
   cp src/main/resources/application.yaml.example src/main/resources/application.yaml
   ```

2. Open `src/main/resources/application.yaml` and update the following values:
   - `gcp.project-id`: Your GCP project ID
   - `gcp.credentials-location`: The path to your service account JSON file (e.g., `/your-credentials-file.json`)
   - `gcp.bucket-name`: Your Cloud Storage bucket name
   - `gcp.bucket-id`: Your Cloud Storage bucket ID (usually the same as bucket name)

   **Example:**

   ```yaml
   gcp:
     project-id: my-awesome-project
     credentials-location: /my-service-account-credentials.json
     bucket-name: my-cloud-storage-bucket
     bucket-id: my-cloud-storage-bucket
   ```

#### Step 2: Add Your Service Account Credentials

1. Rename your downloaded GCP service account JSON file to match the filename specified in `gcp.credentials-location`

2. Place the JSON file in `src/main/resources/` directory

   **OR**

   Copy the example file and replace its contents:

   ```bash
   cp src/main/resources/enterprise-cloud-architecture-996070209beb.json.example src/main/resources/your-credentials-file.json
   ```

   Then paste your actual service account JSON content into the new file.

### 3. Verify Your Setup

Your `src/main/resources/` directory should now contain:

- ✅ `application.yaml` (with your actual configuration)
- ✅ `your-credentials-file.json` (your actual GCP service account key)
- ℹ️ `application.yaml.example` (example file - kept for reference)
- ℹ️ `*.json.example` (example file - kept for reference)

### 4. Build and Run

```bash
# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

## Security Notes

⚠️ **IMPORTANT**: Never commit your actual credentials to version control!

- The `.gitignore` file is already configured to exclude:
  - `application.yaml`
  - Any JSON files matching the pattern `*-*.json` in the resources directories

- Always keep your service account credentials secure
- Use environment-specific configurations for different deployment environments
- Consider using secret management services (like Google Secret Manager, AWS Secrets Manager, etc.) for production deployments

## Troubleshooting

### "Credentials not found" error

- Verify the `gcp.credentials-location` path in `application.yaml` matches your JSON filename
- Ensure the JSON file is in the `src/main/resources/` directory

### "Permission denied" error

- Check that your service account has the necessary Cloud Storage permissions
- Verify the bucket name in `application.yaml` matches your actual bucket

### "Bucket not found" error

- Ensure your Cloud Storage bucket exists in your GCP project
- Verify you're using the correct project ID and bucket name

## Need Help?

If you encounter issues, please check:

1. Your GCP project has Cloud Storage API enabled
2. Your service account has appropriate IAM permissions
3. Your bucket exists and is accessible
4. The configuration files are in the correct location

For more information, refer to the [Google Cloud Storage Documentation](https://cloud.google.com/storage/docs).
