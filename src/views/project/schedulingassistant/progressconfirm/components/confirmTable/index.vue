<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 10:47:11
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-30 18:06:25
 * @Description: 确认表格-通用
 * @FilePath: \front-web\src\views\project\schedulingassistant\progressconfirm\components\confirmTable\index.vue
-->

<template>
  <iCard :title="language(titleKey, title)" :collapse="collapse">
    <!-- <template slot="header-control"> -->
    <div class="floatright" slot="header-control">
      <!--------------------发送按钮----------------------------------->
      <iButton v-if="!isFS && withSend" @click="handleSend" >{{language('FASONG','发送')}}</iButton>
      <template v-if="isFS">
        <!--------------------转派按钮----------------------------------->
        <transferBtn class="margin-right10" tansferType="2" :tansferData="selectRow" @getTableList="getTableList" ></transferBtn>
        <!--------------------退回按钮----------------------------------->
        <backBtn class="margin-right10" v-if="withAllBtn" backType="2" :backData="selectRow" @getTableList="getTableList" ></backBtn>
        <!--------------------保存按钮----------------------------------->
        <saveBtn v-if="withAllBtn" saveType="2" :saveData="tableData" @getTableList="getTableList" ></saveBtn>
        <!--------------------确认并发送按钮----------------------------------->
        <confirmBtn v-if="withAllBtn" confirmType="2" :confirmData="selectRow" @getTableList="getTableList" ></confirmBtn>
      </template>
    </div>
    <!-- </template> -->
    <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
      <template #scheNomiTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheNomiTimeKw}}</span>
        <el-cascader
          v-else
          class="yearWeekSelect"
          :value="scope.row.scheNomiTimeKw ? scope.row.scheNomiTimeKw.split('-KW') : []"
          :options="yearWeekOptions"
          @change="handleChange($event, scope.row, 'scheNomiTimeKw')"
          separator="-KW"
        ></el-cascader>
      </template>
      <template #scheFirstTryoutTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheFirstTryoutTimeKw}}</span>
        <el-cascader
          v-else
          class="yearWeekSelect"
          :value="scope.row.scheFirstTryoutTimeKw ? scope.row.scheFirstTryoutTimeKw.split('-KW') : []"
          :options="yearWeekOptions"
          @change="handleChange($event, scope.row, 'scheFirstTryoutTimeKw')"
          separator="-KW"
        ></el-cascader>
      </template>
      <template #scheOtsTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheOtsTimeKw}}</span>
        <el-cascader
          v-else
          class="yearWeekSelect"
          :value="scope.row.scheOtsTimeKw ? scope.row.scheOtsTimeKw.split('-KW') : []"
          :options="yearWeekOptions"
          @change="handleChange($event, scope.row, 'scheOtsTimeKw')"
          separator="-KW"
        ></el-cascader>
      </template>
      <template #scheEmTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheEmTimeKw}}</span>
        <el-cascader
          v-else
          class="yearWeekSelect"
          :value="scope.row.scheEmTimeKw ? scope.row.scheEmTimeKw.split('-KW') : []"
          :options="yearWeekOptions"
          @change="handleChange($event, scope.row, 'scheEmTimeKw')"
          separator="-KW"
        ></el-cascader>
      </template>
      <template #scheKickoffTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheKickoffTimeKw}}</span>
        <el-cascader
          v-else
          class="yearWeekSelect"
          :value="scope.row.scheKickoffTimeKw ? scope.row.scheKickoffTimeKw.split('-KW') : []"
          :options="yearWeekOptions"
          @change="handleChange($event, scope.row, 'scheKickoffTimeKw')"
          separator="-KW"
        ></el-cascader>
      </template>
    </tableList> 
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { getPartScheduleList } from '@/api/project'
import moment from 'moment'
import confirmBtn from '../commonBtn/confirmBtn'
import saveBtn from '../commonBtn/saveBtn'
import backBtn from '../commonBtn/backBtn'
import transferBtn from '../commonBtn/transferBtn'
export default {
  mixins: [pageMixins],
  components: { iCard, iButton, tableList, iPagination, confirmBtn, saveBtn, backBtn, transferBtn },
  props: {
    title: {type:String},
    titleKey: {type:String},
    collapse: {type:Boolean,default:false},
    tableTitle: {type:Array,default:() => []},
    tableType: {type:String,default: '1'},
    searchParams: {type:Object,default:() => {}},
    isFS: {type:Boolean,default:false},
    partPeriod: {type:String}
  },
  data() {
    return {
      tableLoading: false,
      selectRow: [],
      withSend: false,
      withAllBtn: false,
      tableData: [],
      yearWeekOptions: []
    }
  },
  created() {
    this.getTableList()
    this.yearWeekOptions = this.initOption()
  },
  computed: {
    /**
     * @Description: 身份标识  1-项目采购员  2-询价采购员
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    identityTag() {
      return !this.isFS ? '1' : '2'
    }
  },
  methods: {
    handleChange(val, item, props) {
      this.$set(item, props, val.join('-KW'))
    },
    initOption() {
      const option = []
      for(var i = moment().year() - 10; i <= moment().year() + 10; i++) {
        const countMonth = moment(i+'-01-01').weeksInYear()
        const children = []
        for(var j = 1; j <= countMonth; j++) {
          children.push({value: j<10?'0'+j:j+'',label: j<10?'0'+j:j+''})
        }
        option.push({value:i+'',label:i+'',children:children})
      }
      return option
    },
    /**
     * @Description: 重置分页器
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    resetPageInfo() {
      this.page.pageSize = 10
      this.page.currPage = 1
    },
    /**
     * @Description: 列表选中
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectRow = val
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*} resetPage 是否重置分页
     * @return {*}
     */    
    getTableList(resetPage = false) {
      if (resetPage) {
        this.resetPageInfo()
      }
      if (this.searchParams.confirmStatus === 'RETURNED') {
        this.withSend = true
      } else {
        this.withSend = false
      }
      if (this.searchParams.confirmStatus === 'TO_BE_CONFIRMED') {
        this.withAllBtn = true
      } else {
        this.withAllBtn = false
      }
      this.getPartScheduleList()
    },
    getPartScheduleList() {
      this.tableLoading = true
      const params = {
        identityTag: this.identityTag,
        partPeriod: this.partPeriod,
        ...this.searchParams,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      getPartScheduleList(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
          this.page.currPage = res.pageNum
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .cardHeader > div {
  display: flex;
}
.yearWeekSelect {
  ::v-deep .el-input__inner {
    padding-right: 15px;
    padding-left: 15px;
  }
  ::v-deep .el-input__suffix {
    display: none;
  }
}
</style>