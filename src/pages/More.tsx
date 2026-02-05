import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bell, Palette, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { ProfileScreen } from "@/components/settings/ProfileScreen";
import { NotificationsScreen } from "@/components/settings/NotificationsScreen";
import { AppearanceScreen } from "@/components/settings/AppearanceScreen";
import { HelpScreen } from "@/components/settings/HelpScreen";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type ScreenType = "profile" | "notifications" | "appearance" | "help" | null;

const More = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>(null);

  const menuItems = [
    { icon: User, label: "Profile", description: "Manage your account", screen: "profile" as const },
    { icon: Bell, label: "Notifications", description: "Customize alerts", screen: "notifications" as const },
    { icon: Palette, label: "Appearance", description: "Theme and display", screen: "appearance" as const },
    { icon: HelpCircle, label: "Help & Support", description: "Get assistance", screen: "help" as const },
  ];

  const handleSignOut = () => {
    toast.success("Signed out successfully", {
      description: "See you next time!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center px-4 py-4 h-16 bg-background border-b border-border/30">
        <h1 className="text-xl font-semibold text-foreground">More</h1>
      </header>

      <ScrollArea className="h-[calc(100vh-64px-80px)]">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveScreen(item.screen)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border/30 hover:bg-accent transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-base font-medium text-foreground">{item.label}</span>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}

          <div className="pt-4">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-base font-medium text-destructive">Sign Out</span>
            </button>
          </div>
        </div>
      </ScrollArea>

      {/* Sub-screens */}
      <AnimatePresence>
        {activeScreen === "profile" && (
          <ProfileScreen onBack={() => setActiveScreen(null)} />
        )}
        {activeScreen === "notifications" && (
          <NotificationsScreen onBack={() => setActiveScreen(null)} />
        )}
        {activeScreen === "appearance" && (
          <AppearanceScreen onBack={() => setActiveScreen(null)} />
        )}
        {activeScreen === "help" && (
          <HelpScreen onBack={() => setActiveScreen(null)} />
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default More;
