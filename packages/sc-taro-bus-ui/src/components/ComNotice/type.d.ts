import { CornerType } from "../types/common";

export type ComNoticeProps = {
  /** 公告内容 */
  content?: string;
  /**
   * 背景颜色
   * @default #fff8e9
   */
  backgroundColor?: string;
  /**
   * 卡片背景
   *
   * @default transparent
   */
  cardBackgroundColor?: string;
  /**
   * 图片倒角 straight 直角 round 圆角
   * @default straight
   */
  cornerType?: CornerType;
  /** 是否需要上下边距 */
  hasTopBottomMargin?: boolean;
  /** 文本颜色 */
  color?: string;
  /** 提示文字 */
  placeholder?: string;
  /** 页面边距 */
  pageMargin?: number;
};
