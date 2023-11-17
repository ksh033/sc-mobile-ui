import { CSSProperties } from 'react'
import { DaySelectType, NowDate } from './type'

/**
 * @description 设置当前显示月份
 * @param {Number} y 年份
 * @param {Number} m 月份
 */
export const setMonth = (y?: number, m?: number): NowDate => {
  let obj = new Date()
  if (y && m) {
    obj = new Date(y, m, 1)
  }
  const Y = obj.getFullYear()
  const M =
    obj.getMonth() + 1 < 10 ? '0' + (obj.getMonth() + 1) : obj.getMonth() + 1
  console.log('year', obj.getFullYear())
  console.log('M ', M)
  return {
    text: `${Y}-${M}`,
    year: obj.getFullYear(),
    month: obj.getMonth() + 1
  }
}
/** 获取范围之间的日期颜色  */
export const getRangeBgColor = (
  rangeColor: string,
  type?: DaySelectType
): CSSProperties => {
  if (
    [
      'range',
      'range-left',
      'range-center',
      'range-right',
      'start',
      'start-only',
      'stop'
    ].indexOf(type || '') !== -1
  ) {
    return {
      background: rangeColor
    }
  }
  return {}
}
/** 获取范围结束的日期颜色 */
export const getRangeBeginEndBgColor = (
  rangeStartColor: string,
  rangeEndColor: string,
  type?: DaySelectType
): CSSProperties => {
  if (['start', 'start-only'].indexOf(type || '') !== -1) {
    return {
      background: rangeStartColor
    }
  }
  if (['stop', 'stop-only'].indexOf(type || '') !== -1) {
    return {
      background: rangeEndColor
    }
  }
  return {}
}
/** 获取单个选中值得背景色 */
export const getTouchBgColor = (
  touchColor: string,
  type?: DaySelectType
): CSSProperties => {
  if (['point', 'actives-point'].indexOf(type || '') !== -1) {
    return {
      background: touchColor
    }
  }
  return {}
}
