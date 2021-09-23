
<template>
  <iCard class="editor">
    <div class="clearFloat">
      <span class="font18 font-weight">
        {{ language("Background & Objective","Background & Objective") }}</span
      >
      <div class="floatright">
        <span v-if="multiEditControl">
          <upload
            class="upload-trigger margin-right10"
            :hideTip="true"
            :accept="'.jpg,.jpeg,.png,.gif'"
            :buttonText="language('strategicdoc_ShangChuanTuPian','上传图片')"
            v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_UPLOAD|上传图片"
            @on-success="onUploadsucess"
          />
          <iButton @click="submit" :loading="submiting" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_REMARKSAVE|保存备注">
            {{ language("LK_BAOCUN",'保存') }}
          </iButton>
          <iButton @click="multiEditControl = false" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_REMARKEXITEDIT|结束编辑备注">
            {{ language("strategicdoc_JieSuBianJi",'结束编辑') }}
          </iButton>
        </span>
        <span v-else>
          <iButton v-if="!$store.getters.isPreview && !nominationDisabled" @click="multiEditControl = true" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_EDIT|编辑备注">
            {{ language("LK_BIANJI",'编辑') }}
          </iButton>
        </span>
      </div>
      <div class="clearfix"></div>
      <iEditor
        class="editor-content margin-top20"
        id="textEditor"
        :menus=[]
        :disabled="!multiEditControl"
        v-model="content"
        v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_EDITOR|备注编辑框"
        ref="editor"

       />
    </div>
  </iCard>
</template>

<script>
import {
  iInput,
  iCard,
  iButton,
  iMessage,
  iEditor
} from 'rise'
import upload from '@/components/Upload'
import { 
  addBackgroundAndObjectiveInfo,
  getBackgroundAndObjectiveInfo
} from '@/api/designate/decisiondata/tasks'

export default {
  data() {
    return {
      id: '',
      content: '',
      Edditor: {},
      pictures: [],
      submiting: false,
      multiEditControl: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
    }),
  },
  components: {
    // iInput,
    iCard,
    iButton,
    iEditor,
    upload
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    onUploadsucess(data) {
      this.content += `<p><img src="${data && data.data && data.data.path || ''}" /></p>`
      this.$refs.editor.html(this.content)
    },
    getFetchData() {
      getBackgroundAndObjectiveInfo({
        nominateId: this.$store.getters.nomiAppId || '',
      }).then(res => {
        if (res.code === '200') {
          if (res.data) {
            this.content = res.data.content || ''
            this.$refs.editor.html(this.content)
            this.id = res.data.id
            this.pictures = []
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },
    // 保存修改记录
    async submit() {
      this.submiting = true
      const data = {
        nominateId: this.$store.getters.nomiAppId || '',
        content: this.content,
        id: this.id,
        pictures: this.pictures.join(',')
      }
      addBackgroundAndObjectiveInfo(data).then(res => {
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.submiting = false
      }).catch(e => {
        this.submiting = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.clearfix {
  clear: both
}
#textEditor {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  ::v-deep.w-e-toolbar {
    display: none;
  }
  ::v-deep.w-e-text-container {
    height: auto !important;
    min-height: 100px;
    max-height: 500px;
    border: 0px !important;
    .w-e-text {
      font-size: 12px !important;
      p {
        margin: 0px;
        font-size: 12px !important;
      }
    }
  }
}
.upload-trigger {
  display: inline-block;
}
</style>