<!--
 * @Author: youy
 * @Date: 2021-06-21 19:38:02
 * @LastEditTime: 2021-06-25 10:46:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseList\components\analysisSearch.vue
-->
<template>
  <div>
    <iSearch  @reset="handleSearchReset" @sure="handleSubmitSearch">
      <el-form :model="searchForm">
        <el-form-item :label="item.key?$t(item.key):item.name" v-for="(item,index) in searchData" :key="index">
          <iInput class="margin-top6" v-model="searchForm[item.props]"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import {iSearch, iSelect, iInput} from 'rise'
import {search} from './data'
export default {
  name: 'analysisSearch',
  components: {iSearch, iSelect, iInput},
  props: {
    rfqNo: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      searchData: search,
      searchForm: {}
    }
  },
  created() {
    if(this.rfqNo) {
      this.searchForm = {
        ...this.searchForm,
        rfqNo: this.rfqNo
      }
    }
  },
  methods: {
    //点击确认按钮
    handleSubmitSearch() {
      this.$emit('handleSubmitSearch', this.searchForm)
    },
    //点击重置按钮
    handleSearchReset() {
      this.searchForm = {}
      this.$emit('handleSubmitSearch', null)
    }
  } 
}
</script>

<style lang='less' scoped>

 
</style>
