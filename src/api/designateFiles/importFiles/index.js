/*
 * @Author: wentliao
 * @Date: 2021-06-03 15:24:29
 * @Description: 附件信息相关接口
 */


import axios from "@/utils/axios"
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_PARTS)
const requestDownload = axiosDownload(process.env.VUE_APP_PARTS)

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
export function downloadImportFile() {
    return requestDownload({
        url: '/affix/affix-requirement-files',
        method: "GET",
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

// 根据fileId查询列表 
export function getAffixListById(params) {
    const {affixId,pageNo,pageSize} = params;
    return requst({
        url: `/affix/affix-requirement-attachments/${affixId}/${pageNo}/${pageSize}`,
        method: "GET",
        params,
    })
}

// 附件上传后关联
export function uploadAttachments(data) {
    return requst({
        url: '/affix/affix-requirement-attachments',
        method: "POST",
        data,
    })
}

// 删除附件
export function deleteattachments(data) {
    const {attachmentIds=[]} = data;
    return requst({
        url: `/affix/affix-requirement-attachments?attachmentIds=${attachmentIds}`,
        method: "DELETE",
    })
}

  