import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { pxTransform } from '@/utils/common'
import React, { CSSProperties, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import ScIcon from '../ScIcon'
import { Color } from '@/constants/Enum'

export interface ScCheckboxProps {
  checked?: boolean
  disabled?: boolean
  checkedColor?: string
  className?: string
  style?: CSSProperties
  customStyle?: string | CSSProperties
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
  size?: number
  radius?: number
}

export default class ScCheckbox extends React.Component<
  PropsWithChildren<ScCheckboxProps>
> {
  public static defaultProps: ScCheckboxProps
  public static propTypes: InferProps<ScCheckboxProps>

  private handleClick() {
    const { onChange, checked, disabled } = this.props
    if (!(disabled || false)) {
      onChange && onChange(!(checked || false))
    }
  }

  public render(): JSX.Element {
    const {
      customStyle = {},
      className,
      checked = false,
      disabled = false,
      style,
      checkedColor = Color.dominant,
      size = 36,
      radius
    } = this.props

    const rootCls = classNames('sc-checkbox', className)
    const optionCls = classNames(rootCls, {
      'sc-checkbox__option--selected': checked,
      'sc-checkbox__option--disabled': disabled && checked,
      'sc-checkbox__option--noselected--disabled': disabled && !checked
    })
    const newVal: React.CSSProperties = {
      ...(style as object),
      ...(customStyle as object)
    }
    const checkSize: React.CSSProperties = {
      width: pxTransform(size),
      height: pxTransform(size),
      borderRadius: radius
        ? pxTransform(Number(radius || 0))
        : pxTransform(size / 2)
    }
    return (
      <View
        className={optionCls}
        onClick={this.handleClick.bind(this)}
        style={newVal}
      >
        <View className='sc-checkbox__option-wrap'>
          <View
            className='sc-checkbox__icon-cnt'
            style={
              checked ? { background: checkedColor, ...checkSize } : checkSize
            }
          >
            <ScIcon value='public-select' size={pxTransform(size)}></ScIcon>
          </View>
          <View className='sc-checkbox__title'>{this.props.children}</View>
        </View>
      </View>
    )
  }
}

ScCheckbox.defaultProps = {
  customStyle: '',
  className: '',
  checked: false,
  disabled: false,
  checkedColor: Color.dominant,
  size: 36
}

ScCheckbox.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  checkedColor: PropTypes.string
}
