import {permissionTitle} from '@/utils'
export const inquiryAttachmentTableTitle = [
//export const inquiryAttachmentTableTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_INQUIRYATTACHMENT_INQUIRYATTACHMENT_ATTACHMENTLIST",[
    {props:'fileName',name:'文件名称'},
    {props:'fileSize',name:'大小（MB）'},
    {props:'createDate',name:'上传日期'},
    {props:'createBy',name:'上传⼈'}
]

export const inquiryDrawingTableTitle = [
    {props:'partNum',name:'零件号'},
    {props:'tpPartAttachmentName',name:'文件名称'},
    {props:'size',name:'大小（MB）'},
    {props:'createDate',name:'上传日期'},
    {props:'userName',name:'上传人'}
]