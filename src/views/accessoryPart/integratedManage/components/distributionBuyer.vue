<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 16:11:07
 * @LastEditors:  
 * @LastEditTime: 2021-12-03 14:00:47
 * @Description: 分配询价采购员弹窗
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\components\assignInquiryBuyer.vue
-->

<template>
  <iDialog 
    :title="language('FENPEIXUNJIACAIGOUYUAN','分配询价采购员')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="400px"
    class="dialog"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('QUEREN','确认')}}</iButton>
      <iButton @click="handleCancel">{{language('QUXIAO','取消')}}</iButton>
    </template>
      <el-form class="elForm">
        <!-- <el-form-item :label="language('QINGXUANZEXUNJIACAIGOUKESHI','请选择询价采购科室')">
          <iSelect v-model="queryPurchaseDept"   value-key="id"  @change="changeDept">
            <el-option
              v-for="item in purchaseDeptOptions"
              :key="item.id"
              :label="item.deptNum"
              :value="item">
            </el-option>  
          </iSelect> 
        </el-form-item> -->
        <el-form-item :label="language('QINGXUANZEXUNJIACAIGOUYUAN','请选择询价采购员')">
          <iSelect v-model="queryPurchaseBuyer"  value-key="id" @change="changepurchaseBuyer">
            <el-option
              v-for="item in purchaseBuyerOptions"
              :key="item.value"
              :label="item.nameZh"
              :value="item">
            </el-option>  
          </iSelect> 
        </el-form-item>
      </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iSelect, iMessage } from 'rise'
import { listUserByDepartIdAndRoleCode , listDepartByTag, updateCsfOrLinie, listUserByDepartId, listUserByFunctionType } from '@/api/accessoryPart/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    deptId: { type: String},
    idList:{
      type:String,
    },
    hasUpdateStatus: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      queryPurchaseDept: '',
      queryPurchaseBuyer: '',
      purchaseDeptOptions: [],
      purchaseBuyerOptions: [],
      loading: false,
      purchaseUpdata:{
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if (val && this.deptId) {
        this.respLINIE = ''
        this.getUserList()
      }
    }
  },
  created(){
    this.getBuyer()
  },
  methods: {
    getUserList() {
      // getUserList({deptId:this.deptId,tag:'9'}).then(res => {
      //   if (res.result) {
      //     this.userOptions = res.data?.map(item => {return {value:item.id, label:item.nameZh}})
      //   } else {
      //     this.userOptions = []
      //   }
      // })
    },
    getBuyer(){
      listUserByFunctionType(0).then(res=>{
        this.purchaseBuyerOptions = res.data || []
      })
    },

    getPurchaseDeptOptions() {
      let data = '26'
      listDepartByTag(data).then(res=>{
          this.purchaseDeptOptions = res.data|| []
      })
    },
    getBuyerList(val) {
      let data ={
        deptId : val,
        roleCode : "PJCGY",
      }
      listUserByDepartId(data).then(res=>{
      // listUserByDepartIdAndRoleCode(data).then(res=>{
        this.purchaseBuyerOptions = res.data || []
      })
    },
    clearDialog() {
     this.purchaseUpdata={}
      this.queryPurchaseBuyer = ''
      this.queryPurchaseDept = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.clearDialog()
    },
    handleConfirm() {
       if (this.purchaseUpdata.csfDept === '' || this.purchaseUpdata.csfDept == undefined) {
        iMessage.warn(this.language('QINGXUANZEXUNJIACAIGOUKESHI','请选择询价采购科室'))
        return
      } 
      if(this.purchaseUpdata.csfuserId === '' || this.purchaseUpdata.csfuserId == undefined) {
        iMessage.warn(this.language('QINGXUANZEXUNJIACAIGOUYUAN','请选择询价采购员'))
        return
      }
      this.purchaseUpdata.accessoryIdList = this.idList
      this.purchaseUpdata.hasUpdateStatus = this.hasUpdateStatus
      updateCsfOrLinie(this.purchaseUpdata).then(res=>{
        this.loading = true
        if(res.code == '200') {
           iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
           this.clearDialog()
           this.$emit('init')
           this.loading = false
        } else {
           iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
           this.clearDialog()
           this.loading = false
        }
      })
    },
    changeLoading(loading) {
      this.loading = loading
    },
    changeDept(val) {
      this.queryPurchaseBuyer = ''
      this.purchaseUpdata.csfDept = val.id
      this.purchaseUpdata.csfDeptName = val.deptNum
      this.getBuyerList(val.id)
    },
    changepurchaseBuyer(val) {
      this.purchaseUpdata.csfuserId = val.id
      this.purchaseUpdata.csfuserName = val.nameZh
      this.purchaseUpdata.csfDept = val.deptDTO.id
      this.purchaseUpdata.csfDeptName = val.deptDTO.deptNum
      console.log(val);
    }
  }
}
</script>

<style lang="scss" scoped>
  .elForm{
    display: flex;
    justify-content: space-around;
    ::v-deep .el-form-item{
      width: 100%;
    }
  }
</style>