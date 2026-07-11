"use client";

import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Lightweight CSS-only fade — no framer-motion, zero JS overhead
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <div className="page-fade w-full">
      {children}
    </div>
  );
};
export default PageTransition;
