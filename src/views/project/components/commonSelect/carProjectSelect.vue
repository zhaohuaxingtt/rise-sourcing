<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 15:30:10
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-08 17:25:58
 * @Description: 车型项目下拉
 * @FilePath: \front-sourcing\src\views\project\components\commonSelect\carProjectSelect.vue
-->

<template>
  <iSelect :filterable="filterable" :multiple="multiple" v-model="data" :placeholder="language('QINGXUANZE', '请选择')" @change="change" :disabled="disabled">
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
import { getCarTypePro, getSelectCarType } from '@/api/project'
import { getDefaultCarTypePro } from '@/api/project/projectprogressreport'
export default {
  components: { iSelect },
  props: {
    value: {type:String},
    filterable: {type:Boolean,default:false},
    multiple: {type:Boolean,default:false},
    optionType: {type:String,default:'1'},
    disabled: {type:Boolean,default:false},
    valueType: {type:String,default:'1'},
    carProjectName: {type:String}
  },
  data() {
    return {
      options: [],
      data: this.carProjectName
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
      console.log(val);
      // this.data = val
    },
    carProjectName:{
      deep:true,
      handler(val){
        console.log(val);
      }
    }
  },
  created() {
    this.data = this.carProjectName
    // 获取所有车型项目
    this.optionType === '1' && this.getCarProjectOptions()
    // 获取当前用户所有未SOP和所有已SOP的车型项目
    this.optionType === '2' && this.getCarProjectUserOptions()
  },
  methods: {
    defaultCar(){
      getDefaultCarTypePro().then(res=>{
        console.log(res);
        if(res.result){
          // this.options.find(item => item.value === val).label
          this.$emit("defaultCarModel",res.data)
        }
      })
    },
    change(val) {
      this.$emit('change', val, this.options.find(item => item.value === val).label,this.options.find(item => item.value === val).cartypeId)
    },
    getCarProjectOptions() {
      getCarTypePro().then(res => {
        if (res?.result) {
          this.data = this.value
          this.options = res.data.map(item => {
            return {
              ...item,
              value: this.valueType === '1' ? item.id : item.cartypeProCode,
              label: item.cartypeProName
            }
          })

          this.defaultCar();
          console.log(this.options);
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    getCarProjectUserOptions() {
      console.log(this.data);
      getSelectCarType().then(res => {
        if (res?.result) {
          this.data = this.value
          this.options = res.data.map(item => {
            return {
              ...item,
              value: this.valueType === '1' ? item.id : item.cartypeProCode,
              label: item.cartypeProjectZh
            }
          })
          this.defaultCar();
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      console.log(this.value);
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>