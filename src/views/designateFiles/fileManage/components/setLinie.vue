<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-25 14:21:30
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\designateFiles\fileManage\components\setLinie.vue
-->

<template>
  <iDialog 
    :title="language('FENPEILINIECSS','分配LINIE/CSS')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="381px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="saveLoading">{{language('QUEREN','确认')}}</iButton>
      <iButton @click="clearDialog">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form>
      <el-form-item :label="language('QINGXUANZEFENPEIDEFUZEREN','请选择分配的负责人')">
        <iSelect filterable v-model="respLINIE" :placeholder="language('QINGXUANZE','请选择')">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.nameZh"
            :value="item.id">
          </el-option>
        </iSelect> 
        <!-- <iSelect 
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
        </iSelect>  -->
      </el-form-item>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect } from 'rise'
import { findBuyer } from '@/api/designateFiles/index'
import { iMessage } from '../../../../components'
import { cloneDeep } from 'lodash'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      respDept: '',
      respLINIE: '',
      options: [],
      optionsTemp: [],
      loading: false,
      saveLoading: false
    }
  },
  created() {
    this.getLinieOption()
  },
  methods: {
    /**
     * @Description: 获取linie下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getLinieOption() {
      findBuyer().then(res => {
        if (res?.result) {
          this.options = res.data || []
        } else {
          // iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    clearDialog() {
      this.respDept = ''
      this.respLINIE = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      if (!this.respLINIE) {
        iMessage.warn(this.language('QINGXUANZELINIE','请选择LINIE'))
      }
      this.saveLoading = true
      this.findOption = this.options.find(item => item.id === this.respLINIE)
      this.$emit('updateLinie', this.findOption)
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        findBuyer(query).then(res => {
          if (res?.result) {
            this.options = cloneDeep(res.data || [])
            this.optionsTemp = cloneDeep(res.data)
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          }
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.options = [];
      }
    },
    changeLoading(loading) {
      this.saveLoading = loading
    }
  }
}
</script>

<style lang="scss" scoped>

</style>