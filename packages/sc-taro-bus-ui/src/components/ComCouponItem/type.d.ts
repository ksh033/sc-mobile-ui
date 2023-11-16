import { UserCoupon } from '../types/coupon'
import { SIZE } from '../types/contants'

export type ComCouponItemClickVal = {
  /** 用户优惠券信息ID */
  userCouponId?: string
  /** 是否选中 */
  checked?: boolean
}
export type ComCouponItemValue = UserCoupon & {
  disabled?: boolean
  checked?: boolean
  /** 是否过期 */
  timeOutLess?: boolean
}

export type ComCouponItemProps = {
  /**优惠券信息 */
  item: ComCouponItemValue
  /** 卡片点击事件 */
  onClick?: (val: ComCouponItemClickVal) => void
  /** 去使用按钮事件  */
  onUseClick?: () => void
  /** 点击去赠送按钮 */
  onGiftClick?: (val: ComCouponItemValue) => void
  /** 是否高亮模式 */
  actived?: boolean
  /**
   * 是否显示过期标签
   *  @default false
   */
  showTimeOutLess?: boolean
  /**
   * 是否显示checkbox
   *  @default false
   */
  showCheck?: boolean
  /**
   * 是否显示状态名称
   *  @default true
   */
  showStatus?: boolean
  /** 自定义状态文本 */
  statusNameText?: string
  /**
   * 显示原因
   * @default true
   */
  showReason?: boolean
  /**
   * 是否展示可赠送按钮
   * @default true
   */
  showGiftBtn?: boolean
  /** 样式大小 默认 large */
  size?: SIZE
  /**
   * 是否禁用
   *  @default false
   */
  disabled?: boolean
  /** 是否显示使用说明
   * @default true
   */
  showDirection?: boolean
  /** 背景图片 */
  backgroundImage?: string
}
