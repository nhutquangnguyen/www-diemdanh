'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Navigation link with loading state
 * Shows a spinner when clicked to give immediate feedback
 */
export default function NavLink({ href, children, className = '', onClick }: NavLinkProps) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const isActive = pathname === href;

  const handleClick = () => {
    setIsNavigating(true);
    onClick?.();

    // Reset after navigation (pathname change will trigger this)
    setTimeout(() => setIsNavigating(false), 2000);
  };

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? 'text-blue-600 bg-blue-50' : ''} relative`}
      onClick={handleClick}
    >
      <span className={isNavigating ? 'opacity-70' : ''}>{children}</span>
      {isNavigating && (
        <span className="ml-2 inline-block">
          <svg
            className="animate-spin h-4 w-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
    </Link>
  );
}
