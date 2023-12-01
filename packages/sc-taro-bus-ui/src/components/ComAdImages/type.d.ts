import { BaseImage, CornerType, Link } from '../types/common'

type JumpLink = Link & {
  /** 占据宽度切割 */
  width: number
  /** 占据高度多少 */
  height: number
  /** x位置 */
  x: number
  /** y位置 */
  y: number
}

export type ComAdImagesItem = BaseImage & {
  link?: JumpLink | JumpLink[]
  key?: string
}
export type ShowMethod = 'single' | 'swiper' | 'scroll'

export type ComAdImagesProps = {
  /**
   * 图片展示类型
   * @default single
   */
  showMethod?: ShowMethod
  /** 轮播数据 */
  list: ComAdImagesItem[]
  /**
   * 一屏显示
   * @default 1
   */
  count?: number
  /**
   * 指示器样式
   * @default 1
   */
  indicator?: '1' | '2' | '3' | '4'
  /**
   * 图片样式 normal 常规 shadow 投影
   * @default normal
   */
  imageStyle?: 'normal' | 'shadow'
  /**
   * 填充方式 cover 填充 contain 周边留白
   * @default cover
   */
  imageFillStyle?: 'cover' | 'contain'
  /**
   * 图片倒角 straight 直角 round 圆角
   * @default straight
   */
  cornerType?: CornerType
  /** 图片间距 @default 0*/
  pageMargin?: number
  /** 图片间距 */
  imageMargin?: number
  /** 点击事件 */
  onItemClick?: (item: ComAdImagesItem) => void
}
