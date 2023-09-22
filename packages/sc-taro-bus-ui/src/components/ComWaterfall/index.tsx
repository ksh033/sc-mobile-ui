/* eslint-disable react-hooks/exhaustive-deps */
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { imageUrl } from "@/utils/busUtils";
import { pxTransform } from "@/utils/common";
import { useUpdateEffect } from "@/hooks";
import nextTick from "@/utils/nextTick";
import classnames from "classnames";
import { mergeStyle } from "../utils/styles";
import "./index.scss";

export type ComWaterfallRef = {
  /** 重置 */
  reset: () => void;
};
type ComWaterfallProps = {
  /** 点击事件 */
  onClick?: (item: any, index: number) => void;
  /** 自定义渲染列表 */
  renderItem?: (item: any, index: number) => React.ReactNode;
  /** 间距 */
  gutter?: number;
  /** 唯一标识的key */
  idKey?: string;
  /** 列数 */
  colNum?: number;
  /** 图片的key */
  imageKey?: string;
  /** 是否后端返回顺序显示 */
  order?: boolean;
  /** 数据列表 */
  list: any[];
  className?: string;
  style?: CSSProperties;
};
const maxHeight = pxTransform(458) || 200;
const minHeight = pxTransform(230) || 100;

type ColItem = any[];
const maxInitCols = 5;

