<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-10-14 23:17:04
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\index.vue
-->
<template>
  <div>
    <analysisSearch @handleSubmitSearch="handleSubmitSearch"/>
    
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{$t('TPZS.VPFXK')}}</p>
        <!-- 是否显示新建按钮 -->
        <!-- v-if="disabled" -->
        <span>
          <span class="buttonBox" v-if="!editMode">
            <iButton @click="clickAdd" v-permission="WORKBENCH_RFQ_TPZS_CARD_VP_ADD">{{$t('TPZS.LK_CREATE')}}</iButton>
            <iButton @click="clickEdit" v-permission="WORKBENCH_RFQ_TPZS_CARD_VP_EDIT">{{$t('LK_BIANJI')}}</iButton>
            <iButton @click="clickDel" v-permission="WORKBENCH_RFQ_TPZS_CARD_VP_REMOVE">{{$t('LK_SHANCHU')}}</iButton>
          </span>
          <span class="buttonBox" v-if="editMode">
            <iButton @click="clickEdit">{{$t('LK_QUXIAO')}}</iButton>
            <iButton @click="clickSaveEdit">{{$t('LK_BAOCUN')}}</iButton>
          </span>
        </span>
      </div>
      <analysisTable v-if="isShowTable" ref="analysisTable" :editMode="editMode" :searchData="searchData"/>
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iMessage} from 'rise'
import analysisSearch from './components/analysisSearch'
import analysisTable from './components/analysisTable'
export default {
  name: 'AnalysisTool',
  components: {iCard, iButton, analysisSearch, analysisTable},
  data () {
    return {
      editMode: false, //模式， 0：正常模式 1：编辑模式
      round: null,        //round
      searchData: null,
      backUpData: [],
      isShowTable: true
    }
  },
  inject: ['getDisabled'],
  computed: {
    disabled() {
      console.log(this.getDisabled)
      console.log(this.getDisabled())
      return typeof this.getDisabled === "function" ? this.getDisabled() : false
    }
  },
  created() {
    this.round = this.$route.query.round ? this.$route.query.round : this.round
  },
  methods: {
    //点击编辑/取消按钮，进入/退出编辑模式
    clickEdit() {
      if(!this.editMode) 
        this.backUpData = window._.cloneDeep(this.$refs.analysisTable.tableListData)
      else 
        this.$refs.analysisTable.cancelEditVP(this.backUpData)
      this.editMode = !this.editMode
    },
    //点击保存编辑数据
    clickSaveEdit() {
      this.editMode = false
      this.$refs.analysisTable.clickSaveEdit()
    },
    //点击新建按钮，跳转新建页面
    clickAdd() {
      const targetUrl = '/sourcing/partsrfq/vpAnalyCreat'
      const newOpenAdd = this.$router.resolve({
        path: targetUrl,
        query: {
          round: this.round,
          partsNo: this.searchData ? this.searchData.partsNo : null,
          materialGroup: this.searchData ? this.searchData.materialGroup : null,
        }
      })
      window.open(newOpenAdd.href,'_blank')
    },
    //点击删除按钮
    clickDel() {
      this.isShowTable = false
      this.$refs.analysisTable.clickSaveDel()
      this.isShowTable = true
    },
    //点击搜索按钮
    handleSubmitSearch(searchData) {
      this.searchData = searchData
      this.$refs.analysisTable.page.currPage = 1
      this.$refs.analysisTable.page.pageSize = 10
      this.$nextTick(() => {
        this.$refs.analysisTable.getTableData().then(res => {
          if(res.code == "200" && res.result){

          }else{
            iMessage.error(this.$t('TPZS.BQWFCXDJGSRCWHBCZQQRHCXSR'))
          }
        })
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
</style>
