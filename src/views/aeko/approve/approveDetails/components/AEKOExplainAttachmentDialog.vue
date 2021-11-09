<template>
  <i-dialog title="解释附件查看" :visible.sync="value"
            @close="clearDiolog"
            top="40vh">
    <i-table-custom class="margin-bottom20 padding-bottom30" :columns='explainAttachment'
                    :data='explainAttachmentList' @downloadFile="download">
    </i-table-custom>

  </i-dialog>
</template>

<script>
import {iDialog} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {getAuditFilePage} from "@/api/aeko/detail/approveAttach";
import {downloadFile} from 'rise/web/components/iFile/lib'
import LinkComponeents from "./LinkComponeents";

export default {
  name: "AEKOExplainAttachmentDialog",
  components: {
    iDialog,
    iTableCustom
  },
  props: {
    value: {type: Boolean, require: true, default: false},
    explainAttachmentReqData: {type: Object, default: null},
  },
  watch: {
    explainAttachmentReqData(val) {

    }
  },
  created() {
    this.queryAttachment()
  },
  data() {
    return {
      explainAttachmentList: [],
      explainAttachment: [{
        type: 'index',
        align: 'center',
        label: '#',
      },
        {
          prop: 'fileName',
          label: '文件名',
          i18n: 'LK_WENJIANMING',
          headerAlign: 'center',
          align: 'center',
          width: 200,
          emit: 'downloadFile',
          tooltip: true,
          customRender: (h, scope, column) => {
            return <LinkComponeents content={scope.row.fileName}/>
          },
        },
        {
          prop: 'createDate',
          label: '操作时间',
          i18n: 'LK_UpdateDate',
          headerAlign: 'center',
          align: 'center',
        },
        {
          prop: 'fileSize',
          label: '文件大小(MB)',
          i18n: 'WENJIANDAXIAO',
          headerAlign: 'center',
          align: 'center',
        },
        {
          prop: 'userName',
          label: '上传人',
          i18n: 'strategicdoc.ShangChuanRen',
          headerAlign: 'center',
          align: 'center',
        },
      ]
    }
  },
  methods: {
    clearDiolog() {
      this.$emit("input", false);
    },
    queryAttachment() {
      let data = {
        current: 1,
        size: 1000,
        linieId: this.explainAttachmentReqData.linieId,
        aekoNum: this.explainAttachmentReqData.aekoNum,
        manageId: this.explainAttachmentReqData.manageId,
        taskId: this.explainAttachmentReqData.taskId
      }
      getAuditFilePage(data).then(res => {
        if (res.code == 200) {
          this.explainAttachmentList = res.data
        }
      })
    },
    downloadFile() {

    },
    download(row) {
      downloadFile(row.uploadId)
    },
  }
}
</script>

<style scoped>

</style>