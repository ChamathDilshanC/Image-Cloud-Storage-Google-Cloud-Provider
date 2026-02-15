const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const API_ENDPOINT = `${API_BASE_URL}/api/v1/images`;

export interface UploadResult {
  totalFiles: number;
  successCount: number;
  failedCount: number;
  results: Array<{
    filename: string;
    status: string;
    message?: string;
  }>;
}

export async function uploadImages(files: FileList): Promise<UploadResult> {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i]);
  }

  const response = await fetch(`${API_ENDPOINT}/batch`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
}

export async function listImages(): Promise<string[]> {
  const response = await fetch(API_ENDPOINT);

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  return response.json();
}

export async function deleteImage(filename: string): Promise<void> {
  const response = await fetch(`${API_ENDPOINT}/${filename}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Delete failed');
  }
}

export function getImageUrl(filename: string): string {
  return `${API_ENDPOINT}/${encodeURIComponent(filename)}`;
}

export async function deleteMultipleImages(filenames: string[]): Promise<{
  totalFiles: number;
  successCount: number;
  failedCount: number;
  results: Record<string, boolean>;
}> {
  const response = await fetch(`${API_ENDPOINT}/batch`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filenames }),
  });

  if (!response.ok) {
    throw new Error('Batch delete failed');
  }

  return response.json();
}
