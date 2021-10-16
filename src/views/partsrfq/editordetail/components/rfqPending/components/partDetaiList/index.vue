<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
 * @LastEditors: Please set LastEditors
* @Description: 待办事项-零件清单
 -->
<template>
  <iCard>
    <div class="header flex-align-center" v-if="!disabled">
      <iButton @click="deleteItems" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_DELETE">{{
          language('delete','删除')
        }}
      </iButton>
      <iButton @click="sendKM" v-permission.auto="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_SENDKM|发送KM">{{ language('FASONGKM', '发送KM') }}</iButton>
      <iButton @click="showApplyPrice" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_NEWPRICE">
        {{ language('LK_XINSHENQINGCAIWUMUBIAOJIA','新申请财务目标价') }}
      </iButton>
      <iButton @click="againApply" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_REAPPLYPRICE">
        {{ language('LK_ZAICISHENGQINGCAIWUMUBIAOJIA','再申请财务目标价') }}
      </iButton>
    </div>
    <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="confirmTableLoading"
               @handleSelectionChange="handleSelectionChange" @openPage="openPage">
      <template #fsnrGsnrNum="scope">
        <span v-if="scope.row.partProjectType === partProjTypes.PEIJIAN" class="openLinkText cursor " @click="gotoAccessoryDetail(scope.row)"> {{ scope.row.fsnrGsnrNum }}</span>
        <span v-else  class="openLinkText cursor "  @click="openPage(scope.row)">{{ scope.row.fsnrGsnrNum }}</span>
      </template>
    </tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
                 :page-size="page.pageSize" :current-page="page.currPage" :layout="page.layout"
                 :total="page.totalCount"></iPagination>
    <div class="addFs flex-align-center" v-if="!disabled">
      <iInput class="partInput" v-model="partNumList" :placeholder="language('partsprocure.PARTSPROCURE', '请输入零件号')">
        <div class="inputSearchIcon" slot="suffix">
          <icon symbol name="iconshaixuankuangsousuo" @click.native="queryParts" />
        </div>
      </iInput>
      <iButton @click="start" :loading="addLoding" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_ADD">
        {{ language('LK_TIANJIA','添加') }}
      </iButton>
    </div>
    <partsTable v-if="!disabled" ref="partsTable" :rfqId="rfqId" :queryForm="queryForm" @targetHand="waitSelect" @openPage='(row)=>openPage(row)' @gotoAccessoryDetail="gotoAccessoryDetail"></partsTable>
    <!-- 新申请财务目标价 -->
    <applyPrice ref="applyPrice" @refresh="getTableList" :handleSelectArr="handleSelectArr"></applyPrice>
    <!-- 发送KM -->
    <kmDialog :rfqId="rfqId" :parts="handleSelectArr" :visible.sync="kmDialogVisible" />
  </iCard>
</template>

<script>
import {
  iButton,
  iCard,
  iPagination,
  iMessage,
  iMessageBox,
  iInput,
  icon
} from "rise";
import tableList from "@/views/partsign/home/components/tableList";
import {
  tableTitle,
  form
} from "@/views/partsprocure/home/components/data";
import {
  deleteRfqPart
} from '@/api/partsrfq/editordetail';
import { getTabelData} from "@/api/partsprocure/home";
import {
  insertRfqPart as addRfq,
} from '@/api/partsrfq/home';
import {
  pageMixins
} from "@/utils/pageMixins";
import applyPrice from "./components/applyPrice";
import partsTable from './components/partsTable'
import store from "@/store";
import {
  rfqCommonFunMixins
} from "pages/partsrfq/components/commonFun";
import kmDialog from "./components/kmDialog";
import {partProjTypes} from '@/config'

