import axios from "@/utils/axios";
import store from '@/store'

const requst = axios(process.env.VUE_APP_BIDDING);
requst.interceptors.request.use(function (config) {
  config.params = {
    userId: store.state.permission.userInfo.id,
  }
  return config;
});

// 创建RFQ轮次
export function saveBiddingInfo(data) {
  return requst({
    url: `/biddingService/saveBiddingInfo`,
    method: "POST",
    data,
  });
}

//根据 ID 获取竞价项目(多价格)信息
export function findMultiPrice(data) {
  return requst({
    url: `/biddingQueryService/findMultiPrice`,
    method: "POST",
    data,
  });
}
//保存(多价格)信息
export function saveMultiPrice(data) {
  return requst({
    url: `/biddingService/saveMultiPrice`,
    method: "POST",
    data,
  });
}

//获取货币单位
export function getCurrencyUnit(data) {
  return requst({
    url: `/biddingService/saveMultiPrice`,
    method: "POST",
    data,
  });
}

//获取汇率
// export function getExchangeRate(data) {
//   return requst({
//     url: `/rise-mock/mockService/getExchangeRate`,
//     method: "POST",
//     data,
//   });
// }
//获取rfq全部信息
// export function getRfqInfo(data) {
//   return requst({
//     url: `/rise-mock/mockService/getRfqInfo`,
//     method: "POST",
//     data,
//   });
// }
// 根据 ID 获取报价规则
export function findQuoteRule(data) {
  return requst({
    url: `/biddingQueryService/findQuoteRule`,
    method: "POST",
    data,
  });
}

// 根据 ID 获取询价管理数据
export function findInquiry(data) {
  return requst({
    url: `/biddingQueryService/findInquiry`,
    method: "POST",
    data,
  });
}

//保存竞价项目(价格)信息
export function saveUnitPrice(data) {
  return requst({
    url: `/biddingService/saveUnitPrice`,
    method: "POST",
    data,
  });
}

// 保存报价规则
export function saveBiddingQuoteRule(data) {
  return requst({
    url: `/biddingService/saveBiddingQuoteRule`,
    method: "POST",
    data,
  });
}

// 保存询价管理信息
export function saveInquiryBidding(data) {
  return requst({
    url: `/biddingService/saveInquiryBidding`,
    method: "POST",
    data,
  });
}

// 根据 ID 获取竞价信息
export function getBiddingId(data) {
  return requst({
    url: `/biddingQueryService/findById`,
    method: "POST",
    data,
  });
}
// 根据rfqCode 和 rfqRound 获取projectCode
export function getProjectCode(data) {
  return requst({
    url: `/biddingQueryService/getProjectCode`,
    method: "POST",
    data,
  });
}

// 填充竞价基本信息
export function biddingInfo(data) {
  return requst({
    url: `/biddingService/updateBiddingInfo`,
    method: "POST",
    data,
  });
}

// 根据 ID 获取竞价大厅报价单列表数据
export function findHallQuotation(data) {
  return requst({
    url: `/biddingQueryService/findHallQuotation`,
    method: "POST",
    data,
  });
}

// 提交报价信息
export function saveBiddingQuotation(data) {
  return requst({
    url: `/biddingService/saveBiddingQuotation`,
    method: "POST",
    data,
  });
}

// 分页查询获取项目列表
export function queryProjectByPage(data) {
  return requst({
    url: `/biddingQueryService/queryProjectByPage`,
    method: "POST",
    data,
  });
}

// 删除项目信息
export function deleteProject(data) {
  return requst({
    url: `/biddingService/deleteBatchProject`,
    method: "POST",
    data,
  });
}

// 删除汇率
export function deleteExchangeRate(data) {
  return requst({
    url: `/biddingService/deleteExchangeRate`,
    method: "POST",
    data,
  });
}

// 根据 ID 获取竞价大厅供应商列表数据
export function findHallSupplier(data) {
  return requst({
    url: `/biddingQueryService/findHallSupplier`,
    method: "POST",
    data,
  });
}

// 查询当前供应商排名
export function getSupplierRank(data) {
  return requst({
    url: `/biddingQueryService/getSupplierRank`,
    method: "POST",
    data,
  });
}

