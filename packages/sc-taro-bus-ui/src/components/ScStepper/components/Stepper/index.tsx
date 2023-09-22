import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import { prefixCls } from '../../index';
import { ScStepperWarpProps } from '../../type';
import './index.scss';

const Stepper: React.FC<ScStepperWarpProps> = (props) => {
  const {
    stepperType = 'circle',
    value = 0,
    minusClick,
    plusClick,
    disabled = false,
    size = 'small',
    zeroHideMinusBtn = true,
    hideMinusBtn = false,
  } = props;
  const minusStyle = useMemo(() => {
    if (value > 0 || !zeroHideMinusBtn) {
      return {
        transform: 'rotate(-180deg)',
        left: '0',
        display: 'block',
      };
    }
    return {
      transform: '0deg',
      left: '105px',
      display: 'none',
    };
  }, [value, zeroHideMinusBtn]);

  if (stepperType === 'circle') {
    return (
      <View
        className={classnames(
          `${prefixCls}-circle-warp`,
          `${prefixCls}-circle-warp__${size}`
        )}
      >
        {!hideMinusBtn && (
          <View
            className={`${prefixCls}-circle-warp-minus`}
            onClick={minusClick}
            style={minusStyle}
          ></View>
        )}

        {!hideMinusBtn && (!zeroHideMinusBtn || value > 0) && (
          <View className={`${prefixCls}-circle-warp-num`}>
            <Text className={`${prefixCls}-circle-warp-num__text`}>
              {value}
            </Text>
          </View>
        )}

        <View
          className={`${prefixCls}-circle-warp-plus`}
          onClick={plusClick}
          style={{
            transform: `rotate(${
              ~~value > 0 && !hideMinusBtn ? '-180deg' : '0deg'
            })`,
          }}
        >
          {hideMinusBtn && (
            <View className={`${prefixCls}-circle-warp-plus-num`}>
              <Text className={`${prefixCls}-circle-warp-plus-num__text`}>
                {value}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View
      className={classnames(
        `${prefixCls}-border-warp`,
        `${prefixCls}-border-warp__${size}`,
        { [`${prefixCls}-border-warp__disabled`]: disabled }
      )}
    >
      <View className={`${prefixCls}-border-warp-minus`} onClick={minusClick}>
        <Text className={`${prefixCls}-border-warp-minus__text`}>-</Text>
      </View>

      <View className={`${prefixCls}-border-warp-num`}>
        <Text className={`${prefixCls}-border-warp-num__text`}>{value}</Text>
      </View>

      <View className={`${prefixCls}-border-warp-plus`} onClick={plusClick}>
        <Text className={`${prefixCls}-border-warp-plus__text`}>+</Text>
      </View>
    </View>
  );
};

export default React.memo(Stepper);
