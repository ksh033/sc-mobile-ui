import { useSetState, useUpdateEffect } from '@/hooks'
import { imageUrl } from '@/utils/busUtils'
import compute from '@/utils/compute'
import {
  BaseEventOrig,
  Progress,
  Swiper,
  SwiperItem,
  SwiperProps,
  Video,
  VideoProps,
  View,
  Text
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { CSSProperties, Fragment, useLayoutEffect } from 'react'
import classnames from 'classnames'
import ScIcon from '../ScIcon'
import ScImage, { ImageFit } from '../ScImage'
import './index.scss'
import { mergeStyle } from '../utils/styles'
import { Color } from '@/constants/Enum'

export type ScSwiperItem = {
  /** 资源格式：IAMGE-图片，VIDEO-视频 */
  resourceFormat?: 'IMAGE' | 'VIDEO'
  /** 商品资源地址 */
  resourceUrl?: string
  /** 播放暂停 */
  stoped?: boolean
  /** 是否静音 */
  muted?: boolean
}

type ScSwiperProps = {
  /** 当前所在滑块的 index */
  current?: number
  /** 滑块list */
  swiperList?: ScSwiperItem[]
  /** 滑块切换 */
  onSwiperChange?: (current: number) => void
  /** 是否暂停 */
  initstop?: boolean
  /** 图片显示类型 */
  fit?: ImageFit
  /** 是否显示面板指示点 */
  indicatorDots?: boolean
  /** 是否显示步进 */
  showSteps?: boolean

  className?: string
  style?: CSSProperties
}

type ScSwiperState = {
  /** 当前所在滑块的 index */
  innerCurrent: number
  /** 滑块list */
  list: ScSwiperItem[]
  /** 进度条 */
  progress?: number
  /** 当前进度 */
  currenttime: string
  /** 视频总时长 */
  duration: string
}

const ScSwiper: React.FC<ScSwiperProps> = props => {
  const {
    swiperList = [],
    current = 0,
    onSwiperChange,
    initstop = false,
    fit = 'cover',
    indicatorDots = false,
    showSteps = false,
    style = {},
    className
  } = props
  const classPrefix = 'sc-swiper'

  const [state, setState] = useSetState<ScSwiperState>({
    innerCurrent: 0,
    list: [],
    progress: 0,
    currenttime: '00:00',
    duration: '00:00'
  })
  /** 播放暂停 */
  const playPause = (curt: number, stoped: boolean | undefined, seek: null) => {
    const media = state.list[curt]
    //滑动swiper，视频停止播放
    if (media && media.resourceFormat === 'VIDEO') {
      const videoContext = Taro.createVideoContext(`video${media.resourceUrl}`)
      if (videoContext) {
        if (seek !== null) {
          videoContext.seek(0)
        }
        if (stoped) {
          videoContext.pause()
        } else {
          videoContext.play()
        }
      }
    }
    if (Array.isArray(state.list)) {
      const newInfo = state.list.map((item, it) => {
        if (it === curt) {
          item.stoped = stoped
        }
        return item
      })
      setState({
        list: newInfo
      })
    }
  }
  /** current 改变时会触发 change 事件 */
  const onChangeCurrent = (
    event: BaseEventOrig<SwiperProps.onChangeEventDetail>
  ) => {
    const changeCurrent = event.detail.current
    playPause(state.innerCurrent, true, null)
    setState({
      innerCurrent: changeCurrent
    })
    onSwiperChange?.(changeCurrent)
  }

  const fomatTime = (str: string) => {
    let pad = '00'
    return pad.substring(0, pad.length - str.length) + str
  }
  /** 播放进度变化时触发, 触发频率 250ms 一次 */
  const onTimeUpdate = (
    event: BaseEventOrig<VideoProps.onTimeUpdateEventDetail>
  ) => {
    const { currentTime, duration } = event.detail

    let durationmin = fomatTime(Math.floor(duration / 60).toString())
    let durationsec = fomatTime(Math.floor((duration % 60) / 1).toString())
    let newduration = durationmin + ':' + durationsec
    let currentTimemin = fomatTime(Math.floor(currentTime / 60).toString())
    let currentTimesec = fomatTime(
      Math.floor((currentTime % 60) / 1).toString()
    )
    let newcurrentTime = currentTimemin + ':' + currentTimesec

    const buffered = Math.floor(compute.divide(currentTime, duration) * 100)
    setState({
      progress: buffered,
      currenttime: newcurrentTime,
      duration: newduration
    })
  }
  /** 当播放到末尾时触发 ended 事件 */
  const onEnded = () => {
    const innerCurrent = state.innerCurrent
    if (Array.isArray(state.list)) {
      const newInfo = state.list.map((item, it) => {
        if (it === innerCurrent) {
          item.stoped = true
        }
        return item
      })
      setState({
        list: newInfo
      })
    }
  }

  /** 点击视频处理  */
  const amplification = (item: ScSwiperItem) => {
    if (item) {
      playPause(state.innerCurrent, !item.stoped, null)
    }
  }
  /** 播放视频 */
  const play = (item: ScSwiperItem) => {
    playPause(state.innerCurrent, !item.stoped, null)
  }
  /** 静音状态改变 */
  const changeMuted = (index: number) => {
    const newInfo = state.list.map((item, it) => {
      if (it === index) {
        item.muted = !item.muted
      }
      return item
    })
    setState({
      list: newInfo
    })
  }

  useUpdateEffect(() => {
    playPause(state.innerCurrent, false, null)
  }, [state.innerCurrent])

  useLayoutEffect(() => {
    setState({
      innerCurrent: current
    })
  }, [current])

  /** 监听是否暂停 */
  useUpdateEffect(() => {
    if (initstop === true) {
      playPause(state.innerCurrent, true, null)
    }
  }, [initstop])

  return (
    <View
      className={classnames(classPrefix, className)}
      style={mergeStyle({}, style as object)}
    >
      <Swiper
        current={state.innerCurrent}
        className={`${classPrefix}-view`}
        circular
        indicatorDots={indicatorDots}
        onChange={onChangeCurrent}
      >
        {swiperList.map((item, index) => {
          return (
            <Fragment key={index}>
              <SwiperItem className={`${classPrefix}-item`}>
                {item.resourceFormat === 'VIDEO' && (
                  <View className={`${classPrefix}-item-banner`}>
                    <Video
                      enableProgressGesture={false}
                      muted={item.muted}
                      className={`${classPrefix}-item-video`}
                      autoplay={index === state.innerCurrent}
                      src={imageUrl(item.resourceUrl || '')}
                      controls={false}
                      onTimeUpdate={onTimeUpdate}
                      onEnded={onEnded}
                      onClick={() => {
                        amplification(item)
                      }}
                      id={`video${item.resourceUrl}`}
                    ></Video>
                    {/** 播放按钮 */}
                    {item.stoped && (
                      <View
                        className={`${classPrefix}-item-video-curtain`}
                        onClick={() => {
                          amplification(item)
                        }}
                      >
                        <View className={`${classPrefix}-item-video-playbtn`}>
                          <ScIcon
                            value='play-outlined'
                            color={Color.baseInverse}
                            size={48}
                          ></ScIcon>
                        </View>
                      </View>
                    )}
                    {/** 进度条 */}
                    <View className={`${classPrefix}-item-progress`}>
                      <View
                        className={`${classPrefix}-item-progress-play`}
                        onClick={() => {
                          play(item)
                        }}
                      >
                        <ScIcon
                          value={
                            item.stoped ? 'play-outlined' : 'pause-outlined'
                          }
                          color={Color.baseInverse}
                          size={20}
                        ></ScIcon>
                      </View>
                      <Text className={`${classPrefix}-item-progress-time`}>
                        {state.duration}
                      </Text>
                      <Progress
                        percent={state.progress}
                        strokeWidth={2}
                        showInfo
                        color={Color.baseInverse}
                        borderRadius={1}
                        className={`${classPrefix}-item-progress-line`}
                      />
                      <Text className={`${classPrefix}-item-progress-time`}>
                        {state.currenttime}
                      </Text>
                      <View
                        className={`${classPrefix}-item-progress-muted`}
                        onClick={() => {
                          changeMuted(index)
                        }}
                      >
                        <ScIcon
                          value={
                            item.muted ? 'sounds-outlined' : 'mute-outlined'
                          }
                          color={Color.baseInverse}
                          size={24}
                        ></ScIcon>
                      </View>
                    </View>
                  </View>
                )}

                {item.resourceFormat === 'IMAGE' && (
                  <View className={`${classPrefix}-item-banner`}>
                    <ScImage
                      src={item.resourceUrl || ''}
                      fit={fit || 'cover'}
                    />
                  </View>
                )}
              </SwiperItem>
            </Fragment>
          )
        })}
      </Swiper>
      {showSteps && (
        <View className={`${classPrefix}-steps`}>
          <Text className={`${classPrefix}-steps__text`}>
            {current + 1}/{swiperList.length}
          </Text>
        </View>
      )}
    </View>
  )
}
export default ScSwiper
