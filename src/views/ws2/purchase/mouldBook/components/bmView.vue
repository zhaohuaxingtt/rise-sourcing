<template>
  <div>
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="sure"
        @reset="reset"
        :icon="false"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="PARTSPROCURE_CONFIRM"
        v-loading="loadingiSearch"
    >
      <el-form>

        <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_AEKOHAO', 'AEKO号')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_BMDANHAO', 'BM单号')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_SAPDINGDANHAO', 'SAP订单号')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_RUZHANGDANHAO', '入账单号')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_CHEXINXIANGMU', '车型项目')">
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              v-model="form['tmCartypeProId']"
              filterable
              ref="carTypeProjectRef"
              clearable
          >
            <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in fromGroup"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>

        <el-form-item :label="language('LK_GONGYINGSHANG', '供应商')">
          <iInput clearable :placeholder="language('LK_QINGSHURUGONGYINGSHANG', '请输入(11025-上海汇众)')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_KESHI', '科室')">
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              v-model="form['tmCartypeProId']"
              filterable
              ref="carTypeProjectRef"
              clearable
          >
            <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in departmentList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>

        <el-form-item :label="language('LK_LINLE', 'Linle')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_MUJUTOUZIQINGDANZHUANGTAI', '模具投资清单状态')">
          <iSelect
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              v-model="form['tmCartypeProId']"
              filterable
              ref="carTypeProjectRef"
              clearable
          >
            <el-option
                :value="item.id"
                :label="item.cartypeNname"
                v-for="(item, index) in statusList"
                :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>

        
      </el-form>
    </iSearch>

    <iCard>

      <div class="bnts">
        <iButton @click="exportList">{{ language('LK_DAOCHU', '导出') }}</iButton>
      </div>

      <iTableList
        :tableData="bmTableList"
        :tableTitle="bmTableHead"
        :tableLoading="tableLoading"
        :selection="false"
      >
        <!-- BM单流⽔号 -->
        <template #data1="scope">
          <div class="table-link" @click="openBMDetail(scope.row)">{{scope.row.data1}}</div>
        </template>
      </iTableList>

      <!-- <iPagination
          v-update
          @size-change="handleSizeChange($event, getPageData)"
          @current-change="handleCurrentChange($event, getPageData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      /> -->
      <div class="UnitExplain">
        <UnitExplain />
      </div>
      
    </iCard>
    

  </div>
</template>

<script>
import {iPage, iMessage, iDialog, iButton, iSelect, iSearch, iInput,
  iPagination, iCard
} from "rise";
import {
  iTableList
} from "@/components";
import { bmForm, bmTableHead } from "./data";
import UnitExplain from "./unitExplain";


export default {
  components: {
    iSearch,
    iSelect,
    iInput,
    iTableList,
    iCard,
    iButton,
    UnitExplain
    // iPagination
  },

  data(){
    return {
      bmTableHead,
      form: bmForm,
      fromGroup: [],  //  车型项目
      departmentList: [], //  科室
      statusList: [], //  模具投资清单状态
      bmTableList: [{data1: '1123123'}],  //  table数据
      tableLoading: false,
    }
  },

  methods: {
    exportList(){ //  导出

    },

    openBMDetail(row){ //  跳转详情
      //  如当前用户没有查看“模具投资金额”的权限，点击流水号后提示“对不起，您所在的岗位没有该材料组权限”
      this.$router.push({path: '/purchase/mouldBook/details'})
    },
  }
}
</script>

<style lang="scss" scoped>
.UnitExplain{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.bnts{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.table-link{
  color: #1763F7;
  cursor: pointer;
  text-decoration: underline;
}
</style>