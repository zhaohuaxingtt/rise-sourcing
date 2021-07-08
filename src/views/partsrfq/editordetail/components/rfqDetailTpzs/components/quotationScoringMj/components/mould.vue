<!--
 * @Author: yuszhou
 * @Date: 2021-07-08 16:48:36
 * @LastEditTime: 2021-07-08 16:54:04
 * @LastEditors: Please set LastEditors
 * @Description: 模具组件继承
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringMj\components\mould.vue
-->
<script>
import mould from 'rise/web/quotationdetail/components/mouldAndDevelopmentCost/components/mould'
export default {
  extends:mould,
  inject:['supplierId'],
  methods:{
    /**
     * @description: 重写模具费用新增时候，模具ID规则问题
     * @param {*}
     * @return {*}
     */
    handleAdd() {
      alert('aaaa')
      const mouldIdIndexes = this.tableListData.map(item => {
        const list = item.mouldId.split("_")
        return +list[list.length - 1].replace(/\D/g, "") || 0
      })

      mouldIdIndexes.sort((a, b) => b - a)
      const index = mouldIdIndexes[0] ? (mouldIdIndexes[0] >= 10 ? (mouldIdIndexes[0] + 1) + "" : "0" + (mouldIdIndexes[0] + 1)) : "01"

      this.tableListData.push({
        // mouldId: `${ this.partInfo.rfqId }_${ this.userInfo.supplierId ? this.userInfo.supplierId : this.$route.query.supplierId }_${ this.partInfo.partNum }_T${ index }`,
         mouldId: `${ this.partInfo.rfqId }_${ this.supplierId }_T${ index }`,
        fixedAssetsName: "",
        assembledPartPrjCode: this.partInfo.fsNum,
        carModeCode: this.partInfo.modelNameZh
      })
    },
  }
}
</script>