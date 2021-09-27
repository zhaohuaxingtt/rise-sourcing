<!--
 * @Author: wentliao
 * @Date: 2021-09-23 11:07:36
 * @Description: 指定车型项目弹窗
-->

<template>
  <iDialog
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="investCarTypeProDialog"
  >
    <div class="flex-between-center-center padding-right40" slot="title">
      <div class="font18 font-weight">{{language('LK_AEKO_ZHIDINGTOUZICHEXINGXIANGMU','指定投资⻋型项⽬')}}</div>
      <div class="control">
        <iButton :loading="submiting" @click="submit">{{ language('LK_QUEREN','确认') }}</iButton>
      </div>
    </div>
    <div class="padding-bottom40">
      <el-table fit tooltip-effect='light' :height="height" :data='tableData' v-loading='tableLoading' :empty-text="language('LK_ZANWUSHUJU','暂无数据')" >
      <template v-for="(items,index) in tableTitle">
        <!----------------------图标列,“√”--------------------->
        <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip' v-if='items.type == "icon"' :prop="items.props" :label="items.name" >
          <template slot-scope="scope">
            <!-----展示为空---------->
            <span v-if="isPartNumEmpty(items.props, scope.row)" ></span>
            <!-----展示为蓝色勾勾-------->
            <icon v-else-if="isCartype(items.props, scope.row)" symbol name="iconguanlianlingjian-xuanzhong" @click.native="changeStatus(items.props, scope.row, '0')" class="cursor"></icon>
            <!-----展示为灰色勾勾-------->
            <icon v-else-if="!isCartype(items.props, scope.row)" symbol name="iconguanlianlingjian-moren" @click.native="changeStatus(items.props, scope.row, '1')" class="cursor"></icon>
            <!-----零件状态不存在或不对，则不展示--------->
          </template>
        </el-table-column>
        <!-------------------------正常列--------------------------->
        <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip'  v-else :label="items.name" :prop="items.props"></el-table-column>
      </template>
    </el-table>
    </div>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iButton,
  icon,
} from 'rise';

export default {
    name:'investCarTypeProDialog',
    components:{
      iDialog,
      iButton,
      icon,
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
    },
    data(){
      return{
        tableTitle:[],
        tableData:[
          {'partNum':'a','a':true,'b':null,'c':null,'d':null},
          {'partNum':'b','a':null,'b':true,'c':false,'d':null},
          {'partNum':'c','a':null,'b':null,'c':true,'d':null},
          {'partNum':'d','a':null,'b':null,'c':false,'d':true},
        ],
        tableLoading:false,
      }
    },
    created(){
      this.init();
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','investCarTypeProVisible',false);
        },
        init(){
          // 设置表头
          const tableTitle = [];
          tableTitle.push({
            props: "partNum", name:this.language('零件号','LINGJIANHAO'), key: "LINGJIANHAO", tooltip: true
          });
          const typeList = ['a','b','c','d'];
          typeList.map((item)=>{
            tableTitle.push({
              props:item,
              name:item,
              key:item,
              type:'icon'
            })
          })

          this.tableTitle = tableTitle;
        },

        // 判断是否为空
        isPartNumEmpty(props,row){
          return row[props]==null;
        },
        // 判断为指定类型
        isCartype(props,row){
          return row[props];
        },

        // 改变零件指定类型状态
        changeStatus(props,row,status){
          if(status == '0'){
            for(let i in row){
              if(i == props) row[i] = false;
            }
          }else if(status == '1'){
            for(let i in row){
              if(i == props) row[i] = true;
              else if(row[i] == true){ row[i] = false}
            }
          }
        },
        
    }
    
}
</script>

<style lang="scss" scoped>
  .investCarTypeProDialog{
  }
</style>