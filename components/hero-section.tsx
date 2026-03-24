// components/HeroSection.tsx
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="w-full bg-white pt-24 pb-12 px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Discover Your Next Audiobook
        </h1>
        <p className="text-gray-600 mb-6">
          Listen anytime, anywhere. Explore curated recommendations, bestsellers, and hidden gems.
        </p>
        <button className="px-6 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
          Explore Now
        </button>
      </motion.div>

      {/* Featured Banner / Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <img
          src="/hero-audiobook.png"
          alt="Featured Audiobook"
          className="w-full rounded-lg shadow-md object-cover"
        />
      </motion.div>
    </section>
  );
};