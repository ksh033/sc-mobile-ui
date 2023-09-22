export type ComWhiteProps = {
  /**
   * 分割类型
   * 辅助空白 white 辅助线 line
   *
   * @default white
   */
  type: "white" | "line";
  /**
   * 选择样式
   *
   * 实线 solid 虚线 dashed 点线 dotted
   *
   * @default solid
   */
  lineType?: "solid" | "dashed" | "dotted";
  /**
   * 左右边距
   *
   * 0 无边距 1 左右留边
   *
   * @default 0
   */
  hasPadding?: "0" | "1";
  /**
   * 辅助线颜色
   *
   * @default #e5e5e5
   */
  color?: string;
  /**
   * 空白高度
   *
   * @default 30
   */
  height?: number;
};
