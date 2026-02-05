import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName?: string;
}

export const DashboardHeader = ({ userName = "there" }: DashboardHeaderProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-4 py-3 h-16 bg-background">
      <div className="flex flex-col">
        <h1 className="text-xl font-medium text-foreground">Hi {userName}</h1>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-6 h-6" />
          {/* Notification badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>

        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src="" alt={userName} />
          <AvatarFallback className="bg-card text-muted-foreground text-sm">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
