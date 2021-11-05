/*
 * @Author: wentliao
 * @Date: 2021-06-01 18:02:44
 * @Description: RFQ详情页相关接口
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

export function getFileHistory(params) {
	const {
		nomiAppId,
		sortColumn = null,
		isAsc = false,
		fileType,
		pageNo,
		pageSize,
	} = params;
	return requst({
		url: `/file-histories/page/${nomiAppId}/${sortColumn}/${isAsc}/${fileType}/${pageNo}/${pageSize}`,
		method: "GET",
		// params,
	})
}

// 获取RFQ详情
export function getRfqInfo(params) {
	return requst({
		url: `/rfq/getById/${ params.rfqId }`,
		method: 'GET'
	})
}

// 获取km零件清单
export function getKmPartList(params) {
	return requst({
		url: `/km/page/parts/${params.rfqId}/${params.pageSize}/${params.currPage}`,
		method: 'GET'
	})
}

// 保存km零件清单中的PCA和TIA分析结果
export function savePcaAndTia(params) {
	return requst({
		url: '/km/pca-tia/save',
		method: 'POST',
		data: params
	})
}

//  获取CBD列表
export function getKmCbdList(params) {
	return requst({
		url: `/km/page/cbds/${params.rfqId}/${params.pageSize}/${params.pageNo}`,
		method: 'GET'
	})
}


//   报告清单---上传
export function uploadDaring(data) {
	return requst({
		url: `/file-histories/upload-file`,
		method: "POST",
		data
	})
  }