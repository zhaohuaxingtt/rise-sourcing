/*
 * @Author: wentliao
 * @Date: 2021-05-31 15:16:44
 * @Description: 定点申请-决策资料-part list
 */
import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取part list列表数据
export function getPartList(data) {
    return requst({
        url: '/nominate/part-list',
        method: "POST",
        data,
    })
}

// 保存
export function partUpdate(data) {
    return requst({
        url: '/nominate/part-update',
        method: "POST",
        data,
    })
}
