/*
 * @Author: your name
 * @Date: 2021-04-12 23:48:38
 * @LastEditTime: 2021-10-26 10:00:42
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\batchmiantain\components\data.js
 */
export const tableTitle = [
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO' },
  { props: 'partNameZh', name: '零件名（中）',  key: 'LK_LINGJIANMINGZHONG' },
  { props: 'partNameDe', name: '零件名（德）',  key: 'LK_LINGJIANMINGDE' },
  { props: 'stuffName', name: '材料组', key: 'LK_CAILIAOZU' },
  { props: 'categoryName', name: '工艺组', key: 'LK_GONGYIZU' },
  { props: 'cartypeProjectZh', name: '车型项目',  key: 'LK_CHEXINGXIANGMU' },
  { props: 'startYear', name: '开始年份',  key: 'LK_KAISHINIANFEN' },
  { props: 'year0', name: '+0' },
  { props: 'year1', name: '+1' },
  { props: 'year2', name: '+2' },
  { props: 'year3', name: '+3' },
  { props: 'year4', name: '+4' }
]

export const tableTitleOnlyPartsChange = [
  { props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO'},
  { props: 'oldPartNum', name: '原零件号', key: 'LK_YUANLINGJIANHAO' },
  { props: 'partNameZh', name: '零件名（中）', key: 'LK_LINGJIANHAOHZONG' },
  { props: 'partNameDe', name: '零件名（德）', key: 'LK_LINGJIANHAODE' },
  { props: 'modelNameZh', name: '车型', key: 'LK_CHEXING' },
  { props: 'carTypeProjectZh', name: '车型项目', key: 'LK_CHEXINGXIANGMU' },
  { props: 'linieDept', name: 'LINIE部门', key: 'LK_LINEBUMEN' },
  { props: 'partProjectTypeDesc', name: '零件项目类型', key: 'LK_LINGJIANLEIX' },
  { props: 'procureFactoryName', name: '采购工厂', key: 'LK_CAIGOUGONGCHANG' },
  { props: 'linieName', name: 'LINIE', key: 'LK_LINE' },
  { props: 'cfControllerName', name: 'CF控制员', key: 'LK_CFKONGZHIYUAN' },
  { props: 'oldFsnrGsnrNum', name: '原FS号', key: 'LK_YUANFSHAO',width:'150'}
]