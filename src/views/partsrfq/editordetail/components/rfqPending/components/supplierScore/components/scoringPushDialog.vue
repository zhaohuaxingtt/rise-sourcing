<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <template slot="title">
      <div class="el-dialog__title header">
        <span>{{language('LK_SHEZHIPINGFENBUMEN','设置评分部门')}}</span>
        <iButton class="btn" @click="sendTaskForRating" :loading="saveLoading">{{ language('LK_SHENQING','申请') }}</iButton>
      </div>
    </template>
    <div class="body">
      <tableList class="table" :selection="false" :tableData="tableListData" :tableTitle="tableTitle" :cellClassName="cellClassName" :tableLoading="loading">
        <template #rateTag="scope">
          <iText>{{scope.row.rateTag}}</iText>
        </template>
        <template #rateDepartNum="scope">
          <iText v-if="scope.row.rateTag">{{scope.row.rateDepartNum}}</iText>
        </template>
        <!-- right 评分人 -->
        <template #raterId="scope">
          <iText v-if="scope.row.rateDepartNum">{{scope.row.rater}}</iText>
        </template>
        <!-- left 评分人 -->
        <template #coordinatorId="scope"> 
          <iText v-if="scope.row.rateDepartNum">{{scope.row.coordinator}}</iText>
        </template>
      </tableList>
      <el-divider class="divider"></el-divider>
      <tableList :tableData="tableData" :tableTitle="supplierSubTitle" @handleSelectionChange="handleSelectionChange">
        <template #factoryName="scope">
          <iSelect class="input-center" v-model="scope.row.factoryName" clearable popper-class="supplierProduceNamesDropdown" :loading="supplierProduceNamesLoading" @change="selectChange(scope.row.factoryName,scope.row)" @visible-change="getSupplierPlantBySupplierId(scope.row.id)">
              <el-option
                v-for="item in supplierProduceNames"
                :key="item.id"
                :label="item.factoryName"
                :value="item.factoryName">
                  <el-tooltip class="item" effect="light" :open-delay="200" :content="item.factoryName" placement="right">
                    <div class="item">{{ item.factoryName }}</div>
                  </el-tooltip>
              </el-option>
            </iSelect>
        </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iText, iButton, iMessage } from 'rise'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { scoringDeptTitle as tableTitle, supplierSubTitle } from './data'
import { dictkey } from '@/api/partsprocure/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import { getAllDeptTag, getRfqRateDeparts, getAllRaterAndCoordinator, saveRfqRateDeparts } from "@/api/configscoredept"
import { sendTaskForRating, getSupplierPlantBySupplierId } from "@/api/partsrfq/editordetail";

