<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="95%" top="5vh" @close='clearDiolog' z-index="1000" class="iDialogAdd">
    <div slot="title" class="title">
      <div class="text">{{ $t(title) }}</div>
      <div class="search">
        {{ $t('LK_CHEXINXIANGMU') }}:
        <iSelect
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form['search.carTypeProject']"
            filterable
            clearable
            @change="searchRelationCarTypeList"
            ref="carTypeProjectRef"
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in cartypeList"
              :key="index"
          ></el-option>
        </iSelect>
        {{ $t('车型类型') }}:
        <iSelect
            :placeholder="$t('partsprocure.PLEENTER')"
            v-model="form['search.projectType']"
            filterable
            clearable
            @change="searchRelationCarTypeList"
        >
          <el-option
              :value="item"
              :label="item"
              v-for="(item, index) in projectTypeList"
              :key="index"
          >
          </el-option>
        </iSelect>
      </div>
    </div>
    <div class="changeContent">
      <div v-loading="tableLoading">
        <iTableList
            :height="(tableHeight - 220) / (tableListData2.length > 0 ? 2 : 1)"
            :selection="false"
            :tableRowClassName="tableRowClassName"
            :tableData="tableListData1"
            :tableTitle="tmCartypeProTableTitle"
            :activeItems="'partNum'"
        >
          <template #nomiAmount="scope">
            <div>{{ getTousandNum(scope.row.nomiAmount) }}</div>
          </template>
          <template #entryAmount="scope">
            <div>{{ getTousandNum(scope.row.entryAmount) }}</div>
          </template>
          <template #info="scope">
            <div class="linkStyle" :class="{noLine: scope.row.tmCartypeProId == noLine}"><span @click="relationCarTypePartsList(scope.row.tmCartypeProId)">{{ $t('详情') }}</span></div>
          </template>
          <template #apply="scope" v-if="isApply">
            <div class="linkStyleNoline"><span @click="applyRefCarType(scope.row)">{{ $t('应用') }}</span></div>
          </template>
        </iTableList>
        <iTableList
            v-if="tableListData2.length != 0"
            :height="(tableHeight - 220) / 2"
            :selection="false"
            :tableData="tableListData2"
            :tableTitle="partsTableTitle"
        >
          <template #nomiAmount="scope">
            <div>{{ getTousandNum(scope.row.nomiAmount) }}</div>
          </template>
          <template #entryAmount="scope">
            <div>{{ getTousandNum(scope.row.entryAmount) }}</div>
          </template>
        </iTableList>
      </div>
    </div>
  </iDialog>
</template>
<script>
import {
  iDialog,
  iMessage,
  iSelect
} from 'rise'
import {
  iTableList
} from '@/components'
import {tmCartypeProList, partsList, form} from "../components/data";
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import {
  findProjectTypeDetailPulldown, getCartypePulldown,
  saveList
} from "@/api/ws2/budgetManagement/edit";
import {
  searchRelationCarTypeList,
  relationCarTypePartsList,
  applyRefCarType
} from "@/api/ws2/budgetManagement/investmentList";
import { cloneDeep } from 'lodash'
import {getTousandNum} from "@/utils/tool";

export default {
  mixins: [pageMixins, tableHeight],
  components: {
    iDialog,
    iTableList,
    iSelect,
  },
  props: {
    title: {type: String, default: '参考车型项目'},
    value: {type: Boolean},
    isApply: {type: Boolean, default: true},
    referenceCarProjectParams: {type: Object, default: () => {}},
  },
  data() {
    return {
      form: form,
      tableListData1: [],
      tableListData2: [],
      tmCartypeProTableTitle: tmCartypeProList,
      partsTableTitle: partsList,
      tableLoading: false,
      iSearchLoading: false,
      noLine: '',
      cartypeList: [],
      projectTypeList: [],
      getTousandNum: getTousandNum
    }
  },
  mounted() {
    this.getSelected()
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (row.isRefProject === 'Y') {
        return 'blueRow';
      }
      return '';
    },
    getSelected() {
      this.iSearchLoading = true
      Promise.all([getCartypePulldown(), findProjectTypeDetailPulldown()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        if (Number(res[0].code) === 0) {
          this.cartypeList = res[0].data
          // this.form['search.carTypeProject'] = this.referenceCarProjectParams.sourceProjectId
        } else {
          iMessage.error(result0);
        }
        if (Number(res[1].code) === 0) {
          // this.projectTypeList = res[1].data.projectTypePullDownVOList
          this.projectTypeList = ['新车型', 'MP车型', '发动机']
        } else {
          iMessage.error(result1);
        }
        this.iSearchLoading = false
      }).catch(() => {
        this.iSearchLoading = false
      })
    },
    searchRelationCarTypeList() {
      this.tableLoading = true
      let parmars = {
        carTypeProId: this.form['search.carTypeProject'],
        carTypeProType: this.form['search.projectType'],
        categoryId: this.referenceCarProjectParams.categoryId,
        sourceProjectId: this.referenceCarProjectParams.sourceProjectId,
      }
      searchRelationCarTypeList(parmars).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData1 = res.data
          this.tableListData2 = []
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.iSearchLoading = false
      })
    },
    relationCarTypePartsList(carTypeProId) {
      this.noLine = carTypeProId
      this.tableLoading = true
      let parmars = {
        carTypeProId: carTypeProId,
        categoryId : this.referenceCarProjectParams.categoryId,
      }
      relationCarTypePartsList(parmars).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData2 = res.data;
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.iSearchLoading = false
      })
    },
    applyRefCarType(row) {
      this.tableLoading = true
      let parmars = {
        refCartypeProId: row.id,
        refMoldAmount : row.nomiAmount,
      }
      applyRefCarType(this.referenceCarProjectParams.sourceProjectId, parmars).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.iSearchLoading = false
      })
    },
    clearDiolog() {
      this.$emit('input', false)
    },
  },
  watch: {
    value(val) {
      if (val) {
        if(!this.isApply){
          this.tmCartypeProTableTitle = cloneDeep(this.tmCartypeProTableTitle)
          this.tmCartypeProTableTitle.pop()
        }
        this.noLine = ''
        this.form['search.carTypeProject'] = this.referenceCarProjectParams.carTypeProId
        this.searchRelationCarTypeList()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.iDialogAdd.el-dialog__wrapper {
  overflow: hidden;
  ::v-deep .el-dialog{
    height: 90%;
    overflow-y: auto;
  }
}
.linkStyle {
  span {
    color: #1663F6;
    border-bottom: 1px solid #1663F6;
    cursor: pointer;
  }
  &.noLine{
    span {
      border-bottom: none;
    }
  }
}
.linkStyleNoline{
  span {
    color: #1663F6;
    cursor: pointer;
  }
}
.title {
  position: relative;
  display: flex;

  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 35px;
    margin-right: 30px;
  }
  .search{
    font-size: 16px;
    font-weight: 400;
    ::v-deep.el-select{
      width: 220px;
      margin-left: 36px;
      margin-right: 30px;
    }
  }
  .star {
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  padding-bottom: 30px;
  ::v-deep.el-table .blueRow{
    color: #1763F7;
  }
  ::v-deep .card {
    box-shadow: none;
    border-radius: 0;
    background: none;

    .cardBody {
      margin-top: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }

    .iSearch-content {
      border-bottom: 1px solid #E3E3E3;
      padding-bottom: 20px;
    }
  }

  .add {
    float: right;
    margin-bottom: 10px;
  }
}
</style>

