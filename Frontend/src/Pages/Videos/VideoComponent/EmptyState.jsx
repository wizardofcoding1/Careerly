
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-64 text-center text-gray-500"
    >
      <Bookmark size={48} className="mb-4 text-gray-400" />
      <h2 className="text-xl font-semibold">No Saved Videos</h2>
      <p className="text-gray-400 mt-2">
        You haven’t saved any videos yet.
      </p>
    </motion.div>
  );
}
