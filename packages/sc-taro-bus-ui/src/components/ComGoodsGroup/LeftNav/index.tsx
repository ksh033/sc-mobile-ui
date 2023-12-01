import ComGoodsLayout from '@/components/ComGoodsLayout'
import ScPullDownRefresh from '@/components/ScPullDownRefresh'
import { ScrollView, View, Text } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'
import { useRef } from 'react'
import { ComGoodsGroupProps, ComGoodsGroupState } from '../type'

const classPrefix = 'com-goods-group-leftnav'

export type LeftNavProps = ComGoodsGroupState &
  Omit<ComGoodsGroupProps, 'list' | 'showMethod' | 'subEntry'> & {
    onClassifyChange: (classifyId: string, index: number) => void
    onListChange: (data: any) => void
  }

const LeftNav: React.FC<LeftNavProps> = props => {
  const {
    list,
    catalogList,
    classifyId,
    onClassifyChange,
    onListChange,
    ...resProps
  } = props

  /** ref */
  // 下拉刷新组件的ref为了调用内置方法
  const ref = useRef<ScPullDownRefresh | null>(null)

  return (
    <View className={`${classPrefix}`}>
      <View className={`${classPrefix}-classify`}>
        <ScrollView
          id='nav-left'
          className={`${classPrefix}-classify-scroll`}
          scrollY
        >
          {catalogList?.map((item, index: number) => {
            return (
              <View
                key={item.classifyId}
                className={classnames({
                  [`${classPrefix}-classify-item`]: true,
                  [`${classPrefix}-classify-item-active`]:
                    classifyId === item?.classifyId
                })}
                onClick={() => {
                  if (item.classifyId) {
                    onClassifyChange?.(item.classifyId, index)
                  }
                }}
              >
                <View
                  className={classnames({
                    [`${classPrefix}-classify-item-name`]: true,
                    [`${classPrefix}-classify-item-name-active`]:
                      classifyId === item?.classifyId
                  })}
                >
                  <Text
                    className={classnames({
                      [`${classPrefix}-classify-item-name__text`]: true,
                      [`${classPrefix}-classify-item-name-activeleft`]:
                        classifyId === item?.classifyId
                    })}
                  >
                    {item.classifyName}
                  </Text>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View className={`${classPrefix}-refresher`}>
        <ScPullDownRefresh
          id='pull-down-refresh'
          // query={getGoodsList}
          // onSwitch={onNextfresh}
          onListChange={onListChange}
          canPullUpSwitch
          auto={false}
          defaultPageSize={500}
          loadingTexts={[
            '下拉至上一个分类',
            '释放至上一个分类',
            '正在刷新',
            '正在刷新'
          ]}
          ref={node => {
            ref.current = node
          }}
        >
          <ComGoodsLayout
            list={list}
            goodsType='G1'
            layout='horizontal'
            size='normal'
            {...resProps}
          ></ComGoodsLayout>
        </ScPullDownRefresh>
      </View>
    </View>
  )
}

export default LeftNav
