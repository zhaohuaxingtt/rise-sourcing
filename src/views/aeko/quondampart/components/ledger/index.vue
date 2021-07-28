<!--
 * @Author: your name
 * @Date: 2021-07-27 10:51:49
 * @LastEditTime: 2021-07-27 14:11:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aeko\quondampart\components\ledger\index.vue
-->
<template>
  <div class="ledger">
    <iSearch
      class="margin-top25"
      icon
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURUGONGYINGSHANGBIANHAO', '请输入供应商编号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('CAIGOUGONGCHANG', '采购工厂')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZECAIGOUGONGCHANG', '请选择采购工厂')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('ZHIDINGTAIZHANGKUYUANLINGJIAN', '指定台账库原零件')">
      <template #header-control>
        <iButton>{{ language("BAOCUN", "保存") }}</iButton>
        <iButton>{{ language("DAOCHU", "导出") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #currentAPrice="scope">
            <iInput class="deptNumSelect" :placeholder="language('QINGXUANZE', '请选择')" v-model="scope.row.currentAPrice" readonly @click.native="handleSelect(scope.row)">
              <div class="inputSearchIcon" slot="suffix">
                <icon symbol name="iconshaixuankuangsousuo" />
              </div>
            </iInput>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
    <presentAllInPriceDialog :visible.sync="visible" />
  </div>
</template>

<script>
import { iSearch, iInput, iSelect, iCard, iButton, iPagination, icon } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import presentAllInPriceDialog from "../presentAllInPriceDialog"
import { ledgerTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, iPagination, tableList, icon, presentAllInPriceDialog },
  mixins: [ pageMixins ],
  data() {
    return {
      carTypeProjectOptions: [],
      form: {},
      tableTitle,
      tableListData: [{}],
      visible: false,
    }
  },
  methods: {
    sure() {},
    reset() {},
    handleSelectionChange() {},
    handleSelect(row) {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ledger {
  .deptNumSelect {
    ::v-deep input {
      cursor: pointer;
    }

    ::v-deep .el-input__suffix {
      right: 0;
    }
  }

  ::v-deep .el-input__suffix {
    .inputSearchIcon {
      display: inline-block;
      width: 30px;
      font-size: 16px;
      height: 100%;

      .icon {
        height: 100% !important;
      }
    }
  }
}
</style>