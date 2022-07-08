<!--
 * @Author: your name
 * @Date: 2021-06-21 10:50:38
 * @LastEditTime: 2022-03-08 11:26:41
 * @LastEditors: Please set LastEditors
 * @Description: 费用详情
 * @FilePath: \front-web\src\views\partsrfq\bobAnalysis\components\feeDetails.vue
-->
<template>
  <div v-loading="onDataLoading">
    <iCard :class="[onPreview ? 'preview-card' : '']">
      <template v-slot:header
                v-if="!onPreview">
        <div class="flex titleBox">
          <div class="flex-between-center">
            <span class="title">{{ language('FEIYONGXIANGQING', '费用详情') }}</span>
            <div class="wrap">
              <div v-if="remark"
                   class="margin-left40 remark">
                <span style="font-size:12px">{{ remark }}</span>
              </div>
              <div v-if="remark"
                   class="margin-left40 remark2">{{$t('备注')}}:{{ remark }}</div>
            </div>
          </div>
          <div>
            <template v-if="!isPreview">
              <iButton v-show="!allExpand"
                       @click="handleAllCollapse(true)">{{$t('MODEL-ORDER.LK_QUANBUZHANKAI')}}</iButton>
              <iButton v-show="allExpand"
                       @click="handleAllCollapse(false)">{{$t('MODEL-ORDER.LK_QUANBUSHOUQI')}}</iButton>
              <template v-if="!onGroupingModel">
                <iButton @click="remarks">{{$t('备注')}}</iButton>
                <iButton @click="reduction">{{$t('HUANYUAN')}}</iButton>
                <iButton @click="onGroupingModel = true"
                         v-if="!onGroupingModel">{{$t('SHUJUFENZU')}}</iButton>
                <iButton @click="down">{{$t('导出')}}</iButton>
              </template>
              <template v-else>
                <iButton @click="clear">{{$t('YICHU')}}</iButton>
                <iButton @click="saveGroup">{{$t('BAOCUNFENZU')}}</iButton>
                <iButton @click="cancelGroupMode">{{$t('QUXIAO')}}</iButton>
              </template>
            </template>
          </div>
        </div>
      </template>
      <div>
        <div style="display: flex;flex-flow: row nowrap;width: 100%;">
          <div class="table-cell"
               style="justify-content: flex-start;width: 20%"></div>
          <div v-for="(item, index) in tableTitle"
               :key="index"
               class="partCell"
               :style="{ 'font-weight': 'bold', width: 'calc(80% / ' + tableTitle.length + ')' }">
            <p style="margin:0 auto">{{ spiltStr(item.title)?spiltStr(item.title)[0]:item.title}}</p>
            <el-tooltip placement="top">
              <p slot="content"
                 effect="light">{{ spiltStr(item.title)?spiltStr(item.title)[1]:item.title }}</p>
              <p class="partCell">{{ spiltStr(item.title)?spiltStr(item.title)[1]:''}}</p>
            </el-tooltip>
          </div>
        </div>
        <div class="flex tabeleList"
             ref="cbdDetailTable">
          <div style="display:flex;flex-flow:column nowrap;">
            <template v-for="(item, index) in tableListData">
              <div 
                  :key="index"
                  style="display: flex;flex-flow: row nowrap;width: 100%;"
                  :class="decideRowClass(item, index)"
                  v-if="collapseItems.indexOf(item.id) < 0 && item.code != 'detailId'"
                  :id="item.id"
                  :root-id="item.rootId"
                  :parent-id="item.parentId"
                  :ref="!item.parentId ? item.id : ''">
                <template v-if="item.isBreakLine">
                  <span class="table-cell"
                        style="width: 100%;text-align:center;font-weight: bold;background-color: #1763F7;color: #fff;">
                    {{ $t('LK_NONGROUPEDBREAKTIPS', { msg: item.title }) }}
                  </span>
                </template>
                <template v-else>
                  <div :class="['table-cell', showCollapseOutLine(item)]"
                      :style="{ 'padding-left': 20 * item.level + 'px', 'justify-content': 'flex-start', width: '20%' }">
                    <i v-if="item.hasChild"
                      :class="item.expanded ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
                      style="cursor: pointer;padding-right: 4px;"
                      @click="handleCollapse(item, item.expanded)"></i>
                    <template v-if="item.matchId > 0 && !onPreview&& onGroupingModel">
                      <template v-if="onEditLabels.indexOf(item.id) < 0">
                        <span :style="{ 'font-weight': item.matchId > 0 ? 'bold' : '' }">{{ item.title }}</span>
                        <i class="el-icon-edit"
                          style="cursor: pointer;margin-left: 10px;"
                          @click.stop="changeToEditMode(item.id)"></i>
                      </template>
                      <el-input v-else
                                v-model="item.title">
                        <template slot="append">
                          <i class="el-icon-check"
                            @click.stop="updateGroupedLabel(item)"
                            style="cursor: pointer;"></i>
                        </template>
                      </el-input>
                    </template>
                    <template v-else>
                      <span :title="item.title"
                            class="title-cell"
                            :style="{ 'font-weight': (item.matchId < 0 && item.level == 1) || item.level == 0 ? 'bold' : '' }">
                        {{ item.title }}
                      </span>
                    </template>
                  </div>
                  <div :class="['table-cell', hasSelected(item, titleIdx) ? 'cell-selected' : '', showCollapseOutLine(item)]"
                      v-for="(title, titleIdx) in tableTitle"
                      :key="titleIdx"
                      :style="{ width: 'calc(80% / ' + tableTitle.length + ')' }">
                    <el-checkbox v-show="onGroupingModel"
                                v-if="item.groupKey && item['label#' + titleIdx]"
                                style="margin-right: 10px;"
                                v-model="item['checked#' + titleIdx]"
                                @change="function(checked){onGroupItemSelected(checked, item, titleIdx)}"></el-checkbox>
                    {{
                      item['label#' + titleIdx] == 'false'
                        ? $t('nominationLanguage.No')
                        : item['label#' + titleIdx] == 'true'
                        ? $t('nominationLanguage.Yes')
                        : formatIfNumber(item['label#' + titleIdx])
                    }}
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
      <iDialog :visible.sync="groupToDialogVisible"
               :title="$t('FENZUZHI')"
               width="20%">
        <el-form>
          <el-form-item :label="$t('FENZUZHI')">
            <el-select v-model="selectGroupName"
                       clearable
                       :placeholder="$t('QINGXUANZE')"
                       value-key="matchId">
              <el-option v-for="item in groupNameOptions"
                         :key="item.matchId"
                         :label="item.groupName"
                         :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="groupToList">{{$t('QUEDING')}}</el-button>
        </span>
      </iDialog>
      <remarkDialog :visible="remarkDialogVisible"
                    @remake="sure"
                    @cancel="cancel"></remarkDialog>
    </iCard>
  </div>
