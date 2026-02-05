import { NavLink, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, Plus, TrendingUp, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  isCenter?: boolean;
}

const navItems: NavItem[] = [
  { path: "/dashboard", label: "Home", icon: <Home className="w-6 h-6" /> },
  { path: "/meals", label: "Meals", icon: <UtensilsCrossed className="w-6 h-6" /> },
  { path: "/log", label: "Log", icon: <Plus className="w-7 h-7" />, isCenter: true },
  { path: "/progress", label: "Progress", icon: <TrendingUp className="w-6 h-6" /> },
  { path: "/more", label: "More", icon: <MoreHorizontal className="w-6 h-6" /> },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background border-t border-border/50 z-50">
      <div className="flex items-center justify-around h-full max-w-md mx-auto px-4 pb-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          if (item.isCenter) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative -mt-4"
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full",
                    "bg-primary shadow-lg shadow-primary/30",
                    "transition-all duration-200"
                  )}
                >
                  <Plus className="w-7 h-7 text-primary-foreground" />
                </motion.div>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 py-2 px-3"
            >
              <motion.div
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.icon}
              </motion.div>
              <span
                className={cn(
                  "text-[11px] font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
