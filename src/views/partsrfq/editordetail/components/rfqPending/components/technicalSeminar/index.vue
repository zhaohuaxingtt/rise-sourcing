<template>
  <div v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_BASICINFORMATIONMEETING_INDEXPAGE|技术交底会">
    <iCard>
      <div class="margin-bottom5 clearFloat" v-if="!disabled">
        <div class="floatright">
          <iButton @click="addSupplier" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_ADDSUPPLIER|技术交底会-添加供应商">
            {{ language('LK_TIANJIAGONGYINGSHANG','添加供应商') }}
          </iButton>
          <iButton @click="sendToMyEmail"
                   v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_SENDTOMYEMAIL|技术交底会-发送至我的邮箱">
            {{ language('LK_FASONGZHIWODEYOUXIANG','发送至我的邮箱') }}
          </iButton>
        </div>
      </div>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ language('LK_HUIYIJIBENXINXI','会议基本信息') }}</span>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          open-page-props="action"
          :customOpenPageWord="language('LK_CHAKAN','查看')"
          @openPage="openPage"
          :openPageGetRowData="true"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <!-- <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      /> -->
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  供应商材料准备                                      --->
    <!------------------------------------------------------------------------>
    <supplier-material-preparation v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_SUPPLIERDOCUMENTS|技术交底会-供应商材料准备" class="margin-top20" ref="supplierMaterialPreparation"/>
    <!------------------------------------------------------------------------>
    <!--                  会议其它信息                                      --->
    <!------------------------------------------------------------------------>
    <other-meeting-information v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_OTHERINFO|技术交底会-会议其它信息" class="margin-top20" ref="otherMeetingInformation"/>
    <!------------------------------------------------------------------------>
    <!--                  图纸弹框                                      --->
    <!------------------------------------------------------------------------>
    <drawing-dialog
        v-model="dialogDrawing"
        :drawing-list="drawingList"
    />
    <!------------------------------------------------------------------------>
    <!--                  添加供应商弹框                                      --->
    <!------------------------------------------------------------------------>
    <add-supplier-dialog
        @sure="handleAddSupplierSave"
        v-model="dialogAddSupplier"
        :addSupplierList="addSupplierList"
    />
  </div>
</template>

<script>
import {iCard, iPagination, iButton, iMessage} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import supplierMaterialPreparation from './components/supplierMaterialPreparation'
import otherMeetingInformation from './components/otherMeetingInformation'
import drawingDialog from './components/drawingDialog'
import addSupplierDialog from './components/addSupplierDialog'
import {getAllRfqParts, addTechnology, getPic} from "@/api/partsrfq/editordetail";
import store from '@/store'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";

export default {
  components: {
    iCard,
    iPagination,
    iButton,
    tablelist,
    supplierMaterialPreparation,
    otherMeetingInformation,
    drawingDialog,
    addSupplierDialog
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      dialogDrawing: false,
      dialogAddSupplier: false,
      addSupplierList: [],
      drawingList: []
    };
  },
  created() {
    this.getTableList();
  },
  inject: ["getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled()
    }
  },
  methods: {
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        try {
          const res = await getAllRfqParts(id)
          this.tableListData = res.data;
          this.page.currPage = res.current
          this.page.pageSize = res.size
          this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    submit() {
    },
    recall() {
    },
    addSupplier() {
      this.dialogAddSupplier = true
    },
    async sendToMyEmail() {
      const id = this.$route.query.id
      const supplierMaterialPreparationData = this.$refs.supplierMaterialPreparation.dynamicForm.baseInfo.filter(item => {
        return item.value.length > 0
      })
      const otherMeetingInformationData = this.$refs.otherMeetingInformation.form
      const meetingStuffList = supplierMaterialPreparationData.map(item => {
        return item.value
      })
      const supplierIdList = this.addSupplierList.map(item => {
        return item.supplierId
      })
      const partNumsList = this.selectTableData.map(item => {
        return item.partNum
      })
      if (supplierIdList.length === 0) {
        iMessage.warn(this.language('LK_QINGTIANJIAGONGYINGSHANG','请添加供应商!'))
        return
      }
      const req = {
        rfqId: id,
        userId: store.state.permission.userInfo.id,
        // eslint-disable-next-line no-undef
        meetingDate: otherMeetingInformationData.meetingDate ? moment(otherMeetingInformationData.meetingDate).format('YYYY-MM-DD') : '',
        meetingLocation: otherMeetingInformationData.meetingLocation,
        memo: otherMeetingInformationData.memo,
        meetingStuff: meetingStuffList.join(','),
        supplierIds: supplierIdList,
        partNums: partNumsList,
        partsInfo: this.selectTableData,
        supplierInfo: this.addSupplierList
      }
      const res = await addTechnology(req)
      this.resultMessage(res)
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    openPage(row) {
      this.dialogDrawing = true
      this.getPic(row)
    },
    handleAddSupplierSave(list) {
      this.addSupplierList = list
      this.dialogAddSupplier = false
      iMessage.success(this.language('LK_YIBAOCUN','已保存'))
    },
    async getPic(row) {
      this.drawingList = []
      const req = {
        partNum: row.partNum
      }
      this.drawingList = await getPic(req)
    }
  }
}
</script>

<style scoped>

</style>
