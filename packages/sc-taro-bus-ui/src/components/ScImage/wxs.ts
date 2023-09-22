import { addUnit } from '@/utils/common';
import { style, keys } from '../utils/styles';
import { memoize } from './memoize';

const PREFIX = 'van-';

function join(name: any, mods: any) {
  name = PREFIX + name;
  mods = mods.map(function (mod: any) {
    return name + '--' + mod;
  });
  mods.unshift(name);
  return mods.join(' ');
}

function traversing(mods: any, conf: any) {
  if (!conf) {
    return;
  }

  // 加前缀
  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (Array.isArray(conf)) {
    // 加前缀
    conf.forEach(function (item: any) {
      traversing(mods, item);
    });
  } else if (typeof conf === 'object') {
    // 加属性
    keys(conf).forEach(function (key: any) {
      conf[key] && mods.push(key);
    });
  }
}

function _bem(name: any, conf: any) {
  const mods: any = [];
  traversing(mods, conf);
  return join(name, mods);
}

function rootStyle(data: any) {
  return style([
    {
      width: addUnit(data.width),
      height: addUnit(data.height),
      'border-radius': addUnit(data.radius),
    },
    data.radius ? 'overflow: hidden' : null,
  ]);
}

const FIT_MODE_MAP = {
  none: 'scaleToFill',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix',
  scaleDown: 'aspectFit',
};

export type FitType =
  | 'none'
  | 'fill'
  | 'cover'
  | 'contain'
  | 'widthFix'
  | 'heightFix'
  | 'scaleDown';

function mode(fit: FitType) {
  return FIT_MODE_MAP[fit];
}

const bem: (name: any, conf?: any) => string = memoize(_bem);

export { rootStyle, mode, style, bem };
