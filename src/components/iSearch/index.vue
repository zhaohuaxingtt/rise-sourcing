<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 16:34:49
 * @LastEditTime: 2021-02-26 14:52:47
 * @LastEditors: Please set LastEditors
 * @Description: 界面中存在的搜索区域，公共组件。
 * @FilePath: \rise\src\components\iSearch\index.vue
-->
<template>
  <iCard>
    <div class="iSearch-content">
      <div class="operation">
        <iButton>打开</iButton>
      </div>
      <div class="serch">
        <slot></slot>
      </div>
    </div>
  </iCard>
</template>
<script>
import {iCard,iButton} from '../index'
export default{
  components:{iCard,iButton}
}
</script>
<style lang='scss' scoped>
  .iSearch-content{
    overflow:hidden;
    .serch{margin-right: 30px;height:auto;overflow: hidden;
      ::v-deep .el-form-item{
        margin-bottom: 2px;
        width: 220px;
        float: left;
        margin-right: 50px;
        padding-left: 2px;
        .el-form-item__label{
          font-size: 14px;
          color:$color-black;
          font-weight: 400;
          line-height: 14px;
          margin-bottom: 8px;
        }
        .el-form-item__content{
          line-height: inherit;
        }
      }
     }
    .operation{float: right;width: 30px;}
  }
</style>