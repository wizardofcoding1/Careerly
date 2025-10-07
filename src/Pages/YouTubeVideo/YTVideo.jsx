import { useEffect, useState } from 'react';
import SearchBarYT from './YTVideoComponent/SearchBarYT';
import VideoCard from './YTVideoComponent/VideoCard';
import { UseQueryParam } from './YTVideoComponent/UseQueryParam';
import Navbar from '../../Components/Layout/Navbar';
import Footer from '../../Components/Layout/Footer';
import Loader from '../../Components/Common/Loader';

export default function YTVideo() {
  const [query, setQuery] = UseQueryParam('query');
  const [searchTerm, setSearchTerm] = useState(query);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(`https://careerly-1.onrender.com/api/youtube/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.videos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) setQuery(searchTerm.trim());
  };

  return (
    <div>
      <Navbar/>

    <div className="p-8 bg-gray min-h-screen">
      <SearchBarYT searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSubmit={handleSubmit} />
      {/* <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2> */}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader size="large" color="blue" />
          <p className="text-center mt-4 text-lg font-medium text-gray-600">Searching videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <p></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
      <Footer/>
    </div>
  );
}