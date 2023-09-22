import classnames from "classnames";
import {
  ITouchEvent,
  Swiper,
  SwiperItem,
  View,
  Text,
} from "@tarojs/components";
import React, { PropsWithChildren, useMemo, useState } from "react";
import { pxTransform } from "@/utils/common";
import ScImage, { ImageFit } from "../ScImage";
import { BaseImage, Link } from "../types/common";
import "./index.scss";

export type ComSwiperItem = Link & BaseImage;

type ComSwiperProps = {
  onClick?: (event: ITouchEvent) => void;
  tolink?: (item: ComSwiperItem) => void;
  className?: string;
  data?: ComSwiperItem[];
  /** 是否自动播放 */
  autoplay?: boolean;
  radius?: number;
  /** 图片切割类型 */
  fit?: ImageFit;
  /** 组件留白 */
  margin?: number;
  /**
   * 指示器样式
   * @default 1
   */
  indicator?: "1" | "2" | "3" | "4";
};

const ComSwiper: React.FC<PropsWithChildren<ComSwiperProps>> = (props) => {
  const {
    autoplay = true,
    onClick,
    data = [],
    tolink,
    radius = 0,
    fit = "cover",
    indicator = "1",
    margin = 10,
  } = props;

  const [current, setCurrent] = useState<number>(0);

  const rootClass = classnames(
    "com-swiper",
    {
      "com-swiper-indicator-2": indicator == "2",
    },
    props.className
  );

  /** 是否显示指示器 */
  const showIndicator = useMemo(() => {
    return indicator !== "3" && indicator !== "4";
  }, [indicator]);

  const dataLength = useMemo(() => {
    return data.length;
  }, [data.length]);

  return (
    <View
      onClick={onClick}
      className={rootClass}
      style={{
        borderRadius: pxTransform(radius),
        margin: `0px ${Number(margin || 0)}px`,
      }}
    >
      <Swiper
        className="swiper-scroll"
        autoplay={data.length > 1 ? autoplay : false}
        circular
        // @ts-ignore
        indicator={showIndicator}
        onChange={(e) => {
          setCurrent(e.detail.current);
        }}
        indicator-dots={showIndicator && data.length > 1}
        style={{ borderRadius: pxTransform(radius) }}
      >
        {data.map((item, idx: number) => {
          return (
            <SwiperItem
              key={`${item.imageId}-${idx}`}
              className={classnames({
                "swiper-scroll-item": true,
              })}
              style={{ borderRadius: pxTransform(radius) }}
            >
              <View
                className="banner"
                onClick={() => tolink?.(item)}
                style={{
                  borderRadius: pxTransform(radius),
                }}
              >
                <ScImage
                  src={item.imageUrl || ""}
                  width="100%"
                  height="100%"
                  radius={radius}
                  fit={fit}
                />
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
      {indicator === "3" && (
        <View className="com-swiper-indicator-3">
          <Text className="com-swiper-indicator-3__text">
            <Text className="com-swiper-indicator-3-avtive">{current + 1}</Text>
            <Text>/{dataLength}</Text>
          </Text>
        </View>
      )}
      {indicator === "4" && (
        <View className="com-swiper-indicator-4">
          <Text className="com-swiper-indicator-4__text">
            {current + 1}/{dataLength}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ComSwiper;
