/*
 * @Author: your name
 * @Date: 2021-04-12 10:12:39
 * @LastEditTime: 2021-07-13 14:33:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailInfo\components\inquiryAttachment\components\data.js
 */
import {permissionTitle} from '@/utils'
export const inquiryAttachmentTableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_ATTACHMENTLIST",[
    {props:'fileName',name:'文件名称', key: 'LK_WENJIANMINGCHENG'},
    {props:'fileSize',name:'大小', key: 'DAXIAO'},
    {props:'createDate',name:'上传日期', key: 'LK_SHANGCHUANRIQI'},
    {props:'uploader',name:'上传⼈', key: 'LK_SHANGCHUANREN'}
])

export const inquiryDrawingTableTitle = [
    {props:'partNum',name:'零件号',key: 'LK_LINGJIANHAO'},
    {props:'tpPartAttachmentName',name:'文件名称',key: 'LK_WENJIANMINGCHENG'},
    {props:'size',name:'大小',key: 'DAXIAO'},
    {props:'createDate',name:'上传日期',key: 'LK_SHANGCHUANRIQI'},
    {props:'userName',name:'上传人',key: 'LK_SHANGCHUANREN'}
]