<template>
  <el-table
      :height="height"
      :data='tableData'
      :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
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
                       :label="language(items.key,items.name)">
        <template slot-scope="scope">
            <span class="openLinkText cursor"
                  @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{
                customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]
              }}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :label="language(items.key,items.name)" v-else-if="items.props === 'isMbdl'">
        <template slot-scope="scope">
          {{ scope.row.isMbdl == 2 ? 'M' : '' }}
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center'
                       v-else-if='selectProps.includes(items.props)' :prop="items.props"
                       :label="language(items.key,items.name)">
        <template slot-scope="scope">
          <i-select v-model="scope.row[items.props]">
            <el-option v-for="items in scope.row.roundCbdVOS" :key='items.code' :value='items.code'
                       :label="$t(items.desc)"/>
          </i-select>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else :label="language(items.key,items.name)" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iSelect} from 'rise'

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
    //勾选逻辑，如果是谈判轮，不管哪个轮次都可以取消，询价轮必须勾选，不管是那个轮次。（Mbdl）
    selectable(row) {
      if(row.isNego) { //谈判轮
        return true
      } else { //询价轮
        return  !row.isMbdl === '2'
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