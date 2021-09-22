<!--
 * @Author: youy
 * @Date: 2021-06-21 19:38:02
 * @LastEditTime: 2021-08-24 15:28:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseList\components\analysisSearch.vue
-->
<template>
  <div>
    <iSearch  :icon="false" @reset="handleSearchReset" @sure="handleSubmitSearch">
      <el-form :model="searchForm">
        <el-form-item :label="item.key?$t(item.key):item.name" v-for="(item,index) in searchData" :key="index">
          <iInput class="margin-top6" v-model="searchForm[item.props]" :disabled="isDisabled(item.props)"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import {iSearch, iInput} from 'rise'
import {search} from './data'
export default {
  name: 'analysisSearch',
  components: {iSearch, iInput},
  data () {
    return {
      searchData: search,
      searchForm: {}
    }
  },
  created() {
    this.initData()
  },
  computed: {
    isDisabled() {
      return function(key) {
        let res = false
        if(key == 'rfqNo' && this.$store.state.rfq.entryStatus == 1) res = true
        return res
      }
    }
  },
  methods: {
    //初始化数据
    initData() {
      this.searchForm = {}
      this.searchForm = {
        ...this.searchForm,
        rfqNo: this.$store.state.rfq.rfqId,
        materialGroup: this.$store.state.rfq.materialGroup,
        partsNo: this.$store.state.rfq.spareParts,
      }
      this.$nextTick(() => {
        this.$emit('handleSubmitSearch', this.searchForm)
      })
    },
    //点击确认按钮
    handleSubmitSearch() {
      this.$emit('handleSubmitSearch', this.searchForm)
    },
    //点击重置按钮
    handleSearchReset() {
      this.initData()
    },
  } 
}
</script>

<style lang='less' scoped>

 
</style>
