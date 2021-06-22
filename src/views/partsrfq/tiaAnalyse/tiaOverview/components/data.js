/*
 * @Author: moxuan
 * @Description: TIA
 */

export const tableSearch = [
  {
    props: 'a',
    name: '材料组',
    nameLanguage: 'LK_CAILIAOZU',
    placeholder: '请输入编号/名称',
    placeholderLanguage: 'TPZS.QINGSHURUBIANHAOMINGCHENG',
    type: 'input',
  },
  {
    props: 'b',
    name: '零件号',
    nameLanguage: 'LK_LINGJIANHAO',
    placeholder: '请输入',
    placeholderLanguage: 'LK_QINGSHURU',
    type: 'input',
  },
  {
    props: 'c',
    name: 'RFQ号/名称',
    nameLanguage: 'TPZS.RFQHMC',
    type: 'text',
  },
  {
    props: 'd',
    name: '创建人',
    nameLanguage: 'TPZS.CJR',
    placeholder: '请输入创建人名称',
    placeholderLanguage: 'TPZS.QINGSHURUCHUANGJIANRENMINGCHENG',
    type: 'input',
  },
];

export const tableTitle = [
  {props: '1', name: '零件号', key: 'LK_LINGJIANHAO'},
  {props: '2', name: '报告名称', key: 'TPZS.BGMC'},
  {props: '3', name: '材料组', key: 'LK_CAILIAOZU'},
  {props: '4', name: 'RFQ'},
  {props: '5', name: '创建人', key: 'TPZS.CJR'},
  {props: '6', name: '创建日期', key: 'LK_CHUANGJIANRIQI'},
  {props: '7', name: '上次修改日期', key: 'TPZS.SCXGRQ'},
];
