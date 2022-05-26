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
        <template v-for='(items,index) in searchCloumn'>
          <el-form-item :label='language(items.i18nKey,items.i18nName)' :key="index">
            <template v-if='items.type == "input"'>
              <iInput clearable v-model="form[items.moduleKey]" type='number' v-if='items.moduleKey == "nominateId"' :placeholder='language("QINGITANXIE","请填写")' :maxlength='18'></iInput>
              <iInput clearable v-model="form[items.moduleKey]" v-else :placeholder='language("QINGITANXIE","请填写")' />
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
      <div class="margin-bottom20 clearFloat flex-align-center">
       <div class="showMe">
          <span>{{ $t('MODEL-ORDER.LK_JINKANZIJI') }}</span>
          <el-switch v-model="form['isOwn']" @change="showOnlyMyselfData($event)" active-color="#1660F1" inactive-color="#cccccc"></el-switch>
        </div>
        <div class="floatright btns">
          <iButton @click="createSignSheet">
            {{language('LK_XINJIANNEW', '新建')}}
          </iButton>
          <!-- 删除 -->
          <iButton @click="handleBatchDelete">
            {{ language("SHANCHU", '删除') }}
          </iButton>
         <!-- 转派 -->
          <iButton @click="handleBatchTransation">
            {{ language("ZHUANPAI", '转派') }}
          </iButton>
          <!-- 签收 -->
          <iButton @click="handleBatchSingn">
            {{ language("QIANSHOU", '签收') }}
          </iButton>
          <!-- 退回 -->
          <iButton @click="handleBatchReject">
            {{ language("TUIHUI", '退回') }}
          </iButton>
          <!-- 关闭 -->
          <iButton @click="handleBatchClose">
            {{ language("LK_GUANBI", '关闭') }}
          </iButton>
        </div>
      </div>
      <tablePart
        ref="tableList"
        :lang="true"
        radio 
        @handleSelectionChange="(row)=>selectRow=row" 
        :tableData='tabelList' 
        :tableTitle='tableTitle' 
        v-loading='tabelLoading'
        class="aotoTableHeight">
        <!--<template #[currentProps]="{row:row}" v-for='currentProps in decArrayList'>
          {{row[currentProps].desc}}
        </template>-->
        <template #riseCode="scope">
          <!-- <span class="flexRow-link"> -->
            <span class="openLinkText cursor "  @click="viewNominationDetail(scope.row)"> {{ scope.row.riseCode }}</span>
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
        @size-change="handleSizeChange($event, outsouringFindBypage)"
        @current-change="handleCurrentChange($event, outsouringFindBypage)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"
      />
    </iCard>

    <!------------------------------------------------------------------------>
    <!--                  退回EPS弹窗                                       --->
    <!------------------------------------------------------------------------>
    <backDialog ref="backEPS" :mode="mode" :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBackEPS" />
  </iPage>
</template>
<script>
import { iPage,iSearch,iCard,iSelect,iInput,iButton,iPagination,iMessage,icon,iDatePicker } from 'rise'
import headerNav from "@/components/headerNav"
import backEps from "./components/backEps"
import { searchForm, searchCloumn, form,tableTitle } from './components/data'
import { outsouringFindBypage,signByLinie,rejectByLinie,deleteOutSouring,closeOutSouringOrder } from '@/api/outsouringorder'
import { pageMixins } from "@/utils/pageMixins";
import tablePart from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { selectDictByKeys } from "@/api/dictionary";
import { getBuyers } from '@/api/letterAndLoi/letter';
import {user} from '@/config'

