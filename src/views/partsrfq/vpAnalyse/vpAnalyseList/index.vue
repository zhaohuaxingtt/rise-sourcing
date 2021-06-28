<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-28 10:24:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\index.vue
-->
<template>
  <div>
    <analysisSearch :rfqNo="rfqNo" @handleSubmitSearch="handleSubmitSearch"/>
    
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{$t('TPZS.VPFXK')}}</p>
        <span class="buttonBox" v-if="!editMode">
          <iButton @click="clickEdit">{{$t('LK_BIANJI')}}</iButton>
          <iButton @click="clickAdd">{{$t('LK_CREATE')}}</iButton>
          <iButton @click="clickDel">{{$t('delete')}}</iButton>
        </span>
        <span class="buttonBox" v-if="editMode">
          <iButton @click="clickEdit">{{$t('LK_QUXIAO')}}</iButton>
          <iButton @click="clickSaveEdit">{{$t('LK_BAOCUN')}}</iButton>
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
      editMode: false, //模式， 0：正常模式 1：编辑模式
      rfqNo: '123123',    //rfq编号
      searchData: null,
      backUpData: [],
    }
  },
  created() {

  },
  methods: {
    //点击编辑/取消按钮，进入/退出编辑模式
    clickEdit() {
      if(!this.editMode) 
        this.backUpData = window._.cloneDeep(this.$refs.analysisTable.tableListData)
      else 
        this.$refs.analysisTable.tableListData = window._.cloneDeep(this.backUpData)
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
