/*
 * @Author: your name
 * @Date: 2021-04-12 10:12:38
 * @LastEditTime: 2021-07-13 14:32:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\drawingSheet\data.js
 */
export const tableTitle = [
  { 'props': 'tpPartAttachmentName', name: '文件名称', key: 'LK_WENJIANMINGCHENG', tooltip: true ,minWidth:90},
  { 'props': 'size', name: '大小', key: 'DAXIAO', tooltip: true },
  { 'props': 'updateDate', name: '上传日期', key: 'LK_SHANGCHUANRIQI', tooltip: true },
  { 'props': 'uploadBy', name: '上传人', key: 'LK_SHANGCHUANREN', tooltip: true }
]

export const items = [
  [
    { props: 'status', name: '状态' , key: 'LK_ZHUANGTAI' },
    { props: 'backReason', name: '退回原因', key: 'LK_TUIHUIYUANYIN' },
    { props: 'interruptReason', name: '取消原因', key: 'LK_QUXIAOYUANYIN' },
    { props: 'createDate', name: '创建日期', key: 'LK_CHUANGJIANRIQI' },
    { props: 'creatorNum', name: '创建人工号', key: 'LK_CHUANGJIANRENGONGHAO' },
    { props: 'creatorName', name: '创建人姓名', key: 'LK_CHUANGJIANRENXINGMING' },
    { props: 'tpDeptNum', name: '设计科室', key: 'LK_SHEJIKESHI' }, //*
    { props: 'tpPrincepalNum', name: '设计工程师工号', key: 'LK_SHEJIGONGCHENGSHIHAO' }, //*
    { props: 'tpPrincepalName', name: '设计工程师姓名', key: 'LK_SHEJIGONGCHENGSHIXINGMING' }, //*
    { props: 'partNameCn', name: '零件名（中）', key: 'LK_LINGJIANMINGZHONG' },
    { props: 'partNameDe', name: '零件名（德）', key: 'LK_LINGJIANMINGDE' },
    { props: 'partNameEn', name: '零件名（英）', key: 'LK_LINGJIANMINGYING' },
    { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO' },
    { props: 'tpPartID', name: '新件信息流水单号', key: 'LK_XINJIANXINXILIUSHUIDANHAO' }
  ],
  [
    { props: 'partNum1', name: '零件号第一部分', key: 'LK_LINGJIANHAODIYIBUFEN' },
    { props: 'partNum2', name: '零件号第二部分', key: 'LK_LINGJIANHAODIERBUFEN' },
    { props: 'partNum3', name: '零件号第三部分', key: 'LK_LINGJIANHAODISANBUFEN' },
    { props: 'partNum4', name: '零件号第四部分', key: 'LK_LINGJIANHAODISIBUFEN' },
    { props: 'partNum5', name: '零件号第五部分', key: 'LK_LINGJIANHAODIWUBUFEN' }
  ],
  [
    { props: 'drawingDate', name: '图纸日期', key: 'LK_TUZHIRIQI' },
    { props: 'material', name: '材料', key: 'LK_CAILIAO' },
    { props: 'farbeNum', name: '色标号', key: 'LK_SEBIAOHAO' },
    { props: 'optionalPart', name: '选装件', key: 'LK_XUANZHUANGJIAN' },
    { props: 'size', name: '尺寸', key: 'LK_CHICUN' },
    { props: 'weight', name: '重量', key: 'LK_ZHONGLIANG' },
    { props: 'aekoNum', name: 'Aeko号', key: 'LK_AEKOHAO' },
    { props: 'productGroupNum', name: '原配厂', key: 'LK_YUANPEICHANG' },
    { props: 'isSecondTier', name: '是否二次件', key: 'LK_SHIFOUERCIJIAN' },
    { props: 'partDerived', name: '从零件派生', key: 'LK_CONGLINGJIANPAISHENG' },
    { props: 'replacedPartNum', name: '被替代零件', key: 'LK_BEITIDAILINGJIAN' },
    { props: 'isBMG', name: 'BMG',key: 'LK_BMG'  },
    { props: 'partTypeName', name: '零件类型', key: 'LK_LINGJIANLEIXING' },
    { props: 'partTypeNum', name: '零件类型代码', key: 'LK_LINGJIANLEIXINGDAIMA' },
    { props: 'projectCarType', name: '项目车型', key: 'LK_XIANGMUCHEXING' }
  ]
]