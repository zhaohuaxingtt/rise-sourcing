<template>
  <div v-permission="TOOLING_DATABASE_SUMMARY">
    <iSearch
        class="margin-bottom20 giSearch"
        style="margin-top: 20px"
        @sure="getTableListFn"
        @reset="reset"
        :icon="true"
        :resetKey="PARTSPROCURE_RESET"
        :searchKey="PARTSPROCURE_CONFIRM"
        v-loading="loadingiSearch"
    >
      <el-form>
        <el-form-item :label="$t('车型包')">
          <Autocomplete
            v-model="form['search.cartypeBag']"
            :fetch-suggestions="querySearchCartypeBag"
            :placeholder="$t('partsprocure.PLEENTER')"
            @keyup.enter.native="getTableListFn"
            clearable
          >
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </Autocomplete>
        </el-form-item>
        <el-form-item :label="$t('LK_CHEXINGXIANGMU')">
          <iInput v-model="form['search.tmCartypeProId']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')" @keyup.enter.native="getTableListFn">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </iInput>
        </el-form-item>
        <el-form-item :label="$t('零件包')">
          <Autocomplete
              v-model="form['search.partBag']"
              :fetch-suggestions="querySearchPartBag"
              :placeholder="$t('partsprocure.PLEENTER')"
              @keyup.enter.native="getTableListFn"
              clearable
          >
            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>
          </Autocomplete>
        </el-form-item>
<!--        <el-form-item :label="$t('LK_LINGJIANMINGCHENG')">-->
<!--          <iInput v-model="form['search.partNameZh']" :placeholder="$t('LK_RFQPLEASEENTERQUERY')">-->
<!--            <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableListFn"></i>-->
<!--          </iInput>-->
<!--        </el-form-item>-->
      </el-form>


    </iSearch>
    <iCard>
      <div class="icardHeader">
        <div></div>
        <div>
          <iButton @click="hanldeSave">{{ $t('LK_BAOCUN') }}</iButton>
          <iButton @click="hanldeDownload">{{ $t('下载模板') }}</iButton>
          <Upload
            class="upload"
            ref="uploadRef"
            :action="actionUrl"
            :on-change="beforeUpload"
            :on-success="onSuccess"
            :before-upload="beforeAvatarUpload"
            :before-remove="beforeRemove"
            :limit="1"
            :show-file-list="false"
            :file-list="fileList">
            <iButton>{{ $t('批量上传') }}</iButton>
          </Upload>
          <iButton @click="hanldeExport">{{ $t('LK_DAOCHU') }}</iButton>
        </div>
      </div>
<!--      550-->
      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
      >
        <template #nomiAmountTotal="scope">
          <iInput
                  v-model="scope.row.nomiAmountTotal"
                  :placeholder="$t('LK_QINGSHURU')"
                  @focus="focus(scope.row.index)"
                  @blur="blur(scope.row.index)"
                  onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
          ></iInput>
        </template>
        <template #nomiAmountSvw="scope">

          <div v-if="scope.row.link" class="linkStyle"><span @click="clickNomiAmountSvw(scope.row.materialNameZh)">{{ getTousandNum(Number(scope.row.nomiAmountSvw).toFixed(2)) }}</span></div>
          <div v-else>{{ getTousandNum(Number(scope.row.nomiAmountSvw).toFixed(2)) }}</div>
        </template>
      </iTableList>
      <div class="bottomTip">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableListFn)"
          @current-change="handleCurrentChange($event, getTableListFn)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iSearch, iSelect, iPagination, iButton, iInput, iMessage} from 'rise';
import { excelExport } from '@/utils/filedowLoad'
import {Upload, Autocomplete} from "element-ui"
import {
  packageFindByCarType,
  packageFindByPart,
  findByPage,
  save,
  download,
  modelBagExport,
} from "@/api/ws2/dataBase";
import {
  iTableList
} from '@/components'
import {form, modelBagData} from "../components/data";
import {pageMixins} from "@/utils/pageMixins";
import {tableHeight} from "@/utils/tableHeight";
import { cloneDeep } from 'lodash'
import {getTousandNum, delcommafy} from "@/utils/tool";

