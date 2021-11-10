<!--
 * @Author: your name
 * @Date: 2021-11-09 19:20:01
 * @LastEditTime: 2021-11-10 18:01:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\designate\designatedetail\decisionData\strategy\components\highligths.vue
-->
<script>
import {costAnalysisGet,costAnalysisStrage} from '@/api/designate/decisiondata/costanalysis'
import taskEditroComponents from '@/views/designate/designatedetail/tasks/components/editor'
export default {
  extends:taskEditroComponents,
  data(){
    return {
      higth:false
    }
  },
  methods:{
    submit(){
      costAnalysisStrage({
        nominateAppId:this.$route.query.desinateId,
        content:this.content,
        reportFiles:''
      }).then(r=>{
        this.multiEditControl = false
      })
    },
    getFetchData(){
      costAnalysisGet(this.$route.query.desinateId).then(r=>{
        this.content = r.data.content
        this.$refs.editor.html(this.content)
      })
    }
  }
}
</script>
