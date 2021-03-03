<!--
 * @Author: yuszhou
 * @Date: 2021-03-01 17:17:17
 * @LastEditTime: 2021-03-03 15:14:54
 * @LastEditors: Please set LastEditors
 * @Description: 为不同的宽度item做出UI还原
 * @FilePath: \rise\src\components\iFromItem\index.vue
-->
<script>
import {FormItem} from 'element-ui'
export default{
  extends:FormItem
}
</script>
<style lang='scss' scoped>
  @for $i from 1 through 6{
  .row#{$i}{
    margin-bottom: 25px;
    margin-right: 60px;
    width: calc((100% - (#{$i} - 1) *60px) / #{$i});
    display: flex;
    float: left;
    &:nth-child(#{$i}n){
      margin-right: 0px;
    }
    ::v-deep.el-form-item__label{
      width: 200px;
      text-align: left;
      font-size: 16px;
      color: #4B4B4C;
    }
    ::v-deep.el-form-item__content{
      text-align: right;
      flex: 1;
    }
  }
  }
  .icon_self{
    .el-form-item__label{
      padding-left: 28px;
      position: relative;
      &::before{
          content: "";
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background-color: #1660F1;
          display: inline-block;
          position: absolute;
          left: 0px;
          top: 15px;
          z-index: 2;
      }
      &::after{
          content: "";
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background-color: #DBE5FF;
          display: inline-block;
          position: absolute;
          left: 0px;
          top: 11px;
          z-index: 1;
      }
    }
  }
</style>
