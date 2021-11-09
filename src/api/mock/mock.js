import axios from "@/utils/axios";
import store from "@/store";
const requst = axios();
const requstBase = axios(process.env.VUE_APP_DIC_API);
const requstParts = axios(process.env.VUE_APP_PARTSPROCURE_API);
const requstRfq = axios(process.env.VUE_APP_SOURCING);
const requstSupplier = axios(process.env.VUE_APP_SUPPLIER);
const requstFile = axios(process.env.VUE_APP_BASE_UPLOAD_API);

// 获取rfqCode
export function getRfqCodesList(data) {
  return requstRfq({
    // url: `/rise-mock/mockService/getRfqCodes`,
    url: `/api/rfq/getRfqIdList/${store.state.permission.userInfo.id}`,
    method: "POST",
    data,
  });
}

// 获取供应商信息
export function getSupplierInfo(data) {
  return requstSupplier({
    // url: `/api/getSupplierInfo`,
    url: `/supplier360View/page/querySupplierInfo`,
    method: "POST",
    data,
  });
}

// 获取供应商层级
export function getSuppliers(data) {
  return requstParts({
    url: `/api/bdlInfoList`,
    method: "POST",
    data,
  });
}

// 根据 ID 获取供应商信息  联系人
export function getSupplierInfoById(data) {
  return requstSupplier({
    // url: `/api/getSupplierInfoList?supplierIds=${supplierIds}`,
    url: `/user/list`,
    method: "POST",
    data
  });
}

// 上传文件
export function uploadFile(data, options) {
  data.append("multifile", data.get("file"));
  data.append("applicationName", 111);
  data.append("businessId", 8025);
  data.append("currentUser", store.state.permission?.userInfo?.nameZh || 'admin');
  data.append("type", 1);
  data.delete("file");
  return requstFile({
    url: `/udMutilfiles`,
    data,
    method: "POST",
    timeout: 600000,
    ...options,
  }).then(async (res) => {
    return res[0];
  });
}

//通过文件 ID 下载文件, 返回字节流
export function getFileId(fileId) {
  return requstFile({
    url: `/udDown/${fileId}`,
    method: "GET",
    responseType: "blob",
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

// 第三方折现率
export function getDiscount({discount}) {
  return requstBase({
    url: `/web/selectDictByKeys?keys=md_discount_rate`,
    method: "GET",
  });
}