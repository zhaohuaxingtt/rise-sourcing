<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-08-18 11:02:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseList\components\analysisTable.vue
-->
<template>
  <div class="vpMainBox">
    <el-table tooltip-effect='light'
              :data="tableListData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="number"
              :row-class-name="rowStyle"
              :max-height="450"
              :tree-props="{children: 'children'}"
              @selection-change="handleSelectionChange"
              @select="rowSelect"
              @select-all="selectAll">
      <el-table-column type="selection"
                       align="center"
                       header-align="center"
                       width="55">
      </el-table-column>
      <el-table-column label="#"
                       type='index'
                       :index="indexMethod"
                       align="center"
                       header-align="center"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       header-align="center"
                       :label="$t('TPZS.FXMC')"
                       width="450">
        <template slot-scope="scope">
          <div class="openPage">
            <el-row :gutter="20">
              <el-col :span="20">
                <span v-if="!editMode"
                      style="textAlgin: center">
                  <el-tooltip :content="scope.row.analysisSchemeName"
                              placement="top"
                              effect="light">
                    <span class="ellipsis"
                       v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')"
                       @click="clickScheme(scope.row)">{{scope.row.analysisSchemeName}}</span>
                  </el-tooltip>
                  <el-tooltip :content="scope.row.reportName"
                              placement="top"
                              effect="light">
                    <span class="ellipsis"
                       v-if="scope.row.type == $t('TPZS.REPORT_TYPE')"
                       @click="clickReport(scope.row)">{{scope.row.reportName}}</span>
                  </el-tooltip>
                </span>
                <span v-else>
                  <iInput class="nameInput"
                          v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')"
                          v-model="scope.row.analysisSchemeName"></iInput>
                  <iInput class="nameInput"
                          v-if="scope.row.type == $t('TPZS.REPORT_TYPE')"
                          v-model="scope.row.reportName"></iInput>
                </span>
              </el-col>
              <el-col :span="4">
                <span v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')">
                  <span class="number">
                    {{scope.row.reportCount}}
                  </span>
                  <icon class="numberIcon"
                        style="{font-size:24px}"
                        symbol
                        name="iconwenjianshuliangbeijing"></icon>
                </span>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="materialGroup"
                       align="center"
                       header-align="center"
                       label="材料组">
      </el-table-column>
      <el-table-column prop="rfqId"
                       align="center"
                       header-align="center"
                       label="RFQ"
                       width="100">
      </el-table-column>
      <el-table-column prop="isDefault"
                       align="center"
                       header-align="center"
                       :label="$t('TPZS.MRX')"
                       width="80">
        <template slot-scope="scope">
          <div v-if="!editMode">
            {{ defaultStatus(scope.row, scope.row.isDefault) }}
          </div>
          <div v-else-if="editMode && scope.row.type == $t('TPZS.SCHEME_TYPE') && scope.row.isDefault != '空' && scope.row.isDefault">
            <iSelect :value="defaultStatus(scope.row, scope.row.isDefault)"
                     @change="changeDefault($event, scope.row)">
              <el-option :value="item.value"
                         :label="item.label"
                         v-for="(item, index) in defaultData"
                         :key="index"></el-option>
            </iSelect>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type"
                       align="center"
                       header-align="center"
                       :label="$t('TPZS.WJLX')">
      </el-table-column>
      <el-table-column prop="createByName"
                       align="center"
                       header-align="center"
                       :label="$t('TPZS.CJR')">
      </el-table-column>
      <el-table-column prop="createDate"
                       align="center"
                       header-align="center"
                       show-overflow-tooltip
                       :label="$t('LK_CHUANGJIANRIQI')">
      </el-table-column>
      <el-table-column prop="updateDate"
                       align="center"
                       header-align="center"
                       show-overflow-tooltip
                       :label="$t('TPZS.SCXGRQ')">
      </el-table-column>
      <el-table-column align="center"
                       header-align="center"
                       width="50">
        <template slot-scope="scope">
          <div class="stickIcon"
               v-if="scope.row.type == $t('TPZS.SCHEME_TYPE')"
               @click="clickStick(scope.row)">
            <icon v-if="scope.row.isTop && scope.row.isTop == 1"
                  style="{font-size:24px}"
                  symbol
                  name="iconliebiaoyizhiding"></icon>
            <icon v-else
                  style="{font-size:24px}"
                  symbol
                  name="iconliebiaoweizhiding"
                  @click="clickStick(scope.row)"></icon>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableData)"
                 @current-change="handleCurrentChange($event, getTableData)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page='page.currPage'
                 :total="page.totalCount" />

    <reportPreview :key="reportKey"
                   :visible="reportVisible"
                   :reportUrl="reportUrl"
                   :title="reportTitle"
                   @handleCloseReport="handleCloseReport" />
  </div>
</template>

<script>
import { icon, iPagination, iInput, iSelect, iMessage } from 'rise'
import { getVpAnalysisDataList, fetchStaick, fetchEdit, fetchDel } from '@/api/partsrfq/vpAnalysis/vpAnalysisList'
import { pageMixins } from '@/utils/pageMixins';
import reportPreview from './reportPreview'

