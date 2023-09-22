/** 链接参数 */
export type Link = {
  /** 链接标题 */
  linkTitle?: string;
  /** 跳转地址 */
  linkValue?: string;
};
/** 基础图片处理 */
export type BaseImage = {
  /** 图片id */
  imageId?: string;
  /** 图片地址 */
  imageUrl?: string;
  /** 缩略图 */
  imageThumbUrl?: string;
  /** 图片宽度 */
  imageWidth?: number;
  /**图片高度 */
  imageHeight?: number;
};

/**
 * 倒角类型 straight 直角 round 圆角
 */
export type CornerType = "straight" | "round";

export type ProgressAriaProps = Pick<
  React.AriaAttributes,
  "aria-label" | "aria-labelledby"
>;
export type UploadFileStatus =
  | "error"
  | "success"
  | "done"
  | "uploading"
  | "removed";

export interface UploadFile<T = any> extends ProgressAriaProps {
  uid: string;
  size?: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  url?: string;
  status?: UploadFileStatus;
  percent?: number;
  thumbUrl?: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
  response?: T;
  error?: any;
  linkProps?: any;
  type?: string;
  xhr?: T;
  preview?: string;
  width?: number;
  height?: number;
  fileId: string;
}
