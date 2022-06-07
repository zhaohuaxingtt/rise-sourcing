<template>
  <iDialog
    class="dialog"
    v-bind="$props"
    :visible.sync="visible"
    v-on="$listeners"
    width="900px"
  >
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">
        {{ language("QUXIAODINGDIANTIAOJIANJIANCHA", "取消定点条件检查") }}
      </div>
    </div>
    <div class="body">
      <div v-show="statusList.length">
        <div class="success" v-if="canToDo">{{language('CHECKPASS','检查通过，可进行取消定点，是否确认取消定点')}}</div>
        <div class="error" v-else>{{language('CHECKNOPASS','无法取消定点！')}}</div>
      </div>
      <div style="height: 300px">
        <div class="content" v-loading="loading">
          <div
            class="content-item"
            v-for="(item, key) in statusList"
            :key="key"
          >
            <div class="left">
              <icon
                symbol
                :name="item.pass ? 'iconrs-wancheng' : 'iconzhongyaoxinxitishi'"
              />
              <div class="line" v-if="key != statusList.length - 1"></div>
            </div>
            <div class="right">
              <div class="title">
                {{ item.checkContent }}-{{ item.pass ? "通过" : "不通过" }}
              </div>
              <div class="description">{{ item.denialReason }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="footer">
      <iButton @click="close">
        {{ language("QUXIAO", "取消") }}
      </iButton>
      <iButton @click="confirm" v-if="canToDo" :loading="loading">
        {{ language("QUXIAODINGDIAN", "取消定点") }}
      </iButton>
    </div>
    <iDialog :visible.sync="mtzVisible" width="750px" append-to-body>
      <div class="dialog-Header" slot="title">
        <div class="font18 font-weight">{{ language("TISHI", "提示") }}</div>
      </div>
      <div>
        {{
          language(
            "MTZTIP",
            "这个单据绑定了MTZ申请，请确认，您是否需要将MTZ解绑"
          )
        }}
      </div>
      <div slot="footer" class="footer">
        <iButton @click="close()">
          {{ language("QUXIAO", "取消") }}
        </iButton>
        <iButton @click="unbind()" v-if="canToDo" :loading="loading">
          {{ language("JIEBANGMTZ", "解绑，MTZ保持定点") }}
        </iButton>
        <iButton @click="cancelNominate()" v-if="canToDo" :loading="loading">
          {{ language("BUJIEBANGMTZ", "不解绑，MTZ取消定点") }}
        </iButton>
      </div>
    </iDialog>
  </iDialog>
</template>

<script>
import { iDialog, icon, iMessage, iButton } from "rise";
import {
  unbindMtz,
  unbindMtzCheck,
  cancelNominateCheck,
  bindMtzFlag,
  cancelNominate,
} from "@/api/designate/nomination";
export default {
  components: { iDialog, icon, iButton },
  props: {
    ...iDialog.props,
    nomiId: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      statusList: [],
      mtzVisible: false,
      loading: false,
    };
  },
  computed: {
    canToDo() {
      return this.statusList.length
        ? !this.statusList.some((item) => !item.pass)
        : false;
    },
  },
  watch: {
    nomiId: {
      immediate: true,
      handler(val) {
        this.cancelNominateCheck();
      },
    },
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
      this.loading = false;
      this.mtzVisible = false
      this.statusList = [];
    },

    // 取消定点前校验提示
    cancelNominateCheck() {
      this.loading = true;
      this.statusList = [];
      cancelNominateCheck({ nominateId: this.nomiId })
        .then((res) => {
          console.log(res);
          if (res?.code == "200") {
            this.statusList = res.data;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 查询是否绑定了mtz
    async bindMtzFlag() {
      let result = false;
      let params = {
        nomiId: this.nomiId
      };
      await bindMtzFlag(params).then((res) => {
        if (res?.code == "200") {
          result = res.data;
        }
      });
      return result;
    },
    async confirm() {
      let mtzFlag = false;
      let res = await this.bindMtzFlag({ nomiId: this.nomiId });
      if (res?.code == "200") {
        mtzFlag = res.data;
      }
      if(mtzFlag){
        this.mtzVisible = true
        return
      }
      this.cancelNominate()
    },
    //  先解绑，在取消
    async unbind() {
      // 校验是否支持解绑
      const state = await this.unbindMtzCheck()
      if (state) {
        const data = {
          nomiId: this.nomiId
        };
        try {
          const res = await unbindMtz(data)
          const { code } = res;
          if(code == 200){
            this.cancelNominate()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } catch(e) {
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        }
      }
    },
    // 取消MTZ绑定校验
    async unbindMtzCheck() {
      let state = true
      const data = {
        nomiId: this.nomiId,
        isCheck: false
      };
      try {
        const res = await unbindMtzCheck(data)
        const { code } = res;
        if(code == 200){
          state = true
        }else{
          state = false
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch(e) {
        state = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
      return state
    },
    //  取消定点
    cancelNominate() {
      cancelNominate({nominateId :this.nomiId}).then((res) => {
        if(res?.code=='200'){
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
          this.close()
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  overflow-y: auto;
  .success{
    font-size: 16px;
    font-weight: bold;
    color: #68c183;
    margin-bottom: 10px;
  }
  .error{
    font-size: 16px;
    font-weight: bold;
    color: #e30d0d;
    margin-bottom: 10px;
  }
  ::v-deep .el-step__icon.is-text {
    border: 0;
  }
  ::v-deep .icon {
    width: 20px;
    height: 20px;
  }
  .content {
    height: 100%;
    display: flex;
    flex-basis: 100%;
    flex-flow: column;
    .content-item {
      display: flex;
      flex-basis: 50%;
      .left {
        position: relative;
        display: flex;
        flex-flow: column;
        align-items: center;
        .icon {
          width: 20px;
          height: 20px;
          margin: 5px;
        }
        .line {
          flex: 1;
          width: 0;
          height: 100%;
          border-left: 3px dashed #a19797;
        }
      }
      .right {
        width: 100%;
        flex: 1;
        .title {
          line-height: 30px;
          font-weight: bold;
          display: inline-block;
          width: 160px;
        }
        .description {
          display: inline-block;
        }
      }
    }
  }
}
</style>