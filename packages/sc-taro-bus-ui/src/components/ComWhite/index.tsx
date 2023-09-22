import { View } from "@tarojs/components";
import { ComWhiteProps } from "./type";
import "./index.scss";
import React from "react";

/** 辅助分割 */
const ComWhite: React.FC<ComWhiteProps> = (props) => {
  const {
    type = "white",
    height = 30,
    lineType = "solid",
    color = "#e5e5e5",
    hasPadding = "0",
  } = props;

  if (type === "white") {
    return <View className="com-white" style={{ height: height }}></View>;
  }
  return (
    <View
      className="com-white-line"
      style={
        hasPadding === "1"
          ? {
              padding: "0 15px",
            }
          : {}
      }
    >
      <View
        className="com-white-item"
        style={{
          borderTopWidth: 1,
          borderTopStyle: lineType || "solid",
          borderTopColor: color,
        }}
      ></View>
    </View>
  );
};

export default ComWhite;
