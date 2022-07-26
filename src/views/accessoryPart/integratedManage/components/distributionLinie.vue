<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:57:31
 * @LastEditors:  
 * @LastEditTime: 2021-12-03 13:52:41
 * @Description: 分配询价科室弹窗
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\components\assignInquiryDepartment.vue
-->

<template>
  <iDialog 
    :title="language('FENPEILinie','分配Linie')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="400px"
  >
    <template slot="footer">
      <iButton @click="handleConfirm" :loading="loading">{{language('QUEREN','确认')}}</iButton>
      <iButton @click="handleCancel">{{language('QUXIAO','取消')}}</iButton>
    </template>
    <el-form class="elForm">
      <!-- <el-form-item :label="language('QINGXUANZELINIEKESHI','请选择linie科室')">
        <iSelect v-model="queryLinieDept" value-key="id"   @change="changeUserDept">
          <el-option
            v-for="item in deptOptions"
            :key="item.id"
            :label="item.deptNum"
            :value="item">
          </el-option>
        </iSelect> 
      </el-form-item> -->
      <el-form-item :label="language('QINGXUANZELINIE','请选择linie')">
        <iSelect v-model="queryLinie"  value-key="id"    @change="changeUser">
          <el-option
            v-for="item in linieOptions"
            :key="item.id"
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
import { listLinieDept, listUserByDepartIdAndRoleCode, updateCsfOrLinie, listUserByFunctionType } from '@/api/accessoryPart/index'
export default {
  components: { iDialog, iButton, iSelect },
  props: {
    dialogVisible: { type: Boolean, default: false },
    idList:{
      type:String,
    },
   
  },
  data() {
    return {
      queryLinieDept: '',
      queryLinie: '',
      deptOptions: [],
      linieOptions: [],
      loading: false,
      linieUpdata:{
        accessoryIdList:[],
        linieDept:'',
        linieDeptName:'',
        linieId:'',
        linieName:'',
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.queryLinieDept = ''
        this.queryLinie = ''
        this.linieUpdata={}
      }
    }
  },
  created() {
    this.getBuyer()
    // const params = {
    //   tag: '26'
    // }
    // getDeptList(params).then(res => {
    //   if (res.result) {
    //     this.deptOptions = res.data?.map(item => {return {value:item.id, label:item.nameZh}})
    //   } else {
    //     this.deptOptions = []
    //   }
    // })
  },
  methods: {
    getBuyer(){
      listUserByFunctionType(1).then(res=>{
        this.linieOptions = res.data || []
      })
    },
     getPurchaseDeptOptions() {
      listLinieDept().then(res=>{
        this.deptOptions = res.data || []
      })
    },
    getBuyerList(val) {
      let data ={
        deptId : val,
        roleCode : "LINIE",
      }
      listUserByDepartIdAndRoleCode(data).then(res=>{
        this.linieOptions = res.data || []
      })
    },
    clearDialog() {
      this.respDept = ''
      this.$emit('changeVisible', false)
    },
    handleCancel() {
      this.respDept = ''
      this.clearDialog()
    },
    handleConfirm() {
      if (this.linieUpdata.linieDept === ''|| this.linieUpdata.linieDept == undefined) {
        iMessage.warn(this.language('QINGXUANZELINIEKESHI','请选择linie科室'))
        return
      } 
      if(this.linieUpdata.linieId === ''|| this.linieUpdata.linieId == undefined) {
        iMessage.warn(this.language('QINGXUANZELINIE','请选择linie'))
        return
      }
      this.loading = true
      this.linieUpdata.accessoryIdList = this.idList
      updateCsfOrLinie(this.linieUpdata).then(res=>{
        if(res.code == '200') {
           iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
           this.$emit('init')
          this.$emit('changeVisible', false)
           this.loading = false
        } else {
           iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
           this.loading = false
        }
      })
    },
    changeLoading(loading) {
      this.loading = loading
    },
    changeUserDept(val) {
      this.queryLinie=""
      this.linieUpdata.linieDept = val.id
      this.linieUpdata.linieDeptName = val.deptNum
      this.getBuyerList(val.id)
    },
    changeUser(val) {
      this.linieUpdata.linieId = val.id
      this.linieUpdata.linieName = val.nameZh
      this.linieUpdata.linieDept = val.deptDTO.id
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