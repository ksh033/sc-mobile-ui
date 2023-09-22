import { pxTransform } from '@/utils/common';
import { Price } from '@sc-mobile/sc-taro-ui';
import type { PriceProps } from '@sc-mobile/sc-taro-ui';
import { View } from '@tarojs/components';
import React from 'react';
import { useMemo } from 'react';

type ComPriceProps = Partial<PriceProps> & {
  color?: string;
  fontSize?: Number;
  symbolSize?: Number;
  fontWeight?: Number;
};

const ComPrice: React.FC<ComPriceProps> = (props) => {
  const {
    color,
    fontSize,
    symbolSize,
    size = 'normal',
    fontWeight = 400,
    ...resProps
  } = props;
  const style: any = useMemo(() => {
    const map: any = {};
    if (color) {
      map['--nutui-brand-color'] = color;
    }
    if (fontSize) {
      const newSize = pxTransform(Number(fontSize || 0));
      map['--nutui-font-size-3'] = newSize + 'px';
      map['--nutui-price-symbol-medium-size'] = newSize + 'px';
      map['--nutui-price-integer-medium-size'] = newSize + 'px';
      map['--nutui-price-decimal-medium-size'] = newSize + 'px';
    }
    if (symbolSize) {
      const newSymbolSize = pxTransform(Number(symbolSize || 0));
      map['--nutui-price-symbol-medium-size'] = newSymbolSize + 'px';
    }
    if (fontWeight) {
      map['fontWeight'] = fontWeight;
    }
    return map;
  }, [color, fontSize, symbolSize, fontWeight]);

  return (
    <View style={style}>
      <Price {...resProps} size={size}></Price>
    </View>
  );
};

export default ComPrice;
