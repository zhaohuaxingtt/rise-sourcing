<!--
 * @Author: your name
 * @Date: 2021-11-09 19:20:01
 * @LastEditTime: 2021-11-18 01:55:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\views\designate\designatedetail\decisionData\strategy\components\highligths.vue
-->
<script>
import {costAnalysisGet,costAnalysisStrage} from '@/api/designate/decisiondata/costanalysis'
import taskEditroComponents from '@/views/designate/designatedetail/tasks/components/editor'
export default {
  extends:taskEditroComponents,
  props:{
    categoryCode:String
  },
  data(){
    return {
      higth: false,
      isPreview: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    isDisabled() {
      return this.isPreview || this.nominationDisabled || this.rsDisabled
    }
  },
  created() {
    this.isPreview = this.$route.query.isPreview == 1
  },
  methods:{
    submit(){
      costAnalysisStrage({
        nominateAppId:this.$route.query.desinateId,
        content:this.content,
        reportFiles:'',
        categoryCode:this.categoryCode
      }).then(r=>{
        this.multiEditControl = false
      })
    },
    getFetchData(){
      costAnalysisGet({
        nominateAppId: this.$route.query.desinateId,
        type: this.categoryCode
      },).then(r=>{
        this.content = r.data.content
        this.$refs.editor.html(this.content)
      })
    }
  }
}
</script>
