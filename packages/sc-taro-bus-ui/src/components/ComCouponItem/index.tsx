import classnames from 'classnames'
import { ITouchEvent, RichText, Text, View } from '@tarojs/components'
import { Color } from '@/constants/Enum'
import { getRect, pxTransform } from '@/utils/common'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ScIcon from '../ScIcon'
import ScCheckbox from '../ScCheckbox'
import type { ComCouponItemProps } from './type'
import './index.scss'

export const prefixCls = 'com-coupons-item'

let timer: any = null

/** 优惠券卡片 */
const ComCouponItem: React.FC<ComCouponItemProps> = props => {
  const {
    item,
    onClick,
    onUseClick,
    onGiftClick,
    actived = true,
    showTimeOutLess = true,
    showCheck = false,
    showStatus = true,
    size = 'large',
    disabled = false,
    showDirection = true,
    showReason = true,
    showGiftBtn = true,
    statusNameText
  } = props

  const [show, setShow] = useState<boolean>(false)

  const ref = useRef<any>()
  const extraHeight = useRef<number>(0)

  const handleClick = () => {
    if (item && item.disabled !== true) {
      onClick?.({
        checked: item.checked,
        userCouponId: item.userCouponId
      })
    }
  }
  const openClick = () => {
    setShow(!show)
  }
  /** 去使用按钮点击 */
  const toUse = (e: ITouchEvent) => {
    e.stopPropagation()
    onUseClick?.()
  }

  /** 赠送按钮点击 */
  const toGift = (e: ITouchEvent) => {
    e.stopPropagation()
    onGiftClick?.(item)
  }

  const statusName = useMemo(() => {
    const map: Record<string, string> = {
      USED: '已使用',
      UNUSE: '立即使用',
      EXPIRED: '已过期'
    }
    return map[item.couponStatus || ''] || '立即使用'
  }, [item.couponStatus])

  useEffect(() => {
    if (ref.current) {
      getRect(`#extra-${item.userCouponId}`).then(res => {
        if (res) {
          extraHeight.current = Number(res.height || 0) + 2
        }
      })
    }
    return () => {
      if (timer != null) {
        clearTimeout(timer)
        timer = null
      }
    }
  }, [ref.current])

  return (
    <View
      className={classnames({
        [`${prefixCls}`]: true,
        [`${prefixCls}-middle`]: size === 'normal',
        [`${prefixCls}-small`]: size === 'small',
        [`${prefixCls}-noactived`]: !actived && !disabled,
        [`${prefixCls}-disabled`]: disabled
      })}
    >
      {/* 上半圆 */}
      <View className={`${prefixCls}-top-semicircle`}></View>
      {/* 下半圆 */}
      <View className={`${prefixCls}-bottom-semicircle`}></View>
      <View className='coupons-item-bg'>
        {/* <ScImage scr={} isStaticImage></ScImage> */}
      </View>
      {/* 内容 */}
      <View className={`${prefixCls}-content`} onClick={handleClick}>
        {(item.couponType === 'PERCENT' || item.couponType === 'REDUCE') && (
          <View className={`${prefixCls}-content-left`}>
            <View className='price'>
              {item.couponType === 'REDUCE' && (
                <Text className='price-num-code'>￥</Text>
              )}
              <Text className='price-num'>{item.couponValue || '0'}</Text>
              {item.couponType === 'PERCENT' && (
                <Text className='price-num-code'>折</Text>
              )}
            </View>
            {!item.minOrderAmount || item.minOrderAmount === 0 ? (
              <View className='price-message'>
                <Text className='price-message__text'>无门槛</Text>
              </View>
            ) : (
              <View className='price-message'>
                <Text className='price-message__text'>
                  满{item.minOrderAmount || '0'}元可用
                </Text>
              </View>
            )}
            {item.timeOutLess && showTimeOutLess && (
              <View className={`${prefixCls}-outime`}>
                <Text className={`${prefixCls}-outime__text`}>将过期</Text>
              </View>
            )}
          </View>
        )}
        {item.couponType === 'GOODS' && (
          <View className={`${prefixCls}-content-left`}>
            <ScIcon
              value='gift-outlined'
              size={pxTransform(46)}
              color={Color.dominant}
            ></ScIcon>
          </View>
        )}

        <View className={`${prefixCls}-content-right`}>
          <View className='item-title'>
            <Text className='item-title__text'>{item.couponTitle}</Text>
          </View>
          {item.validBeginTime && item.validEndTime && (
            <View className='item-time'>
              <Text className='item-time__text'>
                {item.validBeginTime}-{item.validEndTime}
              </Text>
            </View>
          )}

          {showReason && item.reason != null && (
            <View className='item-reason'>
              <ScIcon
                value='info-circle-outlined'
                className='icon'
                size={pxTransform(10)}
                color={Color.red}
              ></ScIcon>
              <Text className='item-reason__text'>{item.reason}</Text>
            </View>
          )}
          <View className='item-btns'>
            {showDirection && (
              <View onClick={openClick} className='item-direction'>
                <Text className='item-direction__text'>使用说明</Text>
                <ScIcon
                  value={show ? 'up-outlined' : 'down-outlined'}
                  size={pxTransform(10)}
                  color={Color.gray}
                />
              </View>
            )}
            {showGiftBtn && item.giveFlag && (
              <View className={`${prefixCls}-share`} onClick={toGift}>
                <ScIcon
                  value='share'
                  color={Color.dominant}
                  size={pxTransform(24)}
                ></ScIcon>
                <Text className={`${prefixCls}-share__text`}>赠送</Text>
              </View>
            )}
          </View>
        </View>
        {showCheck && (
          <View className={`${prefixCls}-content-checked`}>
            <ScCheckbox
              checked={item.checked}
              disabled={item.disabled}
            ></ScCheckbox>
          </View>
        )}

        {actived && showStatus && (
          <View className={`${prefixCls}-content-usedbtn`} onClick={toUse}>
            <Text className={`${prefixCls}-content-usedbtn__text`}>
              {statusNameText || statusName}
            </Text>
          </View>
        )}
      </View>

      <View
        className={`${prefixCls}-extra`}
        style={{
          height: show ? extraHeight.current : 0
        }}
      >
        <View
          className={`${prefixCls}-extra-content`}
          ref={ref}
          id={`extra-${item.userCouponId}`}
        >
          <RichText
            className={`${prefixCls}-extra-content__text`}
            nodes={
              typeof item.useReference === 'string'
                ? item.useReference.replace(/\n|\r/g, '<br/>')
                : '无使用说明'
            }
          />
        </View>
      </View>
    </View>
  )
}

export default ComCouponItem
