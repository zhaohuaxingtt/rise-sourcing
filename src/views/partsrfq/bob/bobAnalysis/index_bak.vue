<!--
 * @Author: your name
 * @Date: 2021-06-21 10:50:38
 * @LastEditTime: 2021-11-17 17:43:56
 * @LastEditors: Please set LastEditors
 * @Description: 费用详情
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails.vue
-->
<template>
  <div v-loading="onDataLoading">
    <iCard>
      <template v-slot:header>
        <div class="flex-between-center titleBox">
          <div class="flex-between-center">
            <span class="title">费用详情</span>
            <div class="wrap">
              <div v-if="remark"
                   class="margin-left40 remark">
                <span style="font-size:12px">{{ remark}}</span>
              </div>
              <div v-if="remark"
                   class="margin-left40 remark2">备注：{{ remark }}</div>
            </div>

          </div>
          <div v-show="checkFLag">
            <iButton v-show="!allExpand"
                     @click="handleAllCollapse(true)">全部展开</iButton>
            <iButton v-show="allExpand"
                     @click="handleAllCollapse(false)">全部收回</iButton>
            <template v-if="!onGroupingModel">
              <iButton @click="remarks">备注</iButton>
              <iButton @click="reduction">还原</iButton>
              <iButton @click="onGroupingModel = true"
                       v-if="!onGroupingModel">数据分组</iButton>
              <iButton @click="down">导出</iButton>
            </template>
            <template v-else>
              <iButton @click="saveGroup">保存分组</iButton>
              <iButton @click="clearGrouped">取消</iButton>
            </template>
          </div>
          <div v-show="!checkFLag">
            <iButton @click="clear">移除</iButton>
            <iButton @click="finish">完成</iButton>
            <iButton @click="off">取消</iButton>
          </div>
        </div>
      </template>
      <div>
        <div style="display: flex;flex-flow: row nowrap;width: 100%;">
          <div class="table-cell"
               style="justify-content: flex-start;width: 20%"></div>
          <div v-for=" (item,index) in tableTitle"
               :key="index"
               class="table-cell"
               :style="{'font-weight': 'bold','width': 'calc(80% / ' + tableTitle.length + ')'}">{{item.title}}</div>
        </div>
        <div class="flex tabeleList">
          <div style="display:flex;flex-flow:column nowrap;">
            <div v-for="(item,index) in tableListData"
                 :key="index"
                 style="display: flex;flex-flow: row nowrap;width: 100%;"
                 :class="decideRowClass(item, index)"
                 v-if="collapseItems.indexOf(item.id) < 0 && item.title != 'CBD轮次明细ID'"
                 :id="item.id"
                 :root-id="item.rootId"
                 :parent-id="item.parentId"
                 :ref="!item.parentId ? item.id:''">
              <span class="table-cell"
                    style="justify-content: flex-start;width: 20%"
                    :style="{'padding-left': 20*item.level + 'px'}">
                <i v-if="item.hasChild"
                   :class="item.expanded ? 'el-icon-arrow-down':'el-icon-arrow-right'"
                   style="cursor: pointer;padding-right: 4px;"
                   @click="handleCollapse(item, item.expanded)"></i>
                <el-input v-if="item.grouped || item.matchId > 0"
                          v-model="item.title"></el-input>
                <span v-else
                      :style="{'font-weight': item.groupChild ? 'bold':''}">{{item.title}}</span>
              </span>
              <span :class="['table-cell', hasSelected(item, titleIdx) ? 'cell-selected':'']"
                    v-for="(title, titleIdx) in tableTitle"
                    :key="titleIdx"
                    :style="{'width': 'calc(80% / ' + tableTitle.length + ')'}">
                <el-checkbox v-show="onGroupingModel"
                             v-if="item.groupKey"
                             style="margin-right: 10px;"
                             v-model="item['checked#' + titleIdx]"
                             @change="function(checked){onGroupItemSelected(checked, item, titleIdx)}"></el-checkbox>
                {{item['label#'+titleIdx]}}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- <table1 :tableList="tableList"
              v-if="totalTable"
              v-bind="$attrs"
              :expends="expedsArr"></table1> -->
      <!-- <groupedTable ref="groupedTable"
                    class="margin-top20"
                    :tableList="groupList"
                    v-if="!totalTable"
                    :activeName="activeName"
                    :SchemeId="schemaId"
                    @removeList="removeList"
                    @groupBy="groupBtn"
                    v-bind="$attrs"></groupedTable> -->
      <iDialog :visible.sync="groupToDialogVisible"
               title="分组至"
               width="20%">
        <el-form>
          <el-form-item label="分组至">
            <el-select v-model="selectGroupName"
                       clearable
                       placeholder="请选择"
                       value-key="matchId">
              <el-option v-for="(item) in groupNameOptions"
                         :key="item.matchId"
                         :label="item.groupName"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="groupToList">确 定</el-button>
        </span>
      </iDialog>
      <remarkDialog :visible="remarkDialogVisible"
                    @remake="sure"
                    @cancel="cancel"></remarkDialog>
    </iCard>
    <!-- <ungroupedTable ref="ungroupedTable"
                    class="margin-top10"
                    :tableList="ungroupList"
                    :SchemeId="schemaId"
                    @activeName="returnAcitiveName"
                    v-if="groupby"
                    @groupBy="groupBtn"
                    @merge="merge"
                    v-bind="$attrs"></ungroupedTable> -->
  </div>
