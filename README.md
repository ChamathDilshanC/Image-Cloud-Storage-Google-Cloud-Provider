# Image Cloud Storage - Frontend

A modern Next.js web application for managing cloud-stored images. This frontend provides an intuitive user interface for uploading, viewing, and managing images stored in Google Cloud Platform.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Configuration](#-configuration)
- [Development](#-development)

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6
- **Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9
- **Build Tool**: Next.js built-in tooling

## ✨ Features

- ✅ Modern, responsive UI
- ✅ Upload single or multiple images
- ✅ View image gallery with metadata
- ✅ Download images
- ✅ Delete images
- ✅ Real-time upload progress
- ✅ Image preview before upload
- ✅ Drag-and-drop support
- ✅ Mobile-friendly design
- ✅ PWA support via manifest

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 20.x or higher
- **npm**: 10.x or higher
- **Backend API**: Must be running on `http://localhost:8080`

### Installation

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (if needed)

   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Verify Installation

You should see:
- Upload section at the top
- Image gallery below
- Ability to select and upload images

## 📁 Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   ├── ImageGrid.tsx        # Image gallery component
│   └── UploadSection.tsx    # Upload UI component
├── lib/
│   └── api.ts               # API client functions
├── public/
│   └── manifest.json        # PWA manifest
├── .env.local               # Environment variables (create this)
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:3000` with hot-reload enabled.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `.next` directory.

### Start Production Server

```bash
npm run start
```

Runs the production build (requires `npm run build` first).

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8080

# Optional: Enable debug mode
NEXT_PUBLIC_DEBUG=false
```

### API Integration

The frontend connects to the backend API. Ensure the backend is running before using the frontend.

**Default API endpoint**: `http://localhost:8080/api/v1/images`

To change the API URL, update the environment variable or modify [`lib/api.ts`](lib/api.ts).

### Next.js Configuration

Custom configuration can be added to [`next.config.ts`](next.config.ts):

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your custom configuration
  images: {
    domains: ['localhost'], // Add allowed image domains
  },
};

export default nextConfig;
```

## 💻 Development Guide

### Component Structure

#### 1. Upload Section (`components/UploadSection.tsx`)

Handles:
- File selection (single or multiple)
- Drag-and-drop functionality
- Upload progress display
- File validation

#### 2. Image Grid (`components/ImageGrid.tsx`)

Handles:
- Displaying images in a responsive grid
- Image metadata display
- Download functionality
- Delete functionality

#### 3. API Client (`lib/api.ts`)

Provides functions for:
- `uploadImage(file)` - Upload single image
- `uploadImages(files)` - Upload multiple images
- `listImages()` - Fetch all images
- `downloadImage(filename)` - Download specific image
- `deleteImage(filename)` - Delete specific image

### Adding New Features

1. **Add new API function** to `lib/api.ts`
2. **Create or update component** in `components/`
3. **Import and use** in `app/page.tsx`
4. **Style with Tailwind** CSS classes

### Styling with Tailwind CSS

Tailwind CSS 4 is configured. Use utility classes:

```tsx
<div className="flex items-center justify-center p-4 bg-blue-500 rounded-lg">
  Content
</div>
```

Custom styles can be added to `app/globals.css`.

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Drag & Drop**: Drag files directly into upload area
- **Loading States**: Visual feedback during uploads
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error notifications
- **Image Preview**: Preview images before upload
- **Grid Layout**: Responsive image gallery

## 🧪 Testing

### Manual Testing

1. **Upload Single Image**
   - Click "Choose File" or drag image
   - Verify upload progress
   - Check image appears in gallery

2. **Upload Multiple Images**
   - Select multiple files
   - Verify all images upload
   - Check gallery updates

3. **Download Image**
   - Click download button on image
   - Verify file downloads

4. **Delete Image**
   - Click delete button
   - Confirm deletion
   - Verify image removed from gallery

### Integration Testing

Ensure backend is running and accessible before testing frontend features.

## 📦 Dependencies

### Production Dependencies

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3"
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19.2.14",
  "@types/react-dom": "^19.2.3",
  "eslint": "^9",
  "eslint-config-next": "16.1.6",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Deploy to Other Platforms

Build the production bundle:

```bash
npm run build
npm run start
```

The app will run on port 3000 by default.

### Environment Variables for Production

Set these in your hosting platform:

```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 🐛 Troubleshooting

### "Cannot connect to API"

**Solution**: 
- Ensure backend is running on `http://localhost:8080`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled on backend

### "Module not found" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

**Solution**:
```bash
# Run on different port
PORT=3001 npm run dev
```

### Build errors

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 🔗 Related Documentation

- **Backend API**: See [`../backend/README.md`](../backend/README.md)
- **API Testing**: See [`../POSTMAN_GUIDE.md`](../POSTMAN_GUIDE.md)
- **Setup Guide**: See [`../SETUP.md`](../SETUP.md)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Create feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📄 License

Educational project - IJSE (Institute of Software Engineering)

---

**Made with ❤️ using Next.js & React**

**Need Help?** Check the backend API documentation or contact via Slack.
