<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2023-02-21 10:36:37
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: table组件
-->
<template>
<div class="iFileTableList">
  <el-table
    fit
    border
    tooltip-effect='light'
    v-bind="$attrs"
    v-on="$listeners"
    :tree-props="treeProps"
    v-loading='tableLoading'
    :height="height"
    :max-height="maxHeight"
    :data='tableData'
    :empty-text="language('ZANWUSHUJU', '暂无数据')"
    :class="{'moviesTable': true, 'radio': radio}"
    :cell-style="borderLeft"
    @selection-change="handleSelectionChange"
    @select="handleSelect"
    @select-all="handleSelectAll"
    default-expand-all
    ref="moviesTable">
    <!----------------------复选框------------------------------------->
    <el-table-column v-if="selection" type='selection' :width="selectConfig.width || 45" :align="selectConfig.align || 'center'" :header-align="selectConfig.headerAlign || 'center'" :selectable="selectConfig.selectable || selectable"></el-table-column>
    <!----------------------支持自定义的index插槽------------------------>
    <el-table-column :fixed="indexFixed" v-if='index' type='index' :width='indexConfig.width || 50' :align="indexConfig.align || 'center'" :header-align="indexConfig.headerAlign || 'center'" :label="indexConfig.label || indexLabel">
      <template slot-scope="scope">
        <slot :name="`_index`" :row="scope.row" :$index="scope.$index">
          {{scope.$index+1}}
        </slot>
      </template>
    </el-table-column>

    <template v-for="(items,index) in header">
      <!----------------------需要高亮的列并且带有打开详情事件------------------------>
      <el-table-column :fixed="items.fixed" :key="`${items.props}_${index}`" :align="items.align || 'center'" :width="items.width" :min-width="items.minWidth ? items.minWidth.toString():''" :show-overflow-tooltip='items.tooltip' v-if='items.props == activeItems' :prop="items.props" :label="showTitleName ? items.name : (lang ? (items.key ? language(items.key, items.name) : items.name) : (items.key ? $t(items.key) : items.name))" :sortable="items.sortable||false" :sort-method="items.sortMethod">
        <!-- slot header -->
        <template slot="header" slot-scope="scope">
          <div class="slotHeader" :class="{headerRequiredLeft: items._headerRequiredLeft, headerRequiredRight:items._headerRequiredRight }">
            <template>
              <span v-if="items.isHeaderSetting" class="isHeaderSetting">
                <template v-for="(setting,index) in items.HeaderSettingList">
                  <span :key="index+'_setting'">{{language(setting.key, setting.name)}}</span>
                  <br  :key="index+'_setting_br'" v-if="index+1 < items.HeaderSettingList.length"/>
                </template>
              </span>
              <span v-else class="noisHeaderSetting">{{scope.column.label }}</span>
            </template>
            
            <i v-if="items.require" class="label-require margin-left3 margin-right3">*</i>
            <el-popover
              placement="top"
              trigger="hover"
              popper-class="tableTitleTip"
              :visible-arrow="false"
              :disabled="!items.showTips">
              <p v-html="items.showTips ? items.tips() : ''"></p>
              <span slot="reference">
                <icon v-if="items.showTips" class="require margin-left4" symbol name="iconxinxitishi" />
              </span>
            </el-popover>
          </div>
        </template>
        <!-- slot content -->
        <template slot-scope="row">
           <!-- <span class="flexRow"> -->
            <span :class="`openLinkText cursor ${activeItemsLink}`"  @click="openPage(row.row)"> {{ row.row[activeItems]}}</span>
            <!-- <span class="icon-gray  cursor " v-if="row.row[activeItems] && !activeItemsLink"  @click="openPage(row.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span> -->
          <!-- </span>  -->
          </template>
      </el-table-column>
      <!----------------------普通表格展示---------------------------------------->
      <el-table-column
        v-else
        :align="items.align || 'center'"
        :header-align="items.headerAlign || 'center'"
        :key="`${items.props}_${index}`"
        :width="items.width"
        :min-width="items.minWidth ? items.minWidth.toString():''"
        :show-overflow-tooltip='items.tooltip'
        :label="showTitleName ? items.name : (lang ? (items.key ? language(items.key, items.name) : items.name) : (items.key ? $t(items.key) : items.name))"
        :prop="items.props"
        :class-name="items.tree ? 'tree' : ''"
        :sortable="items.sortable||false"
        :sort-method="items.sortMethod"
        :fixed="items.fixed">
        <!-- slot header -->
        <template slot="header" slot-scope="scope">
          <div class="slotHeader" :class="{headerRequiredLeft: items._headerRequiredLeft, headerRequiredRight:items._headerRequiredRight }">
            <template>
              <span v-if="items.isHeaderSetting" class="isHeaderSetting">
                <template v-for="(setting,index) in items.HeaderSettingList">
                  <span :key="index+'_setting'">{{setting.key ? language(setting.key, setting.name) : setting.name}}</span>
                  <br  :key="index+'_setting_br'" v-if="index+1 < items.HeaderSettingList.length"/>
                </template>
              </span>
              <span v-else class="noisHeaderSetting">{{scope.column.label }}</span>
            </template>
            <i v-if="items.require" class="label-require margin-left3 margin-right3">*</i>
            <el-popover
              placement="top"
              trigger="hover"
              popper-class="tableTitleTip"
              class="label-icon"
              :visible-arrow="false"
              :disabled="!(items.showTips || items.tipsLang)">
              <p v-html="items.showTips ? items.tips() : ''"></p>
              <span slot="reference">
                <icon v-if="items.showTips || items.tipsLang" class="require margin-left4" symbol name="iconxinxitishi" />
              </span>
            </el-popover>
          </div>
        </template>
        <!-- slot content -->
        <template slot-scope="scope">
          <span :class="{normal: true, child: scope.row.children}">
            <slot :name="items.props" :row="scope.row" :$index="scope.$index">
              {{scope.row[items.props]}}
            </slot>
          </span>
        </template>
        <template v-if="items.children">
          <el-table-column v-for="(childItem, childIndex) in items.children" :key="childItem.props+'_'+childIndex" align='center' :width="childItem.width" :show-overflow-tooltip='childItem.tooltip'  :label="childItem.key ? language(childItem.key, childItem.name) : childItem.name" :prop="childItem.props">
            <template slot-scope="scope">
              <!----------------------------备注列-------------------------------->
              <span v-if="childItem.props === 'beizhu'" class="openLinkText cursor">查看</span>
              <span v-else-if="childItem.type === 'rate'" :class="{red:isCLevel(getRate(scope.row, childItem.props).rate)}">{{getRate(scope.row, childItem.props, childItem).rate}}</span>
              <icon v-else-if="childItem.type == 'rate' && getRate(scope.row, childItem.props).partSupplierRate === 0" symbol class="cursor" name='icontishi-cheng' style="margin-left:8px" @click.native="$emit('openDialog', scope.row)"></icon>
              <span>{{scope.row[childItem.props]}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <!-- iTableHeaderSorter -->
  <iTableHeaderSorter
      v-if="enabletableHeadersetting"
      :data="tableSettingColumns"
      :show.sync="settingVisible"
      :value="'value'"
      :label="'label'"
      :visiableKey="'hidden'"
      @callback="handleSaveSetting"
      @reset="handleResetSetting"
    />
</div>

</template>
<script>
import {cloneDeep} from 'lodash'
import {icon, iMessage} from "rise"
import iTableHeaderSorter from './iTableHeaderSort'
// import {iTableHeaderSorter} from "rise"
import { getUserListMemory, configUserListMemory } from '@/api/tableSort'
export default {
  props: {
    /**
     * @description: 表格数据
     * @param {*} 数组
     * @return {*}
     */    
    tableData:{type:Array},
    /**
     * @description: 表格表头
     * @param {*} 数组
     * @return {*}
     */    
    tableTitle:{type:Array},
    /**
     * @description: 表格加载状态
     * @param {*}
     * @return {*}
     */    
    tableLoading:{ type:Boolean,default:false },
    /**
     * @description: 是否显示复选框
     * @param {*}
     * @return {*}
     */    
    selection:{type:Boolean,default:true},
    /**
     * @description: 是否支持选中逻辑
     * @param {*}
     * @return {*}
     */    
    selectable: {type:Function},
    selectConfig: {type: Object, default: () => ({})},
    /**
     * @description: 表格索引
     * @param {*}
     * @return {*}
     */    
    index:{type:Boolean,default:false},
    indexConfig: {type: Object, default: () => ({})},
    /**
     * @description: 表格索引表头文本
     * @param {*}
     * @return {*}
     */    
    indexLabel:{type:String,default:'#'},
    /**
     * @description: 高度
     * @param {*}
     * @return {*}
     */
    height:{type:Number||String},
    /**
     * @description: 最大高度
     * @param {*}
     * @return {*}
     */
    maxHeight:{type:Number||String, default: '570px'},
    /**
     * @description: 用于高亮带链接的列
     * @param {*}
     * @return {*}
     */    
    activeItems:{type:String,default:'b'},
    /**
     * @description: 用于高亮带链接的列的样式是否带箭头
     * @param {*} false 标识带箭头
     * @return {*}
     */
    activeItemsLink:{type:String||Boolean,default: false},
    /**
     * @description: 是否单选
     * @param {*}
     * @return {*}
     */  
    radio:{type:Boolean,default:false},
    /**
     * @description: 是否支持树形展示
     * @param {*}
     * @return {*}
     */    
    treeProps: {type:Object},
    /**
     * @description: 支持国际化
     * @param {*}
     * @return {*}
     */    
    lang: {type: Boolean, default: false},
    /**
     * @description: 表格合并
     * @param {*}
     * @return {*}
     */    
    enabletableHeadersetting: {type: Boolean, default: true},
    showTitleName:{type:Boolean,default:false}, // 直接展示name字段
    indexFixed:{type:Boolean,default:false}, // 序列号是否固定
    permissionKey: { type: String }
  },
  inject:['vm'],
  components:{iTableHeaderSorter, icon},
  watch:{
    tableTitle:{
      handler(val){
        this.header = cloneDeep(val)
      },
      deep:true,
      immediate:true
    }
  },
  data() {
    return {
      settingVisible: false,
      header: cloneDeep(this.tableTitle),
      // header: cloneDeep(this.tableTitle).filter(i=> !i.isHidden),
      tableSettingColumns: [],
      tableColumns: [],
      settingId: '',
      tableTitleMap: {}
    }
  },
  created() {
    this.initTableSettingColumns()
    if (this.permissionKey) {
      this.querySetting()
    }
  },
  methods:{
    isCLevel(val) {
      if(!val) return false
      return val.indexOf("c") > -1 || val.indexOf("C") > -1;
    },
    getRate(row, props, childItem) {
      const findItem = row.departmentRate?.find(item => item.rateDepartNum === props) || {}
      return findItem
    },
    /**
     * @description: 单选的实现
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val){
      // if (this.radio) {
      //   if (val.length > 1) {
      //     //取出最后val的最后一个返回出来
      //     var duoxuans=val.pop();
      //     this.handleSelectArr=val.pop();
      //     //清除所有选中
      //     this.$refs.moviesTable.clearSelection()
      //     //给最后一个加上选中
      //     this.tableData.map(row=>{
      //       this.$set(row,'selectedBorder',false)
      //     })
      //     this.$refs.moviesTable.toggleRowSelection(duoxuans,true)
      //   } else {
      //     this.$emit('handleSelectionChange',val)
      //   }
      // }else{
        this.$emit('handleSelectionChange',val)
      // }
      this.$emit('selection-change',val)
    },
    /**
     * @description: 打开页面回调方法
     * @param {*} e
     * @return {*}
     */    
    openPage(e){
      this.$emit('openPage',e)
    },
    /**
     * @description: 选中回调
     * @param {*} selection
     * @param {*} row
     * @return {*}
     */    
    handleSelect(selection,row){
      const selectdBorder = row.selectedBorder
      if(this.radio){
        //清除所有选中
        this.$refs.moviesTable.clearSelection()
        this.tableData.map(row=>{
          this.$set(row,'selectedBorder',false)
        })
        //修改当前行状态
        this.$refs.moviesTable.toggleRowSelection(row,!selectdBorder)
        if(!selectdBorder){
          this.$emit('handleSelectionChange',[row])
        }else{
          this.$emit('handleSelectionChange',[])
        }
      }
      this.$set(row,'selectedBorder',!selectdBorder)
      this.$emit('selection-change',{selection,row})
    },
    /**
     * @description: 全选回调
     * @param {*} selection
     * @param {*} row
     * @return {*}
     */    
    handleSelectAll(selection){  
      const flag = selection.length
      for(let i= 0  ; i<flag;i++){
        this.$set(selection[i],'selectedBorder',!!flag)
      }
      !flag? this.tableData.forEach(i=>{i.selectedBorder=!i.selectedBorder}):''
      this.$emit('select-all',selection)
    },
    /**
     * @description: 自定义样式
     * @param {*} row
     * @param {*} columnIndex
     * @return {*}
     */    
    borderLeft({row, columnIndex}){
      const style = `border-left:2px solid #67C23A;`
      return columnIndex === 0 && row.selectedBorder === true ? style : ''
    },
    renewTableHeader(data) {
      const header = data.filter(o => !o.isHidden)  // 过滤出需要显示的
      const hiddenHeader = data.filter(o => o.isHidden)  // 过滤出需要隐藏的

      // this.header = header.map(o => ({
      //   ...o,
      //   prop: o.prop || o.props,
      //   label: o.label || o.name,
      //   i18n: o.i18n || o.key,
      //   showTips: this.tableTitleMap[o.props].showTips || false,
      //   tips: this.tableTitleMap[o.props].tips || ''
      // }))

      let props = header.map(item=>item.props||item.prop).filter(item=>item)
      let hiddenProps = hiddenHeader.map(item=>item.props||item.prop).filter(item=>item)
      let tableTitle = []
      this.tableTitle.forEach(o=>{
        if(o.prop||o.props){
          if(!hiddenProps.includes(o.prop||o.props)){
          // if(props.includes(o.prop||o.props)){
            tableTitle.push({
              ...o,
              prop: o.prop || o.props,
              label: o.label || o.name,
              i18n: o.i18n || o.key,
              showTips: this.tableTitleMap[o.props].showTips || false,
              tips: this.tableTitleMap[o.props].tips || ''
            })
          }
        }else{
          tableTitle.push({
            ...o,
            prop: o.prop || o.props,
            label: o.label || o.name,
            i18n: o.i18n || o.key,
            showTips: this.tableTitleMap[o.props].showTips || false,
            tips: this.tableTitleMap[o.props].tips || ''
          })
        }
      })
      this.header = tableTitle
      //   this.header = header.map(o => ({
      //   ...o,
      //   prop: o.prop || o.props,
      //   label: o.label || o.name,
      //   i18n: o.i18n || o.key,
      //   showTips: this.tableTitleMap[o.props].showTips || false,
      //   tips: this.tableTitleMap[o.props].tips || ''
      // }))
    },
    initTableSettingColumns() {
      this.tableSettingColumns = this.tableTitle.map(o => ({
        ...o,
        prop: o.prop || o.props,
        label: o.label || o.name,
        i18n: o.i18n || o.key
      }))

      this.tableTitleMap = {}
      this.tableTitle.forEach(item => {
        this.$set(this.tableTitleMap, item.props, item)
      })
    },
    getCookie(name) {
			const strCookie = document.cookie //获取cookie字符串
			const arrCookie = strCookie.split('; ') //分割
			//遍历匹配
			for (let i = 0; i < arrCookie.length; i++) {
				if (arrCookie[i].indexOf(`${name}=`) === 0) {
					return arrCookie[i].replace(`${name}=`, '')
				}
			}
			return ''
		},
    handleSaveSetting(val = []) {
      configUserListMemory({
        accountId: this.$store.state.permission.userInfo.accountId,
        listConfig: JSON.stringify(val),
        permissionKey: this.permissionKey
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)

          try {
            const tableTitle = JSON.parse(res.data.listConfig)
            this.renewTableHeader(tableTitle)
            this.tableSettingColumns = tableTitle
            this.settingId = res.data.id
          } catch {}
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    handleResetSetting() {
      this.initTableSettingColumns()
      this.handleSaveSetting(this.tableSettingColumns)
    },
    getHeader(){
      return cloneDeep(this.header);
    },
    querySetting() {
      getUserListMemory({
        permissionKey: this.permissionKey
      })
      .then(res => {
        if (res.code == 200 && res.data[0] && res.data[0].listConfig) {
          try {
            const tableTitle = JSON.parse(res.data[0].listConfig)
            this.renewTableHeader(tableTitle)
            this.tableSettingColumns = tableTitle
            this.settingId = res.data[0].id
          } catch {
            this.header = []
            this.tableSettingColumns = []
          }
        } else {
          if (!res.data.length) {
            this.initTableSettingColumns()
            this.renewTableHeader(this.tableSettingColumns)
            return
          }

          this.header = []
          this.tableSettingColumns = []
        }
      })
      .catch(() => {
        this.header = []
        this.tableSettingColumns = [] 
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.iFileTableList {
  height: 100%;
  clear: both;
  // ::v-deep.el-table__body-wrapper {
  //   height: auto!important;
  // }
  // ::v-deep.el-table__fixed{
  //   height: auto!important;
  //   bottom: 14px;
  //   position: absolute;
  //   top: 0;
  // }
}
  .openLinkText{
    color:$color-blue;
    &.underline {
      text-decoration: underline;
    }
  }
  .radio {
    ::v-deep thead .el-table-column--selection .cell {
      display: none;
    }
  }
  ::v-deep.el-table.moviesTable {
    .tree {
      text-align: right;
      box-sizing: border-box;
      padding-right: 40px;
      .normal {
        width: 270px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        margin-right: 20px;
        &.child {
          margin-right: 0px;
        }
      }
      .el-table__expand-icon {
        float: right;
        transform: rotate(180deg);
        &.el-table__expand-icon--expanded {
          transform: rotate(0deg);
        }
        i::before {
          content: '\e78f';
        }
      }
    }
    th>.cell{
      .slotHeader{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-flex;
      }
      .label-require{
        color: #f56c6c;
        font-style:normal;
      }
    }
  }
  .icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }
  .flexRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }
  .slotHeader {
    text-align: center;
    &:after, &:before {
      // display: inline-block;
      content: '*';
      color: #f56c6c;
      display: none;
    }
    &.headerRequiredLeft:before {
      display: inline-block;
      margin-right: 2px;
    }
    &.headerRequiredRight:after {
      display: inline-block;
      margin-left: 2px;
    }
    .label-icon{
      display: flex;
      align-items: center;
      margin-left: 5px;
    }
  }
  .red{
    color: #f00;
  }
</style>