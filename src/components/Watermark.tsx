import React from "react";

interface WatermarkProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Watermark overlay: bottom-right corner brand mark.
 * Wrap any image/gallery container in this to apply a non-interactive
 * "gymspayoga.com" watermark on top of media.
 */
const Watermark: React.FC<WatermarkProps> = ({ children, className = "" }) => {
  return (
    <div className={`wm-wrap relative ${className}`} data-watermark="true">
      {children}
    </div>
  );
};

export default Watermark;
