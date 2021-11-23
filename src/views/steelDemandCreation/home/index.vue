<!--
 * @Author: yuszhou
 * @Date: 2021-06-29 17:02:51
 * @LastEditTime: 2021-11-16 20:58:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\steeldemandcreation\index.vue
-->
<template>
  <iPage >
    <div class="topMenu" v-permission.auto="SOURCING_STEELDEMANCREATION_PAGE|钢材管理">
      <iNavMvp class="margin-bottom30" lang @change="change" :list='navListLeft' routerPage lev="1" @message="clickMessage" />
      <iNavMvp class="margin-bottom30" lang @change="change" right routerPage lev="2" :list="navList" @message="clickMessage" />
    </div>
    <iSearch class="margin-bottom20" @sure="sure" @reset='reset()' v-permission.auto="SOURCING_STEELDEMANCREATION_SEARCH|搜索">
      <el-form>
        <template v-for='(items,index) in searchForm'>
          <el-form-item :label='language(items.i18nKey,items.i18nName)' :key="index">
            <template v-if='items.type == "input"'>
              <iInput v-model="form[items.moduleKey]" type='number' v-if='items.moduleKey == "nominateId"' :placeholder='language("QINGITANXIE","请填写")' :maxlength='18'></iInput>
              <iInput v-model="form[items.moduleKey]" v-else :placeholder='language("QINGITANXIE","请填写")' :maxlength='18'></iInput>
            </template>
            <template v-else>
              <iSelect v-model="form[items.moduleKey]" :placeholder='language("QINGXUANZE","请选择")'>
                <el-option v-for="(item,i) in items.List" :key='i' :label="item.name" :value="item.code"></el-option>
              </iSelect>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template>
      </template>
    </iSearch>
    <iCard>
      <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language('GANGCAICHUANGJIAN','钢材创建') }}</span>
        <div  class="floatright">
          <iButton @click="downloadTemplate" v-permission.auto="SOURCING_STEELDEMANCREATION_BATCHDOWNLOADTEMPLATE|下载批量模板">{{language('XIAZAIPILIANGMOBAN','下载批量模板')}}</iButton>
          <el-upload class="uploadfile margin-left10" :before-upload='()=>{uploadLoadingOne=true}' :on-success="(r)=>Message(r,1,'uploadLoadingOne')" :on-error="(r)=>Message(r || r.message,2,'uploadLoadingOne')" :headers="{'token':getToken()}" :action="`${baseUrl}/steelDemand/uploadExcelSteelOne`" :show-file-list='false'><iButton :loading="uploadLoadingOne" v-permission.auto="SOURCING_STEELDEMANCREATION_UPLOADFILEONCE|上传文件一次性">{{language('SHANGCHUANWENJIANYICIX','上传文件（一次性）')}}</iButton></el-upload>
          <el-upload :before-upload='()=>{uploadLoadingAll=true}' :on-success="(r)=>Message(r,1,'uploadLoadingAll')" :on-error="(r)=>Message(r || r.message,2,'uploadLoadingAll')" class="uploadfile margin-left10" :headers="{'token':getToken()}" :action="`${baseUrl}/steelDemand/uploadExcelSteelBatch`" :show-file-list='false'><iButton :loading='uploadLoadingAll' v-permission.auto="SOURCING_STEELDEMANCREATION_UPLOADFILEBATCH|上传文件批量">{{language('SHANGCHUANWENJJIANPILIANG','上传文件（批量）')}}</iButton></el-upload>
          <iButton class="margin-left10" @click="print(1)" :loading='printLoadingOne' v-permission.auto="SOURCING_STEELDEMANCREATION_PRINTONCE|打印定点流转单一次性">{{language('DAYINGDINGDANLIUZHUANDAN','打印定点流转单(一次性)')}}</iButton>
          <iButton @click="print(2)" :loading='printLoadingAll' v-permission.auto="SOURCING_STEELDEMANCREATION_PRINTBATCH|打印定点流转单批量">{{language('DAYINGDINGDANLIUZDPILIANG','打印定点流转单（批量）')}}</iButton>
        </div>
      </div>
      <tablePart radio @handleSelectionChange="(row)=>selectRow=row" :tableData='tabelList' :tableTitle='tableTitle' v-loading='tabelLoading' class="aotoTableHeight" v-permission.auto="SOURCING_STEELDEMANCREATION_TABLE|表格">
        <template #[currentProps]="{row:row}" v-for='currentProps in decArrayList'>
          {{row[currentProps].desc}}
        </template>
        <template #nominateId="scope">
          <span class="flexRow-link">
            <span class="openLinkText cursor "  @click="viewNominationDetail(scope.row)"> {{ scope.row.nominateId }}</span>
            <span class="icon-gray  cursor "  @click="viewNominationDetail(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span> 
        </template>
      </tablePart>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, steeldemandcreation)"
          @current-change="handleCurrentChange($event, steeldemandcreation)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </iCard> 
  </iPage>
