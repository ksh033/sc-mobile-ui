import { ScrollView, View, Text } from '@tarojs/components'
import ScPullDownRefresh from '../ScPullDownRefresh'
import ComGoodsLayout from '../ComGoodsLayout'
import { useRef } from 'react'
import { RegAppUIComponent, type AppUIComponents } from '@sceditor/core'
import { Goods } from '../types/goods'
import classnames from 'classnames'
import { useSetState } from '@/hooks'
import { ComGoodsGroupProps, ComGoodsGroupState } from './type'

const classPrefix = 'com-goods-group'
/** 商品组 */
const ComGoodsGroup: AppUIComponents<ComGoodsGroupProps> = () => {
  const [state, setState] = useSetState<ComGoodsGroupState>({
    list: [],
    catalogList: []
  })

  /** ref */
  // 下拉刷新组件的ref为了调用内置方法
  const ref = useRef<ScPullDownRefresh | null>(null)

  /** 分类切换 */
  const onClassifyChange = async (classifyId: string, index: number) => {}

  /** 数据返回 */
  const onListChange = (records: Goods[]) => {
    setState({
      list: records
    })
  }
  return (
    <View className={`${classPrefix}`}>
      <View className={`${classPrefix}-classify`}>
        <ScrollView
          id='nav-left'
          className={`${classPrefix}-classify-scroll`}
          scrollY
        >
          {state.catalogList?.map((item, index: number) => {
            return (
              <View
                key={item.classifyId}
                className={classnames({
                  [`${classPrefix}-classify-item`]: true,
                  [`${classPrefix}-classify-item-active`]:
                    state.classifyId === item?.classifyId
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
                      state.classifyId === item?.classifyId
                  })}
                >
                  <Text
                    className={classnames({
                      [`${classPrefix}-classify-item-name__text`]: true,
                      [`${classPrefix}-classify-item-name-activeleft`]:
                        state.classifyId === item?.classifyId
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
          <ComGoodsLayout list={state.list}></ComGoodsLayout>
        </ScPullDownRefresh>
      </View>
    </View>
  )
}

ComGoodsGroup.cmpType = 'GoodsGroup'
export default RegAppUIComponent(ComGoodsGroup)
