import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  const [name, setName] = useState("Jasmine");
  const [email, setEmail] = useState("jasmine@example.com");
  const [age, setAge] = useState("28");
  const [height, setHeight] = useState("5'6\"");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-background z-50"
    >
      <header className="flex items-center gap-3 px-4 py-4 h-16 border-b border-border/30">
        <button onClick={onBack} className="p-1">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">Profile</h1>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "Save" : <Edit2 className="w-4 h-4" />}
        </Button>
      </header>

      <div className="p-4 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-4xl text-primary-foreground font-semibold">
              {name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
              <Camera className="w-4 h-4 text-foreground" />
            </button>
          </div>
          <h2 className="text-xl font-semibold text-foreground mt-3">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="bg-card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="bg-card"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={!isEditing}
                className="bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                disabled={!isEditing}
                className="bg-card"
              />
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="p-4 rounded-xl bg-card border border-border/30">
          <h3 className="font-semibold text-foreground mb-2">Current Goal</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-medium text-foreground">Lose Fat</p>
              <p className="text-sm text-muted-foreground">Started Jan 15, 2026</p>
            </div>
          </div>
        </div>

        {/* Diet Preference */}
        <div className="p-4 rounded-xl bg-card border border-border/30">
          <h3 className="font-semibold text-foreground mb-2">Diet Preference</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥩</span>
            <p className="font-medium text-foreground">Omnivore</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
