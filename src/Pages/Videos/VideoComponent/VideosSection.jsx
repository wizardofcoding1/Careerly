import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

import VideosHeader from "./VideoHeader";
import VideosSearchBar from "./VideoSearchBar";
import VideosGrid from "./VideoGrid";
import EmptyState from "./EmptyState";

export default function VideosSection() {
  const { user } = useUser();
  const [videos, setVideos] = useState([]);
  const [saved, setSaved] = useState([]); // saved video IDs
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved videos from backend
  useEffect(() => {
    if (!user) return;

    fetch(`/api/videos/all?clerkId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data || []); // backend returns array of saved videos
        setSaved((data || []).map((v) => v.videoId)); // extract saved IDs
      })
      .catch((err) => console.error("Error fetching saved videos:", err));
  }, [user]);

  // Toggle save/unsave
  const toggleSave = async (videoId) => {
    const isSaved = saved.includes(videoId);

    // Optimistic update
    setSaved((prev) =>
      isSaved ? prev.filter((id) => id !== videoId) : [...prev, videoId]
    );
    setVideos((prev) =>
      isSaved ? prev.filter((v) => v.videoId !== videoId) : prev
    );

    // Sync with backend
    try {
      await fetch(`/api/videos/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: user.id, videoId }),
      });
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  // Filter search
  const videosToDisplay = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-blue-50 to-sky-100 min-h-screen">
      <VideosHeader />

      <div className="p-6 max-w-6xl mx-auto">
        <VideosSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <AnimatePresence mode="wait">
          {videosToDisplay.length > 0 ? (
            <VideosGrid
              videos={videosToDisplay}
              saved={saved}
              toggleSave={toggleSave}
            />
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
