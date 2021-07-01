<!--
 * @Author: your name
 * @Date: 2021-06-17 13:44:35
 * @LastEditTime: 2021-06-30 20:06:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\configscoredept\index.vue
-->
<template>
  <iPage class="configscoredept">
    <div class="header clearFloat">
      <div class="title">{{ $t("配置评分部门") }}</div>
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
        <el-form-item :label="$t('部门编号')">
          <iSelect
            v-model="form.dept"
            :placeholder="$t('请选择部门编号')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('部门评分类型')">
          <iSelect
            v-model="form.deptScoreType"
            :placeholder="$t('请选择部门评分类型')"
          >
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in options"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <template v-slot:header-control>
        <iButton v-if="!editStauts" @click="editStauts = true">{{ $t("编辑") }}</iButton>
        <div v-else>
          <iButton @click="handleCloseEdit">{{ $t("结束编辑") }}</iButton>
          <iButton :loading="saveLoading" @click="handleSave">{{ $t("保存") }}</iButton>
          <iButton @click="handleRecovery">{{ $t("恢复") }}</iButton>
          <iButton @click="handleAdd">{{ $t("新增行") }}</iButton>
          <iButton :loading="deleteLoading" @click="handleDelete">{{ $t("删除行") }}</iButton>
        </div>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="100%"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #deptScoreType="scope">
            <iSelect
              v-if="editStauts"
              v-model="scope.row.deptScoreType"
              :placeholder="$t('请选择部门评分类型')"
              class="deptScoreTypeSelect"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in options"
                :key="item.key"
              ></el-option>
            </iSelect>
            <span v-else>{{ scope.row.deptScoreType }}</span>
          </template>
          <template #deptNum="scope">
            <iInput class="deptNumSelect" placeholder="请选择部门编号" v-model="scope.row.deptNum" readonly @click.native="handleSelectDeptNum(scope.row)">
              <div class="inputSearchIcon" slot="suffix">
                <icon symbol name="iconshaixuankuangsousuo" />
              </div>
            </iInput>
          </template>
          <template #isAudit="scope">
            <iSelect
              v-if="editStauts"
              v-model="scope.row.isAudit"
              :placeholder="$t('请选择')"
              class="isAuditSelect"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in isAuditOptions"
                :key="item.key"
              ></el-option>
            </iSelect>
            <span v-else>{{ scope.row.isAudit }}</span>
          </template>
        </tableList>
      </div>
    </iCard>
    <deptDialog :visible.sync="deptDialogVisible" @confrim="selectDeptNum" />
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
import { getRfqRateDeparts } from "@/api/configscoredept"

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
      options: [],
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
        { key: 1, value: 1, label: "是" },
        { key: 0, value: 0, label: "否" }
      ],
      deptDialogVisible: false
    }
  },
  created() {
    // this.getRfqRateDeparts()
  },
  methods: {
    getRfqRateDeparts() {
      const getList = function() {}

      this.loading = true
      getRfqRateDeparts(this.form)
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.multipleSelection = []
          this.tableListDataCache = cloneDeep(this.tableListData)
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
    // 查询
    sure() {
      this.getList()
    },
    // 重置
    reset() {
      this.form = cloneDeep(queryForm)
      this.getList()
    },
    // 结束编辑
    handleCloseEdit() {
      if (!isEqual(this.tableListData, this.tableListDataCache)) {
        this.$confirm(this.$t("您还有数据更改尚未保存, 请确认是否需要退出编辑模式"))
        .then(() => {
          this.tableListData = this.tableListData.filter(item => !item.isCache)
          this.editStauts = false
        })
        .catch(() => {})
      } else {
        this.editStauts = false
      }
    },
    // 保存
    handleSave() {
      const save = function() {}

      this.saveLoading = true
      save({
        ids: this.tableListData
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getList()
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
        this.$confirm(this.$t("您还有数据更改尚未保存, 请确认是否需要恢复成初始数据"))
        .then(() => {
          this.getList()
        })
        .catch(() => {})
      } else {
        iMessage.warn(this.$t("当前已是初始数据"))
      }
    },
    // 新增行
    handleAdd() {
      this.tableListData.unshift({
        deptScoreType: "",
        deptNum: "",
        isAudit: ""
      })
    },
    // 删除行
    handleDelete() {
      const deleteRows = function() {}

      if (!this.multipleSelection.length) return iMessage.warn(this.$t("请选择需要删除的数据"))

      this.deleteLoading = true
      deleteRows({
        ids: this.multipleSelection.map(item => item.id)
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getList()
        } else {
          iMessage.error(message)
        }

        this.deleteLoading = false
      })
      .catch(() => this.deleteLoading = false)
    },
    // 选择部门编号
    async handleSelectDeptNum(row) {
      this.deptDialogVisible = true
      
    },
    // 获取选择的部门编号
    selectDeptNum(data) {
      console.log(data)
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

  .inputSearchIcon {
    display: inline-block;
    width: 30px;
    font-size: 16px;
  }

  .isAuditSelect {
    width: 120px;
  }
}
</style>