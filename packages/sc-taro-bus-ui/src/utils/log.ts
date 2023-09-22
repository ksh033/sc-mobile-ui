//import { getUsePhone } from '@/actions/useUser';
import Taro from '@tarojs/taro';

const log = Taro.getRealtimeLogManager ? Taro.getRealtimeLogManager() : null;

export default {
  info(...arg: any[]) {
    if (!log) return;
    log.info.apply(log, arg);
  },
  warn(...arg: any[]) {
    if (!log) return;
    log.warn.apply(log, arg);
  },
  error(...arg: any[]) {
    if (!log) return;
 const phone = "getUsePhone()";
    log.error.apply(log, [phone, ...arg]);
  },
  setFilterMsg(msg: any) {
    // 从基础库2.7.3开始支持
    if (!log || !log.setFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.setFilterMsg(msg);
  },
  addFilterMsg(msg: any) {
    // 从基础库2.8.1开始支持
    if (!log || !log.addFilterMsg) return;
    if (typeof msg !== 'string') return;
    log.addFilterMsg(msg);
  },
};
