<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:33:00
 * @LastEditors: 余继鹏 917955345@qq.com
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
                <span>{{ scope.row[items2.props] }}</span>
                <i class="el-icon-edit cursor openLinkText" @click="openMultiHeaderPropsPage(scope.row, items2.props)"></i>
                <!-- <span class="openLinkText cursor"
                      @click="openMultiHeaderPropsPage(scope.row, items2.props)">{{ $t(multiHeaderPropsText) }}</span> -->
              </template>
            </el-table-column>
            <el-table-column :key="index2" align='center' v-else :label="items2.key ? language(items2.key,items2.name) : items2.name"
                             :prop="items2.props">
              <template slot="header" slot-scope="scope">
                <el-popover
                  placement="top"
                  trigger="hover"
                  :content="scope.column.label">
                  <div style="text-align: center;">{{ scope.column.label }}</div>
                  <span slot="reference">{{ scope.column.label }}</span>
                </el-popover>
              </template>                 
            </el-table-column>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column width="240" :key="index" align="center" fixed="left" :label="items.key ? language(items.key,items.name) : items.name" v-if="items.props == 'companyAddress'">
          <template v-slot="scope">
            <iSelect v-if="!disabled" class="supplierProducePlaces input-center" v-model="scope.row.companyAddressAndCode" clearable popper-class="supplierProducePlacesDropdown" :loading="supplierProducePlacesLoading" @visible-change="supplierProducePlacesVisibleChange($event, scope.row)" @change="supplierProducePlacesChange($event, scope.row)">
              <el-option
                v-for="supplierProducePlace in supplierProducePlaces"
                :key="supplierProducePlace.key"
                :label="supplierProducePlace.label"
                :value="supplierProducePlace.companyAddressAndCode">
                  <el-tooltip class="item" :disabled="tooltipDisabled" effect="light" :open-delay="200" :content="`${ supplierProducePlace.name?supplierProducePlace.name+'_':'' }${ supplierProducePlace.province }_${ supplierProducePlace.city }${ supplierProducePlace.address?'_'+supplierProducePlace.address:'' }`" placement="right">
                    <div class="item">{{ `${ supplierProducePlace.province }_${ supplierProducePlace.city }${ supplierProducePlace.address?'_'+supplierProducePlace.address:'' }` }}</div>
                  </el-tooltip>
              </el-option>
            </iSelect>
            <span v-else>{{ scope.row.companyAddress }}</span>
            <el-popover
              placement="top"
              trigger="hover"
              popper-class="tableTitleTip"
              :visible-arrow="false">
              <p>{{$t('供应商地址不一致')}}</p>
              <span slot="reference">
                <icon v-if="scope.row.addressChangeFlag" class="margin-left4" symbol name="icontishi-cheng" />
              </span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :key="index" align="center" fixed="left" :label="items.key ? language(items.key,items.name) : items.name" v-else-if="items.props == 'svwCode'" :width="100">
          <template v-slot="scope">
            {{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}
          </template>
        </el-table-column>
        <el-table-column :key="index" align='center' fixed="left" v-else-if="items.props == actionProps" :prop="items.props"
                         :label="items.key ? language(items.key,items.name) : items.name" :width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.hasData" class="openLinkText cursor" @click="openActionPropsPage(scope.row)">{{language('LK_CHAKAN','查看')}}</span>
            <span v-else>{{ '-' }}</span>
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
import { iSelect, icon } from "rise"

export default {
  components: { iSelect, icon },
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
    supplierProducePlacesChange(companyAddressAndCode, row) {
      if (companyAddressAndCode) {
        const current = this.supplierProducePlaces.filter(item => item.companyAddressAndCode === companyAddressAndCode)[0]
        // const current = this.supplierProducePlaces.filter(item => item.value === value)[0]
        this.$set(row, "companyAddressCode", current.value)
        this.$set(row, "companyAddress", current.label)
        this.$set(row, "isNoCodeData", false)
      } else {
        this.$set(row, "companyAddressCode", "")
        this.$set(row, "companyAddress", "")
        this.$set(row, "isNoCodeData", true)
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
    padding: 0 25px 0 5px;
  }

  ::v-deep .el-input__suffix {
    display: none;
  }
  &:hover{
    ::v-deep .el-input__suffix {
        display: unset;
      }
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