import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ResumeCard({ resume, isSelected, onSelect, onUse }) {
  return (
    <motion.div
      layoutId={`resume-${resume.id}`} // ✅ smoother animation between selections
      onClick={onSelect}
      className={`relative cursor-pointer rounded-2xl shadow-md flex flex-col p-4 ${
        isSelected
          ? "bg-blue-200 border-2 border-blue-600"
          : "bg-white border-0 hover:shadow-xl"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: isSelected ? 1.05 : 1 }}
      whileHover={{ scale: isSelected ? 1.07 : 1.03 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {/* ✅ Check Icon */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute top-3 right-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
          >
            <CheckCircle className="text-green-600 w-6 h-6 drop-shadow-md" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Image */}
      <motion.div
        className="flex items-center justify-center mb-4"
        layout
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <img
          src={resume.image}
          alt={`${resume.title} Template`}
          className="w-full h-56 object-contain rounded-md"
        />
      </motion.div>

      {/* Title & Description */}
      <motion.h3
        className="font-bold text-xl text-gray-800 text-center"
        layout
      >
        {resume.title}
      </motion.h3>
      <motion.p
        className="text-gray-600 text-sm text-center mb-4"
        layout
      >
        {resume.description}
      </motion.p>

      {/* Button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onUse(resume);
        }}
        className={`${
          isSelected ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded-md w-full mt-auto`}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        {isSelected ? "Selected!" : "Use Template"}
      </motion.button>
    </motion.div>
  );
}
