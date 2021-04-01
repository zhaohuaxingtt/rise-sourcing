<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ $t('LK_SHIJIANJIHUA') }}</span>
        <div class="floatright">
          <template v-if="!editStatus">
            <iButton @click="edit" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_EDIT">{{
                $t('LK_BIANJI')
              }}
            </iButton>
          </template>
          <template v-else>
            <iButton @click="save" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_SAVE">{{
                $t('LK_BAOCUN')
              }}
            </iButton>
            <iButton @click="back" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_BACK">{{
                $t('LK_FANHUI')
              }}
            </iButton>
          </template>

          <iButton @click="exports" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_EXPORTS">
            {{ $t('LK_DAOCHU') }}
          </iButton>
        </div>
      </div>
      <tablelist
          v-if="showTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
          :hide-open-page="true"
          :input-props="inputProps"
          input-type="number"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iMessage} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {timePlanableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getRfqDataList, editRfqData} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";
import store from '@/store'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: timePlanableTitle,
      tableLoading: false,
      selectTableData: [],
      editStatus: false,
      inputProps: [],
      showTable: true
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        const req = {
          otherInfoPackage: {
            findType: '07',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data.timePlanVO.timePlanVOList;
          this.page.currPage = res.data.timePlanVO.pageNum
          this.page.pageSize = res.data.timePlanVO.pageSize
          this.page.totalCount = res.data.timePlanVO.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    edit() {
      this.editStatus = true
      this.inputProps = ['svwFirst', 'svwRequestEm', 'svwRequestOts']
      this.reRenderTable()
    },
    async save() {
      const reqList = this.tableListData.map(item => {
        return {
          userId: store.state.permission.userInfo.id,
          id: item.id,
          svwFirst: Number(item.svwFirst) ? Number(item.svwFirst) : 0,
          svwRequestEm: Number(item.svwRequestEm) ? Number(item.svwRequestEm) : 0,
          svwRequestOts: Number(item.svwRequestOts) ? Number(item.svwRequestOts) : 0,
        }
      })
      const req = {
        updateTimePlanPackage: reqList
      }
      const res = await editRfqData(req)
      this.resultMessage(res)
      this.editStatus = false
      this.inputProps = []
      this.reRenderTable()
      this.getTableList()
    },
    back() {
      this.editStatus = false
      this.inputProps = []
      this.reRenderTable()
    },
    reRenderTable() {
      this.showTable = false
      this.$nextTick(() => {
        this.showTable = true
      })
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      excelExport(this.selectTableData, this.tableTitle)
    },
  }
}
</script>

<style scoped>

</style>