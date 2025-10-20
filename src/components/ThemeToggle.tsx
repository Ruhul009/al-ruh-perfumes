import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggleProps } from "../types";

const ThemeToggle = ({}: ThemeToggleProps): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
        theme === "dark" ? "bg-purple-600" : "bg-gray-300"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-sm flex items-center justify-center"
        animate={{
          x: theme === "dark" ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}>
        {theme === "dark" ? (
          <Moon className="w-2.5 h-2.5 text-purple-600" />
        ) : (
          <Sun className="w-2.5 h-2.5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
