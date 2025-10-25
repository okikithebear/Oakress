import { lazy, Suspense } from "react";

// Lazy load components
const Hero = lazy(() => import("../Components/Hero"));
const DesignDetails = lazy(() => import("../Components/DesignDetails"));
const Collections = lazy(() => import("../Components/Collections"));
const Editorials = lazy(() => import("../Components/Editorial"));
const ReadyOrder = lazy(() => import("../Components/ReadyToOrder"));
const Showcase = lazy(() => import("../Components/Showcase"));

// Sections array for DRY rendering
const sections = [
  { Component: Hero, id: "hero" },
  { Component: DesignDetails, id: "design-details" },
  { Component: Collections, id: "collections" },
  { Component: Editorials, id: "editorials" },
  { Component: ReadyOrder, id: "ready-order" },
  { Component: Showcase, id: "showcase" },
];

// Stylish full-page loader
const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="w-16 h-16 border-4 border-yellow-700 border-t-transparent rounded-full animate-spin"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

const Home = () => {
  return (
    <main className="overflow-x-hidden">
      <Suspense fallback={<Loader />}>
        {sections.map(({ Component, id }, index) => (
          <section
            key={id}
            id={id}
            className={`w-full ${index > 0 ? "py-16 px-6 md:px-12" : ""}`}
          >
            <Component />
          </section>
        ))}
      </Suspense>
    </main>
  );
};

export default Home;
