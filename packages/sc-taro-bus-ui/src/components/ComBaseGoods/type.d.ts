import { ComStepperProps } from "../ComStepper";
import { FONT_WEIGHT, IMAGE_FILL, SIZE } from "../types/contants";
import { DisplayScale, GoodsStyleClassEnum } from "./constants";

export type GoodsLayout = "horizontal" | "vertical";

/** 活动类型: 首单立返:FIRST_ORDER_RETURN、支付有礼:PAY_GIVE、新人有礼:NEW_MEMBER_GIVE、充值有礼:RECHARGE_GIVE、限时折扣:GOODS_DISCOUNT、满减:PRICE_BREAK、订单评价奖励:ORDER_COMMENT、场景抽奖:SCENE_LOTTERY、首购专享:FIRST_BUY */
export type PromotionTypeEnum =
  | "FIRST_ORDER_RETURN"
  | "PAY_GIVE"
  | "NEW_MEMBER_GIVE"
  | "RECHARGE_GIVE"
  | "GOODS_DISCOUNT"
  | "PRICE_BREAK"
  | "ORDER_COMMENT"
  | "SCENE_LOTTERY"
  | "FIRST_BUY";

/** 渲染参数 */
export type ComGoodsItemDrawProps = {
  size?: SIZE;
  /**
   * 布局
   *  horizontal:水平的
   *  vertical：垂直的
   * @default "horizontal"
   */
  layout?: GoodsLayout;
  /**
   * 商品样式
   * - NO_BORDER_BG_WHITE: "无边白底"
   * - CARD_SHADOW: "卡片投影"
   * - WHITE_BORDER: "描边白底"
   * - NO_BORDER_BG_TRANSPARENT: "无边透明底"
   *  @default NO_BORDER_BG_WHITE
   */
  goodsStyle?: keyof typeof GoodsStyleClassEnum;
  /**
   * 商品倒角
   * - straight: 直角
   * - round: 圆角
   *  @default round
   */
  borderRadiusType?: "straight" | "round"; // 商品倒角
  /**
   * 图片比例
   * - 0: "3:2"
   * - 1: "1:1"
   * - 2: "3:4"
   * - 3: "16:9"
   * @default "1"
   */
  displayScale?: keyof typeof DisplayScale;
  /**
   * 图片填充
   * {@link IMAGE_FILL}
   * @default "contanin"
   */
  imageFillStyle?: IMAGE_FILL;
  /**
   * 文本样式
   * @default "normal"
   */
  textStyleType?: FONT_WEIGHT;
  /**
   * 文本对齐
   * @default "left"
   */
  textAlignType?: "left" | "center";
  /**
   * 商品名称文本行数
   * @default 1
   * @max 最大2行
   */
  nameLine?: number;
  /**
   * 文本行数
   * @default 1
   * @max 最大2行
   */
  descLine?: number;
  /**
   * 是否显示商品名称
   * @default true
   */
  showGoodsName?: boolean;
  /**
   * 是否显示商品描述
   * @default true
   */
  showGoodsDesc?: boolean; // 是否显示商品描述
  /**
   * 是否显示商品价格
   * @default true
   */
  showGoodsPrice?: boolean;
  /** 购买总计价格显示位置 */
  goodsPricePosition?: "center" | "right";
  /**
   * 是否显示商品划线价
   * @default true
   */
  showMarkPrice?: boolean;
  /**
   * 是否显示购买按钮
   * @default true
   */
  buyBtn?: boolean;
  /**
   * 购买按钮样式
   * @property btnType 按钮类型
   * @property btnText 按钮文本 { string | number }
   * @default {btnType: '1'}
   */
  buyBtnExpress?: ComStepperProps;
  /**
   * 角标
   * - none: 不显示角标
   * - property: 圆角
   * @default "none"
   */
  showCornerMark?: "none" | "marketing";
  /**
   * 是否显示失效原因
   * @default false
   */
  showValidReason?: boolean;
  /**
   * 是否显示图片遮罩
   * @default false
   */
  showImageMark?: boolean;
  /**
   * 效原因位置
   *  @default center
   */
  validReasonLocation?: "center" | "rightBottom";
  /**
   * 是否显示限时折扣
   * @default true
   */
  showDiscount?: boolean;
  /**
   * 是否显示单位价格
   * @default false
   */
  showUnitPrice?: boolean;
  /**
   * 是否显示满减活动
   * @default true
   */
  showFullReduction?: boolean;

  /**
   * 是否显示业务场景
   * @default true
   */
  showBizScene?: boolean;
  /**
   * 是否显示限购数量
   * @default true
   */
  showLimit?: boolean;
  /**
   * 标签内容
   */
  goodsTagNode?: React.ReactNode;
  /** 显示数量 */
  showQuantity?: boolean;
  /** 价格排列方式 */
  priceLayout?: GoodsLayout;
};

