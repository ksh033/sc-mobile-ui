import { View, Text, Image, ITouchEvent } from '@tarojs/components';
import React from 'react';
import classnames from 'classnames';
import { ScStepperInitBtnProps } from '../../type';

import './index.scss';

export const stepper_initbtn_prefix = 'com-stepper-initbtn';

const InitBtn: React.FC<ScStepperInitBtnProps> = (props) => {
  const {
    initBtnType = 'default',
    btnText,
    initBtnClick,
    size = 'normal',
  } = props;

  const handleClick = (event: ITouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    initBtnClick?.(event);
  };

  if (initBtnType === 'default') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-detail`]: true,
          [`${stepper_initbtn_prefix}-detail-samll`]: size === 'small',
        })}
        onClick={handleClick}
      >
        <Image
          className={`${stepper_initbtn_prefix}-detail__image`}
          mode="aspectFit"
          src={require('../../../../assets/stepper/plus.png')}
        ></Image>
        <Text className={`${stepper_initbtn_prefix}-detail__text`}>
          {btnText || '购物车'}
        </Text>
      </View>
    );
  }

  if (initBtnType === 'circle-arrow') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-home`]: true,
          [`${stepper_initbtn_prefix}-home-samll`]: size === 'small',
        })}
        onClick={handleClick}
      >
        <Image
          className={`${stepper_initbtn_prefix}-home__image`}
          mode="aspectFit"
          src={require('../../../../assets/stepper/add.png')}
        ></Image>
      </View>
    );
  }

  if (initBtnType === 'buy-now') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-discount`]: true,
          [`${stepper_initbtn_prefix}-discount-samll`]: size === 'small',
        })}
        onClick={initBtnClick}
      >
        <Text className={`${stepper_initbtn_prefix}-discount__text`}>
          {btnText || '立即抢'}
        </Text>
      </View>
    );
  }

  if (initBtnType === 'square') {
    return (
      <View
        className={classnames({
          [`${stepper_initbtn_prefix}-square`]: true,
          [`${stepper_initbtn_prefix}-square-samll`]: size === 'small',
        })}
        onClick={initBtnClick}
      ></View>
    );
  }

  return null;
};

export default InitBtn;
