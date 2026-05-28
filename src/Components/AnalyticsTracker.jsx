import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.umami) {
      window.umami.track();
    }
  }, [location]);

  return null;
}