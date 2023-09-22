import ComBaseGoods from "@/components/ComBaseGoods";
import { ScrollView, View } from "@tarojs/components";
import React from "react";
import classames from "classnames";
import { ComGoodsLayoutProps } from "../type";
import "./index.scss";

/*商品组-两列横向滚动*/
const GoodsGroupG6: React.FC<ComGoodsLayoutProps> = (props) => {
  const { list = [], ...resp } = props;

  const classPrefix = "com";

  const length = list.length;

  return (
    <View className={`${classPrefix}-goods-group-g6`}>
      <ScrollView className={`${classPrefix}-goods-group-g6-scroll`} scrollX>
        <View className={`${classPrefix}-goods-group-g6-twolines`}>
          {list.map((item, index) => {
            return (
              <View
                className={classames({
                  [`${classPrefix}-goods-group-g6-item`]: true,
                  [`${classPrefix}-goods-group-g6-first`]: index <= 1,
                  [`${classPrefix}-goods-group-g6-margin`]:
                    index !== length - 1,
                  [`${classPrefix}-goods-group-g6-last`]: index === length - 1,
                })}
                key={`goods-group-g6-${index}-${item.goodsId}`}
              >
                <ComBaseGoods goods={item} {...resp}></ComBaseGoods>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(GoodsGroupG6);
