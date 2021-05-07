<!--
 * @Author: yuszhou
 * @Date: 2020-07-30 12:23:08
 * @LastEditTime: 2021-03-08 09:44:27
 * @LastEditors: Please set LastEditors
 * @Description: 基于element的Input组件，支持element全属性
 * @FilePath: \Front\src\components\iInput\index.vue
--> 
<script>
import { Input } from 'element-ui' 
export default{
  extends:Input,
}
</script>
<style lang='scss' scoped>
  .el-input{
    height: $input-height;
    .el-input__inner{
      @include input_inner;
    }
  }
  .el-textarea{
    .el-textarea__inner{
      @include textarea_inner;
    }
  }
  .el-icon-search{
    color: #CBCBCB;
    font-size: 20px;
    cursor: pointer;
  }
  .el-input__suffix-inner{
    font-size: 16px;
    cursor: pointer;
  }
</style>