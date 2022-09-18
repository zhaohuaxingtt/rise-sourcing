<template>
  <iSearch :icon="icon" class="margin-bottom20" @sure="sure" @reset="reset" :resetKey="QUEREN" :searchKey="REST">
    <el-form>
      <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.key?language(item.key, item.label):item.label">
        <iSelect clearable v-update v-if="item.type === 'select'" v-model="searchParams[item.prop]" :multiple="item.multiple"
          :placeholder="language('QINGXUANZE', '请选择')">
          <!-- <el-option value="" :label="language('ALL', '全部')"></el-option> -->
          <el-option v-for="item_ in selectOptions[item.selectOption] || []" :key="item_.value" :label="item_.label"
            :value="item_.value">
          </el-option>
        </iSelect>
        <iDatePicker v-else-if="item.type === 'date'" value-format="yyyy-MM-dd" type="daterange"
          v-model="searchParams[item.prop]" :placeholder="language('QINGXUANZE', '请选择')"></iDatePicker>
        <iMultiLineInput v-else-if="item.type === 'multiLineInput'" v-model="searchParams[item.prop]"
          :title="language(item.key, item.label)" />
        <iInput clearable v-else v-model="searchParams[item.vpropalue]" :placeholder="language('QINGSHURU', '请输入')"></iInput>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iDatePicker, iSelect, iMultiLineInput } from "rise"
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
    iMultiLineInput
  },
  props:{
    searchList:{ type: Array, default: ()=>[]},
    selectOptions:{ type: Array, default: ()=>({})},
    icon: { type: Boolean, default: true }
  },
  data(){
    return {
      searchParams:{},
    }
  },
  created(){
    this.searchList.map(item=>{
      this.$set(this.searchParams,[item.prop],'')
    })
  },
  methods:{
    sure() {
      this.$emit('sure', this.searchParams)
    },
    reset() {
      // this.searchList.map(item=>{
      //   this.$set(this.searchParams,[item.prop],'')
      // })
      // this.$emit('reset', {})
      this.$emit('reset')
    },
  }
}
</script>

<style lang="scss" scoped>
</style>