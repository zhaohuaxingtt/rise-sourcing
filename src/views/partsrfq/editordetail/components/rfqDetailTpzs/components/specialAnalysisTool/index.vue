<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:46:18
 * @LastEditors: zbin
 * @Descripttion: 专项分析工具
-->
<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col class="margin-right20" :span="12">
        <bob  :title="title"/>
      </el-col>
      <el-col :xxx="title" :span="12">
        <bob />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bob from "./components/bob";
export default {
  components: { bob },
  data(){
    return{
      title:'BoB(Best of Best)'
    }
  },
  created(){
  },
  methods:{

  }
}
</script>

<style>
</style>