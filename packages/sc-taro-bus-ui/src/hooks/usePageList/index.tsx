
import { useSetState } from '@/hooks';
import nextTick from '@/utils/nextTick';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useMemo, useRef } from 'react';

export type QueryParams = {
  current: number;
  size: number;
};

type Option = {
  defaultPageSize?: number;
  queryPage: (params: QueryParams) => Promise<any>;
};

type UsePageListState<T> = {
  loadMoreStatus: any;
  list: T[];
};

export type UsePageListResp<T> = UsePageListState<T> & {
  /**刷新数据 */
  reLoadPage: () => void;
  /** 上拉触底时的回调 */
  onReachBottom: () => void;
  /** 跟新列表 */
  updateList: (list: T[]) => void;
  /** 总数 */
  recordCount: number;
};
/**页面下拉刷新和上拉加载 */
function UsePageList<T>(options: Option): UsePageListResp<T> {
  const { defaultPageSize = 10, queryPage } = options;
  const pageNo = useRef<number>(1);
  const pageSize = useRef<number>(defaultPageSize);
  const recordCount = useRef<number>(0);
  const pullDownLoading = useRef<boolean>(false);
  const freshing = useRef<boolean>(false);

  const [state, setState] = useSetState<UsePageListState<T>>({
    loadMoreStatus: 'loading',
    list: [],
  });

  const listRef = useRef<T[]>([]);
  /** 获取loading状态 */
  const _getLoadMoreStatus = (list: string | any[], count: number): any => {
    if (list.length >= count) {
      return 'normal';
    }
    return 'down';
  };
  // 拼接参数
  const _splicList = (newGoodsList: any[], count: number) => {
    const oldList = listRef.current;
    const nList = [...oldList, ...newGoodsList];

    const loadMoreStatus = _getLoadMoreStatus(nList, count);
    pullDownLoading.current = false;
    recordCount.current = count;

    listRef.current = nList;
    setState({
      list: nList,
    });
    setTimeout(() => {
      setState({
        loadMoreStatus: loadMoreStatus,
      });
    }, 500);
  };

  const isPromise = (obj: (params: QueryParams) => Promise<any>) => {
    return typeof obj === 'function';
  };

  // 请求方法
  const _requestPageList = () => {
    if (isPromise(queryPage)) {
      queryPage({
        current: pageNo.current,
        size: pageSize.current,
      })
        .then((res) => {
          console.log('res', res);
          freshing.current = false;

          if (Array.isArray(res)) {
            _splicList(res, res.length);
          } else if (Array.isArray(res.records)) {
            const total = res.total;
            const records = res.records;
            _splicList(records, total);
          }
          Taro.hideLoading({
            fail: () => {},
          });
          Taro.stopPullDownRefresh();
          return res;
        })
        .catch(() => {
          freshing.current = false;
          pullDownLoading.current = false;
          setState({
            loadMoreStatus: 'down',
          });
          Taro.stopPullDownRefresh();
        });
    }
  };

  /** 下拉刷新时的回调。 */
  usePullDownRefresh(() => {
    listRef.current = [];
    setState({
      list: [],
    });
    nextTick(() => {
      console.log('usePullDownRefresh');
      _requestPageList();
    });
  });
  /** 上拉加载 */
  const onReachBottom = () => {
    if (
      freshing.current ||
      state.list.length >= recordCount.current ||
      recordCount.current === 0
    ) {
      return;
    }

    freshing.current = true;
    pageNo.current = ++pageNo.current;
    pullDownLoading.current = true;
    setState({
      loadMoreStatus: 'loading',
    });
    nextTick(() => {
      _requestPageList();
    });
  };

  /** 上拉触底时的回调。 */
  useReachBottom(() => {
    console.log('onReachBottom');
    onReachBottom();
  });

  /** 刷新页面 */
  const reLoadPage = () => {
    pageNo.current = 1;
    listRef.current = [];
    setState({
      list: [],
      loadMoreStatus: 'loading',
    });
    nextTick(() => {
      _requestPageList();
    });
  };

  const updateList = (nList: T[]) => {
    setState({
      list: nList,
    });
  };

  const outList = useMemo(() => {
    return state.list;
  }, [JSON.stringify(state.list)]);

  return {
    recordCount: recordCount.current,
    list: outList,
    loadMoreStatus: state.loadMoreStatus,
    reLoadPage: reLoadPage,
    onReachBottom: onReachBottom,
    updateList,
  };
}

export default UsePageList;