export default {
  mixins: [pageMixins, rfqCommonFunMixins],
  components: {
    iButton,
    iCard,
    tableList,
    iPagination,
    applyPrice,
    partsTable,
    kmDialog,
    iInput,
    icon
  },
  async mounted() {
    const {query} = this.$route;
    const {id,businessKey} = query;
    // this.rfqId = this.$route.query.id
    this.rfqId = id || '';

    // 当类型为AEKO时 表头需要隐藏部分
    if(businessKey == partProjTypes.AEKOLINGJIAN){
      this.tableTitle = tableTitle.filter((item)=>item.isAekoShow);
    }

    await this.getTableList()
    if(this.queryForm.buyerId != undefined){
    this.$refs.partsTable && this.$refs.partsTable.getTableList() 
    }
  },
  inject: ['getbaseInfoData', 'getDisabled'],
  computed: {
    disabled() {
      return this.getDisabled()
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      confirmTableLoading: false,
      handleSelectArr: [], // 已在RFQ中零件选中数据
      waitHandleSelectArr: [], //未在RFQ中零件选中数据
      applyPriceShow: false, //显示财务申请价
      parmarsHasRfq: JSON.parse(JSON.stringify(form)),
      rfqId: "",
      addLoding: false,
      kmDialogVisible: false,
      partProjTypes,
      queryForm: {
         buyerId:this.$store.state.permission.userInfo.id
      },
      partNumList: "",
      
    };
  },
  methods: {
    gotoAccessoryDetail(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/accessorypartdetail', query: { spNum: row.fsnrGsnrNum }})
      window.open(router.href,'_blank')
    },
    // 已在RFQ中零件选中数据
    handleSelectionChange(rows) {
      this.handleSelectArr = rows;
    },
    // 未在RFQ中零件选中数据
    waitSelect(e) {
      this.waitHandleSelectArr = e
    },
    // 跳转详情
    openPage(item) {
      const resolve = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
          businessKey:item.partProjectType //新增业务标识。
        },
      });
      window.open(resolve.href,'_blank')
    },
    validateStart() {
      return new Promise((r) => {
        if (this.waitHandleSelectArr.length == 0) {
          r(false);
          iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU','抱歉，您当前还未选择需要添加的采购项目！'));
          return;
        }
        if (this.waitHandleSelectArr.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
              this.language('LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININTIANJIA','抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！')
          );
          return;
        }
        r(true);
      });
    },
    // 添加
    async start() {
      if (!(await this.validateStart())) return;
      this.addLoding = true;
      const parmars = this.waitHandleSelectArr.map(r=>{return {...r,...{userId: store.state.permission.userInfo.id || '',userName: store.state.permission.userInfo.userName,rfqId: this.rfqId}}})
      addRfq(parmars)
      .then(async (res) => {
        if (res.data && res.data.rfqId) {
          this.resultMessage(res)
          await this.getTableList()
          //this.$refs.applyPrice.getTableList()
          this.queryForm = { ...this.queryForm, partNumList: this.partNumList }
          this.$refs.partsTable.page.currPage = 1
          this.$refs.partsTable && this.$refs.partsTable.getTableList()
        } else {
          this.resultMessage(res)
        }
      })
      .finally(() => this.addLoding = false)
    },
    //获取表格数据
    getTableList() {
      if (this.rfqId) {
        this.confirmTableLoading = true
        this.parmarsHasRfq['size'] = this.page.pageSize
        this.parmarsHasRfq['current'] = this.page.currPage
        this.parmarsHasRfq['rfqId'] = this.rfqId || ''
        return getTabelData(this.parmarsHasRfq).then(res => {
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.tableListData = Array.isArray(res.data) ? res.data : []
          if (this.tableListData.length) {
            this.queryForm = {
              buyerId: this.tableListData[0].buyerId,
              linieId: this.tableListData[0].linieId,
              partProjectType: this.tableListData[0].partProjectType
            }
          } else {
            const baseInfo = this.getbaseInfoData()
            this.queryForm = {
              buyerId: baseInfo.buyerId,
              linieId: baseInfo.linieUserId,
            }
          }
          
          this.$store.dispatch('setPendingPartsList', this.tableListData.map(r=>{return {...r,...{purchaseProjectId:r.id}}}))
        }).finally(() => this.confirmTableLoading = false)
      }
    },
    // 新申请财务目标价
    showApplyPrice() {
      console.log(this.handleSelectArr.length);
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU','抱歉，您当前还未选择需要申请目标价的采购项目！'));
        return
      }
      this.$refs.applyPrice.show()
    },
    // 再次申请财务目标价
    againApply() {
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU','抱歉，您当前还未选择需要申请目标价的采购项目！'));
        return
      }
      this.$refs.applyPrice.againShow()
    },
    async deleteItems() {
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU','抱歉，您当前还未选择需要申请目标价的采购项目！'));
        return
      }
      iMessageBox(this.language('deleteSure','确定要执行删除操作吗？'),this.language('LK_WENXINTISHI','温馨提示')).then(async ()=>{
        const idList = this.handleSelectArr.map(item => {
        return item.id
        })
        const req = {
          // deletePartPackage: {
            userId: store.state.permission.userInfo.id,
            rfqId: this.rfqId,
            idList
          // }
        }
        const res = await deleteRfqPart(req)
        this.resultMessage(res)
        this.getTableList()
        this.queryForm = { ...this.queryForm, partNumList: this.partNumList }
        this.$refs.partsTable.page.currPage = 1
        this.$refs.partsTable.getTableList()
        })
    },
    // 发送KM
    sendKM() {
      if (!this.handleSelectArr.length) return iMessage.warn(this.language("LK_QINGXUANZEZHISHAOYITIAOSHUJU",'请选择至少一条数据'))
      this.kmDialogVisible = true
    },
    // 查询零件列表
    queryParts() {
      this.queryForm = { ...this.queryForm, partNumList: this.partNumList }
      this.$refs.partsTable.page.currPage = 1
      this.$refs.partsTable.getTableList()
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  justify-content: flex-end;
  margin-bottom: 20px;
}

.addFs {
  height: 85px;
  justify-content: space-between;
}
.openLinkText{
  color:$color-blue;
}

.partInput {
  width: 260px;

  ::v-deep .el-input__suffix {
    .el-input__suffix-inner {
      height: 100% !important;
    }

    .inputSearchIcon {
      display: inline-block;
      width: 30px;
      font-size: 16px;
      height: 100%;
      cursor: pointer;

      .icon {
        height: 100% !important;
      }
    }
  }
}
</style>
