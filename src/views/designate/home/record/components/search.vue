<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-21 14:17:55
 * @LastEditTime: 2022-03-31 15:04:32
 * @LastEditors: YoHo
-->
<template>
  <div class="search">
    <iSearch 
    class="margin-top20"
    @sure="sure"
    @reset="reset"
    >
      <el-form>
        <el-form-item :label="language('FS/GS/SP No.','FS/GS/SP No.')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_FSGSSPNO|FSGSSPNO">
          <iInput
            clearable
            v-model="formRecord.fsnrGsnrNum"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput>  
        </el-form-item>
        <el-form-item :label="language('nominationLanguage_LingJianHao','零件号')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_PARTNUM|零件号">
          <!-- <iInput
            clearable
            v-model="formRecord.partNum"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput> -->
          <iMultiLineInput v-model="formRecord.partNum" :title="language('nominationLanguage_LingJianHao', '零件号')" />
        </el-form-item>
        <el-form-item :label="language('nominationLanguage_LingJianMingCheng','零件名称')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_PARTNAME|零件名称">        
          <iInput
            clearable
            v-model="formRecord.partNameCn"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput>   
        </el-form-item>
        <el-form-item :label="language('CHEXING','车型')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_CARTYPE|车型">
          <iSelect 
            clearable
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
        <el-form-item :label="language('CHEXINGXIANGMU','车型项目')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_CARTYPEPROJ|车型项目">
          <iSelect
            clearable
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
        <el-form-item :label="language('JIAGEZHUANGTAI','价格状态')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_APPLICATIONSTATUS|价格状态">
           <iSelect 
            clearable
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
        <!-- <el-form-item :label="language('DINGDIANGONGYINGSHANG','定点供应商')">
          <iInput
            v-model="formRecord.rfqSupplierName"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput> 
        </el-form-item> -->
        <el-form-item :label="language('LINGJIANXIANGMULEIXING','零件项目类型')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_PARTPROJTYPE|零件项目类型">
          <iSelect 
            clearable
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
        <el-form-item :label="language('XUNJIACAIGOUYUAN','询价采购员')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_CSF|询价采购员">
          <iInput
            clearable
            v-model="formRecord.nominateUser"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput> 
        </el-form-item>
        <el-form-item :label="language('LINIE','LINIE')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_LINIE|LINIE">
         <iInput
            clearable
            v-model="formRecord.linie"
            :placeholder="language('LK_QINGSHURU','请输入')"
          >
          </iInput> 
        </el-form-item>
        <el-form-item :label="language('DINGDIANSHENQINGLEIXING','定点申请类型')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_NOMINATIONTYPE|定点申请类型">
          <iSelect 
            clearable
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
              :label="language(item.key,item.name)"
              v-for="(item, index)  in (fromGroup && fromGroup['applyType']) || []"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('DINGDIANSHIJIAN','定点时间')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_NOMIDATE|定点时间">
          <iDatePicker 
          clearable
          v-model='formRecord.nominateTime'
           type="daterange"
           value-format="yyyy-MM-dd">
           </iDatePicker>
           
        <!-- <iDatePicker
          v-model='form.checkDate'
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss">
        </iDatePicker> -->
      <!-- </el-form-item> -->
        </el-form-item>
        <!-- 显示自己 -->
        <el-form-item :label="language('nominationLanguage_XianShiZiJi','显示自己')" v-permission.auto="SOURCING_NOMINATION_NOMINATIONRECORD_SHOWSELF|显示自己">
          <iSelect
            v-model="formRecord.showSelf"
            :placeholder="language('LK_QINGXUANZE','请选择')"
            clearable
          >
            <el-option
              value=""
              :label="language('all','全部') | capitalizeFilter"
            ></el-option>
            <el-option :value="true" :label="language('YES','是')"
            ></el-option>
            <el-option :value="false" :label="language('NO','否')"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
  </iSearch>
  </div>
</template>
<script>
import {iSearch, iInput, iSelect, iDatePicker, iMessage, iMultiLineInput} from 'rise'
import {selectDictByKeyss} from '@/api/dictionary'
import {getCartypeDict} from "@/api/partsrfq/home";
import { getCarTypeSop } from "@/api/partsprocure/editordetail"

import {
  getNominateType
} from '@/api/designate'
import {form} from '../data'
export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDatePicker,
    iMultiLineInput
  },
  data() {
    return {
      formRecord:{...form},
      fromGroup:[]
    }
  },
  created() {
    this.getSelectGroup()
    this.getCarTypeSop()
  },
  methods: {
    sure() {
      let form = { ...this.formRecord, nominateStartTime: Array.isArray(this.formRecord.nominateTime) ? this.formRecord.nominateTime[0] : undefined, nominateEndTime: Array.isArray(this.formRecord.nominateTime) ? this.formRecord.nominateTime[1] : undefined }
      delete form.nominateTime
      this.$emit('search',form)
    },
    reset() {
      this.formRecord = {
        ..._.cloneDeep(form)
      }
      this.$emit('search', this.formRecord)    
    },
    getSelectGroup() {
      let types = [
        "RFQ_PART_STATUS_CODE_TYPE",
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
        if (res?.result) {
            const apply = []
            Array.from(res.data).forEach(item => {
                apply.push({id:item.code,name:item.desc,key:item.code})
            })
            this.$set(this.fromGroup,'applyType',apply)
        } else {
            this.applyType = []
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
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
    },
    // 获取车型项目
    getCarTypeSop() {
      getCarTypeSop().then(res => {
        if (res.code === '200') {
          this.$set(
            this.fromGroup,
            "CAR_TYPE_PRO",
            Array.isArray(res.data) ?
              res.data.map(item => ({
                id: item.id,
                code: item.cartypeProCode,
                name: item.cartypeProName,
                value: item.cartypeProName
              })) :
              []
          )
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search{
  ::v-deep .el-date-editor .el-range__close-icon{
    display: block;
    width: 10px;
  }
}
</style>