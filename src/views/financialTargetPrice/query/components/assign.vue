<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-05 20:53:13
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\financialTargetPrice\query\components\assign.vue
-->

<template>
  <iDialog 
    :title="language('LK_ZHIPAI','指派')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('LK_ZHIPAI','指派')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('QINGXUANZEZHIPAIREN','请选择指派人')">
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
import { getCFList } from '@/api/financialTargetPrice/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
  },
  data() {
    return {
      assign: '',
      assignOption: [],
      loading: false
    }
  },
  created() {
    this.getCF()
  },
  methods: {
    getCF() {
      getCFList().then(res => {
        if (res?.result) {
          this.assignOption = res.data.map(item => {
            return {
              code: item.id,
              name: item.nameZh
            }
          })
        }
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
        iMessage.warn(this.language('QINGXUANZEXUNJIACAIGOUYUAN','请选择询价采购员'))
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