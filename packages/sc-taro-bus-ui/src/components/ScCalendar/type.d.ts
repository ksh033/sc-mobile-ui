export type ScCalendarDateValue = string | [string | null, string | null];

export type ScCalendarProps = {
  /** 显示弹窗 */
  isOpened?: boolean;
  onClose?: () => void;
  /** 标题 */
  title?: string;
  /** 选择类型 */
  type?: 'single' | 'range';
  /** 字体颜色 */
  fontColor?: string;
  /** 是否启用年份切换 */
  isChangeYear?: boolean;
  /** 确定按钮文字 */
  confirmText?: string;
  /** 最小选择日期 */
  min?: Date;
  /** 最大选择日期 */
  max?: Date;
  /** 值 */
  value?: ScCalendarDateValue;
  /** 完成类型，分为选择出发完成 和 点击按钮出发完成 */
  confirmType?: 'button' | 'end';
  /** 回填值 */
  onComfirm?: (val: ScCalendarDateValue) => void;
  /** 背景颜色 */
  background?: string;
  /** 是否需要阴影 */
  isShadow?: boolean;
  /**  是否圆角 */
  isRound?: boolean;
  /** 日期范围选择模式下，范围开始日期的颜色 */
  rangeStartColor?: string;
  /** 日期范围选择模式下，处于范围之间的日期颜色 */
  rangeColor?: string;
  /** 日期范围选择模式下，范围结束的日期颜色 */
  rangeEndColor?: string;
  /**
   * @description 日期单选模式下选中的日期颜色
   */
  touchColor?: string;
};
export type DaySelectType =
  | 'point'
  | 'start-only'
  | 'actives-point'
  | 'range'
  | 'range-center'
  | 'range-left'
  | 'range-right'
  | 'start'
  | 'stop-only'
  | 'stop';

export type DayItem = {
  text?: string;
  /** 号数 */
  date: number;
  /** 星期几 */
  day: string | number;
  /** 毫秒时间戳 */
  time: number;
  /** 选中类型 */
  type?: DaySelectType;
  /** 不可选标识 */
  hide?: boolean;
};
/** 当前月份数据 */
export type NowDate = {
  text?: string;
  year: number;
  month: number;
};

export type ScCalendarState = {
  /** 当月日期数据 */
  days: DayItem[];
  /** 日历开头空格数量 */
  spacingNum: number;
  /** 当前月份数据 */
  nowDate: NowDate;
  /**范围选择  */
  rangesValue: [number | null, number | null] | [];
  /** 为单选模式时候选择的日期 */
  touch: number;
  /** 单选模式下，actives传值子元素类型标记 */
  activesChildType?: 'string' | 'object';
};
