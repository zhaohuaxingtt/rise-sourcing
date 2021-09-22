/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 16:02:45
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import { getDictByCode } from "@/api/dictionary";

export const dictByCode = async function(key) {
  let dicResult = []
  let res = await getDictByCode(key)
  if (res.data) {
    res.data.filter(result => {
      if (result.code === key) {
        dicResult = result.subDictResultVo || []
      }
    })
    return dicResult
  }
}