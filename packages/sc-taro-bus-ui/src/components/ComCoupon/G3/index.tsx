import { View } from '@tarojs/components'
import React, { useMemo } from 'react'
import ComCouponItem from '@/components/ComCouponItem'
import { ComCouponGroupProps } from '../type'
import './index.scss'

/*优惠券-一行3列排序*/
const CouponGroupG3: React.FC<ComCouponGroupProps> = props => {
  const { list = [], margin = 0, ...resp } = props
  const classPrefix = 'com'

  const marginNum = useMemo(() => {
    return Math.ceil(margin / 2)
  }, [margin])

  return (
    <View className={`${classPrefix}-coupon-group-g3`}>
      {list.map((item, index) => {
        return (
          <View
            className={`${classPrefix}-coupon-group-g3-item`}
            key={`coupon-group-g5-${index}-${item.couponId}`}
          >
            <View
              className={`${classPrefix}-coupon-group-g3-item-content`}
              style={{ margin: marginNum }}
            >
              <ComCouponItem item={item} {...resp}></ComCouponItem>
            </View>
          </View>
        )
      })}
    </View>
  )
}

export default React.memo(CouponGroupG3)
