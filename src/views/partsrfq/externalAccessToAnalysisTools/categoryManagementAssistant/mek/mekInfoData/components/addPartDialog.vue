<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iDialog :title="language('TIANJIALINGJIAN','添加零件')"
           :visible.sync="value"
           width="70%"
           @close="clearDiolog">
    <el-form label-width="60px"
             label-position="top">
      <el-row type="flex"
              align='bottom'
              justify="space-between">
        <el-col :span="4">
          <el-form-item :label="language('LINGJIANHAO','零件号')">
            <iInput :placeholder="$t('LK_QINGXUANZE')"
                    v-model="form.partNum">
            </iInput>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('RSHAO','FS号')">
            <iInput :placeholder="$t('LK_QINGSHURU')"
                    v-model="form.fsNum"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('RFQHAO','RFQ号')">
            <iInput :placeholder="$t('LK_QINGSHURU')"
                    v-model="form.rfq"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="language('XIANGMULEIXING','项目类型')">
            <el-select v-model="form.project"
                       :placeholder="language('QINGXUANZE','请选择')">
              <el-option label="新车型项目"
                         value="1"></el-option>
              <el-option label="批量项目"
                         value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <iButton @click="getTableList">{{$t('LK_QUEREN')}}</iButton>
            <iButton @click="handleSearchReset">{{$t('LK_ZHONGZHI')}}</iButton>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <tableList height="350px"
               class="margin-top20"
               :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :selection='true'
               :index="true"
               @handleSelectionChange="handleSelectionChange">
    </tableList>
    <div slot="footer"
         class="dialog-footer">
      <iButton @click="handleAdd">{{language('TIANJIA','添加')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iInput, iButton, iDialog, icon } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { addPartTableTitle } from "./data.js";
import { getPartMessage, infoAdd } from "@/api/partsrfq/mek/index.js";
import resultMessageMixin from '@/utils/resultMessageMixin.js';

export default {
  mixins: [resultMessageMixin],
  components: {
    iInput, iButton, iDialog, icon, tableList
  },
  props: {
    value: { type: Boolean },
  },
  data () {
    return {
      tableListData: [],
      tableTitle: addPartTableTitle,
      tableLoading: false,
      selectTableData: [],
      form: {
        fsNum: '',
        partNum: '',
        rfq: this.$store.state.rfqId || '',
        project: '1'
      },
      formGoup: {
        materialGroupList: [],
      },
      fieldList: []
    }
  },
  created () {
    this.getTableList()
  },
  methods: {
    handleSelectionChange (val) {
      this.selectTableData = val
    },
    async handleAdd () {
      const pms = {
        list: this.selectTableData,
        mekId: this.$route.query.chemeId
      }
      const res = await infoAdd(pms)
      this.resultMessage(res, () => {
        this.clearDiolog()
        this.$parent.handleAdded()
      })
    },
    clearDiolog () {
      this.$emit('input', false);
    },
    handleSearchReset () {
      this.form = {
        fsNum: '',
        partNum: '',
        rfq: '',
        project: ""
      }
      this.getTableList()
    },
    async getTableList () {
      try {
        this.tableLoading = true
        const pms = {
          ...this.form,
          categoryCode: this.$route.query.categoryCode || '',
          modelIds: this.$route.query.vwModelCodes && JSON.parse(this.$route.query.vwModelCodes) || []
        }
        const res = await getPartMessage(pms)
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
