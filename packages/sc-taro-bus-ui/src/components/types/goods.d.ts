/** 展示元素类型: GOODS-商品，MORE-更多，ADS-广告 */
export type DisplayElementTypeEnum = 'GOODS' | 'MORE' | 'ADS'

/** 链接类型: 小程序路径APP、外部链接URL、程序控制SERVICE、微信扫一扫MINIAPP_SCAN */
export type LinkTypeEnum = 'APP' | 'URL' | 'SERVICE' | 'MINIAPP_SCAN'

/** 链接参数选择对象: 商品分类GOODS_CATALOG、商品GOODS、活动PROMOTION、领券活动COUPON_GET_PROM、抽奖LOTTERY、外部链接NONE、页面PAGE、微信扫一扫WECHAT_SCAN、扫码入群SCAN_JOIN_GROUP */
export type LinkSelectTypeEnum =
  | 'GOODS_CATALOG'
  | 'GOODS'
  | 'PROMOTION'
  | 'COUPON_GET_PROM'
  | 'LOTTERY'
  | 'PAGE'
  | 'WECHAT_SCAN'
  | 'SCAN_JOIN_GROUP'
  | 'NONE'

/** 首页配置-组件链接 返回对象 */
export interface SkipLink {
  /** 链接路径，如商品分类路径、商品详情路径、抽奖页服务名 */
  linkPath?: string

  /** 链接参数选择对象:商品分类GOODS_CATALOG、商品GOODS、活动PROMOTION、抽奖LOTTERY、外部链接NONE、页面PAGE、微信扫一扫WECHAT_SCAN */
  linkSelectType?: LinkSelectTypeEnum

  /** 链接类型: 小程序路径APP、外部链接URL、程序控制SERVICE、微信扫一扫MINIAPP_SCAN */
  linkType?: LinkTypeEnum

  /** 链接参数 */
  linkValue?: string

  /** 链接参数名称 */
  linkValueName?: string
}

/**展示分类查询返回对象 */
export interface ClassifyDTO {
  /** 分类广告 */
  classifyAds?: string
  /** 分类图标 */
  classifyIcon?: string
  /** 展示分类ID*/
  classifyId?: string
  /** 层级码*/
  classifyLevelCode?: string
  /** 分类名称*/
  classifyName?: string
  dataId?: string
  /** 连接数据 */
  skipLink?: SkipLink
  /** 子集 */
  children?: ClassifyDTO[]
}

/** 商品列表查询对象 */
export interface Goods {
  /** 展示分类ID */
  classifyId?: string

  /** 展示分类层级码 */
  classifyLevelCode?: string

  /** dataId */
  dataId?: string

  /** 展示元素类型: GOODS-商品，MORE-更多，ADS-广告 */
  displayElementType?: DisplayElementTypeEnum

  /** 商品描述 */
  goodsDesc?: string

  /** 商品ID */
  goodsId?: string

  /** 商品名称 */
  goodsName?: string

  /** 商品售价 */
  goodsPrice?: number

  /** 商品活动信息 */
  goodsPromotions?: Promotion[]

  /** 商品简称 */
  goodsShortName?: string

  /** 商品档口类型：明档 COOK_STALL，零售 RETAIL_STALL，水吧 DRINKS_STALL，烧烤 GRILL_STALL */
  goodsStallType?: GoodsStallTypeEnum

  /** 标签列表 */
  goodsTags?: GoodsTag[]

  /** 商品缩略图 */
  goodsThumb?: string

  /** 商品类型：NORMAL-普通商品，COMPLEX-组合商品 */
  goodsType?: GoodsTypeEnum

  /** 市场参考价 */
  markPrice?: number

  /** 是否可选规格 */
  selectSpecFlag?: boolean

  /** 跳转链接信息 */
  skipLink?: SkipLink

  /** 排序 */
  sortOrder?: number

  /** 专题活动页编码 */
  sourcePageCode?: string

  /** 专题活动页名称 */
  sourcePageName?: string

  /** 剩余库存 */
  stock?: number

  /** 商品失效ICON枚举,商品失效:GOODS_INVALID、无货OUT_OF_STOCK */
  validIcon?: ValidIconEnum

  /** 商品失效ICON 描述 */
  validIconReason?: string

  /** 商品失效原因 */
  validReason?: string

  /** 商品失效原因：PROMOTION_EXPIRE活动过期、STOCK_LESS库存不足、OVER_LIMIT活动商品超过限制数量、STOCK_OUT已售罄、OUT_SALETIME不在售卖时间、PUT_DOWN已下架、INVALID商品已失效 */
  validStatus?: ValidStatusEnum
}
