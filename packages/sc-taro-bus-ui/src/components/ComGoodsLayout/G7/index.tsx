import { View } from "@tarojs/components";
import React, { forwardRef, useMemo } from "react";
import classnames from "classnames";
import ComWaterfall, { ComWaterfallRef } from "@/components/ComWaterfall";
import ComBaseGoods from "@/components/ComBaseGoods";
import { ComGoodsItemDataProps } from "../../../components/ComBaseGoods/type";
import { ComGoodsLayoutProps } from "../type";
import "./index.scss";

/*商品组- 一大两小*/
const GoodsGroupG7 = forwardRef<ComWaterfallRef, ComGoodsLayoutProps>(
  (props, ref) => {
    const { list = [], goodsMargin = 0, ...resp } = props;
    const classPrefix = "com";

    const margin = useMemo(() => {
      return Math.ceil(goodsMargin / 2);
    }, [goodsMargin]);

    const group: ComGoodsItemDataProps[][] = [];
    for (var i = 0; i < list.length; i += 3) {
      group.push(list.slice(i, i + 3));
    }

    const render = (gourpItemList: ComGoodsItemDataProps[]) => {
      const big = gourpItemList[0];
      const leftSmall = gourpItemList[1];
      const rightSmall = gourpItemList[2];

      return (
        <View className={`${classPrefix}-goods-group-g7-content`}>
          {big && (
            <View className={`${classPrefix}-goods-group-g7-big`}>
              <View
                className={`${classPrefix}-goods-group-g7-item`}
                style={{ margin: margin }}
              >
                <ComBaseGoods
                  goods={big}
                  {...resp}
                  layout="vertical"
                ></ComBaseGoods>
              </View>
            </View>
          )}
          {leftSmall && (
            <View className={`${classPrefix}-goods-group-g7-left`}>
              <View
                className={`${classPrefix}-goods-group-g7-item`}
                style={{ margin: margin }}
              >
                <ComBaseGoods
                  goods={big}
                  {...resp}
                  layout="vertical"
                  size="small"
                ></ComBaseGoods>
              </View>
            </View>
          )}
          {rightSmall && (
            <View className={`${classPrefix}-goods-group-g7-right`}>
              <View
                className={`${classPrefix}-goods-group-g7-item`}
                style={{ margin: margin }}
              >
                <ComBaseGoods
                  goods={big}
                  {...resp}
                  layout="vertical"
                  size="small"
                ></ComBaseGoods>
              </View>
            </View>
          )}
        </View>
      );
    };

    return (
      <View className={`${classPrefix}-goods-group-g7`}>
        {group.map((item, index) => {
          return render(item);
        })}
      </View>
    );
  }
);

export default React.memo(GoodsGroupG7);
