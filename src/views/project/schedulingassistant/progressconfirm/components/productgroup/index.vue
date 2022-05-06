<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 10:54:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 14:03:08
 * @Description: 产品组
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\productgroup\index.vue
-->

<template>
  <div class="productGroup">
    <iSearch :icon="true" class="margin-top30">
      <template slot="button">
        <iButton @click="handleSure">{{language('LK_INQUIRE', '查询')}}</iButton>
        <iButton @click="handleReset">{{language('LK_CHONGZHI', '重置')}}</iButton>
      </template>
      <el-form>
        <el-form-item v-for="item in searchList" :key="item.value" :label="language(item.key,item.name)">
          <iInput v-if="item.type === 'input'" v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')" />
          <!--------------询价采购员下拉----------------------->
          <fsSelect v-else-if="item.type === 'fsSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------项目采购员下拉----------------------->
          <productPurchaserSelect v-else-if="item.type === 'productPurchaserSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------车型项目下拉----------------------->
          <carProjectSelect v-else-if="item.type === 'carProjectSelect'" v-model="searchParams[item.value]" :filterable="item.filterable" />
          <!--------------字典下拉----------------------->
          <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="false" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('CHANPINZUJINDUQUERENHUIZONG', '产品组进度确认汇总')}}</span>
        <div class="floatright">
          <!--------------------发送按钮----------------------------------->
          <iButton v-if="!isFS && withSend" @click="handleSend" v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_SEND_BUTTON|进度确认汇总-发送-按钮">{{language('FASONG','发送')}}</iButton>
          <template v-if="isFS">
            <!--------------------转派按钮----------------------------------->
            <transferBtn v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_TRANSFER_BUTTON|进度确认转派按钮" class="margin-right10" tansferType="1" :tansferData="selectRows" @getTableList="getTableList" ></transferBtn>
            <!--------------------退回按钮----------------------------------->
            <backBtn v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_BACK_BUTTON|进度确认退回按钮" class="margin-right10" v-if="withAllBtn" backType="1" :backData="selectRows" @getTableList="getTableList" ></backBtn>
            <!--------------------保存按钮----------------------------------->
            <saveBtn v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_SAVE_BUTTON|进度确认保存按钮" v-if="withAllBtn" saveType="1" :saveData="tableData" @getTableList="getTableList" ></saveBtn>
            <!--------------------确认并发送按钮----------------------------------->
            <confirmBtn v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_PROCONFIRM_SENDCONFIRM_BUTTON|进度确认确认并发送按钮" v-if="withAllBtn" confirmType="1" :confirmData="selectRows" @getTableList="getTableList" ></confirmBtn>
          </template>
        </div>
      </div>
      <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
        <template #scheBfToFirstTryoutWeek="scope">
          <span v-if="!isFS">{{scope.row.scheBfToFirstTryoutWeek}}</span>
          <iInput v-else v-model="scope.row.scheBfToFirstTryoutWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
        <template #scheFirstTryEmWeek="scope" >
          <span v-if="!isFS">{{scope.row.scheFirstTryEmWeek}}</span>
          <iInput v-else v-model="scope.row.scheFirstTryEmWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
        <template #scheFirstTryOtsWeek="scope" >
          <span v-if="!isFS">{{scope.row.scheFirstTryOtsWeek}}</span>
          <iInput v-else v-model="scope.row.scheFirstTryOtsWeek" onkeyup="value=value.replace(/[^\d]/g,'')" />
        </template>
      </tableList> 
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <fsConfirmDialog ref="fsConfirm" @handleConfirm="handleFSConfirm" :dialogVisible="fsDialogVisible" @changeVisible="changeFSVisible" :tableList="sendRows" type="1" />
  </div>
</template>

