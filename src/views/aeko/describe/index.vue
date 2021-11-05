<!--
 * @Author: wentliao
 * @Date: 2021-07-27 11:20:07
 * @Description: aeko描述
-->

<template>
  <iPage class="aekoDescribe">
      <div class="flex-between-center-center padding-left5 padding-right5">
        <h2 class="title">
        {{language('LK_AEKOHAO_MANAGE','AEKO号')}}：{{aekoCode}}
        </h2>
       <iNavMvp v-if="queryFrom == 'approve'" :list="describeTab" lang  :lev="2" routerPage right></iNavMvp>
      </div>
      

      <div class="contain margin-top20" ref="aekoDescribe">
        <el-row :gutter="20">
          <el-col :span="6">
            <iCard :class="`${noScorll.files ? 'needScorll' : ''}`+' filesCard'" :title="language('LK_AEKOFUJIAN','AEKO附件')">
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
  iNavMvp,
} from 'rise'
import aekoFilesList from './components/filesList'
import { describeTab } from '../data'
import {
  getAekoDesc,
} from '@/api/aeko/describe'
export default {
    name:'aekoDescribe',
    components:{
      iPage,
      iCard,
      aekoFilesList,
      iNavMvp,
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
        },
        describeTab:describeTab,
        queryFrom:'',
      }
    },
    created(){
      this.getDetail();
      // 把当前路由的参数带过去
       const {query} = this.$route;
       const {from=null} = query;
       this.queryFrom = from;
       if(from!='approve'){
        this.describeTab = describeTab.slice(0,1);
      }else{
        describeTab.map((item)=>{
          if(item.key == 'LK_AEKO_PARTSLIST'){
            item.query = query
          }
        })
        this.describeTab = describeTab;
      }
      
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
    .filesCard{
      padding-bottom: 20px;
      ::v-deep .cardHeader {
        padding-bottom: 0;
        .title{
          text-indent: -15px;
        }
      }
    }
    ::v-deep.cardBody{
      height: 600px;
      margin-right: 5px;
      margin-bottom: 10px;
    }
  }
</style>