</template>

<script>
import { icon, iCard, iButton, iDialog, iMessage } from 'rise';
import tree from './tree';
import remarkDialog from './components/remarkDialog.vue';
import ungroupedTable from '@/views/partsrfq/bob/bobAnalysis/ungroupedTable.vue';
import groupedTable from '@/views/partsrfq/bob/bobAnalysis/groupedTable.vue';
import {
  chargeRetrieve,
  getRfqToRemark,
  down,
  getGroupInfo,
  addComponentToGroup,
  groupTerms,
  groupedCancel,
  groupedSubmit,
  restore,
  removeComponentFromGroup,
  renameComponentGroup,
} from '@/api/partsrfq/bob';
import { update } from '@/api/partsrfq/bob/analysisList';
import { groupByList, ungroupByList, ungroupByHeader } from './components/data.js';

export default {
  inheritAttrs: true,
  components: {
    icon,
    iCard,
    iDialog,
    iButton,
    tree,
    ungroupedTable,
    groupedTable,
    remarkDialog,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    formUpdata: {
      type: Object,
      default: () => {
        return {};
      },
    },
    propSchemeId: {
      type: String,
      default: '',
    },
    propGroupId: {
      type: String,
      default: '',
    },
    onPreview: {
      type: Boolean,
      default: false,
    },
    // 是否预览
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      onDataLoading: false,
      editGroupedLabel: [],
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
      remark: '',
      groupby: false,
      totalTable: true,
      value: '',
      selectGroupName: '',
      groupNameOptions: [],
      result: [],
      activeName: '',
      checkFLag: true,
      schemaId: '',
      expedsArr: [],
      expedsArr1: [],
      tableTitle: [],
      tableListData: [],
      collapseItems: [],
      onGroupingModel: false,
      groupSelectedItems: [],
      cbdSelectedList: [],
      onEditLabels: [],
      suppliers: [],
      subCbdDetails: {},
      subCbdDetailShowPositions: [],
      removeCbdIds: [],
    };
  },
  computed: {
    spiltStr () {
      return function (val) {
        if (val.indexOf('<br/>') > -1) {
          return val.split('<br/>')
        }
      }
    }
  },
  created () {
    if (this.$route.query.groupId) {
      this.groupId = this.$route.query.groupId;
    } else {
      this.groupId = this.propGroupId;
    }
    if (this.$route.query.chemeId) {
      this.schemaId = this.$route.query.chemeId;
    } else {
      this.schemaId = this.propSchemeId;
    }

    this.getRfqToRemark();
  },
  watch: {
    activeName: {
      handler (val) {
        console.log(val, 'acitve');
      },
    },
    label: {
      handler (val) {
        this.$nextTick(function () {
          this.tableListData.forEach((item) => {
            if (item.title == val) {
              this.$refs[item.id][0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
        });
      },
    },
  },
  methods: {
    formatIfNumber (val) {
      if (!val) {
        return val;
      }
      if (this.isNumber(val.toString())) {
        return val.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
      } else {
        return val;
      }
    },
    isNumber (val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    showCollapseOutLine (item) {
      // if (item.level == 0) {
      //   return 'collapse-root'
      // } else {
      return item.level == 1 && typeof item.matchId != 'undefined' ? 'collapse-group' : '';
      // }
    },
    changeToEditMode (id) {
      this.onEditLabels.push(id);
    },
    onPreviewStyle () {
      if (this.onPreview) {
        return {
          boxShadow: 'none',
        };
      }
      return {};
    },
    decideRowClass (row, idx) {
      var displayed = this.tableListData.filter((item) => {
        return this.collapseItems.indexOf(item.id) < 0 && item.code != 'detailId';
      });

      var realIndex = -1;
      displayed.forEach((item, index) => {
        if (item.id == row.id) {
          realIndex = index;
        }
      });

      return realIndex % 2 == 0 ? 'table-odd' : 'table-even';
    },
    handleAllCollapse (expandAll) {
      this.allExpand = !this.allExpand;
      // if (!expandAll) this.collapseItems = [];
      this.tableListData.forEach((item) => {
        if (!item.parentId) {
          this.handleCollapse(item, !expandAll);
        }
        item.expanded = expandAll;
      });
    },
    handleCollapse (item, isExpand) {
      this.collapseItem(item.id, isExpand);
      item.expanded = !isExpand;
    },
    collapseItem (parentId, isCollapse) {
      this.tableListData.forEach((item) => {
        if (isCollapse) {
          if (item.parentId && item.parentId == parentId) {
            if (this.collapseItems.indexOf(item.id) < 0) {
              this.collapseItems.push(item.id);
              if (item.hasChild) {
                this.collapseItem(item.id, isCollapse);
                item.expanded = !isCollapse;
              }
            }
          }
        } else {
          if (item.parentId && item.parentId == parentId) {
            if (this.collapseItems.indexOf(item.id) >= 0) {
              this.collapseItems.splice(this.collapseItems.indexOf(item.id), 1);
              if (item.hasChild) {
                this.collapseItem(item.id, isCollapse);
                item.expanded = !isCollapse;
              }
            }
          }
        }
      });
    },
    cancelGroupMode () {
      this.clearGrouped();
      this.onGroupingModel = false;
    },
    clearGrouped () {
      this.tableListData.forEach((item) => {
        for (var key in item) {
          if (key.indexOf('checked#') >= 0) {
            Vue.set(item, key, false);
          }
        }
      });
      this.groupSelectedItems = [];
      this.cbdSelectedList = [];
      // this.onGroupingModel = false;
    },
    onGroupItemSelected (checked, item, idx) {
      console.log(checked, item, idx)
      var parent = this.tableListData.filter((line) => {
        return line.id == item.parentId;
      });
      if (parent.length > 0 && parent[0].matchId > 0) {
        var cbd = this.tableListData.filter((line) => {
          return line.parentId == item.parentId && line.code == 'detailId';
        });
        this.removeCbdIds.push(cbd[0]['label#' + idx]);
      }
      if (checked) {
        if (
          this.groupSelectedItems.some((obj) => {
            return obj.idx == idx && item.rootId == obj.rootId;
          })
        ) {
          Vue.set(item, 'checked#' + idx, false);
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
              groupId: groupId,
            });
            if (obj.code === 'detailId') {
              this.cbdSelectedList.push(obj['label#' + idx]);
            }
          } else if (obj.parentId == item.parentId) {
            this.groupSelectedItems.push({
              id: obj.id,
              idx: idx,
              rootId: obj.rootId,
              parentId: obj.parentId,
              groupId: groupId,
            });
            if (obj.code === 'detailId') {
              this.cbdSelectedList.push(obj['label#' + idx]);
            }
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx, groupId);
            }
          }
        });
      } else {
        this.tableListData.forEach((obj) => {
          if (obj.id == item.parentId) {
            for (var i = this.groupSelectedItems.length - 1; i >= 0; i--) {
              if (this.groupSelectedItems[i].id == obj.id && this.groupSelectedItems[i].idx == idx) {
                this.groupSelectedItems.splice(i, 1);
              }
            }
            this.cbdSelectedList.splice(idx - 1, 1);
          } else if (obj.parentId == item.parentId) {
            for (var i = this.groupSelectedItems.length - 1; i >= 0; i--) {
              if (this.groupSelectedItems[i].id == obj.id && this.groupSelectedItems[i].idx == idx) {
                this.groupSelectedItems.splice(i, 1);
              }
            }
            this.cbdSelectedList.splice(idx - 1, 1);
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx);
            }
          }
        });
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
              groupId: groupId,
            });
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx);
            }
          }
        });
      } else {
        this.tableListData.forEach((obj) => {
          if (obj.parentId == item.id) {
            for (var i = this.groupSelectedItems.length - 1; i >= 0; i--) {
              if (this.groupSelectedItems[i].id == obj.id && this.groupSelectedItems[i].idx == idx) {
                this.groupSelectedItems.splice(i, 1);
              }
            }
            if (obj.hasChild) {
              this.iterateChilds(checked, obj, idx);
            }
          }
        });
      }
    },
    hasSelected (item, idx) {
      return this.groupSelectedItems.some((obj) => {
        return obj.id == item.id && idx == obj.idx;
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
      this.onDataLoading = true;
      chargeRetrieve(params)
        .then((allDatas) => {
          try {
            if (allDatas.code && allDatas.code !== '200') return iMessage.error(allDatas.desZh)
            this.tableList = allDatas;
            this.tableTitle = this.tableList.title.filter((item) => item.title);
            this.reContructData();
            this.$nextTick(() => {
              this.onDataLoading = false;
            });

          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh);
        });
    },
    createUuid () {
      var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    },
    reContructData () {
      var a = new Date().getTime();
      this.tableListData = [];
      this.suppliers = [];
      var titles = this.tableList.title;

      titles.forEach((supplier) => {
        if (supplier.label != 'title') {
          this.suppliers.push(supplier.label);
        }
      });

      this.reBuild('1', 'rawUngroupedChild');
      this.reBuild('2', 'maUngroupedChild');
      this.addOrigin();

      var b = new Date().getTime();
    },
    reBuild (code, prop) {
      this.subCbdDetails = {};
      this.subCbdDetailShowPositions = [];
      var elements = this.tableList.element;
      var rootTitle;
      elements.forEach((cbdLvlZero) => {
        if (cbdLvlZero.code == code) {
          rootTitle = cbdLvlZero.title;
          this.processGroupDatas(cbdLvlZero, this.addCategory(cbdLvlZero));
        }
      });

      this.insertGroupedArr();
      if (this.subCbdDetailShowPositions.length > 0) {
        this.subCbdDetailShowPositions.push(['breakLine']);
      }
      this.insertUnGroupedArr(prop);
      this.addToTable(rootTitle);
    },
    processGroupDatas (cbdLvlZero, rootId) {
      if (!cbdLvlZero.child || cbdLvlZero.child.length <= 0) {
        return;
      }
      cbdLvlZero.child.forEach((cbdHead) => {
        this.suppliers.forEach((supplier) => {
          var cbdId = this.findCbdId(cbdHead, supplier);
          if (cbdId) {
            var isArray = Array.isArray(cbdId);
            if (!isArray) {
              cbdId = [cbdId];
            }
            cbdId.forEach((cbdSubId, idx) => {
              if (!this.subCbdDetails[cbdSubId]) {
                this.subCbdDetails[cbdSubId] = [];
              }

              var cbdDetailHead = this.createDetailHead(cbdHead, supplier, isArray ? idx : -1, rootId, rootId, 1);
              this.setCollapse(cbdHead, cbdDetailHead);
              this.subCbdDetails[cbdSubId].push(cbdDetailHead);

              if (cbdHead.child && cbdHead.child.length > 0) {
                this.createDetail(cbdHead, cbdSubId, supplier, isArray ? idx : -1, rootId, cbdDetailHead.id, 2);
              }
            });
          }
        });
      });
    },
    findCbdId (cbdLvlZeroHead, supplier) {
      if (!cbdLvlZeroHead.child || cbdLvlZeroHead.child.length < 0) {
        return;
      }
      for (var i = 0; i < cbdLvlZeroHead.child.length; i++) {
        if (cbdLvlZeroHead.child[i].code == 'detailId') {
          return cbdLvlZeroHead.child[i][supplier];
        }
      }
      return;
    },
    createDetail (cbdHead, cbdId, supplier, index, rootId, parentId, level) {
      var nextLevel = level + 1;
      cbdHead.child.forEach((child) => {
        var temp = this.createNewCbdDetailLine(child.code, child.title, rootId, parentId);
        temp[supplier] = index >= 0 ? child[supplier][index] : child[supplier];
        temp.level = level;
        if (temp.code == 'ogt' || temp.code == '206') {
          temp.groupKey = true;
          this.suppliers.forEach((supp) => {
            temp['checked#' + supp.replace('label#', '')] = false;
          });
        }
        this.setCollapse(child, temp);
        this.subCbdDetails[cbdId].push(temp);
        if (child.child && child.child.length > 0) {
          this.createDetail(child, cbdId, supplier, index, rootId, temp.id, nextLevel);
        }
      });
    },
    createDetailHead (cbdHead, supplier, index, rootId, parentId, level) {
      var cbdDetailHead = this.createNewCbdDetailLine(cbdHead.code, cbdHead.title, rootId, parentId);
      cbdDetailHead[supplier] = index >= 0 ? cbdHead[supplier][index] : cbdHead[supplier];
      cbdDetailHead.matchId = cbdHead.matchId;
      cbdDetailHead.level = level;
      return cbdDetailHead;
    },
    createNewCbdDetailLine (code, title, rootId, parentId) {
      var temp = {
        code: code,
        title: title,
        id: this.createUuid(),
        rootId: rootId,
        parentId: parentId,
      };

      return temp;
    },
    addOrigin () {
      var elements = this.tableList.element;
      elements.forEach((cbdLvlZero) => {
        if (cbdLvlZero.code < '3') {
          return false;
        }
        var rootId = this.addCategory(cbdLvlZero);
        this.addSub(cbdLvlZero, rootId, rootId, 1);
      });
    },
    addSub (parent, rootId, parentId, level) {
      if (!parent.child || parent.child.length <= 0) {
        return;
      }
      var nextLevel = level + 1;
      parent.child.forEach((cbdDetail) => {
        var lvlItem = this.createNewCbdDetailLine(cbdDetail.code, cbdDetail.title, rootId, parentId);
        lvlItem.id = this.createUuid();
        lvlItem.level = level;
        this.setCollapse(cbdDetail, lvlItem);
        for (var key in cbdDetail) {
          if (key.indexOf('label#') >= 0) {
            lvlItem[key] = cbdDetail[key];
          }
        }
        this.tableListData.push(lvlItem);
        this.addSub(cbdDetail, rootId, lvlItem.id, nextLevel);
      });
    },
    setCollapse (ref, item) {
      if (ref.child && ref.child.length > 0) {
        item.hasChild = true;
        item.expanded = true;
      }
    },
    addCategory (cbdLvlZero) {
      var lvlZero = JSON.parse(JSON.stringify(cbdLvlZero));
      lvlZero.id = this.createUuid();
      lvlZero.level = 0;
      lvlZero.hasChild = true;
      lvlZero.expanded = true;
      this.tableListData.push(lvlZero);
      return lvlZero.id;
    },
    addToTable (rootTitle) {
      this.subCbdDetailShowPositions.forEach((line) => {
        var lineDatas;
        line.forEach((cbdId) => {
          if (!cbdId) {
            return false;
          }
          if (cbdId == 'breakLine') {
            lineDatas = [];
            var rootId = this.tableListData[this.tableListData.length - 1].rootId;
            lineDatas.push({
              id: this.createUuid(),
              isBreakLine: true,
              rootId: rootId,
              parentId: rootId,
              title: rootTitle,
            });
            return false;
          }
          if (!lineDatas) {
            lineDatas = this.subCbdDetails[cbdId];
          } else {
            if (!this.subCbdDetails[cbdId]) {
              return false;
            }
            this.subCbdDetails[cbdId].forEach((item, idx) => {
              for (var key in item) {
                if (key.indexOf('label#') >= 0) {
                  lineDatas[idx][key] = item[key];
                }
              }
            });
          }
        });
        if (lineDatas && lineDatas.length > 0) {
          var tempData = [];
          lineDatas.forEach((item) => {
            var allEmpty = true;
            for (var key in item) {
              if (key.indexOf('label#') >= 0 && (item[key] || item.hasChild)) {
                allEmpty = false;
                break;
              }
            }
            if (!allEmpty) {
              tempData.push(item);
            }
          });
          for (var i = tempData.length - 1; i >= 0; i--) {
            if (tempData[i].hasChild) {
              var filtered = tempData.filter((child) => {
                return child.parentId == tempData[i].id
              })
              if (filtered.length == 0) {
                var allEmpty = true;
                for (var key in tempData[i]) {
                  if (key.indexOf('label#') >= 0 && tempData[i][key]) {
                    allEmpty = false;
                    break;
                  }
                }
                if (allEmpty) {
                  tempData.splice(i, 1)
                }
              }
            }
          }
          tempData.forEach((item) => {
            this.tableListData.push(item)
          })
        }
      });
    },
    insertGroupedArr () {
      var cbdMatchArr = {};
      for (var cbdId in this.subCbdDetails) {
        var matchItem = this.subCbdDetails[cbdId].filter((item) => {
          return item.matchId > 0;
        });
        if (matchItem.length <= 0) {
          continue;
        }
        if (!cbdMatchArr[matchItem[0].matchId]) {
          cbdMatchArr[matchItem[0].matchId] = [];
        }

        this.suppliers.forEach((supplier, idx) => {
          if (matchItem[0][supplier]) {
            cbdMatchArr[matchItem[0].matchId][idx] = cbdId;
          } else {
            if (!cbdMatchArr[matchItem[0].matchId][idx]) {
              cbdMatchArr[matchItem[0].matchId][idx] = '';
            }
          }
        });
      }

      if (cbdMatchArr.length <= 0) {
        return;
      }
      var matchIds = Object.keys(cbdMatchArr);
      matchIds.sort();
      matchIds.forEach((matchId) => {
        this.subCbdDetailShowPositions.push(cbdMatchArr[matchId]);
      });
    },
    insertUnGroupedArr (prop) {
      var max = 0;
      var titles = this.tableList.title;

      titles.forEach((supplier) => {
        if (supplier.label == 'title') {
          return false;
        }

        if (max < supplier[prop].length) {
          max = supplier[prop].length;
        }
      });

      for (var j = 0; j < max; j++) {
        var temp = [];
        for (var i = 1; i < titles.length; i++) {
          if (titles[i][prop][j]) {
            temp.push(titles[i][prop][j]);
          } else {
            temp.push('');
          }
        }
        this.subCbdDetailShowPositions.push(temp);
      }
    },
    handleChange (val) {
      console.log(val, 'val');
    },
    cancel (flag) {
      this.remarkDialogVisible = flag;
    },
    reduction () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      this.$confirm('是否还原？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await restore(this.schemaId);
          groupTerms({
            analysisSchemeId: this.schemaId,
          }).then((res) => {
            loading.close();
            iMessage.success('还原成功');
            this.chargeRetrieve({
              isDefault: true,
              viewType: 'all',
              schemaId: this.schemaId,
              groupId: this.groupId,
            });
            this.editGroupedLabel = [];
          });
        })
        .catch(() => {
          loading.close();
          iMessage.error('还原失败');
          this.chargeRetrieve({
            isDefault: true,
            viewType: 'all',
            schemaId: this.schemaId,
            groupId: this.groupId,
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
    saveGroup () {
      if (this.groupSelectedItems.length === 0 || !this.schemaId) {
        this.$message.error('请选择数据');
        return;
      }
      this.groupToDialogVisible = true;
      getGroupInfo({
        schemaId: this.schemaId,
        code: '1',
      }).then((res) => {
        if (res.data) {
          res.data.forEach((matchId) => {
            if (!matchId.matchId) {
              if (
                res.data.some((item) => {
                  return matchId.groupName == item.groupName;
                })
              ) {
                matchId.groupName = matchId.groupName + res.data.length;
              }
            }
          });
        }
        this.groupNameOptions = res.data;
      });
    },
    groupToList () {
      if (!this.selectGroupName) {
        this.$message.error('请选择分组');
        return;
      }
      this.onDataLoading = true;
      addComponentToGroup({
        schemeId: this.schemaId,
        groupId: this.selectGroupName.matchId || '',
        groupName: this.selectGroupName.groupName,
        roundDetailIdList: this.cbdSelectedList,
      }).then((res) => {
        this.groupby = false;
        this.clearGrouped();
        this.groupToDialogVisible = false;
        this.$emit("groupToList", true)
        // this.chargeRetrieve({
        //   isDefault: true,
        //   viewType: 'all',
        //   schemaId: this.schemaId,
        //   groupId: this.groupId,
        // });
        // this.onGroupingModel = false;
        this.onDataLoading = false;
      });
      return;
    },
    refreshGroupedId (groupedDatas, key, index) {
      var newId = this.createUuid();
      if (groupedDatas[key][index].hasChild) {
        this.refreshChildGroupid(groupedDatas, key, groupedDatas[key][index].id, newId);
      }
      groupedDatas[key][index].id = newId;
    },
    refreshChildGroupid (groupedDatas, key, parentId, newParentId) {
      groupedDatas[key].forEach((item) => {
        if (item.parentId == parentId) {
          var newId = this.createUuid();
          if (item.hasChild) {
            this.refreshChildGroupid(groupedDatas, key, item.id, newId);
          }
          item.id = newId;
          item.parentId = newParentId;
        }
      });
    },

    clear () {
      this.onDataLoading = true;
      removeComponentFromGroup({
        schemeId: this.schemaId,
        roundDetailIdList: this.removeCbdIds,
      }).then((res) => {
        if (res?.code === '200') {
          this.removeCbdIds = [];
          this.chargeRetrieve({
            isDefault: true,
            viewType: 'all',
            schemaId: this.schemaId,
            groupId: this.groupId,
          });
        } else {

          iMessage.error(res.desZh)
        }
        this.onDataLoading = false;
      });
    },

    finish () {
      groupedSubmit({
        schemaId: this.schemaId,
        groupId: this.groupId,
      }).then((res) => {
        this.finishGroup();
      });
    },
    off () {
      groupedCancel({
        schemaId: this.schemaId,
        groupId: this.groupId,
      }).then((res) => {
        this.finishGroup();
      });
    },
    finishGroup () {
      this.totalTable = true;
      this.groupby = false;
      this.checkFLag = true;
      this.chargeRetrieve({
        isDefault: true,
        viewType: 'all',
        schemaId: this.schemaId,
        groupId: this.groupId,
      });
    },
    down () {
      this.formUpdata.remark = this.remark;
      // this.formUpdata.defaultBobOptions.replaceAll("▼","")
      this.$confirm('此次导出将默认保存当前”费用详情“界面数据。', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        update(this.formUpdata).then((res) => {
          iMessage.success('保存成功');
          down({
            schemaId: this.schemaId,
          }).then((res) => { });
        });
      });
    },

    updateGroupedLabel (item) {
      this.onDataLoading = true;
      renameComponentGroup({
        groupId: item.matchId,
        groupName: item.title,
        schemaId: this.schemaId,
      })
        .then((res) => {
          if (res.code === '200') {
            iMessage.success('修改成功');
            this.onEditLabels.splice(this.onEditLabels.indexOf(item.id), 1);
            this.chargeRetrieve({
              isDefault: true,
              viewType: 'all',
              schemaId: this.schemaId,
              groupId: this.groupId,
            });
          } else {
            iMessage.error(res.desZh);
          }
          this.onDataLoading = false;
        })
        .catch((error) => {
          iMessage.error('修改失败');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.titleBox {
  justify-content: space-between;
}
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
.partCell {
  height: 41px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-size: $font-size16;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
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
.preview-card {
  box-shadow: none !important;
}
.title-cell {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.collapse-group {
  border-top: 3px solid #1763f7;
}
.collapse-root {
  border-top: 3px solid #1763f7;
}
</style>
