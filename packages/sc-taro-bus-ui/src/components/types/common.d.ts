/** 链接类型: 小程序路径APP、外部链接URL、程序控制SERVICE、微信扫一扫MINIAPP_SCAN */
export type LinkTypeEnum = 'APP' | 'URL' | 'SERVICE' | 'MINIAPP_SCAN'

/** 链接参数选择对象: 商品分组GOODS_GROUP、商品GOODS、外部链接NONE、COUPON优惠券 页面PAGE*/
export type LinkSelectTypeEnum =
  | 'GOODS_GROUP'
  | 'GOODS'
  | 'COUPON'
  | 'PAGE'
  | 'NONE'
  | 'ALL_GOODS'

/** 链接参数 */
export type Link = {
  /** 链接配置ID */
  linkConfigId?: string
  /** 链接标题 */
  linkTitle?: string
  /** 跳转地址 */
  linkValue?: string
  /** 链接类型: 小程序路径APP、外部链接URL、程序控制SERVICE、微信扫一扫MINIAPP_SCAN */
  linkType?: LinkTypeEnum
  /** 链接参数选择对象: 商品分类GOODS_CATALOG、商品GOODS、活动PROMOTION、领券活动COUPON_GET_PROM、抽奖LOTTERY、外部链接NONE、页面PAGE、微信扫一扫WECHAT_SCAN、扫码入群SCAN_JOIN_GROUP */
  linkSelectType?: LinkSelectTypeEnum
  /** 链接选择数据 */
  linkSelectContent?: any
}
/** 基础图片处理 */
export type BaseImage = {
  /** 图片id */
  imageId?: string
  /** 图片地址 */
  imageUrl?: string
  /** 缩略图 */
  imageThumbUrl?: string
  /** 图片宽度 */
  imageWidth?: number
  /**图片高度 */
  imageHeight?: number
}

/**
 * 倒角类型 straight 直角 round 圆角
 */
export type CornerType = 'straight' | 'round'

export type ProgressAriaProps = Pick<
  React.AriaAttributes,
  'aria-label' | 'aria-labelledby'
>
export type UploadFileStatus =
  | 'error'
  | 'success'
  | 'done'
  | 'uploading'
  | 'removed'

export interface UploadFile<T = any> extends ProgressAriaProps {
  uid: string
  size?: number
  name: string
  fileName?: string
  lastModified?: number
  lastModifiedDate?: Date
  url?: string
  status?: UploadFileStatus
  percent?: number
  thumbUrl?: string
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>['crossOrigin']
  response?: T
  error?: any
  linkProps?: any
  type?: string
  xhr?: T
  preview?: string
  width?: number
  height?: number
  fileId: string
}
