import React, { PropsWithChildren } from 'react'
import { ComBaseGoodsProps } from './type'
import './index.scss'
import Horizontal from './components/Horizontal'
import Vertical from './components/Vertical'

export const rootPrefixCls = 'com-goods-item'

// const ComBaseGoods: React.FC<ComBaseGoodsProps> = (props) => {
//   const {
//     layout = 'horizontal',
//     buyBtnExpress = { btnType: 'home', btnShape: 'circle' },
//     goods,
//     openSceneCart,
//     ...resprops
//   } = props;

//   const prefixCls = useMemo(() => {
//     return layout === 'horizontal'
//       ? `${rootPrefixCls}-horizontal`
//       : `${rootPrefixCls}-vertical`;
//   }, [layout]);

//   const map = {
//     horizontal: Horizontal,
//     vertical: Vertical,
//   };

//   const Cmp = map[layout];
//   return (
//     <Cmp
//       {...resprops}
//       goods={goods}
//       prefixCls={prefixCls}
//       buyBtnExpress={buyBtnExpress}
//     ></Cmp>
//   );
// };

// export default React.memo(ComBaseGoods);

class ComBaseGoods extends React.Component<
  PropsWithChildren<ComBaseGoodsProps>
> {
  // shouldComponentUpdate(nextProps) {
  //   return JSON.stringify(nextProps.goods) !== JSON.stringify(this.props.goods);
  // }
  render() {
    // console.log("render");
    // console.log("endTIme", new Date().getTime());
    const {
      layout = 'horizontal',
      buyBtnExpress = { btnType: 'home', btnShape: 'circle' },
      goods,
      openSceneCart,
      ...resprops
    } = this.props

    const map = {
      horizontal: Horizontal,
      vertical: Vertical
    }

    const Cmp = map[layout]
    console.log('goodsStyle', resprops.goodsStyle)
    const prefixCls =
      layout === 'horizontal'
        ? `${rootPrefixCls}-horizontal`
        : `${rootPrefixCls}-vertical`
    return (
      <Cmp
        {...resprops}
        goods={goods}
        prefixCls={prefixCls}
        buyBtnExpress={buyBtnExpress}
      >
        {this.props.children}
      </Cmp>
    )
  }
}
export default ComBaseGoods