<script>
import { iSearch, iInput, iButton, iCard, iPagination, iMessage } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import { searchList, tableTitle } from './data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { getProductGroup, getAllFS, deliveryProduct } from '@/api/project'
import fsConfirmDialog from '@/views/project/schedulingassistant/progroup/components/fsconfirm'
import confirmBtn from '../commonBtn/confirmBtn'
import saveBtn from '../commonBtn/saveBtn'
import backBtn from '../commonBtn/backBtn'
import transferBtn from '../commonBtn/transferBtn'
import fsSelect from '@/views/project/components/commonSelect/fsSelect'
import productPurchaserSelect from '@/views/project/components/commonSelect/productPurchaserSelect'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect'
import iDicoptions from 'rise/web/components/iDicoptions'
import { roleMixins } from "@/utils/roleMixins";
export default {
  mixins: [pageMixins,roleMixins],
  components: { iSearch, fsSelect, productPurchaserSelect, carProjectSelect, iDicoptions, iInput, iButton, iCard, tableList, iPagination, fsConfirmDialog, confirmBtn, saveBtn, backBtn, transferBtn },
  data() {
    return {
      searchList:searchList.filter((item)=>!item.hidden),
      searchParams: {
        confirmStatus: 'TO_BE_CONFIRMED'
      },
      selectOptions: {},
      // tableTitle,
      tableData: [],
      tableLoading: false,
      selectRows: [],
      fsDialogVisible: false,
      sendRows: [],
      withSend: false,
      withAllBtn: false
    }
  },
  computed: {
    isFS() {
      return this.$route.path.includes('proconfirm')
    },
    tableTitle() {
      if (this.isFS) {
        return tableTitle.filter(item => item.key !== 'QUERENSHIJIAN')
      } else {
        return tableTitle
      }
    },
  },
  created() {
    this.initSearchParams()
    this.getFSOPtions()
    this.getTableList()

    // 判断一下是否包含以下角色 若包含则展示询价采购员搜索框
    // ADMIN      超级管理员
    // QQCGKZ     前期采购科长
    // QQCGGZ     前期采购股长
    // CGBZ       采购部长
    // CIXTGLY    CI系统管理员
    // CSXTGLY    CS系统管理员
    // QQCGKZ_WF    前期采购科长_外方
    // CGBZ_WF      采购部长_外方
    if(this.$route.path.includes('proconfirm')){
      const list = ['ADMIN','QQCGKZ','QQCGGZ','CGBZ','CIXTGLY','CSXTGLY','QQCGKZ_WF','CGBZ_WF'];
      const roleList = this.roleList;
      let isIncludes = false;
      roleList.map((item)=>{
        if(list.includes(item)) isIncludes = true;
      })
      if(isIncludes) this.searchList = searchList
    }else{
      this.searchList = searchList
    }

  },
  methods: {
    initSearchParams() {
      this.searchParams = {
        confirmStatus: 'TO_BE_CONFIRMED',
        cartypeProId: this.$route.query.cartypeProId || '',
        productGroup: this.$route.query.productGroup || ''
      }
    },
    handleFSConfirm(val) {
      deliveryProduct(val).then(res => {
        if (res?.result) {
          if (res.data.length > 0) {
            iMessage.warn(res.data.map(item => item.productGroupZh).join(',')+'产品组询价采购员还未确认，请勿重复发送')
          } else {
            iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
            this.changeFSVisible(false)
            this.getTableList()
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.fsConfirm.changeSaveLoading(false)
      })
    },
    handleSend() {
      if (this.selectRows.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOFASONGDESHUJU', '请选择需要发送的数据'))
        return
      }
      this.sendRows = this.selectRows.map(item => {
        return {
          ...item,
          selectOption:this.selectOptions.fsOptions
        }
      })
      this.changeFSVisible(true)
    },
    changeFSVisible(visible) {
      this.fsDialogVisible = visible
    },
    getFSOPtions() {
      getAllFS().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            fsOptions: res.data.map(item => {
              return {
                ...item,
                value: item.id,
                label: item.nameZh
              }
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleReset() {
      this.searchParams = {
        confirmStatus: 'TO_BE_CONFIRMED'
      }
      this.handleSure()
    },
    handleSure() {
      this.page.pageSize = 10
      this.page.currPage = 1
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.selectRows = val
    },
    getTableList() {
      if (this.searchParams.confirmStatus === 'RETURNED') {
        this.withSend = true
      } else {
        this.withSend = false
      }
      if (this.searchParams.confirmStatus === 'TO_BE_CONFIRMED') {
        this.withAllBtn = true
      } else {
        this.withAllBtn = false
      }
      const params = {
        ...this.searchParams,
        size: this.page.pageSize,
        current: this.page.currPage,
        identityTag: this.isFS ? '2' : '1'
      }
      this.tableLoading = true
      getProductGroup(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.page.pageSize = Number(res.pageSize)
          this.page.totalCount = Number(res.total)
          this.page.currPage = Number(res.pageNum)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>