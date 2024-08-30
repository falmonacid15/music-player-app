"use client";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import { appearanceAnimation } from "@/constants/appearance-animation-config";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="light"
            variants={appearanceAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <IoSunnyOutline size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            variants={appearanceAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <IoMoon size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
