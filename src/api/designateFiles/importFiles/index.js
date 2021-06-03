/*
 * @Author: wentliao
 * @Date: 2021-06-03 15:24:29
 * @Description: 附件信息相关接口
 */


import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_PARTS)

// 获取附件列表数据
export function getAffixList(params) {
    return requst({
        url: `/affix/affix-requirements/${params.pageNo}/${params.pageSize}`,
        method: "GET",
        params,
    })
  }


  // 附件导入
  export function uploadImportFile(parmars) {
    return requst({
        url: '/affix/affix-requirement-files',
        method: 'POST',
        data: parmars
    })
}

// 下载模板
export function downloadImportFile(params) {
    return requst({
        url: '/affix/affix-requirement-files',
        method: "GET",
        params,
    })
  }


// 根据code 获取附件列表
export function postAffixList(data) {
    return requst({
        url: '/affix/affix-requirements',
        method: "POST",
        data,
    })
  }


  