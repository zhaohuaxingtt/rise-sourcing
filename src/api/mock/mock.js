import axios from "@/utils/axios";
import store from '@/store'

const requst = axios();
const requstBase = axios(process.env.VUE_APP_BASEINFO);
const requstParts = axios(process.env.VUE_APP_PARTS_BIDDING);
const addUserId = function (config) {
  console.log(config.url, config);
  config.params = {
    ...config.params,
    userId: store.state.permission.userInfo.id,
  }
  return config;
}
requst.interceptors.request.use(addUserId);
requstBase.interceptors.request.use(addUserId);
requstParts.interceptors.request.use(addUserId);

// 获取rfqCode
export function getRfqCodesList(data) {
  return requst({
    url: `/rise-mock/mockService/getRfqCodes`,
    method: "POST",
    data,
  });
}

// 获取供应商信息
export function getSupplierInfo(data) {
  return requst({
    url: `/rise-mock/mockService/getSupplierInfo`,
    method: "POST",
    data,
  });
}

// 获取供应商层级
export function getSuppliers(data) {
  return requst({
    url: `/rise-mock/mockService/getSuppliers`,
    method: "POST",
    data,
  });
}

//下载文件
export function downloadFile(fileId) {
  return `/rise-mock/mockService/files/download/${fileId}`;
}

// 上传文件
export function uploadFile(data) {
  return requst({
    url: `/rise-mock/mockService/files/upload-file`,
    method: "POST",
    data,
  });
}

//通过文件 ID 下载文件, 返回字节流
export function getFileId(fileId) {
  return requst({
    url: `/rise-mock/mockService/files/download/${fileId}`,
    method: "GET",
    responseType: "blob",
  });
}

// 根据 ID 获取供应商信息
export function getSupplierInfoById({ supplierId }) {
  return requst({
    url: `/rise-mock/mockService/getSupplierInfoById/${supplierId}`,
    method: "POST",
  });
}

// 获取货币单位
export function getCurrencyUnit(data) {
  return requstBase({
    url: `/api/currency`,
    method: "GET",
    data,
  });
}

// 
export function getUnits(data) {
  return requstBase({
    url: `/units`,
    method: "POST",
    data,
  });
}

// 第三方接口汇率
export function getParities(currency) {
  return requstBase({
    url: `/api/exchangeRate?currencyCodes=${currency}`,
    method: "GET",
  });
}

//获取车型
export function getModels(data) {
  return requstParts({
    url: `/api/cartypeDict`,
    method: "GET",
    data,
  });
}

//获取车型项目
export function getProjects(data) {
  return requstParts({
    url: `/api/cartypeProDict`,
    method: "GET",
    data,
  });
}