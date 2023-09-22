import { BaseImage } from "../types/common";

export type ComElevatorNavState = {
  current?: number;
};

export type SubEntryItem = BaseImage & {
  /** 文本 */
  title: string;
  /** 组件名称 */
  cmpName?: string;
  /** 组件id */
  cmpId?: string;
  /** key */
  key?: string;
};
/**
 * 模板类型
 * text 文字型  imageText 图文型  image 图片型
 */
export type ShowMethod = "text" | "imageText" | "image";

export type NavigationType = "background" | "round" | "box" | "underline";

/** 电梯导航参数 */
export type ComElevatorNavProps = {
  /**
   * 选择模板
   *
   * text 文字型  imageText 图文型  image 图片型
   *
   * @default text
   */
  showMethod: ShowMethod;
  /**
   * 标签
   */
  subEntry?: SubEntryItem[];
  /**
   * 展示方式
   *
   * select 下拉展示  scroll 横向滚动
   * @default scroll
   */
  slideSetting?: "select" | "scroll";
  /**
   * 标签样式
   *
   * background 背景模式  round 圆框 box 方框  underline 下划线
   *
   * @default underline
   */
  navigationType?: NavigationType;
  /**
   * 文本颜色-默认状态
   *
   * @default #969799
   */
  fontDefaultColor?: string;
  /**
   * 文本颜色-默认状态
   *
   * @default #000000
   */
  fontActiveColor?: string;
  /**
   * 圆框颜色
   *
   * @default #EE0A24
   */
  borderColor?: string;
  /**
   * 背景颜色
   *
   * @default #ffffff
   */
  backgroundColor?: string;
  /**
   * 一页显示多少个
   *
   * @default 5
   */
  count?: number;
};
