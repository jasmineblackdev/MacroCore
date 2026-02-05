import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BodyPhoto {
  id: string;
  date: string;
  imageUrl: string;
}

interface BodyPhotosProps {
  photos: BodyPhoto[];
  onAddPhoto?: () => void;
}

export const BodyPhotos = ({ photos, onAddPhoto }: BodyPhotosProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="p-4 rounded-xl bg-card border border-border/30"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Progress Photos</h3>
        <Button variant="ghost" size="sm" onClick={onAddPhoto} className="text-primary">
          <Camera className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-3">
            <Camera className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No progress photos yet</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={onAddPhoto}>
            <Plus className="w-4 h-4 mr-1" />
            Take Your First Photo
          </Button>
        </div>
      ) : (
        <div className="relative">
          {/* Photo Display */}
          <div className="aspect-[3/4] rounded-lg bg-background overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              📸
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-background/80 text-xs text-foreground">
              {photos[currentIndex]?.date}
            </div>
          </div>

          {/* Navigation */}
          {photos.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </>
          )}

          {/* Dots */}
          {photos.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    i === currentIndex ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
