<!--
 * @Author: youyuan
 * @Date: 2021-08-05 11:17:33
 * @LastEditTime: 2021-08-16 15:45:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\piAnalyse\components\rawMateria\index.vue
-->
<template>
  <div class="mainBox">
    <div class="headBox">
      <p>{{language("YUANCAILIAOJIAGEZONGLAN", "原材料价格总览")}}</p>
      <iButton @click="clickBack">{{language("FANHUI", "返回")}}</iButton>
    </div>
    <div class="searchBox">
      <iSearch @reset="handleSearchReset" @sure="handleSearch" :icon="false">
        <el-form label-position="top">
          <el-row class="margin-bottom20">
            <!--原材料-->
            <el-form-item :label="language('YUANCAILIAOLEIBIEBIANHAO', '原材料/类别/编号')">
              <iInput
                :placeholder="language('QINGSHURU', '请输入')"
                v-model="searchForm.keyWords"
              ></iInput>
            </el-form-item>
            <!--地区-->
            <el-form-item :label="language('DIQU', '地区')">
              <iInput
                :placeholder="language('QINGSHURU', '请输入')"
                v-model="searchForm.areaName"
              ></iInput>
            </el-form-item>
            <!--RFQ号-->
            <el-form-item :label="language('QISHINIANYUE', '起始年月')">
              <iDatePicker v-moudel='searchForm.date' valueFormat="yyyy-MM"  type="daterange"></iDatePicker>
            </el-form-item>
          </el-row>
        </el-form>
      </iSearch>
    </div>
    <div class="contentBox">
      <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :index="true"
        :openPageGetRowData="true"
        openPageProps="associatedPart"
        @openPage="clickPreview"
      >
        <template #priceChange="scope">
          <p :class="getPriceChangeClass(scope.row.priceChange)">{{scope.row.priceChange}}</p>
        </template>
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </div>
    <detail :key="detailParam.key" :materiaName="name" v-model="detailParam.visible"/>
  </div>
</template>

<script>
import { iButton, iInput, iSearch, iDatePicker, iPagination, iMessage } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import detail from './components/detail'
import { pageMixins } from "@/utils/pageMixins";
import { getRawMateriaList } from '@/api/partsrfq/piAnalysis/index'
export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iInput,
    iSearch,
    iDatePicker,
    iPagination,
    iMessage,
    tableList,
    detail
  },
  data () {
    return {
      tableTitle,
      tableListData: [],
      loading: true,
      searchForm: {},
      detailParam: {
        visible: false,
        key: 0
      },
      name: null,
    }
  },
  created() {
    // this.initTestData()
    this.getTableList()
  },
  methods: {
    // 初始化测试数据
    initTestData() {
      this.tableListData = [
        {id: 1, materiaName: 'xxxxxxx', type: 'xxxx', specification: 'xxxxx', area: '上海', priceChange: '33%', associatedPart: '查看'},
        {id: 2, materiaName: 'xxxxxxx', type: 'xxxx', specification: 'xxxxx', area: '上海', priceChange: '33%', associatedPart: '查看'},
        {id: 3, materiaName: 'xxxxxxx', type: 'xxxx', specification: 'xxxxx', area: '上海', priceChange: '-33%', associatedPart: '查看'},
        {id: 4, materiaName: 'xxxxxxx', type: 'xxxx', specification: 'xxxxx', area: '上海', priceChange: '-33%', associatedPart: '查看'},
        {id: 5, materiaName: 'xxxxxxx', type: 'xxxx', specification: 'xxxxx', area: '上海', priceChange: '-33%', associatedPart: '查看'},
      ]
      this.loading = false
    },
    // 获取表格数据
    getTableList() {
      const params = {
        begTime: this.searchForm.date ? this.searchForm.date[0] : null,
        endTime: this.searchForm.date ? this.searchForm.date[1] : null,
        keyWords: this.searchForm.keyWords || null,
        areaName: this.searchForm.areaName || null,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      }
      getRawMateriaList(params).then(res => {
        if(res && res.code == 200) {
          this.page.totalCount = res.total
          this.tableListData = res.data
          this.loading = false
          this.tableListData.map(item => {
            item['associatedPart'] = '查看'
          })
        } else iMessage.error(res.desZh)
      })
    },
    // 得到价格变动比率样式名
    getPriceChangeClass(val) {
      const num = val.split('%')[0]
      if(num >= 0) return 'positive'
      else return 'minus'
    },
    // 点击返回
    clickBack() {
      this.$route.go(-1)
    },
    // 点击查看
    clickPreview(val) {
      this.$set(this.detailParam, 'key', Math.random())
      this.$set(this.detailParam, 'visible', true)
      this.name = val.name
    },
    // 点击确认
    handleSearch() {

    },
    // 点击重置
    handleSearchReset() {
      
    },

  }
}
</script>

<style lang='scss' scoped>
.mainBox {
  padding: 20px 50px;
}
.headBox {
  width: 100%;
  p {
    font-size: 20px;
    font-weight: bold;
    display: inline;
  }
  button {
    float: right;
    z-index: 999;
  }
}
.searchBox {
  margin: 20px 0;
}
.contentBox {
  .positive {
    color: #E30B0D;
  }
  .minus {
    color: #21D59B;
  }
}
 
</style>

