"use client";
import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  variant?: string;
}

const AppIcon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  // Map open-source icon names to installed heroicons
  const IconComponent = (HeroIcons as any)[name] || HeroIcons.QuestionMarkCircleIcon;
  return <IconComponent className={className} style={{ width: size, height: size }} />;
};
export default AppIcon;