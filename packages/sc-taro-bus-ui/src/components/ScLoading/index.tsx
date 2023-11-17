import PropTypes, { InferProps } from 'prop-types'
import React, { CSSProperties } from 'react'
import { View } from '@tarojs/components'
import { pxTransform } from '@/utils/common'
import './index.scss'

interface ScLoadingProps {
  size?: string | number
  color?: string | number
}

export default class ScLoading extends React.Component<ScLoadingProps> {
  public static defaultProps: ScLoadingProps
  public static propTypes: InferProps<ScLoadingProps>

  public render(): JSX.Element {
    const { color, size } = this.props
    const loadingSize = typeof size === 'string' ? size : String(size)
    const sizeStyle = {
      width: size ? `${pxTransform(parseInt(loadingSize))}px` : '',
      height: size ? `${pxTransform(parseInt(loadingSize))}px` : ''
    }
    const colorStyle: CSSProperties = {
      borderWidth: color ? '1px' : 0,
      borderStyle: 'solid',
      borderColor: color ? `${color} transparent transparent transparent` : ''
    }
    const ringStyle = Object.assign({}, colorStyle, sizeStyle)

    return (
      <View className='sc-loading' style={sizeStyle}>
        <View className='sc-loading__ring' style={ringStyle}></View>
        <View className='sc-loading__ring' style={ringStyle}></View>
        <View className='sc-loading__ring' style={ringStyle}></View>
      </View>
    )
  }
}

ScLoading.defaultProps = {
  size: 0,
  color: ''
}

ScLoading.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
