/*
 * @Author: your name
 * @Date: 2021-03-04 15:18:55
 * @LastEditTime: 2021-06-25 14:49:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqPending\components\partDetaiList\data.js
 */

export const tableTitle = [
    {props:'a',name:'F SNR/G SNR/SPNR',key: 'F SNR/G SNR/SPNR'},
    {props:'b',name:'零件号',key: 'LK_LINGJIANHAO'},
    {props:'c',name:'零件名（中）',key: 'PARTSPROCUREPARTNAMEZH'},
    {props:'d',name:'零件名（德）',key: 'LK_LINGJIANMINGDE'},
    {props:'e',name:'采购工厂',key: 'LK_CAIGOUGONGCHANG'},
    {props:'f',name:'零件项目类型',key: 'LK_LINGJIANXIANGMULEIXING'},
    {props:'g',name:'车型大类',key: 'LK_CHEXINGDALEI'},
    {props:'h',name:'车型项目',key: 'LK_CHEXINGXIANGMU'},
    {props:'i',name:'零件状态',key: 'LK_LINGJIANZHUANGTAI'},
    {props:'j',name:'询价采购员',key: 'LK_XUNJIACAIGOUYUAN'},
    {props: 'k', name: 'LINIE',key: 'LK_LINIE'},
    {props:'l',name:'CF',key: 'partsprocure.PARTSPROCURECF'}
    
  ]

export const kmDialogTableTitle = [
  { props: "partNum", name: "零件号", tooltip: true, key: "LINGJIANHAO" },
  { props: "fsnrGsnrNum", name: "FSNR/GSNR", tooltip: true, key: "FSNRGSNR" },
  { props: "supplierName", name: "供应商名称", tooltip: true, key: "GONGYINGSHANGMINGCHENG" },
  { props: "cbdLevel", name: "CBD层级", tooltip: true, key: "CBDCENGJI" },
  { props: "isQuotationCbd", name: "是否已报CBD", tooltip: true, key: "SHIFOUYIBAOCBD" },
  { props: "sendKmFlag", name: "发送状态", tooltip: true, key: "FASONGZHUANGTAI" },
]