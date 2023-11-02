import { ITouchEvent, View } from '@tarojs/components'
import React, { useMemo } from 'react'
import classnames from 'classnames'
import InitBtn from './components/InitBtn'
import Stepper from './components/Stepper'
import { ScStepperProps } from './type'
import './index.scss'

export const prefixCls = 'com-stepper'

const ScStepper: React.FC<ScStepperProps> = props => {
  const {
    btnType = 'fill',
    btnShape = 'circle',
    value = 0,
    className,
    style = {},
    size = 'normal',
    disabled = false,
    min = 0,
    max = 999999,
    rowKey,
    initBtnClick,
    minusClick,
    plusClick,
    onValueChange,
    hideMinusBtn = false,
    zeroHideMinusBtn = true
  } = props

  const hasInitBtn = useMemo(() => {
    return value === 0 && btnType !== 'none'
  }, [value, btnType])

  const customMinusClick = (event: ITouchEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (value - 1 >= min) {
      minusClick?.(event)
      onValueChange?.(value - 1)
    }
  }

  const customPlusClick = (event: ITouchEvent) => {
    event.preventDefault()

    event.stopPropagation()
    if (value + 1 <= max) {
      plusClick?.(event)
      onValueChange?.(value + 1)
    }
  }

  console.log('hasInitBtn', hasInitBtn, props)
  return (
    <View
      className={classnames(`${prefixCls}`, className)}
      key={rowKey}
      style={style}
    >
      {hasInitBtn ? (
        <InitBtn
          btnType={btnType}
          btnText={props.btnText}
          size={size}
          initBtnClick={initBtnClick || customPlusClick}
        ></InitBtn>
      ) : (
        <Stepper
          stepperType={btnShape}
          value={value}
          size={size}
          disabled={disabled}
          minusClick={customMinusClick}
          plusClick={customPlusClick}
          zeroHideMinusBtn={zeroHideMinusBtn}
          hideMinusBtn={hideMinusBtn}
        ></Stepper>
      )}
    </View>
  )
}

export default React.memo(ScStepper)
