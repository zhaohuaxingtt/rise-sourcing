<!--
 * @Author: your name
 * @Date: 2021-06-17 13:44:35
 * @LastEditTime: 2021-09-13 14:21:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configscoredept\index.vue
-->
<template>
  <iPage class="configscoredept">
    <div class="header clearFloat">
      <div class="title">{{ language("PEIZHIPINGFENBUMEN", "配置评分部门") }}</div>
      <div class="control">
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iSearch
      class="margin-top25"
      icon
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="language('BUMENBIANHAO', '部门编号')">
          <iSelect
            v-model="form.rateDepartNum"
            :placeholder="language('QINGXUANZEBUMENBIANHAO', '请选择部门编号')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in rateDepartNumOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('BUMENPINGFENLEIXING', '部门评分类型')">
          <iSelect
            v-model="form.rateTag"
            :placeholder="language('QINGXUANZEBUMENPINGFENLEIXING', '请选择部门评分类型')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in scoreDeptOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <template v-slot:header-control>
        <iButton v-if="!editStauts" @click="editStauts = true">{{ language("BIANJI", "编辑") }}</iButton>
        <div v-else>
          <iButton @click="handleCloseEdit">{{ language("JIESHUBIANJI", "结束编辑") }}</iButton>
          <iButton :loading="saveLoading" @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
          <iButton @click="handleRecovery">{{ language("HUIFU", "恢复") }}</iButton>
          <iButton @click="handleAdd">{{ language("XINZENGHANG", "新增行") }}</iButton>
          <iButton :loading="deleteLoading" @click="handleDelete">{{ language("SHANCHUHANG",  "删除行") }}</iButton>
        </div>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="100%"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #rateTag="scope">
            <iSelect
              v-if="editStauts"
              v-model="scope.row.rateTag"
              :placeholder="language('QINGXUANZEBUMENPINGFENLEIXING', '请选择部门评分类型')"
              class="deptScoreTypeSelect"
              @change="handleChangeByRateTag($event, scope.row)"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in scoreDeptOptions"
                :key="item.key"
              ></el-option>
            </iSelect>
            <span v-else>{{ scope.row.rateTagDesc }}</span>
          </template>
          <template #rateDepartNum="scope">
            <iInput v-if="editStauts" class="deptNumSelect" :placeholder="language('QINGXUANZEBUMENBIANHAO', '请选择部门编号')" v-model="scope.row.rateDepartNum" readonly @click.native="handleSelectDeptNum(scope.row)">
              <div class="inputSearchIcon" slot="suffix">
                <icon symbol name="iconshaixuankuangsousuo" />
              </div>
            </iInput>
            <span v-else>{{ scope.row.rateDepartNum }}</span>
          </template>
          <template #isCheck="scope">
            <iSelect
              v-if="editStauts"
              v-model="scope.row.isCheck"
              :placeholder="language('QINGXUANZE', '请选择')"
              class="isAuditSelect"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in isAuditOptions"
                :key="item.key"
              ></el-option>
            </iSelect>
            <span v-else>{{ scope.row.isCheck | isCheckFilter }}</span>
          </template>
        </tableList>
      </div>
    </iCard>
    <deptDialog :visible.sync="deptDialogVisible" @confrim="selectDeptNum" :filterDeptNums="tableListData.map(item => item.rateDepartNum)" />
  </iPage>
</template>

<script>
import { iPage, icon, iSearch, iSelect, iCard, iButton, iInput, iMessage } from "rise"
import logButton from "@/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import deptDialog from "./components/deptDialog"
import filters from "@/utils/filters"
import { queryForm, tableTitle } from "./components/data"
import { cloneDeep, isEqual } from "lodash"
import { getDictByCode } from "@/api/dictionary"
import { getRfqRateDeparts, saveRfqRateDeparts, deleteRfqRateDeparts } from "@/api/configscoredept"

