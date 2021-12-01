import axios from "@/utils/axios"

const requst = axios(process.env.VUE_APP_SOURCING)

// 获取举措清单
export function getStrategy(params) {
  return requst({
    url: `/cost_analysis/${ params.nominateAppId }`,
    method: "GET"
  })
}

// 设置举措清单
export function setStrategy(data) {
  return requst({
    url: "/cost_analysis/strategy",
    method: "PATCH",
    data
  })
}