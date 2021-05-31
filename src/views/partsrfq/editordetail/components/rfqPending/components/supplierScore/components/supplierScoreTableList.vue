<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:33:00
 * @LastEditors: Please set LastEditors
 * @Description: RFQ-table组件。
-->
<template>
  <el-table :height="height" :data='tableData' :empty-text="$t('LK_ZANWUSHUJU')" v-loading='tableLoading'
            @selection-change="handleSelectionChange">
    <el-table-column v-if="selection" type='selection' width="50" align='center'></el-table-column>
    <!--    <el-table-column v-if='index' type='index' width='50' align='center' label='#'></el-table-column>-->
    <template v-for="(items,index) in tableTitle">
      <template v-if="items.list && Array.isArray(items.list)">
        <el-table-column :label="items.key ? $t(items.key) : items.name" :key="index" align="center">
          <template v-for="(items2, index2) in items.list">
            <el-table-column :key="index2" align='center' v-if="items2.props.indexOf('memo') > -1" :prop="items2.props"
                             :label="items2.key ? $t(items2.key) : items2.name">
              <template slot-scope="scope">
                <span class="openLinkText cursor"
                      @click="openMultiHeaderPropsPage(scope.row, items2.props)">{{ $t(multiHeaderPropsText) }}</span>
              </template>
            </el-table-column>
            <el-table-column :key="index2" align='center' v-else :label="items2.key ? $t(items2.key) : items2.name"
                             :prop="items2.props"></el-table-column>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column width="240" :key="index" align="center" fixed="left" :label="items.key ? $t(items.key) : items.name" v-if="items.props == 'companyAddress'">
          <template v-slot="scope">
            <iSelect class="companySelect input-center" v-model="scope.row.companyAddress" clearable popper-class="companySelectDropdown">
              <el-option
                v-for="company in companies"
                :key="company.code"
                :label="company.name"
                :value="company.code">
                  <el-tooltip class="item" effect="light" :open-delay="200" :content="`${ company.name }_${ company.province }_${ company.city }_${ company.address }`" placement="right">
                    <div class="item">{{ `${ company.name }_${ company.province }_${ company.city }_${ company.address }` }}</div>
                  </el-tooltip>
              </el-option>
            </iSelect>
          </template>
        </el-table-column>
        <el-table-column :key="index" align='center' fixed="left" v-else-if="items.props == actionProps" :prop="items.props"
                         :label="items.key ? $t(items.key) : items.name">
          <template slot-scope="scope">
            <span class="openLinkText cursor" @click="openActionPropsPage(scope.row)">{{$t('LK_CHAKAN')}}</span>
          </template>
        </el-table-column>
        <el-table-column :key="index" align='center' v-else :label="items.key ? $t(items.key) : items.name"
                         :prop="items.props" fixed="left"></el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script>
import { iSelect } from "rise"

export default {
  components: { iSelect },
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    hideOpenPage: {type: Boolean, default: false},
    multiHeaderProps: {type: String, default: 'tpbMemo'},
    actionProps: {type: String, default: 'action'},
    multiHeaderPropsText: {type: String, default: 'LK_BIANJI'},
  },
  data() {
    return {
      companies: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    openActionPropsPage(row) {
      this.$emit('openActionPropsPage', row)
    },
    openMultiHeaderPropsPage(row, key) {
      this.$emit('openMultiHeaderPropsPage', row, key)
    },
  }
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}

.companySelect {
  ::v-deep input {
    padding: 0 18px;
  }

  ::v-deep .el-input__suffix {
    display: none;
  }
}

.companySelectDropdown {
  .item {
    max-width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>