/** 瀑布流 */
const ComWaterfall = React.forwardRef<ComWaterfallRef, ComWaterfallProps>(
  (props, ref) => {
    const {
      renderItem,
      gutter = 10,
      onClick,
      colNum = 2,
      idKey = "id",
      imageKey = "image",
      order = true,
      list = [],
      style = {},
      className,
    } = props;

    const [cols, setCols] = useState<ColItem[]>([]);
    /** 加载中的 */
    const [loadingList, setLoadingList] = useState<any[]>([]);
    /**  列宽度 */
    const colWidth = useRef<number>(0);
    /** 单次加载个数 */
    const onceMaxNum = useRef<number>(4);
    /** 正在插入中 */
    const appending = useRef<boolean>(false);
    /** 单次加载完毕的列表 */
    const thisTimeloadedList = useRef<any[]>([]);
    /** 等待加载的 */
    const waitList = useRef<any[]>([]);
    /** 加载完毕的 */
    const loadedList = useRef<any[]>([]);

    const waitAppendList = useRef<any[]>([]);

    const loading = useRef<boolean>(false);

    const colsRef = useRef<ColItem[]>([]);

    const viewRef = useRef<any>(null);

    const initWidthColsNum = useRef<number>(0);

    const monitorList = useMemo(() => {
      return list.map((it) => it[idKey]);
    }, [JSON.stringify(list), idKey]);

    const loadingMonitorList = useMemo(() => {
      return loadingList.map((it) => it[idKey]);
    }, [JSON.stringify(loadingList), idKey]);

    const clickHandle = (item: any, index: number) => {
      onClick?.(item, index);
    };

    const initCols = (updateDom = true) => {
      let _cols = new Array(colNum);
      for (let i = 0; i < colNum; i++) {
        _cols[i] = [];
      }
      colsRef.current = _cols;
      if (updateDom) {
        setCols(_cols);
      }
    };

    const initColWidth = () => {
      Taro.createSelectorQuery()
        .select(".waterfall .col")
        .boundingClientRect((rect:any) => {
          if (rect) {
            let cw = rect.width;
            colWidth.current = cw;
            initWidthColsNum.current = 0;
          } else {
            // 第一次取不到就继续取
            if (initWidthColsNum.current < maxInitCols) {
              initWidthColsNum.current = initWidthColsNum.current + 1;
              initColWidth();
            }
          }
        })
        .exec();
    };

    const filterRepeat = useCallback(
      (rlist:any) => {
        let res: any[] = [];
        rlist.forEach((item:any) => {
          if (
            !waitList.current.find((i) => i[idKey] === item[idKey]) &&
            !loadingList.find((i) => i[idKey] === item[idKey]) &&
            !loadedList.current.find((i) => i[idKey] === item[idKey])
          ) {
            res.push(item);
          }
        });
        return res;
      },
      [idKey, loadingList]
    );

    const checkUpdate = (rlist:any) => {
      const newCols = [...colsRef.current];
      rlist.forEach((item:any) => {
        let loadedIndex = -1;
        let loaded: any = null;
        newCols.forEach((col) => {
          loadedIndex = col.findIndex((i) => i[idKey] === item[idKey]);
          if (loadedIndex !== -1) {
            loaded = col[loadedIndex];
            item.imgHeight = loaded.imgHeight;

            let isDiff = JSON.stringify(loaded) !== JSON.stringify(item);

            if (isDiff) {
              col.splice(loadedIndex, 1, item);
            }
            return;
          } else {
          }
        });
      });
      colsRef.current = newCols;
      setCols(newCols);
    };

    /**监听列表变化 */
    const observersList = (rlist: any[]) => {
      if (!Array.isArray(rlist)) {
        return;
      }
      // console.log('list update:', list)
      // 已加载的，值发生变化，进行替换
      const newList = list.map((item) => {
        if (item && item[imageKey]) {
          item[imageKey] = imageUrl(item[imageKey]);
        }

        return item;
      });
      checkUpdate(newList);

      // 过滤掉 等待加载、加载中、加载完毕的
      let _list = filterRepeat(newList);
      // console.log('_list', _list)
      let len = _list.length;
      if (loading.current) {
        // 有正在加载的,将未加载的图片加入等待队列
        waitList.current = [...waitList.current, ..._list];
      } else {
        if (order) {
          // 按顺序显示
          if (len > onceMaxNum.current) {
            waitList.current = _list.slice(onceMaxNum.current, len);
            _list = _list.slice(0, onceMaxNum.current);
            len = onceMaxNum.current;
          }
        }
        thisTimeloadedList.current = new Array(len).fill(null);
        if (len > 0) {
          loading.current = true;
        }
        setLoadingList(_list);
      }
    };

    const _render = (rlist:any, callback:any) => {
      const newCols = [...colsRef.current];
      appending.current = true;
      for (let i = 0; i < rlist.length; i++) {
        // const arr = await getAllRect('.waterfall .col');
        const item = rlist[i];
        // const rects = arr;
        //console.log('arr', arr);
        // let colsHeight = Array.isArray(rects)
        //   ? rects.map((it) => it.height)
        //   : [];
        let minHeightIndex = i % colNum;
        let len =
          newCols[minHeightIndex] != null ? newCols[minHeightIndex].length : 0;
        if (minHeightIndex > -1) {
          newCols[minHeightIndex][len] = item;
        }
      }
      appending.current = false;
      colsRef.current = newCols;
      setCols(newCols);
      typeof callback === "function" && callback();
    };

    const checkOutOfOrderLoading = () => {
      if (
        thisTimeloadedList.current.findIndex((item) => item === null) === -1 &&
        thisTimeloadedList.current.length === loadingList.length
      ) {
        setTimeout(() => {
          loading.current = false;
        }, 100);
      } else {
        loading.current = true;
      }
    };

    // 不按按顺序显示时，插入页面
    const appendOutOfOrder = (itm:any) => {
      waitAppendList.current.push(itm);
      if (!appending.current) {
        let renderList = [...waitAppendList.current];
        loadedList.current = [...loadedList.current, ...renderList];
        loading.current = true;

        waitAppendList.current = [];
        _render(renderList, () => {
          let renderList2 = JSON.parse(JSON.stringify(waitAppendList.current));
          loadedList.current = [...loadedList.current, ...renderList2];
          waitAppendList.current = [];

          if (renderList2.length > 0) {
            _render(renderList2, () => {
              checkOutOfOrderLoading();
            });
          } else {
            checkOutOfOrderLoading();
          }
        });
      }
    };

    // 按顺序显示时，检查这一波是否加载完毕,加载完插入页面
    const appendInOrder = () => {
      if (
        thisTimeloadedList.current.findIndex((item) => item == null) === -1 &&
        thisTimeloadedList.current.length === loadingList.length
      ) {
        // 这一波元素加载完毕
        // 插入到页面中
        _render(thisTimeloadedList.current, () => {
          loadedList.current = [
            ...loadedList.current,
            ...thisTimeloadedList.current,
          ];
          // this.data.thisTimeloadedList = []
          if (waitList.current.length > 0) {
            loading.current = true;
            let _list = JSON.parse(JSON.stringify(waitList.current));
            let len = _list.length;
            if (len > onceMaxNum.current) {
              waitList.current = _list.slice(onceMaxNum.current, len);
              _list = _list.slice(0, onceMaxNum.current);
              len = onceMaxNum.current;
            } else {
              waitList.current = [];
            }
            thisTimeloadedList.current = new Array(len).fill(null);

            setLoadingList(_list);
          } else {
            console.log("append end");
            loading.current = false;
          }
        });
      }
    };

    // 图片加载失败
    const onImageError = (index: number) => {
      let item = loadingList[index];
      // 高度设为1，不显示图片
      if (item != null) {
        item["imgHeight"] = minHeight;
        thisTimeloadedList.current[index] = item;

        if (order) {
          appendInOrder();
        } else {
          appendOutOfOrder(item);
        }
      }
    };

    /** 图片加载成功 */
    const onImageLoad = (
      detail: Taro.getImageInfo.SuccessCallbackResult,
      index: number
    ) => {
      let item = loadingList[index];
      let oImgW = detail.width; // 图片原始宽度
      let oImgH = detail.height; // 图片原始高度
      let scale = colWidth.current / oImgW; // 比例计算
      let imgHeight = Math.floor(oImgH * scale); // 自适应高度
      if (imgHeight) {
        if (imgHeight < minHeight) {
          imgHeight = minHeight;
        }

        if (imgHeight > maxHeight) {
          imgHeight = maxHeight;
        }
      }
      item.imgHeight = imgHeight;

      thisTimeloadedList.current[index] = item;
      if (order) {
        // 按顺序显示
        appendInOrder();
      } else {
        // 不按顺序显示
        appendOutOfOrder(item);
      }
    };

    useLayoutEffect(() => {
      if (viewRef.current) {
        initWidthColsNum.current = 0;
        initColWidth();
      }
    }, [viewRef.current]);

    useLayoutEffect(() => {
      initCols();
    }, []);

    useEffect(() => {
      observersList(list);
    }, [monitorList.join("")]);

    useImperativeHandle(ref, () => {
      return {
        reset,
      };
    });

    const reset = () => {
      initCols(false);
      waitList.current = [];
      thisTimeloadedList.current = [];
      loadedList.current = [];
      waitAppendList.current = [];
      loading.current = false;
      setLoadingList([]);

      nextTick(() => {
        initWidthColsNum.current = 0;
        initColWidth();
      });
    };

    useUpdateEffect(() => {
      if (Array.isArray(loadingList) && loadingList.length > 0) {
        for (let i = 0; i < loadingList.length; i++) {
          const item = loadingList[i];
          if (item && item[imageKey]) {
            Taro.getImageInfo({
              src: item[imageKey],
              success(res) {
                onImageLoad(res, i);
              },
              fail() {
                onImageError(i);
              },
            });
          } else {
            onImageError(i);
          }
        }
      }
    }, [loadingMonitorList.join("")]);

    return (
      <View
        className={classnames("waterfall", className)}
        style={mergeStyle({}, style as object)}
        ref={viewRef}
      >
        {cols.map((col: any, idx: number) => {
          return (
            <View
              key={`col-${idx}`}
              className="col"
              style={{ marginRight: gutter }}
            >
              {col.map((item:any, index:any) => {
                return (
                  <View
                    key={`item-${index}`}
                    className="item"
                    onClick={() => {
                      clickHandle(item, index);
                    }}
                  >
                    {renderItem?.(item, index) || null}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
);

export default React.memo(ComWaterfall);
