<template>
  <iDialog 
    :title="language('ZHIPAI','指派')"
    :visible.sync="status"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
      <iButton @click="handleConfirm" :loading="loading">{{language('FENPAI','分派')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('CF控制员','CF控制员')">
        <iSelect v-model="assign">
          <el-option
            v-for="item in assignOption"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>  
        </iSelect> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iMessage } from 'rise'
import { getCFECUserList, transferSelTargetPrice } from "@/api/SELTargetPrice";
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    selectItems: {type:Array, default:()=>[]}
  },
  data() {
    return {
      assign: '',
      assignOption: [],
      loading: false,
      status: false
    }
  },
  watch: {
    dialogVisible(nv) {
      if (nv) {
        this.getCF()
      } else {
        this.status = false
      }
    }
  },
  methods: {
    getCF() {
      getCFECUserList({}).then(res => {
          if (res.code == 200) {
            this.assignOption = res.data.map(item => {
              return {
                code: item.id,
                name: item.nameZh
              }
            })

            this.status = true
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            this.status = false
            this.$emit("update:dialogVisible", false)
          }
        }).finally(() => {
          if (!this.status) this.$emit("update:dialogVisible", false)
        })
    },
    clearDialog() {
      this.assign = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      if (this.assign === '') {
        iMessage.warn(this.language('请选择CF控制员','请选择CF控制员'))
        return
      }
      this.transferSelTargetPrice()
    },
    // 指派
    transferSelTargetPrice() {
      this.loading = true
      const params = {
        taskId: this.selectItems.map((item) => item.id),
        cfUserId: this.assign,
      };
      transferSelTargetPrice(params)
        .then((res) => {
          if (res?.code=='200') {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            this.clearDialog()  // 关闭弹窗
            this.$emit('getTableList')  // 重新获取数据
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.loading = false
        });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>