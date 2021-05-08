<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="684px" top="5vh" @close='clearDiolog' z-index="1000">
    <div slot="title" class="title">
      <div class="text">
        {{$t(title)}}
        <Popover
            placement="top-start"
            content="车型参考依照顺序匹配"
            trigger="hover">
          <icon symbol name="iconxinxitishi" slot="reference"></icon>
        </Popover>
      </div>
    </div>
    <div class="changeContent" v-loading="loadingiDialog">
      <iSearch
          :icon="false"
          :resetKey="PARTSPROCURE_RESET"
          :searchKey="PARTSPROCURE_CONFIRM"
      >
        <el-form class="form1 clearfix">
          <el-form-item label="参考车型项目一">
            <iSelect
                placeholder="请选择"
                v-model="referenceModel1"
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
                v-model="referenceModel2"
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
                v-model="referenceModel3"
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
                v-model="otherModel"
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
        <el-form class="clearfix">
          <el-form-item label="车型项目类型">
            <iSelect
                placeholder="请选择"
                v-model="modelProject"
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
          <el-form-item label="车型项目起止年份">
            <div class="timeClass">
              <el-date-picker
                  v-model="sopBegin"
                  type="year"
                  placeholder="选择年"
                  @change="changeYears('sopBegin')">
              </el-date-picker>
              <div class="symbol">-</div>
              <el-date-picker
                  v-model="sopEnd"
                  type="year"
                  placeholder="选择年"
                  @change="changeYears('sopEnd')">
              </el-date-picker>
            </div>
<!--            <iInput v-model="form['search.catTypeStartTime']"></iInput>-->
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save" :loading='saveLoading'>确认</iButton>
      <iButton @click="reset">重置</iButton>
    </span>
    <iDialog title="您还没有选择参考车型项目，是否继续?" :visible.sync="value2" width="381px" @close='clearDiolog2' v-loading="iDialogLoading2"
             :modal-append-to-body="true" append-to-body>
      <span slot="footer" class="dialog-footer">
        <iButton @click="value2 = false">取消</iButton>
        <iButton @click="save2">确认</iButton>
      </span>
    </iDialog>
  </iDialog>
</template>
<script>
import {iButton, iDialog, iMessage, iSelect, icon, iSearch} from '@/components'
import { Popover } from "element-ui"
import { addListInvestment, form } from "../components/data";
import { pageMixins } from "@/utils/pageMixins";
import {
  GetOtherCarTypeAlternative,
  saveList, saveRefcartypepro, getRelationCarTypeById,
} from "@/api/priceorder/stocksheet/edit";
import {saveNewVersion} from "@/api/priceorder/stocksheet/investmentList";

export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iSelect,
    iDialog,
    icon,
    Popover,
    iSearch
  },
  props: {
    title: {type: String, default: '参考车型项目'},
    carTypeProId: {type: String, default: ''},
    sourceStatus: {type: String, default: ''},
    carType: {type: Array},
    value: {type: Boolean},
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
      referenceModel1: '',
      referenceModel2: '',
      referenceModel3: '',
      otherModel: '',
      modelProject: '',
      sopBegin: '',
      sopEnd: '',
      value2: false,
      iDialogLoading2: false
    }
  },
  mounted() {
    this.GetOtherCarTypeAlternative()
  },
  methods: {
    save2(){
      this.iDialogLoading2 = true
      let params = {
        cartypeProType: this.modelProject,
        id: this.carTypeProId,
        other: this.otherModel,
        refCartypeProFirstId: this.referenceModel1,
        refCartypeProSecondId: this.referenceModel2,
        refCartypeProThirdId: this.referenceModel3,
        sopBegin: new Date(this.sopBegin).getFullYear(),
        sopEnd: new Date(this.sopEnd).getFullYear(),
        sourceStatus: this.sourceStatus,
      }
      saveRefcartypepro(params).then((res) => {
        if (Number(res.code) === 0) {
          this.value2 = false
          this.$emit('input', false)
          this.$emit('updateTable')
        }
        this.iDialogLoading2 = false
        return iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
      }).catch(err => {
        this.iDialogLoading2 = false
      })
    },
    clearDiolog2() {
      this.value2 = false
    },
    save(){
      if(!this.referenceModel1 && !this.referenceModel2 &&
          !this.referenceModel3 && !this.otherModel &&
          !this.modelProject && !this.sopBegin &&
          !this.sopEnd){
        this.value2 = true
        return
      }
      this.saveLoading = true
      let params = {
        cartypeProType: this.modelProject,
        id: this.carTypeProId,
        other: this.otherModel,
        refCartypeProFirstId: this.referenceModel1,
        refCartypeProSecondId: this.referenceModel2,
        refCartypeProThirdId: this.referenceModel3,
        sopBegin: this.sopBegin ? new Date(this.sopBegin).getFullYear() : '',
        sopEnd: this.sopEnd ? new Date(this.sopEnd).getFullYear() : '',
        sourceStatus: this.sourceStatus,
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
        }
        this.tableLoading = false
        return iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
      }).catch(err => {
        this.tableLoading = false
      })
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    reset(){
      this.referenceModel1 = ""
      this.referenceModel2 = ""
      this.referenceModel3 = ""
      this.otherModel = ""
      this.modelProject = ""
      this.sopBegin = ""
      this.sopEnd = ""
    },
    changeYears(key){
      if(new Date(this.sopBegin + '').getFullYear() > new Date(this.sopEnd + '').getFullYear()){
        iMessage.warn(`开始时间不能大于结束时间，请重新选择。`)
        this[key] = ''
      }
    }
  },
  watch: {
    value(val) {
      if(val){
        this.loadingiDialog = true
        let currentYears = new Date().getFullYear()
        getRelationCarTypeById({id: this.carTypeProId}).then((res) => {
          if (Number(res.code) == 0) {
            this.referenceModel1 = res.data.refCartypeProFirstId
            this.referenceModel2 = res.data.refCartypeProSecondId
            this.referenceModel3 = res.data.refCartypeProThirdId
            this.otherModel = res.data.carTypeAlternativeId
            this.modelProject = res.data.relationCarTypeId
            this.sopBegin = res.data.sopBegin ? res.data.sopBegin : ''
            this.sopEnd = res.data.sopEnd ? res.data.sopEnd : ''
            if(!this.sopBegin){
              this.sopBegin = currentYears - 5 + ''
            }
            if(!this.sopEnd){
              this.sopEnd = currentYears + ''
            }
          }
          this.loadingiDialog = false
        });
      }
    }
  }
}
</script>
<style lang='scss' scoped>
::v-deep .iSearch-content .operation {
  width: auto;
  display: none;
}
.clearfix::after{
  content: '';
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
}
::v-deep .el-popover__title{
  margin-bottom: 0;
}
.title{
  position: relative;
  display: inline-block;
  .text{
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    .icon{
      cursor: pointer;
    }
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
  .form1{
    margin-bottom: 20px;
    border-bottom: 1px solid #E3E3E3;
  }
  .el-form{
    .el-form-item{
      width: calc(50% - 50px);
      margin-bottom: 20px;
      .el-input{
      }
    }
  }
  .timeClass{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .symbol{
      line-height: 38px;
    }
    ::v-deep .el-input{
      width: 45%;
    }
  }
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
      padding-bottom: 20px;
    }
  }
  .add{
    float: right;
    margin-bottom: 10px;
  }
}
</style>

