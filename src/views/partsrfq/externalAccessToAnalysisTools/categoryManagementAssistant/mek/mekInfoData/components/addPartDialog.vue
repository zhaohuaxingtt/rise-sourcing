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
             label-position="top"
             model="form">
      <el-row type="flex"
              align='bottom'
              justify="space-between">
        <el-col :span="6">
          <el-form-item :label="language('CAILIAOZU','材料组')"
                        prop="project">
            <iSelect v-model="form.categoryCodes"
                     clearable
                     filterable
                     multiple
                     collapse-tags
                     :multiple-limit="5"
                     style="width:260px"
                     popper-append-to-body
                     :placeholder="language('QINGXUANZE','请选择')">
              <el-option v-for="item in categoryList"
                         :key="item.categoryId"
                         :label="item.categoryCode+'-'+item.categoryName"
                         :value="item.categoryCode"></el-option>
            </iSelect>
          </el-form-item>
        </el-col>
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

      </el-row>
      <el-row type="flex"
              justify="space-between	">
        <el-col :span="4">
          <el-checkbox v-model="form.isFromAeko">{{language('LINGJIANAEKODINGDIAN','零件/Aeko定点')}}</el-checkbox>
          <!-- <el-form-item :label="language('LINGJIANAEKODINGDIAN','零件/Aeko定点')">
            <el-select v-model="form.isFromAeko"
                       :placeholder="language('QINGXUANZE','请选择')">
              <el-option label="是"
                         value="true"></el-option>
              <el-option label="否"
                         value="false"></el-option>
            </el-select>
          </el-form-item> -->
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
      <template #isFromAeko="scope">
        <div> {{scope.row.isFromAeko?'是':"否"}}</div>
      </template>
    </tableList>
    <div slot="footer"
         class="dialog-footer">
      <iButton @click="handleAdd">{{language('TIANJIA','添加')}}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iInput, iButton, iDialog, iMessage, iSelect } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { addPartTableTitle } from "./data.js";
import { getPartMessage, infoAdd, categoryList } from "@/api/partsrfq/mek/index.js";
import resultMessageMixin from '@/utils/resultMessageMixin.js';

export default {
  mixins: [resultMessageMixin],
  components: {
    iInput, iButton, iDialog, tableList, iSelect
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
        categoryCodes: '',
        isFromAeko: true,
        project: '1'
      },
      formGoup: {
        materialGroupList: [],
      },
      fieldList: [],
      categoryList: []
    }
  },
  created () {
    // this.getTableList()
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      categoryList({}).then(res => {
        if (res?.code === '200') {
          this.categoryList = res.data
          this.categoryList = this.categoryList.filter(item => item.categoryCode !== this.$route.query.categoryCode)
        }
      })
    },
    handleSelectionChange (val) {
      this.selectTableData = val
    },
    async handleAdd () {
      const pms = {
        list: this.selectTableData,
        mekId: this.$route.query.schemeId,
        project: this.form.project
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
      if (this.form.categoryCodes.length === 0) {
        iMessage.error(this.$t('QINGXUANZECHAILIAOZU'))
        return
      }
      let vwModelCodes = JSON.parse(this.$route.query.vwModelCodes)
      try {
        this.tableLoading = true
        if (this.form.project === '1') {
          let targetMotorId = vwModelCodes.shift()
          let motorIds = vwModelCodes
          const pms = {
            ...this.form,
            // categoryCode: this.$route.query.categoryCode || '',
            motorIds: motorIds || [],
            isNominated: this.form.isFromAeko,
            targetMotorId: targetMotorId,
            isBindingRfq: this.$route.query.isBindingRfq,
            schemeId: this.$route.query.schemeId
          }
          delete pms.isFromAeko
          const res = await getPartMessage(pms)
          if (res.code === '200') {
            this.tableListData = res.data
          } else {
            iMessage.error(res.desZh)
          }
        } else {
          let targetMotorId = vwModelCodes.shift()
          let motorIds = vwModelCodes
          const pms = {
            ...this.form,
            categoryCode: this.$route.query.categoryCode || '',
            motorIds: motorIds || [],
            targetMotorId: targetMotorId,
            isBindingRfq: this.$route.query.isBindingRfq,
            schemeId: this.$route.query.schemeId
          }
          delete pms.isFromAeko
          const res = await getPartMessage(pms)
          if (res.code === '200') {
            this.tableListData = res.data
          } else {
            iMessage.error(res.desZh)
          }
        }
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
