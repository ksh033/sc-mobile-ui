import { Link } from "../types/common";
import { FONT_SIZE, FONT_WEIGHT, LOCATION } from "../types/contants";

type ComTitleProps = Link & {
  /** 标题样式 "old" 传统样式 | "wechat"  */
  styleType: "old" | "wechat";
  /** 标题 */
  title: string;
  /** 描述内容 */
  description?: string;
  /** 作者 */
  author?: string;
  /** 显示位置 */
  location?: LOCATION;

  /** 日期 */
  date?: string;
  /** 标题字体大小 */
  fontSize?: FONT_SIZE;
  /** 描述文本字体大小 */
  descriptionFontSize?: FONT_SIZE;
  /** 标题粗细 */
  fontWeight?: FONT_WEIGHT;
  /** 描述文本字体粗细 */
  descriptionFontWeight?: FONT_WEIGHT;
  /** 标题颜色 */
  color?: string;
  /** 描述颜色 */
  descriptionColor?: string;
  /** 背景颜色 */
  backgroundColor?: string;
};