</template>
<script>
import {iPage,iSearch,iCard,iNavMvp,iSelect,iInput,iButton,iPagination,iMessage,icon} from 'rise'
import {searchForm,form,tableTitle} from './components/data'
import {steeldemandcreation,downloadExcelBatch,printTransferOrderBatch,printTransferOrderOne} from '@/api/steelDemandCreation/home'
import {pageMixins} from "@/utils/pageMixins";
import tablePart from '@/views/partsign/home/components/tableList'
import { selectDictByKeys } from "@/api/dictionary"
import {getBuyers} from '@/api/letterAndLoi/letter'
import {user} from '@/config'
import {getToken} from '@/utils'
// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")
export default{
  mixins:[pageMixins],
  components:{iPage,iSearch,iCard,iNavMvp,iSelect,iInput,iButton,iPagination,tablePart,icon},
    created(){
      this.initSelectOptions()
      this.steeldemandcreation()
    },
    data(){
      return {
        uploadLoadingOne:false,
        uploadLoadingAll:false,
        printLoadingAll:false,
        printLoadingOne:false,
        baseUrl:process.env.VUE_APP_SOURCING,
        searchForm:[],
        form:JSON.parse(JSON.stringify(form)),
        tableTitle:tableTitle,
        tabelLoading:false,
        tabelList:[],
        decArrayList:['applicationStatus','nominateProcessType','partProjectType'],
        selectRow:[]
      }
    },
    computed: {
      ...mapState(["navList","navListLeft"]),
      ...mapActions(["updateNavList"])
    },
    methods:{
      /**
       * @description: 查看定点详情
       * @param {*}
       * @return {*}
       */
      viewNominationDetail(row) {
        // 缓存nominateProcessType
        // this.$store.dispatch('setNominationType', row.nominateProcessType)
        // 禁用nominateProcessType编辑
        this.$store.dispatch('setNominationTypeDisable', true)
        this.$nextTick(() => {
          const routeData = this.$router.resolve({
            path: '/designate/rfqdetail',
            query: {
              desinateId: row.nominateId, 
              designateType: (row.nominateProcessType && row.nominateProcessType.code) || row.nominateProcessType || '',
              partProjType: (row.partProjectType && row.partProjectType.code) || row.partProjectType || '',
              applicationStatus: (row.applicationStatus && row.applicationStatus.code) || row.applicationStatus || '',
            }
          })
          window.open(routeData.href, '_blank')
        })
      },
      sure() {
        this.page.currPage = 1
        this.steeldemandcreation()
      },
      /**
       * @description: 获取钢材列表数据。
       * @param {*}
       * @return {*}
       */
      steeldemandcreation(){
        this.tabelLoading = true
        steeldemandcreation({...{size:this.page.pageSize,current:this.page.currPage},...this.form}).then(res=>{
          this.tabelList = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tabelLoading = false
        }).catch(err=>{this.tabelLoading = false})
      },
      dictkey(){
        return new Promise(r=>{
            selectDictByKeys([{keys:'NOMINATE_APP_PROCESS_TYPE'},{keys:'MEETING_TYPE'},{keys:'NOMINATE_APP_STATUS_FILING'}]).then(res=>{
              r(res.data)
            }).catch(()=>r({}))
          })
      },
      getBuyers(roleCode){
        return new Promise(r=>{
           getBuyers({roleCode}).then(res=>{r(res.data)}).catch(()=>r({}))
        })
      },
      async initSelectOptions(){    
        const lineOptions = await this.getBuyers("LINIE") //user.LINLIE
        const beforBuyer = await this.getBuyers("QQCGY") // user.BEFORBUYER
        const distKeys = await this.dictkey()
        this.searchForm = searchForm({...this.translateOptions('LINLIE',lineOptions),...this.translateOptions('BEFORBUYER',beforBuyer),...distKeys})
      },
      /**
       * @description: 转换数据为optionslist格式
       * @param {*} props
       * @return {*}
       */
      translateOptions(props,data){
        let object = {}
        object[props] = data.map(items=>{return {"name":items.nameZh,'code':items.id}})
        return object
      },
      reset(){
        Object.keys(this.form).forEach(element => {
          this.form[element] = ''
        });

        this.form.showSelf = true
        this.sure()
      },
      downloadTemplate(){
        downloadExcelBatch().then().catch(err=>{
          iMessage.error(err.message)
        })
      },
      getToken(){
        return getToken()
      },
      Message(message,messageType,loadingType){
        this[loadingType] = false
        if(message.result){
          this.steeldemandcreation()
          iMessage.success(message.desZh)
        }else{
          iMessage.error(message.desZh)
        }
      },
      /**
       * @description: 打印钢材批量AND一次性钢材
       * @param {*}
       * @return {*}
       */
      print(type){
        if(this.selectRow.length == 0) return iMessage.warn('抱歉，您还未选择一条钢材定点数据，无法为您打印！')
        if(type == 1){this.printLoadingOne = true} else {this.printLoadingAll = true}
        this.translateHttpRequset(type).then(r=>{
          if(type == 1){this.printLoadingOne = false} else {this.printLoadingAll = false}
          }).catch(err=>{if(type == 1){this.printLoadingOne = false} else {this.printLoadingAll = false}})
      },
      translateHttpRequset(type){
        if(type == 2){
          return printTransferOrderBatch(this.selectRow[0].nominateId)
        }else{
          return printTransferOrderOne(this.selectRow[0].nominateId)
        }
      }
    }
}
</script>
<style lang='scss' scoped>
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
  .textalign-right{
    text-align: right;
    margin-bottom: 20px;
  }
  .uploadfile{
    display: inline-block;
    margin: 0 10px;
    &:nth-child(2){
      margin-right: 0px;
    }
  }
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 410px !important;  
      overflow: auto !important ;
    }
  }

</style>