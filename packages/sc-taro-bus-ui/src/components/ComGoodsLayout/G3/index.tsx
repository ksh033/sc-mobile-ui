import { View } from "@tarojs/components";
import React, { useMemo } from "react";
import ComBaseGoods from "@/components/ComBaseGoods";
import { ComGoodsLayoutProps } from "../type";
import "./index.scss";

/*商品组-3列排序*/
const GoodsGroupG4: React.FC<ComGoodsLayoutProps> = (props) => {
  const { list = [], goodsMargin = 0, ...resp } = props;
  const classPrefix = "com";

  const margin = useMemo(() => {
    return Math.ceil(goodsMargin / 2);
  }, [goodsMargin]);

  return (
    <View className={`${classPrefix}-goods-group-g3`}>
      {list.map((item, index) => {
        return (
          <View
            className={`${classPrefix}-goods-group-g3-item`}
            key={`goods-group-g5-${index}-${item.goodsId}`}
          >
            <View
              className={`${classPrefix}-goods-group-g3-item-content`}
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
    </View>
  );
};

export default React.memo(GoodsGroupG4);
