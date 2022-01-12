<!--
 * @Author: 谈判助手界面
 * @Date: 2021-05-25 11:32:11
 * @LastEditTime: 2022-01-10 11:36:49
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetailInfo\index.vue
-->
<script>
import editordetail from '../editordetail'
export default{
  extends:editordetail,
  data(){
    return {
      navActivtyValue:2
    }
  },
  created(){
    this.$route.query.form = 'assistant'
  }
}
</script>