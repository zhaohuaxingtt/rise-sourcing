
<template>
  <div>
    <span class="font20 font-weight"> Background</span>
    <iEditor
      class="editor-content margin-top20"
      id="textEditor"
      :showMenus="false"
      :disabled="!multiEditControl"
      v-model="content"
      :height="64"
      v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_EDITOR | 备注编辑框"
      ref="editor"
    />
  </div>
</template>

<script>
import { iCard, iButton, iMessage, iEditor } from "rise";
import {
  addBackgroundAndObjectiveInfo,
  getBackgroundAndObjectiveInfo,
} from "@/api/designate/decisiondata/tasks";

export default {
  props: {
    isTask: {
      type: String,
    },
  },
  data() {
    return {
      id: "",
      content: "",
      Edditor: {},
      pictures: [],
      submiting: false,
      multiEditControl: false,
      task: "",
    };
  },
  created() {
    this.isTask == true
      ? (this.task = "Background&Objective")
      : (this.task = "highligths");
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: (state) => state.nomination.nominationDisabled,
      rsDisabled: (state) => state.nomination.rsDisabled,
    }),
    isDisabled() {
      return false;
    },
  },
  components: {
    iCard,
    iButton,
    iEditor,
  },
  mounted() {
    this.getFetchData();
  },
  methods: {
    onUploadsucess(data) {
      this.content += `<p><img src="${
        (data && data.data && data.data.path) || ""
      }" /></p>`;
      this.$refs.editor.html(this.content);
    },
    getFetchData() {
      getBackgroundAndObjectiveInfo({
        nominateId:
          this.$store.getters.nomiAppId || this.$route.query.desinateId || "",
      }).then((res) => {
        if (res.code === "200") {
          if (res.data) {
            this.content = res.data.content || "";
            this.$refs.editor.html(this.content);
            this.id = res.data.id;
            this.pictures = [];
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
    },
    // 保存修改记录
    async submit() {
      this.submiting = true;
      const data = {
        nominateId: this.$store.getters.nomiAppId || "",
        content: this.content,
        id: this.id,
        pictures: this.pictures.join(","),
      };
      addBackgroundAndObjectiveInfo(data)
        .then((res) => {
          if (res.code === "200") {
            iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
            this.getFetchData();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
          this.submiting = false;
        })
        .catch((e) => {
          this.submiting = false;
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#textEditor {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  height: calc(100% - 45px);
  ::v-deep.w-e-toolbar {
    display: none;
  }
  ::v-deep #editor {
    height: 100%;
  }
  ::v-deep.w-e-text-container {
    height: 100% !important;
    // min-height: 100px;
    // max-height: 500px;
    border: 0px !important;
    .w-e-text {
      p {
        margin: 0px;
        font-size: 18px !important;
        line-height: 20px !important;
        letter-spacing: 0 !important;
        font-family: "Arial", "Helvetica", "sans-serif" !important;
      }
      span {
        font-size: 18px !important;
        line-height: 20px !important;
        letter-spacing: 0 !important;
        font-family: "Arial", "Helvetica", "sans-serif" !important;
      }
    }
  }
}
.upload-trigger {
  display: inline-block;
}
</style>