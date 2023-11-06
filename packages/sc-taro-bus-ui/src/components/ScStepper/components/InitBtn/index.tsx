import { View, Text, Image, ITouchEvent } from '@tarojs/components'
import React from 'react'
import classnames from 'classnames'
import { pxTransform } from '@/utils/common'
import { Color } from '@/constants/Enum'
import { ScStepperInitBtnProps } from '../../type'
import ScIcon from '../../../ScIcon'
import './index.scss'

export const stepper_initbtn_prefix = 'com-stepper-initbtn'

const InitBtn: React.FC<ScStepperInitBtnProps> = props => {
  const { btnType = 'fill', btnText, initBtnClick, size = 'normal' } = props
  console.log('InitBtn', props)

  const handleClick = (event: ITouchEvent) => {
    event.preventDefault()
    event.stopPropagation()
    initBtnClick?.(event)
  }

  if (btnType === 'cart1') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-cart1`]: true
        })}
        onClick={handleClick}
      >
        <ScIcon value='cart-circle' size={24} color={Color.dominant}></ScIcon>
      </View>
    )
  }

  if (btnType === 'cart2') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-cart2`]: true
        })}
        onClick={handleClick}
      >
        <ScIcon value='cart' size={24} color={Color.dominant}></ScIcon>
      </View>
    )
  }

  if (btnType === 'fill') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-fill`]: true,
          [`${stepper_initbtn_prefix}-fill-samll`]: size === 'small'
        })}
        onClick={handleClick}
      ></View>
    )
  }

  if (btnType === 'hollow') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-hollow`]: true,
          [`${stepper_initbtn_prefix}-hollow-samll`]: size === 'small'
        })}
        onClick={handleClick}
      ></View>
    )
  }

  if (btnType === 'circle-fill') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-circle-fill`]: true
        })}
        onClick={initBtnClick}
      >
        <Text className={`${stepper_initbtn_prefix}-circle-fill__text`}>
          <>{btnText || '立即抢'}</>
        </Text>
      </View>
    )
  }

  if (btnType === 'square-fill') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-square-fill`]: true
        })}
        onClick={initBtnClick}
      >
        <Text className={`${stepper_initbtn_prefix}-square-fill__text`}>
          <>{btnText || '立即抢'}</>
        </Text>
      </View>
    )
  }

  if (btnType === 'circle-hollow') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-circle-hollow`]: true
        })}
        onClick={initBtnClick}
      >
        <Text className={`${stepper_initbtn_prefix}-circle-hollow__text`}>
          <>{btnText || '购买'}</>
        </Text>
      </View>
    )
  }

  if (btnType === 'square-hollow') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-square-hollow`]: true
        })}
        onClick={initBtnClick}
      >
        <Text className={`${stepper_initbtn_prefix}-square-hollow__text`}>
          <>{btnText || '购买'}</>
        </Text>
      </View>
    )
  }

  return null
}

export default InitBtn
