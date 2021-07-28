<!--
 * @Author: your name
 * @Date: 2021-07-26 16:46:44
 * @LastEditTime: 2021-07-27 17:29:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aekomanage\detail\components\contentDeclare\index.vue
-->
<template>
  <div class="contentDeclare">
    <iSearch
      class="margin-top25"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURUGONGYINGSHANGBIANHAO', '请输入供应商编号')"
          />
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('NEIRONGZHUANGTAI', '内容状态')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZENEIRONGZHUANGTAI', '请选择内容状态')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('MTZXIANGGUAN', 'MTZ相关')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZEMTZXIANGGUAN', '请选择MTZ相关')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('CAIGOUGONGCHANG', '采购工厂')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZECAIGOUGONGCHANG', '请选择采购工厂')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('ZHIDINGTOUZICHEXINGXIANGMU', '指定投资⻋型项⽬')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZEZHIDINGTOUZICHEXINGXIANGMU', '请选择指定投资⻋型项⽬')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('NEIRONGBIAOTAI', '内容表态')">
      <template v-slot:header-control>
        <iButton :loading="declareToggleLoading" @click="handleDeclareToggle">{{ language("WUGUANXIANGGUANQIEHUAN", "⽆关相关切换") }}</iButton>
        <iButton @click="handleDeclareReset">{{ language("BIAOTAICHONGZHI", "表态重置") }}</iButton>
        <iButton>{{ language("FAFANGGONGYINGSHANGBAOJIA", "发放供应商报价") }}</iButton>
        <iButton>{{ language("ZHIDINGTOUZICHEXINGXIANGMU", "指定投资⻋型项⽬") }}</iButton>
        <iButton>{{ language("DAOCHU", "导出") }}</iButton>
        <iButton>{{ language("DAORU", "导⼊") }}</iButton>
        <iButton>{{ language("TIJIAO", "提交") }}</iButton>
        <iButton>{{ language("CHEHUI", "撤回") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :lang="true"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #e="scope">
            <iInput class="deptNumSelect" :placeholder="language('QINGXUANZE', '请选择')" v-model="scope.row.e" readonly @click.native="handleSelect(scope.row)">
              <div class="inputSearchIcon" slot="suffix">
                <icon symbol name="iconshaixuankuangsousuo" />
              </div>
            </iInput>
          </template>
          <template #l="scope">
            <span class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #m="scope">
            <span class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #n="scope">
            <span class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
          <template #o="scope">
            <iSelect
              v-model="scope.row.o"
              :placeholder="language('QINGXUANZE', '请选择')"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in carTypeProjectOptions"
                :key="item.key"
              ></el-option>
            </iSelect>
          </template>
          <template #p="scope">
            <span class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>

<script>
import { iSearch, iInput, iSelect, iCard, iButton, icon, iPagination } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { contentDeclareTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"
import { iMessage } from '../../../../../components'

export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, icon, iPagination, tableList },
  mixins: [ pageMixins ],
  data() {
    return {
      form: {},
      carTypeProjectOptions: [],
      loading: false,
      tableTitle,
      tableListData: [{}],
      multipleSelection: [],
      declareToggleLoading: false,
      declareResetLoading: false
    };
  },
  methods: {
    getList() {
      const fn = function() {}

      this.loading = true
      fn()
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    sure() {},
    reset() {},
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    view() {},
    handleSelect(row) {
      this.$router.push({
        path: "/aeko/quondampart/ledger",
        query: {}
      })
    },
    // 相关无关切换
    handleDeclareToggle() {
      const fn = function() {}
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOQIEHUANBIAOTAIDELINGJIAN", "请选择需要切换表态的零件"))

      this.declareToggleLoading = true

      fn()
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getList()
        } else {
          iMessage.error(message)
        }

        this.declareToggleLoading = false
      })
      .catch(() => this.declareToggleLoading = false)
    },
    // 表态重置
    handleDeclareReset() {
      const fn = function() {}
      if (!this.multipleSelection.length) return iMessage.warn(this.language("QINGXUANZEXUYAOCHONGZHIBIAOTAIDELINGJIAN", "请选择需要重置表态的零件"))

      this.declareResetLoading = true

      fn()
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getList()
        } else {
          iMessage.error(message)
        }

        this.declareResetLoading = false
      })
      .catch(() => this.declareResetLoading = false)
    }
  },
};
</script>

<style lang="scss" scoped>
.contentDeclare {
  .deptNumSelect {
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
}
</style>