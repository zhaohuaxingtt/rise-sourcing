<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-18 10:24:09
 * @LastEditors: caopeng
 * @Descripttion: 项目概览
-->
<template>
  <!-- @handleTitle="addFile(6,'项目概览')"  -->
  <iCard 

         @handleTitle="addFile($event,6, '项目概览')"
         :title="$t('TPZS.XMGL')+'RFQ'+$route.query.id+`<span class='cursor' ><i style='color:#67C23A; font-weight: bold;font-size: 18px;' class='el-icon-shopping-cart-1'></i></span>`"
         :defalutCollVal='false'
         collapse>
         <div  id="card6">
            <projectInfor />
                <el-divider></el-divider>
                <partInforTable />
                <supplierTable class="margin-top20" />
         </div>
   
  </iCard>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, iFormItem, iText, iFormGroup, iLabel, icon } from 'rise'
import projectInfor from './projectInfor.vue'
import partInforTable from './partInforTable.vue'
import supplierTable from './supplierTable.vue'
import { downloadPdfMixins } from '@/utils/pdf'
import { icardData } from '../../data'
export default {
  mixins: [downloadPdfMixins],
  // import引入的组件需要注入到对象中才能使用
  components: {
    iCard,
    iFormItem,
    iText,
    iFormGroup,
    iLabel,
    icon,
    projectInfor,
    partInforTable,
    supplierTable,
  },
    props:{
          rfqInfoData: { type: Object },
  },
  data() {
    // 这里存放数据
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
          rfqInfoData(val){
          this.rfqInfoData=val
      }
  },
  // 方法集合
  methods: {
    emitRfq(rfq) {
      this.$emit('rfqInfo', rfq)
    },
 
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
}
</script>
<style lang='scss' >
// @import url(); 引入公共css类
.info {
  font-weight: Bold;
  font-size: 1rem;
}
.el-divider--horizontal {
  margin: 20px 0;
}
</style>
