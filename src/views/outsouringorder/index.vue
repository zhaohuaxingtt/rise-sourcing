<!--
 * @Author: yuszhou
 * @Date: 2021-06-29 17:02:51
 * @LastEditTime: 2022-03-31 14:32:01
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\steelDemandCreation\home\index.vue
-->
<template>
  <iPage>
    <headerNav />
    <iSearch class="margin-bottom20" @sure="sure" @reset='reset()'>
      <el-form>
        <template v-for='(items,index) in searchForm'>
          <el-form-item :label='language(items.i18nKey,items.i18nName)' :key="index">
            <template v-if='items.type == "input"'>
              <iInput clearable v-model="form[items.moduleKey]" type='number' v-if='items.moduleKey == "nominateId"' :placeholder='language("QINGITANXIE","请填写")' :maxlength='18'></iInput>
              <iInput clearable v-model="form[items.moduleKey]" v-else :placeholder='language("QINGITANXIE","请填写")' :maxlength='18'></iInput>
            </template>
            <template v-else-if="items.type == 'datepicker'">
             <iDatePicker
               clearable
               v-model='form[items.moduleKey]'
               value-format="yyyy-MM-dd HH:mm:ss">
             </iDatePicker>
            </template>
            <template v-else>
              <iSelect clearable v-model="form[items.moduleKey]" :placeholder='language("QINGXUANZE","请选择")'>
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
      <div class="margin-bottom20 clearFloat rigth p">
       <div class="showMe">
          <span>{{ $t('MODEL-ORDER.LK_JINKANZIJI') }}</span>
          <el-switch v-model="form['isOwn']" @change="showOnlyMyselfData($event)" active-color="#1660F1" inactive-color="#cccccc"></el-switch>
        </div>
        <div  class="floatright">
          <iButton @click="createSignSheet">
            {{language('LK_XINJIANNEW', '新建')}}
          </iButton>
          <!-- 删除 -->
          <iButton @click="handleBatchDelete">
            {{ language("SHANCHU", '删除') }}
          </iButton>
         <!-- 转派 -->
          <iButton @click="handleBatchDelete">
            {{ language("ZHUANPAI", '转派') }}
          </iButton>
          <!-- 签收 -->
          <iButton @click="handleBatchDelete">
            {{ language("QIANSHOU", '签收') }}
          </iButton>
          <!-- 退回 -->
          <iButton @click="handleBatchDelete">
            {{ language("TUIHUI", '退回') }}
          </iButton>
          <!-- 关闭 -->
          <iButton @click="handleBatchDelete">
            {{ language("LK_GUANBI", '关闭') }}
          </iButton>
        </div>
      </div>
      <tablePart
        permissionKey="STEELDEMANDCREATION_HOME"
        ref="tableList"
        :lang="true"
        radio @handleSelectionChange="(row)=>selectRow=row" :tableData='tabelList' :tableTitle='tableTitle' v-loading='tabelLoading' class="aotoTableHeight">
        <template #[currentProps]="{row:row}" v-for='currentProps in decArrayList'>
          {{row[currentProps].desc}}
        </template>
        <template #nominateId="scope">
          <!-- <span class="flexRow-link"> -->
            <span class="openLinkText cursor "  @click="viewNominationDetail(scope.row)"> {{ scope.row.nominateId }}</span>
            <!-- <span class="icon-gray  cursor "  @click="viewNominationDetail(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span> -->
          <!-- </span>  -->
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
import {iPage,iSearch,iCard,iSelect,iInput,iButton,iPagination,iMessage,icon,iDatePicker} from 'rise'
import headerNav from "@/components/headerNav"
import {searchForm,form,tableTitle} from './components/data'
import {steeldemandcreation,downloadExcelBatch,printTransferOrderBatch,printTransferOrderOne} from '@/api/steelDemandCreation/home'
import {pageMixins} from "@/utils/pageMixins";
import tablePart from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { selectDictByKeys } from "@/api/dictionary"
import {getBuyers} from '@/api/letterAndLoi/letter'
import {user} from '@/config'

import {getToken} from '@/utils'
// eslint-disable-next-line no-undef
export default{
  mixins:[pageMixins,tableSortMixins],
  components:{iPage,iSearch,iCard,iSelect,iInput,iButton,iPagination,iDatePicker, tablePart,icon, headerNav},
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
        selectRow:[],
      }
    },
    methods:{
      createSignSheet() {
        this.$router.push('/partsign/outsouringorder/addoutsourcing/details?mode=add&id=114161')
      },
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
              businessKey: (row.partProjectType && row.partProjectType.code) || row.partProjectType || '',
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
.openLinkText {
  color: $color-blue;
}
.showMe {
    position: absolute;
    display: flex;
    align-items: center;
    height: 30px;
    span {
      font-size: 20px;
      color: #000000;
      align-content: center;
    }
    .el-switch {
      margin-left: 10px;
    }
  }
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