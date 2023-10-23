<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 11:34:43
 * @LastEditors: Please set LastEditors
 * @Descripttion: 定点记录
-->
<template>
  <iCard @handleTitle="addFile($event,9, '定点记录')"
         :title="$t('TPZS.DDJV')+`<span class='cursor' style='margin-right: 20px;'><i style='color:#67C23A; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>` + `<span style='color: #909091'>` +categoryCode + `</span>` +  `<span style='color: #909091'>` +$t('TPZS.DDJLMEMO') + `</span>`"
         :defalutCollVal='false'
         collapse>
    <tableList id="card9"
               :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :selection='false'
               :index="true"
               @handleSelectionChange="handleSelectionChange">

    </tableList>
  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iFormItem, iText, iFormGroup, iLabel, icon, iCard } from "rise";
import tableList from '@/components/ws3/commonTable';
import { listFixedPointHistory } from "@/api/partsrfq/negotiateBasicInfor/negotiateBasicInfor.js";
import { fixedRecordTableTitle } from "./data";
import { downloadPdfMixins } from '@/utils/pdf'
import { icardData } from '../../data'
export default {
  mixins: [downloadPdfMixins],
  // import引入的组件需要注入到对象中才能使用
  components: { iFormItem, iText, iFormGroup, iLabel, icon, tableList, iCard },
  props: {
    rfqInfoData: { type: Object },
  },
  data () {
    // 这里存放数据
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
      tableListData: [],
      tableTitle: fixedRecordTableTitle,
      tableLoading: false,
      categoryCode: ""
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    rfqInfoData (val) {
      this.rfqInfoData = val
    }
  },
  // 方法集合
  methods: {
    async getTableList () {
      this.tableLoading = true;
      try {
        const pms = {
          rfqId: this.$route.query.id
        }
        const res = await listFixedPointHistory(pms);
        if (res.result) {
          var resData = res.data;
          if (resData && resData.length > 0) {
            resData.forEach((header) => {
              if (header.nomiRecordDetailVO && header.nomiRecordDetailVO.length > 0) {
                this.categoryCode = header.materialCode ? header.materialCode + "-" + header.materialName : header.materialName;
                header.nomiRecordDetailVO.forEach((detail) => {
                  this.tableListData.push(this.createTableRow(header.fsnrGsnrNum, header.partNum, header.rfqId, header.rfqName,
                    header.liniePrincipal, detail.purchasingFactory, header.carTypeProj,
                    this.$i18n.locale == 'zh' ? detail.supplierNameCn : detail.supplierNameEn, detail.tto, header.nominateTime))
                })
              } else {
                this.tableListData.push(this.createTableRow(header.fsnrGsnrNum, header.partNum, header.rfqId, header.rfqName,
                  header.liniePrincipal, "", header.carTypeProj,
                  "", "", header.nominateTime))
              }
            })
          }
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    createTableRow (fsnrGsnrNum, partNum, rfqId, rfqName, material, stuffName, carTypeProj, supplierNameCn, apriceModel, nominateDate) {
      var tableRow = {
        fsnrGsnrNum: fsnrGsnrNum,
        partNum: partNum,
        rfqId: rfqId,
        rfqName: rfqName,
        material: material,
        craft: stuffName,
        carTypeProj: carTypeProj,
        supplierNameCn: supplierNameCn,
        apriceModel: apriceModel && String(apriceModel).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        nominateDate: nominateDate.split(' ')[0]
      }
      return tableRow

    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getTableList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' >
// @import url(); 引入公共css类
.info {
  font-weight: Bold;
}
</style>
