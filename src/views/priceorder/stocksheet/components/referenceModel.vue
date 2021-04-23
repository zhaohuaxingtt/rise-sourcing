<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="684px" top="5vh" @close='clearDiolog' v-loading="loadingiDialog">
    <div slot="title" class="title">
      <div class="text">{{$t(title)}}<icon symbol name="iconSetting"></icon></div>
    </div>
    <div class="changeContent">
        <el-form style="border-bottom: 1px solid #D1D1D1">
          <el-form-item label="参考车型项目一">
            <iSelect
                placeholder="请选择"
                v-model="form['search.referenceModel1']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <el-option
                  :value="item.id"
                  :label="item.cartypeNname"
                  v-for="(item, index) in carType"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="参考车型项目二">
            <iSelect
                placeholder="请选择"
                v-model="form['search.referenceModel2']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <el-option
                  :value="item.id"
                  :label="item.cartypeNname"
                  v-for="(item, index) in carType"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="参考车型项目三">
            <iSelect
                placeholder="请选择"
                v-model="form['search.referenceModel3']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <el-option
                  :value="item.id"
                  :label="item.cartypeNname"
                  v-for="(item, index) in carType"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
          <el-form-item label="其它车型项目备选">
            <iSelect
                placeholder="请选择"
                v-model="form['search.otherModel']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <el-option
                  :value="item.carTypeAlternativeId"
                  :label="item.carTypeAlternativeName"
                  v-for="(item, index) in carTypeAlternatives"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="车型项目类型">
            <iSelect
                placeholder="请选择"
                v-model="form['search.modelProject']"
                v-permission="PARTSPROCURE_PARTSTATUS"
                filterable
                @change="changeCarTypeProject"
            >
              <el-option
                  :value="item.relationCarTypeId"
                  :label="item.relationCarTypeName"
                  v-for="(item, index) in carTypes"
                  :key="index"
              ></el-option>
            </iSelect>
          </el-form-item>
<!--          <el-form-item label="车型项目起止年份">-->
<!--            <iInput v-model="form['search.catTypeStartTime']"></iInput>-->
<!--          </el-form-item>-->
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save" :loading='saveLoading'>确认</iButton>
      <iButton @click="reset">重置</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iButton, iDialog, iMessage, iSearch, iPagination, iInput, iSelect} from '@/components'
import tablelist from "../components/tablelist";

import { addListInvestment, form } from "../components/data";
import { pageMixins } from "@/utils/pageMixins";
import filters from "@/utils/filters";
import {
  findAddColumnInvestmentBuild, findProjectTypeDetailPulldown, getCartypePulldown, GetOtherCarTypeAlternative,
  saveList, saveRefcartypepro, getRelationCarTypeById
} from "@/api/priceorder/stocksheet/edit";

export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iSelect,
    iDialog,
    iSearch,
    tablelist,
    iPagination,
    iInput,
    iMessage,
  },
  props: {
    title: {type: String, default: '参考车型项目'},
    carTypeProId: {type: String, default: ''},
    carType: {type: Array},
    value: {type: Boolean},
    repeatClick: Boolean,
    memo: {type: String, default: ''},
    disabled: {type: Boolean, default: false}
  },
  data() {
    return {
      form: form,
      tableListData: [],
      tableTitle: addListInvestment,
      tableLoading: false,
      multipleSelection: [],
      fromGroup: [],
      carTypeAlternatives: [],
      carTypes: [],
      saveLoading: false,
      loadingiDialog: false,
    }
  },
  mounted() {
    this.GetOtherCarTypeAlternative()
    // this.findAddColumnInvestmentBuild()
  },
  methods: {
    save(){
      this.saveLoading = true
      let params = {
        cartypeProType: this.form['search.modelProject'],
        id: this.$route.query.id,
        other: this.form['search.otherModel'],
        refCartypeProFirstId: this.form['search.referenceModel1'],
        refCartypeProSecondId: this.form['search.referenceModel2'],
        refCartypeProThirdId: this.form['search.referenceModel3'],
        // sopBegin: this.form['search.catTypeStartTime'],
        // sopEnd: this.form['search.catTypeEndTime'],
        sourceStatus: this.$route.query.sourceStatus,
      }
      saveRefcartypepro(params).then((res) => {
        if (Number(res.code) === 0) {
          this.$emit('input', false)
          this.$emit('updateTable')
        }
        this.saveLoading = false
        return iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
      }).catch(err => {
        this.saveLoading = false
      })
    },
    handleSelectionChange(list){
      this.multipleSelection = list.map(item => {
        item.cartypeProId = this.carTypeProId
        return item
      })
    },
    GetOtherCarTypeAlternative(){
      this.tableLoading = true
      GetOtherCarTypeAlternative(this.multipleSelection).then((res) => {
        if (res.data) {
          this.carTypeAlternatives = res.data.carTypeAlternatives
          this.carTypes = res.data.carTypes
          console.log(res)
        }
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
      })
    },
    addList(){
      if(this.multipleSelection.length == 0){
        return iMessage.warn(
            this.$t(
                "请先勾选"
            )
        );
      }
      this.tableLoading = true
      saveList(this.multipleSelection).then((res) => {
        if (res.data) {
          console.log(res)
        }
        this.tableLoading = false
        return iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
      }).catch(err => {
        this.tableLoading = false
      })
    },
    findAddColumnInvestmentBuild(){
      this.tableLoading = true
      let parmars = {
        cartypeProId: this.carTypeProId,
        commodity: this.form['search.professionalDepartments'],
        materialName: this.form['search.zhEnNo'],
        modelType: this.form['search.mouldAttr'],
        partNum: this.form['search.materialName'],
      }
      findAddColumnInvestmentBuild(parmars).then((res) => {
        if (res.data) {
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
          this.tableListData = res.data;
        }
        this.tableLoading = false
      });
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    sure(){
      this.findAddColumnInvestmentBuild()
    },
    reset(){
      this.form['referenceModel1'] = ""
      this.form['referenceModel2'] = ""
      this.form['referenceModel3'] = ""
      this.form['otherModel'] = ""
      this.form['modelProject'] = ""
    }
  },
  watch: {
    value(val) {
      if(val){
        this.loadingiDialog = true
        getRelationCarTypeById({id: this.$route.query.id}).then((res) => {
          if (res.data) {
            this.form['referenceModel1'] = res.data.refCartypeProFirstId
            this.form['referenceModel2'] = res.data.refCartypeProSecondId
            this.form['referenceModel3'] = res.data.refCartypeProThirdId
            this.form['otherModel'] = res.data.carTypeAlternativeId
            this.form['modelProject'] = res.data.relationCarTypeId
          }
          this.loadingiDialog = false
        });
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.title{
  position: relative;
  display: inline-block;
  .text{
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }
  .star{
    position: absolute;
    right: -15px;
    top: 0;
    font-size: 30px;
    color: red;
  }
}

.changeContent {
  .el-form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-input{
    }
    .el-form-item__label{
      color: #000000;
      font-weight: 400;
    }
    .el-select{
      width: 280px;
    }
  }
  margin-bottom: 30px;
  ::v-deep .card{
    box-shadow: none;
    border-radius: 0;
    background: none;
    .cardBody{
      margin-top: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
    .iSearch-content{
      border-bottom: 1px solid #E3E3E3;
      padding-bottom: 20px;
    }
  }
  .add{
    float: right;
    margin-bottom: 10px;
  }
}
</style>

