<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-28 16:01:28
 * @LastEditTime: 2021-11-04 14:35:52
 * @LastEditors:  
-->
<template>
  <iDialog
    title="明细"
    :visible="visibleDiolog"
    width="90%"
    @close="clearDiolog"
  >
    <iFormGroup row="4" :rules="rules" >
      <iFormItem v-for="(item, index) in detailTitle" :key="index" :label="item.label">
        <iText v-if="item.props == 'procureFactory'">
          {{ detailList.procureFactory }} {{ detailList.factoryName ? `-${ detailList.factoryName }` : "" }}
        </iText>
        <iText v-else-if="item.props == 'supplierSapCode'">
          {{ detailList.supplierSapCode }} {{ detailList.supplierNameZh ? `-${ detailList.supplierNameZh }` : "" }}
        </iText>
        <iText v-else>{{ translate(detailList[item.props], item.props) }}</iText>
      </iFormItem>
    </iFormGroup>
  </iDialog>
</template>
<script>
import {iDialog, iFormGroup, iFormItem, iText, iMessage} from 'rise' 
import {detailTitle} from './data'
import {getPurchaseDetail} from '@/api/partsprocure/editordetail'
export default {
  components: {
    iDialog,
    iFormGroup,
    iFormItem,
    iText
  },
  props: {
    visibleDiolog: {
      type: Boolean,
      default:false
    },
     item:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      detailTitle,
      detailList:{}
    }
  },
  watch:{
    visibleDiolog(res) {
      if (res) this.init()
    }
  },
  methods: {
    clearDiolog() {
      this.$emit("update:visibleDiolog", false)
    },
    init() {
      let data = {
        riseCode: this.item.riseCode,
        sapItem: this.item.sapItem,
      }
      getPurchaseDetail(data).then(res => {
        if (res.code == 200) {
          this.detailList = Array.isArray(res.data) ? (res.data[0] || {}) : {}
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },
    translate(value, type) {
      const map = {
        subType: {
          43: this.language("YUPILIANGCAIGOUSHENQING", "预批量采购申请"),
          45: this.language("BIAOZHUNCAIGOUSHENQING", "标准采购申请"),
          411: this.language("GONGXUWEIWAIYAOHUO", "工序委外要货")
        },
        itemSource: {
          1: this.language("SAP", "SAP"),
          2: this.language("SHOUDONGTONGBU", "手动同步"),
          3: this.language("RENGONGCHUANGJIAN", "人工创建")
        },
        status: { // order工程此处没有走翻译
          1: "已创建",
          2: "已关联订单",
          3: "订单已推送SAP",
          4: "关闭"
        },
        nominationStatus: {
          0: "未发起转定点",
          1: "已转定点",
          2: "已定点"
        }
      }

      return map[type] ? (map[type][value] || value) : value
    }
  }
}
</script>
<style>
</style>
