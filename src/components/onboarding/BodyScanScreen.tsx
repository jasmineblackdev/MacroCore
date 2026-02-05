import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Scan } from "lucide-react";

interface BodyScanScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const BodyScanScreen = ({ onComplete, onSkip }: BodyScanScreenProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const handleUpload = () => {
    setHasImage(true);
    setIsScanning(true);

    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setTimeout(onComplete, 800);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center font-display mb-3"
      >
        AI Body Scan
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-center mb-10 max-w-sm"
      >
        This helps us identify stubborn areas and optimize your nutrition plan
      </motion.p>

      {/* Camera Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden bg-card border-2 border-dashed border-border mb-8"
      >
        {!hasImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <Camera className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-center px-8">
              Take a full-body photo or upload an existing one
            </p>

            {/* Scan guidelines overlay */}
            <div className="absolute inset-4 border-2 border-primary/30 rounded-2xl pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-background rounded-full">
                <span className="text-xs text-primary">Align here</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-muted to-card flex items-center justify-center">
            {isScanning && (
              <>
                {/* Scanning animation */}
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ boxShadow: "0 0 20px hsl(var(--primary))" }}
                />

                {/* Scanning overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />

                {/* Status text */}
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent mb-4"
                  />
                  <span className="text-primary font-medium">
                    Analyzing body composition...
                  </span>
                </div>
              </>
            )}

            {!isScanning && hasImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <Scan className="w-8 h-8 text-secondary-foreground" />
                </div>
                <span className="text-secondary font-medium">
                  Analysis complete!
                </span>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm space-y-3"
      >
        {!hasImage && (
          <>
            <Button
              size="lg"
              onClick={handleUpload}
              className="w-full bg-gradient-hero hover:opacity-90 text-white py-6 text-lg font-semibold rounded-2xl shadow-button transition-all hover:scale-[1.02]"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Photo
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={onSkip}
              className="w-full text-muted-foreground hover:text-foreground py-6 text-lg rounded-2xl"
            >
              <X className="w-5 h-5 mr-2" />
              Skip for Now
            </Button>
          </>
        )}
      </motion.div>

      {/* Privacy note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 text-xs text-muted-foreground text-center max-w-xs"
      >
        🔒 Your photos are processed locally and never stored on our servers
      </motion.p>
    </div>
  );
};
