<!--
 * @Author: lyujiahong
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-08-03 17:10:06
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
  <div v-permission="PRICE_PURCHASE_PURCHASE_HOME_PAGE">

    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20" @sure="sure" @reset="reset" :resetKey="PARTSPROCURE_RESET" :searchKey="PARTSPROCURE_CONFIRM">
      <el-form>
        <el-form-item :label="$t('MODEL-ORDER.LK_RISEBIANHAO')">
          <iInput :placeholder="$t('LK_QINGSHURU') + $t('MODEL-ORDER.LK_RISEBIANHAO')" v-model="form['riseCode']"></iInput>
        </el-form-item>
        <el-form-item :label="$t('MODEL-ORDER.LK_LINGJIANHAO')">
          <iMultiLineInput :placeholder="language('partsprocure.PARTSPROCURE', '请输入零件号，多个逗号分隔')" :title="language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')" v-model="form['partNumStr']"></iMultiLineInput>
        </el-form-item>
        <el-form-item :label="$t('LINGJIANMINGCZH')">
          <iInput :placeholder="$t('LK_QINGSHURU') + $t('LINGJIANMINGCZH')" v-model="form['partNameZh']" />
        </el-form-item>
        <el-form-item :label="$t('MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form['subType']">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="(k, i) in addType" :value="k.label" :label="k.key" :key="i"> </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_ZHUANGTAI')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form['status']">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="(k, i) in statusList" :value="k.key" :label="k.label" :key="i"> </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('partsprocure.PARTSPROCUREPURCHASINGFACTORY')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form['procureFactory']">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="(item, index) in splitPurchList" :value="item.procureFactory" :label="`${item.procureFactory}-${item.factoryName}`" :key="index"> </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('采购员')">
          <iInput :placeholder="$t('LK_QINGSHURU') + $t('采购员')" v-model="form['buyerName']" />
        </el-form-item>
        <el-form-item :label="$t('科室')">
          <iInput :placeholder="$t('LK_QINGSHURU') + $t('科室')" v-model="form['deptName']" />
        </el-form-item>
        <el-form-item :label="$t('SHENQINGREN')">
          <iInput :placeholder="$t('LK_QINGSHURU') + $t('SHENQINGREN')" v-model="form['applyBy']" />
        </el-form-item>
        <el-form-item :label="$t('申请部门')">
          <iInput :placeholder="$t('LK_QINGSHURU') + $t('申请部门')" v-model="form['linieName']" />
        </el-form-item>
        <el-form-item :label="$t('申请日期起')">
          <iDatePicker v-model="form['startDate']" type="date" placeholder="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item :label="$t('申请日期止')">
          <iDatePicker v-model="form['endDate']" type="date" placeholder="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item :label="$t('备注')">
          <iInput :placeholder="$t('LK_QINGSHURU') + $t('备注')" v-model="form['remark']" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <!------------------------------------------------------------------------>
      <!--                  table模块，向外入参表格数据，表头                    --->
      <!------------------------------------------------------------------------>
      <div class="margin-bottom20 clearFloat flex-align-center">
        <div class="showMe">
          <span>{{ $t('MODEL-ORDER.LK_JINKANZIJI') }}</span>
          <el-switch v-model="form['isOwn']" @change="showOnlyMyselfData($event)" active-color="#1660F1" inactive-color="#cccccc"></el-switch>
        </div>
        <div class="floatright">
           <iButton @click="create">
            {{language('LK_XINJIANNEW', '新建')}}
          </iButton>
          <!-- 删除 -->
          <iButton @click="handleBatchDelete">
            {{ language("SHANCHU", '删除') }}
          </iButton>
         <!-- 转派 -->
          <iButton @click="transferFrame">
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
          <iButton @click="handleBatchClose(true)">
            {{ language("LK_GUANBI", '关闭') }}
          </iButton>
        </div>
      </div>
      <queryTable 
        :tableData="tableListData" 
        :tableLoading="tableLoading" 
        :stockCodeList="stockCodeList"
        @handleSelectionChange="handleSelectionChange"
      />
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination  v-update @size-change="handleSizeChange($event, getTableListFn)" @current-change="handleCurrentChange($event, getTableListFn)" background :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" />
    </iCard>
    <item-dialog @handleSaveDetail="handleSaveDetail" @openOrderPage="openOrderPage" v-model="showItem" :detailInfo="detailInfo" :isItem="true" />

    <transfer-dialog v-model="showTransfer" @handleTransfer="handleTransfer" ref="transfer" />
    <!------------------------------------------------------------------------>
    <!--                  退回EPS弹窗                                       --->
    <!------------------------------------------------------------------------>
    <backDialog ref="backEPS" :mode="mode" :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBackEPS" />
  </div>
