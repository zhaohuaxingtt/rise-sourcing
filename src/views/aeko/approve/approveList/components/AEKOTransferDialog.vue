<template>
  <i-dialog :title="language('LK_ZHUANPAI','转派')" :visible.sync="value"
            width="400px"
            @close="clearDiolog"
            top="40vh">
    <div class="d-content">
      <p class="d-content-title">请选择转派审批人</p>
      <i-select v-model="selBuyer" class="margin-top10" :placeholder="language('LK_AEKO_DAIXUANZE','待选择')">
        <el-option
            :value="items"
            :label="items.value"
            v-for="(items, index) in buyerNames || []"
            :key="index"
        ></el-option>
      </i-select>
      <div style="text-align: right" class="margin-top30 padding-bottom30">
        <i-button @click="confirmTransfer">{{ language('LK_ZHUANPAI', '转派') }}</i-button>
      </div>
    </div>
  </i-dialog>
</template>

<script>
import {iButton, iDialog, iSelect} from 'rise'
import {getRoleUserList} from "@/api/aeko/approve";
import {roleMixins} from "@/utils/roleMixins";

export default {
  name: "AEKOTransferDialog",
  components: {
    iButton,
    iDialog,
    iSelect
  },
  mixins:[roleMixins],
  props: {
    value: {type: Boolean, require: true, default: false},

  },
  data() {
    return {
      buyerNames: [],
      selBuyer: {}
    }
  },
  created() {
    this.queryRoleUserList()
  },
  methods: {
    clearDiolog() {
      this.$emit("input", false);
    },

    queryRoleUserList() {

      getRoleUserList({roleCode:'QQCGGZ'}).then((res) => {
        const {code, data} = res;
        if (code == 200) {
          this.buyerNames = data.map((item) => {
            return {
              value: this.$i18n.locale === "zh" ? item.nameZh : item.nameEn,
              code: item.id,
              lowerCaseLabel: typeof item.nameEn === "string" ? item.nameEn.toLowerCase() : item.nameEn
            }
          }).filter(item=>item.code!=this.userInfo.id);
        } else {
          this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    confirmTransfer() {
      this.value=false
      if (this.selBuyer != null || this.selBuyer != '') {
       this.$emit("confirmTransfer", this.selBuyer);
      }
      this.clearDiolog()
    }
  },


}
</script>

<style scoped lang="scss">
.d-content-title {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #000000;
}
</style>