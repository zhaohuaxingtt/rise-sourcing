<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 16:00:14
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-14 12:30:39
 * @Description: 批量更新采购工厂
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\components\updateFactory.vue
-->

<template>
  <iDialog 
    :title="language('PILIANGGENGXINCAIGOUGONGCHANG','批量更新采购工厂')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('QUEREN','确认')}}</iButton>
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('QINGXUANZECAIGOUGONGCHANG','请选择采购工厂')">
        <iSelect v-model="factory">
          <el-option
            :value="item.id"
            :label="item.name"
            v-for="(item, index) in fromGroup.PURCHASE_FACTORY"
            :key="index"
          ></el-option>  
        </iSelect> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
import {
  dictkey,
} from "@/api/partsprocure/editordetail";
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      factory: '',
      fromGroup: {},
      loading: false
    }
  },
  created() {
    this.getProcureGroup()
  },
  methods: {
    //获取上方group信息
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.fromGroup = res.data;
        }
      });
    },
    clearDialog() {
      this.factory = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.loading = true
      this.$emit('updateFactory', this.factory, this.fromGroup.PURCHASE_FACTORY.find(item => item.id === this.factory).name)
    },
    changeLoading(loading) {
      this.loading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>