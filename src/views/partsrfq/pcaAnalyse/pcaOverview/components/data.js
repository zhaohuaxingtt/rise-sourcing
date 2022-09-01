/*
 * @Author: your name
 * @Date: 2021-11-08 16:07:24
 * @LastEditTime: 2022-03-23 19:11:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\partsrfq\pcaAnalyse\pcaOverview\components\data.js
 */
/*
 * @Author: moxuan
 * @Description: PCA
 */

export const tableSearch = [
  {
    props: 'category',
    name: '材料组',
    nameLanguage: 'LK_CAILIAOZU',
    placeholder: '请输入编号/名称',
    placeholderLanguage: 'TPZS.QINGSHURUBIANHAOMINGCHENG',
    type: 'input',
  },
  {
    props: 'partNum',
    name: '零件号',
    nameLanguage: 'LK_LINGJIANHAO',
    placeholder: '请输入',
    placeholderLanguage: 'LK_QINGSHURU',
    type: 'multiLineInput',
  },
  {
    props: 'rfq',
    name: 'RFQ号/名称',
    nameLanguage: 'TPZS.RFQHMC',
    type: 'text',
  },
  {
    props: 'createBy',
    name: '创建人',
    nameLanguage: 'TPZS.CJR',
    placeholder: '请输入创建人名称',
    placeholderLanguage: 'TPZS.QINGSHURUCHUANGJIANRENMINGCHENG',
    type: 'input',
  },
]

export const externalTableSearch = [
  {
    props: 'category',
    name: '材料组',
    nameLanguage: 'LK_CAILIAOZU',
    placeholder: '请输入编号/名称',
    placeholderLanguage: 'TPZS.QINGSHURUBIANHAOMINGCHENG',
    type: 'input',
  },
  {
    props: 'partNum',
    name: '零件号',
    nameLanguage: 'LK_LINGJIANHAO',
    placeholder: '请输入',
    placeholderLanguage: 'LK_QINGSHURU',
    type: 'multiLineInput',
  },
  {
    props: 'rfq',
    name: 'RFQ号/名称',
    nameLanguage: 'TPZS.RFQHMC',
    type: 'input',
  },
  {
    props: 'createBy',
    name: '创建人',
    nameLanguage: 'TPZS.CJR',
    placeholder: '请输入创建人名称',
    placeholderLanguage: 'TPZS.QINGSHURUCHUANGJIANRENMINGCHENG',
    type: 'select',
  },
]

export const tableTitle = [
  {
    props: 'partNum',
    name: '零件号',
    key: 'LK_LINGJIANHAO',
    tooltip: true,
    width: 160,
  },
  { props: 'fileName', name: '报告名称', key: 'TPZS.BGMC', tooltip: true },
  { props: 'categoryName', name: '材料组', key: 'LK_CAILIAOZU', tooltip: true },
  { props: 'rfqName', name: 'RFQ', tooltip: true, width: 180 },
  {
    props: 'createName',
    name: '创建人',
    key: 'TPZS.CJR',
    tooltip: true,
    width: 120,
  },
  {
    props: 'createDate2',
    name: '创建日期',
    key: 'LK_CHUANGJIANRIQI',
    tooltip: true,
    width: 180,
  },
]
