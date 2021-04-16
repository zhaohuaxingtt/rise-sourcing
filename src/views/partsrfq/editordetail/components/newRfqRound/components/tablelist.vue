<template>
  <el-table
      :height="height"
      :data='tableData'
      :empty-text="$t('LK_ZANWUSHUJU')"
      v-loading='tableLoading'
      @selection-change="handleSelectionChange"
      ref="newRoundTable"
  >
    <el-table-column v-if="selection" type='selection' width="50" align='center'
                     :selectable="selectable"
    ></el-table-column>
    <!--    <el-table-column v-if='index' type='index' width='50' align='center' :label="$t('LK_BIANHAO')"></el-table-column>-->
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' v-if='items.props === openPageProps' :prop="items.props"
                       :label="$t(items.key)">
        <template slot-scope="scope">
            <span class="openLinkText cursor"
                  @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{
                customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]
              }}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :label="$t(items.key)" v-else-if="items.props === 'isMbdl'">
        <template slot-scope="scope">
          {{ scope.row.isMbdl ? 'M' : '' }}
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center'
                       v-else-if='selectProps.includes(items.props)' :prop="items.props"
                       :label="$t(items.key)">
        <template slot-scope="scope">
          <i-select v-model="scope.row[items.props]">
            <el-option v-for="items in scope.row.roundCbdVOS" :key='items.id' :value='items.id'
                       :label="$t(items.name)"/>
          </i-select>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else :label="$t(items.key)" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iSelect} from '@/components'

export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    openPageProps: {type: String, default: ''},
    selectProps: {
      type: Array, default: () => {
        return []
      }
    },
    selectPropsOptionsObject: {
      type: Object, default: () => {
        return {}
      }
    },
    customOpenPageWord: {type: String, default: ''},
    openPageGetRowData: {type: Boolean, default: false},
    roundType: {type: String, default: ''}
  },
  components: {
    iSelect
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    openPage(params) {
      this.$emit('openPage', params)
    },
    selectable(row) {
      if(row.roundsPhase === '01' && this.roundType === '00') {
        return !(row.isMbdl === '2')
      } else {
        return  true
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}

.el-select {
  margin: 2px 0;
}

::v-deep .el-table__row .el-input {
  height: 35px !important;

  .el-input__inner {
    height: 35px !important;
  }
}

.icon {
  color: $color-blue;
}
</style>