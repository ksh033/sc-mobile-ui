import { View, Text } from "@tarojs/components";
import classnames from "classnames";
import { isEmptyText } from "@/utils/common";
import useLink from "@/hooks/useLink";
import React from "react";
import { ComTitleProps } from "./type";
import "./index.scss";
import  {RegAppUIComponent,type AppUIComponents} from '@sceditor/core'
const ComTitle: AppUIComponents<ComTitleProps> = (props) => {
  const {
    styleType = "old",
    title,
    date,
    description,
    author,
    linkTitle,
    linkValue,
    location = "left",
    fontSize = 16,
    fontWeight = "bold",
    color = "#323233",
    descriptionFontSize = 16,
    descriptionFontWeight = "normal",
    descriptionColor = "#969799",
    backgroundColor = "#fff",
  } = props;

  const prefixCls = "com-title";

  const { toLink } = useLink();
  /** 副标题文本处理 */
  const SubTextMap = {
    old: () => {
      if (description != null && description !== "") {
        return (
          <View className={`${prefixCls}-sub`}>
            <Text
              className={`${prefixCls}-desc`}
              style={{
                fontSize: descriptionFontSize,
                fontWeight: descriptionFontWeight,
                color: descriptionColor,
              }}
            >
              {description}
            </Text>
          </View>
        );
      }
    },
    wechat: () => {
      if (isEmptyText(date) && isEmptyText(linkTitle) && isEmptyText(author)) {
        return null;
      }
      return (
        <View className={`${prefixCls}-sub`}>
          {!isEmptyText(date) && (
            <Text className={`${prefixCls}-date`}>{date}</Text>
          )}
          {!isEmptyText(author) && (
            <Text className={`${prefixCls}-author`}>{author}</Text>
          )}
          {!isEmptyText(linkTitle) && (
            <View
              className={`${prefixCls}-wx-link`}
              onClick={() => {
                toLink({
                  linkPath: linkValue,
                });
              }}
            >
              {linkTitle}
            </View>
          )}
        </View>
      );
    },
  };

  return (
    <View className={prefixCls} style={{ backgroundColor: backgroundColor }}>
      <View
        className={classnames(`${prefixCls}-wrap`, {
          [`${prefixCls}-wrap-center`]: location === "center",
          [`${prefixCls}-wrap-right`]: location === "right",
        })}
      >
        <View className={`${prefixCls}-content`}>
          <Text
            className={`${prefixCls}-title`}
            style={
              styleType === "old"
                ? { fontSize: fontSize, fontWeight: fontWeight, color: color }
                : {}
            }
          >
            {title}
          </Text>
          {SubTextMap[styleType]?.()}
        </View>
      </View>
    </View>
  );
};
ComTitle.cmpType='Title'
export default RegAppUIComponent(ComTitle);
