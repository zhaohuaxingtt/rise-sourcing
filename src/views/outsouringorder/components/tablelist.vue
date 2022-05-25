<!--
 * @Author: lyujiahong
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-04-01 20:08:22
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \rise\src\views\partsign\components\tableList.vue
-->
<template>
  <el-table tooltip-effect="light" :height="height" :data="tableData" v-loading="tableLoading" @selection-change="handleSelectionChange" :empty-text="$t('LK_ZANWUSHUJU')" ref="moviesTable" :class="radio && 'radio'" :key="keystring">
    <el-table-column v-if="selection" type="selection" width="50" align="center"></el-table-column>
    <template v-for="(items, index) in tableTitle">
      <!--------------- 采购工厂信息 -------------------->
      <el-table-column :key="index" align="center" v-if="items.props == 'procureFactory'" :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <span>{{ scope.row['procureFactory'] }}</span>
        </template>
      </el-table-column>
      <!--------------- 供应商信息 -------------------->
      <el-table-column :key="index" align="center" :show-overflow-tooltip="items.tooltip" v-else-if="items.props == 'supplierSapCode'" :label="$t(items.key)" :prop="items.props" :min-width="items.minWidth ? items.minWidth.toString() : ''">
        <template slot-scope="scope">
          <span>{{ `${scope.row.supplierSapCode}-${scope.row.supplierShortNameZh}` }}</span>
        </template>
      </el-table-column>
      <!--------------- 新价格开始日期 -------------------->
      <el-table-column :key="index" align="center" v-else-if="items.props == 'sopDateNew'" :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <el-date-picker v-if="(scope.row['increase'] && $store.state.permission.userInfo.userType == 1) || scope.row['update']" class="width150" placeholder="选择日期" v-model="scope.row['sopDateNew']" @change="handleChangeDate(scope.row['item'], scope.row, 'start')" :clearable="false"></el-date-picker>
          <span v-else>{{ scope.row['sopDateNew'] != null ? translateData(scope.row['sopDateNew']) : ' ' }}</span>
        </template>
      </el-table-column>
      <!--------------- 新价格结束日期 -------------------->
      <el-table-column :key="index" align="center" v-else-if="items.props == 'sopDateOrigin'" :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <span>{{ translateData(scope.row['sopDateOrigin']) }}</span>
        </template>
      </el-table-column>
      <!--------------- 零件类型 -------------------->
      <el-table-column :key="index" align="center" v-else-if="items.props == 'partType'" :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <span>{{ translatePartType(scope.row['partType']) }}</span>
        </template>
      </el-table-column>
      <!--------------- 价格预览 -------------------->
      <el-table-column :key="index" align="center" v-else-if="items.props == 'operation'" :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <span class="openLinkText cursor" @click="openPage(scope.row)">{{ $t('LK_JIAGEYULAN') }}</span>
        </template>
      </el-table-column>
      <!--------------- 供应商确认 -------------------->
      <el-table-column :key="index" align="center" v-else-if="items.props == 'supplierConfirmStatus'" :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <span :class="supplierTypeList.find((i) => i.code == scope.row['supplierConfirmStatus']).class">{{ supplierTypeList.find((i) => i.code == scope.row['supplierConfirmStatus']).name }}</span>
          <el-tooltip v-if="scope.row['supplierConfirmStatus'] == '1' && scope.row['supplierModifyContent'] != null" class="item" effect="light" :content="`供应商修改内容：${scope.row['supplierModifyContent']}`" placement="bottom">
            <span class="g-red"> <icon class="el-icon-warning-outline" color="red" /></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <!--------------- 零件号 -------------------->
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-else-if="items.props == 'partCode'"
        :prop="items.props"
        :label="$t(items.key)"
        :min-width="items.minWidth ? items.minWidth.toString() : ''"
      >
        <template slot-scope="row">
          <span class="whitespace">{{ row.row["partCode"] }}</span>
        </template>
      </el-table-column>
      <!--------------- 价格 PRICEORDER_OFFICEPRICE_OFFICIALPRICELIST_APRICE-------------------->
      <el-table-column :key="index" align="center" v-else-if="items.props == 'aPriceOrigin'" :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props">
        <template slot-scope="scope">
          <span>{{ scope.row['isHiddenPrice'] == true ?  '--' : $tools.cutOutNum(scope.row['aPriceOrigin'], 2, true) }}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align="center" v-else :show-overflow-tooltip="items.tooltip" :min-width="items.minWidth ? items.minWidth.toString() : ''" :label="$t(items.key)" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>

