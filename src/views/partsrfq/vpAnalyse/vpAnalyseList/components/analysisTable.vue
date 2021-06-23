<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-22 20:53:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\components\analysisTable.vue
-->
<template>
  <div>
    <el-table
      :data="tableListData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="number"
      default-expand-all
      :tree-props="{children: 'children'}">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="#"
        type='index'
        :index="indexMethod"
        align="center"
        header-align="center"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="分析名称">
        <template slot-scope="scope">
          <div class="openPage">
            <span v-if="!editMode">
              <span v-if="scope.row.type == '方案'">{{scope.row.analysisSchemeName}}</span>
              <span v-if="scope.row.type == '报告'">{{scope.row.reportName}}</span>
            </span>
            <span v-else>
              <iInput v-if="scope.row.type == '方案'" v-model="scope.row.analysisSchemeName"></iInput>
              <iInput v-if="scope.row.type == '报告'" v-model="scope.row.reportName"></iInput>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="materialGroup"
        align="center"
        header-align="center"
        label="材料组">
      </el-table-column>
      <el-table-column
        prop="rfqId"
        align="center"
        header-align="center"
        label="RFQ">
      </el-table-column>
      <el-table-column
        prop="isDefault"
        align="center"
        header-align="center"
        label="默认项">
        <template slot-scope="scope">
          <div v-if="!editMode">
            {{scope.row.isDefault != 1 ? scope.row.isDefaul == 0 ? '否' : null : '是'}}
          </div>
          <div v-else-if="editMode && scope.row.type == '方案' && scope.row.isDefault != null">
            <iSelect v-model="scope.row.isDefault">
              <el-option :value="item.value" :label="item.label" v-for="(item, index) in defaultData" :key="index"></el-option>
            </iSelect>
          </div>
          
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        header-align="center"
        label="文件类型">
      </el-table-column>
      <el-table-column
        prop="createByName"
        align="center"
        header-align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="updateDate"
        align="center"
        header-align="center"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="listTimeEditDate"
        align="center"
        header-align="center"
        label="上次修改日期">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        width="50">
        <template slot-scope="scope">
          <div class="stickIcon" v-if="scope.row.type == '方案'" @click="clickStick(scope.row)">
            <icon v-if="scope.row.isTop && scope.row.isTop == 1" style="{font-size:24px}" symbol name="iconliebiaoyizhiding"></icon>
            <icon v-else style="{font-size:24px}" symbol name="iconliebiaoweizhiding" @click="clickStick(scope.row)" ></icon>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表 -->
    <!-- <tableList
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="false"
      :index="true"
      :treeTable="true"
      treeProps="vpReportVOList"
      @handleSelectionChange="handleSelectionChange"
      >
      <template #name="scope">
        <span v-if="scope.row.type == '方案'">{{scope.row.analysisSchemeName}}</span>
        <span v-if="scope.row.type == '报告'">{{scope.row.reportName}}</span>
      </template>
      <template #isDefault="scope">
        {{scope.isDefault == 1 ? '是' : '否'}}
      </template>
      <template #action="scope">
        <icon v-if="scope.row.isTop" style="{font-size:24px}" symbol name="iconliebiaoyizhiding"  @click="clickStick(scope.row)"></icon>
        <icon v-else style="{font-size:24px}" symbol name="iconliebiaoweizhiding" @click="clickStick(scope.row)" ></icon>
      </template>
    </tableList> -->
    <!-- 分页 -->
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
</template>

<script>
import {icon, iPagination, iInput, iSelect} from 'rise'
import {pageMixins} from '@/utils/pageMixins';
import {tableTitle} from './data'
import {iMessage} from '@/components';
import tableList from '@/components/ws3/commonTable';
import {getVpAnalysisDataList, fetchStaick, fetchEdit, fetchDel} from '@/api/partsrfq/vpAnalysisList'
export default {
  name: 'analysisTable',
  mixins: [pageMixins],
  components: {icon, iPagination, iInput, iSelect, tableList},
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableTitle,
      tableListData: [],
      tableLoading: false,
      defaultData: [
        {value: 1, label: '是'},
        {value: 0, label: '否'},
      ],
      selectionData: [],
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    //初始化测试数据（静态数据）
    initTestTableData() {
      this.tableListData = [
        {id: 0, name: 'test1', materials: '编号-名称', rfq: 'RFQ号-名称', default: 0, fileType: 0, stick: true, children: [
          {id: 1, name: 'test1.1', fileType: 1,},
          {id: 2, name: 'test1.2', fileType: 1,},
        ]},
        {id: 3, name: 'test2', materials: '编号-名称', rfq: 'RFQ号-名称', default: 1, fileType: 0,stick: false},
      ]
      this.handleTableNumber(this.tableListData, 1, null)
    },
    // 初始化列表数据
    getTableData() {
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      }
      getVpAnalysisDataList(params).then(res => {
        if(res && res.code == 200) {
          this.page.total = res.total
          this.tableListData = res.data
          this.handleTableNumber(this.tableListData, 1, null)
        }
      })
    },
    //递归处理树结构数据的序号
    handleTableNumber(data, suffix, prefix) {
     data.forEach((item) => {
        const number = prefix ? (prefix + '.' + suffix) : suffix
        item['number'] = number
        if(item.vpReportVOList && item.vpReportVOList.length > 0) {
          item['children'] = item.vpReportVOList
          this.handleTableNumber(item.vpReportVOList, 1, number)
        }
        suffix++
      })
    },
    // 获取下标
		indexMethod(e){
			const rows = []
			this.tableListData.forEach((r)=>{
				rows.push(r.number)
				if(r.vpReportVOList&&r.vpReportVOList!==null){
					r.vpReportVOList.forEach((c)=>{
						rows.push(c.number)
					})
				}
			})
			return rows[e]
		},
    // 选中项数据发生改变
    handleSelectionChange(selection) {
      this.selectionData = selection
    },
    //点击置顶事件
    clickStick(row) {
      const params = {
        id: row.id
      }
      console.log('params', params);
      fetchStaick(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        }
      })
    },
    //点击提交保存编辑事件
    clickSaveEdit() {
      const params = {
        vpEditDTOList: this.tableListData
      }
      fetchEdit(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        }
      })
    },
    //点击提交删除选中数据
    clickSaveDel() {
      const ids = []
      const reportIds = []
      this.selectionData.map(item => {
        if(item.type == '方案') ids.push(item.id)
        else reportIds.push(item.id)
      })
      const params = {
        ids: ids,
        reportIds: reportIds
      }
      fetchDel(params).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.openPage{
	color: $color-blue;
	font-size: 14px;
	text-decoration: underline;
	cursor: pointer;
	width: 100px;
	@include text_;
}
.stickIcon:hover {
  cursor: pointer;
}
 
</style>
