'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Top loading bar that shows during navigation
 * Provides visual feedback when clicking navigation links
 */
export default function NavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading animation when pathname changes
    setLoading(true);
    setProgress(70); // Quick jump to 70%

    // Simulate progress
    const timer = setTimeout(() => {
      setProgress(100);
    }, 300);

    // Complete loading after animation
    const completeTimer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out shadow-lg"
      style={{
        width: `${progress}%`,
        opacity: loading ? 1 : 0,
      }}
    >
      {/* Animated shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
    </div>
  );
}