// 竞标延期
export function delayBidding(data) {
  return requst({
    url: `/biddingService/delayBidding`,
    method: "POST",
    data,
  });
}

// 开标延期
export function delayOpenTender(data) {
  return requst({
    url: `/biddingService/delayOpenTender`,
    method: "POST",
    data,
  });
}

// 竞标取消
export function cancelBidding(data) {
  return requst({
    url: `/biddingService/cancelBidding`,
    method: "POST",
    data,
  });
}

// 开标取消
export function cancelOpenTender(data) {
  return requst({
    url: `/biddingService/cancelOpenTender`,
    method: "POST",
    data,
  });
}

// 发出本轮RFQ
export function sendEmail(data) {
  return requst({
    url: `/biddingService/sendInquiry`,
    method: "POST",
    data,
  });
}

// 竞价作废请求
export function invalidBidding(data) {
  return requst({
    url: `/biddingService/invalidBidding`,
    method: "POST",
    data,
  });
}

// 项目结果
export function getProjectResults(data) {
  return requst({
    url: `/biddingQueryService/getProjectResults`,
    method: "POST",
    data,
  });
}

// 查询竞价大厅 曲线图
export function getCurve(data) {
  return requst({
    url: `/biddingQueryService/getCurve`,
    method: "POST",
    data,
  });
}

// 获取当前轮次荷氏报价
export function getCurrentDutchOffer(data) {
  return requst({
    url: `/biddingService/getCurrentDutchOffer`,
    method: "POST",
    data,
  });
}

// 保存当前轮次荷氏报价
export function saveDutchQuotation(data) {
  return requst({
    url: `/biddingService/saveDutchQuotation`,
    method: "POST",
    data,
  });
}

// 保存当前轮次荷氏报价
export function saveNextDutchOffer(data) {
  return requst({
    url: `/biddingService/saveNextDutchOffer`,
    method: "POST",
    data,
  });
}

// 查询竞价大厅 分项排名
export function getItemRanking(data) {
  return requst({
    url: `/biddingQueryService/getItemRanking`,
    method: "POST",
    data,
  });
}
// 查询竞价大厅 竞价明细
export function getBiddingDetails(data) {
  return requst({
    url: `/biddingQueryService/getBiddingDetails`,
    method: "POST",
    data,
  });
}
// 查询竞价大厅 项目备注
export function getProjectRemarks(data) {
  return requst({
    url: `/biddingQueryService/getProjectRemarks`,
    method: "POST",
    data,
  });
}
//条款/告知书发送同意/拒绝请求
export function saveSupplierNotification(data) {
  return requst({
    url: `/biddingService/saveSupplierNotification`,
    method: "POST",
    data,
  });
}
//条款/告知书发送同意/拒绝请求
export function getSupplierNotification(data) {
  return requst({
    url: `/biddingQueryService/getSupplierNotification`,
    method: "POST",
    data,
  });
}
// 供应商出价列表接口
export function getSupplierBid(data) {
  return requst({
    url: `/biddingQueryService/getSupplierBid`,
    method: "POST",
    data,
  });
}
// 获取当前竞价明细
export function findSupplierOffer(data) {
  return requst({
    url: `/biddingQueryService/findSupplierOffer`,
    method: "POST",
    data,
  });
}
// 获取当前用户项目编号
export function getQuotation(data) {
  return requst({
    url: `/biddingQueryService/getQuotation`,
    method: "POST",
    data,
  });
}

// 根据 RfqCode 获取询价管理数据
export function findRfqInquiry(data) {
  return requst({
    url: `/biddingQueryService/findRfqInquiry`,
    method: "POST",
    data,
  });
}

// 根据 RfqCode 获取询价管理数据
export function getRfqIdList(data) {
  return requst({
    url: `/proxyService/getRfqIdList`,
    method: "POST",
    data,
  });
}


// 根据supplierCode获取供应商层级
export function cbdLevel(data) {
  return requst({
    url: `/proxyService/queryBdlCbdLevel?supplierCode=${data}`,
    method: "POST",
  });
}

// FS
export function listQuotationByFs(data) {
  return requst({
    url: `/proxyService/listQuotationByFs?fs=${data}`,
    method: "POST",
  });
}