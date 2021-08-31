<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 15:30:10
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-30 16:05:25
 * @Description: 车型项目下拉
 * @FilePath: \front-web\src\views\project\components\commonSelect\carProjectSelect.vue
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
import { getCarTypePro } from '@/api/project'
export default {
  components: { iSelect },
  props: {
    value: {type:String},
    filterable: {type:Boolean,default:false},
    optionType: {type:String,default:'1'}
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
    // 获取所有车型项目
    this.optionType === '1' && this.getCarProjectOptions()
  },
  methods: {
    getCarProjectOptions() {
      getCarTypePro().then(res => {
        if (res?.result) {
          this.options = res.data.map(item => {
            return {
              ...item,
              value: item.id,
              label: item.cartypeProName
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