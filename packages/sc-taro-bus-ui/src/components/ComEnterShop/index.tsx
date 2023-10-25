import { Cell } from "@sc-mobile/sc-taro-ui";
import { Shop, Right } from "@nutui/icons-react-taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import React from "react";
import  {RegAppUIComponent,type AppUIComponents} from '@sceditor/core'

export type ComEnterShopProps = {
  actionText?: string;
};

/** 进入门店 */
const ComEnterShop: AppUIComponents<ComEnterShopProps> = (props) => {
  const { actionText = "进入店铺" } = props;

  return (
    <View className="com-enter-shop">
      <Cell
        title={
          <View style={{ display: "inline-flex", alignItems: "center" }}>
            <Shop />
            <Text style={{ marginLeft: 5 }}>店铺</Text>
          </View>
        }
        align="center"
        extra={
          <>
            <Text style={{ marginRight: 5 }}>{actionText}</Text>
            <Right />
          </>
        }
      />
    </View>
  );
};
ComEnterShop.cmpType='EnterShop'
export default RegAppUIComponent(ComEnterShop);
