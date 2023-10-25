import {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useSetState } from "@/hooks";
import { View } from "@tarojs/components";
import { getRect } from "@/utils/common";
import compute from "@/utils/compute";
import { ComMagicCubeLayout, ComMagicCubeProps, SubEntryItem } from "./type";
import "./index.scss";
import ScImage from "../ScImage";
import React from "react";
import  {RegAppUIComponent,type AppUIComponents} from '@sceditor/core'
type ComMagicCubeState = {
  /** 是否添加margin */
  addMarginflag: boolean;
  /** 内部布局 */
  innerLayout: ComMagicCubeLayout;
};

const defaultLayout = {
  width: 4,
  height: 2,
  subEntry: [
    {
      width: 2,
      height: 2,
      x: 0,
      y: 0,
      url: "https://img01.yzcdn.cn/public_files/2019/03/05/ffac71e201ca5dc855720309e3bb7e39.jpg!large.webp",
    },
    {
      width: 2,
      height: 2,
      x: 2,
      y: 0,
      url: "https://img01.yzcdn.cn/public_files/2019/03/05/e11bbded80ea5db515aa23c2459f1dc1.jpg!large.webp",
    },
  ],
};
/** 魔方 */
const ComMagicCube: AppUIComponents<ComMagicCubeProps> = (props) => {
  const { pageMargin = 0, gutter = 0, id, layout } = props;

  console.log(props);
  const prefixCls = "com-magic-cube";

  const ref = useRef<any>(null);

  const widthRef = useRef<number>(375);

  const [state, setState] = useSetState<ComMagicCubeState>({
    addMarginflag: false,
    innerLayout: layout,
  });
  /** 页面间距 */
  const margin = useMemo(() => {
    return state.addMarginflag ? Number(pageMargin || 0) : 0;
  }, [pageMargin, state.addMarginflag]);
  /** 图片间距 */
  const gap = useMemo(() => {
    return state.addMarginflag ? Number(gutter || 0) : 0;
  }, [gutter, state.addMarginflag]);
  /** 基础宽度 */
  const baseWidth = useMemo(() => {
    return compute.divide(
      widthRef.current - margin * 2,
      state.innerLayout.width
    );
  }, [state.innerLayout.width, margin]);
  /** 基础间距 */
  const baseGap = useMemo(() => {
    return compute.divide(gap, state.innerLayout.width);
  }, [state.innerLayout.width, gap]);

  /** 容器高度 */
  const contentStyle: CSSProperties = useMemo(() => {
    const width = widthRef.current - margin * 2 + gap;
    return {
      width: width,
      height: Math.ceil(
        (width / state.innerLayout.width) * state.innerLayout.height
      ),
    };
  }, [margin, gap, state.innerLayout.width, state.innerLayout.height]);

  const getItemStyles = (it: SubEntryItem): CSSProperties => {
    const gapMargin = compute.divide(gap, 2);
    const xGap = compute.multiply(baseGap, it.x);
    const yGap = compute.multiply(baseGap, it.y);

    const widthGap = compute.multiply(
      baseGap,
      state.innerLayout.width - it.width
    );
    const heightGap = compute.multiply(
      baseGap,
      state.innerLayout.height - it.height
    );

    /** 宽 */
    const width = compute.multiply(it.width, baseWidth) - widthGap;
    /** 高 */
    const height = compute.multiply(it.height, baseWidth) - heightGap;
    /** 定位 top */
    const top = compute.add(compute.multiply(it.y, baseWidth), yGap);
    /** 定位 left */
    const left = compute.add(compute.multiply(it.x, baseWidth) + margin, xGap);

    console.log("定位", {
      margin: gapMargin,
      width,
      height,
      top,
      left,
    });

    return {
      margin: gapMargin,
      width,
      height,
      top,
      left,
    };
  };

  /** 获取宽度 */
  useEffect(() => {
    if (id) {
      getRect(`#${id}`).then((res) => {
        widthRef.current = res.width;
      });
    } else {
      if (ref.current.getBoundingClientRect) {
        widthRef.current = ref.current.getBoundingClientRect().width;
      }
    }

    console.log(ref.current.getBoundingClientRect());
  }, [id, ref]);

  useLayoutEffect(() => {
    const list = layout.subEntry.filter((it) => it.url != null);
    let flag = list.length > 0;
    setState({
      addMarginflag: flag,
      innerLayout: flag ? layout : defaultLayout,
    });
  }, [JSON.stringify(layout), setState]);

  return (
    <View className={prefixCls} ref={ref} id={id}>
      <View
        className={`${prefixCls}-warp`}
        style={{
          margin: `-${compute.divide(gap, 2)}px`,
          ...contentStyle,
        }}
      >
        {state.innerLayout.subEntry.map((it, index) => {
          return (
            <View
              key={`cube-${index}`}
              className={`${prefixCls}-item`}
              style={getItemStyles(it)}
            >
              <ScImage src={it.url} showError={false}></ScImage>
            </View>
          );
        })}
      </View>
    </View>
  );
};
ComMagicCube.cmpType='MagicCube'
export default RegAppUIComponent(ComMagicCube);
