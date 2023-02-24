<!--
 * @Author: your name
 * @Date: 2021-11-02 15:35:20
 * @LastEditTime: 2021-12-13 12:05:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\strategy\index.vue
-->
<template>
<div class="strategy">
  <iCard :title="language('OVERVIEWS','Overviews')">
    <div class="control">
      <div class="flex-align-center">
        <span class="">{{$t('CHAILIAOZU')}}</span>
        <iSelect v-model="categoryCode" @change="randomNumber++"> 
          <el-option v-for='(items,index) in catCodeList' :key='index' :value='items.categoryCode' :label="items.categoryCode+'-'+ ($i18n.locale === 'zh' ? items.categoryName :  items.categoryNameDe)"></el-option> 
        </iSelect>
        <iButton v-if="categoryCode && !isRoutePreview && !isApproval" v-permission.auto="SOURCING_NOMINATION_ATTATCH_STRATEGY_FILEMANAGE|文件管理" class="fileManageButton" @click="fileDialogVisible = true">{{ language("WENJIANGUANLI", "文件管理") }}</iButton>
      </div>
    </div>
    <imageList class="padding-top20" v-if="images.length" :images="images" />
    <powerBi :key='randomNumber' v-show="!forceHide && !images.length" :categoryCode="categoryCode" @updateCatgreyCode='updateCode'></powerBi>
  </iCard>
  <higthligthts :key='randomNumber' v-if='categoryCode' :categoryCode="categoryCode" class='margin-top20 margin-bottom20'></higthligthts>
  <iCard :title='language("KEYINITIATIVE","Key Initiatives")' class="mineCards" collapse :defalutCollVal="false">
    <iButton v-if="!isPreview && !nominationDisabled && !rsDisabled" v-permission.auto="SOURCING_NOMINATION_ATTATCH_STRATEGY_GOTOEDIT|前往编辑"  class="floatright" @click='open'>{{language('QIANWANGBIANJI','前往编辑')}}</iButton>
    <listOfinit :key='randomNumber' ref="listOfinit"  v-if='categoryCode' :categoryCodeProps="categoryCode" :extendsIsedit='false' :isEdit='isEdit'></listOfinit>
  </iCard>
  <fileManageDialog :visible.sync="fileDialogVisible" :nominateAppId="nominateAppId" :categoryCode="categoryCode" :isPreview="isPreview" @afterClose="getStrategy" />
</div>
</template>
<script>
import {iCard,iSelect,iButton} from 'rise'
import higthligthts from './components/highligths'
import powerBi from './components/powBi'
import listOfinit from '@/views/partsrfq/externalAccessToAnalysisTools/categoryManagementAssistant/listOfInitiatives'
import fileManageDialog from './components/fileManageDialog'
import imageList from './components/imageList'
import { getStrategy } from '@/api/designate/designatedetail/decisionData/strategy'

export default{
  components:{iCard,higthligthts,powerBi,listOfinit,iSelect,iButton,fileManageDialog, imageList},
  data(){
    return {
      catCodeList:[],
      randomNumber:1,
      categoryCode:'',
      isEdit:'',
      fileDialogVisible:false,
      nominateAppId: "", // 定点申请id
      loading: false,
      images: [],
      isPreview: false,
      forceHide: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
    isRoutePreview() {
      return this.$route.query.isPreview == 1
    },
    isApproval() {
      return this.$route.query.isApproval === "true"
    }
  },
  created() {
    this.nominateAppId = this.$route.query.desinateId
    this.isPreview = this.$route.query.isPreview == 1
  },
  watch: {
    categoryCode(code) {
      if (code) this.getStrategy()
    }
  },
  methods:{
    open(){
      this.$router.push({
        path:`/sourcing/categoryManagementAssistant/listOfInitiatives`,
        query:{
          categoryCode:this.categoryCode,
          categoryName:this.categoryName,
          groupList:JSON.stringify(this.catCodeList)
        }
      })
    },
    updateCode(res){
      this.catCodeList = res
      try {
        if (!this.categoryCode && !this.categoryName) {
          this.categoryCode = this.catCodeList[0].categoryCode
          this.categoryName = this.$i18n.locale === 'zh' ? this.catCodeList[0].categoryName :  this.catCodeList[0].categoryNameDe
        }
      } catch (error) {
        this.categoryCode = ''
        this.categoryName = ''
      }
      setTimeout(() => {
        this.isEdit = false
      }, 500);
    },
    // 获取附件列表
    getStrategy() {
      this.images = []
      this.forceHide = true
      this.loading = true

      getStrategy({
        nominateAppId: this.nominateAppId, // 定点申请id
        categoryCode: this.categoryCode, // 材料组code
      })
      .then(res => {
        if (res.code == 200) {
          try {
            const data = JSON.parse(res.data.reportFiles)
            this.images = Array.isArray(data.fileList) ? data.fileList.filter(item => item.flag === 1) : []
          } catch(e) {
            this.images = []
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => {
        this.forceHide = false
        this.loading = false
      })
    },
  }
}
</script>
<style lang='scss' scoped>
.strategy {
  margin-bottom: 70px;
  .control {
    // width: 360px;
    height: 40px;

    .label {
      width: 70px;
    }
    
    .flex-align-center {
      justify-content: flex-end;
    }

    ::v-deep .el-select {
      width: 200px;
    }
  }

  .table {
    ::v-deep .el-table__body-wrapper {
      height: auto !important;
    }
  }

  .icon {
    font-size: 16px;
  }

  .cursor {
    cursor: pointer;
  }

  .desc {
    transform: rotate(180deg);
    margin-left: 10px;
  }

  .fileManageButton {
    margin-left: 20px;
  }
}

.mineCards{
  ::v-deep.routerpage{
    padding: 0px;
    overflow: hidden;
  }
}
</style>