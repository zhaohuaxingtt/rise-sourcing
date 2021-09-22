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

        <el-form-item :label="language('LK_CAILIAOZU', '材料组')">
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

        <el-form-item :label="language('LK_GONGYINGSHANG', '供应商')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_GONGYILEIXING', '工艺类型')">
          <iInput clearable :placeholder="language('LK_QINGSHURU', '请输入')" v-model="form['behalfPartsNum']" ></iInput>
        </el-form-item>

        <el-form-item :label="language('LK_ZICHANFENLEIBIANHAO', '资产分类编号')">
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
                v-for="(item, index) in assetsTypeList"
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
        :tableData="tableList"
        :tableTitle="assetsTableHead"
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
import { mouldForm, assetsTableHead } from "./data";
import UnitExplain from "./unitExplain";

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iCard,
    iTableList,
    iButton,
    UnitExplain
  },

  data(){
    return {
      form: mouldForm,
      departmentList: [], //  科室列表
      fromGroup: [],  //  车型项目
      assetsTypeList: [], //  资产分类编号
      tableList: [],
      tableLoading: false,
      assetsTableHead,
    }
  },

  methods: {
    exportList(){   //  导出

    }
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
</style>