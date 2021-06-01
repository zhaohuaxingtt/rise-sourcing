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
        sortColumn=null,
        isAsc=false,
        fileType,
        pageNo,
        pageSize,
    } = params;
    return requst({
        url: `/file-history/${nomiAppId}/${sortColumn}/${isAsc}/${fileType}/${pageNo}/${pageSize}`,
        method: "GET",
        params,
    })
  }