<!--
 * @author: shujie
 * @createTime: 2021-6-16 4:08:35 
 * @Description:谈判助手-报告清单首页
 -->
<template>
  <iPage>
    <div class="flex-between-center">
      <!-- 报告清单 -->
      <span class="pageTitle">{{$t('TPZS.BGQD')}}</span>
      <div>
        <!-- 导出 -->
        <iButton @click="openExport" v-permission="WORKBENCH_RFQ_TPZS_BGQD_DAOCHU">{{$t('LK_DAOCHU')}}{{tableListData.length==0?'':'+'+tableListData.length}}</iButton>
        <!-- 返回 -->
        <iButton @click="back">{{$t('LK_FANHUI')}}</iButton>
      </div>
    </div>
    <iSearch class="margin-top20"
             @sure="sure"
             @reset="reset"
             icon="false">
      <el-form>
        <el-form-item :label="item.key?$t(item.key):item.name"
                      v-for="(item,index) in search"
                      :key="index">
          <iSelect v-if="item.type=='select'"
                   v-model="searchCriteria[item.props]">
            <el-option :value="item.code"
                       :label="item.name"
                       v-for="item in fromGroup[item.select]"
                       :key="item.code"></el-option>
          </iSelect>
          <iMultiLineInput v-else-if="item.type === 'multiLineInput'" v-model="searchCriteria[item.props]" :title="item.key?$t(item.key):item.name" />
          <iInput v-else
                  :placeholder="$t(item.placeholder)"
                  v-model="searchCriteria[item.props]"
                  :disabled="item.props=='rfq' && inside"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <!-- 专项分析工具 -->
    <specialTools @joinTable='joinTable'
                  @delTable='delTable'
                  :searchCriteria="searchCriteria"
                  ref="specialTools"></specialTools>
    <!------------------------------------内部进入------------------------------------>
    <el-row v-if="inside">
      <el-col :span="12">
        <!-- 报价分析 -->
        <quotationAnalysis ref="tableQ"
                           @joinTable='joinTable'
                           @delTable='delTable'
                           :searchCriteria="searchCriteria"
                           class="margin-right20"></quotationAnalysis>
      </el-col>
      <el-col :span="12">
        <!-- 谈判基本信息 -->
        <negotiationBasic ref="tableN"
                          @joinTable='joinTable'
                          @delTable='delTable'
                          :searchCriteria="searchCriteria"
                          class="margin-left20"></negotiationBasic>
      </el-col>
    </el-row>
    <!-- 导出弹窗 -->
    <exportReport :key="Math.random()"
                  ref="exportFile"
                  v-model="visible"
                  :tableListData="tableListData"></exportReport>
  </iPage>
</template>

<script>
import { iPage, iSelect, iInput, iButton, iSearch, iMessage, iMultiLineInput } from 'rise'
import { search } from './components/data'
import { selectDictByKeys } from '@/api/dictionary'
import specialTools from './components/specialTools'
import quotationAnalysis from './components/quotationAnalysis'
import negotiationBasic from './components/negotiationBasic'
import exportReport from './components/exportReport'
import store from '@/store'
import {
  reportUserDownload,
  reportDelete,
  reportDownList,
} from '@/api/partsrfq/reportList'
export default {
  components: {
    iPage,
    iSelect,
    iInput,
    iButton,
    iSearch,
    specialTools,
    quotationAnalysis,
    negotiationBasic,
    exportReport,
    iMultiLineInput
  },
  data() {
    return {
      search,
      fromGroup: {}, //下拉框数据
      visible: false,
      searchCriteria: {
        toolType: '',
        materialGroup: '',
        partsNo: '',
        rfq: '',
      },
      tableListData: [],
      selectAllData: [], //所有选择的数据
      inside: true, //是否内部进入
    }
  },
  created() {
    this.searchCriteria.rfq = this.$store.state.rfq.rfqId
    // this.searchCriteria.rfq = '1139'
    this.inside = this.$store.state.rfq.entryStatus === 1 ? true : false
    this.getAllSelect()
    this.getDownTable()
  },
  methods: {
    joinTable(row) {
      reportUserDownload(row).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getDownTable()
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    delTable(row, key) {
      reportDelete(row).then((res) => {
        if (res && res.code == 200) {
          switch (key) {
            case 1:
              this.$refs.specialTools.getTableList()
              break
            case 2:
              this.$refs.tableQ.getTableList()
              break
            case 3:
              this.$refs.tableN.getTableList()
              break
            default:
              break
          }
          iMessage.success(res.desZh)
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getDownTable() {
      reportDownList().then((res) => {
        if (res && res.code == 200) {
          this.tableListData = res.data
        }
      })
    },
    // 字段查询下拉框
    getAllSelect() {
      let data = [{ keys: 'REPORT_TOOL_TYPE' }]
      selectDictByKeys(data).then((res) => {
        if (res.data) {
          this.fromGroup = res.data
        }
      })
    },
    // 打开导出弹窗
    openExport() {
      //   this.selectAllData = this.$refs.specialTools.selectData
      //   console.log(this.selectAllData.length)
      //   if (this.selectAllData.length == 0) {
      //     iMessage.error(this.$t('TPZS.CANNOTSELECT'))
      //   } else if (this.selectAllData.length > 10) {
      //     iMessage.error(this.$t('TPZS.ZDDCBG'))
      //   } else {
      this.visible = true
      //   }
    },
    //搜索
    sure() {
      this.$refs.specialTools.search()
    },
    // 重置
    reset() {
      this.searchCriteria = {}
      this.$nextTick(() => {
        this.$refs.specialTools.search()
      })
    },
    // 返回
    back() {
      this.$router.back(-1)
    },
  },
}
</script>

<style lang="scss">
.pageTitle {
  font-size: 20px;
  color: $color-black;
  font-weight: bold;
}
.openPage {
  color: $color-blue;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  width: 100px;
  @include text_;
}
</style>
