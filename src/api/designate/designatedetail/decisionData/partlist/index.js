/*
 * @Author: wentliao
 * @Date: 2021-05-31 15:16:44
 * @Description: 定点申请-决策资料-part list
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_RFQ)

// 获取part list列表数据
export function getPartList(params) {
    return requst({
        url: '/nominate/part-list',
        method: "GET",
        params: params
    })
}
