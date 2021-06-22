<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-18 14:45:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\index.vue
-->
<template>
  <div>
    <analysisSearch/>
    
    <iCard :title="title" class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{title}}</p>
        <span class="buttonBox" v-if="!editMode">
          <iButton @click="clickEdit">编辑</iButton>
          <iButton>新建</iButton>
          <iButton>删除</iButton>
        </span>
        <span class="buttonBox" v-if="editMode">
          <iButton @click="clickEdit">取消</iButton>
          <iButton @click="clickSaveEdit">保存</iButton>
        </span>
      </div>
      <analysisTable :editMode="editMode"/>
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

    }
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
