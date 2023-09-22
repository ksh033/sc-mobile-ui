//@ts-nocheck
const coverage = (str) => {
  let newStr = str;
  if (~~newStr < 10) {
    newStr = '0' + newStr;
  }
  return newStr;
};
export const YYYYMM = 'YYYY-MM';
export const YYYYMMDD = 'YYYY-MM-DD';
export const YYYYMMDDHHMM = 'YYYY-MM-DD hh:mm';
export const YYYYMMDDHHMMSS = 'YYYY-MM-DD hh:mm:ss';
export const HHMM = 'hh:mm';
export const MMDDHHMM = 'MM-DD hh:mm';

// 把时间转换成自己想要的格式s
export const dateFormat = (dateStr: any, format = YYYYMMDD) => {
  var date = dateStr;
  if (typeof dateStr === 'string') {
    date = new Date(dateStr.replace(/-/g, '/'));
  }
  var year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index;
  });

  var newTime = format
    .replace(/YYYY/g, `${year}`)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);

  return newTime;
};

// 获取指定的日期
export const getAppointDate = (day, timeStr) => {
  // 如果没有传递时间或者传递的时间为false或者null或者 '', 默认获取今天林晨的时间

  // 1. 没传天数, 且 没传需要的时间格式, 返回 今天的 默认的时间格式
  if (!day && !timeStr) {
    const yyyy = new Date().getFullYear();
    const mm = coverage(new Date().getMonth() + 1);
    const dd = coverage(new Date().getDate() + 1);
    return `${yyyy}-${mm}-${dd} 00:00:00`;
  }
  // 天数传递的boolean值为false, 但是传递了时间格式
  if (!day && timeStr) {
    let str = timeStr;
    const yyyy = new Date().getFullYear();
    const mm = coverage(new Date().getMonth() + 1);
    const dd = coverage(new Date().getDate() + 1);
    if (str.includes('yyyy')) {
      str = str.replace('yyyy', yyyy);
    }
    if (str.includes('mm')) {
      str = str.replace('mm', mm);
    }
    if (str.includes('dd')) {
      str = str.replace('dd', dd);
    }
    return str;
  }

  // 传大于零的天数 但是没传时间字符
  const tem = new Date().getTime() + day * 24 * 60 * 60 * 1000;
  const t = new Date(tem);
  const yyyy = t.getFullYear();
  const mm = coverage(t.getMonth() + 1);
  const dd = coverage(t.getDate() + 1);
  if (!timeStr) {
    return `${yyyy}-${mm}-${dd} 00:00:00`;
  } else {
    let str = timeStr;
    if (str.includes('yyyy')) {
      str = str.replace('yyyy', yyyy);
    }
    if (str.includes('mm')) {
      str = str.replace('mm', mm);
    }
    if (str.includes('dd')) {
      str = str.replace('dd', dd);
    }
    return str;
  }
};
/** 获取明天 */
export function getTomorrow() {
  var day = new Date();
  day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
  return dateFormat(day);
}

/** 获取昨天 */
export function getYesterday() {
  var day = new Date();
  day.setTime(day.getTime() - 24 * 60 * 60 * 1000);
  var s3 =
    day.getFullYear() +
    '-' +
    coverage(day.getMonth() + 1) +
    '-' +
    coverage(day.getDate());
  return s3;
}

export function getTime(t?: string | Date) {
  // 处理t的默认值
  if (!t) t = new Date();
  // 强制转换类型, 防止用户输入的不是时间
  t = t + '';
  // 处理ios的兼容性
  if (t.includes('-')) {
    t = t.replace(/-/g, '/');
  }
  return new Date(t).getTime();
}

export function timeRange(str) {
  if (str) {
    const time = getTomorrow();
    const rangeTime = str.split('~');
    if (rangeTime.length === 2) {
      let startTime = rangeTime[0];
      let endTime = rangeTime[1];
      startTime = dateFormat(time + ' ' + startTime, HHMM);
      endTime = dateFormat(time + ' ' + endTime, HHMM);
      if (startTime && endTime) {
        return `${startTime}~${endTime}`;
      }
    }
  }
  return null;
}

export function timediff(timeStart, timeEnd) {
  if (!timeStart || !timeEnd) return 0;

  const start = getTime(timeStart);
  const end = getTime(timeEnd);
  const days = start - end;
  const day = parseInt(String(days / (1000 * 60 * 60 * 24)));
  if (day > 0) {
    return day;
  } else {
    return 0;
  }
}
/** 获取下一个月 */
export function getNextMonth(t) {
  // 处理t的默认值
  if (!t) t = new Date();
  // 强制转换类型, 防止用户输入的不是时间
  t = t + '';
  // 处理ios的兼容性
  if (t.includes('-')) {
    t = t.replace(/-/g, '/');
  }
  const date = new Date(t);
  date.setMonth(date.getMonth() + 1);
  date.setDate(1);
  return dateFormat(date.toLocaleDateString());
}
/**
 * 获取 近**天，前天，昨天，今天，明天，后天，未来**天等通用方法
 * ..............and so on
 * -15 ----- 近15天
 *  -7 ----- 近7天
 *  -3 ----- 近3天
 *  -2 ----- 前天
 *  -1 ----- 昨天
 *   0 ------------------------- 今天
 *   1 ----- 明天
 *   2 ----- 后天
 *   3 ----- 未来3天
 *   7 ----- 未来7天
 *  15 ----- 未来15天
 * ..............and so on
 * @param {Object} count
 */
export function getRangeDate(count, format = YYYYMMDD): [string, string] {
  // 实例化开始日期
  const startDate = new Date();
  // 以毫秒设置 Date 对象
  if (count > 2) {
    startDate.setTime(startDate.getTime()); // 大于2，设置起始时间为今天
  } else if (count < -2) {
    startDate.setTime(startDate.getTime() + 24 * 60 * 60 * 1000 * (count + 1));
  } else {
    startDate.setTime(startDate.getTime() + 24 * 60 * 60 * 1000 * count);
  }
  // 获取开始年份
  const startY = startDate.getFullYear();
  // 获取开始月份
  const startM =
    startDate.getMonth() + 1 < 10
      ? '0' + (startDate.getMonth() + 1)
      : startDate.getMonth() + 1;
  // 获取开始日
  const startD =
    startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate();
  // 拼接 最终开始时间
  const startTime = `${startY}-${startM}-${startD} 00:00:00`;

  // 实例化结束日期
  const endDate = new Date();
  // 以毫秒设置 Date 对象
  if (count > 2) {
    endDate.setTime(endDate.getTime() + 24 * 60 * 60 * 1000 * (count - 1));
  } else if (count < -2) {
    endDate.setTime(endDate.getTime()); // 小于-2，设置结束时间为今天
  } else {
    endDate.setTime(endDate.getTime() + 24 * 60 * 60 * 1000 * count);
  }
  // 获取结束年份
  const endY = endDate.getFullYear();
  // 获取结束月份
  const endM =
    endDate.getMonth() + 1 < 10
      ? '0' + (endDate.getMonth() + 1)
      : endDate.getMonth() + 1;
  // 获取结束日
  const endD =
    endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate();
  // 拼接 最终结束时间
  const endTime = `${endY}-${endM}-${endD} 23:59:59`;

  // 返回 开始 至 结束 日期 数组
  return [dateFormat(startTime, format), dateFormat(endTime, format)];
}
