<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iDialog :visible.sync="value" width="60%" @close="clearDiolog">
    <div slot="title" class="title">
      {{language('TIANJIALINGJIAN','添加零件')}}
      <el-popover :content="language('CFXGJJZCDDZTLJ','此分析工具仅支持定点状态零件')" trigger="hover" placement="top-start">
        <icon slot="reference" symbol name="iconxinxitishi" class="font-size16 marin-left5" />
      </el-popover>
    </div>
    <el-form label-width="60px" label-position="top">
      <el-row type="flex" align='bottom' justify="space-between">
        <el-col :span="7">
          <el-form-item :label="language('LINGJIANHAO','零件号')">
            <iInput :placeholder="$t('LK_QINGXUANZE')" v-model="form.materialGroupCode">
            </iInput>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="language('RFQHAO','RFQ号')">
            <iInput :disabled='!!$route.query.rfqId' :placeholder="$t('LK_QINGSHURU')" v-model="form.rfqId"></iInput>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <iButton @click="getTableList">{{$t('LK_QUEREN')}}</iButton>
            <iButton @click="handleSearchReset">{{$t('LK_ZHONGZHI')}}</iButton>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='true' :index="true" @handleCurrentChange="handleCurrentChange">
    </tableList>
    <div slot="footer" class="dialog-footer">
      <iButton @click="handleSearchReset">{{language('TIANJIA','添加')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iInput, iButton, iDialog, icon } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { addPartTableTitle } from "./data.js";
import { materialGroupSelectDict } from "@/api/partsrfq/vpAnalysis/vpAnalyseCreate/index.js";
export default {
  components: {
    iInput, iButton, iDialog, icon, tableList
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
      tableTitle: addPartTableTitle,
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
  // created() {
  //   this.getDictByCode()
  // },
  // methods: {
  //   async getDictByCode() {
  //     const res = await materialGroupSelectDict()
  //     this.formGoup.materialGroupList = res.data
  //   },
  //   handleSearchReset() {
  //     this.form = {
  //       materialGroup: '',
  //       rfqId: '',
  //       fsId: '',
  //       partsId: '',
  //       materialGroupCode: ''
  //     }
  //     this.getTableList()
  //   },
  //   getTableList() {
  //     this.form.materialGroupCode && this.formGoup.materialGroupList.forEach((item) => {
  //       if (item.code === this.form.materialGroupCode) {
  //         this.form.materialGroup = item.name
  //         return
  //       }
  //     })
  //     this.$emit('getTableList', this.form)
  //   },
  // }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__content {
  width: 220px;
}
::v-deep .el-col-8 .el-form-item {
  display: flex;
  justify-content: flex-end;
}
.title {
  font-size: 18px;
}
</style>
