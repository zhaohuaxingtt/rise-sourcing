<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
 * @LastEditors: ldh
* @Description: 待办事项-零件清单
 -->
<template>
  <iCard>
    <div class="header flex-align-center">
      <iButton @click="deleteItems" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_DELETE">{{
          $t('delete')
        }}
      </iButton>
      <iButton @click="sendKM">{{ $t('LK_FASONGKM') }}</iButton>
      <iButton @click="showApplyPrice" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_NEWPRICE">
        {{ $t('LK_XINSHENQINGCAIWUMUBIAOJIA') }}
      </iButton>
      <iButton @click="againApply" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_REAPPLYPRICE">
        {{ $t('LK_ZAICISHENGQINGCAIWUMUBIAOJIA') }}
      </iButton>
    </div>
    <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="confirmTableLoading"
               @handleSelectionChange="handleSelectionChange" @openPage="openPage" radio></tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
                 :page-size="page.pageSize" :current-page="page.currPage" :layout="page.layout"
                 :total="page.totalCount"></iPagination>
    <div class="addFs flex-align-center">
      <iButton @click="start" :loading="addLoding" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_ADD">
        {{ $t('LK_TIANJIA') }}
      </iButton>
    </div>
    <partsTable ref="partsTable" :rfqId="rfqId" @targetHand="waitSelect"></partsTable>
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
  iMessageBox
} from "rise";
import tableList from "@/views/partsign/home/components/tableList";
import {
  tableTitle,
  form
} from "@/views/partsprocure/home/components/data";
import {
  getPartSrcPrjs,
} from '@/api/partsrfq/editordetail';
import {
  addRfq,
  editRfqData
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

export default {
  mixins: [pageMixins, rfqCommonFunMixins],
  components: {
    iButton,
    iCard,
    tableList,
    iPagination,
    applyPrice,
    partsTable,
    kmDialog
  },
  created() {
    this.rfqId = this.$route.query.id
    this.getTableList();
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
      kmDialogVisible: false
    };
  },
  methods: {
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
      this.$router.push({
        path: "/sourcing/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
        },
      });
    },
    validateStart() {
      return new Promise((r) => {
        if (this.waitHandleSelectArr.length == 0) {
          r(false);
          iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZEXUYAOTIANJIADECAIGOUXIANGMU'));
          return;
        }
        if (this.waitHandleSelectArr.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
              this.$t('LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININTIANJIA')
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
      addRfq({
        insertRfqPackage: {
          operationType: '1',
          userId: store.state.permission.userInfo.id || '',
          userName: store.state.permission.userInfo.userName,
          rfqPartDTOList: this.waitHandleSelectArr,
          rfqId: this.rfqId
        }
      })
          .then((res) => {
            this.addLoding = false;
            if (res.data && res.data.rfqId) {
              this.getTableList()
              this.resultMessage(res)
              //this.$refs.applyPrice.getTableList()
              this.$refs.partsTable.getTableList()
            } else {
              this.resultMessage(res)
            }
          })
          .catch(() => {
            this.addLoding = false;
          });
    },
    //获取表格数据
    getTableList() {
      if (this.rfqId) {
        this.confirmTableLoading = true
        this.parmarsHasRfq['search.size'] = this.page.pageSize
        this.parmarsHasRfq['search.current'] = this.page.currPage
        this.parmarsHasRfq['search.rfqId'] = this.rfqId
        this.parmarsHasRfq['search.projectStatus'] = ''
        getPartSrcPrjs(this.parmarsHasRfq).then(res => {
          this.confirmTableLoading = false
          this.page.currPage = res.data.pageData.pageNum
          this.page.pageSize = res.data.pageData.pageSize
          this.page.totalCount = res.data.pageData.total
          this.tableListData = res.data.pageData.data
          this.$store.dispatch('setPendingPartsList', this.tableListData)
        }).catch(() => this.confirmTableLoading = false)
      }
    },
    // 新申请财务目标价
    showApplyPrice() {
      console.log(this.handleSelectArr.length);
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU'));
        return
      }
      this.$refs.applyPrice.show()
    },
    // 再次申请财务目标价
    againApply() {
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU'));
        return
      }
      this.$refs.applyPrice.againShow()
    },
    async deleteItems() {
      if (this.handleSelectArr.length == 0) {
        iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZEXUYAOSHENQINGMUBIAOJIADECAIGOUXIANGMU'));
        return
      }
      iMessageBox(this.$t('deleteSure'),this.$t('LK_WENXINTISHI')).then(async ()=>{
        const idList = this.handleSelectArr.map(item => {
        return item.id
        })
        const req = {
          deletePartPackage: {
            userId: store.state.permission.userInfo.id,
            rfqId: this.rfqId,
            idList
          }
        }
        const res = await editRfqData(req)
        this.resultMessage(res)
        this.getTableList()
        this.$refs.partsTable.getTableList()
        })
    },
    // 发送KM
    sendKM() {
      if (!this.handleSelectArr.length) return iMessage.warn(this.$t("LK_QINGXUANZEZHISHAOYITIAOSHUJU"))

      this.kmDialogVisible = true
    }
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
  justify-content: flex-end;
}
</style>
