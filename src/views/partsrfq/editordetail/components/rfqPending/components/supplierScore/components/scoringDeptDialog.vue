<template>
  <iDialog class="dialog" :title="$t('LK_SHEZHIPINGFENBUMEN')" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="body">
      <div class="control" id="control">
        <iButton @click="handleAdd" v-if="!customAction">{{ $t('LK_XINZENG') }}</iButton>
        <iButton @click="handleDelete" v-if="!customAction">{{ $t('LK_SHANCHU') }}</iButton>
        <iButton @click="handleRecover" v-if="!customAction">{{ $t('LK_HUIFU') }}</iButton>
        <iButton @click="handleSave" :loading="saveLoading">{{ $t('LK_BAOCUN') }}</iButton>
      </div>
      <tableList index height="83%" class="table margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" :cellClassName="deleteLine" @handleSelectionChange="handleSelectionChange">
        <template #rateDepart="scope">
          <iSelect v-model="scope.row.rateDepart" :disabled="scope.row.deleteStatus || customAction" @change="handleClearAll(scope.row)">
            <el-option v-for="(item, $index) in Object.keys(deptScoringMap)" :key="$index" :label="item" :value="item"></el-option>
          </iSelect>
        </template>
        <template #rateDepartNum="scope">
          <iSelect v-if="scope.row.rateDepart" v-model="scope.row.rateDepartNum" :disabled="scope.row.deleteStatus || customAction" @change="handleClearCoordinatorAndRater(scope.row)">
            <el-option v-for="(item, $index) in Object.keys(deptScoringMap[scope.row.rateDepart])" :key="$index" :label="item" :value="item"></el-option>
          </iSelect>
        </template>
        <template #raterId="scope"> <!-- right 评分人 -->
          <iSelect v-if="scope.row.rateDepartNum" v-model="scope.row.raterId" :disabled="scope.row.deleteStatus" @change="handleChange($event, deptScoringMap[scope.row.rateDepart][scope.row.rateDepartNum].right, scope.row, 'rater')">
            <el-option v-for="(item, $index) in deptScoringMap[scope.row.rateDepart][scope.row.rateDepartNum].right" :key="$index" :label="item.nameZh" :value="item.id"></el-option>
          </iSelect>
        </template>
        <template #coordinatorId="scope"> <!-- left 评分人 -->
          <iSelect v-if="scope.row.rateDepartNum" v-model="scope.row.coordinatorId" :disabled="scope.row.deleteStatus" @change="handleChange($event, deptScoringMap[scope.row.rateDepart][scope.row.rateDepartNum].left, scope.row, 'coordinator')">
            <el-option v-for="(item, $index) in deptScoringMap[scope.row.rateDepart][scope.row.rateDepartNum].left" :key="$index" :label="item.nameZh" :value="item.id"></el-option>
          </iSelect>
        </template>
      </tableList>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from '@/components'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { scoringDeptTitle as tableTitle } from './data'
import { getAllScoringDepartmentInfo, getRaterAndCoordinatorByDepartmentId, setRaterAndCoordinatorByDepartmentId } from '@/api/partsrfq/editordetail'
import { pageMixins } from '@/utils/pageMixins'
import store from '@/store'

