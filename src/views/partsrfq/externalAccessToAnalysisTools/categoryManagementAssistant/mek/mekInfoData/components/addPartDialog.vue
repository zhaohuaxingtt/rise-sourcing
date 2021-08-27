<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog  :title="language('TIANJIALINGJIAN','添加零件')" :visible.sync="value" width="60%" @close="clearDiolog">
    <el-form label-width="60px" label-position="top">
      <el-row type="flex" align='bottom' justify="space-between">
        <el-col :span="5">
          <el-form-item :label="language('LINGJIANHAO','零件号')">
            <iInput :placeholder="$t('LK_QINGXUANZE')" v-model="form.partNum">
            </iInput>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="language('RSHAO','FS号')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.fsNum"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="language('RFQHAO','RFQ号')">
            <iInput :placeholder="$t('LK_QINGSHURU')" v-model="form.rfq"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <iButton @click="getTableList">{{$t('LK_QUEREN')}}</iButton>
            <iButton @click="handleSearchReset">{{$t('LK_ZHONGZHI')}}</iButton>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <tableList height="350px" class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' :index="true" @handleCurrentChange="handleCurrentChange">
    </tableList>
    <div slot="footer" class="dialog-footer">
      <iButton @click="handleAdd">{{language('TIANJIA','添加')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iInput, iButton, iDialog, icon } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { addPartTableTitle } from "./data.js";
import { partNumList, infoAdd } from "@/api/partsrfq/mek/index.js";
import resultMessageMixin from '@/utils/resultMessageMixin.js';

export default {
  mixins: [resultMessageMixin],
  components: {
    iInput, iButton, iDialog, icon, tableList
  },
  props: {
    value: { type: Boolean },
  },
  data() {
    return {
      tableListData: [],
      tableTitle: addPartTableTitle,
      tableLoading: false,
      form: {
        fsNum: '',
        partNum: '',
        rfq: this.$store.state.rfqId || '',
      },
      formGoup: {
        materialGroupList: [],
      },
      fieldList: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async handleAdd() {
      const pms = {

      }
      const res = await infoAdd(pms)
      this.resultMessage(res, () => {
        this.clearDiolog()
      })
    },
    clearDiolog() {
      this.$emit('input', false);
    },
    handleSearchReset() {
      this.form = {
        fsNum: '',
        partNum: '',
        rfq: '',
      }
      this.getTableList()
    },
    async getTableList() {
      try {
        this.tableLoading = true
        const pms = {
          ...this.form,
          categoryCode: this.$route.query.categoryCode || '',
          vwModelCodes: this.$route.query.vwModelCodes && JSON.parse(this.$route.query.vwModelCodes) || []
        }
        const res = await partNumList(pms)
        this.tableListData = res.data
        this.tableLoading = false
      } catch (error) {
        this.tableLoading = false
        this.tableListData = []
      }
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  width: 220px;
}
.title {
  font-size: 18px;
}
</style>
