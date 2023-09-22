export const GoodsStyleClassEnum = {
  /** 无边白底 */
  NO_BORDER_BG_WHITE: "list",
  /** 卡片投影 */
  CARD_SHADOW: "card-shadow",
  /** 描边白底 */
  WHITE_BORDER: "card-border",
  /** 无边透明底 */
  NO_BORDER_BG_TRANSPARENT: "simple",
};

export const BizSceneMap:any = {
  PRE_SALE_FOODS: "次日达",
  SHOP_TAKEAWAY: "门店外卖",
};

// 图片比例
export const DisplayScale = {
  "0": "3:2",
  "1": "1:1",
  "2": "3:4",
  "3": "16:9",
};

export const heightScale = (scale: keyof typeof DisplayScale) => {
  const scaleStr = DisplayScale[scale];
  if (scaleStr) {
    const scaleList = scaleStr.split(":");
    if (Array.isArray(scaleList) && scaleList[0] && scaleList[1]) {
      return Number(
        Number(
          (100 / Number(scaleList[0] || 0)) * Number(scaleList[1] || 0)
        ).toFixed(2)
      );
    }
  }
  return 100;
};
