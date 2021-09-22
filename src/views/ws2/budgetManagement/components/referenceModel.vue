<!--
 * @Author: yz
 * @Date: 2021-04-21 17:24:15
-->
<template>
  <iDialog :title="$t(title)" :visible.sync="value" width="684px" top="0" @close='clearDiolog' z-index="1000"
           class="iDialogRef">
    <div slot="title" class="title">
      <div class="text">
        {{ $t(title) }}
        <Popover
            width="500"
            placement="top-start"
            trigger="hover">
          <div class="popoverDiv">
            <div>本窗口的功能为选择参考车型项目，未SOP的车型项目不作为参考数据</div>
            <div>参考的金额是模具的定点金额</div>
            <div>选择好所有条件后，系统会根据你的选择，首先计算第一顺位车型项目的各个材料组的历史投资金额；</div>
            <p>若某个材料组的计算结果为0，则计算第二顺位车型项目的各个材料组的历史投资金额进行补充；</p>
            <p>若某个材料组的计算结果再次为0，则计算第三顺位车型项目的各个材料组的历史投资金额进行补充；</p>
            <p>若某个材料组的计算结果依旧为0，系统根据【其他参考】【车型项目类型】【项目年份】筛选出多个车型项目，并调用模具投资金额最大的项目作为参考项目的模具投资金额，显示在【模具投资清单页面】</p>
          </div>
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
          <el-form-item :label="language('LK_CANKAOCHEXINXIANGMUYI','参考⻋型项⽬⼀')">
            <iSelect
                :placeholder="language('LK_QINGXUANZE','请选择')"
                v-model="referenceModel1"
                filterable
                clearable
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
          <el-form-item :label="language('LK_CANKAOCHEXINXIANGMUER','参考⻋型项⽬⼆')">
            <iSelect
                :placeholder="language('LK_QINGXUANZE','请选择')"
                v-model="referenceModel2"
                filterable
                clearable
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
          <el-form-item :label="language('LK_CANKAOCHEXINXIANGMUSAN','参考⻋型项⽬三')">
            <iSelect
                :placeholder="language('LK_QINGXUANZE','请选择')"
                v-model="referenceModel3"
                filterable
                clearable
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
          <el-form-item :label="language('LK_QITACHEXINXIANGMUBEIXUAN','其它⻋型项⽬备选')">
            <iSelect
                :placeholder="language('LK_QINGXUANZE','请选择')"
                v-model="otherModel"
                filterable
                clearable
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
          <el-form-item :label="language('LK_CHEXINXIANGMULEIXIN','⻋型项⽬类型')">
            <iSelect
                :placeholder="language('LK_QINGXUANZE','请选择')"
                v-model="modelProject"
                filterable
                clearable
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
          <el-form-item :label="language('LK_CHEXINXIANGMUQIZHINIANFEN','⻋型项⽬起⽌年份')">
            <div class="timeClass">
              <iDatePicker
                  v-model="sopBegin"
                  type="year"
                  :placeholder="language('LK_QINGXUANZE','请选择')"
                  @change="changeYears('sopBegin')"
                  value-format="yyyy">
              </iDatePicker>
              <div class="symbol">-</div>
              <iDatePicker
                  v-model="sopEnd"
                  type="year"
                  :placeholder="language('LK_QINGXUANZE','请选择')"
                  @change="changeYears('sopEnd')"
                  value-format="yyyy">
              </iDatePicker>
            </div>
            <!--            <iInput v-model="form['search.catTypeStartTime']"></iInput>-->
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <span slot="footer" class="dialog-footer">
      <iButton @click="save" :loading='saveLoading'>{{ language('LK_QUEREN','确认') }}</iButton>
      <iButton @click="reset">{{ language('LK_ZHONGZHI','重置') }}</iButton>
    </span>
  </iDialog>
</template>
<script>
import {iButton, iDialog, iMessage, iSelect, icon, iSearch, iDatePicker} from 'rise'
import {Popover} from "element-ui"
import {addListInvestment, form} from "../components/data";
import {pageMixins} from "@/utils/pageMixins";
import {
  GetOtherCarTypeAlternative,
  saveList, saveRefcartypepro, getRelationCarTypeById,
} from "@/api/ws2/budgetManagement/edit";
import {saveNewVersion} from "@/api/ws2/budgetManagement/investmentList";