export default {
  components: {
    iPage,
    icon,
    iSearch,
    iSelect,
    iCard,
    iButton,
    iInput,
    logButton,
    tableList,
    deptDialog
  },
  mixins: [ filters ],
  data() {
    return {
      rateDepartNumOptions: [],
      scoreDeptOptions: [],
      form: cloneDeep(queryForm),
      editStauts: false,
      loading: false,
      tableTitle: cloneDeep(tableTitle),
      tableListData: [],
      tableListDataCache: [],
      multipleSelection: [],
      saveLoading: false,
      deleteLoading: false,
      isAuditOptions: [
        { key: 1, value: "1", label: "是" },
        { key: 0, value: "0", label: "否" }
      ],
      currentRow: null,
      deptDialogVisible: false
    }
  },
  created() {
    this.getDictByCode()
    this.getRfqRateDeparts()
  },
  filters: {
    isCheckFilter(value) {
      const map = {
        0: "否",
        1: "是"
      }

      return map[value] || value
    }
  },
  methods: {
    getDictByCode() {
      getDictByCode("score_dept")
      .then(res => {
        if (res.code == 200) {
          this.scoreDeptOptions = 
            Array.isArray(res.data) && res.data[0] && Array.isArray(res.data[0].subDictResultVo) ?
            res.data[0].subDictResultVo.map(item => ({
              key: item.code,
              label: item.name,
              value: item.code
            })) :
            []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
    },
    getRfqRateDeparts() {
      this.loading = true

      const form = {}
      Object.keys(this.form).forEach(key => form[key] = this.form[key] || undefined)

      getRfqRateDeparts(form)
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.multipleSelection = []
          this.tableListDataCache = cloneDeep(this.tableListData)

          if (Object.keys(this.form).every(key => !this.form[key])) {
            this.rateDepartNumOptions = []
            this.tableListData.forEach(item => {
              this.rateDepartNumOptions.push({ key: item.rateDepartNum, label: item.rateDepartNum, value: item.rateDepartNum })
            })
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    handleChangeByRateTag(value, row) {
      this.$set(row, "rateTagDesc", this.scoreDeptOptions.find(item => item.value === value)?.label ?? "")
    },
    // 查询
    async sure() {
      await this.handleCloseEdit()

      this.getRfqRateDeparts()
    },
    // 重置
    async reset() {
      await this.handleCloseEdit() 

      this.form = cloneDeep(queryForm)
      this.getRfqRateDeparts()
    },
    // 结束编辑
    async handleCloseEdit() {
      if (!isEqual(this.tableListData, this.tableListDataCache)) {
        await this.$confirm(this.language("NOSAVEISQUIT", "您还有数据更改尚未保存, 请确认是否需要退出编辑模式"))
        // this.tableListData = this.tableListData.filter(item => !item.isCache)
        this.tableListData = cloneDeep(this.tableListDataCache)
        this.editStauts = false
      } else {
        this.editStauts = false
      }
    },
    // 保存
    handleSave() {
      if (!this.tableListData.every(item => item.rateTag && item.rateDepartNum && (item.isCheck || item.isCheck === 0))) return iMessage.warn(this.language("QINGJIANGSHUJUTIANXIEWANZHENG", "请将数据填写完整"))

      this.saveLoading = true
      saveRfqRateDeparts(
        this.tableListData.map(item => ({
          ...item,
          rateTag: item.rateTag
        }))
      )
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getRfqRateDeparts()
        } else {
          iMessage.error(message)
        }

        this.saveLoading = false
      })
      .catch(() => this.saveLoading = false)
    },
    // 恢复
    handleRecovery() {
      if (!isEqual(this.tableListData, this.tableListDataCache)) {
        this.$confirm(this.language("NOSAVEISRECOVER", "您还有数据更改尚未保存, 请确认是否需要恢复成初始数据"))
        .then(() => {
          this.getRfqRateDeparts()
        })
        .catch(() => {})
      } else {
        iMessage.warn(this.language("ISBASEDATA", "当前已是初始数据"))
      }
    },
    // 新增行
    handleAdd() {
      this.tableListData.unshift({
        isCache: true,
        rateTag: "",
        rateDepartNum: "",
        isCheck: ""
      })
    },
    // 删除行
    handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOSHANCHUDESHUJU", "请选择需要删除的数据"))

      const ids = this.multipleSelection.filter(item => item.id).map(item => item.id)
      if (ids.length) {
        this.deleteLoading = true
        deleteRfqRateDeparts(
          ids
        )
        .then(res => {
          const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

          if (res.code == 200) {
            iMessage.success(this.language("SHANCHUCHENGGONG", "删除成功"))
            this.tableListData = this.tableListData.filter(item => !this.multipleSelection.includes(item))
          } else {
            iMessage.error(message)
          }

          this.deleteLoading = false
        })
        .catch(() => this.deleteLoading = false)
      } else {
        iMessage.success(this.language("SHANCHUCHENGGONG", "删除成功"))
        this.tableListData = this.tableListData.filter(item => !this.multipleSelection.includes(item))
      }
    },
    // 选择部门编号
    handleSelectDeptNum(row) {
      this.currentRow = row
      this.deptDialogVisible = true
    },
    // 获取选择的部门编号
    selectDeptNum(data) {
      this.currentRow.rateDepartNum = data.deptNum
      this.currentRow.deptId = data.id
      
      this.currentRow = null
    }
  }
}
</script>

<style lang="scss" scoped>
.configscoredept {
  .header {
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }

  .card {
    .body {
      height: calc(100vh - 445px);
      min-height: 430px;
    }
  }

  .deptScoreTypeSelect {
    width: 230px;
  }

  .deptNumSelect {
    width: 330px;

    ::v-deep input {
      cursor: pointer;
    }

    ::v-deep .el-input__suffix {
      right: 0;
    }
  }

  ::v-deep .el-input__suffix {
    .inputSearchIcon {
      display: inline-block;
      width: 30px;
      font-size: 16px;
      height: 100%;

      .icon {
        height: 100% !important;
      }
    }
  }

  .isAuditSelect {
    width: 120px;
  }
}
</style>