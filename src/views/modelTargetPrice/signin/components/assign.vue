<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-09 18:09:23
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\signin\components\assign.vue
-->

<template>
  <iDialog 
    :title="language('FENPEIMOJUKONGZHIYUAN','分配模具控制员')"
    :visible.sync="status"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('FENPAI','分派')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('XUANZEFENPEIDEFUZEREN','选择分配的负责人')">
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
import { getAppointUser } from '@/api/modelTargetPrice/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
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
      getAppointUser().then(res => {
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
    handleCancel() {
      this.clearDialog()
    },
    handleConfirm() {
      if (this.assign === '') {
        iMessage.warn(this.language('QINGXUANZEMOJUKONGZHIYUAN','请选择模具控制员'))
        return
      }
      this.loading = true
      this.$emit('sendAccessory', this.assign)
    },
    changeAssigLoading(loading) {
      this.loading = loading
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>