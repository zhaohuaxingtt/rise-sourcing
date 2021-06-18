/*
 * @Author: your name
 * @Date: 2021-06-17 16:49:20
 * @LastEditTime: 2021-06-17 17:49:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\components\data.js
 */


export const confirmTableHead = [
    // export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
        { props: 'id', name: '#', key: '#', tooltip: false, width:40  },
        { props: 'rfqName', name: '零件号', key: 'LK_LINGJIANHAO', tooltip: true },
        { props: 'rfqType', name: 'FS号', key: 'LK_FSHAO', tooltip: false },
        { props: 'carType', name: 'RFQ号', key: 'LK_RFQHAO', tooltip: true },
        { props: 'createDate', name: '车型项目名称', key: 'LK_CHEXINGXIANGMUMINGCHENG', tooltip: false },
        { props: 'currentRounds', name: '工厂', key: 'TPZS.GONGCHANG', tooltip: false },
        { props: 'suppliers', name: '状态', key: 'LK_ZHUANGTAI', tooltip: false },
        { props: 'quotations', name: '材料组', key: 'LK_CAILIAOZU', tooltip: false },
        { props: 'currentStatus', name: '供应商名称', key: 'LK_GONGYINGSHANGMINGCHENG', tooltip: false }
    ]