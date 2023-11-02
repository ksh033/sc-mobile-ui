//import config from "@/config";
//@ts-nocheck
export const baseUrl = 'https://test.yumcat.cn/images'
import { getCurrentPages } from '@tarojs/taro'
import compute from './compute'

/** 金额 除 10000 */
export function moneyFormat(a) {
  if (a == null) {
    return 0
  }
  return parseFloat(compute.divide(a, 10000).toFixed(2))
}
/** 金额 乘 10000 */
export function returnToMoney(a?: number) {
  if (a == null) {
    return 0
  }
  return compute.multiply(a, 10000)
}

/** 金额 除 10000 */
export function changeToKm(distance, fixed = 1) {
  return compute.divide(distance, 1000).toFixed(fixed)
}

/** 金额文本显示 */
export function formatMoneyQuery(val, dotNum = 2, dw = '') {
  if (typeof val === 'number' || typeof val === 'string') {
    if (val === '0' || val === 0) {
      return `${dw}0.00`
    }
    if (val) {
      const str = `${Number(compute.toFixed2(val, dotNum)).toFixed(dotNum)}`
      const intSum = str
        .substring(0, str.indexOf('.'))
        .replace(/\B(?=(?:\d{3})+$)/g, ',') // 取到整数部分
      const dot = str.substring(str.length, str.indexOf('.')) // 取到小数部分搜索
      const ret = intSum + dot
      return dw + ret
    }
  }
  return '--'
}

/** 图片地址格式化 */
export function imageUrl(url: string, isRemoteStatic = false) {
  const str = RegExp('http')
  let newUrl: string = ''
  // 通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去
  if (url) {
    if (str.test(url)) {
      newUrl = url
    } else {
      if (url.substr(0, 1) !== '/') {
        url = `/${url}`
      }
      newUrl = `${baseUrl}${url}`
      //newUrl = `${isRemoteStatic ? config.statUrl : config.imgBaseUrl}${url}`;
    }
  }

  return newUrl
}

/** 米 转 千米显示 */
export const mToKmStr = (distance: number): string => {
  if (Number(distance) >= 1000) {
    return compute.divide(distance, 1000).toFixed(1) + 'km'
  }
  return `${distance}m`
}

/** 格式化显示时间 */
export const fomatTime = (str: string) => {
  let pad = '00'
  return pad.substring(0, pad.length - str.length) + str
}
/** 获取eventChannel */
export const getEventChannel = () => {
  const pages = getCurrentPages()
  const current = pages[pages.length - 1]
  const eventChannel = current.getOpenerEventChannel()
  return eventChannel
}
/** 格式化数量 */
export function formatNum(num: number): string | number {
  if (num) {
    return num > 99 ? '99+' : num
  } else {
    return 0
  }
}
/** 获取url */
export function getUrls(urlObjs?: any[]) {
  var urls: string[] = []
  if (Array.isArray(urlObjs)) {
    urlObjs.forEach(function (item) {
      urls.push(item.url)
    })
  }

  return urls
}