/**商品活动信息 */
export type PromotionProps = {
  /** 活动计算价格,称重商品转为1KG计算 */
  countPrice?: number;

  /** dataId */
  dataId?: string;

  /** 商品详情页活动描述，如满2减1，满4减2，满6减3 */
  detailPromotionDesc?: string[];

  /** 活动价 */
  discountPrice?: number;

  /** 商品活动展示名称 */
  displayName?: string;

  /** 商品ID */
  goodsId?: string;

  /** 限购数量, -1表示不限制 */
  limitQuantity?: number;

  /** 商品列表活动描述，如满2减1，限购2件 */
  pagePromotionDesc?: string;

  /** 活动优先级，越小的优先 */
  priority?: number;

  /** 活动ID */
  promotionId?: string;

  /** 活动名称 */
  promotionName?: string;

  /** 活动类型: 首单立返:FIRST_ORDER_RETURN、支付有礼:PAY_GIVE、新人有礼:NEW_MEMBER_GIVE、充值有礼:RECHARGE_GIVE、限时折扣:GOODS_DISCOUNT、满减:PRICE_BREAK、订单评价奖励:ORDER_COMMENT、场景抽奖:SCENE_LOTTERY、首购专享:FIRST_BUY */
  promotionType?: PromotionTypeEnum;

  /** 规则ID */
  ruleId?: string;
};

// 数据参
export type ComGoodsItemDataProps = {
  /**
   * 业务场景：
   * CASHIER=收银机,
   * SELF_HELP=自助机,
   * SCAN_CODE_ORDER=扫码点餐,
   * SHOP_CONSUME=到店消费,
   * SHOP_TAKEAWAY=门店外卖,
   * PRE_SALE_TAKEAWAY=预售外卖,
   * PRE_SALE_FOODS=预售食材
   */
  bizScene?: string;
  /** 商品id */
  goodsId?: string;
  /** 商品名称 */
  goodsName?: string;
  /** 商品描述 */
  goodsDesc?: string | React.ReactNode;
  /** 商品价格 */
  goodsPrice?: string | number;
  /** 市场参考价 */
  markPrice?: string | number;
  /** 商品缩略图 */
  goodsThumb?: string;
  /** 商品类型 */
  goodsType?: string;
  /** 库存 */
  stock?: number;
  /**商品失效原因 */
  validStatus?: string | null;
  /** 失效原因 */
  validReason?: string;
  /**场景值文字 */
  leftCornerText?: string;
  /**商品活动信息 */
  goodsPromotion?: PromotionProps;
  /**商品活动信息集合 */
  goodsPromotions?: PromotionProps[];
  /** 是否多规格 */
  selectSpecFlag?: boolean;
  /** 失效原因 */
  validIconReason?: string;
  /**  商品失效ICON枚举 */
  validIcon?: string;
  /** 购买数量 */
  quantity?: number;
  /** 单位 */
  saleUnit?: string;
  /** 活动警告 */
  cartPromotionWarning?: string;
};

export type ComBaseGoodsProps = ComGoodsItemDrawProps & {
  /** 商品 */
  goods?: ComGoodsItemDataProps;
  /** 打开场景购物车 */
  openSceneCart?: () => void;
  /** 去商品详情 */
  toDetail?: () => void;
};
