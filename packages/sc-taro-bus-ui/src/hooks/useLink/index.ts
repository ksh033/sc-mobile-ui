import PageTaro from "@/utils/pageJumpUtils";
import { postParam } from "@/utils/common";
import { request } from "@/utils/request";
// import scan from "@/utils/scan";
import Taro from "@tarojs/taro";

/** 跳转类型 */

type UseLink = {
  toLink: (linkItem:any) => void;
};

function useLink(): UseLink {
 // const dispatch = useDispatch();
  // const { loginFlag, goLogin } = useLogin();

  /** 程序内部跳转 */
  const appLink = (linkItem: any) => {
    const query = {
      linkValue: linkItem.linkValue,
      // bizType: linkItem.bizType,
      // bizScene: linkItem.bizScene,
      // distributeWay: linkItem.distributeWay,
    };
    const path = `${linkItem.linkPath}?${postParam(query)}`;
    PageTaro.navigateTo({
      url: path,
      fail: function () {
        PageTaro.switchTab({
          url: path,
          fail: function (res) {
            const { errMsg } = res;
            if (errMsg.indexOf("not found") > -1) {
              Taro.showToast({
                title: "找不到对应的页面地址",
                icon: "error",
                duration: 2000,
              });
            }
          },
        });
      },
    });
  };
  /** 外链跳转 */
  const urlLink = (linkItem: any) => {
    if (linkItem?.linkPath) {
      // dispatch(setLinkParams(linkItem?.linkPath));
      PageTaro.navigateTo({
        url: `/pages/externallink/index`,
      });
    }
  };

  /** 请求接口再跳转 */
  const serviceLink = async (linkItem:any) => {
    if (linkItem) {
      let obj = {
        linkPath: linkItem.linkPath,
        linkSelectType: linkItem.linkSelectType,
        linkValue: linkItem.linkValue,
        linkTriggerType: "BROWSE",
      };
      let result = await request({
        url: `${obj.linkPath}`,
        method: "POST",
        data: obj,
      });
      if (result.jumpFlag) {
        if (result.linkType === "APP") {
          appLink(result);
        } else if (result.linkType === "URL") {
          urlLink(result);
        }
      }
    }
  };

  /** 扫码 */
  const scanLink = (linkItem:any) => {
    // scan.getScanCode();
  };

  /** 跳转类型 */
  const map:any = {
    APP: appLink,
    URL: urlLink,
    SERVICE: serviceLink,
    MINIAPP_SCAN: scanLink,
  };
  const toLink = (linkItem: any) => {
    if (linkItem && map[linkItem?.linkType || ""]) {
      map[linkItem?.linkType || ""](linkItem);
    }
    // if (loginFlag) {

    // } else {
    //   goLogin();
    // }
  };

  return { toLink };
}

export default useLink;
