import type React from 'react';

export type ToolOption = 'watermark' | 'rotate' | 'split' | 'pageNumber' | 'organise' | 'protect' | 'unlock';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  color: string;
  bgColor: string;
  isServerTool?: boolean;
  options?: ToolOption;
}

export type Page = 'home' | 'pricing' | 'about' | 'contact' | 'login' | 'signup' | 'tools';