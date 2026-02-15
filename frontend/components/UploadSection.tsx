'use client';

import { useRef, useState } from 'react';

interface UploadSectionProps {
  onUpload: (files: FileList) => void;
  uploadProgress: string | null;
}

export default function UploadSection({
  onUpload,
  uploadProgress,
}: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-12">
      <div
        className={`relative border-4 border-dashed rounded-3xl p-16 text-center transition-all duration-300 ${
          dragActive
            ? 'border-black bg-gray-50 scale-[1.02]'
            : 'border-gray-400 bg-white/60 backdrop-blur-sm hover:border-black hover:bg-white/80'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />

        {uploadProgress ? (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-4 shadow-xl">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="text-green-600 font-black text-2xl">
              {uploadProgress}
            </div>
          </div>
        ) : (
          <>
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-black mb-3">
              Upload Images
            </h3>
            <p className="text-gray-700 mb-8 text-lg font-medium">
              Drag and drop your images here, or click to browse
            </p>
          </>
        )}

        <button
          onClick={handleClick}
          className="px-10 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Choose Files
        </button>

        <p className="text-sm text-gray-600 mt-6 font-semibold">
          Supports: JPG, PNG, GIF, WebP
        </p>
      </div>
    </div>
  );
}
