import { Link } from "../types/common";
/** 单个布局数据 */
export type SubEntryItem = Link & {
  /** 占据宽度切割 */
  width: number;
  /** 占据高度多少 */
  height: number;
  /** x位置 */
  x: number;
  /** y位置 */
  y: number;
  /** 图片地址 */
  url: string;
};
/** 布局参数 */
export type ComMagicCubeLayout = {
  /** 占据宽度切割 */
  width: number;
  /** 占据高度多少 */
  height: number;
  subEntry: SubEntryItem[];
};

export type ComMagicCubeProps = {
  /** 布局数据 */
  layout: ComMagicCubeLayout;
  /** 图片间距 */
  gutter?: number;
  /** 页面间距 */
  pageMargin?: number;
  /** id */
  id?: string;
};
