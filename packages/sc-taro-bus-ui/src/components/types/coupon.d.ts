/** 优惠券状态：已使用USED、未使用UNUSE,已过期EXPIRED */
export type CouponStatusEnum = 'USED' | 'UNUSE' | 'EXPIRED'
/** 优惠券类型：满减REDUCE、折扣PERCENT、商品兑换券GOODS */
export type CouponTypeEnum = 'REDUCE' | 'PERCENT' | 'GOODS'

/** 支付状态：SUCCESS成功 PAY_SUCCESS支付成功 FAIL失败 */
export type PayResultEnumEnum = 'SUCCESS' | 'PAY_SUCCESS' | 'WAIT_PAY' | 'FAIL'
/** 用户可使用优惠劵 响应对象 */
export interface UserCoupon {
  /** 优惠金额数值：满减券时为金额数值10000=1元 */
  amountValue?: number

  /** 所属权益ID */
  benefitId?: string

  /** 优惠券配置ID */
  couponId?: string

  /** 优惠券状态：已使用USED、未使用UNUSE */
  couponStatus?: CouponStatusEnum

  /** 优惠券名称 */
  couponTitle?: string

  /** 优惠券类型：满减REDUCE、折扣PERCENT */
  couponType?: CouponTypeEnum

  /** 优惠数值：满减券10000=1元; 折扣券80=80% */
  couponValue?: number

  /** 领取时间 */
  createTime?: string

  /** 优惠金额 */
  discountPrice?: number

  /** 折扣比例数值，70=70% */
  discountValue?: number

  /** 是否可用 */
  enableUser?: boolean

  /** 优惠券底图 */
  imageUrl?: string

  /** 最大优惠金额 */
  maxDiscount?: number

  /** 最大折扣金额 */
  maxDiscountAmount?: number

  /** 是否最优惠 */
  maxDiscountFlag?: boolean

  /** 最低订单金额 */
  minOrderAmount?: number

  /** 订单ID */
  orderId?: string

  /** 发放方式：促销PROMOTION、内部INSIDE */
  publishType?: PublishTypeEnum

  /** 不可用原因 */
  reason?: string

  /** 使用说明 */
  useReference?: string

  /** 使用时间 */
  useTime?: string

  /** 用户优惠券信息ID */
  userCouponId?: string

  /** 用户ID */
  userId?: string

  /** 有效期起 */
  validBeginTime?: string

  /** 有效期止 */
  validEndTime?: string
  /** 是否可赠送 */
  giveFlag?: boolean
}
