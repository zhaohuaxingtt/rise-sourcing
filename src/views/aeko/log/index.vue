<template>
  <iPage class="log" v-permission="LOG_HOME_INDEXPAGE">
    <iCard class="card" :title="language('YEWURIZHI','业务日志')">
      <template v-slot:header-control>
        <!-- <span class="margin-left20" @click="close">
          <icon symbol name="iconxiangguanlingjianguanbi" class="font18"></icon>
        </span> -->
        <el-button @click="close" class="colse-btn" icon="el-icon-error" type="text"></el-button>
      </template>
      <div class="body">
        <div class="form-box">
          <el-form inline label-position="top" class="query-form">
            <el-form-item :label="language('CAOZUOLEIXING','操作类型')">
              <iSelect v-model="query.operatorType" filterable placeholder="请选择">
                <el-option
                  v-for="item in operatorTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="language('CAOZUOREN','操作人')" class="margin-left60">
              <iSelect v-model="query.operatorName" filterable placeholder="请选择">
                <el-option
                  v-for="item in operatorNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </iSelect>
            </el-form-item>
          </el-form>
          <div>
            <iButton @click="queryByPage">{{language('QUEREN','确认')}}</iButton>
            <iButton class="ml-20" @click="reset">{{language('CHONGZHI','重置')}}</iButton>
          </div>
        </div>
        <div class="table-box">
          <el-table height="100%" :data="tableListData" :loading="loading">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <span>{{scope.row.info}}</span>
              </template>
            </el-table-column>
            <el-table-column v-for="item in tableTitle" :label="language(item.key, item.name)" :prop="item.props" :key="item.props" align="center">
              <template slot-scope="scope">
                <template v-if="item.props==='createDate'||item.props==='responseDate'">
                  {{scope.row[item.props] | dateFilter}}
                </template>
                <template v-else>
                  {{scope.row[item.props]}}
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="footer" >
        <iPagination
          v-update
          class="pagination"
          @size-change="handleSizeChange($event, queryByPage)"
          @current-change="handleCurrentChange($event, queryByPage)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, icon, iCard, iButton, iPagination, iMessage, iSelect } from 'rise'
// import { tableTitle } from './data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { queryLogByAeko } from '@/api/log'

export default {
  components: { iPage, icon, iCard, iButton, iPagination, iSelect },
  mixins: [ pageMixins, filters ],
  data() {
    return {
      recordId: '',
      tableTitle,
      tableListData: [],
      operatorTypeList:[],
      operatorNameList:[],
      query:{
        operatorType:'',
        operatorName:''
      },
    }
  },
  created() {
    this.recordId = this.$route.query.recordId
    this.queryLogByAeko()
    this.queryOperatorType()
    this.queryOperatorName()
  },
  methods: {
    // 关闭返回上一页
    close(){
      this.$router.go(-1)
    },
    // 重置
    reset(){
      this.query = {}
    },
    // 查询
    queryLogByAeko() {
      this.loading = true
      queryLogByAeko({})
        .then(res => {
          // res.data = []
          this.tableListData = res.data
          this.page.totalCount = res.total
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    // 查询操作类型
    queryOperatorType(){
      this.operatorTypeList = [{
        value:'1',
        label:'test1'
      },{
        value:'2',
        label:'test2'
      },{
        value:'3',
        label:'test3'
      }]
    },
    // 查询操作人
    queryOperatorName(){
      this.operatorNameList = [{
        value:'1',
        label:'用户1'
      },{
        value:'2',
        label:'用户2'
      },{
        value:'3',
        label:'超级管理员'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.log {
  .card {
    height: 100%;
    min-height: 575px;
    .colse-btn{
      color: #a0befc;
      font-size: 24px;
      padding: 0;
    }
    .header {
      position: relative;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: #001847;
      }

      .control {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
      }
    }

    .body {
      height: calc(100vh - 300px);
      min-height: 400px;
      .form-box{
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        .query-form{
          ::v-deep .el-form-item__label{
            line-height: 1rem;
          }  
        }
        .ml-20{
          margin-left: 20px;
        }
      }
      .table-box{
        height: calc(100% - 88px);
      }
    }

    .pagination {
      margin-top: 30px;
    }
  }
}
</style>