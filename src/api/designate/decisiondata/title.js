/*
 * @Author: wentliao
 * @Date: 2021-06-02 20:09:32
 * @Description: title页签相关接口
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

export function findLayoutTitleInfo(params) {
    return requst({
        url: '/tabPageLayouts/findLayoutTitleInfo',
        method: "GET",
        params,
    })
  }