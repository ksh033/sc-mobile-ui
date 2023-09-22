import { BaseImage } from "../types/common";

export type ComImageTextNavItem = BaseImage & {
  /** 文本 */
  title: string;
  /** key */
  key?: string;
};

/**
 * 模板类型
 * text 文字型  imageText 图文型  image 图片型
 */
export type ComImageTextNavShowMethod = "text" | "imageText";

type ComImageTextNavProps = {
  /**
   * 选择模板
   *
   * text 文字型  imageText 图文型  image 图片型
   *
   * @default text
   */
  showMethod: ComImageTextNavShowMethod;
  /**
   * 标签
   */
  subEntry?: ComImageTextNavItem[];
  /**
   * 一页显示多少个
   *
   * @default 4
   */
  count?: number;
  /**
   * 背景颜色
   *
   * @default #ffffff
   */
  backgroundColor?: string;
  /**
   * 文字颜色
   *
   * @default #000
   */
  fontColor?: string;
  /**
   * 图片样式
   *
   * nowrap 不换行固定 scroll 横向滚动
   */
  imageFillStyle: "nowrap" | "scroll";
};
