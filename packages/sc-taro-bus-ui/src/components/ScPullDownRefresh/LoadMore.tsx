import { InferProps } from 'prop-types'
import React, { PropsWithChildren } from 'react'
import { Text, View } from '@tarojs/components'
import { Button } from '@sc-mobile/sc-taro-ui'
import './LoadMore.scss'
import ScLoading from '../ScLoading'

type LoadMorProps = {
  status?: number
  loadingText: string
  noMoreText: string
  failedText: string
  pullingText: string
  color: string
  failedColor: string
  size: string
  loadingBackgroundColor: string
  listIsEmpty: boolean
  retry?: (arg: any) => any
  noMoreRender?: (noMoreText: string) => React.ReactNode
}

export default class LoadMore extends React.Component<
  PropsWithChildren<LoadMorProps>
> {
  public static propTypes: InferProps<LoadMorProps>
  public static defaultProps: LoadMorProps

  private onClick(): void {
    this.props.retry && this.props.retry(arguments as any)
  }

  public render(): JSX.Element {
    const {
      loadingText,
      listIsEmpty,
      status,
      pullingText,
      noMoreText,
      children,
      noMoreRender
    } = this.props

    let component: React.ReactNode = null
    if (status === 1) {
      component = (
        <View className='sc-nomore-loading'>
          <ScLoading></ScLoading>
          <Text className='sc-nomore-loading__text'>{loadingText}</Text>
        </View>
      )
    } else if (status === 2) {
      component = noMoreRender ? (
        noMoreRender(noMoreText)
      ) : (
        <View className='sc-nomore-content'>
          <Text className='t-class-loading-text'>{noMoreText}</Text>
        </View>
      )
    } else if (status === 4) {
      component = (
        <View className='sc-nomore-content'>
          <Text className='t-class-loading-text'>{pullingText}</Text>
        </View>
      )
    } else if (status === 3) {
      ;<Button loading onClick={this.onClick}>
        重新加载
      </Button>
    }

    return (
      <>
        {listIsEmpty && (status === 0 || status === 2) ? children : null}
        {!(listIsEmpty && (status === 0 || status === 2)) && (
          <View className='load-more wr-class'>{component}</View>
        )}
      </>
    )
  }
}

LoadMore.defaultProps = {
  status: 0,
  loadingText: '加载中...',
  noMoreText: '没有更多了',
  failedText: '加载失败，点击重试',
  pullingText: '释放至下一个分类',
  color: '#BBBBBB',
  failedColor: '#FA550F',
  size: '40px',
  loadingBackgroundColor: '#F5F5F5',
  listIsEmpty: false
}
