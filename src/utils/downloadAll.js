/*
 * @Author: your name
 * @Date: 2021-11-06 14:47:43
 * @LastEditTime: 2021-11-06 14:49:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\utils\downloadAll.js
 */
import axios from "@/utils/axios";
import { callbackify } from "util";

const request = axios();

const createAnchorLink = (href, filename = "") => {
  const a = document.createElement("a");
  a.download = filename;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const downloadAll = ({
  url,
  filename,
  callback,
  // type = "application/pdf",
  type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
  data,
}) => {
  request({
    url: url,
    method: "POST",
    responseType: "blob", // 响应类型必须设置
    getResponse: true,
    data,
  })
    .then((response) => {
      let blob = new Blob([response.data], { type });
      const blobUrl = window.URL.createObjectURL(blob);
      // 获取响应中的filename
      // const contentDisposition = response.headers.get('Content-Disposition');
      // const resFileName =
      //   contentDisposition &&
      //   decodeURI(contentDisposition.split('filename=')?.[1]);
      // const downloadFileName = decodeURIComponent(resFileName ?? filename);
      createAnchorLink(blobUrl, filename);
      window.URL.revokeObjectURL(blobUrl);
      callback && callback(true);
    })
    .catch((err) => {
      callback && callback(false);
    });
};

export { downloadAll };
