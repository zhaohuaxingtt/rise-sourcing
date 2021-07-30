<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 13:30:56
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <!--深入评级-->
  <iDialog :title="$t('TPZS.JRZXFXGJ')" :visible.sync="value" width="581px" @close="clearDiolog">
    <el-form>
      <el-form-item :label="$t('partsignLanguage.QingShuRu')">
        <iInput @change="handleKeyword" :placeholder="$t('TPZS.CLZRFQLJH')" v-model="form.keyword">
        </iInput>
        <div @click="handleKeyword" class="icon-search">
          <icon name='iconshaixuankuangsousuo' symbol></icon>
        </div>
      </el-form-item>
    </el-form>
    <tableList height="300" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' @handleSelectionChange="handleSelectionChange">
      <template #categoryCode="scope">
        <el-radio @change="handleRadio(scope.row.categoryName,scope.row.categoryCode,'','')" v-model="form.radio" :label="scope.row.categoryCode">{{scope.row.categoryCode+scope.row.categoryName}}</el-radio>
      </template>
      <template #id="scope">
        <el-radio @change="handleRadio('','',scope.row.id,'')" v-model="form.radio" :label="scope.row.id">{{scope.row.id+scope.row.rfqName}}</el-radio>
      </template>
      <template #partNum="scope">
        <el-radio @change="handleRadio('','','',scope.row.partNum)" v-model="form.radio" :label="scope.row.partNum">{{scope.row.partNum}}</el-radio>
      </template>
    </tableList>
    <div slot="footer" class="dialog-footer">
      <iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iInput, icon } from 'rise';
import { pageRfqBaseInfo } from "@/api/partsrfq/specialAnalysisTool/specialAnalysisTool.js";
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from "./data.js";
export default {
  components: {
    iDialog,
    iSelect,
    iButton,
    iInput, icon, tableList
  },
  props: {
    value: { type: Boolean },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      keyLoading: false,
      form: {
        keyword: '',
        radio: '',
        rfqId: '',
        categoryName: '',
        categoryCode: '',
        partNum: '',
      },
      formGroup: {
        keywordList: []
      }
    };
  },
  created() {
  },
  methods: {
    handleRadio(categoryName, categoryCode, id, partNum) {
      this.form.categoryName = categoryName
      this.form.categoryCode = categoryCode
      this.form.rfqId = id
      this.form.partNum = partNum
    },
    async handleKeyword() {
      const pms = {
        keyword: this.form.keyword
      }
      this.tableLoading = true
      try {
        const res = await pageRfqBaseInfo(pms)
        if (res.result) {
          this.tableListData = res.data
        }
        this.tableLoading = false
      } catch (error) {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSubmit() {
      this.$emit('getDataList', this.form)
    }
  },
  watch: {
    value() {
      this.form = {};
    },
  },
};
</script>

<style scoped lang="scss">
.icon-search {
  position: absolute;
  height: 100%;
  right: 1rem;
  top: 40px;
  font-size: 20px;
  text-align: center;
  color: #aaaaaa;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
}
::v-deep .el-form-item__content {
  text-align: left;
}
</style>
