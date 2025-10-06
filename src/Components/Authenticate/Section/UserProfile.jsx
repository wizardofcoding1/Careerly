import { useState } from "react";
import { Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideosSection() {
  const allVideos = [
    { id: 1, title: "React Basics", thumbnail: "https://placehold.co/300x180" },
    { id: 2, title: "Node.js Crash Course", thumbnail: "https://placehold.co/300x180" },
    { id: 3, title: "MongoDB Tutorial", thumbnail: "https://placehold.co/300x180" },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [saved, setSaved] = useState([2]);

  const toggleSave = (videoId) => {
    setSaved((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const videosToDisplay =
    activeTab === "all"
      ? allVideos
      : allVideos.filter((video) => saved.includes(video.id));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Videos</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Videos
        </button>

        <button
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === "saved"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
      </div>

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        {videosToDisplay.length > 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {videosToDisplay.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl overflow-hidden shadow-md border hover:shadow-lg transition"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3 flex justify-between items-center">
                  <h2 className="font-semibold text-lg">{video.title}</h2>
                  <button
                    onClick={() => toggleSave(video.id)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      saved.includes(video.id)
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {saved.includes(video.id) ? "Unsave" : "Save"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
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
              You haven't saved any videos yet. Go to "All Videos" and save some!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
