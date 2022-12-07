<!--
 * @Author: Luoshuang
 * @Date: 2021-11-03 13:51:10
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 13:53:01
 * @Description: 采购工厂下拉
 * @FilePath: \front-web\src\views\modelTargetPrice\components\procureFactorySelect.vue
-->

<template>
  <iSelect :filterable="filterable" v-model="data" :placeholder="language('QINGXUANZE', '请选择')" @change="change" :disabled="disabled">
    <el-option
      v-for="item in options"
      :key="item.code"
      :label="item.name"
      :value="item.code">
    </el-option>
  </iSelect>
</template>

<script>
import { iSelect } from 'rise'
import {procureFactorySelectVo} from '@/api/dictionary'
export default {
  components: { iSelect },
  props: {
    value: {type:String},
    filterable: {type:Boolean,default:false},
    optionType: {type:String,default:'1'},
    disabled: {type:Boolean,default:false}
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
    this.procureFactorySelectVo()
  },
  methods: {
    change(val) {
      this.$emit('change', val, this.options.find(item => item.value === val).label)
    },
    //获取采购工厂
    procureFactorySelectVo(){
      procureFactorySelectVo().then(res=>{
        this.options = res.data
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>