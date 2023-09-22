import { ConfigProvider, NoticeBar } from "@nutui/nutui-react-taro";
import { Image, View } from "@tarojs/components";
import classnames from "classnames";
import { ComNoticeProps } from "./type";
import "./index.scss";
import React from "react";

const ComNotice: React.FC<ComNoticeProps> = (props) => {
  const {
    content,
    pageMargin = 0,
    placeholder = "请填写内容，如果过长，将会在手机上滚动显示",
    backgroundColor = "#fff8e9",
    cardBackgroundColor = "transparent",
    cornerType = "round",
    hasTopBottomMargin = true,
    color = "#323233",
  } = props;

  return (
    <View
      className={classnames("com-notice", {
        "com-notice-round": cornerType === "round",
      })}
      style={{
        padding: `${hasTopBottomMargin ? "6px" : "0"} ${Number(
          pageMargin || 0
        )}px`,
        backgroundColor: cardBackgroundColor,
      }}
    >
      <ConfigProvider
        theme={{
          nutuiNoticebarHeight: "40px",
          nutuiNoticebarLineHeight: "40px",
          nutuiNoticebarBackground: backgroundColor,
          nutuiNoticebarColor: color,
        }}
      >
        <NoticeBar
          content={content || placeholder}
          scrollable={false}
          leftIcon={
            <Image
              src="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
              className="com-notice-icon"
            />
          }
        />
      </ConfigProvider>
    </View>
  );
};

export default ComNotice;
