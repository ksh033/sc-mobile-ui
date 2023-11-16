import { useEffect, useMemo, useRef, useState } from 'react'
import { RegAppUIComponent, type AppUIComponents } from '@sceditor/core'
import { View } from '@tarojs/components'
import { ComCouponProps } from './type'
import { ComCouponItemValue } from '../ComCouponItem/type'
import G1 from './G1'
import G2 from './G2'
import G3 from './G3'
import G5 from './G5'
import './index.scss'
import { ComWaterfallRef } from '../ComWaterfall'
import React from 'react'

const defaultItemData: ComCouponItemValue = {
  couponId: '1',
  couponTitle: '[全国电商券]支付有礼赠送6折扣券',
  couponType: 'PERCENT',
  useReference: '[全国电商券]支付有礼赠送6折扣券'
}

const getDefaultList = (num: number) => {
  const list: ComCouponItemValue[] = []
  for (let i = 0; i < num; i++) {
    list.push({
      ...defaultItemData,
      couponId: i + ''
    })
  }
  return list
}

/** 优惠券 */
const ComCoupon: AppUIComponents<ComCouponProps> = props => {
  const {
    layout = 'G1',
    margin = 24,
    preview = false,
    pageMargin = 16,
    list = [],
    ...restProps
  } = props

  console.log('ComCoupon props', props)

  const map: any = {
    G1: G1,
    G2: G2,
    G3: G3,
    G5: G5
  }
  const WarpCommponent = map[layout]

  /** 瀑布流ref */
  const waterfallRef = useRef<ComWaterfallRef>(null)
  /** 判断是否使用list 数据为了清空瀑布流不刷新问题 */
  const resetRef = useRef<boolean>(false)

  const marginStyles: React.CSSProperties = useMemo(() => {
    const innerMargin = Math.ceil(Number(margin || 0) / 2)
    if (layout === 'G3' || layout === 'G5') {
      return {
        marginLeft: -innerMargin,
        marginRight: -innerMargin
      }
    }
    return {}
  }, [margin, layout])

  const [innerList, setInnerList] = useState<ComCouponItemValue[]>([])

  useEffect(() => {
    if (Array.isArray(list) && list.length > 0) {
      if (resetRef.current) {
        resetRef.current = false
        waterfallReset()
      }
      setTimeout(() => {
        console.log('list', list)
        setInnerList(list)
      }, 200)
      return
    }
    if (preview) {
      resetRef.current = true
      setInnerList(getDefaultList(4))
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
        className='com-coupon-layout'
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
          margin={margin}
        ></WarpCommponent>
      </View>
    )
  }

  return <View></View>
}
ComCoupon.cmpType = 'Coupon'
export default RegAppUIComponent(ComCoupon)
