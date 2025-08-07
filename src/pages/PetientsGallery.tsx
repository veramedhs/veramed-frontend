import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Loader2, AlertTriangle } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';

// --- New Type Definitions to match your backend API response ---
interface Image {
  imageUrl: string;
  publicId: string;
  _id: string;
}

interface GalleryDoc {
  _id: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

// --- Helper function to programmatically create the mosaic effect ---
const getGridClassName = (index: number): string => {
  // Create a repeating pattern every 8 images
  const pattern = index % 8;
  switch (pattern) {
    case 0:
      return "md:col-span-2 md:row-span-2"; // Large square
    case 3:
      return "md:row-span-2"; // Tall rectangle
    case 4:
      return "md:col-span-2"; // Wide rectangle
    default:
      return ""; // Standard 1x1 square
  }
};


const PatientGalleryPage: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        // The API endpoint you provided
        const response = await apiClient.get<{ success: boolean; count: number; data: GalleryDoc[] }>('/api/v1/veramed/gallery');

        if (response.data.success) {
          // The API returns an array of gallery documents. Each document has an `images` array.
          // We need to flatten this into a single array of all images.
          const allImages = response.data.data.flatMap(doc => doc.images);
          setGalleryImages(allImages);
        } else {
          throw new Error("Failed to fetch gallery data.");
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
        setError("Could not load the patient gallery. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []); // Empty dependency array means this runs once on component mount

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="text-lg">Loading Patient Journeys...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-destructive">
          <AlertTriangle className="w-12 h-12 mb-4" />
          <p className="text-lg font-semibold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      );
    }
    
    if (galleryImages.length === 0) {
        return (
            <div className="text-center h-64 flex items-center justify-center">
                <p className="text-xl text-muted-foreground">No patient stories have been added yet.</p>
            </div>
        )
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image._id || image.publicId}
            className={`group relative overflow-hidden rounded-lg shadow-lg ${getGridClassName(index)}`}
          >
            <LazyLoadImage
              alt="Patient gallery image"
              src={image.imageUrl}
              effect="blur" // This enables the blur-up effect
              wrapperClassName="w-full h-full" // Important: The wrapper needs the dimensions
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            {/* The overlay effect remains */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="patient-gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Patient
            <span className="text-primary"> Journeys</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visual stories of hope, recovery, and renewed life from patients around the world.
          </p>
        </div>

        {renderContent()}
      </div>
    </section>
  );
};

export default PatientGalleryPage;