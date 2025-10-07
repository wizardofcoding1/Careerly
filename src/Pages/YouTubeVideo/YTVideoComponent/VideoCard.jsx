import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react"; // Heart icon

export default function VideoCard({ video }) {
  const { user } = useUser();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if this video is already saved
  useEffect(() => {
    if (!user) return;
    fetch(`https://careerly-1.onrender.com/api/videos/is-saved?videoId=${encodeURIComponent(video.id)}&clerkId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setSaved(Boolean(data.saved)))
      .catch(() => {});
  }, [user, video.id]);

  const toggleSave = async () => {
    if (!user) return; // user must sign in
    setLoading(true);

    try {
      if (!saved) {
        // ✅ Save video
        const res = await fetch("https://careerly-1.onrender.com/api/videos/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: user.id,
            videoId: video.id,
            title: video.title,
            description: video.description,
            thumbnail: video.thumbnail,
          }),
        });
        if (!res.ok) throw new Error("Save failed");
        setSaved(true);
      } else {
        // ✅ Unsave video
        const res = await fetch("https://careerly-1.onrender.com/api/videos/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkId: user.id, videoId: video.id }),
        });
        if (!res.ok) throw new Error("Delete failed");
        setSaved(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* ✅ Thumbnail / Iframe */}
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-t-2xl"
        ></iframe>
      </div>

      {/* ✅ Content with Heart on the right */}
      <div className="p-4 flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          {video.description && (
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {video.description}
            </p>
          )}
        </div>

        {user && (
          <button
            onClick={toggleSave}
            disabled={loading}
            className="ml-3 bg-white/80 hover:bg-gray-100 rounded-full p-2 shadow-md transition"
          >
            <Heart
              className={`h-6 w-6 ${saved ? "text-red-500 fill-red-500" : "text-gray-600"}`}
            />
          </button>
        )}
      </div>

      {/* Overlay Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-400/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
}