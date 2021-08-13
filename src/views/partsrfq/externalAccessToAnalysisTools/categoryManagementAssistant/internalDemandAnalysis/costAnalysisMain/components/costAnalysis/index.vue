<!--
 * @Author: youyuan
 * @Date: 2021-08-02 16:38:55
 * @LastEditTime: 2021-08-13 15:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\components\costAnalysisMain\components\costAnalysis\index.vue
-->
<template>
  <div>
    <iCard>
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language('CHENGBENJIEGOUFENXIKU', '成本结构分析库') }}</p>
        <span class="buttonBox">
          <iButton @click="clickBack">{{ language('FANHUI', '返回') }}</iButton>
        </span>
      </div>
      <div class="searchBox">
        <el-form :inline="true" :model="searchForm" :label-position="labelPosition" class="demo-form-inline">
          <el-form-item style="marginRight: 53px;" :label="language('CHAILIAOZU', '材料组')">
            <iSelect v-model="searchForm['categoryCode']" :placeholder="language('QINGXUANZECHAILIAOZU', '请选择材料组')">
               <el-option value='' label='全部'></el-option>
               <el-option v-for="(item, index) in materialGroupList" :key="index" :value='item.categoryCode' :label='item.categoryName'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="marginRight: 53px;" :label="language('WENJIANLEIXING', '文件类型')">
            <iSelect v-model="searchForm['fileType']" :placeholder="language('QINGXUANZEWENJIANLEIXING', '请选择文件类型')">
               <el-option value='' label='全部'></el-option>
               <el-option v-for="(item, index) in fileTypeList" :key="index" :value='item.val' :label='item.label'></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item style="marginRight: 53px;" :label="language('CHUANGJIANREN', '创建人')">
            <iInput v-model="searchForm['createBy']" :placeholder="language('QINGSHURUCHUANGJIANRENMINGCHENG', '请输入创建人名称')"></iInput>
          </el-form-item>
          <el-form-item class="searchButton">
            <el-button @click="handleSubmitSearch">{{language('QUEREN', '确认')}}</el-button>
            <el-button @click="handleSearchReset">{{language('CHONGZHI', '重置')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="mainContent">
        <div class="tableOptionBox">
          <p class="tableTitle">分析库列表</p>
          <iButton v-if="!editMode" @click="clickDel">{{language('SHANCHU', '删除')}}</iButton>
          <iButton v-if="!editMode" @click="clickAdd">{{language('XINZENG', '新增')}}</iButton>
          <iButton v-if="!editMode" @click="clickEdit">{{language('BIANJI', '编辑')}}</iButton>
          <iButton v-if="editMode" @click="clickSave">{{language('BAOCUN', '保存')}}</iButton>
          <iButton v-if="editMode" @click="clickEdit">{{language('QUXIAO', '取消')}}</iButton>
        </div>
        <tableList
          ref="multipleTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :index="true"
          @handleSelectionChange="handleSelectionChange">
          <template #schemeName="scope">
            <div>
              <div v-if="!editMode" class="openPage" @click="handleClickAnalysis(scope.row)">
                {{scope.row.schemeName}}
              </div>
              <div v-if="editMode">
                <iInput class="nameInput" v-model="scope.row.schemeName"></iInput>
              </div>
            </div>
          </template>
          <template #option="scope">
            <div class="openPage" @click="clickPreview(scope.row)">
              预览
            </div>
          </template>
          <template #sort="scope">
            <div class="stickIcon" @click="clickStick(scope.row)">
              <icon v-if="scope.row.isTop"
                    style="{font-size:24px}"
                    symbol
                    name="iconliebiaoyizhiding"></icon>
              <icon v-else
                    style="{font-size:24px}"
                    symbol
                    name="iconliebiaoweizhiding"></icon>
            </div>
          </template>
        </tableList>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableData)"
          @current-change="handleCurrentChange($event, getTableData)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"/>
      </div>
    </iCard>
    <!-- 手工输入弹窗 -->
    <handleInput
    :key="modalParam.key"
    :data="operateLog"
    v-model="modalParam.visible"
    @handleCloseDialog="handleCancel"
    @handleSubmitDialog="handleSubmitDialog"
    />
    <!-- 预览报告 -->
    <reportPreview :key="reportParams.key"
                :visible="reportParams.visible"
                :reportUrl="reportParams.url"
                :title="reportParams.title"
                @handleCloseReport="handleCloseReport" />
  </div>
</template>

<script>
import {iCard, iButton, iInput, iSelect, iPagination, icon, iMessageBox} from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import {pageMixins} from '@/utils/pageMixins';
import { iMessage } from '@/components';
import handleInput from '../costAnalysisAdd/components/handleInput'
import reportPreview from '@/views/partsrfq/vpAnalyse/vpAnalyseList/components/reportPreview.vue'
import { getAnalysisList, getMaterialGroupByUserIds, fetchModify, fetchStick, fetchDel } from '@/api/partsrfq/costAnalysis/index'
export default {
  name: 'CostAnalysis',
  mixins: [pageMixins],
  components: {iCard, iButton, iInput, iSelect, iPagination, icon, iMessageBox, tableList, handleInput, reportPreview},
  data () {
    return {
      costAnalysisMainUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain',
      costAnalysisAddUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisAdd',
      costAnalysisInputUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisHandleInput',
      editMode: false,
      searchForm: {},
      labelPosition: 'top',
      tableTitle,
      tableListData: [],
      loading: true,
      materialGroupList: [],
      fileTypeList: [
        {label: '系统筛选', val: 1},
        {label: '人工输入', val: 2},
      ],
      backUpData: [],
      modalParam: {
        key: 0,
        visible: false
      },
      schemeId: null,
      operateLog: null,
      selection: [],
      reportParams: {
        key: null,
        url: null,
        title: null,
        visible: null
      }
    }
  },
  created() {
    // this.initTestData()
    this.getTableData()
    this.getMaterialGroupData()
  },
  methods: {
    // 初始化测试数据
    initTestData() {
      this.tableListData = [
        {id: 1, analysis: '材料组编号-名称-YYYY/MM/DD', materialGroup: '编号-名称', createBy: 'Name', createDate: 'YYYY-MM-DD', option: '预览', lastUpdateDate: 'YYYY-MM-DD', isTop: true},
        {id: 2, analysis: '材料组编号-名称-YYYY/MM/DD', materialGroup: '编号-名称', createBy: 'Name', createDate: 'YYYY-MM-DD', option: '预览', lastUpdateDate: 'YYYY-MM-DD', isTop: false},
        {id: 3, analysis: '材料组编号-名称-YYYY/MM/DD', materialGroup: '编号-名称', createBy: 'Name', createDate: 'YYYY-MM-DD', option: '预览', lastUpdateDate: 'YYYY-MM-DD', isTop: false},
      ]
      this.loading = false
    },
    // 获取材料组数据
    getMaterialGroupData() {
      getMaterialGroupByUserIds({}).then(res => {
        if(res && res.code == 200) {
          this.materialGroupList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取表格数据
    getTableData() {
      return new Promise(resolve => {
        this.loading = true
        const params = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          categoryCode: this.searchForm.categoryCode,
          createByName: this.searchForm.createBy,
          fileType: this.searchForm.fileType
        }
        getAnalysisList(params).then(res => {
          if(res && res.code == 200) {
            this.page.totalCount = res.total
            this.loading = false
            this.tableListData = res.data
            resolve(res.data)
          } else iMessage.error(res.desZh)
        })
      })
    },
    // 初始化检索条件数据
    initSearchData() {
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
    },
    // 点击确认
    handleSubmitSearch() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData().then(res => {
        if (!res || res.length == 0) {
          iMessage.error(this.$t('TPZS.BQWFCXDJGSRCWHBCZQQRHCXSR'));
        }
      })
    },
    // 点击重置
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.initSearchData()
      this.getTableData()
    },
    // 点击置顶
    clickStick(val) {
      const params = {
        id: val.id,
        isTop: !val.isTop
      }
      fetchStick(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.page.currPage = 1
          this.page.pageSize = 10
          this.getTableData()
        } else iMessage.error(res.desZh)
      })
    },
    // 点击返回
    clickBack() {
      // this.$router.push(this.costAnalysisMainUrl)
      this.$router.go(-1)
    },
    // 点击新增
    clickAdd() {
      this.$router.push(this.costAnalysisAddUrl)
    },
    // 点击编辑
    clickEdit() {
      if(!this.editMode) 
        this.backUpData = window._.cloneDeep(this.tableListData)
      else 
        this.tableListData = window._.cloneDeep(this.backUpData)
      this.editMode = !this.editMode
    },
    // 点击删除
    clickDel() {
      if(this.selection && this.selection.length == 0) {
        iMessage.error(this.language('QINGXUANZEYAOSHANCHUDESHUJU', '请选择要删除的数据'))
        return 
      }
      const params = {
        idList: this.selection.map(item => item.id)
      }
      fetchDel(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        }
        else iMessage.error(res.desZh)
      })
    },
    // 点击保存
    clickSave() {
      const params = {
        modifyList: this.tableListData
      }
      fetchModify(params).then(res => {
        if(res && res.code == 200) {
          this.editMode = false
          this.getTableData()
          if(res.data && res.data.length > 0) {
            let msg = "数据名称发生重复，系统将<br/>"
            res.data.map(item => {
              msg += "原数据："+ item.oldName + "   自动变更为：" + item.newName + "<br/>"
            })
            this.$message({
              dangerouslyUseHTMLString: true,
              message: msg,
              duration: 5000
            })
          }
          else iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 点击方案名称
    handleClickAnalysis(val) {
      if(val.fileType == '1') {
        // 跳转系统
        this.$router.push({
          path: this.costAnalysisAddUrl,
          query: {
            schemeId: val
          }
        })
      } else {
        // 打开手工
        this.operateLog = val.operateLog
        this.schemeId = val.id
        this.modalParam = {
          ...this.modalParam,
          key: Math.random(),
          visible: true
        }
      }
    },
    // 点击预览
    clickPreview(val) {
      if(val && val.reportUrl) {
        this.reportParams = {
          ...this.reportParams,
          key: Math.random,
          url: val.reportUrl,
          title: val.schemeName,
          visible: true
        }
      } else {
        iMessage.error(this.language('CIFANGANMEIYOUBAOGAO', '此方案没有生成报告'))
      }
    },
    //点击关闭报告预览弹窗
    handleCloseReport () {
      this.reportParams.visible = false
    },
    // 取消手工输入弹窗
    handleCancel() {
      this.$set(this.modalParam, 'visible', false)
    },
    // 点击提交手工输入弹窗数据
    handleSubmitDialog(data) {
      this.$router.push({
        path: this.costAnalysisInputUrl,
        query: {
          schemeId: this.schemeId,
          operateLog: JSON.stringify(data)
        }
      })
    },
    // 选中数据发生改变
    handleSelectionChange(val) {
      this.selection = val
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-table .el-table__row .el-input .el-input__inner {
  text-align: center !important;
}

.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.searchBox {
  .searchButton {
    margin-top: 50px;
    float: right;
    z-index: 100;
    button {
      width: 100px;
      height: 35px;
      border: none;
      background-color: #EEF2FB;
      font-weight: bold;
      color: #1660F1;
      font-size: 16px;
      margin-right: -8px;
      margin-left: 30px;
    }
  }
}
.mainContent {
  margin-top: 48px;
  padding-bottom: 30px;
  .tableOptionBox {
    .tableTitle {
      display: inline;
      font-weight: bold;
      font-size: 16px;
      color: #000;
    }
    button {
      float: right;
      z-index: 100;
      margin-left: 30px;
      margin-bottom: 20px;
    }
  }
  .stickIcon:hover {
    cursor: pointer;
  }
  ::v-deep .openPage{
    position: relative;
    color: $color-blue;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
