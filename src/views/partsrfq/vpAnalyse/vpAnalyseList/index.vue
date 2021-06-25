<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-24 16:18:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\index.vue
-->
<template>
  <div>
    <analysisSearch :rfqNo="rfqNo" @handleSubmitSearch="handleSubmitSearch"/>
    
    <iCard :title="title" class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{title}}</p>
        <span class="buttonBox" v-if="!editMode">
          <iButton @click="clickEdit">编辑</iButton>
          <iButton @click="clickAdd">新建</iButton>
          <iButton @click="clickDel">删除</iButton>
        </span>
        <span class="buttonBox" v-if="editMode">
          <iButton @click="clickEdit">取消</iButton>
          <iButton @click="clickSaveEdit">保存</iButton>
        </span>
      </div>
      <analysisTable ref="analysisTable" :editMode="editMode"/>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton} from 'rise'
import analysisSearch from './components/analysisSearch'
import analysisTable from './components/analysisTable'
export default {
  name: 'AnalysisTool',
  components: {iCard, iButton, analysisSearch, analysisTable},
  data () {
    return {
      title: 'volume Pricing分析库',
      editMode: false, //模式， 0：正常模式 1：编辑模式
      rfqNo: '123123',    //rfq编号
      searchData: null,
    }
  },
  created() {

  },
  methods: {
    //点击编辑/取消按钮，进入/退出编辑模式
    clickEdit() {
      this.editMode = !this.editMode
    },
    //点击保存编辑数据
    clickSaveEdit() {
      this.editMode = false
      this.$refs.analysisTable.clickSaveEdit()
    },
    //点击新建按钮，跳转新建页面
    clickAdd() {
      const targetUrl = '/sourcing/partsrfq/vpAnalyCreat'
      this.$router.push({
        path: targetUrl,
        query: {
          rfqId: this.rfqNo
        }
      })
    },
    //点击删除按钮
    clickDel() {
      this.$refs.analysisTable.clickSaveDel()
    },
    //点击搜索按钮
    handleSubmitSearch(searchData) {
      this.$refs.analysisTable.getTableData(searchData)
    },
  }
}
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}

 
</style>
