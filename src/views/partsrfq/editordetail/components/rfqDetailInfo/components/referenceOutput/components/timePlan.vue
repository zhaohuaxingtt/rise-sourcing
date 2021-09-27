<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ language('LK_SHIJIANJIHUA','时间计划') }}</span>
        <div class="floatright">
          <span v-if="!disabled">
            <template v-if="!editStatus">
              <iButton @click="edit" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_EDIT">{{
                  language('LK_BIANJI','编辑')
                }}
              </iButton>
            </template>
            <template v-else>
              <iButton @click="save" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_SAVE">{{
                  language('LK_BAOCUN','保存')
                }}
              </iButton>
              <iButton @click="back" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_BACK">{{
                  language('LK_FANHUI','返回')
                }}
              </iButton>
            </template>
          </span>

          <iButton @click="exports" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_EXPORTS">
            {{ language('LK_DAOCHU','导出') }}
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
          v-update
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
import {iCard, iButton, iPagination, iMessage} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {timePlanableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getTimePlanList, saveTimePlanList} from "@/api/partsrfq/home";
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
  inject: ["getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled()
    }
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
          rfqId: id,
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
        }
        try {
          const res = await getTimePlanList(req)
          if (res.result) {
            this.tableListData = res.data
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total
          } else {
            this.tableListData = []
            this.page.totalCount = 0
            this.page.currPage = 1
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          
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
      this.inputProps = ['svwRequeseFirstTestMode', 'svwRequestEm', 'svwRequestOts']
      this.reRenderTable()
    },
    async save() {
      const req = this.tableListData.map(item => {
          return {
            ...item,
            svwRequeseFirstTestMode: Number(item.svwRequeseFirstTestMode) ? Number(item.svwRequeseFirstTestMode) : 0,
            svwRequestEm: Number(item.svwRequestEm) ? Number(item.svwRequestEm) : 0,
            svwRequestOts: Number(item.svwRequestOts) ? Number(item.svwRequestOts) : 0,
          }
      })
      const res = await saveTimePlanList(req)
      if (res.result) {
        iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      }
      this.editStatus = false
      this.inputProps = []
      this.reRenderTable()
      this.getTableList()
    },
    back() {
      this.editStatus = false
      this.inputProps = []
      this.reRenderTable()
      this.getTableList()
    },
    reRenderTable() {
      this.showTable = false
      this.$nextTick(() => {
        this.showTable = true
      })
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUSHUJU','请选择需要导出的数据'))
      excelExport(this.selectTableData, this.tableTitle)
    },
  }
}
</script>

<style scoped>

</style>