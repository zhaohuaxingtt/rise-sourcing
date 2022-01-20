<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('QINGXUANZERFQ', '请选择RFQ')}}</div>
      <div class="control">
        <span v-if="!readOnly">
          <iButton @click="openNominateTypeDialog" :loading="createDesignateLoading">{{language('nominationLanguage_XinJianLingJIanDingDianShengQIng', '新建零件定点申请')}}</iButton>
        </span>
      </div>
    </div>
    <div>
      <iSearch class="margin-bottom20" :icon="false" @reset="handleSearchReset" @sure="sure" :resetKey="PARTSRFQ_RESET" :searchKey="PARTSRFQ_SEARCH">
        <el-form>
          <el-form-item style="width:50%" :label="language('LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN_SAP_SUPPLIERNAME','零件号/零件采购项目号/RFQ编号/采购员/供应商SAP号/供应商名称')"
          >
            <iInput :placeholder="language('LK_QINGSHURU','请输入')" v-model="form.searchConditions"></iInput>
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <div class="body" v-loading="tableLoading">
      <tableList
        index
        :height="controlHeight ? '91%' : '100%'"
        v-show="visible"
        class="table margin-top20"
        :tableData="dataList"
        :tableTitle="tableTitle"
        radio
        @handleSelectionChange="handleSelectionChange">
        <template v-slot:icon="scope">
          <div class="icon-style">
            <icon symbol class="icon icon-color-active" name="iconliebiaoyizhiding"
                  v-if="+scope.data.recordId > 0"></icon>
            <icon symbol class="icon" name="iconliebiaoweizhiding" v-else></icon>
          </div>
        </template>
        <template #kmAnalysis="scope">
          <icon class="tick icon-style" v-if="scope.row.kmAnalysis" symbol name="iconbaojiazhuangtailiebiao_yibaojia" />
        </template>

        <!-- 已报价&已询价 合并显示 -->
        <template #suppliers="scope">
          <span>{{scope.row.quotations}}/{{scope.row.suppliers}}</span>
        </template>
      </tableList>
    </div>
    <div slot="footer" class="footer">
      <iPagination v-update
        class="pagination"
        @current-change="handleCurrentChange($event, getTableList)"
        @size-change="handleSizeChange($event, getTableList)"
        background
        :current-page="page.currPage"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
      
    </div>
  </iDialog>
</template>

<script>
import store from '@/store'
import { iPagination, iDialog, iMessage, iButton,iInput,iSearch } from 'rise'
import {tableTitle} from "pages/partsrfq/home/components/data";
import tableList from '@/views/designate/supplier/components/tableList'
import filters from '@/utils/filters'
import { pageMixins } from '@/utils/pageMixins'

import { getRfqList} from "@/api/partsrfq/home";
import { selectRfq } from "@/api/designate/designatedetail/addRfq"

export default {
  components: { tableList, iPagination, iDialog, iButton,iInput,iSearch },
  mixins: [ pageMixins, filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    visible: {
      handler() {
        this.$nextTick(() => { 
          if (this.visible) {
            this.getTableList()
          } else{
            this.form = {}
            // 刷新父列表
            this.$emit('refresh', {})
          }
        })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      form: {
        searchConditions: ''
      },
      dataList: [],
      selectedData: [],
      controlHeight: 0,
      createDesignateLoading: false
    }
  },
  methods: {
    sure() {
      this.page.currPage = 1
      this.getTableList()
    },
    handleSearchReset() {
      this.form = {}
      this.sure()
    },
    //获取表格数据
    async getTableList() {
      this.tableLoading = true;
      const req = {
          userId: store.state.permission.userInfo.id,
          current: this.page.currPage,
          size: this.page.pageSize,
          showSelf: true,
          ...this.form
      }
      try {
      const res = await getRfqList(req)
       res.data.forEach(val=> {
          // eslint-disable-next-line no-undef
          val.createDate = val.createDate?window.moment(val.createDate).format('YYYY-MM-DD'):''
          // eslint-disable-next-line no-undef
          val.currentRoundsEndTime = val.currentRoundsEndTime?window.moment(val.currentRoundsEndTime).format('YYYY-MM-DD'):''
        })
        this.dataList = Array.isArray(res.data) ? res.data : []
        this.page.totalCount = res.total
        this.tableLoading = false;
      } catch {
        this.tableLoading = false;
      }
    },
    handleSelectionChange(val) {
      console.log(val)
      this.selectedData = val
    },
    openNominateTypeDialog() {
      if (this.selectedData.length !== 1) return iMessage.warn(this.language("LK_QINGXUANZEYITIAORFQ","请选择一条RFQ"))
      // this.nominateTypeDialogVisible = true
      this.createDesignate()
    },
    // 创建定点申请
    createDesignate() {
      this.createDesignateLoading = true

      selectRfq({
        rfqIdArr: this.selectedData.map(o => o.id)
      })
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          const openDesignate = this.$router.resolve({
            path: "/designate/details", 
            query: {
              desinateId: res.data.nominateId, 
              sd: 1,
              designateType: res.data.nominateProcessType,
              partProjType: res.data.partProjectType
            }
          })
          window.open(openDesignate.href,'_blank')
        } else {
          iMessage.error(message)
        }

        this.createDesignateLoading = false
      })
      .catch(() => this.createDesignateLoading = false)
    },
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .upload-trigger {
    margin-left: 10px;
  }

  .link-underline {
    display: inline-block;
    margin-right: 15px;
  }
  .dialog-Header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 40px;
  }

  ::v-deep .el-dialog {
    width: 1745px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 480px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
       @include pdtb(28px, 28px);
    }
  }
}
</style>