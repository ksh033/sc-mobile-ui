import React, { useMemo } from "react";
import { ScrollView, View } from "@tarojs/components";
import classames from "classnames";
import ComBaseGoods from "@/components/ComBaseGoods";
import { ComGoodsLayoutProps } from "../type";
import "./index.scss";

/*商品组-横向滚动*/
const GoodsGroupG4: React.FC<ComGoodsLayoutProps> = (props) => {
  const { list = [], goodsMargin = 0, ...resp } = props;

  const classPrefix = "com";

  const margin = useMemo(() => {
    return Math.ceil(goodsMargin / 2);
  }, [goodsMargin]);

  return (
    <View className={`${classPrefix}-goods-group-g5`}>
      <ScrollView className={`${classPrefix}-goods-group-g5-scroll`} scrollX>
        {list.map((item, index) => {
          return (
            <View
              className={classames({
                [`${classPrefix}-goods-group-g5-item`]: true,
              })}
              key={`goods-group-g5-${index}-${item.goodsId}`}
            >
              <View
                className={`${classPrefix}-goods-group-g5-item-content`}
                style={{ margin: margin }}
              >
                <ComBaseGoods
                  goods={item}
                  {...resp}
                  layout="vertical"
                  size="small"
                ></ComBaseGoods>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default React.memo(GoodsGroupG4);
