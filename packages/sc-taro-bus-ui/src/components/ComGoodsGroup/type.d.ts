import { ComGoodsItemDataProps } from '../ComBaseGoods/type'
import { ComGoodsLayoutProps } from '../ComGoodsLayout/type'
import { ClassifyDTO } from '../types/goods'

export type ComGoodsGroupState = {
  /** 一级分类列表 */
  catalogList?: ClassifyDTO[]
  /** 数据 */
  list: ComGoodsItemDataProps[]
  /** 选中一级分类id */
  classifyId?: string
  /** 选中的index */
  currentIndex?: number
}
/** 商品组数据 */
export type ComGoodsGroupProps = ComGoodsLayoutProps & {
  /** 分组展示方式 */
  showMethod?: 'TOP_NAV' | 'LEFT_NAV'
  /** 分组数据 */
  subEntry: []
  /** 是否吸顶 */
  sticky?: boolean
  /** 是否显示“ 全部 ”这个分类 */
  showAllTag?: boolean
  /** 菜单样式*/
  navStyle?: '1' | '2' | '3'
}
