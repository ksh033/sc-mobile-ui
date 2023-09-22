import Taro from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import classnames from "classnames";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import compute from "@/utils/compute";
import ComSwiper from "../ComSwiper";
import { ComAdImagesItem, ComAdImagesProps, ShowMethod } from "./type";
import ScImage from "../ScImage";
import "./index.scss";
import React from "react";

const emptyItem: ComAdImagesItem = {
  imageId: "empty",
  key: "empty",
  imageUrl:
    "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png",
  imageThumbUrl:
    "https://img01.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png",
  imageWidth: 750,
  imageHeight: 400,
};

const emptyList: ComAdImagesItem[] = [emptyItem];

const scrollMap:any = {
  1: 0.88,
  2: 0.4,
  4: 0.305,
  5: 0.23,
  6: 0.185,
};

/** 图片广告 */
const ComAdImages: React.FC<ComAdImagesProps> = (props) => {
  const {
    showMethod = "single",
    imageStyle = "normal",
    cornerType = "straight",
    count = 1,
    pageMargin = 0,
    list = [],
    imageMargin = 0,
    imageFillStyle = "cover",
    indicator = "1",
    onItemClick,
  } = props;

  const prefixCls = "com-adimages";

  const [innerData, setInnerData] = useState<ComAdImagesItem[]>(emptyList);

  const styles: CSSProperties = useMemo(() => {
    if (showMethod === "single") {
      return { paddingLeft: pageMargin, paddingRight: pageMargin };
    }
    return {};
  }, [pageMargin, showMethod]);

  const radius = useMemo(() => {
    return cornerType === "round" ? 16 : 0;
  }, [cornerType]);

  const screenWidth = useMemo(() => {
    let windowWidth = Taro.getSystemInfoSync().windowWidth;
    if (windowWidth > 750) {
      windowWidth = 375;
    }
    return windowWidth;
  }, []);

  const height = useMemo(() => {
    let item: ComAdImagesItem | null = null;
    if (Array.isArray(list) && list.length > 0) {
      item = list[0];
    }
    if (item) {
      return Math.ceil(
        (screenWidth / Number(item.imageWidth || 0)) *
          Number(item.imageHeight || 0)
      );
    }
    return 200;
  }, [JSON.stringify(innerData)]);

  const swiperHeight = useMemo(() => {
    return compute.subtract(height, pageMargin * 2);
  }, [height, pageMargin]);

  const scrollHeight = useMemo(() => {
    return Math.round(height * (scrollMap[count] || 1));
  }, [count, height]);

  useEffect(() => {
    if (Array.isArray(list)) {
      const index = list.findIndex((it) => it.imageUrl != null);
      console.log("index", index);
      if (index > -1) {
        setInnerData(list);
      } else {
        setInnerData(emptyList);
      }
    } else {
      setInnerData(emptyList);
    }
  }, [JSON.stringify(list)]);

  /** 单个图片连续处理 */
  const singleRender = (rlist: ComAdImagesItem[]) => {
    return (
      <View className={`${prefixCls}-list`}>
        {rlist.map((it, index) => {
          return (
            <View
              className={`${prefixCls}-content`}
              key={`single-${index}-${it.key}`}
              style={{ marginBottom: imageMargin }}
            >
              <ScImage src={it.imageUrl || ""} radius={radius}></ScImage>
            </View>
          );
        })}
      </View>
    );
  };
  /**轮播图组件 */
  const swiperRender = (rlist: ComAdImagesItem[]) => {
    return (
      <View className={`${prefixCls}-swiper`} style={{ height: swiperHeight }}>
        <ComSwiper
          indicator={indicator}
          data={rlist}
          radius={radius}
          fit={imageFillStyle}
          margin={pageMargin}
        ></ComSwiper>
      </View>
    );
  };
  /** 滚动组件 */
  const scrollRender = (rlist: ComAdImagesItem[]) => {
    return (
      <View className={`${prefixCls}-scroll`}>
        <ScrollView
          className={`${prefixCls}-scroll-warp`}
          style={{
            height: scrollHeight,
            paddingLeft: pageMargin,
            paddingRight: pageMargin,
          }}
          scrollX
          enableFlex
          enhanced
          showScrollbar
        >
          {rlist.map((item, idx) => {
            return (
              <View
                className={classnames({
                  [`${prefixCls}-scroll-item`]: true,
                })}
                id={item.linkValue}
                style={{
                  width: Math.round(
                    (scrollHeight * Number(item.imageWidth || 0)) /
                      Number(item.imageHeight || 1)
                  ),
                  marginRight: imageMargin,
                }}
                key={`com-img-item-g2-${item.key}-${idx}`}
              >
                <View
                  onClick={() => onItemClick?.(item)}
                  className={`${prefixCls}-scroll-item-image`}
                  style={{ borderRadius: radius }}
                >
                  <ScImage
                    fit={imageFillStyle}
                    src={item.imageUrl || ""}
                    height={scrollHeight}
                    radius={radius}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  /** 渲染函数 */
  const render = (type: ShowMethod, rlist: ComAdImagesItem[]) => {
    console.log("list", rlist);
    const map = {
      single: singleRender,
      swiper: swiperRender,
      scroll: scrollRender,
    };
    return map[type] ? map[type](rlist) : null;
  };

  return (
    <View
      className={classnames(prefixCls, {
        [`${prefixCls}-shadow`]: imageStyle === "shadow",
      })}
      style={showMethod !== "scroll" ? styles : {}}
    >
      {render(showMethod, innerData)}
    </View>
  );
};

export default ComAdImages;
