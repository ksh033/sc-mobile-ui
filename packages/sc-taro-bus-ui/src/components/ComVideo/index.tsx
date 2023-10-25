import Taro from "@tarojs/taro";
import { useSetState } from "@/hooks";
import { imageUrl } from "@/utils/busUtils";
import { getWindowWidth, pxTransform } from "@/utils/common";
import {
  CommonEventFunction,
  Video,
  VideoProps,
  View,
} from "@tarojs/components";
import React, { useEffect, useMemo, useState } from "react";
import { ComVideoProps } from "./type";
import "./index.scss";
import { AppUIComponents, RegAppUIComponent } from "@sceditor/core";

type ComVideoState = {
  /** 是否静音 */
  muted?: boolean;
  /** 当视频大小与 video 容器大小不一致时，视频的表现形式 */
  objectfit?: keyof VideoProps.ObjectFit;
  /** 视频高度 */
  height?: number;
  /** 是否显示底部进度条 */
  showBottomProgress?: boolean;
};

const ComVideo: AppUIComponents<ComVideoProps> = (props) => {
  const {
    autoplay = false,
    cornerType = "straight",
    coverImage,
    showProgress = true,
    type = "select",
    remoteUrl,
    videoObj,
    showCover = false,
    pageMargin = 0,
  } = props;

  /** 地址格式化 */
  const src = useMemo(() => {
    let url = "";
    if (type === "select" && videoObj) {
      url = videoObj.url || "";
    }
    if (type === "link" && remoteUrl != null && remoteUrl != "") {
      url = remoteUrl;
    }
    return url;
  }, [remoteUrl, type, JSON.stringify(videoObj)]);

  const [customSrc, setCustomSrc] = useState<string>(() => {
    return imageUrl(src || "", false);
  });

  useEffect(() => {
    if (src != null) {
      setCustomSrc(imageUrl(src, false));
    } else {
      setCustomSrc("");
    }
  }, [src]);

  const [data, setData] = useSetState<ComVideoState>({
    muted: true,
    height: 210,
    objectfit: "contain",
    showBottomProgress: false,
  });

  useEffect(() => {
    if (showCover && coverImage != null && coverImage !== "") {
      const currentWidth = getWindowWidth();
      Taro.getImageInfo({
        src: coverImage,
        success(res) {
          let oImgW = res.width; // 图片原始宽度
          let oImgH = res.height; // 图片原始高度
          let scale = currentWidth / oImgW; // 比例计算
          let imgHeight = Math.floor(oImgH * scale); // 自适应高度
          setData({ height: imgHeight });
        },
        fail() {
          setData({ height: 210 });
        },
      });
    }
  }, [coverImage, setData, showCover]);

  const onLoadedMetaData: CommonEventFunction<
    VideoProps.onLoadedMetaDataEventDetail
  > = (e) => {
    console.log("e", e);
    //视频的高
    const _height = e.detail.height;

    //视频的宽
    const width = e.detail.width;

    //算出视频的比例
    const proportion = _height / width;
    const params: ComVideoState = {
      objectfit: "contain",
    };
    if (proportion > 1) {
      params["objectfit"] = "contain";
    } else {
      params["objectfit"] = "cover";
    }
    if (!showCover) {
      const currentWidth = getWindowWidth();
      let scale = currentWidth / width; // 比例计算
      let imgHeight = Math.floor(_height * scale); // 自适应高度
      console.log("imgHeight", imgHeight);
      params["height"] = imgHeight;
    }
    setData(params);
  };

  const onPlay = () => {
    setData({
      showBottomProgress: true,
    });
  };

  const onPause = () => {
    setData({
      showBottomProgress: false,
    });
  };

  const onEnded = () => {
    setData({
      showBottomProgress: false,
    });
  };

  return (
    <View
      className="com-video custom-class"
      style={{
        height: pxTransform(data.height || 210) + pageMargin * 2,
        borderRadius: cornerType === "round" ? 12 : 0,
        padding: pageMargin,
      }}
    >
      <Video
        able-progress-gesture={false}
        muted={data.muted}
        className="com-video_view"
        style={{
          height: pxTransform(data.height || 210),
          borderRadius: cornerType === "round" ? 12 : 0,
          top: pageMargin,
          left: pageMargin,
          right: pageMargin,
          width: "auto",
        }}
        autoplay={autoplay}
        src={customSrc}
        objectFit={data.objectfit}
        onLoadedMetaData={onLoadedMetaData}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        controls
        playBtnPosition="center"
        showBottomProgress={`${showProgress ? data.showBottomProgress : false}`}
        showProgress={showProgress || data.showBottomProgress}
        showMuteBtn={data.showBottomProgress}
        showFullscreenBtn={data.showBottomProgress}
        poster={coverImage}
        id={`video${src}`}
      ></Video>
    </View>
  );
};
ComVideo.cmpType='Video'
export default RegAppUIComponent(ComVideo)
