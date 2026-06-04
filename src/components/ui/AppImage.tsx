"use client";
import React from 'react';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
  priority?: boolean; // Humne yahan priority prop ko define kiya
}

const AppImage: React.FC<AppImageProps> = ({ fill, className, priority, ...props }) => {
  // 'priority' ko upar destructure kar liya taake woh '...props' ke sath <img> tag me pass na ho
  return (
    <img 
      {...props} 
      className={`${className} ${fill ? 'absolute inset-0 w-full h-full object-cover' : ''}`} 
    />
  );
};

export default AppImage;