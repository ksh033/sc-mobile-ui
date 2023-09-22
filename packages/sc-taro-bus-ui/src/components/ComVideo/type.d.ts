import { CornerType, UploadFile } from "../types/common";

export type ComVideoProps = {
  /** 视频来源类型 */
  type?: "select" | "link";
  /** 视频内容 */
  videoObj?: UploadFile;
  /** 远程地址 */
  remoteUrl?: string;
  /** 是否显示封面 */
  showCover?: boolean;
  /** 封面图片 */
  coverImage?: string;
  /** 显示进度条 */
  showProgress?: boolean;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 视频倒角 */
  cornerType?: CornerType;
  /** 页面边距  */
  pageMargin?: number;
};
