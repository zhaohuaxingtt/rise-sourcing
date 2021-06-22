<!--
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-06-18 15:18:47
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
        align="center"
        header-align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        header-align="center"
        label="分析名称">
        <template slot-scope="scope">
          <div class="openPage">
            <span v-if="!editMode">{{scope.row.name}}</span>
            <span v-else>
              <iInput v-model="scope.row.name"></iInput>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="materials"
        align="center"
        header-align="center"
        label="材料组">
      </el-table-column>
      <el-table-column
        prop="rfq"
        align="center"
        header-align="center"
        label="RFQ">
      </el-table-column>
      <el-table-column
        prop="default"
        align="center"
        header-align="center"
        label="默认项">
        <template slot-scope="scope">
          <div v-if="!editMode">
            {{scope.row.default == 0 ? "是" : null}}
          </div>
          <div v-else-if="editMode && scope.row.fileType == 0 && scope.row.default == 0">
            <iSelect v-model="scope.row.default">
              <el-option :value="item.value" :label="item.label" v-for="(item, index) in defaultData" :key="index"></el-option>
            </iSelect>
          </div>
          
        </template>
      </el-table-column>
      <el-table-column
        prop="fileType"
        align="center"
        header-align="center"
        label="文件类型">
        <template slot-scope="scope">
          {{scope.row.fileType == 0 ? "方案" : "报告"}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy"
        align="center"
        header-align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="createDate"
        align="center"
        header-align="center"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="listTimeEditDate"
        align="center"
        header-align="center"
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
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page='page.currPage'
      :total="page.totalCount"/>
  </div>
</template>

<script>
import {icon, iPagination, iInput, iSelect} from 'rise'
import {pageMixins} from '@/utils/pageMixins';
export default {
  name: 'analysisTable',
  mixins: [pageMixins],
  components: {icon, iPagination, iInput, iSelect},
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableListData: [],
      tableLoading: false,
      defaultData: [
        {value: 0, label: '是'},
        {value: 1, label: '否'},
      ]
    }
  },
  created() {
    this.initTestTableData() 
  },
  methods: {
    //初始化测试数据（静态数据）
    initTestTableData() {
      this.tableListData = [
        {id: 0, name: 'test1', materials: '编号-名称', rfq: 'RFQ号-名称', default: 0, fileType: 0, stick: true, children: [
          {id: 1, name: 'test1.1', fileType: 1,},
          {id: 2, name: 'test1.2', fileType: 1,},
        ]},
        {id: 3, name: 'test2', materials: '编号-名称', rfq: 'RFQ号-名称', default: 1, fileType: 0,stick: false},
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
.openPage{
	color: $color-blue;
	font-size: 14px;
	text-decoration: underline;
	cursor: pointer;
	width: 100px;
	@include text_;
}

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
  }
  .fileNum-icon {
   display: inline-block;
   
  }
}

 
</style>
