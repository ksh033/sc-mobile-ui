import React, { PropsWithChildren } from 'react'
import { View, Image, Text } from '@tarojs/components'
import classnames from 'classnames'
import { pxTransform } from '@/utils/common'
import './index.scss'
import ScImage from '../ScImage'

type ScEmptyProps = {
  /** 图片地址 */
  src?: string
  /** 图片宽度 */
  width?: number
  /** 图片高度 */
  height?: number
  // 文本说明
  desc?: string
  className?: string
  /** 是否是远程静态图片 */
  isStaticImage?: boolean
}

const ScEmpty: React.FC<PropsWithChildren<ScEmptyProps>> = props => {
  const {
    src,
    width = 400,
    height = 312,
    desc,
    className,
    isStaticImage = false
  } = props

  const rootClass = classnames('sc-empty', className)

  return (
    <View className={rootClass}>
      <View
        style={{ width: pxTransform(width), height: pxTransform(height) }}
        className='sc-empty-img'
      >
        {src &&
          (isStaticImage ? (
            <ScImage
              src={src}
              fit='contain'
              isStaticImage
              width={pxTransform(width)}
              height={pxTransform(height)}
            ></ScImage>
          ) : (
            <Image
              src={src}
              mode='aspectFit'
              style={{
                width: pxTransform(width),
                height: pxTransform(height)
              }}
            ></Image>
          ))}
      </View>

      {desc && <Text className='sc-empty-message'>{desc}</Text>}
      {props.children}
    </View>
  )
}

export default ScEmpty
