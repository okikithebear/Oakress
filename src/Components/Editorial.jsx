import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import editorialVideo from "../assets/vIDEOS/Video1.mp4";

const Editorial = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted((m) => !m);
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  };

  return (
    <section
      aria-labelledby="editorial-heading"
      className="relative isolate overflow-hidden mt-20 mb-20"
    >
      {/* Video */}
      <div className="relative h-[60vh] sm:h-[70vh]">
        <video
          ref={videoRef}
          src={editorialVideo}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Soft gradient for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-10 sm:pb-14">
          <div className="max-w-2xl text-white">
            <h2
              id="editorial-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
            >
              Inside the Atelier
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-200/90">
              Go behind the seams—pattern cutting, hand-finishing, and every
              detail that brings each piece to life.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-200 transition"
                aria-label="Explore the gallery"
              >
                Explore the Gallery
              </Link>

              <button
                onClick={toggleMute}
                className="inline-flex items-center justify-center rounded-xl bg-neutral-800/70 px-4 py-3 text-sm font-medium text-white backdrop-blur hover:bg-neutral-700 transition"
                aria-pressed={!muted}
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;
