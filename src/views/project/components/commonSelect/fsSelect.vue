<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 15:18:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-29 17:57:48
 * @Description: 询价采购员下拉框
 * @FilePath: \front-web\src\views\project\components\commonSelect\fsSelect.vue
-->

<template>
  <iSelect :filterable="filterable" v-model="data" :placeholder="language('QINGXUANZE', '请选择')" @change="handleChange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </iSelect>
</template>

<script>
import { iMessage, iSelect } from 'rise'
import { getAllFS } from '@/api/project'
export default {
  components: { iSelect },
  props: {
    value: {type:String,default:''},
    filterable: {type:Boolean,default:false}
  },
  watch: {
    data(val) {
      if (val) {
        this.$nextTick(() => {
          this.data = val
        })
      }
      this.$emit('input', val)
    },
    value(val) {
      this.data = val
    }
  },
  data() {
    return {
      options: [],
      data: this.value,
    }
  },
  created() {
    this.getFSOPtions()
  },
  methods: {
    handleChange(val) {
      // this.dataDesc = this.options.find(item => item.value === val).label
      this.$emit('handleChange', val, this.options.find(item => item.value === val).label,this.getPositionId(val))
    },
    getFSOPtions() {
      getAllFS().then(res => {
        if (res?.result) {
          this.options = res.data.map(item => {
            return {
              ...item,
              value: item.id,
              label: item.nameZh
            }
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    // 获取岗位id
    getPositionId(val){
      const positionItem = this.options.find(item => item.value === val).positionDTO || {};
      return positionItem.id || null;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>