<!--
 * @Author: your name
 * @Date: 2021-11-02 15:35:20
 * @LastEditTime: 2021-11-18 03:00:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\strategy\index.vue
-->
<template>
<div :key='randomNumber'>
  <iCard :title="language('OVERVIEWS','Overviews')">
    <div class="flex-align-center floatright" style="width:200px;">
      <span style="width:80px;">材料组</span>
      <iSelect v-model="categoryCode" @change="randomNumber++"> 
        <el-option v-for='(items,index) in catCodeList' :key='index' :value='items.categoryCode' :label="items.categoryName"></el-option> 
      </iSelect>
    </div>
    <powerBi :categoryCode="categoryCode" @updateCatgreyCode='updateCode'></powerBi>
  </iCard>
  <higthligthts v-if='categoryCode' :categoryCode="categoryCode" class='margin-top20 margin-bottom20'></higthligthts>
  <iCard :title='language("KEYINITIATIVE","Key initiatives")' class="mineCards">
    <iButton class="floatright" @click='open'>编辑</iButton>
    <listOfinit ref="listOfinit"  v-if='categoryCode' :categoryCodeProps="categoryCode" :extendsIsedit='false' :isEdit='isEdit'></listOfinit>
  </iCard>
</div>
</template>
<script>
import {iCard,iSelect,iButton} from 'rise'
import higthligthts from './components/highligths'
import powerBi from './components/powBi'
import listOfinit from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/listOfInitiatives'
export default{
  components:{iCard,higthligthts,powerBi,listOfinit,iSelect,iButton},
  data(){
    return {
      catCodeList:[],
      randomNumber:1,
      categoryCode:'',
      isEdit:''
    }
  },
  methods:{
    open(){
      this.$router.push({
        path:`/sourcing/categoryManagementAssistant/listOfInitiatives`,
        query:{
          categoryCode:this.categoryCode,
          categoryName:this.categoryName
        }
      })
    },
    updateCode(res){
      this.catCodeList = res
      try {
        this.categoryCode = this.catCodeList[0].categoryCode
        this.categoryName = this.catCodeList[0].categoryName
      } catch (error) {
        this.categoryCode = ''
        this.categoryName = ''
      }
      setTimeout(() => {
        this.isEdit = false
      }, 500);
    },

  }
}
</script>
<style lang='scss' scoped>
  .mineCards{
    ::v-deep.routerpage{
      padding: 0px;
      overflow: hidden;
    }
  }
</style>