import { ComBaseGoodsProps, ComGoodsItemDataProps } from "../ComBaseGoods/type";

export type ComGoodsLayoutProps = Omit<ComBaseGoodsProps, "goods"> & {
  /** 商品数据 */
  list: ComGoodsItemDataProps[];
  /**
   * 列表样式
   *
   * G1 大图模式
   */
  goodsType?: "G1" | "G2" | "G3" | "G4" | "G5" | "G6" | "G7";
  /** 页面间距 */
  pageMargin?: number;
  /** 商品间距 */
  goodsMargin?: number;
  /** 预览模式 */
  preview?: boolean;
};
