import { ComponentClass, CSSProperties } from 'react';

export interface ScTabsPaneProps {
  className?: string;
  style?: CSSProperties;
  customStyle?: string | CSSProperties;
  children?: React.ReactNode;
  /**
   * Tab 方向，请跟 AtTabs 保持一致
   * @default 'horizontal'
   */
  tabDirection?: 'horizontal' | 'vertical';
  /**
   * 当前选中的标签索引值，从 0 计数，请跟 AtTabs 保持一致
   * @default 0
   */
  current: number;
  /**
   * tabPane 排序，从 0 计数
   * @default 0
   */
  index: number;
}

declare const ScTabsPane: ComponentClass<ScTabsPaneProps>;

export default ScTabsPane;
