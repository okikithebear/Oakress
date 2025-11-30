import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import editorialVideo from "../assets/Videos/2.mp4";

const Editorial = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <section className="relative isolate overflow-hidden mt-20 mb-20">
      {/* Video */}
      <div className="relative h-[85vh] w-full">
        <video
          ref={videoRef}
          src={editorialVideo}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-6 pb-14">
          <div className="max-w-2xl text-white space-y-4">
            <p className="tracking-[0.25em] uppercase text-sm text-gray-300">
              Oakress Editorial
            </p>

            <h2 className="text-4xl sm:text-5xl font-light uppercase leading-tight">
              Movement. Texture. Identity.
            </h2>

            <p className="text-gray-200">
              Every Oakress piece is crafted with intention—clean lines, bold
              energy, and a timeless aesthetic built for today’s culture.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4 flex-wrap">
              <Link
                to="/collections-page"
                className="px-6 py-3 bg-white text-black text-sm font-medium tracking-wide uppercase hover:bg-gray-200 transition"
              >
                Explore Collection
              </Link>

              <Link
                to="/gallery"
                className="px-6 py-3 border border-white text-white text-sm font-medium tracking-wide uppercase hover:bg-white hover:text-black transition"
              >
                View Gallery
              </Link>

              <button
                onClick={toggleMute}
                className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition rounded-full"
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editorial;
