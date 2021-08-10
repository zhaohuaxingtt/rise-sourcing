<!--
 * @Author: wentliao
 * @Date: 2021-07-27 11:20:07
 * @Description: aeko描述
-->

<template>
  <iPage class="aekoDescribe">
      <h2 class="title">
        {{language('LK_AEKOHAO_MANAGE','AEKO号')}}：{{aekoCode}}
      </h2>
      <div class="contain margin-top20" ref="aekoDescribe">
        <el-row :gutter="10">
          <el-col :span="6">
            <iCard :class="noScorll.files ? 'needScorll' : ''" :title="language('LK_AEKOFUJIAN','AEKO附件')">
              <aekoFilesList class="card-files" :attachmentList="attachmentList"/>
            </iCard>
          </el-col>
          <el-col :span="18">
            <iCard :class="noScorll.contain ? 'needScorll' : ''" :title="language('LK_AEKOFUJIANMIAOSHU','AEKO描述')">
              <div class="card-contain font14">
                {{remark}}

                <p class="remark-tips">{{language('LK_ZHONGWENFANYIJINGONGCANKAOYIDEWENWEIZHUN','中文翻译仅供参考，以德文为准：')}}</p>

                <p>{{language('LK_ZHONGWENFANYIYUANZITCM','中文翻译（源自TCM）')}}</p>
                
                {{remarkZh}}

              </div>
            </iCard>
          </el-col>
        </el-row>
      </div>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iMessage,
} from 'rise'
import aekoFilesList from './components/filesList'
import {
  getAekoDesc,
} from '@/api/aeko/describe'
export default {
    name:'aekoDescribe',
    components:{
      iPage,
      iCard,
      aekoFilesList,
    },
    data(){
      return{
        attachmentList:[],
        remark:'',
        remarkZh:'',
        aekoCode:'',
        noScorll:{
          contain:false,
          files:false,
        }
      }
    },
    created(){
      this.getDetail();
      
    },
    methods:{
      // 获取详情
      async getDetail(){
        const {query} = this.$route;
        const { requirementAekoId ='',aekoCode,} = query;
        this.aekoCode = aekoCode;
        await getAekoDesc({requirementAekoId}).then((res)=>{
          const {code,data} = res;
          if(code == 200){
            const {attachmentList=[],remark,remarkZh} = data; 
            this.attachmentList = attachmentList;
            this.remark = remark;
            this.remarkZh = remarkZh;
            this.resetHeight();
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
      },
      resetHeight(){
      this.$nextTick(()=>{
        const parentHeight = this.$refs['aekoDescribe'].offsetHeight;
        const containHeight = this.$refs['aekoDescribe'].querySelector('.card-contain').offsetHeight;
        const filesHeight = this.$refs['aekoDescribe'].querySelector('.card-files').offsetHeight;
        console.log(parentHeight,containHeight,filesHeight);
        this.noScorll = {
          contain:containHeight+50 > parentHeight,
          files:filesHeight+50 > parentHeight,
        }
      });
    },
    },
    
}
</script>

<style lang="scss" scoped>
  .aekoDescribe{
    .remark-tips{
      margin:50px 0;
    }
    .needScorll{
      ::v-deep.cardBody{
        overflow-y: scroll;
      }
    }
    ::v-deep.cardBody{
      height: 600px;
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
</style>
