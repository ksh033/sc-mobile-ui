import { ITouchEvent } from '@tarojs/components'
import zero = require('./../../hooks/useSignCanvas/layout/zero')
import { SIZE } from '../types/contants'

/** circle-arrow 园箭头  buy-now: 立即抢*/
export type ButtonInitType =
  | 'cart1'
  | 'cart2'
  | 'hollow'
  | 'fill'
  | 'circle-fill'
  | 'square-fill'
  | 'circle-hollow'
  | 'square-hollow'
  | 'none'

export type BtnType = {
  /**
   * 初始化按钮类型
   *  @default 'fill'
   */
  btnType?: ButtonInitType
  /** 是否显示初始化的按钮 */
  showInitBtn?: boolean
  /** 按钮形状 */
  btnShape?: StepperType
  /** 按钮初始化文本 */
  btnText?: string
  /** 初始化按钮事件 */
  initBtnClick?: (event: ITouchEvent) => void
}

export type StepperType = 'circle' | 'border'

export type ScStepperInitBtnProps = BtnType & {
  /**整体的大小 */
  size?: SIZE
}

export type ScBaseStepperProps = {
  /**
   * 唯一键值
   * @description 为了从内存购物车中取数据
   */
  rowKey?: string
  /**
   *  值
   *  @default 0
   */
  value?: number
  /**
   * 最小值
   * @default 0
   */
  min?: number
  /**
   * 最小值
   * @default 9999
   */
  max?: number
  /**后端需要的额外参数 */
  params?: any
  /**整体的大小 */
  size?: SIZE
  /**样式 */
  className?: string
  /** 是否禁用 */
  disabled?: boolean
  /**
   * 减法事件
   */
  minusClick?: (event: ITouchEvent) => void
  /**
   * 加分事件
   */
  plusClick?: (event: ITouchEvent) => void
  /**
   * 数量 0 时是否隐藏减的按钮
   * @default true
   */
  zeroHideMinusBtn?: boolean
  /** 是否隐藏减的按钮
   *  @default false
   */
  hideMinusBtn?: boolean
}

export type ScStepperWarpProps = ScBaseStepperProps & {
  /**
   * 累加器的样式
   */
  stepperType?: StepperType
}

export type ScStepperProps = ScBaseStepperProps &
  BtnType & {
    /**
     * 价格变化
     * @returns
     */
    onValueChange?: (newValue: number) => void
    style?: React.CSSProperties
  }