export default {
  name: 'analysisTable',
  mixins: [pageMixins],
  components: { icon, iPagination, iInput, iSelect, reportPreview },
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    searchData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tableListData: [],
      tableLoading: false,
      defaultData: [
        { value: '是', label: this.$t('nominationLanguage.Yes') },
        { value: '否', label: this.$t('nominationLanguage.No') },
      ],
      selectionData: [],
      reportVisible: false,
      reportUrl: null,
      reportTitle: null,
      reportKey: 0,
      round: null,        //round
      currentDefaultObj: null, //当前编辑对象
      updatedDefault: false, //是否已更新默认项
    }
  },
  created () {
    this.round = this.$route.query.round ? this.$route.query.round : this.round
  },
  computed: {
    defaultStatus () {
      return function (val, status) {
        let flag = status === "是" || status === "否" ? status : null;
        if (this.currentDefaultObj && this.currentDefaultObj.isDefault == "是") {
          if (val.number == this.currentDefaultObj.number) flag = "是";
          else if (!flag) flag = null;
          else flag = "否";
        }
        return val.type == this.$t('TPZS.SCHEME_TYPE') ? flag : null;
      };
    },
  },
  methods: {
    //初始化测试数据（静态数据）
    initTestTableData () {
      this.tableListData = [
        {
          id: 0, name: 'test1', materials: '编号-名称', rfq: 'RFQ号-名称', default: 0, fileType: 0, stick: true, children: [
            { id: 1, name: 'test1.1', fileType: 1, },
            { id: 2, name: 'test1.2', fileType: 1, },
          ]
        },
        { id: 3, name: 'test2', materials: '编号-名称', rfq: 'RFQ号-名称', default: 1, fileType: 0, stick: false },
      ]
      this.handleTableNumber(this.tableListData, 1, null)
    },
    // 初始化列表数据
    getTableData () {
      return new Promise(resolve => {
        const params = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          createByName: this.searchData && this.searchData.createByName ? this.searchData.createByName : null,
          materialGroup: this.searchData && this.searchData.materialGroup ? this.searchData.materialGroup : null,
          partsNo: this.searchData && this.searchData.partsNo ? this.searchData.partsNo : null,
          rfqNo: this.searchData && this.searchData.rfqNo ? this.searchData.rfqNo : this.$store.state.rfq.rfqId,
        }
        getVpAnalysisDataList(params).then(res => {
          if (res && res.code == 200) {
            this.page.totalCount = res.total
            this.tableListData = res.data
            this.handleTableNumber(this.tableListData, 1, null)
            this.updateTableData()
            resolve(res)
          }
        })
      })
    },
    //更新表格数据
    updateTableData () {
      if (this.updatedDefault) {
        this.tableListData.map((item, index) => {
          let flag = item.isDefault === "是" || item.isDefault === "否" ? item.isDefault : null;
          if (this.currentDefaultObj && this.currentDefaultObj.isDefault == "是") {
            if (item.number == this.currentDefaultObj.number)
              flag = "是";
            else if (!flag) flag = null;
            else flag = "否";
          }
          this.$set(this.tableListData[index], 'isDefault', flag)
        })
      }
    },
    //递归处理树结构数据的序号
    handleTableNumber (data, suffix, prefix) {
      data.forEach((item) => {
        const number = prefix ? (prefix + '.' + suffix) : suffix
        item['number'] = number
        if (item.vpReportVOList && item.vpReportVOList.length > 0) {
          item['children'] = item.vpReportVOList
          this.handleTableNumber(item.vpReportVOList, 1, number)
        }
        suffix++
      })
    },
    // 获取下标
    indexMethod (e) {
      const rows = []
      this.tableListData.forEach((r) => {
        rows.push(r.number)
        if (r.vpReportVOList && r.vpReportVOList !== null) {
          r.vpReportVOList.forEach((c) => {
            rows.push(c.number)
          })
        }
      })
      return rows[e]
    },
    // 选中项数据发生改变
    handleSelectionChange (selection) {
      this.selectionData = selection
    },
    //点击置顶事件
    clickStick (row) {
      const params = {
        id: row.id
      }
      fetchStaick(params).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        }
      })
    },
    //编辑时，改变默认项事件
    changeDefault (val, row) {
      this.$set(row, "isDefault", val);
      this.$set(this, "currentDefaultObj", row);
      if (val == '是') this.updatedDefault = true
      this.updateTableData()
    },
    //点击取消编辑按钮事件
    cancelEditVP (backUpData) {
      backUpData.map((item, index) => {
        if (item.type == this.$t('TPZS.SCHEME_TYPE'))
          this.$set(this.tableListData[index], 'analysisSchemeName', item.analysisSchemeName)
        else
          this.$set(this.tableListData[index], 'reportName', item.reportName)
        this.$set(this.tableListData[index], 'isDefault', item.isDefault)
      })
      this.edit = !this.edit;
    },
    //点击提交保存编辑事件
    clickSaveEdit () {
      const params = {
        vpEditDTOList: this.tableListData
      }
      fetchEdit(params).then(res => {
        if (res) {
          if (res.code == 200) iMessage.success(res.desZh)
          else iMessage.error(res.desZh)
        }
        this.getTableData()
      })
    },
    //点击提交删除选中数据
    clickSaveDel () {
      const ids = []
      const reportIds = []
      if (!this.selectionData || this.selectionData.length == 0) {
        iMessage.error(this.$t('TPZS.QXZXYCZDSJ'));
        return;
      }
      this.selectionData.map(item => {
        if (item.type == this.$t('TPZS.SCHEME_TYPE')) ids.push(item.id)
        else reportIds.push(item.id)
      })
      const params = {
        ids: ids,
        reportIds: reportIds
      }
      fetchDel(params).then(res => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableData()
        }
      })
    },
    //点击方案名称，跳转总单价页面
    clickScheme (row) {
      const schemeUrl = '/sourcing/partsrfq/vpAnalyseDetail'
      this.$router.push({
        path: schemeUrl,
        query: {
          type: 'edit',
          schemeId: row.id,
          round: this.round
        }
      })
    },
    //点击报告名称，打开报告预览弹窗
    clickReport (row) {
      this.reportTitle = row.reportName
      this.reportKey = Math.random()
      if (row.downloadUrl) this.reportUrl = row.downloadUrl
      this.reportVisible = true
    },
    rowSelect (selection, row) {
      if (row.fileList) { //只对有子节点的行响应
        if (!row.isChecked) {   //由行数据中的元素isChecked判断当前是否被选中
          row.fileList.map((item) => { //遍历所有子节点
            this.$refs.dataTable.toggleRowSelection(item, true); //切换该子节点选中状态
            /*
            方法名                    说明                                      参数
                                 用于多选表格，切换某一行的选中状态，         row, selected
            toggleRowSelection   如果使用了第二个参数，则是设置这一行
                                 选中与否（selected 为 true 则选中）
             */
            item.isChecked = true;
          });
          row.isChecked = true; //当前行isChecked标志元素切换为false
        } else {
          row.fileList.map((item) => {
            this.$refs.dataTable.toggleRowSelection(item, false);
            item.isChecked = false;
          });
          row.isChecked = false;
        }
      }
    },
    selectAll (selection) {
      // selection 是选中的数据集合
      this.$refs.dataTable.data.map((items) => { //使用$ref获取注册的子组件信息，用data获取所有行，并用map函数遍历行
        if (items.fileList) {
          if (!items.isChecked) { //若遍历出来的行未选中
            this.$refs.dataTable.toggleRowSelection(items, true); //行变为选中状态
            items.isChecked = true; //更新标志参数
            items.fileList.map((item) => { //遍历子节点并改变状态与标志参数
              this.$refs.dataTable.toggleRowSelection(item, true);
              item.isChecked = true;
            });
          } else { //选中状态同理
            this.$refs.dataTable.toggleRowSelection(items, false);
            items.isChecked = false;
            items.fileList.map((item) => {
              this.$refs.dataTable.toggleRowSelection(item, false);
              item.isChecked = false;
            });
          }
        }
        else {
          if (!items.isChecked) items.isChecked = true;
          else items.isChecked = false;
        }
      });

    },
    //点击关闭报告预览弹窗
    handleCloseReport () {
      this.reportVisible = false
    },
    //给方案数据设置斑马纹样式名
    rowStyle({row, rowIndex}) { 
      return row.type == this.$t('TPZS.SCHEME_TYPE') && row.number % 2 == 0 ? 'scheme' : 'report'
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-table .el-table__row .el-input .el-input__inner {
  text-align: center !important;
}

::v-deep .cell {
  .el-table__indent,
  .el-table__placeholder {
    display: none;
  }
}

::v-deep .el-tooltip__popper {
  width: 80%; /*修改宽度*/
  background: #fff !important; /*背景色  !important优先级*/
  opacity: 0.5 !important; /*背景色透明度*/
  color: black !important; /*字体颜色*/
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 96%;
}

::v-deep .el-table .scheme{
  background-color: #e0eafd;
}
::v-deep .el-table .report {
  background-color: #fff;
}

.vpMainBox {
  ::v-deep .el-table__expand-icon {
    float: right !important;
  }

  ::v-deep .el-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  //有子节点 且未展开
  ::v-deep .el-table .el-icon-arrow-right:before {
    background: url("../../../../../assets/images/Icon - Arrow Drop Down.png")
      no-repeat 0 0;
    content: "";
    display: block;
    width: 10px;
    height: 4px;
    font-size: 10px;
    background-size: 10px;
  }
  //有子节点 且已展开
  ::v-deep .el-table .el-table__expand-icon--expanded {
    .el-icon-arrow-right:before {
      background: url("../../../../../assets/images/Icon - Arrow收起.png")
        no-repeat 0 0;
      content: "";
      display: block;
      width: 10px;
      height: 4px;
      font-size: 10px;
      background-size: 10px;
      transform: rotate(270deg);
    }
  }
  ::v-deep .openPage {
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
