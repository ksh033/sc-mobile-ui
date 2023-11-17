import { View } from '@tarojs/components'
import { useSetState, useUpdateEffect } from '@/hooks'
import nextTick from '@/utils/nextTick'
import { dateFormat } from '@/utils/dateUtils'
import { CSSProperties, Fragment, useLayoutEffect, useMemo } from 'react'
import classnames from 'classnames'
import {
  PlayDoubleBack,
  PlayDoubleForward,
  TriangleDown
} from '@nutui/icons-react-taro'
import ScPopup from '../ScPopup'
import { DayItem, NowDate, ScCalendarProps, ScCalendarState } from './type'
import {
  getRangeBeginEndBgColor,
  getRangeBgColor,
  getTouchBgColor,
  setMonth
} from './common'
import './index.scss'
import { Color } from '@/constants/Enum'

/** 日历选择 */
const ScCalendar: React.FC<ScCalendarProps> = props => {
  const {
    isOpened,
    onClose,
    title = '请选择日期范围',
    type = 'range',
    fontColor = Color.base,
    isChangeYear = false,
    confirmText = '确定',
    min,
    max,
    value,
    confirmType = 'button',
    onComfirm,
    background = '#fff',
    isShadow = false,
    isRound = true,
    rangeStartColor = Color.dominant,
    rangeColor = '#FFF1D4',
    rangeEndColor = Color.dominant,
    touchColor = Color.dominant
  } = props

  const handleClose = () => {
    onClose?.()
  }

  const [data, setData] = useSetState<ScCalendarState>({
    days: [],
    spacingNum: 0,
    nowDate: {
      text: '',
      year: 0,
      month: 0
    },
    rangesValue: [],
    touch: 0
  })

  /**
   * @description 设置月份里mix-max选择范围
   */
  const setMinMax = (_days: DayItem[]) => {
    if (min == null && max == null) {
      return _days
    }
    if (min != null && max != null) {
      if (min.getTime() >= max.getTime()) {
        console.warn('max不能小于或等于min')
        return _days
      }
    }
    const days = [..._days]
    let minTime: number | undefined
    let maxTime: number | undefined
    if (min != null) {
      minTime = min.getTime()
    }
    if (max != null) {
      maxTime = max.getTime()
    }
    days.forEach(day => {
      if (minTime && day.time < minTime) {
        day.hide = true
      }
      if (maxTime && day.time > maxTime) {
        day.hide = true
      }
    })
    return days
  }

  /**
   * @description 渲染日历选择后样式
   */
  const renderStyle = (days: DayItem[]) => {
    const arr = [...days]

    //范围选择模式时
    if (type == 'range') {
      const begin = Number(data.rangesValue[0] || 0)
      const over = Number(data.rangesValue[1] || 0)
      /*仅选择开始的时候*/
      if (begin != 0 && over == 0) {
        for (let i of arr) {
          i.type = undefined
          if (i.time == begin) {
            i.type = 'start-only'
          }
        }
      }
      /*都选择的时候*/
      if (begin != 0 && over != 0) {
        for (let i of arr) {
          //每个日期在开始与结束范围之间的样式
          if (i.time < over && i.time > begin) {
            //日期框为星期6时（位置在最右侧）
            if (i.day === 6) {
              if (i.date === 1) {
                i.type = 'range-center'
              } else {
                i.type = 'range-right'
              }
            }
            //日期框为星期天时（位置在最左侧）
            else if (i.day === 0) {
              if (i.date === arr.length) {
                i.type = 'range-center'
              } else {
                i.type = 'range-left'
              }
            }
            //日期为1号时
            else if (i.date === 1) {
              i.type = 'range-left'
            }
            //日期为该月随后一天时
            else if (i.date === arr.length) {
              i.type = 'range-right'
            }
            //以上都不是，则设置为range
            else {
              i.type = 'range'
            }
          }
          //设置开头样式
          if (i.time == begin) {
            if (i.day === 6) {
              //如果开始处于星期六（最后一个）
              i.type = 'start-only'
            } else if (i.date == days.length) {
              //如果开始处于月末（月最后一个）
              i.type = 'start-only'
            } else {
              i.type = 'start'
            }
          }
          //设置结束样式
          if (i.time == over) {
            if (i.day === 0) {
              //如果结束为星期天（第一个）
              i.type = 'stop-only'
            } else if (i.day === 6 && i.date == 1) {
              //如果1号为星期六时
              i.type = 'stop-only'
            } else {
              i.type = 'stop'
            }
          }
        }
      }
    }
    //单选模式时候
    if (type == 'single') {
      arr.forEach(day => {
        day.type = undefined
        if (day.time == data.touch) {
          //actives传参子元素为object的时候，就显示成方形样式（因为要显示价格参数）
          if (data.activesChildType === 'object') {
            day.type = 'actives-point'
          }
          //否则按照正常的单选选中样式处理
          else {
            day.type = 'point'
          }
        }
      })
    }
    setData({ days: arr })
  }

  /**
   * @description 获取月份里数据
   */
  const getMonthData = (nowDate: NowDate) => {
    //获取当前选择的date对象
    const Y = nowDate.year,
      M = nowDate.month,
      obj = new Date(Y, M - 1, 1)
    //获取并设置日历开头空格数量
    obj.setDate(1)
    const Day = obj.getDay()
    if (Day > 6) {
      setData({ spacingNum: 0 })
    } else {
      setData({ spacingNum: Day })
    }
    //获取该月每天对象
    obj.setMonth(M) //这里的M已经加过1了
    obj.setDate(0)
    const dayNum = obj.getDate()
    let days: DayItem[] = []
    obj.setMonth(M - 1)
    for (let i = 0; i < dayNum; i++) {
      obj.setDate(i + 1)
      const day: DayItem = {
        date: i + 1, //号数
        day: obj.getDay(), //星期几
        time: obj.getTime() //毫秒时间戳
      }
      days.push(day)
    }

    //执行设置min-max处理
    days = setMinMax(days)
    //执行渲染样式
    renderStyle(days)
  }

  /**
   * @description 单选初始化
   */
  const initTouch = () => {
    let nowDate: NowDate
    if (
      typeof value === 'string' &&
      value !== '' &&
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      const arr = value.split('-'),
        date = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]))
      setData({ touch: date.getTime() })
      nowDate = setMonth(date.getFullYear(), date.getMonth())
    } else {
      console.warn(
        '[日历组件警告] 要使date传参生效，其值必须为xxxx-xx-xx日期字符串'
      )
      setData({ touch: 0 })
      nowDate = setMonth()
    }
    setData({
      nowDate: nowDate
    })
    getMonthData(nowDate)
  }

  /**
   * @description 范围选择初始化
   */
  const initRange = () => {
    let nowDate: NowDate
    let begin: number | null = null
    let end: number | null = null
    if (
      Array.isArray(value) &&
      value[0] != null &&
      /^\d{4}-\d{2}-\d{2}$/.test(value[0])
    ) {
      const arr = value[0].split('-'),
        date = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]))
      nowDate = setMonth(date.getFullYear(), date.getMonth())
      begin = date.getTime()
    } else {
      nowDate = setMonth()
    }

    if (
      Array.isArray(value) &&
      value[1] != null &&
      /^\d{4}-\d{2}-\d{2}$/.test(value[1])
    ) {
      const arr = value[1].split('-'),
        date = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]))
      if (date.getTime() > Number(begin || 0)) {
        end = date.getTime()
      }
    }
    setData({
      rangesValue: [begin, end],
      nowDate: nowDate
    })
    getMonthData(nowDate)
  }

  /** 初始化 */
  const init = () => {
    //单选模式
    if (type === 'single') {
      initTouch()
    }
    //范围选择模式
    if (type === 'range') {
      initRange()
    }
  }

  /**
   * @description 年份切换
   */
  const addOrSubYear = (status: string) => {
    const Y = data.nowDate.year,
      M = data.nowDate.month

    let nowDate: NowDate = Object.assign({}, data.nowDate)
    if (status === '-') {
      nowDate = {
        year: Y - 1,
        month: nowDate.month,
        text: `${Y - 1}-${M}`
      }
    }
    if (status === '+') {
      nowDate = {
        year: Y + 1,
        month: nowDate.month,
        text: `${Y + 1}-${M}`
      }
    }
    setData({
      nowDate: nowDate
    })
    //执行获取天数的函数
    getMonthData(nowDate)
  }
  /**  月份切换 */
  const addOrSubMonth = (status: string) => {
    const Y = data.nowDate.year,
      M = data.nowDate.month

    let nowDate: NowDate = Object.assign({}, data.nowDate)
    if (status === '+') {
      if (M === 12) {
        nowDate = {
          year: Y + 1,
          month: 1,
          text: `${Y + 1}-${1}`
        }
      } else {
        nowDate = {
          year: nowDate.year,
          month: M + 1,
          text: `${Y}-${M + 1}`
        }
      }
    }
    if (status === '-') {
      if (M === 1) {
        nowDate = {
          year: Y - 1,
          month: 12,
          text: `${Y - 1}-${12}`
        }
      } else {
        nowDate = {
          year: nowDate.year,
          month: M - 1,
          text: `${Y}-${M - 1}`
        }
      }
    }
    setData({
      nowDate: nowDate
    })
    //执行获取天数的函数
    getMonthData(nowDate)
  }

  /**
   * @description 范围选择回调
   */
  const select = (index: number) => {
    const begin = Number(data.rangesValue[0] || 0)
    const end = Number(data.rangesValue[1] || 0)
    //选择起点
    if (begin == 0 || end != 0) {
      setData({
        rangesValue: [data.days[index].time, null]
      })
    }
    //选择结束点
    else {
      //当选择的结束日期小于等于开始日期时，则重置开始日期为当前选择
      if (data.days[index].time < begin) {
        setData({
          rangesValue: [data.days[index].time, null]
        })
        return
      }
      setData({
        rangesValue: [begin, data.days[index].time]
      })
    }
  }

  /**
   *单选选择回调
   */
  const touch = (index: number) => {
    const time = data.days[index].time
    setData({ touch: time })
    nextTick(() => {
      renderStyle(data.days)
    })
  }

  useUpdateEffect(() => {
    renderStyle(data.days)
    if (
      confirmType == 'end' &&
      data.rangesValue[0] != null &&
      data.rangesValue[1] != null
    ) {
      const begin = dateFormat(new Date(data.rangesValue[0]))
      const end = dateFormat(new Date(data.rangesValue[1]))
      onComfirm?.([begin, end])
      handleClose()
    }
  }, [data.rangesValue])

  useUpdateEffect(() => {
    renderStyle(data.days)
    if (confirmType == 'end' && data.touch > 0) {
      const time = dateFormat(new Date(data.touch))
      onComfirm?.(time)
      handleClose()
    }
  }, [data.touch])

  /** 确定按钮 */
  const handleConfirm = () => {
    if (
      type == 'range' &&
      data.rangesValue[0] != null &&
      data.rangesValue[1] != null
    ) {
      const begin = dateFormat(new Date(data.rangesValue[0]))
      const end = dateFormat(new Date(data.rangesValue[1]))
      onComfirm?.([begin, end])
    }
    if (type == 'single' && data.touch > 0) {
      const time = dateFormat(new Date(data.touch))
      onComfirm?.(time)
    }
    handleClose()
  }
  /** 初始化 */
  useLayoutEffect(() => {
    init()
  }, [JSON.stringify(value)])

  const customStyle = useMemo(() => {
    const styles: CSSProperties = {
      background: background
    }
    if (isShadow) {
      styles.boxShadow = '0px 0px 5px rgba(0,0,0,0.3)'
    }
    if (isRound) {
      styles.borderRadius = 4
    }
    return styles
  }, [background, isShadow, isRound])

  return (
    <ScPopup visible={isOpened} onClose={handleClose} position='bottom' round>
      <View className='my-calendar' style={customStyle}>
        {/** 顶部标题以及操作按钮显示 */}
        <View className='tools' style={{ color: fontColor }}>
          <View>{title}</View>
        </View>

        {/** 日期显示以及切换 */}
        <View className='month-select' style={{ color: fontColor }}>
          {/** 月份减 */}
          <View
            className='icon-wrap icon-wrap-left'
            onClick={() => {
              addOrSubMonth('-')
            }}
          >
            <TriangleDown />
          </View>

          <View className='text-wrap'>
            {/** 年份减 */}
            {isChangeYear && (
              <View
                className='icon-wrap'
                onClick={() => {
                  addOrSubYear('-')
                }}
              >
                <PlayDoubleBack />
              </View>
            )}

            <View className='text'>{data.nowDate.text}</View>
            {/** 年份加 */}
            {isChangeYear && (
              <View
                className='icon-wrap'
                onClick={() => {
                  addOrSubYear('+')
                }}
              >
                <PlayDoubleForward />
              </View>
            )}
          </View>

          {/** 月份加 */}
          <View
            className='icon-wrap icon-wrap-right'
            onClick={() => {
              addOrSubMonth('+')
            }}
          >
            <TriangleDown />
          </View>
        </View>

        {/** 星期显示 */}
        <View className='week-show' style={{ color: fontColor }}>
          <View className='child'>日</View>
          <View className='child'>一</View>
          <View className='child'>二</View>
          <View className='child'>三</View>
          <View className='child'>四</View>
          <View className='child'>五</View>
          <View className='child'>六</View>
        </View>

        {/** 每月天数量显示框 */}
        <View className='day-wrap' style={{ color: fontColor }}>
          {/** 用于占空 */}
          {new Array(data.spacingNum).fill(1).map((_, index) => {
            return (
              <View className='spacing' key={`spacing-start-${index}`}></View>
            )
          })}
          {/** 范围选择模式时 */}
          {type === 'range' &&
            data.days.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item.hide ? (
                    <View className='day'>
                      <View className='day-inside-wrap'>
                        <View className='day-inside' style={{ opacity: 0.3 }}>
                          {item.date}
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      className={classnames(['day', item.type || ''])}
                      style={getRangeBgColor(rangeColor, item.type)}
                    >
                      <View
                        className='day-inside-wrap'
                        onClick={() => {
                          select(index)
                        }}
                        style={getRangeBeginEndBgColor(
                          rangeStartColor,
                          rangeEndColor,
                          item.type
                        )}
                      >
                        <View className='day-inside'>{item.date}</View>
                      </View>
                    </View>
                  )}
                </Fragment>
              )
            })}

          {/** 单选模式时 */}
          {type === 'single' &&
            data.days.map((item, index) => {
              return (
                <Fragment key={index}>
                  {item.hide ? (
                    <View className='day'>
                      <View className='day-inside-wrap'>
                        <View className='day-inside' style={{ opacity: 0.3 }}>
                          {item.date}
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      className={classnames(['day', item.type || ''])}
                      style={getTouchBgColor(touchColor, item.type)}
                    >
                      <View
                        className='day-inside-wrap'
                        onClick={() => {
                          touch(index)
                        }}
                      >
                        <View className='day-inside'>
                          {item.date}
                          {data.activesChildType === 'object' && (
                            <View
                              style={{
                                fontSize: 8,
                                textAlign: 'center',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {item?.text}
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                </Fragment>
              )
            })}
        </View>
        {confirmType === 'button' && (
          <View
            onClick={handleConfirm}
            className={classnames([
              'day-footer',
              {
                'day-footer-disabled': !(
                  data.touch > 0 ||
                  (Number(data.rangesValue[0] || 0) > 0 &&
                    Number(data.rangesValue[1] || 0) > 0)
                )
              }
            ])}
          >
            {confirmText}
          </View>
        )}
      </View>
    </ScPopup>
  )
}
export default ScCalendar
