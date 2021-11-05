<template>
  <i-dialog :title="language('LK_ZHUANPAI','转派')" :visible.sync="value"
            width="400px"
            @close="clearDiolog"
            top="40vh">
    <div class="d-content">
      <p class="d-content-title">请选择转派审批人</p>
      <i-select v-model="selBuyerId" class="margin-top10" :placeholder="language('LK_AEKO_DAIXUANZE','待选择')">
        <el-option
            :value="items.code"
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

export default {
  name: "AEKOTransferDialog",
  components: {
    iButton,
    iDialog,
    iSelect
  },
  props: {
    value: {type: Boolean, require: true, default: false},

  },
  data() {
    return {
      buyerNames: [],
      selBuyerId: ''
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
          });
        } else {
          this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    confirmTransfer() {
      this.value=false
      if (this.selBuyerId != null || this.selBuyerId != '') {
        this.$emit("confirmTransfer", this.selBuyerId);
      }
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