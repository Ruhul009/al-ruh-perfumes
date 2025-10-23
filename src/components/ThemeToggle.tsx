import { motion } from "framer-motion";
import { SunIcon, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { ThemeToggleProps } from "../types";

const ThemeToggle = ({}: ThemeToggleProps): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      {theme === "dark" ? (
        <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
      ) : (
        <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
