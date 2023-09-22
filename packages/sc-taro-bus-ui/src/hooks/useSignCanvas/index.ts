//@ts-nocheck
import { useState, useEffect, useRef } from 'react';
import layoutzero from './layout/zero';
import layoutone from './layout/one';
import layouttow from './layout/tow';
import layoutthree from './layout/three';
import layoutfore from './layout/fore';
import useSetState from '../useSetState';

export type StatisticsProps = {
  title: string;
  signCountText: string;
  signText: string;
};

const layoutList = [
  layoutzero.layoutzero,
  layoutone.layoutone,
  layouttow.layouttow,
  layoutthree.layoutthree,
  layoutfore.layoutfore,
];

export type UseSignCanvasState = {
  layouts: any[];
  statist?: StatisticsProps;
  layoutItem?: any;
};

export type useSignCanvasConfig = {
  selector?: string;
};

const useSignCanvas = ({ selector }: useSignCanvasConfig) => {
  const [data, setData] = useSetState<UseSignCanvasState>({
    layouts: layoutList,
  });
  // 画布对象
  const canvasDrag = useRef<any>();

  const toCanvasData = (layoutItem) => {
    const newItem = JSON.parse(JSON.stringify(layoutItem));
    if (newItem.hasOwnProperty('backgroundUrl')) {
      newItem.backgroundUrl = data.statist?.imageUrl;
    }

    newItem.graph = newItem.graph.map((item) => {
      const { dataIndex, follow, extValueBefor = '' } = item;
      if (dataIndex) {
        item.value = extValueBefor + data.statist?.[dataIndex];
      }
      if (follow) {
        const followItem = newItem.graph.find((it) => {
          return follow === it.dataIndex;
        });
        if (data.statist?.[follow] + '') {
          item.x =
            item.x +
            followItem.x +
            (followItem.fontSize / 2) * (data.statist?.[follow] + '').length;
        }
      }
      return item;
    });

    return newItem;
  };

  const setLayout = (layoutId: string) => {
    const findItem = data.layouts.find(({ id }) => {
      return id === layoutId;
    });
    const layoutItem = toCanvasData(findItem);

    if (!data.layoutItem || data.layoutItem.id !== layoutId) {
      if (layoutItem.backgroundUrl) {
        canvasDrag.current &&
          canvasDrag.current.clearCanvas &&
          canvasDrag.current.clearCanvas();
      } else {
        canvasDrag.current && canvasDrag.current.clearCanvas(true);
      }
      setData({
        layoutItem: layoutItem,
      });
      if (layoutItem.backgroundUrl) {
        canvasDrag.current &&
          canvasDrag.current.changeBgImage &&
          canvasDrag.current.changeBgImage(layoutItem.backgroundUrl);
      }
    } else {
      if (layoutItem.backgroundUrl) {
        canvasDrag.current &&
          canvasDrag.current.changeBgImage &&
          canvasDrag.current.changeBgImage(layoutItem.backgroundUrl);
      }
    }
  };

  useEffect(() => {
    if (data.statist) {
      data.layouts.forEach((item) => {
        if (item.useFlag) {
          setLayout(item.id);
        }
      });
    }
  }, [JSON.stringify(data.statist)]);

  const loadLayout = (result: StatisticsProps) => {
    setData({
      statist: result,
    });
  };

  return { loadLayout };
};

export default useSignCanvas;
