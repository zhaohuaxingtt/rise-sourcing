<!--
 * @Author: youyuan
 * @Date: 2021-08-05 11:17:33
 * @LastEditTime: 2021-09-27 09:58:12
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
            <!--类别-->
            <el-form-item :label="language('LEIBIE', '类别')">
              <iSelect v-model="searchForm.classType">
                <el-option value="" label="全部"></el-option>
                <el-option v-for="(item, index) in rawMaterialTypeData" :value="item.id" :label="item.val" :key="index"></el-option>
              </iSelect>
            </el-form-item>
            <!--原材料/牌号/规格-->
            <el-form-item :label="language('YUANCAILIAOPAIHAOGUIGE', '原材料/牌号/规格')">
              <iInput
                :placeholder="language('QINGSHURU', '请输入')"
                v-model="searchForm.keyWords"
              ></iInput>
            </el-form-item>
            <!--地区-->
            <el-form-item :label="language('DIQU', '地区')">
              <iSelect v-model="searchForm.areaName">
                <el-option value="" label="全部"></el-option>
                <el-option v-for="(item, index) in rawMaterialAreaData" :value="item.id" :label="item.val" :key="index"></el-option>
              </iSelect>
            </el-form-item>
            <!--RFQ号-->
            <el-form-item :label="language('QISHINIANYUE', '起始年月')">
              <iDatePicker v-model='searchForm.beginTime' valueFormat="yyyy-MM"  type="month"></iDatePicker>
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
        :height="450"
        @openPage="clickPreview"
      >
        <template #ratio="scope">
          <p :class="getPriceChangeClass(scope.row.ratio)">{{scope.row.ratio ? (scope.row.ratio > 0 ? '+' + scope.row.ratio + '%' : scope.row.ratio + '%') : null}} </p>
        </template>
        <template #priceAmplitude="scope">
          <p>{{scope.row.priceAmplitude}}% </p>
        </template>
      </tableList>
      <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableData)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      /> -->
    </div>
    <detail :key="detailParam.key" :materiaName="name" v-model="detailParam.visible" @handleCloseModal="handleCloseModal"/>
  </div>
</template>

<script>
import { iButton, iInput, iSearch, iDatePicker, iPagination, iMessage, iSelect } from 'rise'
import tableList from '@/components/ws3/commonTable';
import { tableTitle } from './components/data'
import detail from './components/detail'
import { pageMixins } from "@/utils/pageMixins";
import { getRawMateriaList, fetchRawMaterialType, fetchRawMaterialArea } from '@/api/partsrfq/piAnalysis/index'
export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iInput,
    iSearch,
    iDatePicker,
    iPagination,
    iSelect,
    tableList,
    detail
  },
  data () {
    return {
      tableTitle,
      tableListData: [],
      loading: true,
      searchForm: {
        beginTime: null
      },
      detailParam: {
        visible: false,
        key: 0
      },
      name: null,
      rawMaterialTypeData: [],
      rawMaterialAreaData: []
    }
  },
  created() {
    // this.initTestData()
    this.initSearchData()
    this.getTableData()
    this.getRawMaterialType()
    this.getRawMaterialArea()
    const date = new Date()
    this.initDate()
  },
  methods: {
    // 初始化时间
    initDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      this.searchForm.beginTime = (year - 1) + '-' +(month < 10 ? '0' + month : month)
    },
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
    getTableData() {
      return new Promise(resolve => {
        const params = {
          beginTime: this.searchForm.beginTime || null,
          keyWords: this.searchForm.keyWords || null,
          areaName: this.searchForm.areaName || null,
          classType: this.searchForm.classType || null,
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
            resolve(res.data)
          } else iMessage.error(res.desZh)
        })
      })
    },
    // 原材料价格总览——类型下拉数据
    getRawMaterialType() {
      fetchRawMaterialType().then(res => {
        if(res && res.code == 200) this.rawMaterialTypeData = res.data
        else iMessage.error(res.desZh)
      })
    },
    // 原材料价格总览——地区下拉数据
    getRawMaterialArea() {
      fetchRawMaterialArea().then(res => {
        if(res && res.code == 200) this.rawMaterialAreaData = res.data
        else iMessage.error(res.desZh)
      })
    },
    // 得到价格变动比率样式名
    getPriceChangeClass(val) {
      // const num = val.split('%')[0]
      // if(num >= 0) return 'positive'
      if(Number(val) >=0 ) return 'positive'
      else return 'minus'
    },
    // 点击返回
    clickBack() {
      if (this.$store.state.rfq.entryStatus === 1) {
          this.$router.push({
            path: '/sourceinquirypoint/sourcing/partsrfq/assistant',
            query: {
              id: this.$store.state.rfq.rfqId,
              round: this.$route.query.round,
              pageType: 'PI',
              activityTabIndex: 'two',
            },
          });
        } else {
          this.$router.push({
            path: '/sourcing/partsrfq/externalNegotiationAssistant',
            query: {
              pageType: 'PI',
            },
          });
        }
    },
    // 点击查看
    clickPreview(val) {
      this.$set(this.detailParam, 'key', Math.random())
      this.$set(this.detailParam, 'visible', true)
      this.name = val.name
    },
    // 点击确认
    handleSearch() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableData().then(res => {
        if (!res || res.length == 0) {
          iMessage.error(this.$t('TPZS.BQWFCXDJGSRCWHBCZQQRHCXSR'));
        }
      })
    },
    // 点击重置
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.initSearchData()
      this.getTableData()
    },
    // 初始化检索条件
    initSearchData() {
      this.page.pageSize = 100
      for(const key in this.searchForm) {
        this.searchForm[key] = null
      }
      this.initDate()
    },
    // 关闭弹窗
    handleCloseModal() {
      this.detailParam.visible = false
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

