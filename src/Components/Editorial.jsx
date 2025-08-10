import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import Modal from "react-modal";

import video1 from "../assets/videos/Video1.mp4";
import video2 from "../assets/videos/Video2.mp4";

Modal.setAppElement("#root");

const videos = [
  {
    id: "video1",
    src: video1,
    title: "Beautiful Nature Scene",
  },
  {
    id: "video2",
    src: video2,
    title: "Cityscape Timelapse",
  },
  {
    id: "video3",
    src: video2,
    title: "Cityscape Timelapse Duplicate",
  },
];

export default function EditorialVideoMasonry() {
  const [openVideo, setOpenVideo] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const breakpointCols = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-900">
          Editorial Video Showcase
        </h1>
        <p className="text-gray-700 text-lg">
          Explore a curated collection of breathtaking editorial videos
          capturing natures beauty and urban life. Click any video to watch it
          in full detail.
        </p>
      </motion.header>

      {/* Masonry Video Grid */}
      <Masonry
        breakpointCols={breakpointCols}
        className="flex gap-6"
        columnClassName="flex flex-col gap-6"
      >
        {videos.map(({ id, src, title }) => (
          <motion.div
            key={id}
            className="group relative aspect-video rounded-lg shadow-lg cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * videos.findIndex((v) => v.id === id) }}
            onClick={() => setOpenVideo({ src, title })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setOpenVideo({ src, title });
            }}
            aria-label={`Play video: ${title}`}
          >
            <video
              src={src}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.4v7.2a1 1 0 001.234.972l6.518-1.958a1 1 0 000-1.848z"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </Masonry>

      {/* Modal for full video */}
      <Modal
        isOpen={!!openVideo}
        onRequestClose={() => setOpenVideo(null)}
        contentLabel={openVideo ? openVideo.title : "Video player modal"}
        className="fixed inset-0 flex items-center justify-center p-4 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90 z-50"
        shouldCloseOnOverlayClick
        closeTimeoutMS={300}
      >
        {openVideo ? (
          <video
            src={openVideo.src}
            controls
            autoPlay
            className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
            aria-label={openVideo.title}
          />
        ) : (
          <div className="text-white">Loading...</div>
        )}
        <button
          onClick={() => setOpenVideo(null)}
          aria-label="Close video modal"
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Modal>

      {/* Footer call to action */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-3xl mx-auto text-center mt-16"
      >
        <p className="text-gray-700 mb-4">
          Enjoyed the videos? Follow us for more stunning visual stories and
          behind-the-scenes content.
        </p>
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={() => alert("Thanks for following!")}
        >
          Follow Us
        </button>
      </motion.footer>
    </section>
  );
}
