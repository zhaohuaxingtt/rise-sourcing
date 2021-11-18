<!--
 * @Author: Luoshuang
 * @Date: 2021-08-30 10:47:11
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-17 22:07:30
 * @Description: 确认表格-通用
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\progressconfirm\components\confirmTable\index.vue
-->

<template>
  <iCard :ref="'comFirmCard'+tableType" :title="language(titleKey, title)" :collapse="collapse" @handleCollapse="handleCollapse">
    <!-- <template slot="header-control"> -->
    <div class="floatright" slot="header-control">
      <!--------------------发送按钮----------------------------------->
      <!-- <iButton v-if="!isFS && withSend" @click="handleSend" >{{language('FASONG','发送')}}</iButton> -->
      <sendFSBtn v-if="!isFS && withSend" sendType="2" :sendData="selectRow" @getTableList="getTableList" />
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
    <!-- 表格 -->
    <tableList indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange">
      <template #scheNomiTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheNomiTimeKw}}</span>
        <template v-else>
          <!-- <el-cascader
            class="yearWeekSelect"
            :value="scope.row.scheNomiTimeKw ? scope.row.scheNomiTimeKw.split('-KW') : []"
            :options="yearWeekOptions"
            @change="handleChange($event, scope.row, 'scheNomiTimeKw')"
            separator="-KW"
          ></el-cascader> -->
          <div class="yearWeekSelect" @click="openChangeKw(scope.row, 'scheNomiTimeKw', index)">
            {{scope.row.scheNomiTimeKw}}
            <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon>
          </div>
        </template>
      </template>
      <template #scheFirstTryoutTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheFirstTryoutTimeKw}}</span>
        <template v-else>
          <!-- <el-cascader
            class="yearWeekSelect"
            :value="scope.row.scheFirstTryoutTimeKw ? scope.row.scheFirstTryoutTimeKw.split('-KW') : []"
            :options="yearWeekOptions"
            @change="handleChange($event, scope.row, 'scheFirstTryoutTimeKw')"
            separator="-KW"
          ></el-cascader> -->
          <div class="yearWeekSelect" @click="openChangeKw(scope.row, 'scheFirstTryoutTimeKw', index)">
            {{scope.row.scheFirstTryoutTimeKw}}
            <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon>
          </div>
        </template>
      </template>
      <template #scheOtsTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheOtsTimeKw}}</span>
        <template v-else>
          <!-- <el-cascader
            class="yearWeekSelect"
            :value="scope.row.scheOtsTimeKw ? scope.row.scheOtsTimeKw.split('-KW') : []"
            :options="yearWeekOptions"
            @change="handleChange($event, scope.row, 'scheOtsTimeKw')"
            separator="-KW"
          ></el-cascader> -->
          <div class="yearWeekSelect" @click="openChangeKw(scope.row, 'scheOtsTimeKw', index)">
            {{scope.row.scheOtsTimeKw}}
            <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon>
          </div>
        </template>
      </template>
      <template #scheEmTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheEmTimeKw}}</span>
        <template v-else>
          <!-- <el-cascader
            class="yearWeekSelect"
            :value="scope.row.scheEmTimeKw ? scope.row.scheEmTimeKw.split('-KW') : []"
            :options="yearWeekOptions"
            @change="handleChange($event, scope.row, 'scheEmTimeKw')"
            separator="-KW"
          ></el-cascader> -->
          <div class="yearWeekSelect" @click="openChangeKw(scope.row, 'scheEmTimeKw', index)">
            {{scope.row.scheEmTimeKw}}
            <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon>
          </div>
        </template>
      </template>
      <template #scheKickoffTimeKw="scope">
        <span v-if="!isFS">{{scope.row.scheKickoffTimeKw}}</span>
        <template v-else>
          <!-- <el-cascader
            class="yearWeekSelect"
            :value="scope.row.scheKickoffTimeKw ? scope.row.scheKickoffTimeKw.split('-KW') : []"
            :options="yearWeekOptions"
            @change="handleChange($event, scope.row, 'scheKickoffTimeKw')"
            separator="-KW"
          ></el-cascader> -->
          <div class="yearWeekSelect" @click="openChangeKw(scope.row, 'scheKickoffTimeKw', index)">
            {{scope.row.scheKickoffTimeKw}}
            <icon symbol name="iconxuanzeriqi" class="cascader-icon"></icon>
          </div>
        </template>
      </template>
    </tableList> 
    <!-- 分页 -->
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
    <selectKwDialog :dialogVisible="dialogVisibleSelectKw" @changeVisible="changeSelectKwVisible" :value="selectKw" @handleChange="handleChangeKw" />
  </iCard>
</template>

<script>
import { iCard, iPagination, iMessage, icon } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { getPartScheduleList } from '@/api/project'
import moment from 'moment'
import confirmBtn from '../commonBtn/confirmBtn'
import saveBtn from '../commonBtn/saveBtn'
import backBtn from '../commonBtn/backBtn'
import transferBtn from '../commonBtn/transferBtn'
import sendFSBtn from '../commonBtn/sendFSBtn'
import selectKwDialog from '@/views/project/schedulingassistant/part/components/selectKw'
export default {
  mixins: [pageMixins],
  components: { iCard, tableList, iPagination, confirmBtn, saveBtn, backBtn, transferBtn, sendFSBtn, icon, selectKwDialog },
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
      yearWeekOptions: [],
      collapseValue: true,
      selectKw: '',
      selectKwPro: {},
      dialogVisibleSelectKw: false
    }
  },
  created() {
    this.getTableList()
    // this.yearWeekOptions = this.initOption()
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
    changeSelectKwVisible(visible) {
      this.dialogVisibleSelectKw = visible
    },
    handleChangeKw(val) {
      console.log('val', val)
      const { pro, item, index } = this.selectKwPro
      this.handleChange(val, pro, item, index)
    },
    openChangeKw(pro, item, index) {
      console.log(pro, item, pro[item], index)
      this.selectKw = pro[item]
      this.selectKwPro = {pro, item, index}
      this.changeSelectKwVisible(true)
    },
    handleCollapse(collapseValue) {
      this.collapseValue = collapseValue
    },
    handleChange(val, item, props) {
      this.$set(item, props, val)
    },
    initOption() {
      const option = []
      const childrenTwo = []
      const childrenThree = []
      for(var j = 1; j <= 53; j++) {
          j !== 53 && childrenTwo.push({value: j<10?'0'+j:j+'',label: j<10?'0'+j:j+''})
          childrenThree.push({value: j<10?'0'+j:j+'',label: j<10?'0'+j:j+''})
        }
      for(var i = 1900; i <= moment().year() + 10; i++) {
        const countMonth = moment(i+'-01-01').weeksInYear()
        option.push({value:i+'',label:i+'',children:countMonth === 53 ? childrenThree : childrenTwo})
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
      if (this.searchParams.confirmStatus === '3') {
        this.withSend = true
      } else {
        this.withSend = false
      }
      if (this.searchParams.confirmStatus === '2') {
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
          if (this.tableData.length < 1 && this.collapseValue === true) {
            this.$refs['comFirmCard'+this.tableType].handleCollapse()
          }
          if (this.tableData.length > 0 && this.collapseValue === false) {
            this.$refs['comFirmCard'+this.tableType].handleCollapse()
          }
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
    height: 30px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
    border: 0.0625rem solid #E0E6ED;
    position: relative;
    text-align: left;
    padding: 0 15px;
    display: flex;
    align-items: center;
}
.cascader-icon {
  position: absolute;
  top: 7px;
  right: 5px;
}
</style>