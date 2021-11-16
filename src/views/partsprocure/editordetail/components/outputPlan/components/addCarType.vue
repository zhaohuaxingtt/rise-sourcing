<!--
 * @Description: CF车型配置
 * @Author: tyra liu
 * @Date: 2021-11-16 16:54:18
 * @LastEditTime: 2021-11-16 18:07:57
 * @LastEditors:  
-->
<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="changeVisible"
  >
    <div class="top">
      <div class="top-left">
        <span class="title">{{language('CHEXING','车型')}}</span>
        
      </div>
      <div class="top-right">
        <iButton>{{language('QUXIAO','取消')}}</iButton>
        <iButton>{{language('YINGYONG','应用')}}</iButton>
      </div>
    </div>
    <!-- <tableList
      :titleTitle="carTitle"
    >

    </tableList> -->
  </iDialog>
</template>
<script>
import {iDialog, iButton} from "rise"
// import tableList from "@/views/partsign/editordetail/components/tableList";
// import {carTitle} from "./data"
export default {
  components: { iDialog, iButton},
  props: {
    dialogVisible: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      carTitle,
    }
  },
  methods: {
    changeVisible() {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style scoped lang="scss">
  .top{
    display: flex;
    justify-content: space-between;
    .top-left{
      .title{
          font-size: 18px;
          color: #131523;
          font-weight: bold;
        }
    }
  }
</style>