</template>

<script>
import { iCard, iButton, iDialog, iMessage } from "rise";
import table1 from "./components/table1.vue";
import tree from './tree'
import remarkDialog from "./components/remarkDialog.vue";
import ungroupedTable from "@/views/partsrfq/bob/bobAnalysis/ungroupedTable.vue";
import groupedTable from "@/views/partsrfq/bob/bobAnalysis/groupedTable.vue";
import { arrayToTree } from '@/utils'
import {
  chargeRetrieve,
  getRfqToRemark,
  modifyRfqToRemark,
  down,
  getGroupInfo,
  addComponentToGroup,
  merge,
  groupTerms,
  removeComponentFromGroup,
  groupedCancel,
  groupedSubmit,
  restore
} from "@/api/partsrfq/bob";
import { update } from "@/api/partsrfq/bob/analysisList";
import {
  tableList,
  ungroupList,
  groupList,
  groupByList,
  ungroupByList,
  ungroupByHeader,
} from "./components/data.js";

export default {
  inheritAttrs: true,
  components: {
    iCard,
    iDialog,
    iButton,
    table1,
    tree,
    ungroupedTable,
    groupedTable,
    remarkDialog,
  },
  data () {
    return {
      onDataLoading: false,
      allExpand: true,
      flag: false,
      flag1: true,
      tableList: [],
      ungroupList: [],
      ungroupByList,
      ungroupByHeader,
      groupList: [],
      groupByList,
      expends: [],
      remarkDialogVisible: false,
      groupToDialogVisible: false,
      remark: "",
      groupby: false,
      totalTable: true,
      value: "",
      selectGroupName: "",
      groupNameOptions: [],
      result: [],
      activeName: "",
      checkFLag: true,
      schemaId: "",
      expedsArr: [],
      expedsArr1: [],
      tableTitle: [],
      tableListData: [],
      collapseItems: [],
      onGroupingModel: false,
      groupSelectedItems: [],
      cbdSelectedList: []
    };
  },
  created () {
    this.onDataLoading = true;
    if (this.$route.query.groupId) {
      this.groupId = this.$route.query.groupId
    } else {
      this.groupId = this.propGroupId
    }
    if (this.$route.query.chemeId) {
      this.schemaId = this.$route.query.chemeId
    } else {
      this.schemaId = this.propSchemeId
    }

    this.getRfqToRemark();
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    formUpdata: {
      type: Object,
      default: () => {
        return {}
      }
    },
    propSchemeId: {
      type: String,
      default: ""
    },
    propGroupId: {
      type: String,
      default: ""
    }
  },
  watch: {
    activeName: {
      handler (val) {
        console.log(val, "acitve")
      }
    },
    label: {
      handler (val) {
        this.close()
        this.$nextTick(function () {
          this.expedsArr = []
          this.expedsArr1 = this.tableList.element.filter(i => i.title === val)
          console.log(this.expedsArr1)
          this.recursion(this.expedsArr1)
        });
      }
    }
  },
  methods: {
    decideRowClass (row, idx) {
      if (this.collapseItems.length == 0) {
        return idx % 2 == 0 ? 'table-odd' : 'table-even';
      }

      var displayed = this.tableListData.filter((item) => {
        return this.collapseItems.indexOf(item.id) < 0
      })
      console.log(displayed)

      var realIndex = -1;
      displayed.forEach((item, index) => {
        if (item.id == row.id) {
          realIndex = index;
        }
      })

      return realIndex % 2 == 0 ? 'table-odd' : 'table-even';
    },
    handleAllCollapse (expandAll) {
      this.allExpand = !this.allExpand
      // if (!expandAll) this.collapseItems = [];
      this.tableListData.forEach((item) => {
        if (!item.parentId) {
          this.handleCollapse(item, !expandAll)
        }
        item.expanded = expandAll;
      })
    },
    handleCollapse (item, isExpand) {
      this.collapseItem(item.id, isExpand)
      item.expanded = !isExpand;
    },
    collapseItem (parentId, isCollapse) {
      this.tableListData.forEach((item) => {
        if (isCollapse) {
          if (item.parentId && item.parentId == parentId) {
            if (this.collapseItems.indexOf(item.id) < 0) {
              this.collapseItems.push(item.id)
              if (item.hasChild) {
                this.collapseItem(item.id, isCollapse)
                item.expanded = !isCollapse
              }
            }
          }
        } else {
          if (item.parentId && item.parentId == parentId) {
            if (this.collapseItems.indexOf(item.id) >= 0) {
              this.collapseItems.splice(this.collapseItems.indexOf(item.id), 1)
              if (item.hasChild) {
                this.collapseItem(item.id, isCollapse)
                item.expanded = !isCollapse
              }
            }
          }
        }
      });
    },
    clearGrouped () {
      this.tableListData.forEach((item) => {
        for (var key in item) {
          if (key.indexOf("checked#") >= 0) {
            Vue.set(item, key, false);
          }
        }
      })
      this.groupSelectedItems = [];
      this.onGroupingModel = false;
    },
    onGroupItemSelected (checked, item, idx) {
      if (checked) {
        if (this.groupSelectedItems.some((obj) => {
          return obj.idx == idx && item.rootId == obj.rootId
        })) {
          Vue.set(item, "checked#" + idx, false)
          return;
        }
        var groupId = this.createUuid();
        this.tableListData.forEach((obj) => {
          if (obj.id == item.parentId) {
            this.groupSelectedItems.push({
              id: obj.id,
              idx: idx,
              rootId: obj.rootId,
              parentId: obj.parentId,
              groupId: groupId
            })
            if (obj.title === "CBD轮次明细ID") {
              this.cbdSelectedList.push(obj['label#' + idx])
            }
          } else if (obj.parentId == item.parentId) {
            this.groupSelectedItems.push({
              id: obj.id,
              idx: idx,
              rootId: obj.rootId,
              parentId: obj.parentId,
              groupId: groupId
            })
            if (obj.title === "CBD轮次明细ID") {
              this.cbdSelectedList.push(obj['label#' + idx])
            }
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx, groupId)
            }
          }
        })
      } else {
        this.tableListData.forEach((obj) => {
          if (obj.id == item.parentId) {
            for (var i = this.groupSelectedItems.length - 1; i >= 0; i--) {
              if (this.groupSelectedItems[i].id == obj.id && this.groupSelectedItems[i].idx == idx) {
                this.groupSelectedItems.splice(i, 1)
              }
            }
            this.cbdSelectedList.splice(idx - 1, 1)
          } else if (obj.parentId == item.parentId) {
            for (var i = this.groupSelectedItems.length - 1; i >= 0; i--) {
              if (this.groupSelectedItems[i].id == obj.id && this.groupSelectedItems[i].idx == idx) {
                this.groupSelectedItems.splice(i, 1)
              }
            }
            this.cbdSelectedList.splice(idx - 1, 1)
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx)
            }
          }
        })
      }
    },
    iterateChilds (checked, item, idx, groupId) {
      if (checked) {
        this.tableListData.forEach((obj) => {
          if (obj.parentId == item.id) {
            this.groupSelectedItems.push({
              id: obj.id,
              idx: idx,
              rootId: obj.rootId,
              parentId: obj.parentId,
              groupId: groupId
            })
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx)
            }
          }
        })
      } else {
        this.tableListData.forEach((obj) => {
          if (obj.parentId == item.id) {
            for (var i = this.groupSelectedItems.length - 1; i >= 0; i--) {
              if (this.groupSelectedItems[i].id == obj.id && this.groupSelectedItems[i].idx == idx) {
                this.groupSelectedItems.splice(i, 1)
              }
            }
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx)
            }
          }
        })
      }
    },
    hasSelected (item, idx) {
      return this.groupSelectedItems.some((obj) => {
        return obj.id == item.id && idx == obj.idx
      })
    },
    getRfqToRemark () {
      getRfqToRemark({
        rfqCode: this.rfqCode,
      }).then((res) => {
        if (res) {
          if (res.data) {
            this.remark = res.data.remark;
          }
        }
      });
    },
    chargeRetrieve (params, callback) {
      chargeRetrieve(params)
        .then((res) => {
          try {
            if (callback) {
              callback(res)
            } else {
              this.tableList = res;
              this.tableTitle = this.tableList.title.filter(item => item.title)
              this.prepareData()
            }
            this.$nextTick(() => {
              this.onDataLoading = false;
            })
          } catch (err) {
            console.log(err)
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh)
        });
    },
    createUuid () {
      var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
      return (
        s4() +
        s4() +
        s4() +
        s4() +
        s4() +
        s4() +
        s4() +
        s4()
      )
    },
    prepareData () {
      var tableData = [];
      var lvl = [];
      var titles = this.tableList.title;
      var elements = this.tableList.element;
      var rawCols = 0;
      var maCols = 0;
      var idCol = {}
      titles.forEach((title, index) => {
        if (rawCols < title.rawTotalColumn) {
          rawCols = title.rawTotalColumn;
        }
        if (maCols < title.maTotalColumn) {
          maCols = title.maTotalColumn;
        }
      });

      elements.forEach((element) => {
        this.createLevel(element, lvl, -1)
      });

      titles.forEach((title, index) => {
        var colData = [];

        if (index > 0) {
          elements.forEach((cbdDataLvlZero, index) => {
            this.addToColList(idCol, rawCols, maCols, cbdDataLvlZero.code, cbdDataLvlZero, colData, title.label, 0)
          })
          tableData.push(colData)
        }
      });
      this.mergeData(tableData)
    },
    mergeData (tableData) {
      var merged = JSON.parse(JSON.stringify(tableData[0]));
      merged.forEach((item) => {
        item["label#0"] = item.value
        if (!item.id) {
          item.id = this.createUuid();
        }
        delete item.value
      })
      tableData.forEach((col, index) => {
        if (index > 0) {
          col.forEach((item, idx) => {
            merged[idx]["label#" + index] = item.value
          })
        }
      })
      this.tableListData = merged
    },
    addChild (idCol, rawCols, maCols, cbdCode, childs, colData, key, showLevel, parentId, rootId, parentIndex) {
      childs.forEach((child) => {
        this.addToColList(idCol, rawCols, maCols, cbdCode, child, colData, key, showLevel, parentId, rootId, parentIndex)
      })
    },

    addToColList (idCol, rawCols, maCols, cbdCode, target, colData, key, showLevel, parentId, rootId, parentIndex) {
      // if (target.code == "detailId") {
      //   return;
      // }
      // var nextLvl = showLevel + 1;
      var nextLvl = showLevel + 1;
      if (!Array.isArray(target[key])) {
        if (!target.code) {
          target[key] = [target[key]];
        } else {
          var object = {};
          object.title = target.title;
          object.value = target[key];
          object.level = showLevel;
          object.parentId = parentId;
          object.rootId = rootId;
          object.code = target.code;
          // object.rootId = parentId;
          if (target.child && target.child.length > 0) {
            if (!idCol[object.title]) {
              idCol[object.title] = this.createUuid();
            }
            object.id = idCol[object.title];
            object.hasChild = true
            object.expanded = true;
          }
          colData.push(object)
          if (target.child && target.child.length > 0) {
            this.addChild(idCol, rawCols, maCols, cbdCode, target.child, colData, key, nextLvl, idCol[object.title], idCol[object.title])
          }
          return;
        }
      }

      var looper = JSON.parse(JSON.stringify(target[key]));
      if (looper.length < rawCols && cbdCode == "1") {
        while (looper.length < rawCols) {
          looper.push("");
        }
      }
      if (looper.length < maCols && cbdCode == "2") {
        while (looper.length < maCols) {
          looper.push("");
        }
      }

      looper.forEach((labelChild, index) => {
        if (typeof parentIndex != "undefined") {
          if (parentIndex == index) {
            var object = {};
            object.title = target.title;
            object.value = labelChild;
            object.level = showLevel;
            object.parentId = parentId;
            object.rootId = rootId;
            if (object.title == '组别' || object.title == '制造工序') {
              object.groupKey = true;
            }
            if (target.child && target.child.length > 0) {
              if (!idCol[object.title + index]) {
                idCol[object.title + index] = this.createUuid();
              }
              object.id = idCol[object.title + index];
              object.hasChild = true
              object.expanded = true;
            }
            colData.push(object)
            if (target.child && target.child.length > 0) {
              this.addChild(idCol, rawCols, maCols, cbdCode, target.child, colData, key, nextLvl, idCol[object.title + index], rootId, index)
            }
          }
          return false;
        } else {
          var object = {};
          object.title = target.title;
          object.value = labelChild;
          object.level = showLevel;
          object.rootId = rootId;
          object.parentId = parentId;
          if (object.title == '组别' || object.title == '制造工序') {
            object.groupKey = true;
          }

          if (target.child && target.child.length > 0) {
            if (!idCol[object.title + index]) {
              idCol[object.title + index] = this.createUuid();
            }
            object.id = idCol[object.title + index];
            object.hasChild = true
            object.expanded = true;
          }
          colData.push(object)
          if (target.child && target.child.length > 0) {
            this.addChild(idCol, rawCols, maCols, cbdCode, target.child, colData, key, nextLvl, idCol[object.title + index], rootId, index)
          }
        }
      })
    },
    createLevel (parent, lvl, showLevel) {
      // if (parent.code == "detailId") {
      //   return;
      // }
      showLevel++;
      if (!lvl.some((item) => {
        return item.title == parent.title
      })) {
        lvl.push({
          title: parent.title,
          level: showLevel
        })
      }
      if (parent.child && parent.child.length > 0) {
        parent.child.forEach((child) => {
          this.createLevel(child, lvl, showLevel)
        })
      }
    },
    handleChange (val) {
      console.log(val, 'val')
    },
    cancel (flag) {
      this.remarkDialogVisible = flag;
    },
    reduction () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$confirm('是否还原？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await restore(this.schemaId)
        groupTerms({
          analysisSchemeId: this.schemaId
        }).then(res => {
          loading.close();
          iMessage.success('还原成功')
          this.chargeRetrieve({
            isDefault: true,
            viewType: 'all',
            schemaId: this.schemaId,
            groupId: this.groupId
          });
        })
      }).catch(() => {
        loading.close();
        iMessage.error('还原失败')
        this.chargeRetrieve({
          isDefault: true,
          viewType: 'all',
          schemaId: this.schemaId,
          groupId: this.groupId
        });
      });


    },
    sure (val, flag) {
      this.remarkDialogVisible = flag;
      this.remark = val;
    },
    // 递归获取checked属性方法
    getTreeExpandKeys (obj) {
      // obj是传入的array
      if (obj && obj.length !== 0) {
        obj.forEach((item) => {
          this.expends.push(item.id);
          // 如果此列表有children, 进行递归
          if (item.children) {
            this.getTreeExpandKeys(item.children);
          }
        });
      }
    },
    remarks () {
      this.remarkDialogVisible = true;
    },
    group () {
      this.onGroupingModel = true;
      // update(this.formUpdata).then(res => {
      //   // iMessage.success("保存成功");
      //   this.totalTable = false;
      //   this.groupby = true;
      //   this.checkFLag = false
      // })
    },
    saveGroup () {
      if (this.groupSelectedItems.length === 0 || !this.schemaId) {
        this.$message.error('请选择数据');
        return
      }
      console.log(this.schemaId)
      this.groupToDialogVisible = true
      getGroupInfo({
        schemaId: this.schemaId,
        code: '1'
      }).then(res => {
        this.groupNameOptions = res.data
        if (!this.groupNameOptions.matchId) {
          this.groupNameOptions.matchId = 1;
        }
      })
    },
    merge (e, result, activeName) {
      if (result.length === 0) {
        this.$message.error('请选择数据');
        return
      }
      this.result = result
      this.activeName = activeName
      merge({
        roundDetailIdList: this.result,
        comparedType: this.$attrs.chartType
      }).then(res => {
        if (res.code === '200') {
          this.groupby = false
          this.$nextTick(() => {
            this.groupby = true
            this.$refs.ungroupedTable.activeName = this.activeName
            this.$refs.ungroupedTable.chargeRetrieve({
              isDefault: true,
              viewType: this.activeName,
              schemaId: this.schemaId,
              groupId: this.groupId
            })
          });
          this.$refs.groupedTable.chargeRetrieve({
            isDefault: true,
            schemaId: this.schemaId,
            viewType: this.activeName === 'rawUngrouped' ? 'rawGrouped' : 'maGrouped',
            groupId: this.groupId
          })
          iMessage.success(res.desZh)
        } else {
          this.groupby = false
          this.$nextTick(() => {
            this.groupby = true
            this.$refs.ungroupedTable.activeName = this.activeName
            this.$refs.ungroupedTable.chargeRetrieve({
              isDefault: true,
              viewType: this.activeName,
              schemaId: this.schemaId,
              groupId: this.groupId
            })
          });
          this.$refs.groupedTable.chargeRetrieve({
            isDefault: true,
            schemaId: this.schemaId,
            viewType: this.activeName === 'rawUngrouped' ? 'rawGrouped' : 'maGrouped',
            groupId: this.groupId
          })
          iMessage.error(res.desZh)
        }

      })
    },
    // returnAcitiveName (val) {
    //   this.activeName = val
    // },
    groupToList () {
      if (!this.selectGroupName) {
        this.$message.error('请选择分组');
        return
      }

      var newDatas = [];
      this.groupSelectedItems.forEach((gi) => {
        this.tableListData.forEach((item) => {
          if (gi.id == item.id) {
            var newItem = JSON.parse(JSON.stringify(item));
            for (var key in newItem) {
              if (key.indexOf('label#') >= 0 && key != ('label#' + gi.idx)) {
                newItem[key] = ""
              }
            }
            newItem.idx = gi.idx;
            newItem['checked#' + gi.idx] = false
            newDatas.push(newItem)
          }
        })
      })

      var groupedDatas = {}
      newDatas.forEach((item) => {
        if (!groupedDatas[item.rootId]) {
          groupedDatas[item.rootId] = []
        }
        var obj = groupedDatas[item.rootId].filter((a) => {
          return a.title == item.title && a.rootId == item.rootId
        })
        if (obj.length <= 0) {
          groupedDatas[item.rootId].push(item)
        } else {
          obj[0]["label#" + item.idx] = item["label#" + item.idx]
        }
      })

      for (var key in groupedDatas) {
        var rootItemIndex = -1;
        this.tableListData.forEach((item, index) => {
          if (key == item.id) {
            rootItemIndex = index;
            return false;
          }
        })
        if (rootItemIndex >= 0) {
          this.refreshGroupedId(groupedDatas, key, 0)
          groupedDatas[key][0].grouped = true;
          groupedDatas[key][0].matchId = this.selectGroupName.matchId;
          groupedDatas[key][0].title = this.selectGroupName.groupName || "新组别";
          rootItemIndex++;
          groupedDatas[key].forEach((item) => {
            item.expanded = true;
            item.groupChild = true;
            this.tableListData.splice(rootItemIndex, 0, item);
            rootItemIndex++;
          });
        }
      }

      // return;
      addComponentToGroup({
        groupId: this.selectGroupName.matchId,
        groupName: this.selectGroupName.groupName,
        roundDetailIdList: this.cbdSelectedList
      }).then(res => {
        this.groupby = false
        this.chargeRetrieve({
          isDefault: true,
          viewType: 'all',
          schemaId: this.schemaId,
          groupId: this.groupId
        });
        this.clearGrouped();
        this.groupToDialogVisible = false;
        this.onGroupingModel = false;
      })
    },
    refreshGroupedId (groupedDatas, key, index) {
      var newId = this.createUuid()
      if (groupedDatas[key][index].hasChild) {
        this.refreshChildGroupid(groupedDatas, key, groupedDatas[key][index].id, newId)
      }
      groupedDatas[key][index].id = newId;
    },
    refreshChildGroupid (groupedDatas, key, parentId, newParentId) {
      groupedDatas[key].forEach((item) => {
        if (item.parentId == parentId) {
          var newId = this.createUuid()
          if (item.hasChild) {
            this.refreshChildGroupid(groupedDatas, key, item.id, newId)
          }
          item.id = newId;
          item.parentId = newParentId;
        }
      })
    },
    clear () {
      if (!this.activeName) {
        this.activeName = "rawUngrouped"
      }
      removeComponentFromGroup({
        roundDetailIdList: this.$refs.groupedTable.checkLists
      }).then(res => {
        this.$refs.groupedTable.chargeRetrieve({
          isDefault: true,
          viewType: this.activeName === 'rawUngrouped' ? 'rawGrouped' : "maGrouped",
          schemaId: this.schemaId,
          groupId: this.groupId
        })
        this.$refs.ungroupedTable.chargeRetrieve({
          isDefault: true,
          viewType: this.activeName,
          schemaId: this.schemaId,
          groupId: this.groupId
        })
      })
    },
    finish () {
      groupedSubmit({
        schemaId: this.schemaId,
        groupId: this.groupId
      }).then((res) => {
        this.finishGroup()
      })
    },
    off () {
      groupedCancel({
        schemaId: this.schemaId,
        groupId: this.groupId
      }).then(res => {
        this.finishGroup()
      })

    },
    finishGroup () {
      this.totalTable = true
      this.groupby = false
      this.checkFLag = true
      this.chargeRetrieve({
        isDefault: true,
        viewType: 'all',
        schemaId: this.schemaId,
        groupId: this.groupId
      });
    },
    down () {
      this.formUpdata.remark = this.remark
      this.$confirm('此次导出将默认保存当前”费用详情“界面数据。', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        update(this.formUpdata).then(res => {
          iMessage.success("保存成功");
          down({
            schemaId: this.schemaId,
          }).then((res) => { });
        })
      })

    },
  },
};
</script>

