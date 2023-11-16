import { View } from '@tarojs/components'
import React, { forwardRef, useMemo } from 'react'
import ComCouponItem from '@/components/ComCouponItem'
import ComWaterfall, { ComWaterfallRef } from '@/components/ComWaterfall'
import { ComCouponGroupProps } from '../type'
import './index.scss'

/*优惠券纵向 一行2个 */
const CouponGroupG2 = forwardRef<ComWaterfallRef, ComCouponGroupProps>(
  (props, ref) => {
    const { list = [], margin = 0, ...resp } = props
    const classPrefix = 'com'
    const marginNum = useMemo(() => {
      return Math.ceil(margin / 2)
    }, [margin])

    return (
      <View className={`${classPrefix}-coupon-group-g2`}>
        <ComWaterfall
          className={`${classPrefix}-coupon-group-g2-content`}
          list={list}
          idKey='couponId'
          colNum={2}
          gutter={marginNum}
          ref={ref}
          renderItem={item => {
            return (
              <View
                className={`${classPrefix}-coupon-group-g2-item`}
                style={{ marginTop: marginNum, marginBottom: marginNum }}
              >
                <ComCouponItem
                  item={item}
                  {...resp}
                  size='small'
                  showDirection={false}
                  showStatus={false}
                ></ComCouponItem>
              </View>
            )
          }}
        ></ComWaterfall>
      </View>
    )
  }
)

export default React.memo(CouponGroupG2)
