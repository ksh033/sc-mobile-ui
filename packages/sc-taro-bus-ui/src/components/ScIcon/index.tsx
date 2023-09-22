import classNames from "classnames";
import PropTypes, { InferProps } from "prop-types";
import React from "react";
import { Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { ScIconProps } from "./types";
import { mergeStyle } from "../utils/styles";

export default class ScIcon extends React.Component<ScIconProps> {
  public static propTypes: InferProps<ScIconProps>;
  public static defaultProps: ScIconProps;

  private handleClick(): void {
    this.props.onClick && this.props.onClick(arguments as any);
  }

  pxTransform(size: number): string {
    if (!size) return "";
    const designWidth = 750;
    const screenWidth = Taro.getSystemInfoSync().windowWidth;
    return `${Math.floor(size * (screenWidth / designWidth))}px`;
  }

  public render(): JSX.Element {
    const { customStyle, className, prefixClass, value, size, color } =
      this.props;

    const rootStyle:any = {
      fontSize: `${this.pxTransform(parseInt(String(size)))}`,
    };
    if (color) {
      rootStyle["color"] = color;
    }

    const iconName = value ? `${prefixClass}-${value}` : "";
    return (
      <Text
        className={classNames(prefixClass, iconName, className)}
        style={mergeStyle(rootStyle, customStyle as object)}
        onClick={this.handleClick.bind(this)}
      ></Text>
    );
  }
}

ScIcon.defaultProps = {
  customStyle: {},
  className: "",
  prefixClass: "sc-icon",
  value: "",
  color: "",
  size: 24,
};

ScIcon.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prefixClass: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
};
