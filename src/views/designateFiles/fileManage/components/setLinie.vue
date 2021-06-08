<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 17:50:51
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\designateFiles\fileManage\components\setLinie.vue
-->

<template>
  <iDialog 
    title="分配LINIE/CSS"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm">确认</iButton>
      <iButton @click="clearDialog">取消</iButton>
    </template>
    <el-form>
      <el-form-item label="请选择分配的负责人">
        <iSelect 
          v-model="respLINIE"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.nameZh"
            :value="item.id">
          </el-option>
        </iSelect> 
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
import { findBuyer } from '@/api/designateFiles/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      respDept: '',
      respLINIE: '',
      options: '',
      loading: false
    }
  },
  methods: {
    clearDialog() {
      this.respDept = ''
      this.respLINIE = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.$emit('updateLinie', this.respDept, this.respLINIE)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        // setTimeout(() => {
        //   this.loading = false;
        //   this.options = this.list.filter(item => {
        //     return item.label.toLowerCase()
        //       .indexOf(query.toLowerCase()) > -1;
        //   });
        // }, 200);
        findBuyer(query).then(res => {
          if (res?.result) {
            this.options = res.data || []
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          }
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.options = [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>