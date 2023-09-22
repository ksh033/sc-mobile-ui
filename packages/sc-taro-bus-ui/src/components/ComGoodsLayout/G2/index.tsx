import { View } from "@tarojs/components";
import React, { forwardRef, useMemo } from "react";
import ComBaseGoods from "@/components/ComBaseGoods";
import ComWaterfall, { ComWaterfallRef } from "@/components/ComWaterfall";
import { ComGoodsLayoutProps } from "../type";
import "./index.scss";

/*商品组-纵向 一行2个 */
const GoodsGroupG2 = forwardRef<ComWaterfallRef, ComGoodsLayoutProps>(
  (props, ref) => {
    const { list = [], goodsMargin = 0, ...resp } = props;
    const classPrefix = "com";
    const margin = useMemo(() => {
      return Math.ceil(goodsMargin / 2);
    }, [goodsMargin]);

    return (
      <View className={`${classPrefix}-goods-group-g2`}>
        <ComWaterfall
          className={`${classPrefix}-goods-group-g2-content`}
          list={list}
          idKey="goodsId"
          imageKey="contentImage"
          colNum={2}
          gutter={margin}
          ref={ref}
          renderItem={(item) => {
            return (
              <View
                className={`${classPrefix}-goods-group-g2-item`}
                style={{ marginTop: margin, marginBottom: margin }}
              >
                <ComBaseGoods
                  goods={item}
                  {...resp}
                  layout="vertical"
                ></ComBaseGoods>
              </View>
            );
          }}
        ></ComWaterfall>
      </View>
    );
  }
);

export default React.memo(GoodsGroupG2);
