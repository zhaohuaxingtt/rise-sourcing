<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-18 10:27:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\components\analysisTable.vue
-->
<template>
  <div>
    <el-table
      :data="tableListData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children'}">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="number"
        label="#"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="分析名称">
        <template slot-scope="scope">
          <div class="flex-between-center">
            <span>{{scope.row.name}} </span>
            <!-- <p class="filenum-span">
              <span class="filenum-num">10</span>
                <icon style="{font-size:24px}" symbol name="iconwenjianshuliangbeijing"  ></icon>
            </p> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="materials"
        label="材料组">
      </el-table-column>
      <el-table-column
        prop="rfq"
        label="RFQ">
      </el-table-column>
      <el-table-column
        prop="default"
        label="默认项">
        <template slot-scope="scope">
          {{scope.row.default == 0 ? "是" : null}}
        </template>
      </el-table-column>
      <el-table-column
        prop="fileType"
        label="文件类型">
      </el-table-column>
      <el-table-column
        prop="createBy"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="listTimeEditDate"
        label="上次修改日期">
      </el-table-column>
      <el-table-column
        width="50">
        <template slot-scope="scope">
          <icon v-if="scope.row.stick" style="{font-size:24px}" symbol name="iconliebiaoyizhiding"  @click="clickStick(scope.row)"></icon>
          <icon v-else style="{font-size:24px}" symbol name="iconliebiaoweizhiding" @click="clickStick(scope.row)" ></icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {icon} from 'rise'
export default {
  name: 'analysisTable',
  components: {icon},
  data () {
    return {
      tableListData: [],
      tableLoading: false
    }
  },
  created() {
    this.initTestTableData() 
  },
  methods: {
    //初始化测试数据（静态数据）
    initTestTableData() {
      this.tableListData = [
        {id: 0, name: 'test1', materials: '编号-名称', default: 0, stick: true, children: [
          {id: 1, name: 'test1.1', },
          {id: 2, name: 'test1.2', children: [
          ]},
        ]},
        {id: 3, name: 'test2', materials: '编号-名称', default: 1, stick: false},
      ]
      this.handleTableNumber(this.tableListData, 1, null)
    },
    //递归处理树结构数据的序号
    handleTableNumber(data, suffix, prefix) {
     data.forEach((item, index) => {
        const number = prefix ? (prefix + '.' + suffix) : suffix
        item['number'] = number
        if(item.children && item.children.length > 0) {
          this.handleTableNumber(item.children, 1, number)
        }
        suffix++
      })
    },
    //点击置顶事件
    clickStick(row) {
      if(row.stick) {
        console.log('点击取消置顶');
      } else {
        console.log('点击置顶');
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.filenum-span {
    position: relative;
    width: 24px;
    height: 24px;
  .filenum-num {
    display: inline-block;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 14px;
    color: $color-white;
    // right: 20px;
  }
  .fileNum-icon {
   display: inline-block;
   
  }
}

 
</style>
