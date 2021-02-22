<!--
 * @Author: your name
 * @Date: 2021-02-19 14:29:21
 * @LastEditTime: 2021-02-22 11:55:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ui\index.vue
-->
<template>
  <div class="padding20">
    <span class="font14 blue"
      >RISE
      公共UI组件展示界面，基于element的二次封装，当前element版本：1.15.0</span
    >
    <el-row class="margin0 padding0">
      <el-col :span="8">
        <icard title="iInput">
          <iInput slot="components"></iInput>
        </icard>
      </el-col>
      <el-col :span="8">
        <icard title="iSelect">
          <iSelect slot="components"></iSelect>
        </icard>
      </el-col>
      <el-col :span="8">
        <icard title="el-checkbox&el-radio">
          <template slot="components">
            <el-checkbox checked>checkboxItems</el-checkbox>
            <el-checkbox>checkboxItemsOther</el-checkbox>
            <el-radio-group  v-model="radio">
               <el-radio label="1">radio</el-radio>
               <el-radio label="2">radiother</el-radio>
            </el-radio-group>
          </template>
        </icard>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span='24'>
        <icard title="el-tabel">
          <el-table slot="components" :data='TabelData'>
             <el-table-column v-for="(items,index) in tabelTile" :key="index" align='center' :label="items.name" :prop="items.key"></el-table-column>
          </el-table>
        </icard>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { iInput, iSelect } from "@/components";
import icard from "./components/title";
import {tabelTile} from './components/data'
import {TabelData} from '@/api/ui'
export default {
  components: {
    icard,
    iInput,
    iSelect,
  },
  data(){
    return {
      tabelTile,
      TabelData:[],
      radio:1
    }
  },
  created(){
    TabelData().then(res=>{
      this.TabelData = res.data
    })
  }
};
</script>
<style lang="scss" scoped></style>
