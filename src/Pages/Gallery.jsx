import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShareAlt, FaTimes } from "react-icons/fa";
import dressesVideo from "../assets/vIDEOS/Video1.mp4";
import btsVideo from "../assets/vIDEOS/Video2.mp4";
import runwayVideo from "../assets/vIDEOS/Video2.mp4";

const allVideos = [
  { id: 1, title: "Dresses Highlight", category: "Dresses", src: dressesVideo },
  {
    id: 2,
    title: "Behind The Scenes",
    category: "Behind the Scenes",
    src: btsVideo,
  },
  { id: 3, title: "Runway Show", category: "Runway", src: runwayVideo },
  {
    id: 4,
    title: "Another Dress Style",
    category: "Dresses",
    src: dressesVideo,
  },
  { id: 5, title: "BTS Styling", category: "Behind the Scenes", src: btsVideo },
  { id: 6, title: "Runway Model Walk", category: "Runway", src: runwayVideo },
];

const ExploreGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  const observerRef = useRef();

  const filteredVideos =
    selectedCategory === "All"
      ? allVideos
      : allVideos.filter((video) => video.category === selectedCategory);

  // Load videos in pages (infinite scroll)
  useEffect(() => {
    try {
      const start = (page - 1) * 3;
      const newVideos = filteredVideos.slice(start, start + 3);
      setDisplayedVideos((prev) => [...prev, ...newVideos]);
    } catch (err) {
      console.error(err);
      setError("Failed to load videos.");
    }
  }, [page, filteredVideos]);

  // Reset videos on category change
  useEffect(() => {
    setDisplayedVideos(filteredVideos.slice(0, 3));
    setPage(1);
  }, [selectedCategory, filteredVideos]);

  const lastVideoRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          displayedVideos.length < filteredVideos.length
        ) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [displayedVideos, filteredVideos]
  );

  const handleShare = async (video) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: "Check out this fashion video!",
          url: window.location.href,
        });
      } else {
        setToast("Share feature not supported, link copied!");
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (err) {
      console.error(err);
      setToast("Could not share. Try manually.");
    }

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section className="text-white py-10 px-6 md:px-12">
      <h2 className="text-3xl text-black font-bold mb-4 text-center">
        Explore Our Gallery
      </h2>

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* Category Filters */}
      <div className="flex justify-center gap-4 mb-8">
        {["All", "Dresses", "Behind the Scenes", "Runway"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-purple-600"
                : "bg-gray-700 hover:bg-purple-500"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedVideos.map((video, index) => (
          <motion.div
            key={video.id}
            ref={index === displayedVideos.length - 1 ? lastVideoRef : null}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            <video
              src={video.src}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              muted
              loop
              playsInline
              preload="metadata"
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition">
              <button
                className="bg-white text-black px-3 py-2 rounded-md text-sm font-semibold"
                onClick={() => setSelectedVideo(video)}
              >
                View
              </button>
              <button
                className="bg-purple-600 px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-2"
                onClick={() => handleShare(video)}
              >
                <FaShareAlt /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-md shadow-lg">
          {toast}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)} // ✅ Close on click outside
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-3xl px-4"
              onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside modal
            >
              <button
                className="absolute top-4 right-4 text-white text-3xl z-50"
                onClick={() => setSelectedVideo(null)}
              >
                <FaTimes />
              </button>
              <video
                src={selectedVideo.src}
                className="w-full h-auto rounded-lg"
                controls
                autoPlay
              />
              <p className="mt-4 text-center text-lg font-semibold">
                {selectedVideo.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExploreGallery;