export default {
  components: { tableList, iDialog, iSelect, iButton },
  mixins: [ pageMixins ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    ids: {
      type: Array
    },
    customAction: {
      type: Boolean
    }
  },
  watch: {
    visible(nv) {
      if (nv && this.ids.length) {
        this.getAllScoringDepartmentInfo()
        this.getRaterAndCoordinatorByDepartmentId()
      } else {
        this.tableListData = []
        this.$emit('update', this.isUpdate)
      }
      this.$emit('update:visible', nv)
    },
  },
  created() {
    if (this.customAction) {
      this.tableTitle = this.tableTitle.filter(title => title.props !== 'coordinatorId')
    } else {
      this.getAllScoringDepartmentInfo()
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      deptScoringMap: {},
      saveLoading: false,
      isUpdate: false
    }
  },
  methods: {
    // 获取下拉列表值
    getAllScoringDepartmentInfo() {
      getAllScoringDepartmentInfo({
        rfqId: this.ids
      })
        .then(res => {
          if (res.code == 200) {
            this.deptScoringMap = res.data || {}
            console.log(this.deptScoringMap)
            // return
            this.deptScoringMap = {
              "技术部门": {
                "purchase_2": {
                  "left": [
                    {
                      nameZh: "王源源",
                      id: "52",
                      tagName: "技术部门"
                    }
                  ],
                  "right": [
                    {
                      nameZh: "姜谷兰",
                      id: "52",
                      tagName: "技术部门"
                    }
                  ]
                },
                "WS1QQCGGA": {
                  "left": [
                    {
                      nameZh: "宁勇男",
                      id: "44",
                      tagName: "技术部门"
                    }
                  ],
                  "right": [
                    {
                      nameZh: "谈和玉",
                      id: "45",
                      tagName: "技术部门"
                    }
                  ]
                }
              },
              "质量部门": {
                "purchase_pro_2": {
                  "left": [
                    {
                      nameZh: "刘发",
                      id: "42",
                      tagName: "质量部门"
                    }
                  ],
                  "right": [
                    {
                      nameZh: "刘财",
                      id: "43",
                      tagName: "质量部门"
                    }
                  ]
                },
                "WS1QQCGGB": {
                  "left": [
                    {
                      nameZh: "须奇水",
                      id: "46",
                      tagName: "质量部门"
                    }
                  ],
                  "right": [
                    {
                      nameZh: "冉兴腾",
                      id: "47",
                      tagName: "质量部门"
                    }
                  ]
                }
              }
            }
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        })
        .catch(() => {})
    },
    // 获取已保存的评分部门
    getRaterAndCoordinatorByDepartmentId() {
      this.loading = true

      getRaterAndCoordinatorByDepartmentId({
        rfqId: this.ids
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = res.data
          // this.tableListData = [
            // {},
            // {},
            // {},
            // {}
          // ]
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    handleAdd() {
      this.tableListData.push({})
    },
    // 前端样式删除（删除数据不传给后端，保存后刷新数据重绘掉）
    handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('LK_QINGXUANZEXUYAOSHANCHUDEPINGFENBUMEN'))

      this.multipleSelection.forEach(item => this.$set(item, 'deleteStatus', true))
    },
    deleteLine({ row }) {
      if (row.deleteStatus) return 'deleteLine'
    },
    // 前端样式恢复
    handleRecover() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('LK_QINGXUANZEXUYAOHUIFUDEPINGFENBUMEN'))

      this.multipleSelection.forEach(item => this.$set(item, 'deleteStatus', false))
    },
    handleChange(val, list, row, key) {
      for (let i = 0, item; (item = list[i++]); ) {
        if (item.id == val) {
          this.$set(row, key, item.nameZh)
          this.$set(row, 'tagName', item.tagName)
        }
      }
    },
    handleClearAll(row) {
      const keys = ['coordinator', 'coordinatorId', 'rateDepartNum', 'rater', 'raterId', 'tagName']
      keys.forEach(key => this.$set(row, key, undefined))
    },
    handleClearCoordinatorAndRater(row) {
      const keys = ['coordinator', 'coordinatorId', 'rater', 'raterId', 'tagName']
      keys.forEach(key => this.$set(row, key, undefined))
    },
    handleSave() {
      const list = this.tableListData.filter(item => !item.deleteStatus)
      // if (!list.length) return

      for (let i = 0, item; (item = list[i++]);) {
        if (!item.coordinatorId || !item.raterId || !item.rateDepart || !item.rateDepartNum) {
          return iMessage.warn(this.$t('LK_QINGXUANZEWANSHUJUZAIZUOBAOCUN'))
        }
      }

      if (this.customAction) {
        this.$emit('handleSave', list)
        return
      }

      this.saveLoading = true

      setRaterAndCoordinatorByDepartmentId(
        {
          rfqId: this.ids[0],
          setRateAndCoordinatorDTOS: list.map(item => ({
            coordinator: item.coordinator,
            coordinatorId: item.coordinatorId,
            rateDepart: item.rateDepart,
            rateDepartNum: item.rateDepartNum,
            rater: item.rater,
            raterId: item.raterId,
            rfqId: this.ids[0],
            tagName: item.tagName,
            userId: store.state.permission.userInfo.id
          }))
        }
      )
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getRaterAndCoordinatorByDepartmentId()
          this.isUpdate = true // 用于判断是否有数据更新
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }

        this.saveLoading = false
      })
      .catch(() => this.saveLoading = false)
    },
    setSaveLoading(val) {
      this.saveLoading = val
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .control {
    text-align: right;
  }

  ::v-deep .el-dialog {
    width: 1500px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
       @include pdtb(28px, 28px);
    }
  }

  .table {
    ::v-deep .deleteLine:not(.el-table-column--selection)::after {
      content: no-open-quote;
      position: absolute;
      top: 51%;
      left: 0;
      width: 100%;
      border-bottom: 1px solid $color-blue;
    }
  }
}
</style>