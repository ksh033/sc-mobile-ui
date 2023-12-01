import { View } from '@tarojs/components'
import { RegAppUIComponent, type AppUIComponents } from '@sceditor/core'
import { Goods } from '../types/goods'
import { useSetState } from '@/hooks'
import { ComGoodsGroupProps, ComGoodsGroupState } from './type'
import LeftNav from './LeftNav'
import TopNav from './TopNav'

const classPrefix = 'com-goods-group'
/** 商品组 */
const ComGoodsGroup: AppUIComponents<ComGoodsGroupProps> = props => {
  const { showMethod = 'TOP_NAV', list, ...resProps } = props

  const [state, setState] = useSetState<ComGoodsGroupState>({
    list: list,
    catalogList: []
  })

  /** 分类切换 */
  const onClassifyChange = (classifyId: string, index: number) => {}

  /** 数据返回 */
  const onListChange = (records: Goods[]) => {
    setState({
      list: records
    })
  }
  return (
    <View className={`${classPrefix}`}>
      {showMethod === 'TOP_NAV' ? (
        <TopNav
          list={state.list}
          onListChange={onListChange}
          onClassifyChange={onClassifyChange}
          catalogList={state.catalogList}
          classifyId={state.classifyId}
          {...resProps}
        ></TopNav>
      ) : (
        <LeftNav
          list={state.list}
          onListChange={onListChange}
          onClassifyChange={onClassifyChange}
          catalogList={state.catalogList}
          classifyId={state.classifyId}
          {...resProps}
        ></LeftNav>
      )}
    </View>
  )
}

ComGoodsGroup.cmpType = 'GoodsGroup'
export default RegAppUIComponent(ComGoodsGroup)
