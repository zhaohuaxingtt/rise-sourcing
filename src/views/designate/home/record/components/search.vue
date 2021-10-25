<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 14:17:55
 * @LastEditTime: 2021-10-22 14:03:53
 * @LastEditors:  
-->
<template>
  <div class="search">
    <iSearch 
    class="margin-top20"
    @sure="sure"
    @reset="reset"
    >
      <el-form>
        <el-form-item :label="language('FS/GS/SP No.','FS/GS/SP No.')">
          <iInput
            v-model="formRecord.fsnrGsnrNum"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput>  
        </el-form-item>
        <el-form-item :label="language('nominationLanguage_LingJianHao','零件号')">
          <iInput
            v-model="formRecord.partNum"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput>         
        </el-form-item>
        <el-form-item :label="language('nominationLanguage_LingJianMingCheng','零件名称')">        
          <iInput
            v-model="formRecord.partNameCn"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput>   
        </el-form-item>
        <el-form-item :label="language('CHEXING','车型')">
          <iSelect 
            v-model="formRecord.carType"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            >
            <el-option value='' label='全部'></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU','车型项目')">
          <iSelect 
            v-model="formRecord.carTypeProj"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            >
            <el-option value='' label='全部'></el-option>
          </iSelect> 
        </el-form-item>
        <el-form-item :label="language('JIAGEZHUANGTAI','价格状态')">
          <iSelect 
            v-model="formRecord.applicationStatus"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            >
            <el-option value='' label='全部'></el-option>
          </iSelect> 
        </el-form-item>
        <el-form-item :label="language('DINGDIANGONGYINGSHANG','定点供应商')">
          <iInput
            v-model="formRecord.rfqSupplierName"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput> 
        </el-form-item>
        <el-form-item :label="language('LINGJIANXIANGMULEIXING','零件项目类型')">
          <iSelect 
            v-model="formRecord.partProjType"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            >
            <el-option value='' label='全部'></el-option>
          </iSelect> 
        </el-form-item>
        <el-form-item :label="language('XUNJIACAIGOUYUAN','询价采购员')">
          <iInput
            v-model="formRecord.nominateUser"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput> 
        </el-form-item>
        <el-form-item :label="language('LINIE','LINIE')">
         <iInput
            v-model="formRecord.linie"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput> 
        </el-form-item>
        <el-form-item :label="language('DINGDIANSHENQINGLEIXING','定点申请类型')">
          <iSelect 
            v-model="formRecord.isNewNominate"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            >
            <el-option value='' label='全部'></el-option>
          </iSelect> 
        </el-form-item>
          <el-form-item :label="language('DINGDIANSHIJIAN','定点时间')">
          <iDatePicker v-moudel='formRecord.nominateTime' type="date"></iDatePicker>
        </el-form-item>
      </el-form>
  </iSearch>
  </div>
</template>
<script>
import {iSearch, iInput, iSelect, iDatePicker} from 'rise'
import {form} from '../data'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker
  },
  data() {
    return {
      formRecord:{...form},
    }
  },
  methods: {
    sure() {
      let form = {...this.formRecord}
      this.$emit('search',form)
    },
    reset() {
      this.formRecord = {}
    this.$emit('search',{})    
  }
  }
}
</script>
<style>
</style>