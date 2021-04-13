<!--
 * @Author: lvjiahong
 * @Date: 2021-04-12 15:30:00
 * @LastEditTime: 2021-03-08 09:44:27
 * @LastEditors: Please set LastEditors
 * @Description: 基于element的Input组件，支持element全属性
 * @FilePath: \Front\src\components\iInput\index.vue
--> 
<script>
import { DatePicker } from "element-ui";
export default {
  extends: DatePicker,
  props: {},
};
</script>
<style lang='scss' scoped>
.el-input {
  height: $input-height;
  .el-input__inner {
    @include input_inner;
  }
}
.el-textarea {
  .el-textarea__inner {
    @include textarea_inner;
  }
}
</style>