<template>
  <div>
    <el-table :data="tableData">
      <template v-for="(item,index) in tableTitle">
        <el-table-column :key="index" :label="language(item.key,item.name)" :prop="item.props">
          <template v-if="item.header" slot="header" slot-scope="scope">
            <span>{{language(setting.key, setting.name)}}</span>
            <span>{{language(setting.key, setting.name)}}</span>
          </template>
          <template></template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>