import React, { forwardRef, useMemo } from "react";
import { View } from "@tarojs/components";
import ComWaterfall, { ComWaterfallRef } from "@/components/ComWaterfall";
import ComBaseGoods from "@/components/ComBaseGoods";
import { ComGoodsLayoutProps } from "../type";
import "./index.scss";

/*商品组-大图模式 */
const GoodsGroupG4 = forwardRef<ComWaterfallRef, ComGoodsLayoutProps>(
  (props, ref) => {
    const { list = [], goodsMargin = 0, ...resp } = props;

    const classPrefix = "com";

    const margin = useMemo(() => {
      return Math.ceil(goodsMargin / 2);
    }, [goodsMargin]);

    return (
      <View className={`${classPrefix}-goods-group-g1`}>
        <ComWaterfall
          className={`${classPrefix}-goods-group-g1-content`}
          list={list}
          idKey="goodsId"
          imageKey="contentImage"
          colNum={1}
          gutter={margin}
          ref={ref}
          renderItem={(item) => {
            return (
              <View
                className={`${classPrefix}-goods-group-g1-item`}
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

export default React.memo(GoodsGroupG4);
