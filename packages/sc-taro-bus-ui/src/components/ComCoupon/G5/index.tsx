import React, { useMemo } from 'react'
import { ScrollView, View } from '@tarojs/components'
import classames from 'classnames'
import ComCouponItem from '@/components/ComCouponItem'
import { ComCouponGroupProps } from '../type'
import './index.scss'

/*优惠券-横向滚动*/
const GouponGroupG5: React.FC<ComCouponGroupProps> = props => {
  const { list = [], margin = 0, ...resp } = props

  const classPrefix = 'com'

  const marginNum = useMemo(() => {
    return Math.ceil(margin / 2)
  }, [margin])
  return (
    <View className={`${classPrefix}-coupon-group-g5`}>
      <ScrollView className={`${classPrefix}-coupon-group-g5-scroll`} scrollX>
        {list.map((item, index) => {
          return (
            <View
              className={classames({
                [`${classPrefix}-coupon-group-g5-item`]: true
              })}
              key={`coupon-group-g5-${index}-${item.couponId}`}
            >
              <View
                className={`${classPrefix}-coupon-group-g5-item-content`}
                style={{ margin: marginNum }}
              >
                <ComCouponItem
                  item={item}
                  {...resp}
                  // layout='vertical'
                  size='small'
                  showDirection={false}
                  showStatus={false}
                ></ComCouponItem>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default React.memo(GouponGroupG5)
