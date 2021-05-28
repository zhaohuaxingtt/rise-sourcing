<!--
 * @Author: your name
 * @Date: 2021-05-27 12:32:54
 * @LastEditTime: 2021-05-28 10:57:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\home\index.vue
-->
<template>
  <div class="home">
    <div class="control">
      <logButton class="margin-left20" />
      <span class="margin-left20">
        <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
      </span>
    </div>


    <!-- 技术资料下载弹窗 -->
    <downloadDialog :dialogVisible='downloadDialogVisible'/>
    <!-- CBD弹窗 -->
    <cbdDialog :dialogVisible='cbdDialogVisible'/>
  </div>
</template>

<script>
import { icon } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import downloadDialog from './components/downloadFiles'
import cbdDialog from './components/cbdStatus'
export default {
  components: { 
    icon, 
    logButton,
    downloadDialog,
    cbdDialog,
  },
  data(){
    return{
      downloadDialogVisible:false,
      cbdDialogVisible:false,
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .control {
    position: absolute;
    top: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>