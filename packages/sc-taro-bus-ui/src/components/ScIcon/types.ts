import { CommonEventFunction } from '@tarojs/components';
import { CSSProperties } from 'react';

export type ScIconProps = {
  size?: number;
  value: string;
  color?: string;
  prefixClass?: string;
  onClick?: CommonEventFunction;
  customStyle?: CSSProperties;
  className?: string;
  style?: CSSProperties;
};
