<!--
 * @Author: Luoshuang
 * @Date: 2021-06-05 14:14:49
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-07 16:21:33
 * @Description: 加入已有rfq
 * @FilePath: \front-web\src\views\designateFiles\fileManage\components\joinRfq.vue
-->

<template>
  <iDialog 
    title="加入已有RFQ"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20" :icon="false" @reset="handleSearchReset" @sure="getTableList"
              :resetKey="PARTSRFQ_RESET" :searchKey="PARTSRFQ_SEARCH">
      <el-form>
        <el-form-item :label="$t('LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN')" style="width: 340px">
          <iInput :placeholder="$t('LK_QINGXUANZE')" v-model="form.searchConditions"
                  v-permission="PARTSRFQ_SEARCHBOX"></iInput>
        </el-form-item>
        <el-form-item :label="$t('LK_CHEXINGXIANGMU')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.carType"
                    v-permission="PARTSRFQ_MODELPROJECT">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="items in carTypeOptions" :key='items.code' :value='items.code' :label="items.name"/>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_RFQZHUANGTAI')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.rfqStatus"
                    v-permission="PARTSRFQ_RFQSTATUS">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="items in rfqStatusOptions" :key='items.code' :value='items.code'
                        :label="items.name"/>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_CHEXING')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.car">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <!-- <el-option v-for="items in rfqStatusOptions" :key='items.code' :value='items.code'
                        :label="items.name"/> -->
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <!------------------------------------------------------------------------>
      <!--                  table模块，向外入参表格数据，表头                    --->
      <!------------------------------------------------------------------------>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ $t('LK_RFQZONGHEGUANLI') }}</span>
        <div class="floatright">
          <!--加入该键-->
          <iButton @click="joinRfq" :loading="activateButtonLoading">
            加入
          </iButton>
        </div>
      </div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openPage='openPage'
        open-page-props="id"
        :index="true"
        icon-props="recordId"
      >
      </tablelist>
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
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iPagination, iSelect, iMessage, iSearch } from 'rise'
import tablelist from "@/views/partsrfq/components/tablelist";
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle} from "@/views/partsrfq/home/components/data";
import {getRfqDataList, findBySearches} from "@/api/partsrfq/home";
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iInput, iPagination, tablelist, iSelect, iSearch },
  props: {
    dialogVisible: { type: Boolean, default: false },
    partType: {type:String}
  },
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      activateButtonLoading: false,
      form: {},
      carTypeOptions: [],
      rfqStatusOptions: []
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.getTableList()
      }
    }
  },
  methods: {
    handleSearchReset() {
      this.form = {}
    },
    /**
     * @Description: 车型项目下拉
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getCarTypeOptions() {
      const res = await findBySearches('01')
      this.carTypeOptions = res.data
    },
    /**
     * @Description: rfq状态下拉
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getRfqStatusOptions() {
      const res = await findBySearches('03')
      this.rfqStatusOptions = res.data
    },
    joinRfq() {
      if (this.selectTableData.length < 1) {
        iMessage.warn('请选择一条RFQ')
        return
      }
      if (this.selectTableData.length > 1) {
        iMessage.warn('只能选择一条RFQ')
        return
      }
      this.changeActiveButtonLoading(true)
      this.$emit('joinRfq', this.selectTableData[0])
    },
    changeActiveButtonLoading(visible) {
      this.activateButtonLoading = visible
    },
    clearDialog() {
      this.reason = ''
      this.$emit('changeVisible', false)
    },
    handleConfirm() {
      this.$emit('handleBack', this.reason)
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //动态获取转派评分任务
    openPage(id) {
      this.$router.push({
        path: `/sourcing/partsrfq/editordetail?id=${id}`
      })
    },
    //获取表格数据
    async getTableList() {
      this.tableLoading = true;
      const req = {
        rfqMangerInfosPackage: {
          userId: this.$store.state.permission.userInfo.id,
          current: this.page.currPage,
          size: this.page.pageSize,
          ...this.form,
          partType: this.partType
        }
      }
      try {
        const res = await getRfqDataList(req)
        this.tableListData = res.data.getRfqInfoVO.rfqVOList;
        this.page.currPage = res.data.getRfqInfoVO.pageNum
        this.page.pageSize = res.data.getRfqInfoVO.pageSize
        this.page.totalCount = res.data.getRfqInfoVO.total
        this.tableLoading = false;
      } catch {
        this.tableLoading = false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 90%;
    .el-dialog__body {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }
}
</style>