//@ts-nocheck
var amapFile = require('../libs/amap-wx.js');

var myAmapFun = new amapFile.AMapWX({
  key: '76726d4b5b4800fe7808b4165ba3f90e',
});
export default {
  getPoiAround: (options) => {
    myAmapFun.getPoiAround(options);
  },
  getRegeo: (options) => {
    return new Promise(async (resolve, reject) => {
      myAmapFun.getRegeo(options);
      resolve(true);
    });
  },
  getInputtips: (options) => {
    myAmapFun.getInputtips(options);
  },
  getWxLocation: (options) => {
    myAmapFun.getWxLocation(options);
  },
};
