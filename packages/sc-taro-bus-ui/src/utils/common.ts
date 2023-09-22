// @ts-nocheck
import Taro, { NodesRef } from "@tarojs/taro";

/** obj转get的参数 */
export function postParam(data) {
  const keys = Object.keys(data);
  let params = "";
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let value = data[key];
    if (value != null && value != "") {
      if (i != 0) {
        params += "&";
      }
      //对特殊字符进行转义
      value = encodeURIComponent(value);
      params += key + "=" + value;
    }
  }
  return params;
}
/** 添加px */
export function addUnit(value) {
  if (value == null) {
    return undefined;
  }
  return typeof value === "number" ? `${value}px` : value;
}
/** 获取页面大小 */
export function getWindowWidth(): number {
  let screenWidth = Taro.getSystemInfoSync().windowWidth;
  if (screenWidth > 750) {
    screenWidth = 375;
  }
  return screenWidth;
}

/** 获取缩放比例 */
export function getPixelRatio(): number {
  const designWidth = 750;
  let screenWidth = Taro.getSystemInfoSync().windowWidth;
  if (screenWidth > 750) {
    screenWidth = 750;
  }
  // console.log("screenWidth", Taro.getSystemInfoSync());
  return screenWidth / designWidth;
}
/** rpx 转 px */
export const pxTransform = (size: number): number => {
  if (!size) return 0;
  const designWidth = 750;
  let screenWidth = Taro.getSystemInfoSync().windowWidth;
  if (screenWidth > 750) {
    screenWidth = 750;
  }
  return Math.floor(size * (screenWidth / designWidth));
};
/** 版本比较 */
export function compareVersion(v1, v2) {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}
/** 获取dom */
export function getRect(
  selector: string
): Promise<NodesRef.BoundingClientRectCallbackResult> {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery();
    query
      .select(selector)
      .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
        resolve(res);
      })
      .exec();
  });
}
/** 根据某个字段排序 */
export function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value1 - value2;
  };
}

export function getAllRect(
  selector
): Promise<NodesRef.BoundingClientRectCallbackResult[]> {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .selectAll(selector)
      .boundingClientRect((res: any) => {
        resolve(res);
      })
      .exec();
  });
}
/** 驼峰命名法转换 */
export function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  }

  if (typeof obj === "object" && obj !== null) {
    const newObj: { [key: string]: any } = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];

        // 递归处理嵌套对象和数组的属性名
        value = convertKeysToCamelCase(value);

        // 转换属性名为驼峰命名法
        const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        newObj[camelCaseKey] = value;
      }
    }

    return newObj;
  }

  return obj;
}

/** 字符串是否为空 */
export function isEmptyText(text?: string) {
  if (text != null && typeof text === "string") {
    return text === "";
  }
  return true;
}
