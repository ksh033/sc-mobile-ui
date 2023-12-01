import ScTabs from '@/components/ScTabs/index'
import { View } from '@tarojs/components'
import { ComGoodsGroupProps, ComGoodsGroupState } from '../type'
import { useMemo } from 'react'
import { ScTabItem } from '@/components/ScTabs/type'
import ComGoodsLayout from '@/components/ComGoodsLayout'
import { useTouch } from '@/hooks'

const classPrefix = 'com-goods-group-topnav'

type TopNavProps = ComGoodsGroupState &
  Omit<ComGoodsGroupProps, 'list' | 'showMethod' | 'subEntry'> & {
    onClassifyChange: (classifyId: string, index: number) => void
    onListChange: (data: any) => void
  }

const ComGoodsGroupTopNav: React.FC<TopNavProps> = props => {
  const {
    list,
    catalogList,
    currentIndex,
    onClassifyChange,
    sticky = false,
    showAllTag = false,
    ...resProps
  } = props

  const touch = useTouch()

  /** 分类数据 */
  const tablist: ScTabItem[] = useMemo(() => {
    const rlist = Array.isArray(catalogList)
      ? catalogList.map(it => {
          return {
            title: it.classifyName || '',
            id: it.classifyId
          }
        })
      : []
    if (showAllTag) {
      rlist.unshift({
        title: '全部',
        id: 'all'
      })
    }
    return rlist
  }, [JSON.stringify(catalogList), showAllTag])

  /** 切换 */
  const onTabChange = (index: number) => {
    const item = tablist[index]
    if (item && item.id) {
      onClassifyChange?.(item.id, index)
    }
  }

  const onTouchEnd = () => {
    const { direction, deltaX } = touch
    const minSwipeDistance = 80
    if (direction === 'horizontal' && Math.abs(deltaX) >= minSwipeDistance) {
      let current = Number(currentIndex)
      if (deltaX > 0) {
        current = current - 1
      } else {
        current = current + 1
      }
      if (Array.isArray(catalogList) && catalogList[current]) {
        onClassifyChange(catalogList[current].classifyId || '', current)
      }
    }
  }

  return (
    <View className={`${classPrefix}`}>
      <View className={`${classPrefix}-tab`}>
        <ScTabs
          current={currentIndex}
          animated
          swipeable
          showUnderline
          tabList={tablist}
          onClick={onTabChange}
        ></ScTabs>
      </View>
      <View
        className={`${classPrefix}-colum`}
        // @ts-ignore
        onTouchStart={touch.start}
        // @ts-ignore
        onTouchMove={touch.move}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <ComGoodsLayout list={list} {...resProps}></ComGoodsLayout>
      </View>
    </View>
  )
}

export default ComGoodsGroupTopNav
