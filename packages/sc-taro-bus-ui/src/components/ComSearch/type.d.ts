export type ComSearchProps = {
  /**
   * 显示位置
   * noraml 正常模式  sticky 滚动至顶部固定
   *
   * @default normal
   */
  positionType?: "normal" | "sticky";
  /**
   * 展示模式
   * fixed 常驻模式 scroll 上滑消失下滑出现
   *
   * @default fixed
   */
  positionShowMethod?: "fixed" | "scroll";
  /**
   * 框体样式
   * square 方形 round 圆形
   *
   * @default round
   */
  borderStyleMethod?: "square" | "round";
  /**
   * 文本位置
   * left 居左 center 居中
   *
   * @default left
   */
  textAlign?: "left" | "center";
  /**
   * 文本颜色
   *
   * @default #969799
   */
  textColor?: string;
  /**
   * 背景颜色
   * @default #F9F9F9
   */
  backgroundColor: string;
  /**
   * 框体颜色
   * @default #FFF
   */
  borderStyleColor: string;
  /** 值 */
  value?: string;
  /** 值变化 */
  onChange?: (val: string) => void;
  /**
   * 箱体高度
   * @default 40
   *
   */
  height?: number;
  /** 样式 */
  style?: React.CSSProperties;
  /** 样式 */
  className?: string;
  /** 文本备注 */
  placeholder?: string;

  id?: string;
};
