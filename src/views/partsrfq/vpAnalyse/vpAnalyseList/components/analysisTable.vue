<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-07-12 14:39:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\components\analysisTable.vue
-->
<template>
  <div class="vpMainBox">
    <el-table
      :data="tableListData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="number"
      :max-height="450"
      :tree-props="{children: 'children'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40">
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
        prop="analysisSchemeName"
        align="center"
        header-align="center"
        label="分析名称"
        width="250">
        <template slot-scope="scope">
          <div class="openPage">
            <el-row :gutter="20">
              <el-col :span="18">
                <span v-if="!editMode" style="textAlgin: center">
                  <span v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')" @click="clickScheme(scope.row)">{{scope.row.analysisSchemeName}}</span>
                  <span v-if="scope.row.type == $t('TPZS.REPORT_TYPE')" @click="clickReport(scope.row)">{{scope.row.reportName}}</span>
                </span>
                <span v-else>
                  <iInput class="nameInput" v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')" v-model="scope.row.analysisSchemeName"></iInput>
                  <iInput class="nameInput" v-if="scope.row.type == $t('TPZS.REPORT_TYPE')" v-model="scope.row.reportName"></iInput>
                </span>
              </el-col>
              <el-col :span="6">
                <span v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')">
                  <span class="number">
                    <p>{{scope.row.reportCount}}</p>
                  </span>
                  <icon class="numberIcon"  style="{font-size:24px}" symbol name="iconwenjianshuliangbeijing"></icon>
                </span>
              </el-col>
            </el-row>
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
            {{scope.row.isDefault === '是' || scope.row.isDefault === '否' ? scope.row.isDefault : null}}
          </div>
          <div v-else-if="editMode && scope.row.type == $t('TPZS.SCHEME_TYPE') && scope.row.isDefault != '空' && scope.row.isDefault" >
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
        prop="createDate"
        align="center"
        header-align="center"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="updateDate"
        align="center"
        header-align="center"
        label="上次修改日期">
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        width="50">
        <template slot-scope="scope">
          <div class="stickIcon" v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')" @click="clickStick(scope.row)">
            <icon v-if="scope.row.isTop && scope.row.isTop == 1" style="{font-size:24px}" symbol name="iconliebiaoyizhiding"></icon>
            <icon v-else style="{font-size:24px}" symbol name="iconliebiaoweizhiding" @click="clickStick(scope.row)" ></icon>
          </div>
        </template>
      </el-table-column>
    </el-table>

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

      <reportPreview :visible="reportVisible" :reportUrl="reportUrl"/>
  </div>
</template>

<script>
import {icon, iPagination, iInput, iSelect} from 'rise'
import {getVpAnalysisDataList, fetchStaick, fetchEdit, fetchDel} from '@/api/partsrfq/vpAnalysis/vpAnalysisList'
import {iMessage} from 'rise';
import {pageMixins} from '@/utils/pageMixins';
import reportPreview from './reportPreview'
// import '@/assets/style/global/element-ui.scss'

export default {
  name: 'analysisTable',
  mixins: [pageMixins],
  components: {icon, iPagination, iInput, iSelect, reportPreview},
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      tableListData: [],
      tableLoading: false,
      defaultData: [
        {value: '是', label: this.$t('nominationLanguage.Yes')},
        {value: '否', label: this.$t('nominationLanguage.No')},
      ],
      selectionData: [],
      reportVisible: false,
      reportUrl: null
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {
    
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
    getTableData(searchData) {
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        createByName: searchData ? searchData.createByName : null,
        materialGroup: searchData ? searchData.materialGroup : null,
        partsNo: searchData ? searchData.partsNo : null,
        rfqNo: searchData ? searchData.rfqNo : this.$store.state.rfq.rfqId,
      }
      getVpAnalysisDataList(params).then(res => {
        if(res && res.code == 200) {
          if(!res.data || res.data.length == 0) {
            iMessage.error('抱歉，无法查询到结果（输入错误或不存在），请确认后重新输入')
          }
          this.page.totalCount = res.total
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
        if(res) {
          if(res. code == 200) iMessage.success(res.desZh)
          else iMessage.error(res.desZh)
        }
        this.getTableData()
      })
    },
    //点击提交删除选中数据
    clickSaveDel() {
      const ids = []
      const reportIds = []
      this.selectionData.map(item => {
        if(item.type == this.$t('TPZS.SCHEME_TYPE')) ids.push(item.id)
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
    },
    //点击方案名称，跳转总单价页面
    clickScheme(row) {
      const schemeUrl = '/sourcing/partsrfq/vpAnalyseDetail'
      this.$router.push({
        path: schemeUrl,
        query: {
          type: 'edit',
          schemeId: row.id
        }
      })
    },
    //点击报告名称，打开报告预览弹窗
    clickReport(row) {
      this.reportVisible = true
      if(row.downloadUrl) this.reportUrl = row.downloadUrl
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep  .el-table .el-table__row .el-input .el-input__inner {
  text-align: center!important;
}

.vpMainBox {
  ::v-deep .el-table__expand-icon{
    float: right!important;
  }

  ::v-deep .el-tree .el-tree-node__expand-icon.expanded 
  {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
  }
  //有子节点 且未展开
 ::v-deep  .el-table .el-icon-arrow-right:before{
    background: url('../../../../../assets/images/Icon - Arrow Drop Down.png') no-repeat 0 0;
    content: '';
    display: block;
    width: 10px;
    height: 4px;
    font-size: 10px;
    background-size: 10px;
  }
  //有子节点 且已展开
  ::v-deep .el-table .el-table__expand-icon--expanded {
    .el-icon-arrow-right:before {
      background: url('../../../../../assets/images/Icon - Arrow收起.png') no-repeat 0 0;
      content: '';
      display: block;
      width: 10px;
      height: 4px;
      font-size: 10px;
      background-size: 10px;
      transform: rotate(270deg);
    }
  }
  .openPage{
    position: relative;
    color: $color-blue;
    font-size: 14px;
    cursor: pointer;
    width: 90%;
    .number {
      position: absolute;
      right: 12px;
      top: 2px;
      color: #fff;
      font-size: 10px;
      z-index: 1;
      width: 20px;
    }
    .numberIcon {
      position: absolute;
      font-size: 24px;
      right: 10px;
      top: 3px;
    }
  }
  
  .stickIcon:hover {
    cursor: pointer;
  }
}
 
</style>
