'use client';

import { useState, useEffect } from 'react';
import SplashPage from "./SplashPage";
import IndexPage from "@/pages/Index";

const MainApp = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showLanding, setShowLanding] = useState(false);

  // Uncomment to check if user has already visited (shows splash once per session)
  // useEffect(() => {
  //   const hasVisited = sessionStorage.getItem('kalissea-visited');
  //   if (hasVisited) {
  //     setShowSplash(false);
  //     setShowLanding(true);
  //   }
  // }, []);

  const handleEnterSite = () => {
    // Mark as visited for this session (optional)
    sessionStorage.setItem('kalissea-visited', 'true');
    
    setShowSplash(false);
    // Small delay to allow splash animation to complete
    setTimeout(() => {
      setShowLanding(true);
    }, 200);
  };

  return (
    <div className="min-h-screen">
      {showSplash && <SplashPage onEnter={handleEnterSite} />}
      {showLanding && <IndexPage />}
    </div>
  );
};

export default MainApp;