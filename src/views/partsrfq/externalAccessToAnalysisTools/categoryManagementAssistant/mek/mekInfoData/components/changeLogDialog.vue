<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: change log
-->
<template>
  <iDialog :title="language('CHANGELOG','Change Log')" :visible.sync="value" width="95%" @close="clearDiolog">
    <el-form label-width="60px" label-position="top">
      <el-row type="flex" align='bottom' justify="space-between">
        <el-col :span="3">
          <el-form-item :label="language('DONGLI','动力')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')+language('DONGLI','动力')" v-model="form.materialGroupCode">
            </iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="language('CHUANDONG','传动')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')+language('CHUANDONG','传动')" v-model="form.rfqId"></iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="language('PETZHI','配置')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')+language('PETZHI','配置')" v-model="form.rfqId"></iSelect>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="language('ZENGSHANLINGJIANHAO','增删零件号')">
            <iInput :placeholder="$t('LK_QINGSHURU')+language('ZENGSHANLINGJIANHAO','曾删零件号')" v-model="form.rfqId"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <iButton @click="getTableList">{{$t('LK_QUEREN')}}</iButton>
            <iButton @click="handleSearchReset">{{$t('LK_ZHONGZHI')}}</iButton>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' :index="true" @handleCurrentChange="handleCurrentChange">
    </tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
    <div slot="footer" class="dialog-footer">
    </div>
  </iDialog>
</template>

<script>
import { iInput, iButton, iDialog, icon, iSelect, iPagination } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { changeLogTableTitle } from "./data.js";
import resultMessageMixin from '@/utils/resultMessageMixin.js';
import { pageMixins } from '@/utils/pageMixins';
import { materialGroupSelectDict } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate/index.js";
export default {
  mixins: [resultMessageMixin, pageMixins],
  components: {
    iInput, iButton, iDialog, icon, tableList, iSelect, iPagination
  },
  props: {
    value: { type: Boolean },
  },
  data() {
    return {
      tableListData: [
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          wire: true,
        },
        {
          rfq: '256',
          isShow: true,
          carInfo: '9999',
          tip: true,
          wire: false
        },
      ],
      tableTitle: changeLogTableTitle,
      tableLoading: false,
      form: {
        materialGroup: '',
        materialGroupCode: '',
        rfqId: '',
        fsId: '',
        partsId: '',
      },
      formGoup: {
        materialGroupList: [],
      },
      fieldList: []
    }
  },
  created() {
    // this.getDictByCode()
  },

  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    async getDictByCode() {
      const res = await materialGroupSelectDict()
      this.formGoup.materialGroupList = res.data
    },
    handleSearchReset() {
      this.form = {
        materialGroup: '',
        rfqId: '',
        fsId: '',
        partsId: '',
        materialGroupCode: ''
      }
      this.getTableList()
    },
    getTableList() {
      this.form.materialGroupCode && this.formGoup.materialGroupList.forEach((item) => {
        if (item.code === this.form.materialGroupCode) {
          this.form.materialGroup = item.name
          return
        }
      })
      this.$emit('getTableList', this.form)
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  width: 220px;
}
::v-deep .el-col-6 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
</style>
