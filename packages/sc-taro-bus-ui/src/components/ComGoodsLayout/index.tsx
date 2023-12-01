import { useEffect, useMemo, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import { ComGoodsLayoutProps } from './type'
import { ComGoodsItemDataProps } from '../ComBaseGoods/type'
import G1 from './G1'
import G2 from './G2'
import G3 from './G3'
import G5 from './G5'
import G4 from './G4'
import G7 from './G7'
import './index.scss'
import { ComWaterfallRef } from '../ComWaterfall'
import React from 'react'
import { RegAppUIComponent, type AppUIComponents } from '@sceditor/core'

const defaultItemData: ComGoodsItemDataProps = {
  goodsId: '1',
  bizScene: 'SHOP_CONSUME',
  goodsType: 'NORMAL',
  selectSpecFlag: false,
  goodsName: '这里显示商品名称，最多显示1行',
  goodsDesc: '这里显示商品描述，最多显示1行',
  goodsThumb: '12',
  markPrice: 0,
  goodsPrice: 99,
  goodsPromotion: {
    displayName: '限时折扣',
    limitQuantity: 1,
    discountPrice: 1.56,
    dataId: '1531169564847493120'
  }
}

const defaultMapNum: any = {
  G1: 3,
  G2: 4,
  G3: 6,
  G4: 3,
  G5: 4,
  G7: 3
}

const getDefaultList = (num: number) => {
  const list: ComGoodsItemDataProps[] = []
  for (let i = 0; i < num; i++) {
    list.push({
      ...defaultItemData,
      goodsId: i + ''
    })
  }
  return list
}

/** 商品 */
const ComGoodsLayout: AppUIComponents<ComGoodsLayoutProps> = props => {
  const {
    goodsType = 'G1',
    pageMargin = 0,
    preview = false,
    list = [],
    ...restProps
  } = props

  const map: any = {
    G1: G1,
    G2: G2,
    G3: G3,
    G4: G4,
    G5: G5,
    G7: G7
  }
  const WarpCommponent = map[goodsType]

  /** 瀑布流ref */
  const waterfallRef = useRef<ComWaterfallRef>(null)

  const marginStyles: React.CSSProperties = useMemo(() => {
    const innerMargin = Math.ceil(Number(restProps.goodsMargin || 0) / 2)
    if (goodsType === 'G3' || goodsType === 'G5' || goodsType === 'G7') {
      return {
        marginLeft: -innerMargin,
        marginRight: -innerMargin
      }
    }
    return {}
  }, [restProps.goodsMargin, goodsType])

  const [innerList, setInnerList] = useState<ComGoodsItemDataProps[]>([])

  // 预览模式
  useEffect(() => {
    if (preview) {
      waterfallReset()
      const num = defaultMapNum[goodsType]
      let newList = getDefaultList(num)
      if (Array.isArray(list) && list.length > 0) {
        newList = list
      }
      setTimeout(() => {
        setInnerList(newList)
      }, 200)
    }
  }, [goodsType, JSON.stringify(list), preview])

  // 非预览模式
  useEffect(() => {
    if (!preview && Array.isArray(list) && list.length > 0) {
      waterfallReset()
      setTimeout(() => {
        setInnerList(list)
      }, 200)
    }
  }, [JSON.stringify(list), preview])

  /** 瀑布流刷新 */
  const waterfallReset = () => {
    if (waterfallRef.current) {
      waterfallRef.current?.reset()
    }
  }
  if (WarpCommponent) {
    return (
      <View
        className='com-goods-layout'
        style={{
          paddingLeft: pageMargin,
          paddingRight: pageMargin,
          ...marginStyles
        }}
      >
        <WarpCommponent
          {...restProps}
          list={innerList}
          ref={waterfallRef}
        ></WarpCommponent>
      </View>
    )
  }

  return <View></View>
}
ComGoodsLayout.cmpType = 'GoodsLayout'
export default RegAppUIComponent(ComGoodsLayout)
