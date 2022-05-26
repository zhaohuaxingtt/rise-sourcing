<!--合同归档首页表格-->
<template>
  <iTableCustom ref="testTable" :columns="columns" :data="tableData" @handle-selection-change="handleSelectionChange" />
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import RiseCodeOpenComponents from "./RiseCodeOpenComponents"
import { addType, statusList } from './data'

export default {
  name: 'queryTable',
  props: {
    tableData: { type: Array },
  },
  computed: {},
  created() {},
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 50
        },
        {
          prop: 'riseCode',
          name: 'RiSE编号',
          i18n: 'LK_RISEBIANHAO',
          tooltip: false,
          align: 'center',
          fixed: true,
          width: 200,
          customRender: (h, scope) => {
            return <RiseCodeOpenComponents row={scope.row} />
          },
        },
        {
          prop: 'subType',
          name: '采购申请类型',
          i18n: 'LK_CAIGOUSHENQINGLEIXING',
          tooltip: true,
          align: 'center',
          width: 130,
          fixed: false,
          customRender: (h, scope) => {
            return <span class="whitespace"> { addType.find(l => l.label == scope.row["subType"]).key }</span>
          }
        },
        {
          prop: 'applyBy',
          name: '申请人',
          i18n: 'LK_SHENQINGREN',
          tooltip: true,
          align: 'center',
          width: 100,
          fixed: false,
        },
        {
          prop: 'applyDeptNo',
          name: '申请人',
          i18n: 'LK_SHENQINGREN',
          tooltip: true,
          align: 'center',
          width: 100,
          fixed: false,
        },
        {
            prop: 'status',
            name: '状态',
            i18n: 'LK_ZHUANGTAI',
            align: 'center',
            tooltip: true,
            width: 120,
            fixed: false,
            customRender: (h, scope) => {
              return <span class="whitespace">{ statusList.find(h => h.key === scope.row["status"]).label }</span>
            }
        },
        {
          prop: 'createDate',
          name: '生成时间',
          i18n: 'LK_SHENQINGSHIJIAN',
          tooltip: true,
          align: 'center',
          width: 140,
          fixed: false,
        },
        {
          prop: 'ownerName',
          name: '推荐采购员',
          i18n: '推荐采购员',
          align: 'center',
          tooltip: true,
          width: 140,
          fixed: false,
        },
        {
          prop: 'remark',
          name: '备注',
          i18n: '备注',
          tooltip: true,
          align: 'center',
          width: 160,
          fixed: false
        },
      ],
    }
  },
  components: {
    iTableCustom,
  },
  methods: {
    handleSelectionChange(row) {
      this.$emit('handleSelectionChange', row)
    },
  },
}
</script>

<style scoped>
</style>
