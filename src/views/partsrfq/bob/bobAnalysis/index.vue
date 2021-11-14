<!--
 * @Author: your name
 * @Date: 2021-06-21 10:50:38
 * @LastEditTime: 2021-11-14 12:13:34
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
            <iButton v-show="flag"
                     @click="open">全部展开</iButton>
            <iButton v-show="flag1"
                     @click="close">全部收回</iButton>
            <iButton @click="remarks">备注</iButton>
            <iButton @click="reduction">还原</iButton>
            <iButton @click="group">数据分组</iButton>
            <iButton @click="down">导出</iButton>
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
          <div class="table-cell" style="justify-content: flex-start;width: 20%"></div>
          <div v-for=" (item,index) in tableTitle"
               :key="index" class="table-cell" style="font-weight: bold">{{item.title}}</div>
        </div>
        <div class="flex tabeleList">
          <div style="display:flex;flex-flow:column nowrap;">
            <div v-for="(item,index) in tableListData" :key="index" style="display: flex;flex-flow: row nowrap;width: 100%;" 
              v-if="collapseItems.indexOf(item.id) < 0">
              <span class="table-cell" style="justify-content: flex-start;width: 20%" :style="{'padding-left': 20*item.level + 'px'}">
                <i v-if="item.hasChild" :class="item.expanded ? 'el-icon-arrow-down':'el-icon-arrow-right'" style="cursor: pointer;margin-right: 4px;" @click="handleCollapse(item)"></i>
                {{item.title}}
              </span>
              <span class="table-cell">{{item.value0}}</span>
              <span class="table-cell">{{item.value1}}</span>
              <span class="table-cell">{{item.value2}}</span>
              <span class="table-cell">{{item.value3}}</span>
              <span class="table-cell">{{item.value4}}</span>
              <span class="table-cell">{{item.value5}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <table1 :tableList="tableList"
              v-if="totalTable"
              v-bind="$attrs"
              :expends="expedsArr"></table1> -->
      <groupedTable ref="groupedTable"
                    class="margin-top20"
                    :tableList="groupList"
                    v-if="!totalTable"
                    :activeName="activeName"
                    :SchemeId="SchemeId"
                    @removeList="removeList"
                    @groupBy="groupBtn"
                    v-bind="$attrs"></groupedTable>
      <iDialog :visible.sync="visible1"
               title="分组至"
               width="20%">
        <el-form>
          <el-form-item label="分组至">
            <el-select v-model="value1"
                       clearable
                       placeholder="请选择"
                       value-key="matchId">
              <el-option v-for="(item) in options"
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
      <remarkDialog :visible="visible"
                    @remake="sure"
                    @cancel="cancel"></remarkDialog>
    </iCard>
    <ungroupedTable ref="ungroupedTable"
                    class="margin-top10"
                    :tableList="ungroupList"
                    :SchemeId="SchemeId"
                    @activeName="returnAcitiveName"
                    v-if="groupby"
                    @groupBy="groupBtn"
                    @merge="merge"
                    v-bind="$attrs"></ungroupedTable>
  </div>
</template>

<script>
import { iCard, iButton, iDialog, iMessage } from "rise";
import table1 from "./components/table1.vue";
import table2 from "./components/table2.vue";
import table3 from "./components/table3.vue";
import table4 from "./components/table4.vue";
import table5 from "./components/table5.vue";
import table6 from "./components/table6.vue";
import remarkDialog from "./components/remarkDialog.vue";
import ungroupedTable from "@/views/partsrfq/bob/bobAnalysis/ungroupedTable.vue";
import groupedTable from "@/views/partsrfq/bob/bobAnalysis/groupedTable.vue";
import { filterEmptyChildren } from '@/utils'
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
    ungroupedTable,
    groupedTable,
    remarkDialog,
  },
  data () {
    return {
      onDataLoading: false,
      flag: true,
      flag1: false,
      tableList: [],
      ungroupList: [],
      ungroupByList,
      ungroupByHeader,
      groupList: [],
      groupByList,
      expends: [],
      visible: false,
      visible1: false,
      remark: "",
      groupby: false,
      totalTable: true,
      value: "",
      value1: "",
      options: [],
      result: [],
      activeName: "",
      checkFLag: true,
      SchemeId: "",
      expedsArr: [],
      expedsArr1: [],
      tableTitle: [],
      tableListData: [],
      collapseItems:[]
    };
  },
  created () {
    this.onDataLoading = true;
    this.groupId = this.$route.query.groupId
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
    analysisSchemeId: {
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
        // this.expedsArr = []
        this.close()
        this.$nextTick(function () {
          this.expedsArr = []
          this.expedsArr1 = this.tableList.element.filter(i => i.title === val)
          console.log(this.expedsArr1)
          this.recursion(this.expedsArr1)
        });
        // this.$set(this.expedsArr, 0, this.recursion(this.expedsArr1));
      }
    }
  },
  mounted () {
    this.SchemeId = this.analysisSchemeId
    console.log(this.SchemeId)
    this.$nextTick(() => {

    });

    // this.$EventBus.$on("activeName", res => {
    //   this.activeName = res
    // })

  },
  methods: {
    handleCollapse(item) {
      this.collapseItem(item.id, item.expanded)
      console.log(this.collapseItems)
      item.expanded = !item.expanded;
    },
    collapseItem(parentId, isCollapse) {
      this.tableListData.forEach((item) => {
        if (isCollapse) {
          if (item.rootId && item.rootId == parentId) {
            if (this.collapseItems.indexOf(item.id) < 0){
              this.collapseItems.push(item.id)
              if (item.hasChild) {
                this.collapseItem(item.id, isCollapse)
              }
            }
          }
        } else {
          if (item.rootId && item.rootId == parentId) {
            if (this.collapseItems.indexOf(item.id) >= 0) {
              this.collapseItems.splice(this.collapseItems.indexOf(item.id), 1)
              if (item.hasChild) {
                this.collapseItem(item.id, isCollapse)
              }
            }
          }
        }
      });
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
    chargeRetrieve (params) {
      chargeRetrieve(params)
        .then((res) => {
          try {
            this.tableList = res;
            this.tableTitle = this.tableList.title.filter(item => item.title)
            this.prepareData()
            this.$nextTick(() => {
              this.onDataLoading = false;
            })
            // this.tableList.title.forEach(value => {
            //   this.$attrs.supplierList.forEach(i => {
            //     if (value.title == i.supplierId) {
            //       value.title = i.shortNameZh
            //     }
            //   })
            // })
            // filterEmptyChildren(this.tableList.element, 'detailId')
            // this.tableList.element = this.arrayTreeAddLevel(this.tableList.element)
            // this.$nextTick(() => {
            //   this.open();
            // });
          } catch (err) {
            console.log(err)
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh)
        });
    },
    createUuid() {
      var s4 = function() {
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
      var rawCols=0;
      var maCols=0;
      var idCol = {}
      titles.forEach((title, index) => {
        if (rawCols<title.rawTotalColumn){
          rawCols = title.rawTotalColumn;
        }
        if (maCols<title.maTotalColumn){
          maCols = title.maTotalColumn;
        }
      });

      elements.forEach((element) => {
        this.createLevel(element, lvl, -1)
      });
      console.log(lvl)

      // console.log(titles)
      titles.forEach((title, index) => {
        var colData = [];

        if (index > 0) {
          elements.forEach((cbdDataLvlZero, index) => {
            // if (index== 1) {
            this.addToColList(idCol, rawCols, maCols, cbdDataLvlZero.code ,cbdDataLvlZero, colData, title.label, 0)
              // }
          })
          tableData.push(colData)
        }
        // }
      });
      this.mergeData(tableData)
      // this.originExpanded = _.cloneDeep(this.expandedItems);
    },
    mergeData(tableData) {
      var merged = JSON.parse(JSON.stringify(tableData[0]));
      merged.forEach((item) => {
        item.value0 = item.value
        // item.id = createUuid()
        if (!item.id) {
          item.id = this.createUuid();
        }
        delete item.value
      })
      tableData.forEach((col, index) => {
        if (index > 0) {
          col.forEach((item, idx) => {
            merged[idx]["value" + index] = item.value
          })
        }
      })
      this.tableListData = merged
      console.log(merged)
    },
    addChild(idCol, rawCols, maCols, cbdCode, childs, colData, key, showLevel, parentId, parentIndex) {
      childs.forEach((child) => {
        this.addToColList(idCol, rawCols, maCols, cbdCode, child, colData, key, showLevel, parentId, parentIndex)
      })
    },

    addToColList(idCol, rawCols, maCols, cbdCode, target, colData, key, showLevel, parentId, parentIndex) {
      if (target.code == "detailId") {
        return;
      }
      // var nextLvl = showLevel + 1;
      var nextLvl = showLevel + 1;
      if (!Array.isArray(target[key])) {
        if (!target.code) {
          target[key]=[target[key]];
        } else {
          var object = {};
          object.title = target.title;
          object.value = target[key];
          object.level = showLevel;
          object.rootId = parentId;
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
            this.addChild(idCol, rawCols, maCols, cbdCode, target.child, colData, key, nextLvl, idCol[object.title])
          }
          return;
        }
      }

      var looper = JSON.parse(JSON.stringify(target[key]));
      if (looper.length < rawCols && cbdCode=="1") {
        while(looper.length < rawCols) {
          looper.push("");
        }
      }
      if (looper.length < maCols && cbdCode=="2") {
        while(looper.length < maCols) {
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
            object.rootId = parentId;
            if (target.child && target.child.length > 0) {
              if (!idCol[object.title + index]) {
                idCol[object.title + index] = this.createUuid();
              }
              object.id = idCol[object.title + index];
              object.hasChild = true
              object.expanded = true;
            }
            // console.log(target.title, labelChild)
            colData.push(object)
            if (target.child && target.child.length > 0) {
              this.addChild(idCol, rawCols, maCols, cbdCode, target.child, colData, key, nextLvl, idCol[object.title + index], index)
            }
          }
          return false;
        } else {
          var object = {};
          object.title = target.title;
          object.value = labelChild;
          object.level = showLevel;
          object.rootId = parentId;
          if (target.child && target.child.length > 0) {
            if (!idCol[object.title + index]) {
              idCol[object.title + index] = this.createUuid();
            }
            object.id = idCol[object.title + index];
            object.hasChild = true
            object.expanded = true;
          }
          // console.log(target.title, labelChild)
          colData.push(object)
          if (target.child && target.child.length > 0) {
            this.addChild(idCol, rawCols, maCols, cbdCode, target.child, colData, key, nextLvl, idCol[object.title + index], index)
          }
        }
      })
    },
    createLevel (parent, lvl, showLevel) {
      if (parent.code == "detailId") {
        return;
      }
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

    // arrayTreeAddLevel (array, levelName = 'level', childrenName = 'child') {
    //   if (!Array.isArray(array)) return []
    //   const recursive = (array, level = 0) => {
    //     level++
    //     return array.map(v => {
    //       v[levelName] = level
    //       const child = v[childrenName]
    //       if (child && child.length) recursive(child, level)
    //       return v
    //     })
    //   }
    //   return recursive(array)
    // },

    // recursion (data) {
    //   if (!data) {
    //     // return; 中断执行
    //     return;
    //   }
    //   data.forEach(i => {
    //     this.expedsArr.push(i.index.toString())
    //     if (i.child && i.child.length > 0) {
    //       this.recursion(i.child)
    //     }
    //   })
    // },
    // open () {
    //   let els = this.$el.getElementsByClassName("el-table__expand-icon");
    //   if (this.tableList.element.length != 0 && els.length != 0) {
    //     this.flag = false;
    //     this.flag1 = true;
    //     for (let j1 = 0; j1 < els.length; j1++) {
    //       els[j1].classList.add("dafult");
    //     }
    //     if (this.$el.getElementsByClassName("el-table__expand-icon--expanded")) {
    //       const open = this.$el.getElementsByClassName(
    //         "el-table__expand-icon--expanded"
    //       );
    //       for (let j = 0; j < open.length; j++) {
    //         open[j].classList.remove("dafult");
    //       }
    //       const dafult = this.$el.getElementsByClassName("dafult");
    //       for (let a = 0; a < dafult.length; a++) {
    //         dafult[a].click();
    //       }
    //     }
    //   }
    // },
    // close () {
    //   if (this.tableList.element.length != 0) {
    //     this.flag = true;
    //     this.flag1 = false;
    //     const elsopen = this.$el.getElementsByClassName(
    //       "el-table__expand-icon--expanded"
    //     );
    //     if (this.$el.getElementsByClassName("el-table__expand-icon--expanded")) {
    //       for (let i = 0; i < elsopen.length; i++) {
    //         elsopen[i].click();
    //       }
    //     }
    //   }
    // },
    cancel (flag) {
      this.visible = flag;
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
        await restore(this.SchemeId)
        groupTerms({
          analysisSchemeId: this.SchemeId
        }).then(res => {
          loading.close();
          iMessage.success('还原成功')
          this.chargeRetrieve({
            isDefault: true,
            viewType: 'all',
            schemaId: this.SchemeId,
            groupId: this.groupId
          });
        })
      }).catch(() => {
        loading.close();
        iMessage.error('还原失败')
        this.chargeRetrieve({
          isDefault: true,
          viewType: 'all',
          schemaId: this.SchemeId,
          groupId: this.groupId
        });
      });


    },
    sure (val, flag) {
      this.visible = flag;
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
      this.visible = true;
    },
    group () {
      update(this.formUpdata).then(res => {
        // iMessage.success("保存成功");
        this.totalTable = false;
        this.groupby = true;
        this.checkFLag = false
      })
    },
    groupBtn (e, result, activeName) {
      if (result.length === 0) {
        this.$message.error('请选择数据');
        return
      }
      this.visible1 = e;
      this.result = result
      this.activeName = activeName
      getGroupInfo({
        schemaId: this.SchemeId,
        code: activeName === 'rawUngrouped' ? '1' : '2'
      }).then(res => {
        this.options = res.data
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
              schemaId: this.SchemeId,
              groupId: this.groupId
            })
          });
          this.$refs.groupedTable.chargeRetrieve({
            isDefault: true,
            schemaId: this.SchemeId,
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
              schemaId: this.SchemeId,
              groupId: this.groupId
            })
          });
          this.$refs.groupedTable.chargeRetrieve({
            isDefault: true,
            schemaId: this.SchemeId,
            viewType: this.activeName === 'rawUngrouped' ? 'rawGrouped' : 'maGrouped',
            groupId: this.groupId
          })
          iMessage.error(res.desZh)
        }

      })
    },
    returnAcitiveName (val) {
      this.activeName = val
    },
    groupToList () {
      if (!this.value1) {
        this.$message.error('请选择分组');
        return
      }
      addComponentToGroup({
        groupId: this.value1.matchId,
        groupName: this.value1.groupName,
        roundDetailIdList: this.result
      }).then(res => {
        this.groupby = false
        // this.$refs.ungroupedTable.activeName = ""
        this.$nextTick(() => {
          this.groupby = true
          this.$refs.ungroupedTable.activeName = this.activeName
          this.$refs.ungroupedTable.chargeRetrieve({
            isDefault: true,
            viewType: this.activeName,
            schemaId: this.SchemeId,
            groupId: this.groupId
          })
        });
        this.$refs.groupedTable.chargeRetrieve({
          isDefault: true,
          schemaId: this.SchemeId,
          viewType: this.activeName === 'rawUngrouped' ? 'rawGrouped' : 'maGrouped',
          groupId: this.groupId
        })
        this.visible1 = false;
      })
    },
    handleChange (value) { },
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
          schemaId: this.SchemeId,
          groupId: this.groupId
        })
        this.$refs.ungroupedTable.chargeRetrieve({
          isDefault: true,
          viewType: this.activeName,
          schemaId: this.SchemeId,
          groupId: this.groupId
        })
      })
    },
    finish () {
      groupedSubmit({
        schemaId: this.SchemeId,
        groupId: this.groupId
      }).then((res) => {
        this.finishGroup()
      })
    },
    off () {
      groupedCancel({
        schemaId: this.SchemeId,
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
        schemaId: this.SchemeId,
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
            schemaId: this.SchemeId,
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
  width: 16%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $font-size16;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
