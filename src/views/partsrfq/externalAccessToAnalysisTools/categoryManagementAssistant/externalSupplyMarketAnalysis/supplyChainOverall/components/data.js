/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-05 15:41:21
 * @LastEditors: zbin
 * @Descripttion: your project
 */
import { getDictByCode } from "@/api/dictionary";

export const supplierTableTitle = [
  { props: 'name', name: 'SAP号', key: 'SAPHAO' },
  { props: 'toolType', name: '供应商名称', key: 'GONGYINGSHANGMINGCHEN' },
  { props: 'materialGroup', name: '供应商地址', key: 'GONGYINGSHANGDIZHI' },
]
export const meterialsTableTitle = [
  { props: 'categoryCode', name: '材料组编号', key: 'CAILIAOZUBIANHAO' },
  { props: 'categoryName', name: '材料组名称', key: 'CAILIAOZUMINGCHENG' },
]
export const changeLogTableTitle = [
  { props: 'name', name: '操作类型', key: 'CAOZUOLEIXING' },
  { props: 'toolType', name: '操作前', key: 'CAOZUOQIAN' },
  { props: 'materialGroup', name: '操作后', key: 'CAOZUOHOU' },
  { props: 'materialGroup', name: '操作人', key: 'CAOZUOREN' },
  { props: 'materialGroup', name: '操作日期', key: 'ZAOZUORIQI' },
]
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