</template>
<script>
import { iCard, iPagination, iSearch, iInput, iSelect, iMessage, iButton, iMultiLineInput, iDatePicker } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { addType,statusList, form } from './components/data'
import queryTable from './components/queryTable'
import { purchaseFactory } from '@/api/partsprocure/editordetail'
import { toOwner, saveOrUpdate } from '@/api/ws2/purchaserequest'
import { outsouringFindBypage,signByLinie,rejectByLinie,deleteOutSouring,closeOutSouringOrder } from '@/api/outsouringorder'
import { getDictByCode } from '@/api/dictionary'
import filters from '@/utils/filters'
import ItemDialog from './components/itemDialog.vue'
import TransferDialog from './components/transferDialog.vue'
import { cloneDeep } from 'lodash'

export default {
  name: 'purchase',
  mixins: [pageMixins, filters],
  components: {
    iDatePicker,
    iCard,
    queryTable,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    iButton,
    ItemDialog,
    TransferDialog,
    iMultiLineInput
  },
  data() {
    return {
      tableListData: [],
      splitPurchList: [],
      tableLoading: false,
      selectTableData: [],
      form: form,
      startLoding: false,
      tab: 'source',
      selectTab: 1,
      firstId: null,
      btntab1: 1,
      stockCodeList: [], //状态值
      supplierCodeOrName: '', // 供应商名称or供应商SAP号
      partTab: 'SPR',
      showItem: false, //项次
      showTransfer: false, //转派
      detailInfo: {},

      logDialogVisible: false, //日志
      islogShow: false,
      backDialogVisible: false,
      mode: 'back'
    }
  },
  async created() {
    await Promise.all([this.getStockCodeList(), this.purchaseFactory(), this.getTableListFn()])
  },
  methods: {
     //仅看自己
    showOnlyMyselfData(val) {
      this.form.currentPage = 1;
      this.form.pageSize = this.page.pageSize;
      this.form.isOwn = val;
      this.getTableListFn();
    },

    // 获取状态值
    async getStockCodeList() {
      await getDictByCode('PR_STOCK_STATUS')
        .then(res => {
          if (res.data) {
            this.stockCodeList = res?.data[0]?.subDictResultVo
          }
        })
        .catch(err => {
          this.getStockCodeList()
        })
    },
    //获取采购工厂列表
    purchaseFactory() {
      this.tableLoading = true
      purchaseFactory({ firstId: this.firstId, isSparePart: false })
        .then(res => {
          if (res.data) {
            this.splitPurchList = res.data
            this.tableLoading = false
          }
        })
        .catch(err => (this.tableLoading = false))
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    // 获取零件采购项目相关信息
    getTableListFn() {
      this.tableLoading = true
      this.form.pageSize = this.page.pageSize
      this.form.currentPage = this.page.currPage
      let param = cloneDeep(this.form)

      outsouringFindBypage(param)
        .then(res => {
          this.tableLoading = false
          this.tableListData = res.data?.records
          this.page.pageSize = res.data.size
          this.page.totalCount = res.data.total
        })
        .catch(() => (this.tableLoading = false))
    },
    // 判断用户输入供应商的Name还是SAPCode
    validateSupplierCodeOrName(queryString) {
      if (isFinite(+queryString)) {
        this.form.supplierSapCode = queryString
        this.form.supplierNameZh = ''
        return queryString
      } else {
        this.form.supplierNameZh = queryString
        this.form.supplierSapCode = ''
        return queryString
      }
    },
    // 查询
    sure() {
      this.page.currPage = 1
      this.getTableListFn()
    },
    // 重置搜索条件
    reset() {
      for (let i in this.form) {
        this.form[i] = ''
      }
      this.supplierCodeOrName = ''
      this.form.type = 'SPR'
      this.svwDate = []
      this.getTableListFn()
    },
    clickParts() {
      this.$router.push({
        path: '/priceorder/partsparameter'
      })
    },
    //点击标准采购申请、工序按钮
    handlePartChange(val) {
      if (val == 'SPR') {
        return
      }
      this.partTab = 'SPR'
      return iMessage.error('开发中...敬请期待')
    },

    //新建
    create() {
      let routeData = this.$router.resolve({
        path: '/partsign/outsouringorder/addoutsourcing/details'
      });
      window.open(routeData.href, '_blank')
    },

    /**
     * @description: 删除钢材列表数据。
     * @param {*}
     * @return {*}
     */
    handleBatchDelete() {
      for (let index = 0; index < this.selectTableData.length; index++) {
        if (this.selectTableData[index].itemSource != 3) {
          return iMessage.warn('仅手工可进行删除操作')
        }
        if (this.selectTableData[index].nominationStatus != '0') {
          return iMessage.warn('只有已创建状态可删除')
        }
      }
      if (this.selectTableData.length == 0) {
        return iMessage.warn('请先选择数据')
      }
      this.tableLoading = true
      deleteOutSouring(this.selectTableData.map(k => k.riseCode)).then(res=>{
        this.tableLoading = false
        if(+res.code === 200) {
          iMessage.success('删除成功')
          this.getTableListFn()
        }
      }).catch(err=>{this.tableLoading = false})
    },
    //转派
    transferFrame() {
      if (this.selectTableData.length == 0) {
        return iMessage.warn('请先选择数据')
      }
      this.showTransfer = true
    },
    /**
     * @description: 签收
     * @param {*}
     * @return {*}
     */
    handleBatchSingn() {
      if (this.selectTableData.length == 0) {
        return iMessage.warn('请先选择数据')
      }
      this.tableLoading = true;
      signByLinie({
        beforeLinie: '',
        beforeLinieId: '',
        deptId: '',
        purchasingRequirementChooseList: this.selectTableData.map(k => {
          return { riseCode: k.riseCode, sapItem: k.sapItem }
        })
      }).then(res => {
      this.tableLoading = false;
        if (res.code === '200') {
          this.getOutsouringFindBypage()
        }
      });
    },
    /**
    * @Description: 退回EPS弹窗状态修改
    * @param {*} visible
    * @return {*}
    */    
    handleBatchReject(visible) {
      if (this.selectTableData.length < 1) {
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
      if (this.selectTableData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.backDialogVisible = visible;
      this.mode = 'close';
    },

   
    // 零件号校验
    validate(e) {
      let reg = /^[A-Za-z0-9 ]+$/
      if (e.target.value == '') {
        return
      }
      if (!reg.test(e.target.value) && !e.target.value.includes(',')) {
        e.target.value = ''
        this.form.partNumStr = ''
        return iMessage.error('零件号输入有误，请重新输入')
      }
      // 包含英文逗号，但是不满足零件号英文大小写加数字
      if (e.target.value.includes(',')) {
        let temp = e.target.value.split(',')
        if (temp.length > 0) {
          temp.forEach(element => {
            if (!reg.test(element)) {
              e.target.value = ''
              this.form.partNumStr = ''
              return iMessage.error('零件号输入有误，请重新输入')
            }
          })
        }
      }
    },
    //转派
    handleTransfer(val) {
      let param = val
      param.normalPrList = this.selectTableData
      toOwner(param)
        .then(res => {
          this.$refs.transfer.transferLoading = false
          if (res.code == '200') {
            this.getTableListFn()
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
            this.showTransfer = false
          } else {
            return iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        })
        .catch(() => {
          this.$refs.transfer.transferLoading = false
        })
    },
    //保存
    handleSaveDetail(val) {
      let param = [val]
      saveOrUpdate(param)
        .then(res => {
          if (res.code == '200') {
            this.showItem = false
            this.getTableListFn()
          }
        })
        .catch(err => {})
    },
    logLook() {
      this.logDialogVisible = true
    },

  }
}
</script>
<style lang="scss" scoped>
.partsprocureHome {
  position: relative;

  .margin-bottom8 {
    margin-bottom: 8px;
  }
  .btn-bottom20 {
    margin-bottom: 20px;
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

  .btnList {
    .btngroup {
      display: flex;
      flex-direction: row;
      cursor: pointer;

      > li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 20px;
        padding-right: 20px;
        height: 16px;

        &:not(:last-child) {
          border-right: 2px solid #909091;
        }

        > span {
          font-size: 18px;
          font-family: Arial;
          font-weight: 400;
          line-height: 25px;
          color: #00000048;
        }

        .activetest {
          font-weight: bold;
          color: #1660f1;
        }
      }
    }

    > span {
      font-size: 20px;
      margin-left: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }
    }
  }
  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;

        & + & {
          padding: 0 25px;
        }
      }

      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
    .tabs {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      > ul {
        display: flex;
        flex-direction: row;
        > li {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px;
          font-size: 20px;
          font-family: Arial;
          font-weight: 400;
          line-height: 23px;
          color: #727272;
          opacity: 1;
        }
        .active {
          font-size: 20px;
          font-family: Arial;
          font-weight: bold;
          line-height: 23px;
          color: #000000;
          border-radius: 2px;
          padding-top: 5px;
          padding-bottom: 5px;
          border-bottom: 2px solid #1763f7;
        }
      }
    }
  }
  ::v-deep .el-radio-button__inner {
    width: auto;
  }
  .iSearch-conten {
    .operation .icon {
      position: absolute;
      top: -1.95rem;
      right: 0;
    }
    .icon {
      font-size: 22px;
      color: #9e4b14;
    }
  }
}
</style>
