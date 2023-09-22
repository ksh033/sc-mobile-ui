// @ts-nocheck
import Taro from '@tarojs/taro';

const getStorageSync = (key: string) => {
  return new Promise<any>(async (resolve, reject) => {
    Taro.getStorage({
      key: key,
      success: (res) => {
        resolve(res);
      },
      fail: (daa) => {
        resolve(false);
      },
    });
  });
};

const setStorageSync = (key: string, data: any) => {
  return new Promise<any>(async (resolve) => {
    Taro.setStorage({
      key: key,
      data: data,
      success: function (res) {
        resolve(res);
      },
      fail() {
        resolve(false);
      },
    });
  });
};

export default {
  event: {
    USERINFO: 'USER_INFO', // 用户信息
    LOCATIONADDRESS: 'LOCATION_ADDRESS', // 定位地址
    SCENEADDRESSINFO: 'SCENE_ADDRESS_INFO', // 不同场景的 用户选择的地址信息（收货地址+范围内的门店）
    SCENEDISTRIBUTEWAY: 'SCENE_DISTRIBUTEWAY', // 不同场景的配送方式
    USER_CART: 'USER_CART', // 用户购物车
    HISTROYSEARCH: 'HISTROY_SEARCH', // 搜索历史
    POPULARIZINGCODE: 'POPULARIZING_CODE',
  },
  async set($key, $value) {
    const value = await setStorageSync($key, $value);
    if (value === false) {
      console.log('缓存设置异常', $key);
    }
  },
  async get($key) {
    let result = await getStorageSync($key);

    if (result && result.errMsg === 'getStorage:ok' && result.data) {
      return result.data;
    } else {
      return null;
    }
  },
  remove($key) {
    return Taro.removeStorage({
      key: $key,
    });
  },
  clear(options) {
    Taro.clearStorage(options);
  },
};
