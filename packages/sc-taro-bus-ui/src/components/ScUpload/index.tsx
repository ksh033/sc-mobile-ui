import { Uploader } from "@sc-mobile/sc-taro-ui";
import type {

  UploaderProps,
} from "@sc-mobile/sc-taro-ui";
// import { getToken } from "@/actions/useUser";
import Taro from "@tarojs/taro";
import { useRef, useState } from "react";
import { useUpdateEffect } from "@/hooks";
import { imageUrl } from "@/utils/busUtils";
import { View } from "@tarojs/components";
import {useConfig} from "../ConfigProvider"
import "./index.scss";
import React from "react";

type FileItemStatus = "ready" | "uploading" | "success" | "error" | "removed";
export type FileItem = {
  status?: FileItemStatus;
  message?: string;
  uid?: string;
  name?: string;
  url?: string;
  type?: string;
  path?: string;
  percentage?: string | number;
  formData?: any;
  fileUrl?: string;
};

type FileType<T> = {
  [key: string]: T;
};

type ScUploadProps = Partial<
  Pick<
    UploaderProps,
    | "name"
    | "maxFileSize"
    | "defaultValue"
    | "uploadLabel"
    | "maxCount"
    | "onChange"
    | "onUpdate"
    | "multiple"
    | "mediaType"
    | "url"
    | "sourceType"
  >
> & {
  value?: FileType<any>[];
  onBeforeRead?: (files: FileItem[]) => boolean;
};

const ScUpload: React.FC<ScUploadProps> = (props) => {
  const {
    maxFileSize = 1024 * 1024 * 2,
    defaultValue = [],
    name = "file",
    maxCount = 10,
    uploadLabel = "上传凭证",
    onChange,
    onUpdate,
    multiple = false,
    mediaType = ["image", "video"],
    url = "file/api/file/upload",
    sourceType = ["album", "camera"],
    onBeforeRead,
  } = props;

  const [fileList, setFileList] = useState<FileType<any>[]>(defaultValue);
   const config=useConfig()
  const uploadRef = useRef<any>(null);
  /** 存储数据 */
  const dataMap = useRef<Record<string, any>>({});
  /** 每次上次得数量 */
  const readyNum = useRef<number>(0);
  /** 响应次数 */
  const responenNum = useRef<number>(0);

  useUpdateEffect(() => {
    setFileList(defaultValue);
  }, [JSON.stringify(defaultValue)]);

  const onDelete = (file: FileItem, _fileList: FileType<any>[]) => {
    if (Array.isArray(fileList)) {
      const newFileList = fileList.filter((item) => {
        return item.path !== file.path;
      });
      onChange?.({ fileList: newFileList });
      setFileList(newFileList);
    }
  };

  const beforeXhrUpload = (taroUploadFile: any, options: any) => {
    // const token = getToken();
    const token = "";
    Taro.showLoading({
      title: "上传中",
      mask: true,
    });
    console.log("options", options);
    const uploadTask = taroUploadFile({
      url: options.url,
      filePath: options.taroFilePath,
      fileType: options.fileType,
      header: {
        "Content-Type": "multipart/form-data",
        token: token,
        ...options.headers,
      },
      formData: options.formData,
      name: "file",
      success(response: { errMsg: any; statusCode: number; data: string }) {
        Taro.hideLoading({
          fail: function () {},
        });
        if (options.xhrState == response.statusCode) {
          options.onSuccess?.(response, options);
        } else {
          Taro.showToast({
            icon: "none",
            title: "上传失败",
          });
          options.onFailure?.(response, options);
        }
      },
      fail(e: any) {
        Taro.hideLoading({
          fail: function () {},
        });
        Taro.showToast({
          icon: "none",
          title: "上传失败",
        });
        options.onFailure?.(e, options);
      },
    });
    options.onStart?.(options);
    uploadTask.progress(
      (res: {
        progress: any;
        totalBytesSent: any;
        totalBytesExpectedToSend: any;
      }) => {
        options.onProgress?.(res, options);
      }
    );
  };
  const onSuccess = (param: any) => {
    const result = JSON.parse(param.responseText.data);
    if (result.success) {
      // 存储请求回来得值
      dataMap.current[param.option.taroFilePath] = result.data;
      responenNum.current = responenNum.current + 1;
      // const newFileList = fileList;
      // newFileList.push()
      if (Array.isArray(param.fileList) && param.fileList.length > 0) {
        // 响应次数 要等于 上次文件个数
        if (responenNum.current === readyNum.current) {
          const newList = param.fileList.map((it:any) => {
            if (dataMap.current[it.path]) {
              const data = dataMap.current[it.path] || {};
              return {
                ...it,
                ...data,
                status: "success",
                thumbnailUrl: imageUrl(data.thumbnailUrl),
              };
            }
            return it;
          });
          onUpdate?.(newList);
          console.log("newList", newList);
          onChange?.({ fileList: newList });
          setFileList(newList);
        }
      }
    } else {
      Taro.showToast({
        icon: "none",
        title: "上传失败",
      });
    }
  };
  /** 监听值得变化 */
  const handleChnage = (param: { fileList: FileType<React.ReactNode>[] }) => {
    dataMap.current = {};
    responenNum.current = 0;

    let flag = true;
    const allList = Array.isArray(param.fileList) ? param.fileList : [];
    const readyList = allList.filter((it) => it.status === "ready");
    readyNum.current = readyList.length;
    if (readyList.length > 0) {
      if (onBeforeRead) {
        flag = onBeforeRead(allList);
      }
      if (flag) {
        uploadRef.current?.submit();
      }
    }
  };

  return (
    <View className="sc-upload">
      <Uploader
        defaultValue={fileList}
        value={fileList}
        onDelete={onDelete}
        maxFileSize={maxFileSize}
        multiple={multiple}
        name={name}
        url={`${config.baseApiUrl}${url}`}
        maxCount={maxCount}
        beforeXhrUpload={beforeXhrUpload}
        uploadLabel={uploadLabel}
        onSuccess={onSuccess}
        mediaType={mediaType}
        sourceType={sourceType}
        autoUpload={false}
        onChange={handleChnage}
        ref={uploadRef}
        headers={{
          version: config.version,
          "sys-code": "common",
        }}
      />
    </View>
  );
};

export default ScUpload;