export default {
  components: { tableList, iDialog, iSelect, iText, iButton },
  mixins: [ pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    ids: {
      type: Array
    },
    customAction: {
      type: Boolean
    },
    tableData:{
      type: Array
    }
  },
  watch: {
    visible(nv) {
      if (nv && this.ids.length && this.$route.query.id) {
        this.getRfqRateDepartsData()
        this.getAllDeptTag()
      } else {
        this.tableListData = []
        this.$emit('update', this.isUpdate)
        this.deptMap = {
          EP: null,
          MQ: null
        }
      }
      this.$emit('update:visible', nv)
    }
  },
  created() {
    if (this.customAction) {
      this.tableTitle = this.tableTitle.filter(title => title.props !== 'coordinatorId')
    } else {
      if (!this.visible) return
      if(!this.$route.query.id) return
      this.getRfqRateDepartsData()
      this.getAllDeptTag()
      this.getDict()
    }
  },
  data() {
    return {
      fromGroup:{},
      supplierSubTitle,
      loading: false,
      tableTitle,
      tableList:[],
      tableListData: [],
      multipleSelection: [],
      selectTableData:[],
      supplierProduceNames: [],
      deptScoringOptions: [],
      supplierProduceNamesLoading: false,
      getSupplierProducePlaceSource: null,
      saveLoading: false,
      isUpdate: false,
      scoreDeptOptions: [],
      deptMap: {
        EP: null,
        MQ: null
      }
    }
  },
  methods: {
    cellClassName(){
      return 'no-hover'
    },
    // 获取工厂名称枚举
    getDict() {
      dictkey().then(res => {
        if (res.code == 200) {
          Object.keys(res.data).forEach(key => {
            this.fromGroup = {
              ...this.fromGroup,
              [key]: Array.isArray(res.data[key]) ? res.data[key] : []
            }
          })

        }
      })
    },
      
    // 获取供应商生产地
    getSupplierPlantBySupplierId(supplierId) {
      if (!supplierId) return

      if (this.getSupplierProducePlaceSource) this.getSupplierProducePlaceSource.cancel()
      this.getSupplierProducePlaceSource = axios.CancelToken.source()

      this.supplierProduceNamesLoading = true
      getSupplierPlantBySupplierId(supplierId)
      .then(res => {
        if (res.code == 200) {
          this.supplierProduceNames = Array.isArray(res.data) ? res.data : []
          this.addressObj = {}
          this.supplierProduceNames.forEach(i=>{
            this.addressObj[i.factoryName] = i.addressInfoVo.province+'-'+i.addressInfoVo.city+'-'+i.addressInfoVo.address
          })
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.supplierProduceNamesLoading = false
      })
      .catch(() => this.supplierProduceNamesLoading = false)
    },
    selectChange(val,row){
      row.companyAddress = this.addressObj[val]
    },
    sendTaskForRating() {
      if (!this.selectTableData.length) return iMessage.warn(this.language('NINHAIWEIXUANZEGONGS','您当前还未选择供应商！'))
      this.pushLoading = true
      sendTaskForRating(this.selectTableData)
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.$store.dispatch('setTodoObj',this.$route.query.id);
          this.$emit('update')
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }

        this.pushLoading = false
      })
      .catch(() => this.pushLoading = false)
    },
    // 获取评分部门类型
    getAllDeptTag() {
      getAllDeptTag()
      .then(res => {
        if (res.code == 200) {
          this.deptScoringOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              ...item,
              key: item.rateTag,
              label: item.rateTag,
              value: item.rateTag
            })) :
            []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    // 获取下拉列表值
    getRfqRateDeparts(rateTag, type) {
      if (this.deptMap[rateTag] && Object.keys(this.deptMap[rateTag]).length) return

      return getRfqRateDeparts({
        rfqIds: type === "all" ? undefined : this.ids,
        rateTag
      })
      .then(res => {
        if (res.code == 200) {
          this.deptMap[rateTag] = {}

          res.data.forEach(dept => {
            this.$set(this.deptMap[rateTag], dept.rateDepartNum, {
              ...dept,
              label: dept.rateDepartNum,
              value: dept.rateDepartNum,
              key: dept.rateDepartNum
            })
          })
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    // 获取评分人和协调人列表
    getAllRaterAndCoordinator(rateTag, rateDepartNum, data={}) {
      if (this.deptMap[rateTag] && this.deptMap[rateTag][rateDepartNum] && (this.deptMap[rateTag][rateDepartNum].raterList || this.deptMap[rateTag][rateDepartNum].coordinatorList)) return

      return getAllRaterAndCoordinator({
        rateTag,
        rateDepartNum
      })
      .then(res => {
        if (res.code == 200) {
          // 评分人
          let raterList = res.data.raterList.map(item => ({
            ...item,
            label: item.nameZh,
            value: item.id,
            key: item.id
          }))
          if(!raterList.map(i=>i.value).includes(data.raterId)){
            raterList.push({
              ...data,
              label: data.rater,
              value: data.raterId,
              key: data.raterId
            })
          }
          // 协调人
          let coordinatorList = res.data.coordinatorList.map(item => ({
            ...item,
            label: item.nameZh,
            value: item.id,
            key: item.id
          }))
          if(!coordinatorList.map(i=>i.value).includes(data.coordinatorId)){
            coordinatorList.push({
              ...data,
              label: data.coordinator,
              value: data.coordinatorId,
              key: data.coordinatorId
            })
          }
          this.$set(this.deptMap[rateTag][rateDepartNum], "raterList", raterList)
          this.$set(this.deptMap[rateTag][rateDepartNum], "coordinatorList", coordinatorList)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    // 获取已保存的评分部门
    getRfqRateDepartsData() {
      this.loading = true

      getRfqRateDeparts({
        rfqIds: this.ids
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []

          if (this.tableListData.length > 0) {
            this.iteratorRecursive(this.tableListData.values())
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.loading = false)
    },
    async iteratorRecursive(iterator) {
      const data = iterator.next().value

      if (data) {
        await this.getRfqRateDeparts(data.rateTag)
        
        if (data.rateTag && data.rateDepartNum) {
          await this.getAllRaterAndCoordinator(data.rateTag, data.rateDepartNum)
        }

        this.iteratorRecursive(iterator)
      }
    },
    handleSelectionChange(val){
      this.selectTableData = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn{
      margin-right: 20px;
    }
  }

  ::v-deep .el-dialog {
    width: 1500px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
      margin-bottom: 20px;
      overflow: auto
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
       @include pdtb(28px, 28px);
    }
  }
  .divider{
    margin: 40px 0;
    background: #aaa;
  }
}
.supplierProduceNamesDropdown {
  .item {
    max-width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
::v-deep .el-table__body{
  tr{
    &:hover>td.no-hover{
      background: none;
    }
  }
}
</style>