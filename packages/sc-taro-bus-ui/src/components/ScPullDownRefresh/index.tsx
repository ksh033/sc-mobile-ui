import React, { PropsWithChildren } from 'react'
import { InferProps } from 'prop-types'
import {
  ScrollView,
  View,
  Text,
  ScrollViewProps,
  BaseEventOrig
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import LoadMore from './LoadMore'
import Enum from './enum'
import './index.scss'
import ScEmpty from '../ScEmpty'
import ScLoading from '../ScLoading'

export type PullDownRefreshState = {
  topNum: number
  prefix?: string
  classPrefix: string
  barHeight: number
  refreshStatus: number
  upRefreshStatus: number
  computedLoadingBarHeight: number
  baseRefresh?: boolean
  emptyImg?: string
  loadingStatus: number
  scrollerViewHeight: number
  //自定义初始的pageNo，默认为1
  pageNo: number
  pullDownRefreshing: boolean
  isEmpty: boolean
  showLoadingMore: boolean
  totalData: any[]
  showBackToTopClass: boolean
  backToTopClass?: string
  base64BackToTop?: string
}

export type PullDownRefreshProps = {
  // id
  id?: string
  /** 加载loading样式 */
  externalClasses?: string[]
  loadingBarHeight?: number
  loadingProps?: any
  /** 提示语，组件内部默认值为 ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'] */
  loadingTexts?: string[]
  upLoadingTexts?: string[]
  /** 最大下拉高度 */
  maxBarHeight?: number
  /** 刷新超时时间 */
  refreshTimeout?: number
  // 是否可以上拉切换
  canPullUpSwitch?: boolean
  //当分页未满一屏时，是否自动加载更多，默认为否(nvue无效)
  insideMore?: boolean
  lowerDistance: number
  query?: (current: number, size: number) => Promise<any>
  timeout?: () => void
  onListChange?: (data: any) => void
  onLoad?: (data: any) => any
  onSwitch?: (current: number, size: number) => void
  onScroll?: (detail: BaseEventOrig<ScrollViewProps.onScrollDetail>) => void
  //自定义初始的pageNo，默认为1
  defaultPageNo: number
  //自定义pageSize，默认为10
  defaultPageSize: number
  //z-paging mounted后自动调用reload方法(mounted后自动调用接口)，默认为是
  auto: boolean
  //reload时自动滚动到顶部，默认为是
  autoScrollToTopWhenReload: boolean
  //reload时立即自动清空原list，默认为是，若立即自动清空，则在reload之后、请求回调之前页面是空白的
  autoCleanListWhenReload: boolean
  //本地分页时上拉加载更多延迟时间，单位为毫秒，默认200毫秒
  localPagingLoadingTime: number
  /** 自定义渲染列表 */
  renderItem?: (item: any, index: number) => React.ReactNode
  /** 空值渲染 */
  emptyRender?: () => React.ReactNode
  /** 底部加载完样式显示 */
  noMoreRender?: (noMoreText: string) => React.ReactNode
  autoShowBackToTop?: boolean
  //点击返回顶部按钮显示/隐藏的阈值(滚动距离)，单位为px
  backToTopThreshold: number
  //点击返回顶部按钮的自定义图片地址，默认使用z-paging内置的图片
  backToTopImg?: String
  //点击返回顶部按钮返回到顶部时是否展示过渡动画，默认为是
  backToTopWithAnimate?: boolean
  //点击返回顶部按钮与底部的距离，注意添加单位px
  backToTopBottom?: number
  // 是否使用自定义返回头部
  useCustomBackToTop?: boolean
  // 内容样式
  contentClasses?: string[]
  // 是否允许下拉刷新
  refresherEnabled?: boolean
}
const prefix = 't'
function getTime() {
  return new Date().getTime()
}

class ScPullDownRefresh extends React.PureComponent<
  PropsWithChildren<PullDownRefreshProps>,
  PullDownRefreshState
> {
  public static propTypes: InferProps<PullDownRefreshProps>
  public static defaultProps: PullDownRefreshProps

  constructor(props: PullDownRefreshProps) {
    super(props)
    this.enableToRefresh = true
    this.isPulling = false
    // this.isCompleted = true
    // this.startOpen = false
    this.state = {
      topNum: 0,
      // prefix,loading
      classPrefix: `${prefix}-pull-down-refresh`,
      barHeight: 0,
      refreshStatus: -1,
      upRefreshStatus: 0,

      computedLoadingBarHeight: 0,
      loadingStatus: Enum.More.Default,
      scrollerViewHeight: 0,
      pageNo: 1,
      pullDownRefreshing: false,
      isEmpty: true,
      showLoadingMore: false,
      totalData: [],
      showBackToTopClass: false
      // backToTopClass: 'sc-back-to-top sc-back-to-top-hide',
      // base64BackToTop: base64BackToTop,
    }
    // this.bindMethod(touch);
    //this.touchMove=touch.touchMove.bind(this)
    // this.touchMove=touch.touchMove.bind(this)
  }
  componentDidMount() {
    this.setAutoHeight()
    Taro.onWindowResize(() => {
      this.setAutoHeight()
    })

    // 是否要请求数据
    if (this.props.auto) {
      this.reload()
    }
  }

  static externalClasses = ['my-class'];
  [x: string]: any

  _getNodeClientRect(select: string) {
    const query = Taro.createSelectorQuery()
    query.select(select).boundingClientRect()
    return new Promise<any>(resolve => {
      query.exec(data => {
        resolve(
          data && data != '' && data != undefined && data.length ? data : false
        )
      })
    })
  }

  //判断当没有更多数据且分页内容未超出z-paging时是否显示没有更多数据的view
  async _checkShowLoadingMoreWhenNoMoreAndInsideOfPaging(
    totalData: string | any[],
    oldScrollViewNode = void 0,
    oldPagingContainerNode = void 0
  ) {
    try {
      const scrollViewNode =
        oldScrollViewNode || (await this._getNodeClientRect('.sc-scroll-view'))
      let pagingContainerH = 0
      let scrollViewH = 0
      const pagingContainerNode =
        oldPagingContainerNode ||
        (await this._getNodeClientRect('.sc-scroll-view-content'))
      if (pagingContainerNode) {
        pagingContainerH = pagingContainerNode[0].height
      }
      if (scrollViewNode) {
        scrollViewH = scrollViewNode[0].height
      }
      this.insideOfPaging = pagingContainerH < scrollViewH
      this.setData({
        showLoadingMore: !this.insideOfPaging
      })
      this._updateInsideOfPaging()
    } catch (e) {
      this.insideOfPaging = !totalData.length
      // if (this.properties.hideLoadingMoreWhenNoMoreAndInsideOfPaging) {

      // }
      this.setData({
        showLoadingMore: !this.insideOfPaging
      })
      this._updateInsideOfPaging()
    }
  }

  _doCheckScrollViewShouldFullHeight = (totalData: string | any[]) => {
    if (this.state.loadingStatus === Enum.More.NoMore) {
      this.setData({
        showLoadingMore: totalData.length > 0
      })
    } else {
      this._checkShowLoadingMoreWhenNoMoreAndInsideOfPaging(totalData)
    }
  }

  setAutoHeight() {
    const res = Taro.getSystemInfoSync()
    const { maxBarHeight, loadingBarHeight } = this.props
    this.pixelRatio = res.windowWidth / 750 > 1 ? 1 : res.windowWidth / 750
    if (maxBarHeight) {
      this.maxBarHeight = this.toRpx(maxBarHeight)
    }

    if (loadingBarHeight) {
      this.setData({
        computedLoadingBarHeight: this.toRpx(loadingBarHeight)
      })
      this.loadingBarHeight = this.toRpx(loadingBarHeight)
    }
    const clientId = this.props.id ? `#${this.props.id}` : `.${prefix}-class`

    setTimeout(() => {
      this._getNodeClientRect(clientId).then(rect => {
        if (Array.isArray(rect) && rect.length === 1) {
          this.setData({
            scrollerViewHeight: parseInt(rect[0].height) - 20
          })
        }
      })
    }, 400)
  }

  bindMethod = (obj: Record<string, Function>) => {
    const that = this
    Object.keys(obj).forEach((key: string) => {
      that[key] = obj[key].bind(this)
    })
  }

  complete = (data: any, success = true) => {
    this.customNoMore = -1
    this.addData(data, success)
  }
  //简写，与completeByTotalCount完全相同
  completeByTotal = (data: any[], totalCount: number, success = true) => {
    this.completeByTotalCount(data, totalCount, success)
  }
  //【通过totalCount判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为totalCount(列表总数)，第三个参数为是否成功(默认为是）
  completeByTotalCount = (data: any[], totalCount: number, success = true) => {
    if (totalCount == null) {
      this.customNoMore = -1
    } else {
      let dataTypeRes = this._checkDataType(data, success)
      data = dataTypeRes.data
      success = dataTypeRes.success
      if (totalCount >= 0 && success) {
        let nomore = true
        let totalDataCount = this.state.totalData.length
        if (this.state.pageNo == this.props.defaultPageNo) {
          totalDataCount = 0
        }
        let exceedCount = totalDataCount + data.length - totalCount
        if (exceedCount >= 0) {
          nomore = false
          exceedCount = this.props.defaultPageSize - exceedCount
          if (exceedCount > 0 && exceedCount < data.length) {
            data = data.splice(0, exceedCount)
          }
        }
        this.completeByNoMore(data, nomore, success)

        return
      }
    }
    this.addData(data, success)
  }
  setData = (data: any, fn?: () => void) => {
    this.setState(data, fn)
  }
  //【自行判断是否有更多数据】请求结束(成功或者失败)调用此方法，将请求的结果传递给z-paging处理，第一个参数为请求结果数组，第二个参数为是否有更多数据，第三个参数为是否成功(默认是是）
  completeByNoMore = (data: any, nomore: boolean, success = true) => {
    if (nomore != null) {
      this.customNoMore = nomore == true ? 1 : 0
    }
    this.addData(data, success)
  }

  //与上方complete方法功能一致，新版本中设置服务端回调数组请使用complete方法
  addData = (data: any, success = true) => {
    const currentTimeStamp = getTime()
    let addDataDalay = 0
    const requestTimeStamp = Number(this.requestTimeStamp || 0)
    const disTime = currentTimeStamp - requestTimeStamp
    let minDelay = 350
    if (requestTimeStamp > 0 && disTime < minDelay) {
      addDataDalay = minDelay - disTime
    }
    setTimeout(() => {
      this._addData(data, success, false)
    }, addDataDalay)
  }

  //重新加载分页数据，pageNo会恢复为默认值，相当于下拉刷新的效果(animate为true时会展示下拉刷新动画，默认为false)
  reload = () => {
    this.queryFrom = Enum.QueryFrom.Reload
    this.loadingType = Enum.LoadingType.Refresher
    this.insideOfPaging = -1
    const { defaultPageNo, defaultPageSize } = this.props

    this.setData(
      {
        pageNo: defaultPageNo,
        loadingStatus: Enum.More.Loading
      },
      () => {
        this._totalDataChange(this.state.totalData)
        this._emitQuery(this.state.pageNo, defaultPageSize)
      }
    )
  }
  //刷新列表数据，pageNo和pageSize不会重置，列表数据会重新从服务端获取。必须保证@query绑定的方法中的pageNo和pageSize和传给服务端的一致
  refresh = () => {
    this.loadingType = Enum.LoadingType.Refresher
    if (!this.state.totalData.length) {
      this.reload()
      return
    }
    this.queryFrom = Enum.QueryFrom.Refresh
    this._emitQuery(this.state.pageNo, this.props.defaultPageSize)
  }
  //清空分页数据
  clear = () => {
    // this._reload(true);
    this._addData([], true, false)
  }

  //处理服务端返回的数组
  _addData = (data: any[], success: boolean, isLocal?: boolean) => {
    let dataTypeRes = this._checkDataType(data, success)
    data = dataTypeRes.data
    success = dataTypeRes.success

    this.close()

    if (success) {
      this.setData(
        {
          pullDownRefreshing: false,
          loadingStatus: Enum.More.Default
        },
        () => {
          this._currentDataChange(data)
        }
      )
    } else {
      const state: any = {
        pullDownRefreshing: false,
        loadingStatus: Enum.More.Fail
      }
      if (this.loadingType === Enum.LoadingType.LoadingMore) {
        state['pageNo'] = this.state.pageNo - 1
      }
      this.setData(state)
    }
  }
  //触发更新是否超出页面状态
  _updateInsideOfPaging = () => {
    if (this.props.insideMore && this.insideOfPaging === true) {
      this._doLoadingMore()
    }
  }
  //当前数据改变时调用
  _currentDataChange = (newVal: any[]) => {
    if (this.customNoMore !== -1) {
      if (this.customNoMore === 0 || !newVal.length) {
        this.setData({
          loadingStatus: Enum.More.NoMore
        })
      }
    } else {
      //  || (newVal.length && newVal.length < this.defaultPageSize)
      if (!newVal.length) {
        this.setData({
          loadingStatus: Enum.More.NoMore
        })
      }
    }
    let list: any[] = this.state.totalData
    if (this.state.pageNo === 1) {
      list = []
    }
    if (list.length > 0) {
      list = [...list, ...newVal]
    } else {
      list = newVal
    }
    this.setData(
      {
        totalData: list
      },
      () => {
        this._totalDataChange(list)
      }
    )
  }
  //本地分页请求
  _localPagingQueryList = (
    pageNo: number,
    pageSize: number,
    localPagingLoadingTime: number,
    callback: {
      (res: any): void
      (arg0: any): void
      (arg0: any): void
      (arg0: any): void
      (arg0: any): void
    }
  ) => {
    pageNo = parseInt(`${pageNo}`)
    pageSize = parseInt(`${pageSize}`)
    if (pageNo < 0 || pageSize <= 0) {
      this._localPagingQueryResult(callback, [], localPagingLoadingTime)
      return
    }
    pageNo = Math.max(1, pageNo)
    let totalPagingList = [...this.totalLocalPagingList]
    let pageNoIndex = (pageNo - 1) * pageSize
    if (pageNoIndex + pageSize <= totalPagingList.length) {
      this._localPagingQueryResult(
        callback,
        totalPagingList.splice(pageNoIndex, pageSize),
        localPagingLoadingTime
      )
    } else if (pageNoIndex < totalPagingList.length) {
      this._localPagingQueryResult(
        callback,
        totalPagingList.splice(
          pageNoIndex,
          totalPagingList.length - pageNoIndex
        ),
        localPagingLoadingTime
      )
    } else {
      this._localPagingQueryResult(callback, [], localPagingLoadingTime)
    }
  }
  //本地分页请求回调
  _localPagingQueryResult = (
    callback: (arg0: any) => void,
    arg: any[],
    localPagingLoadingTime: number
  ) => {
    setTimeout(() => {
      callback(arg)
    }, localPagingLoadingTime)
  }
  //发射query事件
  _emitQuery = (pageNo: number, pageSize: number) => {
    this.requestTimeStamp = getTime()
    this.setData(
      {
        pullDownRefreshing: true
      },
      () => {
        if (this.props.query) {
          this.props.query?.(pageNo, pageSize).then(res => {
            if (res) {
              let newData: any[] = []
              let total = 0
              let newRes = res
              if (this.props.onLoad) {
                newRes = this.props.onLoad(res)
              }
              if (!Array.isArray(newRes)) {
                newData = newRes.records || newRes.rows || []
                total = newRes.total || 0
              } else {
                newData = newRes
                total = Array.isArray(newRes) ? newRes.length : 0
              }
              this.completeByTotal(newData, total)
            }
          })
        } else {
          this.completeByTotal([], 0)
        }
      }
    )
  }
  //检查complete data的类型
  _checkDataType = (data: any, success: boolean) => {
    const dataType = Object.prototype.toString.call(data)
    if (dataType === '[object Boolean]') {
      success = data
      data = []
    } else if (dataType === '[object Null]') {
      data = []
    } else if (dataType !== '[object Array]') {
      data = []
      if (dataType !== '[object Undefined]') {
        //  console.error(`${complete}参数类型不正确，第一个参数类型必须为Array!`)
      }
    }
    return {
      data,
      success
    }
  }
  _totalDataChange = (newVal: string | any[]) => {
    if (
      this.queryFrom === Enum.QueryFrom.Reload &&
      !this.props.autoCleanListWhenReload
    ) {
      return
    }
    this.props.onListChange?.([...newVal])
    //this.triggerEvent("listChange", [...newVal]);
    Taro.nextTick(() => {
      this._doCheckScrollViewShouldFullHeight(newVal)
      this.setData({
        isEmpty: !Boolean(newVal.length > 0)
      })
    })
  }

  _doLoadingMore = () => {
    this.queryFrom = Enum.QueryFrom.LoadingMore
    const { pageNo, loadingStatus } = this.state
    let newPageNo = pageNo + 1
    const { defaultPageNo, defaultPageSize } = this.props
    if (pageNo >= defaultPageNo && loadingStatus !== Enum.More.NoMore) {
      this.setData(
        {
          pageNo: newPageNo,
          loadingStatus: Enum.More.Loading
        },
        () => {
          if (this.isLocalPaging) {
            this._localPagingQueryList(
              newPageNo,
              defaultPageSize,
              this.localPagingLoadingTime,
              (res: any) => {
                this.addData(res)
              }
            )
          } else {
            this.queryFrom = Enum.QueryFrom.LoadingMore
            this._emitQuery(newPageNo, defaultPageSize)
          }
          this.loadingType = Enum.LoadingType.LoadingMore
        }
      )
    }
  }

  onScrollToTop = () => {
    this.enableToRefresh = true
  }
  onScrollToLower = () => {
    this._doLoadingMore()
  }

  //判断是否要显示返回顶部按钮
  _checkShouldShowBackToTop = (newVal: number, oldVal: number) => {
    if (!this.props.autoShowBackToTop) {
      this.setData({
        showBackToTopClass: false
      })
      return
    }
    if (newVal !== oldVal) {
      if (newVal > this.props.backToTopThreshold) {
        if (!this.state.showBackToTopClass) {
          this.setData(
            {
              showBackToTopClass: true
            },
            () => {
              this.lastBackToTopShowTime = new Date().getTime()
              setTimeout(() => {
                this.setData({
                  backToTopClass: 'sc-back-to-top sc-back-to-top-show'
                })
              }, 300)
            }
          )
        }
      } else {
        if (this.state.showBackToTopClass) {
          const currentTime = new Date().getTime()
          let dalayTime = 300
          if (currentTime - this.lastBackToTopShowTime < 500) {
            dalayTime = 0
          }
          this.setData({
            backToTopClass: 'sc-back-to-top sc-back-to-top-hide'
          })
          setTimeout(() => {
            this.setData({
              showBackToTopClass: false
            })
          }, dalayTime)
        }
      }
    }
  }

  //export type BaseEventOrigFunction<T> = (event: BaseEventOrig<T>) => void
  // BaseEventOrigFunction<ScrollViewProps.onScrollDetail>
  onScroll = (e: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
    // console.log("e", e);
    // console.log(e.detail.scrollTop)
    const contentOffsetY = e.detail.scrollTop
    this._checkShouldShowBackToTop(contentOffsetY, contentOffsetY - 1)
    this.deltaY = e.detail.scrollTop
    this.props.onScroll?.(e)
    // this.triggerEvent("scroll", e);
    this.enableToRefresh = e.detail.scrollTop <= 0
  }
  scrollToTop = () => {
    this.setData({
      topNum: 0
    })
  }
  callback = () => {
    // 正在刷新效果至少持续1秒钟
    const remainTime = 600 - (Date.now() - this.startTime)
    this.minRefreshTimeFlag = setTimeout(
      () => {
        // 清理自身timeout
        this.minRefreshTimeFlag = 0
        // 如果还没超时
        if (this.maxRefreshAnimateTimeFlag) {
          // 清理超时setup
          clearTimeout(this.maxRefreshAnimateTimeFlag)
          this.maxRefreshAnimateTimeFlag = 0
          // 执行成功状态展示
          this.setData({
            refreshStatus: 3,
            upRefreshStatus: 3
          }) // 刷新成功
          this.minRefreshStatusShowTimeFlag = setTimeout(() => {
            this.minRefreshStatusShowTimeFlag = 0
            this.close()
          }, 1000) // 刷新成功展示持续一段时间后再结束
        }
      },
      remainTime > 0 ? remainTime : 0
    )
  }
  getTouch(e: any) {
    let touchEv = e
    if (e.touches && e.touches.length) {
      touchEv = e.touches[0]
    } else if (e.changedTouches && e.changedTouches.length) {
      touchEv = e.changedTouches[0]
      // @ts-ignore
    } else if (e.datail && e.datail != {}) {
      touchEv = e.datail
    }
    return {
      pageX: touchEv.clientX,
      pageY: touchEv.clientY
    }
  }

  onTouchStart = (e: BaseEventOrig<any>) => {
    //console.log("this.state.loadingStatus === Enum.More.NoMore", this.state.loadingStatus === Enum.More.NoMore)
    // this.touchStart(e);
    const { pageX, pageY } = this.getTouch(e)
    this.startPoint = {
      pageX,
      pageY
    }
    if (this.isPulling === false) this.isPulling = true
  }

  onTouchMove = (e: BaseEventOrig<any>) => {
    if (!this.startPoint) {
      return
    }

    const { pageY } = this.getTouch(e)
    const offset = pageY - this.startPoint.pageY
    //console.log("offset",offset,"offsetY",offsetY)
    const barHeight = this.toRpx(offset)

    if (barHeight > 0) {
      if (this.enableToRefresh) {
        // 下拉
        if (barHeight > this.maxBarHeight) {
          // 限高
          this.setRefreshBarHeight(this.maxBarHeight)
          this.startPoint.pageY = pageY - this.toPx(this.maxBarHeight) // 限高的同时修正起点，避免触摸点上移时无效果
        } else {
          this.setRefreshBarHeight(barHeight)
        }
      } else {
        this.isPulling = false
        this.startPoint = null
      }
    } else {
      if (
        this.state.loadingStatus === Enum.More.NoMore &&
        this.props.canPullUpSwitch
      ) {
        // 上拉
        if (Math.abs(barHeight) > this.maxBarHeight) {
          // 限高
          this.setRefreshBarHeight(0 - this.maxBarHeight)
          this.startPoint.pageY = pageY + this.toPx(this.maxBarHeight) // 限高的同时修正起点，避免触摸点上移时无效果
        } else {
          this.setRefreshBarHeight(barHeight)
        }
      } else {
        this.isPulling = false
        this.startPoint = null
      }
    }
    // /**上拉加载切换 */
    // this.onUpTouchMove(e);c
  }

  onTouchEnd = (e: BaseEventOrig<any>) => {
    if (this.startPoint == null || !this.isPulling) {
      return
    }
    const { pageY } = this.getTouch(e)
    const barHeight = this.toRpx(pageY - this.startPoint.pageY)
    // 没达到最小域值不做事件
    if (Math.abs(barHeight) <= this.props.lowerDistance) {
      this.isPulling = false
      this.startPoint = null
      this.setData({
        barHeight: 0
      })
      return
    } else {
      let state: any = {
        barHeight: this.loadingBarHeight,
        refreshStatus: 2,
        baseRefresh: true
      }
      if (barHeight < 0) {
        state = {
          barHeight: 0 - this.loadingBarHeight,
          upRefreshStatus: 2,
          pageNo: 1
        }
      }
      if (barHeight > 0) {
        this.setData(state, () => {
          this.startTime = Date.now()
          this.reload()
        })
      } else {
        if (this.props.onSwitch && this.props.canPullUpSwitch) {
          this.setData(state, () => {
            this.props.onSwitch?.(this.props.defaultPageSize, this.state.pageNo)
          })
        }
      }

      this.maxRefreshAnimateTimeFlag = setTimeout(() => {
        this.maxRefreshAnimateTimeFlag = null
        if (barHeight > 0) {
          if (this.state.refreshStatus === 2) {
            // 超时回调
            //this.triggerEvent("timeout");
            this.props.timeout?.()
            this.close() // 超时仍未被回调，则直接结束下拉
          }
        } else {
          if (this.state.upRefreshStatus === 2) {
            // 超时回调
            this.props.timeout?.()
            this.close() // 超时仍未被回调，则直接结束下拉
          }
        }
      }, this.props.refreshTimeout)
    }
  }

  toRpx = (v: string | number) => {
    if (typeof v === 'number') return v * this.pixelRatio
    return parseInt(v, 10)
  }

  toPx = (v: number) => {
    return v / this.pixelRatio
  }

  setRefreshBarHeight = (barHeight: number) => {
    const data: any = {
      barHeight
    }
    if (Number(barHeight) > 0) {
      if (barHeight >= this.loadingBarHeight) {
        data.refreshStatus = 1
      } else {
        data.refreshStatus = 0
      }
      return new Promise(resolve => {
        this.setData(data, () => resolve(barHeight))
      })
    } else {
      if (Math.abs(barHeight) >= this.loadingBarHeight) {
        data.upRefreshStatus = 1
      } else {
        data.upRefreshStatus = 0
      }
      return new Promise(resolve => {
        this.setData(data, () => resolve(barHeight))
      })
    }
  }

  close = () => {
    const animationDuration = 240

    this.setData({
      barHeight: 0,
      refreshStatus: 3,
      baseRefresh: false,
      upRefreshStatus: 3
    })
    // this.triggerEvent('change', {
    //   value: false
    // });
    this.closingAnimateTimeFlag = setTimeout(() => {
      this.closingAnimateTimeFlag = null
      if (this.minRefreshStatusShowTimeFlag) {
        clearTimeout(this.minRefreshStatusShowTimeFlag)
        this.minRefreshStatusShowTimeFlag = 0
      }
      this.setData({
        refreshStatus: -1,
        upRefreshStatus: 0
      })
      this.isPulling = false // 退出下拉状态
    }, animationDuration)
  }

  mousedown = () => {}

  public render(): JSX.Element {
    const {
      loadingTexts = ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'],
      children,
      canPullUpSwitch,
      upLoadingTexts = [
        '上拉至下一个分类',
        '释放至下一个分类',
        '正在刷新',
        '刷新完成'
      ],
      id,
      renderItem,
      emptyRender,
      noMoreRender,
      contentClasses = []
    } = this.props
    const {
      barHeight,
      classPrefix,
      computedLoadingBarHeight,
      refreshStatus,
      loadingStatus,
      pullDownRefreshing,
      isEmpty,
      upRefreshStatus,
      topNum,
      totalData,
      showLoadingMore,
      baseRefresh,
      scrollerViewHeight
    } = this.state

    return (
      <View className={`${classPrefix} ${prefix}-class`} id={id}>
        <View
          className={`${classPrefix}-view`}
          style={{
            transform: `translate3d(0, ${barHeight}px,0)`
          }}
        >
          <View
            className={`${classPrefix}__tips`}
            style={`height: ${computedLoadingBarHeight}px;, top: -${computedLoadingBarHeight}px;`}
          >
            <View className={`${classPrefix}-loading`}>
              {refreshStatus === 2 && <ScLoading></ScLoading>}
              <Text className={`${classPrefix}-loading__text`}>
                {loadingTexts[refreshStatus]}
              </Text>
            </View>
          </View>

          <ScrollView
            className='sc-scroll-view'
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            // @ts-ignore
            // onMouseDown={this.onTouchStart}
            // onMouseMove={this.onTouchMove}
            // onMouseUp={this.onTouchEnd}
            // mouseleave={this.onTouchEnd}
            onScroll={this.onScroll}
            onScrollToUpper={this.onScrollToTop}
            onScrollToLower={this.onScrollToLower}
            lowerThreshold={100}
            scrollY
            enableBackToTop
            enhanced
            scrollTop={topNum}
            bounces={false}
            enableFlex
            scrollAnchoring
            scrollWithAnimation
            // style={{ height: `${scrollerViewHeight}px` }}
          >
            {/* <!--防止scroll-View内部的第一个盒子添加margin-top属性，出现滚动条--> */}

            <View
              className={classnames(
                {
                  'sc-scroll-view-content': true
                },
                [...(contentClasses || [])]
              )}
            >
              <View style='height: 1px; position: relative; width: 100%;' />
              {/* <!-- 正文内容 --> */}
              {children
                ? children
                : totalData.map((item: any, index: number) => {
                    return (
                      <View key={index}>
                        {renderItem?.(item, index) || null}
                      </View>
                    )
                  })}
              {/* <!-- 列表加载中/已全部加载 --> */}
              {(!baseRefresh && pullDownRefreshing) ||
              (!canPullUpSwitch && loadingStatus === 2) ||
              loadingStatus === 3 ? (
                <LoadMore
                  status={loadingStatus}
                  retry={this.refresh}
                  listIsEmpty={isEmpty}
                  noMoreRender={noMoreRender}
                >
                  {emptyRender ? (
                    emptyRender()
                  ) : (
                    <View className='empty-wrapper'>
                      <ScEmpty
                        className='empty-wrapper'
                        desc='暂无数据'
                      ></ScEmpty>
                    </View>
                  )}
                </LoadMore>
              ) : null}
              {/* <!-- 点击加载更多 --> */}
              {!showLoadingMore && loadingStatus === 0 && !isEmpty ? (
                <View
                  onClick={this._doLoadingMore}
                  className='sc-toload-more-view'
                >
                  <Text className='sc-text-black'>点击加载更多</Text>
                </View>
              ) : null}

              {canPullUpSwitch && upRefreshStatus >= 0 ? (
                <View className='sc-pullup-status-text'>
                  {upLoadingTexts[upRefreshStatus]}
                </View>
              ) : null}
            </View>
          </ScrollView>

          {/* //   <!--上拉处理--> */}
          {canPullUpSwitch ? (
            <View
              className={`${classPrefix}__uptips`}
              style={{ height: computedLoadingBarHeight }}
            >
              {upRefreshStatus > 0 ? (
                <View className='uptips_content'>
                  <View className={`${classPrefix}-loading`}>
                    <ScLoading></ScLoading>
                  </View>
                </View>
              ) : null}
            </View>
          ) : null}

          {/* 
  <View wx-if="showBackToTopClass" className="{ backToTopClass } backToTopStyle" style="bottom: {backToTopBottom}px;" bind:tap="_backToTopClick">
    <slot wx-if="useCustomBackToTop" name="backToTop" />
    <Image wx-else className="sc-back-to-top-img" src={ backToTopImg ? backToTopImg :base64BackToTop } />
  </View> */}
        </View>
      </View>
    )
  }
}

ScPullDownRefresh.defaultProps = {
  /** 加载中下拉高度 */
  loadingBarHeight: 100,
  /** 提示语，组件内部默认值为 ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'] */
  loadingTexts: ['下拉刷新', '松手刷新', '正在刷新', '刷新完成'],
  upLoadingTexts: [
    '上拉至下一个分类',
    '释放至下一个分类',
    '正在刷新',
    '刷新完成'
  ],
  /** 最大下拉高度 */
  maxBarHeight: 250,
  /** 刷新超时时间 */
  refreshTimeout: 3000,
  // 是否可以上拉切换
  canPullUpSwitch: false,
  //当分页未满一屏时，是否自动加载更多，默认为否(nvue无效)
  insideMore: false,
  lowerDistance: 100,
  auto: true,
  defaultPageNo: 1,
  defaultPageSize: 10,
  autoScrollToTopWhenReload: true,
  autoCleanListWhenReload: true,
  localPagingLoadingTime: 200,
  //自动显示点击返回顶部按钮，默认为否
  autoShowBackToTop: true,
  //点击返回顶部按钮显示/隐藏的阈值(滚动距离)，单位为px
  backToTopThreshold: 150,
  //点击返回顶部按钮返回到顶部时是否展示过渡动画，默认为是
  backToTopWithAnimate: true,
  //点击返回顶部按钮与底部的距离，注意添加单位px
  backToTopBottom: 80,
  // 是否使用自定义返回头部
  useCustomBackToTop: false,
  // 是否允许下拉刷新
  refresherEnabled: true
}

export default ScPullDownRefresh
