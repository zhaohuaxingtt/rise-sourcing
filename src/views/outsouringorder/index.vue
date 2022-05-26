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
        <template v-for='(items,index) in searchFormTitle'>
          <el-form-item :label='language(items.i18nKey,items.i18nName)' :key="index">
            <template v-if='items.type == "input"'>
              <iInput clearable v-model="form[items.moduleKey]" :placeholder='language("QINGITANXIE","请填写")' />
            </template>
            <template v-else-if="items.type == 'datepicker'">
             <iDatePicker
               clearable
               v-model='form[items.moduleKey]'
               value-format="yyyy-MM-dd HH:mm:ss">
             </iDatePicker>
            </template>
            <template v-else-if="items.type == 'partNum'">
             <iMultiLineInput :placeholder="language('partsprocure.PARTSPROCURE', '请输入零件号，多个逗号分隔')" :title="language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')" v-model="form['partNum']"></iMultiLineInput>
            </template>
            <template v-else-if="items.type == 'linieName'">
              <iSelect clearable v-model="form[items.moduleKey]" :placeholder='language("QINGXUANZE","请选择")'>
                <el-option v-for="(item,i) in items.List" :key='i' :label="item.commodity" :value="item.deptId"></el-option>
              </iSelect>
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
          <iButton @click="handleBatchReject(true)">
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
        :tableData='tableData' 
        :tableTitle='tableTitle'
        :tableLoading="false"
        class="aotoTableHeight">
        <template #riseCode="scope">
           <!--<span class="flexRow-link"> -->
           <span class="openLinkText cursor "  @click="viewNominationDetail(scope.row)"> {{ scope.row.riseCode }}</span>
            <!-- <span class="icon-gray  cursor "  @click="viewNominationDetail(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span> -->
          </span>
       </template>
       <template #subType="scope">
          <span>{{ getSubType(scope.row.subType) }}</span>
       </template>
       <template #status="scope">
          <span>{{ getStatus(scope.row.status) }}</span>
       </template>
      </tablePart>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getOutsouringFindBypage)"
        @current-change="handleCurrentChange($event, getOutsouringFindBypage)"
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
    <backDialog ref="backEPS" :mode="mode" :dialogVisible="backDialogVisible" @changeVisible="handleBatchReject(false)" @handleBack="handleBackEPS" />
  </iPage>
</template>
<script>
import { iPage,iSearch,iCard,iSelect,iInput,iButton,iPagination,iMessage,icon,iDatePicker, iMultiLineInput } from 'rise'
import headerNav from "@/components/headerNav"
import backEps from "./components/backEps"
import { searchForm, form, tableTitle, addType, statusList } from './components/data'
import { outsouringFindBypage,signByLinie,rejectByLinie,deleteOutSouring,closeOutSouringOrder } from '@/api/outsouringorder'
import { pageMixins } from "@/utils/pageMixins";
import tablePart from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { getDepartmentsCombo } from '@/api/ws2/purchase/investmentList'
import { user } from '@/config'

// eslint-disable-next-line no-undef
export default {
  mixins:[pageMixins,tableSortMixins],
  components:{ iPage,iSearch,iCard,iSelect,iInput,iButton,iPagination,iDatePicker, tablePart,iMultiLineInput,icon, headerNav, backEps },
  data() {
    return {
      backDialogVisible: false,
      baseUrl: process.env.VUE_APP_SOURCING,
      searchFormTitle: [],
      form: JSON.parse(JSON.stringify(form)),
      tableTitle: tableTitle,
      tableLoading: false,
      tableData:[],
      selectRow: [],
      addType: addType,
      statusList: statusList,
      mode: 'back',
    }
  },
  created(){
    this.initSelectOptions()
    this.getOutsouringFindBypage()
  },
  methods:{
    createSignSheet() {
      this.$router.push('/partsign/outsouringorder/addoutsourcing/details')
    },
    // 映射采购申请类型
    getSubType(type) {
      return this.addType.find(k => k.label === type).key;
    },
    // 映射状态值
    getStatus(status) {
      return this.statusList.find(k => k.key == status).label;
    },
    //仅看自己
    showOnlyMyselfData(val) {
      this.form.currentPage = 1;
      this.form.pageSize = this.page.pageSize;
      this.form.isOwn = val;
      this.getOutsouringFindBypage();
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
      this.getOutsouringFindBypage()
    },
    /**
     * @description: 获取钢材列表数据。
     * @param {*}
     * @return {*}
     */
    getOutsouringFindBypage(){
      this.tableLoading = true
      outsouringFindBypage({...{size:this.page.pageSize,current:this.page.currPage},...this.form}).then(res=>{
        this.tableLoading = false;
        this.tableData = JSON.parse(JSON.stringify(res.data.records));
        this.page.currPage = res.data.current;
        this.page.pageSize = res.data.size;
        this.page.totalCount = res.data.total;
      }).catch(err=>{this.tableLoading = false})
    },
    /**
     * @description: 删除钢材列表数据。
     * @param {*}
     * @return {*}
     */
    handleBatchDelete(){
      // this.tableLoading = true
      deleteOutSouring(this.selectRow.map(k => k.riseCode)).then(res=>{
        // this.tableLoading = false
        if(+res.code === 200) {
         this.getOutsouringFindBypage();
        }
      }).catch(err=>{this.tableLoading = false})
    },
     /**
     * @description: 签收
     * @param {*}
     * @return {*}
     */
    handleBatchSingn() {
      // this.tableLoading = true;
      signByLinie({
        beforeLinie: '',
        beforeLinieId: '',
        deptId: '',
        purchasingRequirementChooseList: this.selectRow.map(k => {
          return { riseCode: k.riseCode, sapItem: k.sapItem }
        })
      }).then(res => {
      // this.tableLoading = false;
        if (res.code === '200') {
          this.getOutsouringFindBypage()
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
              // this.getOutsouringFindBypage()
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
              // this.getOutsouringFindBypage()
            } else {
              iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            }
          }).finally(() => {
            this.$refs.backEPS.changeSaveLoading && this.$refs.backEPS.changeSaveLoading(false)
          })
      }
    },

    // 初始化申请部门数据
    async initSelectOptions() {
      const distKeys = await this.dictkey();
      console.log(distKeys)
      this.searchFormTitle = searchForm( distKeys );
      console.error(this.searchFormTitle)
    },

    // 获取申请部门参数
    dictkey(){
      return new Promise(r=>{
          getDepartmentsCombo().then(res=>{
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
    console.log(this.tableLoading)
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