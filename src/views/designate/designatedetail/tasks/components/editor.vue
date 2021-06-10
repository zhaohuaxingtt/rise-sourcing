
<template>
  <iCard class="editor">
    <div class="clearFloat">
      <span class="font18 font-weight">
        {{ $t("Background & Objective") }}</span
      >
      <div class="floatright">
        <span v-if="multiEditControl">
          <upload
            class="upload-trigger margin-right10"
            :hideTip="true"
            :accept="'.jpg,.jpeg,.png,.gif'"
            :buttonText="$t('strategicdoc.ShangChuanTuPian')"
            @on-success="onUploadsucess"
          />
          <iButton @click="submit" :loading="submiting">
            {{ $t("LK_BAOCUN") }}
          </iButton>
          <iButton @click="multiEditControl = false">
            {{ $t("strategicdoc.JieSuBianJi") }}
          </iButton>
        </span>
        <span v-else>
          <iButton v-if="!$store.getters.isPreview" @click="multiEditControl = true">
            {{ $t("LK_BIANJI") }}
          </iButton>
        </span>
      </div>
      <div class="clearfix"></div>
      <iEditor
        class="editor-content margin-top20"
        id="textEditor"
        :menus=[]
        v-model="content"
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
      this.content += `<p><img src="${data && data.data && data.data.filePath || ''}" /></p>`
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
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
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