// eslint-disable-next-line no-undef
export default {
  mixins:[pageMixins,tableSortMixins],
  components:{ iPage,iSearch,iCard,iSelect,iInput,iButton,iPagination,iDatePicker, tablePart,icon, headerNav, backEps },
  data(){
    return {
      backDialogVisible: false,
      baseUrl: process.env.VUE_APP_SOURCING,
      searchForm:[],
      form: JSON.parse(JSON.stringify(form)),
      tableTitle: tableTitle,
      tabelLoading: false,
      tabelList:[],
      selectRow: [],
      searchCloumn: searchCloumn,
      mode: 'back'
    }
  },
  created(){
    // this.initSelectOptions()
    this.outsouringFindBypage()
  },
  methods:{
    createSignSheet() {
      this.$router.push('/partsign/outsouringorder/addoutsourcing/details')
    },
    //仅看自己
    showOnlyMyselfData(val) {
      this.form.currentPage = 1;
      this.form.pageSize = this.page.pageSize;
      this.form.isOwn = val;
      this.outsouringFindBypage();
    },
    /**
    * @Description: 退回EPS弹窗状态修改
    * @param {*} visible
    * @return {*}
    */    
    handleBatchReject(visible) {
      if (this.selectRow.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.backDialogVisible = visible;
      this.mode = 'back';
    },

    /**
    * @Description: 关闭弹窗状态修改
    * @param {*} visible
    * @return {*}
    */    
    handleBatchClose(visible) {
      if (this.selectRow.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.backDialogVisible = visible;
      this.mode = 'close';
    },

    /**
     * @description: 查看定点详情
     * @param {*}
     * @return {*}
     */
    viewNominationDetail(row) {
      // // 禁用nominateProcessType编辑
      // this.$store.dispatch('setNominationTypeDisable', true)
      this.$nextTick(() => {
        const routeData = this.$router.resolve({
          path: '/partsign/outsouringorder/addoutsourcing/details',
          query: {
            code: row.riseCode,
            subType: row.subType
          }
        })
        window.open(routeData.href, '_blank')
      })
    },
    sure() {
      this.page.currPage = 1
      this.outsouringFindBypage()
    },
    /**
     * @description: 获取钢材列表数据。
     * @param {*}
     * @return {*}
     */
    outsouringFindBypage(){
      this.tabelLoading = true
      outsouringFindBypage({...{size:this.page.pageSize,current:this.page.currPage},...this.form}).then(res=>{
        this.tabelLoading = false;
        if(res.data) {
          this.tabelList = res.data.records;
          this.page.currPage = res.data.current;
          this.page.pageSize = res.data.size;
          this.page.totalCount = res.data.total;
        }
      }).catch(err=>{this.tabelLoading = false})
    },
    /**
     * @description: 删除钢材列表数据。
     * @param {*}
     * @return {*}
     */
    handleBatchDelete(){
      this.tabelLoading = true
      deleteOutSouring(this.selectRow.map(k => k.riseCode)).then(res=>{
        this.tabelLoading = false
        if(+res.code === 200) {
         this.outsouringFindBypage();
        }
      }).catch(err=>{this.tabelLoading = false})
    },
     /**
     * @description: 签收
     * @param {*}
     * @return {*}
     */
    handleBatchSingn() {
      this.tabelLoading = true;
      signByLinie({
        beforeLinie: '',
        beforeLinieId: '',
        deptId: '',
        purchasingRequirementChooseList: this.selectRow.map(k => {
          return { riseCode: k.riseCode, sapItem: k.sapItem }
        })
      }).then(res => {
      this.tabelLoading = false;
        if (res.code === '200') {
          this.outsouringFindBypage()
        }
      });
    },
    /**
     @Description: 退回EPS
     @param {*} reasonType 退回类型
     @param {*} reasonDescription  退回描述
     @return {*}
    */    
    handleBackEPS(reasonDescription) {
      if (this.mode === 'back') {
          let params = {
            purchasingRequirementChooseList: this.selectRow.map(item => {
              return { riseCode: item.riseCode, sapItem: item.sapItem }
            }),
            reason: reasonDescription
          }
          rejectByLinie(params).then(res => {
            if (res.result) {
              iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
              this.handleBatchReject(false)
              this.outsouringFindBypage()
            } else {
              iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            }
          }).finally(() => {
            this.$refs.backEPS.changeSaveLoading && this.$refs.backEPS.changeSaveLoading(false)
          })
        return;
      }
      if (this.mode === 'close') {
        let params = {
          purchasingRequirementChooseList: this.selectRow.map(item => {
            return { riseCode: item.riseCode, sapItem: item.sapItem }
          }),
          closeReason: reasonDescription
        }
        closeOutSouringOrder(params).then(res => {
            if (res.result) {
              iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
              this.handleBatchClose(false)
              this.outsouringFindBypage()
            } else {
              iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            }
          }).finally(() => {
            this.$refs.backEPS.changeSaveLoading && this.$refs.backEPS.changeSaveLoading(false)
          })
      }
    },

    getBuyers(roleCode){
      return new Promise(r=>{
         getBuyers({roleCode}).then(res=>{r(res.data)}).catch(()=>r({}))
      })
    },
    async initSelectOptions() {
      console.warn('asSsSSS')
      const lineOptions = await this.getBuyers("LINIE") //user.LINLIE
      const beforBuyer = await this.getBuyers("QQCGY") // user.BEFORBUYER
      const distKeys = await this.dictkey()
      this.searchForm = searchForm({...this.translateOptions('LINLIE',lineOptions),...this.translateOptions('BEFORBUYER',beforBuyer), ...distKeys})
    },

    dictkey(){
      return new Promise(r=>{
          selectDictByKeys([{keys:'NOMINATE_APP_PROCESS_TYPE'},{keys:'MEETING_TYPE'},{keys:'NOMINATE_APP_STATUS_FILING'}]).then(res=>{
            r(res.data)
          }).catch(()=>r({}))
      })
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
    // 重置
    reset(){
      Object.keys(this.form).forEach(element => {
        this.form[element] = ''
      });
      this.form.showSelf = true
      this.sure()
    },
  },
  mounted() {
    console.log(this.tabelLoading)
  }
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}

.showMe {
    display: flex;
    align-items: center;
    height: 30px;
    width: 60%;
    span {
      font-size: 20px;
      color: #000000;
      align-content: center;
    }
    .el-switch {
      margin-left: 10px;
    }
  }
  .btns {
    width: 40%;
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