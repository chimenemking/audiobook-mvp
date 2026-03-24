// components/Navbar.tsx
import { motion } from "framer-motion";
import { Search, User } from "lucide-react";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-sm fixed top-0 left-0 z-50 px-6 py-3 flex justify-between items-center"
    >
      {/* Logo */}
      <div className="text-xl font-semibold text-gray-900">YourLogo</div>

      {/* Search + Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search audiobooks..."
            className="pl-8 pr-3 py-1 rounded-md border border-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <User className="text-gray-700 cursor-pointer hover:text-blue-500 transition-colors" size={22} />
      </div>
    </motion.nav>
  );
};