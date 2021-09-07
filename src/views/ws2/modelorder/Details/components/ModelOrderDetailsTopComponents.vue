<template>
  <i-card :title="$t('LK_JICHUXINXI')" class='margin-top20' collapse :defalutCollVal='true'>
    <i-form-group :model='orderDetails' :rules='orderDetailsRules' ref='orderDetailsRef' row='1'>
      <!--第一行-->
      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--订单类型-->
          <i-form-item :label="$t('MODEL-ORDER.LK_DINGDANLEIXING')" prop='contractType'>
            <i-text>{{ orderType }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--RISE订单号-->
          <i-form-item :label="$t('MODEL-ORDER.LK_RISEDINGDANHAO')">
            <i-text>{{ orderDetails.contractCode }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--SAP订单号-->
          <i-form-item :label="$t('MODEL-ORDER.LK_SAPDINGDANHAO')">
            <i-text>{{ orderDetails.contractSapCode }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--合同状态-->
          <i-form-item :label="$t('MODEL-ORDER.LK_HETONGZHUANGTAI')">
            <i-text :class="contractStatusStyle">{{ contractStatusVal }}</i-text>
          </i-form-item>
        </el-col>
      </el-row>
      <!--第二行-->

      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--供应商-->
          <i-form-item :label="$t('MODEL-ORDER.LK_GONGYINSHANG')" prop='supplierInfo'>
            <i-text v-if='generalEditorState'>{{ orderDetails.supplierSapCode }}</i-text>
            <i-input v-else :placeholder="$t('MODEL-ORDER.LK_QINGSHURUGONGYINGSHANGBIANMA')"
                     v-model.trim='orderDetails.supplierInfo'
                     @blur='querySupplierInfoAsync(orderDetails.supplierInfo)' :disabled='generalEditorState'/>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--采购组-->
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUZU')" prop='procureGroup'>
            <i-input v-if='purchasingGroupEditerState' :placeholder="$t('MODEL-ORDER.LK_QINGSHURUCAIGOUZU')"
                     v-model.trim='procureGroupComputed'/>
            <i-text v-else>{{ procureGroupComputed }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--采购员-->
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUYUAN')" prop='buyerName'>
            <i-text>{{ orderDetails.buyerName }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--订单状态-->
          <i-form-item :label="$t('MODEL-ORDER.LK_DINGDANZHUANGTAI')" prop='state'>
            <i-text>{{ orderState }}</i-text>
          </i-form-item>
        </el-col>
      </el-row>
      <!--第三行-->
      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--采购工厂-->
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUGONGCHANG')" prop='procureFactory'>
            <i-text v-if='generalEditorState'>{{ orderDetails.procureFactory }}</i-text>
            <i-select v-else v-model.trim='orderDetails.procureFactory'
                      :placeholder="$t('MODEL-ORDER.LK_QINGXUANZECAIGOUGONGCHANG')"
                      @change='factorySelectChanged' :disabled='generalEditorState'>
              <el-option v-for='(item, index) in purchasingFactoryList' :value='item.procureFactory'
                         :label='`${item.procureFactory}-${item.factoryName}`' :key='index'></el-option>
            </i-select>
          </i-form-item>
        </el-col>

        <el-col :span='6'>
          <!--订单日期-->
          <i-form-item :label="$t('MODEL-ORDER.LK_DINGDANRIQI')" name='test' prop='orderDate'>
            <i-text v-if='generalEditorState'>{{ orderDetails.orderDate }}</i-text>
            <i-date-picker
                v-else
                type='date'
                v-model.trim='orderDetails.orderDate'
                format='yyyy-MM-dd'
                value-format='yyyy-MM-dd'
                placeholder='YYYY-DD-MM'
                :disabled='generalEditorState'
            />
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--所属部门-->
          <i-form-item :label="$t('MODEL-ORDER.LK_SUOSHUBUMEN')">
            <i-text>{{ orderDetails.departmentCode }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--版本-->
          <i-form-item :label="$t('MODEL-ORDER.LK_BANBEN')">
            <i-text>{{ orderDetails.version }}</i-text>
          </i-form-item>
        </el-col>
      </el-row>
      <!--第四行-->
      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--公司代码-->
          <i-form-item :label="$t('MODEL-ORDER.LK_GONGSHIDAIMA')">
            <i-text>{{ orderDetails.companyCode }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--货币-->
          <i-form-item :label="$t('LK_HUOBI')" prop='currency'>
            <i-text>{{ orderDetails.currency }}</i-text>
          </i-form-item>
        </el-col>
        <!--采购组织-->
        <el-col :span='6'>
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUZUZHI')">
            <i-text>{{ orderDetails.procureOrganization }}</i-text>
          </i-form-item>
        </el-col>
        <!--付款条件-->
        <el-col :span='6'>
          <i-form-item :label="$t('MODEL-ORDER.LK_FUKUANTIAOJIAN')">
            <i-text> {{ orderDetails.paymentCode }}</i-text>
          </i-form-item>
        </el-col>
      </el-row>
      <!--第五行-->
      <el-row>
        <el-col :span='24'>
          <!--备注-->
          <i-form-item :label="$t('LK_BEIZHU')">
            <i-text v-if='inputRemarksEditerState'>{{ orderDetails.remark }}</i-text>
            <i-input v-else :placeholder="$t('partsprocure.PLEENTER')" v-model.trim='orderDetails.remark'
                     :disabled='inputRemarksEditerState'/>
          </i-form-item>
        </el-col>
      </el-row>
    </i-form-group>
  </i-card>
</template>

<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iText,
  iInput,
  iDatePicker,
  iSelect
} from 'rise'
import {getSupplierInfoQuery} from "@/api/ws2/modelOrder";

export default {
  name: "ModelOrderDetailsTopComponents",
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iSelect,
    iText,
    iInput,
    iDatePicker
  },
  props: {
    orderDetails: {type: Object, require: true},
    id: {type: Number, default: -1},
    isEdit: {type: Boolean, default: true},
    option: {type: Number, default: 0},
    purchasingFactoryList: {type: Array, default: () => []},
    orderStatusList: {type: Array, default: () => []},
    containPurchaseGroup: {type: Boolean, default: false},
    contractStatusList: {type: Array, default: () => []},
  },
  computed: {
    //通用状态
    generalEditorState: function () {
      return this.option == 1 ? true : false
    },
    //构建订单状态值
    orderState: function () {
      if (this.orderStatusList.length <= 0) {
        return ''
      }
      return this.orderStatusList.find((i) => i.code === this.orderDetails.state).name
    },
    //备注编辑状态
    inputRemarksEditerState: function () {
      if (this.option == 0) {//创建模式 可编辑
        return false
      }

      if (this.orderDetails.state == 'draft' || this.orderDetails.state == 'formal') {//草稿和正式可编辑
        if (this.containPurchaseGroup) {
          return !this.isEdit
        }
        return true
      }
      return true //历史状态不可编辑
    },
    //订单类型
    orderType: function () {

      return '模具订单'
    },
    procureGroupComputed: {
      get: function () {
        return this.orderDetails.procureGroup
      },
      set: function (val) {
        this.orderDetails.procureGroup = val.toUpperCase()
      }
    },
    contractStatusStyle: function () {
      if (this.id == -1) {
        return null
      } else {
        return 'red'
      }
    },
    contractStatusVal: function () {
      if (this.id == -1) {
        return ""
      } else {
        if (this.orderDetails.contractStatus == null || this.orderDetails.contractStatus == '') {
          return '未创建'
        } else {
          if (this.contractStatusList.length <= 0) {
            return ''
          }
          return this.contractStatusList.find((i) => i.code === this.orderDetails.contractStatus).name
        }
      }
    }
  },
  data() {
    return {
      purchasingGroupEditerState: false,
      orderDetailsRules: {
        supplierInfo: [{required: true, message: '请输入供应商编码', trigger: 'blur'}],
        procureGroup: [{required: true, message: '请输入采购组', trigger: 'blur'}],
        procureFactory: [{required: true, message: '请选择采购工厂', trigger: 'change'}],
        orderDate: [{required: true, message: '请选择日期', trigger: 'change'}]
      }
    }
  },
  created() {
    this.purchasingGroupEditerStateFunction()
  },
  watch: {
    isEdit(val, oldVal) {
      this.purchasingGroupEditerStateFunction()
    },
    containPurchaseGroup(val) {
      this.purchasingGroupEditerStateFunction()
    }
  },
  methods: {
    //计算采购组编辑状态属性值
    purchasingGroupEditerStateFunction() {
      console.log(this.option)
      if (this.option == 0) {//创建模式 可编辑
        this.purchasingGroupEditerState = true
      } else {
        if (this.containPurchaseGroup) {
          if (this.orderDetails.state == 'draft') {//草稿状态可更改
            this.purchasingGroupEditerState = this.isEdit
          } else if (this.orderDetails.state == 'formal' && this.orderDetails.procureGroup.startsWith('PZ')) {
            this.purchasingGroupEditerState = this.isEdit
          } else {
            this.purchasingGroupEditerState = false
          }
        } else {
          this.purchasingGroupEditerState = false
        }
      }
    },

    //查询供应商
    querySupplierInfoAsync(queryString) {
      if (queryString == null || queryString == '' || queryString == undefined) {
        return
      }
      getSupplierInfoQuery({
        sapCode: queryString,
        supplierType: 'PP'
      }).then((res) => {
        if (res.code != 200 || res.data == null) {
          return this.$message.error('供应商主数据不存在')
        } else {
          this.orderDetails.supplierInfo = `${res?.data?.sapCode}-${res?.data?.nameZh}`
          this.orderDetails.supplierShortNameZh = res?.data?.shortNameZh
          this.orderDetails.supplierSapCode = res?.data?.sapCode
          this.orderDetails.tmSupplierId = res?.data?.supplierId
        }
      })
    },
    //选择采购工厂 回调
    factorySelectChanged(val) {
      let factory = this.purchasingFactoryList.find(function (item) {
        return item.procureFactory === val
      })
      this.orderDetails.companyCode = factory.companyCode
      this.orderDetails.tmFactoryId = factory.id
    },
    //重置表单
    restOrderForm() {
      this.$refs.orderDetailsRef.resetFields()
    },
    //获取表单验证结果
    getOrderDetailsValidate() {
      let isValidate = ''
      this.$refs.orderDetailsRef.validate((val) => {
        isValidate = val
      })
      return isValidate
    },
    //获取子组件的值
    getOrderDetailsVal() {
      return this.orderDetails
    },
  }
}
</script>

<style scoped>

.red {
  color: red;
}
</style>