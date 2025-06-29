import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className="relative w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300"
      style={{ backgroundColor: isDark ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        className="absolute top-1 flex items-center justify-center w-5 h-5 rounded-full bg-white"
        initial={false}
        animate={{ x: isDark ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon size={12} className="text-primary" />
        ) : (
          <Sun size={12} className="text-muted-foreground" />
        )}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
