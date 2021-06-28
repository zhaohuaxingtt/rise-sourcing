/*
 * @Author: wentliao
 * @Date: 2021-06-26 12:58:12
 * @Description: 定点信相关接口
 */

import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取定点信列表数据
export function getLetterList(data) {
    return requst({
        url: '/nominate-letter/page',
        method: "POST",
        data,
    })
  }