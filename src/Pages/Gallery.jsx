// ExploreGallery.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShareAlt, FaTimes, FaPlay } from "react-icons/fa";

// local video imports - keep your exact paths
import dressesVideo from "../assets/vIDEOS/2.mov";
import btsVideo from "../assets/vIDEOS/4.mov";
import runwayVideo from "../assets/vIDEOS/5.mov";

/*
  Video list
  Keep as-is — you can replace the title/category/src with real data from your backend
*/
const allVideos = [
  { id: 1, title: "Dresses Highlight", category: "Dresses", src: dressesVideo },
  { id: 2, title: "Behind The Scenes", category: "BTS", src: btsVideo },
  { id: 3, title: "Runway Show", category: "Runway", src: runwayVideo },
  { id: 4, title: "Another Dress Style", category: "Dresses", src: dressesVideo },
  { id: 5, title: "BTS Styling", category: "BTS", src: btsVideo },
  { id: 6, title: "Runway Model Walk", category: "Runway", src: runwayVideo },
];

const CATEGORIES = ["All", "Dresses", "BTS", "Runway"];

const toastTimeout = 3000;

const ExploreGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  const observerRef = useRef();
  const gridVideoRefs = useRef(new Map()); // map of id -> video element

  const filteredVideos =
    selectedCategory === "All"
      ? allVideos
      : allVideos.filter((video) => video.category === selectedCategory);

  // Pagination (3 per page)
  useEffect(() => {
    try {
      const start = (page - 1) * 3;
      const newVideos = filteredVideos.slice(start, start + 3);
      // on page 1 replace; subsequent pages append
      setDisplayedVideos((prev) => (page === 1 ? [...newVideos] : [...prev, ...newVideos]));
    } catch (err) {
      console.error(err);
      setError("Failed to load videos.");
    }
  }, [page, filteredVideos]);

  // Reset when category changes
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  // IntersectionObserver to load next page
  const lastVideoRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && displayedVideos.length < filteredVideos.length) {
          setPage((p) => p + 1);
        }
      }, { rootMargin: "200px" });
      if (node) observerRef.current.observe(node);
    },
    [displayedVideos, filteredVideos]
  );

  // Pause all grid videos (use when modal opens)
const pauseAllGridVideos = useCallback(() => {
  gridVideoRefs.current.forEach((el) => {
    try {
      if (el && !el.paused) el.pause();
    } catch {
      // ignored
    }
  });
}, []);

  // Handle share (navigator.share or fallback copy)
  const handleShare = async (video) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?video=${video.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: "Watch this Oakress film.",
          url: shareUrl,
        });
        setToast("Shared successfully");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setToast("Link copied to clipboard");
      }
    } catch (err) {
      console.error(err);
      setToast("Could not share — try copying the link.");
    } finally {
      setTimeout(() => setToast(null), toastTimeout);
    }
  };

  // Open modal: set selected video and pause background grid videos
  const openModal = (video) => {
    pauseAllGridVideos();
    setSelectedVideo(video);
    // update hash so user can copy link to this video (optional)
    // history.replaceState(null, "", `?video=${video.id}`);
  };

  // Close modal
  const closeModal = () => {
    setSelectedVideo(null);
    // restore nothing — keep grid videos paused until user interacts
  };

  // keyboard escape to close modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // small UI polish: clear toast after timeout if not already done
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toastTimeout);
    return () => clearTimeout(t);
  }, [toast]);

  // premium color tokens
  const accent = "text-amber-600"; // subtle warm gold accent for Oakress
  const mutedText = "text-gray-600";

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <header className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold">Explore the Oakress Gallery</h2>
        <p className={`mt-3 max-w-2xl mx-auto ${mutedText}`}>
          Curated motion pieces — studio moments, runway highlights and behind-the-scenes films that reveal our craft.
        </p>
      </header>

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {/* Filters */}
      <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setDisplayedVideos([]);
              setToast(null);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? `bg-black text-white border border-black ${accent}`
                : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
            }`}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedVideos.map((video, index) => {
          const isLast = index === displayedVideos.length - 1;
          return (
            <motion.article
              key={video.id}
              ref={isLast ? lastVideoRef : null}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: "easeOut" }}
              className="relative rounded-xl overflow-hidden bg-gray-900 shadow-lg"
            >
              {/* Poster-like video block: we do NOT autoplay all videos to prevent noise; play on hover is removed */}
              <div className="relative h-56 sm:h-64 md:h-72 bg-black">
                <video
                  ref={(el) => {
                    if (el) gridVideoRefs.current.set(video.id, el);
                    else gridVideoRefs.current.delete(video.id);
                  }}
                  src={video.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  // we do not autoplay; user opens modal to watch
                />

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Center play CTA (opens modal) */}
                <button
                  onClick={() => openModal(video)}
                  className="absolute inset-0 flex items-center justify-center text-white"
                  aria-label={`Open ${video.title}`}
                >
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition">
                    <FaPlay className="text-white" />
                    <span className="uppercase text-sm font-semibold tracking-wider">{video.title}</span>
                  </div>
                </button>
              </div>

              {/* Footer: category + share */}
              <div className="flex items-center justify-between px-4 py-3 bg-white">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{video.title}</div>
                  <div className="text-xs text-gray-500">{video.category}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(video)}
                    className="text-sm text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition flex items-center gap-2"
                    aria-label={`Share ${video.title}`}
                  >
                    <FaShareAlt />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-lg overflow-hidden"
              initial={{ scale: 0.98, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 12 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                aria-label="Close video"
                className="absolute top-4 right-4 text-white bg-black/40 p-3 rounded-full z-50 hover:bg-black/60 transition"
              >
                <FaTimes />
              </button>

              <video
                src={selectedVideo.src}
                className="w-full max-h-[70vh] bg-black"
                controls
                autoPlay
              />

              <div className="px-6 py-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">{selectedVideo.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{selectedVideo.category}</p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href + `?video=${selectedVideo.id}`);
                      setToast("Direct link copied");
                    }}
                    className="px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => {
                      handleShare(selectedVideo);
                    }}
                    className="px-3 py-2 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
                  >
                    Share Film
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExploreGallery;
