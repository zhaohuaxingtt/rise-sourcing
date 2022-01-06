<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 15:30:10
 * @LastEditors: Luoshuang
 * @LastEditTime: 2022-01-06 19:47:33
 * @Description: 车型项目下拉
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\components\carProjectSelect.vue
-->

<template>
  <iSelect :filterable="filterable" v-model="data" :placeholder="language('QINGXUANZE', '请选择')" @change="change" :disabled="disabled">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </iSelect>
</template>

<script>
import { iMessage, iSelect } from 'rise'
import { dictkey } from "@/api/partsprocure/editordetail"
export default {
  components: { iSelect },
  props: {
    value: {type:String},
    filterable: {type:Boolean,default:false},
    optionType: {type:String,default:'1'},
    disabled: {type:Boolean,default:false},
    valueType: {type:String,default:'1'}
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
    this.getProcureGroup()
  },
  methods: {
    change(val) {
      this.$emit('change', val, this.options.find(item => item.value === val).label)
    },
    /**
     * @Description: 获取下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.options = res.data.CAR_TYPE_PRO || []
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>

</style>