<script>
import { iMessage } from 'rise'
// import { getDictByCode } from '@/api/dictionary'

export default {
  props: {
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    indexLabel: { type: String, default: '#' },
    height: { type: Number || String, default: 400 },
    activeItems: { type: String, default: 'b' },
    radio: { type: Boolean, default: false }, // 是否单选
    keystring: { type: String, default: '' },
  },
  inject: ['vm'],
  data() {
    return {
      purchaseFactory: [],
      supplierTypeList: [
        { name: '待确认', code: '0', class: 'g-red' },
        { name: '已确认', code: '1', class: 'g-black' },
        { name: '代确认', code: '2', class: 'g-black' },
      ],
      sourceTypeList: [
        { val: 1, type: '备货表', typeEn: 'LK_BEIHUOBIAO' },
        { val: 2, type: '采购申请', typeEn: 'LK_CAIGOUSHENQING' },
        { val: 3, type: '框架', typeEn: 'LK_KUANGJIA' },
        { val: 4, type: '采购订单', typeEn: 'LK_CAIGOUDINGDAN' },
      ],
      statusList: [
        { val: '0', type: '待处理', typeEn: '待处理' },
        { val: '1', type: '已生成变价单', typeEn: '已生成变价单' },
        { val: '2', type: '关闭', typeEn: 'LK_GUANBI' },
      ],
      partTypeList: [],
    }
  },
  created() {
    // this.getDictByCodePT()
  },
  methods: {
    // 获取零件类型
    getDictByCodePT() {
      getDictByCode('PT')
        .then((res) => {
          if (+res.code === 200) {
            this.partTypeList = res?.data[0]?.subDictResultVo
          }
        })
        .catch((e) => {
          this.getDictByCodePT()
        })
    },

    // 转换 零件类型
    translatePartType(type) {
      if (type == undefined || type == null || type == '' || this.partTypeList.length <= 0) return ''
      return isNaN(Number(type)) ? this.partTypeList.find((i) => i.code == type).name : '普通零件'
    },

    // 选项表格
    handleSelectionChange(val) {
      if (this.radio) {
        if (val.length > 1) {
          //取出最后val的最后一个返回出来
          var duoxuans = val.pop()
          this.handleSelectArr = val.pop()
          //清除所有选中
          this.$refs.moviesTable.clearSelection()
          //给最后一个加上选中
          this.$refs.moviesTable.toggleRowSelection(duoxuans)
        } else {
          this.$emit('handleSelectionChange', val)
        }
      } else {
        this.$emit('handleSelectionChange', val)
      }
    },

    // 改变时间从而改变A价
    handleChangeDate(item, params, type) {
      if (type == 'end') {
        const endDateStrYear = new Date(params.endDate).getFullYear()
        const endDateTimeStr = new Date(endDateStrYear, 12, 31).getTime()
        const currentTimeYear = new Date().getFullYear()
        const cutDownValidateDateStr = new Date(currentTimeYear + 2, 12, 31).getTime()

        if (endDateTimeStr > cutDownValidateDateStr) {
          return iMessage.error(`结束时间不能大于${currentTimeYear + 2}-12-31`)
        }
      }
      if (params.aPriceOrigin != null || +params.aPriceOrigin > 0) return;
      this.timetoExchangeAprice(params).then(res => {
        params.aPriceOrigin = res?.apriceNew;
      })
    },

    // 调用时间去改变A价
    async timetoExchangeAprice(data) {
      const res = await getApriceByStartDate({
        astartDate: Date.parse(data.sopDateNew),
        cstBookType: this.$route.query.cstBookType,
        partCode: data.partCode,
        partType: data.partType,
        procureFactory: data.procureFactory,
        tmSupplierId: data.tmSupplierId,
      });
      return new Promise((resolve, reject) => {
        if (+res?.code == 200) {
          resolve(res?.data)
        } else {
          reject(res?.data)
          return iMessage.error(res.desZh)
        }
      })
    },

    // 转换时间格式
    translateData(date) {
      if(date == null) return '';
      return window.moment(date).format('YYYY-MM-DD')
    },

    openPage(data) {
      this.$emit('openPage', data)
    },
  },
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}
.radio {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
}
.width150 {
  width: 150px;
}
.g-red {
  cursor: pointer;
  color: $color-delete;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
}

.g-green {
  cursor: pointer;
  color: $color-green;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
}
::v-deep .el-table {
  .cell {
    word-break: keep-all;
  }
}
.g-black {
  cursor: pointer;
  color: $color-black;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
}
</style>