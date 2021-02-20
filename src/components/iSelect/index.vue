<!--
 * @Author: your name
 * @Date: 2021-02-20 14:35:10
 * @LastEditTime: 2021-02-20 16:36:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\components\iSelect\index.vue
-->
<script>
import {Select} from 'element-ui' 
export default{
  extends:Select,
    computed:{
    iconClass() {
        return this.remote && this.filterable ? '' : (this.visible ? ' is-reverse el-icon-caret-top' : ' iconfont el-icon-caret-top');
    }
  }
}
</script>
<style lang='scss' scoped>
  .el-select{
    height: $input-height;
    width: 100%;
    ::v-deep .el-input__inner{
      @include input_inner;
    }
    .el-input__icon{
      line-height: 33px;
    }
  }
</style>