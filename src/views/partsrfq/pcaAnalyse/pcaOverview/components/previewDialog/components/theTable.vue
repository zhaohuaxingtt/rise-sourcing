<template>
  <div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          v-for="item of tableTitle"
          :key="item.props"
          :prop="item.props"
          :label="item.name"
      >
        <template v-if="item.children">
          <el-table-column
              v-for="itemChildren of item.children"
              :key="itemChildren.props"
              :prop="itemChildren.props"
              :label="itemChildren.name"
          >
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {tableTitle} from './data';

export default {
  data() {
    return {
      tableData: [
        {'0': 1, '1': 1, '2': 2, '3': 3, '4': 4},
      ],
      tableTitle,
    };
  },
};
</script>

<style scoped>

</style>
