import Taro from '@tarojs/taro';

const switchTab = (options: Taro.switchTab.Option) => {
  let fail = options.fail;
  if (fail == null) {
    fail = () => {
      //容错处理
      Taro.navigateTo({
        url: options.url,
        fail: function () {
          Taro.reLaunch({
            url: options.url,
          });
        },
      });
    };
  }

  Taro.switchTab(options);
};

const redirectTo = (options: Taro.switchTab.Option) => {
  let fail = options.fail;
  if (fail == null) {
    fail = () => {
      //容错处理
      Taro.navigateTo({
        url: options.url,
        fail: function () {
          Taro.reLaunch({
            url: options.url,
          });
        },
      });
    };
  }
  Taro.redirectTo(options);
};

const reLaunch = (options: Taro.reLaunch.Option) => {
  let fail = options.fail;
  if (fail == null) {
    fail = () => {
      Taro.navigateTo(options);
    };
  }

  Taro.reLaunch(options);
};

const navigateTo = (options: Taro.navigateTo.Option) => {
  Taro.navigateTo(options);
};

const navigateBack = (options?: Taro.navigateBack.Option) => {
  Taro.navigateBack(options);
};

export default {
  switchTab,
  reLaunch,
  navigateTo,
  navigateBack,
  redirectTo,
};
