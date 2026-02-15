'use client';

import ImageGrid from '@/components/ImageGrid';
import UploadSection from '@/components/UploadSection';
import { deleteImage, getImageUrl, listImages, uploadImages } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const imageList = await listImages();
      setImages(imageList);
    } catch (err) {
      setError('Failed to load images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (files: FileList) => {
    try {
      setUploadProgress('Uploading...');
      setError(null);
      const result = await uploadImages(files);
      setUploadProgress(
        `Uploaded ${result.successCount} of ${result.totalFiles} images`
      );
      setTimeout(() => setUploadProgress(null), 3000);
      await fetchImages();
    } catch (err) {
      setError('Failed to upload images');
      setUploadProgress(null);
      console.error(err);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return;

    try {
      await deleteImage(filename);
      await fetchImages();
    } catch (err) {
      setError('Failed to delete image');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen w-full relative">
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: '#ffffff',
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-[1800px] mx-auto">
          <header className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-black rounded-2xl mb-6 shadow-2xl">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h1 className="text-7xl font-black text-black mb-4 tracking-tight">
              Cloud Storage
            </h1>
            <p className="text-gray-700 text-xl font-medium">
              Upload, manage, and share your images securely
            </p>
          </header>

          <UploadSection
            onUpload={handleUpload}
            uploadProgress={uploadProgress}
          />

          {error && (
            <div className="bg-red-50 border-2 border-red-500 text-red-700 px-6 py-4 rounded-2xl mb-8 shadow-lg font-semibold">
              ⚠️ {error}
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-black">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-black">
                Gallery <span className="text-gray-500">({images.length})</span>
              </h2>
              <button
                onClick={fetchImages}
                className="group px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading}
              >
                <span className={loading ? 'animate-spin' : ''}>↻</span>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {loading && images.length === 0 ? (
              <div className="text-center py-20">
                <div className="animate-spin text-6xl mb-6">↻</div>
                <p className="text-gray-600 text-lg font-semibold">
                  Loading images...
                </p>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 opacity-20">📷</div>
                <p className="text-gray-600 text-xl font-semibold">
                  No images yet. Upload some to get started!
                </p>
              </div>
            ) : (
              <ImageGrid
                images={images}
                onDelete={handleDelete}
                getImageUrl={getImageUrl}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
