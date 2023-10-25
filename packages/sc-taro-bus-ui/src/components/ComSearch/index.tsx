import { ConfigProvider, SearchBar } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import classnames from "classnames";
import { useMemo } from "react";
import { ComSearchProps } from "./type";
import "./index.scss";
import React from "react";
import { type AppUIComponents,  RegAppUIComponent } from "@sceditor/core";
/** 商品搜索框 */
const ComSearch: AppUIComponents<ComSearchProps> = (props) => {
  const {
    style = {},
    className,
    backgroundColor = "#F9F9F9",
    placeholder = "搜索店内商品",
    height = 40,
    textColor = "#969799",
    borderStyleColor = "#ffffff",
    textAlign = "left",
    borderStyleMethod = "square",
    value,
    onChange,
    positionType = "normal",
    positionShowMethod = "fixed",
    id,
  } = props;

  const defaultStyles = useMemo(() => {
    if (backgroundColor) {
      return {
        backgroundColor: backgroundColor,
      };
    }
    return {};
  }, [backgroundColor]);

  const styles: React.CSSProperties = {
    ...{
      height: height + 10,
      position: positionType === "sticky" ? "sticky" : "relative",
    },
    ...(style || {}),
    ...defaultStyles,
  };

  const onSearch = (val: string) => {
    onChange?.(val);
  };

  return (
    <View
      className={classnames("com-search", className)}
      style={styles}
      id={id}
    >
      <View
        className={classnames("com-search-content")}
        style={{
          position:
            positionType === "sticky" &&
            positionShowMethod === "fixed" &&
            process.env.TARO_ENV !== "h5"
              ? "fixed"
              : "relative",
        }}
      >
        <ConfigProvider
          theme={{
            nutuiSearchbarBackground: backgroundColor,
            nutuiSearchbarInputBackground: borderStyleColor,
            nutuiSearchbarInputTextAlign: textAlign,
            nutuiGray1: textColor,
            nutuiSearchbarInputHeight: `${height - 10}px`,
            nutuiSearchbarInputTextColor: textColor,
            nutuiSearchbarInputBorderRadius:
              borderStyleMethod === "square" ? "8px" : "999px",
            nutuiSearchbarContentBorderRadius:
              borderStyleMethod === "square" ? "8px" : "999px",
          }}
        >
          <SearchBar
            shape={borderStyleMethod}
            onSearch={onSearch}
            placeholder={placeholder}
            value={value}
          />
        </ConfigProvider>
      </View>
    </View>
  );
};
ComSearch.cmpType='Search'
export default RegAppUIComponent(ComSearch);
