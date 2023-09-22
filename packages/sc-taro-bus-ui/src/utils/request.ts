import Taro, { RequestTask } from '@tarojs/taro';
//import { getToken } from '@/actions/useUser';
//import config from '../config';
import log from './log';

const baseUrl ="";
const appVersion ="";

const requestTree: Record<string, RequestTask<any> | null> = {};

export enum ErrorShowType {
  SILENT = '0',
  WARN_MESSAGE = '1',
  ERROR_MESSAGE = '2',
  NOTIFICATION = '4',
  REDIRECT = '9',
}
export type requestOption = {
  showLoading?: boolean;
  showError?: boolean;
  loadingMsg?: string;
} & Taro.request.Option;

let tryloginCount = 0;
// @ts-igno
//带Token请求
function request<T = any>(opts: requestOption) {
  const { showError = true } = opts;

  Taro.onNetworkStatusChange(function (res) {
    if (!res.isConnected) {
      Taro.showToast({
        title: '网络连接不可用！',
        icon: 'none',
      });
    }
    return false;
  });
  const token ="";
  // const rsysCode = 'shopcashapp';

  const url = opts.url.startsWith('/')
    ? baseUrl + opts.url.slice(1)
    : baseUrl + opts.url;

  if (opts.showLoading) {
    Taro.showLoading({
      title: opts.loadingMsg ? opts.loadingMsg : '加载中',
    });
  }

  let promise = new Promise<T>(function (resolve, reject) {
    let httpDefaultOpts: Taro.request.Option = {
      ...opts,
      url: url,
      // data: data,
      mode: 'cors',
      method: opts.method,
      credentials: 'same-origin',
      header:
        opts.method?.toLocaleUpperCase() === 'GET'
          ? {
              token: token,
              version: appVersion,
              //'sys-code': rsysCode,
            }
          : {
              token: token,
              // 'Content-Type': 'application/json; charset=UTF-8',
              version: appVersion,
              // 'sys-code': rsysCode,
            },
      dataType: 'json',
    };
    let requestTask = Taro.request(httpDefaultOpts);
    // console.log('request url', url, opts.data);
    requestTree[url] = requestTask;
    requestTask
      .then((result) => {
        if (opts.showLoading) {
          Taro.hideLoading({
            fail: function (err) {},
          });
        }

        // console.log('result', result);
        requestTree[url] = null;

        //taro.$hcJs.log(result);
        if (result.statusCode === 200) {
          if (result.data.success) {
            tryloginCount = 0;
            resolve(result.data.data);
          } else {
            if (
              result.data.errorCode === 'A100001' ||
              result.data.errorCode === 'A100002'
            ) {
              // 退出
              if (tryloginCount < 5) {
                // cache.logout();

                // await app.checkLogin();
                tryloginCount = tryloginCount + 1;
                return request(opts);
              } else {
                log.error(
                  `url: ${url}, params: ${JSON.stringify(
                    opts.data
                  )}, 错误信息：重试登入失败${tryloginCount}`
                );
                reject(result.data);
              }
            }

            // 其他接口异常
            if (
              result.data.errorMessage &&
              result.data.errorMessage.length > 512
            ) {
              result.data.errorMessage = '';
            }

            log.error(
              `url: ${url}, params: ${JSON.stringify(
                opts.data
              )}, 错误信息：${JSON.stringify(result.data)}`
            );

            // 特殊异常处理
            if (result.data.errorBizData) {
              throw result.data;
            } else {
              if (showError) {
                // 常规异常处理
                Taro.showModal({
                  title: '',
                  content: result.data.errorShowTip,
                  showCancel: false,
                  success(res) {},
                  fail() {},
                });
              }
              throw result.data;
            }
          }
        } else {
          Taro.showModal({
            title: '提示',
            content: '接口异常',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                // app.setShowError(true)
              }
            },
            fail() {
              // app.setShowError(true)
            },
          });
          // todo 服务器异常判断
          log.error(
            `url: ${url}, params: ${JSON.stringify(
              opts.data
            )}, 错误信息：${JSON.stringify(result)}`
          );
          reject(result.data);
        }
      })
      .catch((response) => {
        //Taro.$hcJs.log(response);
        console.log('请求出错', response);
        requestTree[url] = null;
        if (response.errorCode) {
          reject({
            message: response.errorShowTip,
            code: response.errorCode,
            type: response.errorShowType,
            bizData: response.errorBizData,
          });
        } else {
          reject(response);
        }
      });
  });
  return promise;
}
//此方法会打断所有发送中请求
function abortRequest(url:any) {
  if (requestTree && requestTree[url] !== null) {
    requestTree[url]?.abort();
    requestTree[url] = null;
  }
}

const createRequest = <P = any, R = any>(methodService: any) => {
  const { method, url, showError } = methodService;

  const _requestService = (params?: P, options?: any): Promise<R> => {
    const reqUrl = `${url}`;
    const reqOpts = { ...options, showError };
    if (method.toLocaleUpperCase() === 'GET') {
      reqOpts['data'] = params;
    } else if (method.toLocaleUpperCase() === 'POST') {
      reqOpts['data'] = params;
    } else {
      reqOpts['data'] = params;
    }
    reqOpts['method'] = method;
    return request({ url: reqUrl, ...reqOpts });
  };

  return _requestService;
};

const getServiceApi = <P, R>(methodService: any) => {
  return createRequest<P, R>(methodService);
};

const setException = (exception: any) => {
  console.log(exception);
};

export { request, baseUrl, abortRequest, getServiceApi, setException };
