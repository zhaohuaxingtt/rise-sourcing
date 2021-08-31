<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 15:18:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-30 16:03:20
 * @Description: 询价采购员下拉框
 * @FilePath: \front-web\src\views\project\components\commonSelect\fsSelect.vue
-->

<template>
  <iSelect :filterable="filterable" v-model="data" :placeholder="language('QINGXUANZE', '请选择')">
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
      data: this.value
    }
  },
  created() {
    this.getFSOPtions()
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>

</style>