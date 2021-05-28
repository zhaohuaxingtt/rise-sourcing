/*
 * @Author: your name
 * @Date: 2021-05-27 13:45:35
 * @LastEditTime: 2021-05-28 16:59:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\home\components\data.js
 */
// 技术资料下载弹窗---询价附件表单头
export const FilesTitle = [
    {props:'a',name:'文件名称', key: "", tooltip: true},
    {props:'b',name:'大小(MB)', key: "", tooltip: true},
    {props:'c',name:'上传日期', key: "", tooltip: true},
    {props:'d',name:'上传人', key: "", tooltip: true},
  ]


// 技术资料下载弹窗---询价图纸表单头
  export const DrawingTitle = [
    {props:'e',name:'零件号', key: "LK_LINGJIANHAO", tooltip: true},
    {props:'a',name:'文件名称', key: "LK_WENJIANMINGCHENG", tooltip: true},
    {props:'b',name:'大小(MB)', key: "LK_DAXIAOMB", tooltip: true},
    {props:'c',name:'上传日期', key: "LK_SHANGCHUANRIQI", tooltip: true},
    {props:'d',name:'上传人', key: "LK_SHANGCHUANREN", tooltip: true},
  ]

  // CBD状态弹窗表头
  export const CbdTitle = [
    {props:'a',name:'FS号', key: "LK_FSHAO", tooltip: true},
    {props:'b',name:'零件号', key: "LK_LINGJIANHAO", tooltip: true},
    {props:'c',name:'零件名（中）', key: "LK_LINGJIANMINGZHONG", tooltip: true},
    {props:'d',name:'零件名（德）', key: "LK_LINGJIANMINGDE", tooltip: true},
    {props:'e',name:'车型项目', key: "partsignLanguage.CheXingXiangMu", tooltip: true},
    {props:'f',name:'供应商', key: "LK_GONGYINGSHANGMING", tooltip: true},
    {props:'g',name:'发送时间', key: "costanalysismanage.FASONGSHIJIAN", tooltip: true},
    {props:'h',name:'RFQ轮次', key: "costanalysismanage.Rfqlunci", tooltip: true},
    {props:'i',name:'RFQ状态', key: "LK_RFQZHUANGTAI", tooltip: true},
    {props:'j',name:'heavy item', key: "LK_HEAVYITEM", tooltip: true},
  ]