export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iSelect,
    iDialog,
    icon,
    Popover,
    iSearch,
    iDatePicker
  },
  props: {
    title: {type: String, default: 'LK_CANKAOCHEXINXIANGMU'},
    carTypeProId: {type: String, default: ''},
    sourceStatus: {type: String, default: ''},
    listVerisonId: {type: String, default: ''},
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
    }
  },
  mounted() {
    this.GetOtherCarTypeAlternative()
  },
  methods: {
    save() {
      // if (!this.referenceModel1 && !this.referenceModel2 &&
      //     !this.referenceModel3 && !this.otherModel &&
      //     !this.modelProject && !this.sopBegin &&
      //     !this.sopEnd) {
      //   return
      // }
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
        listVerisonId: this.listVerisonId,
      }
      saveRefcartypepro(params).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.$emit('input', false)
          this.$emit('updateTable')
        }
        this.saveLoading = false
        return iMessage.success(result)
      }).catch(err => {
        this.saveLoading = false
      })
    },
    handleSelectionChange(list) {
      this.multipleSelection = list.map(item => {
        item.cartypeProId = this.carTypeProId
        return item
      })
    },
    GetOtherCarTypeAlternative() {
      this.tableLoading = true
      GetOtherCarTypeAlternative(this.multipleSelection).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (res.data) {
          this.carTypeAlternatives = res.data.carTypeAlternatives
          this.carTypes = res.data.carTypes
        }
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
      })
    },
    clearDiolog() {
      this.$emit('input', false)
    },
    reset() {
      this.referenceModel1 = ""
      this.referenceModel2 = ""
      this.referenceModel3 = ""
      this.otherModel = ""
      this.modelProject = ""
      this.sopBegin = ""
      this.sopEnd = ""
    },
    changeYears(key) {
      if (new Date(this.sopBegin + '').getFullYear() > new Date(this.sopEnd + '').getFullYear()) {
        iMessage.warn(`开始时间不能大于结束时间，请重新选择。`)
        this[key] = ''
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.loadingiDialog = true
        let currentYears = new Date().getFullYear()
        getRelationCarTypeById({id: this.carTypeProId}).then((res) => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
          if (Number(res.code) == 0) {
            this.referenceModel1 = res.data.refCartypeProFirstId
            this.referenceModel2 = res.data.refCartypeProSecondId
            this.referenceModel3 = res.data.refCartypeProThirdId
            this.otherModel = res.data.carTypeAlternativeId
            this.modelProject = res.data.relationCarTypeId
            this.sopBegin = res.data.sopBegin ? res.data.sopBegin : ''
            this.sopEnd = res.data.sopEnd ? res.data.sopEnd : ''
            if (!this.sopBegin) {
              this.sopBegin = currentYears - 5 + ''
            }
            if (!this.sopEnd) {
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
.iDialogRef {
  ::v-deep .el-dialog {
    top: 50%;
    transform: translateY(-50%);
  }
}

.popoverDiv  {
  padding: 10px;
  padding-left: 20px;
  div{
    &:before{
      content: '①';
      display: block;
      position: absolute;
      left: 13px;
    }
    &:nth-of-type(2):before{
      content: '②';
    }
    &:nth-of-type(3):before{
      content: '③';
    }
  }
}

::v-deep .iSearch-content .operation {
  width: auto;
  display: none;
}

.clearfix::after {
  content: '';
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
}

::v-deep .el-popover__title {
  margin-bottom: 0;
}

.title {
  position: relative;
  display: inline-block;

  .text {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;

    .icon {
      cursor: pointer;
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
  .form1 {
    margin-bottom: 20px;
    border-bottom: 1px solid #E3E3E3;
  }

  .el-form {
    .el-form-item {
      width: calc(50% - 50px);
      margin-bottom: 20px;

      .el-input {
      }
    }
  }

  .timeClass {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .symbol {
      line-height: 38px;
    }

    ::v-deep .el-input {
      width: 45%;
    }
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
      padding-bottom: 20px;
    }
  }

  .add {
    float: right;
    margin-bottom: 10px;
  }
}
</style>