<style lang="scss" scoped>
// .titleBox {
//   width: 100%;
//   font-weight: bold;
//   font-size: $font-size18 ;
// }
.wrap {
  width: 300px;
  position: relative;
}
// .title {
//   font-size: $font-size18 !important;
// }
.remark {
  width: 550px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: $font-size12 !important;
  line-height: 24px;
  font-weight: normal;
  color: #949494;
}
.remark2 {
  width: 800px;
  font-size: $font-size14 !important;
  font-weight: normal;
  color: #949494;
  position: absolute;
  top: -40px;
  left: 40px;
  padding: 10px;
  box-shadow: 0px 3px 10px rgba(27, 29, 33, 0.16);
  border-radius: 5px;
  background: #ffffff;
  display: none;
}
.wrap:hover .remark2 {
  display: block;
}
.tabeleList {
  & > div {
    flex: 1;
  }
  & > div:first-child {
    flex: 2;
  }
  & > span {
    flex: 1;
  }
  & > span:first-child {
    flex: 2;
  }
  .tableTitle {
    font-size: $font-size16;
    text-align: center;
  }
  .tableData {
    font-size: $font-size16;
  }
  .dataTitle {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.table-cell {
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size16;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.table-odd {
  background-color: #ffffff;
}
.table-even {
  background-color: rgba(22, 99, 246, 0.07);
}
.cell-selected {
  background-color: #4582f9;
  color: #ffffff;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #ffffff !important;
  border-color: #ffffff !important;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ffffff !important;
}
</style>
