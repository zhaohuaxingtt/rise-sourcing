<template>
  <i-dialog :title="language('LK_JIESHIFUJIANCHAKAN','解释附件查看')" :visible.sync="value"
            @close="clearDiolog"
            top="40vh">
    <i-table-custom  :columns='explainAttachment'
                    :data='explainAttachmentList'>
    </i-table-custom>

  </i-dialog>
</template>

<script>
import {iDialog} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {getAuditFilePage} from "../../../../../api/aeko/detail/approveAttach";

export default {
  name: "AEKOExplainAttachmentDialog",
  components: {
    iDialog,
    iTableCustom
  },
  props: {
    value: {type: Boolean, require: true, default: false},
    explainAttachmentReqData:{type:Object,default: () => ({})},
  },
  created() {
    this.queryAttachment()
  },
  data() {
    return {
      explainAttachmentList: [],
      explainAttachment: [{
        prop: 'index',
        align: 'center',
        label: '#',
      },
        {
          prop: 'fileName',
          label: '文件名',
          i18n: 'LK_WENJIANMING',
          headerAlign: 'center',
          align: 'center',
        },
        {
          prop: 'updateDate',
          label: '操作时间',
          i18n: 'LK_UpdateDate',
          headerAlign: 'center',
          align: 'center',
        },
        {
          prop: 'fileSize',
          label: '文件大小',
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
        aekoNum: this.explainAttachmentReqData.aekoNum,
        manageId: this.explainAttachmentReqData.manageId,
        taskId: this.explainAttachmentReqData.taskId
      }
      getAuditFilePage(data).then(res => {
        if (res.code == 200) {
          this.explainAttachmentList = res.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>