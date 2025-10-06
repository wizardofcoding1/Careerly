import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

export default function VideosGrid({ videos, saved, toggleSave }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const playersRef = useRef({});
  const containerRef = useRef(null);

  // Pause others when activeVideo changes
  useEffect(() => {
    Object.entries(playersRef.current).forEach(([id, player]) => {
      if (!player) return;
      if (id === activeVideo) {
        player.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
      } else {
        player.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
      }
    });
  }, [activeVideo]);

  // IntersectionObserver → autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute("data-videoid");
          if (entry.isIntersecting) {
            setActiveVideo(videoId);
          }
        });
      },
      { threshold: 0.7 } // video must be 70% visible
    );

    const iframes = containerRef.current?.querySelectorAll("iframe") || [];
    iframes.forEach((iframe) => observer.observe(iframe));

    return () => {
      iframes.forEach((iframe) => observer.unobserve(iframe));
    };
  }, [videos]);

  return (
    <motion.div
      ref={containerRef}
      key="videos"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {videos.map((video) => (
        <motion.div
          key={video._id || video.videoId || video.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl overflow-hidden shadow-lg border hover:shadow-2xl transition bg-white flex flex-col"
        >
          {/* Inline YouTube Player */}
          <div className="aspect-video">
            <iframe
              data-videoid={video.videoId}
              ref={(el) => (playersRef.current[video.videoId] = el?.contentWindow)}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}?enablejsapi=1&rel=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Title + Save Button */}
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
              {video.title}
            </h2>
            <button
              onClick={() => toggleSave(video.videoId)}
              className={`p-2 rounded-full transition ${
                saved.includes(video.videoId)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-green-500 hover:text-white"
              }`}
            >
              <Bookmark size={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
