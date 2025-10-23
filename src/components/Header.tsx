import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { HeaderProps } from "../types";

interface NavItem {
  name: string;
  href: string;
}

const Header = ({}: HeaderProps): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "Home", href: "#" },
    { name: "Products", href: "#products" },
    { name: "Categories", href: "#categories" },
    { name: "About", href: "#footer" },
  ];

  return (
    <motion.header
      className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-4"
            whileHover={{ scale: 1.05 }}>
            {/* Minimalist Icon */}
            <div className="relative">
              <div className="w-8 h-6 sm:w-12 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm transform rotate-12 shadow-md">
                <div className="absolute inset-1 bg-white/30 rounded-sm"></div>
                <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-white rounded-full"></div>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full"></div>
              <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full"></div>
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                  Al Ruh
                </h1>
                <div className="flex space-x-0.5 sm:space-x-1">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-purple-500 rounded-full"></div>
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-pink-500 rounded-full"></div>
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-4 h-px sm:w-6 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 tracking-wider">
                  PERFUMES
                </span>
                <div className="w-4 h-px sm:w-6 bg-gradient-to-r from-pink-400 to-purple-400"></div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300"
                whileHover={{ y: -2 }}>
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <button
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu">
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}>
          <div className="py-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors duration-300 touch-manipulation"
                whileHover={{ x: 10 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;
