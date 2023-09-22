import { getWindowWidth } from "@/utils/common";
import { View, Text, ScrollView } from "@tarojs/components";
import { useMemo } from "react";
import classnames from "classnames";
import {
  ComImageTextNavItem,
  ComImageTextNavProps,
  ComImageTextNavShowMethod,
} from "./type";
import ScImage from "../ScImage";
import "./index.scss";
import React from "react";

const scrollMap:any = {
  4: 0.94,
  5: 0.96,
  6: 0.97,
  7: 0.98,
  8: 0.99,
  9: 0.98,
  10: 0.99,
};

/** 图文导航 */
const ComImageTextNav: React.FC<ComImageTextNavProps> = (props) => {
  const {
    count = 4,
    showMethod = "imageText",
    subEntry = [],
    backgroundColor = "#fff",
    fontColor = "#000",
    imageFillStyle = "nowrap",
  } = props;

  const prefixCls = "com-imagetext-nav";

  const windowWidth = useMemo(() => {
    return getWindowWidth();
  }, []);

  /**页面宽度 */
  const width = useMemo(() => {
    let num = subEntry.length;
    return Math.ceil(windowWidth / num);
  }, [subEntry.length, windowWidth]);

  const firstItem = useMemo(() => {
    let item: ComImageTextNavItem | undefined;
    if (Array.isArray(subEntry) && subEntry.length > 0) {
      item = subEntry.find((it) => it.imageUrl);
    }
    return item;
  }, [JSON.stringify(subEntry)]);

  /** 图片高度 */
  const height = useMemo(() => {
    if (firstItem) {
      return Math.ceil(
        (Number(firstItem.imageHeight || 0) /
          Number(firstItem.imageWidth || 0)) *
          width
      );
    }
    return 200;
  }, [JSON.stringify(firstItem), width]);

  const scrolleWidth = useMemo(() => {
    let scale = scrollMap[count] || 1;
    return Math.ceil((windowWidth * scale) / (count - 1));
  }, [count, windowWidth]);

  const scrolleHeight = useMemo(() => {
    if (firstItem) {
      return Math.ceil(
        (Number(firstItem.imageHeight || 0) /
          Number(firstItem.imageWidth || 0)) *
          scrolleWidth
      );
    }
    return 200;
  }, [JSON.stringify(firstItem), scrolleWidth]);

  const render = (
    method: ComImageTextNavShowMethod,
    itemWidth: number,
    itemheight: number
  ) => {
    const map = {
      imageText: () => {
        return (
          <>
            {subEntry.map((it, idx) => {
              return (
                <View
                  key={`image-${idx}`}
                  className={`${prefixCls}__image-wrapper`}
                  style={{ width: itemWidth }}
                >
                  <View
                    className={`${prefixCls}__image`}
                    style={{ width: itemWidth, height: itemheight }}
                  >
                    <ScImage src={it.imageUrl || ""} fit="cover"></ScImage>
                  </View>
                  <View className={`${prefixCls}__nav-title`}>
                    <Text
                      className={`${prefixCls}__nav-title__text`}
                      style={{ color: fontColor }}
                    >
                      {it.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        );
      },
      text: () => {
        return (
          <>
            {subEntry.map((it, idx) => {
              return (
                <View
                  key={`image-${idx}`}
                  className={`${prefixCls}__text-wrapper`}
                  style={{ width: itemWidth }}
                >
                  <View className={`${prefixCls}__nav-title`}>
                    <Text
                      className={`${prefixCls}__nav-title__text`}
                      style={{ color: fontColor }}
                    >
                      {it.title}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        );
      },
    };

    return map[method] ? map[method]() : null;
  };

  return (
    <View className={prefixCls}>
      {imageFillStyle === "nowrap" ? (
        <View
          className={classnames({
            [`${prefixCls}__image-nav`]: showMethod === "imageText",
            [`${prefixCls}__text-nav`]: showMethod === "text",
          })}
          style={{ overflowX: "hidden", backgroundColor: backgroundColor }}
        >
          {render(showMethod, width, height)}
        </View>
      ) : (
        <ScrollView
          scrollX
          scrollY={false}
          className={classnames({
            [`${prefixCls}__image-nav`]: showMethod === "imageText",
            [`${prefixCls}__text-nav`]: showMethod === "text",
          })}
          style={{ backgroundColor: backgroundColor }}
        >
          {render(showMethod, scrolleWidth, scrolleHeight)}
        </ScrollView>
      )}
    </View>
  );
};

export default ComImageTextNav;
