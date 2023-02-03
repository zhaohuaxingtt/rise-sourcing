/*
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-01-31 17:23:15
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-01 14:41:41
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\singleSourcing\data.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const tableTitle = [
  { props: 'fsnrGsnrNum', isHeaderSetting: true, HeaderSettingList: [{ name: '采购项目编号' }, { name: 'FS No.' },] },
  { props: 'partNum', align: 'left', isHeaderSetting: true, HeaderSettingList: [{ name: '零件信息' }, { name: 'Part Info' },], minWidth: 100 },
  { props: 'sapCode', align: 'left', isHeaderSetting: true, HeaderSettingList: [{ name: '供应商' }, { name: 'Supplier Information' },], minWidth: 100 },
  { props: 'singleReason', align: 'left', isHeaderSetting: true, HeaderSettingList: [{ name: '原因' }, { name: 'Reason' },] },
  { props: 'department', align: 'left', isHeaderSetting: true, HeaderSettingList: [{ name: '原因部门' }, { name: 'Caused by' },] },
  // { name: 'FS号', enName: 'FS No', props: 'fsnrGsnrNum' },
  // { name: '零件号', enName: 'Part No.', props: 'partNum' },
  // { name: '零件名称', enName: 'Part Name', props: 'partNameCh' },
  // { name: '供应商名称', enName: 'Supplier Name', props: 'suppliersName' },
  // { name: '供应商号', enName: 'Supplier No.', props: 'sapCode' },
  // { name: '原因', enName: 'Reason', props: 'singleReason' },
  // { name: '原因部门', enName: 'Caused by', props: 'department' },
]