import Taro from '@tarojs/taro'
import React, {
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo
} from 'react'
import { imageUrl } from '@/utils/busUtils'
import { Image, ViewProps, View, CommonEvent } from '@tarojs/components'
import { pxTransform } from '@/utils/common'
import classnames from 'classnames'
import { errorImage, loadingImage } from './image'
import * as computed from './wxs'
import { FitType } from './wxs'
import './index.scss'

export type ImageFit =
  | 'contain'
  | 'cover'
  | 'fill'
  | 'widthFix'
  | 'heightFix'
  | 'none'
export interface ImageProps extends ViewProps {
  /**
   * @description 	图片链接
   */
  src: string
  /**
   * @description 是否圆角
   * @default false
   */
  round?: boolean
  /**
   * @description 宽度，单位为px
   */
  width?: number | string
  /**
   * @description 高度，单位为px
   */
  height?: number | string
  /**
   * @description 圆角大小
   * @default 0
   */
  radius?: number
  /**
   * @description 是否懒加载
   * @default false
   */
  lazyLoad?: boolean
  /**
   * @description 是否开启长按图片显示识别小程序码菜单
   * @default false
   */
  showMenuByLongpress?: boolean
  /**
   * @description 图片填充模式
   * @default fill
   */
  fit?: ImageFit
  /**
   * @description 是否展示图片加载失败提示
   * @default false
   */
  showError?: boolean
  /**
   * @description 是否使用 loading 状态
   * @default true
   */
  showLoading?: boolean
  /**
   * @description 渲染loading展示元素
   */
  renderLoading?: ReactNode
  /**
   * @description 渲染错误描述展示元素
   */
  renderError?: ReactNode
  /**
   * @description 样式
   */
  className?: string
  /**
   * @description 图片样式
   */
  imageClass?: string
  /**
   * @description 样式
   */
  style?: React.CSSProperties
  /**
   * @description 是否是远程静态图片
   * @default false
   */
  isStaticImage?: boolean
  /**
   * @description 是否压缩
   * @default false
   */
  isCompress?: boolean

  /** 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 */
  onLongPress?: (event: CommonEvent) => void
  /** 原始图 */
  sourceSrc?: string
  /** 原始图组 */
  images?: string[]
}
/**
 * center: 裁剪模式，不缩放图片，只显示图片的中间区域
 * scaleToFill => fill: 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
 * aspectFill -> cover: 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
 * aspectFit -> contain: 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
 * widthFix-> widthFix: 缩放模式，宽度不变，高度自动变化，保持原图宽高比不变
 * heightFix: 缩放模式，高度不变，宽度自动变化，保持原图宽高比不变
 */
export type TaroImageMode =
  | 'center'
  | 'scaleToFill'
  | 'aspectFill'
  | 'aspectFit'
  | 'widthFix'
  | 'heightFix'

const StaticImage: React.FC<ImageProps> = props => {
  const {
    src,
    fit = 'fill',
    lazyLoad = true,
    onClick,
    showLoading = true,
    showError = true,
    showMenuByLongpress,
    width,
    height,
    radius,
    round,
    className = '',
    imageClass = '',
    style,
    isStaticImage = false,
    isCompress = false,
    onLongPress,
    sourceSrc,
    images = []
  } = props

  const [customSrc, setCustomSrc] = useState<string>(() => {
    return imageUrl(src, isStaticImage)
  })
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState(false)

  const breviaryUrl = (url: string) => {
    if (isStaticImage || !isCompress) {
      return url
    }
    var newUrl = url
    var pattern = /[^\.]\w*$/
    if (url && url.indexOf('_200x200') === -1) {
      const name = newUrl.match(pattern)
      if (name && name[0] !== 'gif') {
        newUrl = newUrl.replace('.' + name[0], '_200x200.' + name[0])
      }
    }
    return newUrl
  }

  const borderRadius = useMemo(() => {
    return pxTransform(radius || 0)
  }, [radius])

  const onLoad = useCallback(function () {
    setLoading(false)
  }, [])

  const onError = useCallback(function () {
    setError(true)
  }, [])

  useEffect(() => {
    if (src != null) {
      setError(false)
      setCustomSrc(imageUrl(src, isStaticImage))
    } else {
      setCustomSrc('')
      setError(true)
    }
  }, [src, isStaticImage])

  useEffect(
    function () {
      if (loading === undefined) setLoading(true)
      setError(false)
    },
    [loading]
  )

  const styleH5 = useMemo(
    function () {
      let styles: React.CSSProperties = {
        borderRadius: borderRadius
      }
      if (process.env.TARO_ENV === 'h5') {
        if (fit === 'heightFix' || fit === 'widthFix') {
          styles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderRadius
          }
        }
      }
      if (height && height !== 'auto') {
        styles.height = height + 'px'
      }
      return styles
    },
    [fit, borderRadius, height]
  )

  const sourceUrls = useMemo(() => {
    return Array.isArray(images) ? images.map(it => imageUrl(it)) : []
  }, [images])

  const handleClick = (e: any) => {
    if (sourceUrls.length > 0 || sourceSrc != null) {
      Taro.previewImage({
        urls:
          sourceUrls.length === 0 ? [imageUrl(sourceSrc || '')] : sourceUrls,
        showmenu: true,
        current: imageUrl(sourceSrc || '')
      })
    } else {
      onClick?.(e)
    }
  }

  return (
    <View
      style={computed.style([
        computed.rootStyle({
          width,
          height,
          borderRadius
        }),
        style
      ])}
      className={
        ' ' +
        computed.bem('image', {
          round
        }) +
        ' ' +
        className
      }
      onClick={handleClick}
    >
      {!error ? (
        <Image
          src={breviaryUrl(customSrc)}
          mode={computed.mode(fit || ('none' as FitType)) as TaroImageMode}
          lazyLoad={lazyLoad}
          className={classnames(imageClass, 'van-image__img', className)}
          showMenuByLongpress={showMenuByLongpress}
          onLoad={onLoad}
          onLongPress={onLongPress}
          onError={onError}
          style={styleH5}
        />
      ) : null}

      {loading && showLoading && (
        <View
          className='van-loading-class van-image__loading'
          style={{ borderRadius: borderRadius }}
        >
          <View className='sc-image-loading'>
            <Image src={loadingImage} className='sc-loading-img' />
          </View>
        </View>
      )}

      {error && showError ? (
        <View
          className='error-class van-image__error'
          style={{ borderRadius: borderRadius }}
        >
          <View className='sc-image-loading'>
            <Image src={errorImage} className='sc-loading-img' />
          </View>
        </View>
      ) : null}
    </View>
  )
}

export default StaticImage
