<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 14:17:55
 * @LastEditTime: 2021-10-26 11:42:32
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
            :placeholder="
              language('LK_QINGXUANZE','请选择') +
              language('CHEXING','车型')
            "

            v-model="formRecord.carType"
            >
            <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
             <el-option 
             v-for="items  in (fromGroup && fromGroup['cartOptions']) || []" 
             :key='items.code' 
             :value='items.code'  
            :label="items.name"/>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU','车型项目')">
          <iSelect
            :placeholder="
              language('LK_QINGXUANZE','请选择') +
              language('CHEXINGXIANGMU','车型项目')
            "
            v-model="formRecord.carTypeProj"
          >
            <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.code"
              :label="items.value"
              v-for="(items, index) in (fromGroup && fromGroup.CAR_TYPE_PRO) || []"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('JIAGEZHUANGTAI','价格状态')">
           <iSelect 
            v-model="formRecord.applicationStatus"
            :placeholder="
            language('partsprocure.CHOOSE','请选择') +
            language('JIAGEZHUANGTAI','价格状态')
            "
            >
             <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.code"
              :label="items.name"
              v-for="(items, index) in (fromGroup && fromGroup.PRICE_STATE) || []"
              :key="index"
            ></el-option>
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
            :placeholder="
            language('partsprocure.CHOOSE','请选择') +
            language('partsprocure.PARTSPROCUREPARTITEMTYPE','零件项目类型')
            "
            >
             <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="items.code"
              :label="items.name"
              v-for="(items, index) in (fromGroup && fromGroup.PPT) || []"
              :key="index"
            ></el-option>
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
            :placeholder="language('LK_QINGXUANZE','请选择')
             + 
             language('DINGDIANSHENQINGLEIXING','定点申请类型')"
             >
             <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
            <el-option
            :value="item.id"
            :label="item.desc"
            v-for="(item, index)  in (fromGroup && fromGroup['applyType']) || []"
            :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('DINGDIANSHIJIAN','定点时间')">
          <iDatePicker 
          v-model='formRecord.nominateTime'
           value-format="yyyy-MM-dd">
           </iDatePicker>
        </el-form-item>
      </el-form>
  </iSearch>
  </div>
</template>
<script>
import {iSearch, iInput, iSelect, iDatePicker} from 'rise'
import {selectDictByKeyss} from '@/api/dictionary'
import {getCartypeDict} from "@/api/partsrfq/home";

import {
  getNominateType
} from '@/api/designate'
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
      fromGroup:[]
    }
  },
  created() {
    this.getSelectGroup()
  },
  methods: {
    sure() {
      let form = {...this.formRecord}
      this.$emit('search',form)
    },
    reset() {
      this.formRecord = {}
    this.$emit('search',{})    
    },
    getSelectGroup() {
      let types = [
        "RFQ_PART_STATUS_CODE_TYPE",
        "CAR_TYPE_PRO",
        "PPT",
        'PRICE_STATE'
      ];
      selectDictByKeyss(types).then((res) => {
        this.fromGroup = res.data
        this.getNominate()
        this.getCar()
      });
    },
    getNominate(){
      getNominateType().then(res => {
        this.$set(this.fromGroup,'applyType',res.data)
      })
    },
    getCar(){
       getCartypeDict().then(res=> {
         let data = Array.isArray(res.data) ?
            res.data.map(item => ({
              ...item,
              key: item.code,
              label: item.name,
              value: item.value
            })) :
            []
          this.$set(this.fromGroup,'cartOptions',data)
      })
    }
  }
}
</script>
<style>
</style>