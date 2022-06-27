<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 15:22:33
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-30 16:04:52
 * @Description: 项目管理员下拉
 * @FilePath: \front-web\src\views\project\components\commonSelect\productPurchaserSelect.vue
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
import { getAllProPurchaser } from '@/api/project'
export default {
  components: { iSelect },
  props: {
    value: {type:String,default:''},
    filterable: {type:Boolean,default:false}
  },
  data() {
    return {
      options: [],
      data: this.value
    }
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
  created() {
    this.getProductPurchaserOptions()
  },
  methods: {
    getProductPurchaserOptions() {
      getAllProPurchaser().then(res => {
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