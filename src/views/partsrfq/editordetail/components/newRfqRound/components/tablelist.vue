<template>
  <el-table
      :height="height"
      :data='tableData'
      :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
      v-loading='tableLoading'
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      ref="newRoundTable"
  >
    <el-table-column v-if="selection" type='selection' width="55" align='center'
                     :selectable="selectable"
    ></el-table-column>
    <!--    <el-table-column v-if='index' type='index' width='50' align='center' :label="$t('LK_BIANHAO')"></el-table-column>-->
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' :width="items.width" v-if='items.props === openPageProps' :prop="items.props"
                       :label="language(items.key,items.name)">
        <template slot-scope="scope">
            <span class="openLinkText cursor"
                  @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{
                customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]
              }}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :width="items.width" :label="language(items.key,items.name)" v-else-if="items.props === 'isMbdl'">
        <template slot-scope="scope">
          {{ scope.row.isMbdl == 2 ? 'M' : '' }}
        </template>
      </el-table-column>
      <!-- 供应商名称 -->
      <el-table-column :key="index" align='center' :width="items.width" :label="language(items.key,items.name)" v-else-if="items.props === 'supplierNameZh'">
        <template slot-scope="scope">
          {{ scope.row.supplierNameZh}}
          <!-- 供应商黑名单 -->
          <!-- {{typeof(scope.row.isComplete)}} -->
          <supplierBlackIcon
            :isShowStatus="typeof(scope.row.isComplete) ==='boolean' ? !scope.row.isComplete : false"
            :BlackList="scope.row.blackStuffs || []"
          />
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :width="items.width"
                       v-else-if='selectProps.includes(items.props)' :prop="items.props"
                       :label="language(items.key,items.name)">
        <template slot-scope="scope">
          <i-select v-model="scope.row[items.props]">
            <el-option v-for="items in scope.row.roundCbdVOS" :key='items.code' :value='items.code'
                       :label="items.name"/>
          </i-select>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' :width="items.width" v-else :label="language(items.key,items.name)" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iSelect} from 'rise'
import {partProjTypes} from '@/config'
	import supplierBlackIcon from "@/views/partsrfq/components/supplierBlackIcon"
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
    roundType: {type: String, default: ''},
    rfqInfo: {type: Object, default: () => {}},
  },
  components: {
    iSelect,
    supplierBlackIcon,
  },
  computed:{
        //eslint-disable-next-line no-undef
    ...Vuex.mapState({
        rfqSelectedProjectParts: state => state.rfq.pendingPartsList,
    }),
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
      // 优先判断黑名单再判断轮次
      if(row.isDisabled == true){
        return false;
      }else{
      if(this.rfqInfo && (this.rfqInfo.partProjectType[0] == partProjTypes.GSLINGJIAN || this.rfqInfo.partProjectType[0] ==partProjTypes.ZHANGJIALINGJIAN)){
        return true
      }else{
      if(row.isNego) { //谈判轮
        return true
      } else { //询价轮
        if (this.rfqInfo.currentRounds == 0 && this.rfqInfo.partProjectType[0] == partProjTypes.COPLINGJIAN) {
          this.$nextTick(() => {
            this.$refs.newRoundTable.toggleRowSelection(item, false)
          })

          return true
        }

        if(row.isMbdl == '2'){
          return false
        }else{
          return true
        }
      }
      }
       }
    },
    handleRowClick(row, column, event) {
      this.$emit("handleRowClick", row, column, event)
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