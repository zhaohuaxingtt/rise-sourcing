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
      <div class="contain margin-top20">
        <el-row :gutter="10">
          <el-col :span="8">
            <iCard :title="language('LK_AEKOFUJIAN','AEKO附件')">
              <aekoFilesList :attachmentList="attachmentList"/>
            </iCard>
          </el-col>
          <el-col :span="16">
            <iCard :title="language('LK_AEKOFUJIANMIAOSHU','AEKO描述')">

              {{remark}}

              <p class="remark-tips">{{language('LK_ZHONGWENFANYIJINGONGCANKAOYIDEWENWEIZHUN','中文翻译仅供参考，以德文为准：')}}</p>

              <p>{{language('LK_ZHONGWENFANYIYUANZITCM','中文翻译（源自TCM）')}}</p>
              
              {{remarkZh}}
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
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
      }
    }
    
}
</script>

<style lang="scss" scoped>
  .aekoDescribe{
    .remark-tips{
      margin:50px 0;
    }
  }
</style>
