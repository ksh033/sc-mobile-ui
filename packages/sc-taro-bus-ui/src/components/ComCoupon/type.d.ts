import type { ComCouponItemValue } from '../ComCouponItem/type'

/** 优惠券自动获取配置 */
export type CouponAutoSet = {
  /** 是否自动加载全部 */
  isShowAll: boolean
  /** 隐藏不可分享的优惠券 */
  hideUnsharedCoupon?: boolean
  /** 显示优惠券数量 */
  couponNum?: number
}

export type ComCouponProps = {
  /** 优惠券来源 */
  couponSource?: 'add' | 'auto'
  /** 优惠券列表 */
  list?: ComCouponItemValue[]
  layout?: 'G1' | 'G2' | 'G3' | 'G5'
  /** 卡片样式 */
  couponStyle?: '1' | '2' | '3' | '4'
  /** 颜色 */
  couponColor?: string
  /** 隐藏已抢完及失效的券 */
  hideErrorCoupon?: boolean
  /** 优惠券自动获取配置 */
  couponAutoSet?: CouponAutoSet
  /** 优惠券间距 */
  margin?: number
  /** 页面间距 */
  pageMargin?: number
  /** 是否预览 */
  preview?: boolean
}

export type ComCouponGroupProps = Pick<
  ComCouponProps,
  'list' | 'couponStyle' | 'couponColor' | 'margin'
>
