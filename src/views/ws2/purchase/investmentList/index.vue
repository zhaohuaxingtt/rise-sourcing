<template>
  <div>
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="getTableListFn"
        @reset="reset"
        :icon="false"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="PARTSPROCURE_CONFIRM"
        v-loading="loadingiSearch"
    >
      <el-form>
        <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
          <iInput :placeholder="language('LK_QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('TPZS.GONGYINGSHANG', '供应商')">
          <iInput :placeholder="language('LK_QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_BMDANLIUSHUIHAO', 'BM单流水号')">
          <iInput :placeholder="language('LK_QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item :label="language('LK_MUJUTOUZIQINGDANZHUANGTAI', '模具投资清单状态')">
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              filterable
              clearable
          >
            <el-option
                :value="item.id"
                :label="item.carTypeProjectName"
                v-for="(item, index) in carTypeList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CHEXINGXIANGMU', '车型项目')">
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              filterable
              clearable
          >
            <el-option
                :value="item.id"
                :label="item.carTypeProjectName"
                v-for="(item, index) in carTypeList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_KESHI', '科室')">
          <iInput :placeholder="language('LK_QINGSHURU', '请输入')"></iInput>
        </el-form-item>
        <el-form-item label="Linie">
          <iInput :placeholder="language('LK_QINGSHURU', '请输入')"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <div class="icardHeader">
        <el-switch
            v-model="onleySelf"
            inactive-text="仅看自己">
        </el-switch>
        <div>
          <iButton @click="handoverShow = true">{{ language('LK_ZHUANPAI', '转派') }}</iButton>
          <iButton @click="rejectShowBtn">{{ language('LK_FASONGGONGYIUNGSHANGQUEREN', '发送供应商确认') }}</iButton>
          <iButton @click="transferBtn">{{ language('LK_FAQIBIANGENG', '发起变更') }}</iButton>
        </div>
      </div>
      <!--      570-->
      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #aa="scope">
          <div class="table-link" @click="toBmInfo">{{scope.row.aa}}</div>
        </template>
      </iTableList>
      <div style="color: #999999;font-size: 14px;text-align: right;margin: 10px 0;">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableListFn)"
          @current-change="handleCurrentChange($event, getTableListFn)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      />
    </iCard>
    <handover v-model="handoverShow"></handover>
  </div>
</template>

<script>
import {iCard, iSearch, iSelect, iPagination, iButton, iInput, iMessage} from 'rise';
import {iTableList} from "@/components";
import {investmentListTitle} from "../components/data"
import handover from "../components/handover"
import {pageMixins} from "@/utils/pageMixins";
import {Switch, Popover} from "element-ui"

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iSearch,
    iSelect,
    iTableList,
    iPagination,
    iButton,
    iInput,
    handover,
  },
  data() {
    return {
      loadingiSearch: false,
      tableLoading: false,
      onleySelf: false,
      handoverShow: false,
      tableTitle: investmentListTitle,
      tableListData: [{aa: 'E1276A46'}],
    }
  },
  methods: {
    toBmInfo(){
      //  如当前用户没有查看“模具投资金额”的权限，点击流水号后提示“对不起，您所在的岗位没有该材料组权限”
      this.$router.push({path: '/purchase/investmentList/bmInfo'})
    },
    getTableListFn() {

    },
    reset() {

    }
  }
}
</script>

<style lang="scss" scoped>
.icardHeader{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ::v-deep .el-switch__label.is-active{
    color: #41434A;
  }
}
.table-link{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  cursor: pointer;
}
</style>