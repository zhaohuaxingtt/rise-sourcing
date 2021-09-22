<!--
 * @Author: your name
 * @Date: 2021-07-23 16:47:14
 * @LastEditTime: 2021-08-11 10:00:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\components\add.vue
-->
<template>
  <div>
    <div class="topBox">
      <iButton @click="handleCloseAdd">{{language('FH', '返回')}}</iButton>
    </div>
    <div class="optionBox">
      <el-form :inline="true" :model="searchForm" :label-position="labelPosition" class="demo-form-inline">
        <el-form-item style="marginRight:68px" :label="item.key ? language(item.key, item.name) : item.name" v-for="(item,index) in searchData" :key="index">
          <iInput v-model="searchForm[item.props]" ></iInput>
        </el-form-item>
        <el-form-item class="searchButton">
          <el-button @click="handleSubmitSearch">{{language('QR', '确认')}}</el-button>
          <el-button @click="handleSearchReset">{{language('CZ', '重置')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider style="marginTop: 20px;"></el-divider>
    <div class="contentBox" >
      <div class="tableOptionBox">
        <p class="tableTitle">搜索结果</p>
        <iButton @click="handleSubmitAdd">{{language('TJ', '添加')}}</iButton>
      </div>
      <tableList
        ref="addTable"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="false"
        :index="true"
        @select="rowSelect">
        <template #isNominate="scope">
          {{scope.row.isNominate ? language('YDD', '已定点') : language('WDD', '未定点') }}
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
  </div>
</template>

<script>
import {iButton, iInput, iPagination} from 'rise'
import {search, addTableTitle} from './data'
import tableList from '@/components/ws3/commonTable';
import {pageMixins} from '@/utils/pageMixins';
import {getAllPartList} from '@/api/partsrfq/vpAnalysis/vpCustomPart'
export default {
  name: 'CustomPartAdd',
  mixins: [pageMixins],
  components: {
    iButton,
    iInput,
    iPagination,
    tableList,
  },
  props: {
    defaultList: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      searchData: search,
      searchForm: {},
      labelPosition: 'top',
      tableTitle: addTableTitle,
      tableListData: [],
      selectionList: window._.cloneDeep(this.defaultList)
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 初始化查询数据
    initSearchData() {
      this.searchForm = {}
    },
    // 初始化表格数据
    getTableData() {
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        categoryCode: this.searchForm.categoryCode,
        rfqId: this.searchForm.rfqId,
        fsId: this.searchForm.fsId,
        partId: this.searchForm.partId
      }
      getAllPartList(params).then(res => {
        if(res && res.code == 200) {
            this.page.totalCount = res.total
            this.tableListData = res.data
            this.initDefaultSelection()
          }
      })
    },
    // 初始化默认选中
    initDefaultSelection() {
      this.$nextTick(() => {
        this.tableListData.forEach(item => {
          const obj = this.defaultList.find(defaultItem => defaultItem.supplierId == item.supplierId && defaultItem.partsId == item.partsId)
          if(obj) this.$refs.addTable.$refs.dataTable.toggleRowSelection(item, true)
        })
      })
    },
    // 取消新增零件
    handleCloseAdd() {
      this.$emit('handleCloseAdd')
    },
    //点击确认按钮
    handleSubmitSearch() {
      this.getTableData()
    },
    //点击重置按钮
    handleSearchReset() {
      this.initSearchData()
      this.getTableData()
    },
    //点击添加按钮
    handleSubmitAdd() {
      this.$emit('handleSubmitAdd', this.selectionList)
    },
    //选中表格数据事件
    rowSelect(selection, row) {
      let selected = selection.length && selection.indexOf(row) !== -1
      if(selected) {
        let maxSortObj = window._.maxBy(this.selectionList, function(o) { return o.sort; });
        if(!maxSortObj) {
          maxSortObj = {
            sort: 0
          }
        }
        row['sort'] = maxSortObj.sort + 1
        row['isShow'] = true
        this.selectionList.push(row)
      } else {
        window._.remove(this.selectionList, item => item.supplierId == row.supplierId && item.partsId == row.partsId)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.topBox{
  text-align: right;
  position: absolute;
  right: 65px;
  top: 24px;
}
.optionBox {
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
    }
  }
}
.contentBox {
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
      margin-bottom: 20px;
    }
  }
}

</style>
