import React, { forwardRef, useMemo } from 'react'
import { View } from '@tarojs/components'
import ComWaterfall, { ComWaterfallRef } from '@/components/ComWaterfall'
import ComCouponItem from '../../ComCouponItem'
import { ComCouponGroupProps } from '../type'
import './index.scss'

/*优惠券-一行一个 */
const CouponGroupG1 = forwardRef<ComWaterfallRef, ComCouponGroupProps>(
  (props, ref) => {
    const { list = [], margin = 0, ...resp } = props

    const classPrefix = 'com'

    const marginNum = useMemo(() => {
      return Math.ceil(margin / 2)
    }, [margin])

    return (
      <View className={`${classPrefix}-coupon-group-g1`}>
        <ComWaterfall
          className={`${classPrefix}-coupon-group-g1-content`}
          list={list}
          idKey='couponId'
          colNum={1}
          gutter={15}
          ref={ref}
          renderItem={item => {
            return (
              <View
                className={`${classPrefix}-coupon-group-g1-item`}
                style={{ marginTop: marginNum, marginBottom: marginNum }}
              >
                <ComCouponItem item={item} {...resp}></ComCouponItem>
              </View>
            )
          }}
        ></ComWaterfall>
      </View>
    )
  }
)

export default React.memo(CouponGroupG1)
