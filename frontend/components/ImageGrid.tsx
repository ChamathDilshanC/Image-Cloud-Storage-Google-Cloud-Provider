'use client';

import { useState } from 'react';

interface ImageGridProps {
  images: string[];
  onDelete: (filename: string) => void;
  getImageUrl: (filename: string) => string;
}

export default function ImageGrid({
  images,
  onDelete,
  getImageUrl,
}: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map(filename => (
          <div
            key={filename}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-black hover:scale-[1.02]"
          >
            <div
              className="aspect-square relative cursor-pointer overflow-hidden bg-gray-100"
              onClick={() => setSelectedImage(filename)}
            >
              <img
                src={getImageUrl(filename)}
                alt={filename}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <p
                className="text-sm text-black truncate font-bold mb-3"
                title={filename}
              >
                {filename}
              </p>

              <div className="flex gap-2">
                <a
                  href={getImageUrl(filename)}
                  download={filename}
                  className="flex-1 px-4 py-2.5 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-all duration-200 text-center shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-1"
                  onClick={e => e.stopPropagation()}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </a>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(filename);
                  }}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 flex items-center justify-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full-size image view */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <button
              className="absolute -top-14 right-0 w-12 h-12 bg-white rounded-full text-black text-2xl font-bold hover:bg-gray-200 transition-all duration-200 shadow-xl flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <img
                src={getImageUrl(selectedImage)}
                alt={selectedImage}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-black text-center mt-4 font-bold text-lg">
                {selectedImage}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
