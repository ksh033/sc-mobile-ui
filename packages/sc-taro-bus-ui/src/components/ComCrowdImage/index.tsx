import { View } from "@tarojs/components";
import { useMemo } from "react";
import { ComCrowdImageProps } from "./type";
import ComAdImages from "../ComAdImages";
import React from "react";

/** 人群图片
 *  resprops.showMethod  大图模式下只取一个
 */
const ComCrowdImage: React.FC<ComCrowdImageProps> = (props) => {
  const { list = [], ...resprops } = props;

  const rList = useMemo(() => {
    if (Array.isArray(list) && list.length > 0) {
      return resprops.showMethod === "single" ? [list[0]] : list;
    }
    return [];
  }, [JSON.stringify(list), resprops.showMethod]);

  return (
    <View className="com-crowd-image">
      <ComAdImages {...resprops} list={rList}></ComAdImages>
    </View>
  );
};

export default ComCrowdImage;