import {
  getCartypePulldown,
} from "@/api/ws2/budgetManagement/edit";


export default {
  mixins: [pageMixins, tableHeight],
  components: {
    iCard,
    iSearch,
    iTableList,
    iPagination,
    iButton,
    iInput,
    Upload,
    Autocomplete,
  },
  data() {
    return {
      leftModel: 'mouldInvestment',
      rightModel: 1,
      form: form,
      loadingiSearch: false,
      tableLoading: false,
      carTypeList: [],
      cartypeBagList: [],
      partBagList: [],
      tableListData: [],
      multipleSelection: [],
      tableTitle: modelBagData,
      tableTitleTemp: [],
      getTousandNum: getTousandNum,
      delcommafy: delcommafy,
    }
  },
  computed: {
    actionUrl() {
      return process.env.VUE_APP_MODELCAR + '/upload'
    }
  },
  created() {
    this.tableTitleTemp = cloneDeep(this.tableTitle)
    this.page.pageSizes = [10, 20, 50, 100, 300]
    this.getModelProtitesPullDown()
  },
  methods: {
    focus(index){
      this.tableListData[index].nomiAmountTotal = this.delcommafy(this.tableListData[index].nomiAmountTotal)
    },
    blur(index){
      let value = this.tableListData[index].nomiAmountTotal
      value = value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')
      this.tableListData[index].nomiAmountTotal = this.getTousandNum(Number(value).toFixed(2))
    },
    clickNomiAmountSvw(materialNameZh){
      this.$emit('toMouldInvestMent', materialNameZh)
    },
    querySearchCartypeBag(queryString, cb) {
      packageFindByCarType({carType: queryString})
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (Number(res.code) === 0) {
              cb(res.data.map(item => ({value: item})));
            } else {
              iMessage.error(result)
            }
          }).catch(() => {
      });
    },
    querySearchPartBag(queryString, cb) {
      packageFindByPart({partName: queryString})
          .then((res) => {
            const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
            if (Number(res.code) === 0) {
              cb(res.data.map(item => ({value: item})));
            } else {
              iMessage.error(result)
            }
          }).catch(() => {
      });
    },
    async getModelProtitesPullDown() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.loadingiSearch = true
      await Promise.all([packageFindByCarType({carType: ''}), packageFindByPart({partName: ''})]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        if (res[0].data) {
          this.cartypeBagList = res[0].data;
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.partBagList = res[1].data;
        } else {
          iMessage.error(result1);
        }
        this.getTableListFn()
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    getTableListFn() {
      this.tableLoading = true;
      let params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        categoryNameZh: form['search.tmCartypeProId'],
        packageNameZh: form['search.cartypeBag'],
        partNameZh: form['search.partBag'],
      }
      findByPage(params)
        .then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            this.page.currPage = res.data.current;
            this.page.pageSize = res.data.size;
            this.page.totalCount = res.data.total;
            this.tableListData = res.data.records.map((item, index) => {
              item.index = index
              item.nomiAmountTotal = item.nomiAmountTotal != null ? this.getTousandNum(item.nomiAmountTotal.toFixed(2)) : ''
              let start = item.hisPartsList.length
              item.hisPartsList = item.hisPartsList.map(a => {
                a.nomiAmount = this.getTousandNum(Number(a.nomiAmount).toFixed(2))
                return a
              })
              item.hisPartsList.length = 10
              item.hisPartsList.fill({carTypeProName: "", nomiAmount: ''}, start, 10)
              return item
            });
            if(this.tableListData && this.tableListData.length > 0){
              let temp = []
              this.tableListData[0].hisPartsList.map((item, index) => {
                let key = index + 1
                temp = temp.concat([
                  {
                    props: 'carTypeProName' + key,
                    name: `车型项目${key}名称`,
                    key: `车型项目${key}名称`,
                    width: 200,
                    tooltip: false
                  },
                  {
                    props: 'nomiAmount' + key,
                    name: `车型项目${key}金额`,
                    key: `车型项目${key}金额`,
                    width: 200,
                    tooltip: false
                  }
                ])
              })
              this.tableTitle = cloneDeep(this.tableTitleTemp)
              this.tableTitle = this.tableTitle.concat(temp)
              this.tableListData = this.tableListData.map(a => {
                a.hisPartsList.map((b, index) => {
                  let key = index + 1
                  a['carTypeProName' + key] = b.carTypeProName
                  a['nomiAmount' + key] = b.nomiAmount
                })
                return a
              })
            }
          } else {
            iMessage.error(result)
          }
          this.tableLoading = false;
        }).catch(() => (this.tableLoading = false));
    },
    reset() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.getTableListFn()
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    exportFile() {
      if (!this.multipleSelection.length) return iMessage.warn(this.$t('请先选择'))
      excelExport(this.multipleSelection, this.tableTitle, '材料组汇总')
    },

    hanldeSave(){
      this.tableLoading = true;
      let tableListData = cloneDeep(this.tableListData)
      save(tableListData.map(item => {
        item.nomiAmountTotal = Number(this.delcommafy(item.nomiAmountTotal))
        return item
      }))
        .then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            iMessage.success(result)
          } else {
            iMessage.error(result)
          }
          this.tableLoading = false;
        }).catch(() => (this.tableLoading = false));
    },
    hanldeDownload(){
      this.tableLoading = true;
      let params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        categoryNameZh: form['search.tmCartypeProId'],
        packageNameZh: form['search.cartypeBag'],
        partNameZh: form['search.partBag'],
        packageDataList: this.multipleSelection
      }
      download(params)
        .then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            iMessage.success(result)
          } else {
            iMessage.error(result)
          }
          this.tableLoading = false;
        }).catch(() => (this.tableLoading = false));
    },
    hanldeExport(){
      this.tableLoading = true;
      let params = {
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        categoryNameZh: form['search.tmCartypeProId'],
        packageNameZh: form['search.cartypeBag'],
        partNameZh: form['search.partBag'],
        packageDataList: this.multipleSelection
      }
      modelBagExport(params)
        .then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) === 0) {
            iMessage.success(result)
          } else {
            iMessage.error(result)
          }
          this.tableLoading = false;
        }).catch(() => (this.tableLoading = false));
    },
    onSuccess(res){
      const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
      this.$refs['uploadRef'].clearFiles();
      if (Number(res.code) === 0) {
        this.getTableListFn()
        iMessage.success(result);
      } else {
        iMessage.error(result);
      }
      this.tableLoading = false
    },
    beforeAvatarUpload(file) {
      this.tableLoading = true;
      let FileExt = file.name.replace(/.+\./, "").toLowerCase();
      let flag = ["xls", "xlsx"].includes(FileExt);
      if (!flag) {
        this.tableLoading = false;
        iMessage.error("只能上传excel文件!");
      }
      return flag;
    },
  }
}
</script>

<style scoped lang="scss">
.icardHeader {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .upload{
    display: inline-block;
    margin: 0 10px;
  }
}
.bottomTip{
  color: #999999;
  font-size: 14px;
  text-align: right;
  margin: 10px 0;
}
.multipleSelect{
  ::v-deep .el-tag{
    max-width: calc(100% - 65px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.giSearch{
  ::v-deep .el-autocomplete{
    width: 220px;
    input {
      height: 35px;
    }
  }
}
.linkStyle {
  span {
    color: #1663F6;
    border-bottom: 1px solid #1663F6;
    cursor: pointer;
  }
  &.red{
    span{
      color: #E30D0D;
      border-bottom: 1px solid #E30D0D;
    }
  }
}
</style>