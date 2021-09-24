<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:33:00
 * @LastEditors: Please set LastEditors
 * @Description: RFQ-table组件。
-->
<template>
  <el-table :height="height" :data='tableData' :empty-text="language('LK_ZANWUSHUJU','暂无数据')" v-loading='tableLoading'
            @selection-change="handleSelectionChange">
    <el-table-column v-if="selection" type='selection' width="56" align='center'></el-table-column>
    <!--    <el-table-column v-if='index' type='index' width='50' align='center' label='#'></el-table-column>-->
    <template v-for="(items,index) in tableTitle">
      <template v-if="items.list && Array.isArray(items.list)">
        <el-table-column :label="items.key ? language(items.key,items.name) : items.name" :key="index" align="center">
          <template v-for="(items2, index2) in items.list">
            <el-table-column :key="index2" align='center' v-if="items2.props.indexOf('memo') > -1" :prop="items2.props"
                             :label="items2.key ? language(items2.key,items2.name) : items2.name">
              <template slot-scope="scope">
                <span class="openLinkText cursor"
                      @click="openMultiHeaderPropsPage(scope.row, items2.props)">{{ $t(multiHeaderPropsText) }}</span>
              </template>
            </el-table-column>
            <el-table-column :key="index2" align='center' v-else :label="items2.key ? language(items2.key,items2.name) : items2.name"
                             :prop="items2.props"></el-table-column>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column width="240" :key="index" align="center" fixed="left" :label="items.key ? language(items.key,items.name) : items.name" v-if="items.props == 'companyAddress'">
          <template v-slot="scope">
            <iSelect v-if="!disabled" class="supplierProducePlaces input-center" v-model="scope.row.companyAddressCode" clearable popper-class="supplierProducePlacesDropdown" :loading="supplierProducePlacesLoading" @visible-change="supplierProducePlacesVisibleChange($event, scope.row)" @change="supplierProducePlacesChange($event, scope.row)">
              <el-option
                v-for="supplierProducePlace in supplierProducePlaces"
                :key="supplierProducePlace.key"
                :label="supplierProducePlace.label"
                :value="supplierProducePlace.value">
                  <el-tooltip class="item" :disabled="tooltipDisabled" effect="light" :open-delay="200" :content="`${ supplierProducePlace.name }_${ supplierProducePlace.province }_${ supplierProducePlace.city }_${ supplierProducePlace.address }`" placement="right">
                    <div class="item">{{ `${ supplierProducePlace.province }_${ supplierProducePlace.city }_${ supplierProducePlace.address }` }}</div>
                  </el-tooltip>
              </el-option>
            </iSelect>
            <span v-else>{{ scope.row.companyAddress }}</span>
          </template>
        </el-table-column>
        <el-table-column :key="index" align="center" fixed="left" :label="items.key ? language(items.key,items.name) : items.name" v-else-if="items.props == 'svwCode'">
          <template v-slot="scope">
            {{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}
          </template>
        </el-table-column>
        <el-table-column :key="index" align='center' fixed="left" v-else-if="items.props == actionProps" :prop="items.props"
                         :label="items.key ? language(items.key,items.name) : items.name">
          <template slot-scope="scope">
            <span class="openLinkText cursor" @click="openActionPropsPage(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
          </template>
        </el-table-column>
        <el-table-column :key="index" align='center' v-else :label="items.key ? language(items.key,items.name) : items.name"
                         :prop="items.props" fixed="left">
          <template v-slot="scope">
            <span class="link-underline" v-if="items.type === 'link'" @click="handleClickByLink(scope.row, items.props)">{{ scope.row[items.props] }}</span>
            <span v-else>{{ scope.row[items.props] }}</span>
          </template>                 
        </el-table-column>
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
    supplierProducePlaces: { type: Array, default: () => [] },
    supplierProducePlacesLoading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: true }
  },
  data() {
    return {
      tooltipDisabled: false
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
    supplierProducePlacesVisibleChange(status, row) {
      this.tooltipDisabled = !status
      this.$emit('supplierProducePlacesVisibleChange', status, row)
    },
    supplierProducePlacesChange(value, row) {
      if (value) {
        const current = this.supplierProducePlaces.filter(item => item.value === value)[0]
        this.$set(row, "companyAddressCode", value),
        this.$set(row, "companyAddress", current.label)
      } else {
        this.$set(row, "companyAddressCode", ""),
        this.$set(row, "companyAddress", "")
      }
    },
    handleClickByLink(row, key) {
      this.$emit("link", row, key)
    }
  }
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}

.supplierProducePlaces {
  ::v-deep input {
    padding: 0 18px;
  }

  ::v-deep .el-input__suffix {
    display: none;
  }
}

.supplierProducePlacesDropdown {
  .item {
    max-width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>