import Taro from '@tarojs/taro'
import { useMemo } from 'react'
import { View, Text } from '@tarojs/components'
import { ConfigProvider, Tabs } from '@sc-mobile/sc-taro-ui'
import { RegAppUIComponent, type AppUIComponents } from '@sceditor/core'
import { useSetState } from '@/hooks'
import { getAllRect, getWindowWidth } from '@/utils/common'
import classnames from 'classnames'
import ScImage from '../ScImage'
import {
  ComElevatorNavProps,
  ComElevatorNavState,
  NavigationType,
  ShowMethod,
  SubEntryItem
} from './type'
import './index.scss'
import React from 'react'

/** 电梯导航参数 */
const ComElevatorNav: AppUIComponents<ComElevatorNavProps> = props => {
  const {
    subEntry = [],
    showMethod = 'text',
    fontActiveColor = '#000000',
    fontDefaultColor = '#969799',
    borderColor = '#EE0A24',
    backgroundColor = 'ffffff',
    navigationType = 'underline',
    count = 5
  } = props

  const prefixCls = 'com-elevator-nav'
  const sys = Taro.getSystemInfoSync()
  const isIos = sys.model.search('iPhone') != -1
  //const { isIos } = useGlobal();
  const [state, setState] = useSetState<ComElevatorNavState>({
    current: 0
  })

  const handleClick = (id: string, idx: number) => {
    setState({
      current: idx
    })
    // 页面滚动至当前分类
    pageScrollToIntoView(id)
    // 导航滚动至视线内
    // navigateScrollIntoView(moduleId);
  }

  /**页面宽度 */
  const width = useMemo(() => {
    const windowWidth = getWindowWidth()

    return ((windowWidth - 16) / count).toFixed(1)
  }, [count])

  /** 页面滚动到视野moduleId 模块id */
  const pageScrollToIntoView = (moduleId: string) => {
    getAllRect(`#drop-box >>> ${prefixCls}`).then(res => {
      if (Array.isArray(res)) {
        const currentIndex = res.findIndex(it => it.id === moduleId)
        const offsetTop = res.slice(0, currentIndex).reduce((prev, curr) => {
          return prev + curr.height
        }, 0)
        Taro.pageScrollTo({
          duration: isIos ? 300 : 0,
          scrollTop: offsetTop - 50 + 15, //-导航高度+边距
          success: () => {
            //手动滚动控制
            // this.interSection();
          }
        })
      }
    })
  }

  /** 文字形 text 类型的显示 */
  const textRender = (item: SubEntryItem, index?: number) => {
    const navMap: Record<NavigationType, React.ReactNode> = {
      underline: (
        <View
          className={`nut-tabs__titles-item ${
            state.current === index ? 'nut-tabs__titles-item--active' : ''
          }`}
        >
          <Text className='nut-tabs__titles-item__text'>{item.title}</Text>
          <View className='nut-tabs__titles-item__line' />
        </View>
      ),
      box: (
        <View
          className={`nut-tabs__titles-item ${
            state.current === index ? 'nut-tabs__titles-item--active' : ''
          }`}
        >
          <View
            className={`${prefixCls}_text-box`}
            style={
              state.current === index
                ? {
                    backgroundColor: borderColor,
                    borderRadius: 2,
                    color: '#fff'
                  }
                : {}
            }
          >
            <Text className='nut-tabs__titles-item__text'>{item.title}</Text>
          </View>
        </View>
      ),
      round: (
        <View
          className={`nut-tabs__titles-item ${
            state.current === index ? 'nut-tabs__titles-item--active' : ''
          }`}
        >
          <View
            className={`${prefixCls}_text-box`}
            style={
              state.current === index
                ? {
                    backgroundColor: borderColor,
                    borderRadius: 16,
                    color: '#fff'
                  }
                : {}
            }
          >
            <Text className='nut-tabs__titles-item__text'>{item.title}</Text>
          </View>
        </View>
      ),
      background: (
        <View
          className={`nut-tabs__titles-item ${
            state.current === index ? 'nut-tabs__titles-item--active' : ''
          }`}
          style={
            state.current === index
              ? {
                  color: '#fff'
                }
              : {}
          }
        >
          <View className={`${prefixCls}_text-box`}>
            <Text className='nut-tabs__titles-item__text'>{item.title}</Text>
          </View>
        </View>
      )
    }
    return navMap[navigationType]
  }

  const tagsRender = (type: ShowMethod, it: SubEntryItem, index: number) => {
    const map: Record<
      ShowMethod,
      (item: SubEntryItem, num?: number) => React.ReactNode
    > = {
      text: textRender,
      imageText: (item: SubEntryItem) => {
        return (
          <View
            className={`nut-tabs__titles-item ${
              state.current === index ? 'nut-tabs__titles-item--active' : ''
            }`}
          >
            <View className={`${prefixCls}_text_image__image`}>
              <ScImage src={item.imageUrl || ''} fit='contain'></ScImage>
            </View>
            <Text className='nut-tabs__titles-item__text'>{item.title}</Text>
          </View>
        )
      },
      image: (item: SubEntryItem) => {
        return (
          <View
            className={`nut-tabs__titles-item ${
              state.current === index ? 'nut-tabs__titles-item--active' : ''
            }`}
          >
            <View className={`${prefixCls}_image__image`}>
              <ScImage src={item.imageUrl || ''} fit='contain'></ScImage>
            </View>
          </View>
        )
      }
    }
    const fn = map[type]
    return fn ? fn(it, index) : null
  }
  /** 不同形态的高度 */
  const heightMap: Record<ShowMethod, number> = {
    text: 44,
    imageText: 70,
    image: 64
  }
  console.log('subEntry', subEntry)
  return (
    <View
      className={classnames(prefixCls, {
        [`${prefixCls}_text`]: showMethod === 'text',
        [`${prefixCls}_text_image`]: showMethod === 'imageText',
        [`${prefixCls}_image`]: showMethod === 'image'
      })}
      style={{ backgroundColor: backgroundColor }}
    >
      <ConfigProvider
        style={{ width: '100%' }}
        theme={{
          nutuiTabsHorizontalTitlesHeight: `${heightMap[showMethod]}px`,
          nutuiTabsTitlesItemActiveColor: fontActiveColor,
          nutuiTabsTitlesItemColor: fontDefaultColor,
          nutuiTabsHorizontalTabLineColor: borderColor,
          nutuiTabsTitlesBackgroundColor: backgroundColor
        }}
      >
        <Tabs
          style={{
            height: heightMap[showMethod],
            width: '100%'
          }}
          tabStyle={{ position: 'sticky', top: '0px', zIndex: 11 }}
          value={state.current}
          title={() => {
            return subEntry.map((item, idx) => (
              <View
                onClick={() => {
                  handleClick(item.cmpId || '', idx)
                }}
                className={`${prefixCls}-item`}
                style={
                  showMethod === 'text' &&
                  navigationType === 'background' &&
                  state.current === idx
                    ? {
                        backgroundColor: borderColor,
                        width: width
                      }
                    : { width: width }
                }
                key={`item-${idx}-${item.cmpId || ''}`}
              >
                {tagsRender(showMethod, item, idx)}
              </View>
            ))
          }}
        >
          {subEntry.map((item, idx) => (
            <Tabs.TabPane
              key={`item-${idx}-${item.cmpId || ''}`}
              value={item.cmpId}
            ></Tabs.TabPane>
          ))}
        </Tabs>
      </ConfigProvider>
    </View>
  )
}
ComElevatorNav.cmpType = 'ElevatorNav'
export default RegAppUIComponent(ComElevatorNav)
