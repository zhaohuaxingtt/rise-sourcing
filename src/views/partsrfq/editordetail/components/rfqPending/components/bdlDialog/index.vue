<!--
 * @Author: your name
 * @Date: 2021-08-11 14:54:24
 * @LastEditTime: 2021-09-01 20:01:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqPending\components\bdlDialog\index.vue
-->
<template>
  <iDialog
    class="bdlDialog"
    v-bind="$props"
    :visible.sync="status"
    v-on="$listeners"
  >
    <template #title>
      <p class="title">{{ language("TIANJIABDL", "添加BDL") }}</p>
      <div class="control" id="control">
        <iButton :loading="confirmLoading" @click="handleConfirm">{{ language("QUEREN", "确认") }}</iButton>
      </div>
    </template>
    <div class="body">
      <div class="form">
        <iInput class="formInput" :placeholder="language('LK_QINGSHURUCHANXUANGONGYINGSHANGMINGCHENG','请输入查询供应商名称')" v-model="supplierName">
          <div class="inputSearchIcon" slot="suffix">
            <icon symbol name="iconshaixuankuangsousuo" @click.native="query" />
          </div>
        </iInput>
      </div>
      <tableList
        index
        class="table margin-top20"
        lang
        ref="table"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
        @handleSelect="handleSelect"
        @handleSelectAll="handleSelectAll">
        <template #sapCode="scope">
          <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>
        <template #supplierNameZh="scope">
          <div class="flexRow">
            <span class="openLinkText cursor " @click="onJump360(scope.row)"> {{ scope.row.supplierNameZh }}
              <el-tooltip effect="light" :content="`FRM评级：${scope.row.frm}`" v-if="scope.row.frm">
                <span v-if="getStatus(scope.row.frm)">
                  <icon symbol class="cursor margin-left8" name="iconzhongyaoxinxitishi" />
                </span>
              </el-tooltip>
            </span>
            <span v-if="scope.row.supplierNameZh" class="icon-gray cursor"  @click="onJump360(scope.row)">
              <icon symbol class="show" name="icontiaozhuananniu" />
              <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </div> 
        </template>
        <template #bdlType="scope">
          <span>{{ scope.row.bdlType == "2" ? "M" : "" }}</span>
        </template>
        <template #isCheckCbd="scope">
          <span>{{ scope.row.isCheckCbd ? "是" : "否" }}</span>
        </template>
        <template #i="scope">
          <span class="cursor look" @click="onJump360(scope.row)">
						<icon symbol name="icongongyingshangshituliebiao" />
					</span>
        </template>
      </tableList>
    </div>
    <template #footer class="footer">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, unselectRfqBdlPage)"
        @current-change="handleCurrentChange($event, unselectRfqBdlPage)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </template>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, icon, iPagination, iMessage } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle } from "../BDL/data"
import { pageMixins } from "@/utils/pageMixins"
import { unselectRfqBdlPage, addRfqBdl } from "@/api/partsrfq/editordetail"
import {updateRfqBdl} from '@/api/partsrfq/home/index'
export default {
  components: { iDialog, iButton, iInput, icon, iPagination, tableList },
  mixins: [ pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false,
    },
    rfqId: {
      type: String,
      require: true,
      default: ""
    }
  },
  watch: {
    status(nv) {
      if (nv) {
        this.unselectRfqBdlPage()
      } else {
        this.multipleSelectionCache = []
        this.tableListData = []
        this.confirmLoading = false
      }
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    status: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit("update:visible", value)
      }
    }
  },
  data() {
    return {
      loading: false,
      supplierName: "",
      tableTitle,
      tableListData: [],
      multipleSelectionCache: [],
      confirmLoading: false,
    };
  },
  methods: {
    getStatus(value) {
      const arr = ['C','CC','CCC']
      return arr.some(item => item === value)
    },
    // 获取列表
    unselectRfqBdlPage() {
      this.loading = true

      unselectRfqBdlPage({
        rfqId: this.rfqId,
        supplierName: this.supplierName || undefined,
        size: this.page.pageSize,
        current: this.page.currPage,
        findType: "11"
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.tableListData.forEach(item => {
          if (this.multipleSelectionCache.some(cacheItem => cacheItem.supplierId === item.supplierId)) this.$nextTick(() => this.$refs.table.$refs.table.toggleRowSelection(item, true))
        })

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    query() {
      this.page.currPage = 1
      this.unselectRfqBdlPage()
    },
    handleSelectionChange(list) {
      this.multipleSelectionCache = this.multipleSelectionCache.concat(
        list.filter(item => !this.multipleSelectionCache.some(cacheItem => cacheItem.supplierId === item.supplierId))
      )
    },
    handleSelect(selection, row) {
      if (!selection.includes(row)) { // 从cache中删除
        this.multipleSelectionCache = this.multipleSelectionCache.filter(item => item.supplierId !== row.supplierId)
      }
    },
    handleSelectAll(selection) {
      if (!selection.length) { // 当前页取消选中操作
        // 用于删除操作的cache列表
        this.multipleSelectionCache = this.multipleSelectionCache.filter(cacheItem => !this.tableListData.some(item => item.supplierId === cacheItem.supplierId))
      }
    },
    onJump360(row) {
      window.open(`${ process.env.VUE_APP_PORTAL_URL }supplier/supplierList/details?subSupplierId=${ row.supplierSubId }&supplierType=${ row.supplierType }&nameZh=${ row.supplierNameZh }&nameEn=${ row.supplierNameEn }`, "_blank")
    },
    // 确认
    handleConfirm() {
      if (!this.multipleSelectionCache.length) return iMessage.warn(this.language("QINGXUANZEXUYAOTIANJIADEBDL", "请选择需要添加的BDL"))

      this.confirmLoading = true
      updateRfqBdl({
          rfqId: this.rfqId,
          updateType: "2",
          userId: this.userInfo.id,
          bdlInfoList: this.multipleSelectionCache
        })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          this.$emit("confirm", this.multipleSelectionCache)
          this.status = false
          iMessage.success(message)
        } else {
          iMessage.error(message)
        }

        this.confirmLoading = false
      })
      .catch(() => this.confirmLoading = false)
    },
  }
};
</script>

<style lang="scss" scoped>
.bdlDialog {
  .look {
		font-size: 28px;
	}

  .icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }

  .flexRow{
    display: flex;
    justify-content: space-between ;
    align-items: center;
  }
  
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }

  .form {
    .formInput {
      display: inline-block;
      width: 250px;
    }
  }

  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top !important;
    padding-bottom: $bottom !important;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  ::v-deep .el-dialog__header {
    position: relative;
  }

  .control {
    position: absolute;
    top: 50%;
    right: 94px;
    transform: translate(0, -50%);
  }

  ::v-deep .el-dialog {
    width: 1745px !important;
    position: absolute;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      // height: 580px;
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