<!--
 * @Author: haojiang
 * @Date: 2021-06-30 16:51:56
 * @LastEditTime: 2021-08-18 17:56:55
 * @LastEditors: Please set LastEditors
 * @Description: 提交定点申请，如果是上会类型，上会弹窗
 * @FilePath: /front-web/src/views/designate/home/components/mettingDialog/index.vue
-->
<template>
  <iDialog class="dialog" v-bind="$props" :visible.sync="visible" v-on="$listeners">
    <div class="dialog-Header" slot="title">
      <div class="font18 font-weight">{{language('XUANZEHUIYI', '选择会议')}}</div>
      <div class="control">
       
        <!-- <iButton>{{ language('strategicdoc.ShangChuanWenJian') }}</iButton> -->
      </div>
    </div>
    <div class="dialog-form">
      <el-form>
      <el-form-item :label="`${language('XUANZEHUIYILEIBIE','选择会议类别')}:`">
          <el-radio-group v-model="meetingType">
					<el-radio
            v-for="(item, index) in meetingTypes"
            :key="index"
            :label="item.id"
            size="small"
            >{{language(item.key, item.name)}}</el-radio>
				</el-radio-group>
        <!-- <el-form-item :label="`${language('XUANZEHUIYIJIEGUO','选择会议结果')}:`">
          <el-radio-group v-model="meetingResult">
            <el-radio
              v-for="(item, index) in meetingResultArray"
              :key="index"
              :label="item.id"
              size="small"
              >{{language(item.key, item.name)}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form-item>
      </el-form>
      <div class="dialog-form-sbtn">
        <iButton :loading="loading" @click="checkNomiMeetingSubmit">{{language('QINGXUANZE', '选择')}}</iButton>
      </div>
    </div>
    <div class="body" v-loading="tableLoading">
      <tableList
        index
        :radio="true"
        :height="controlHeight ? '91%' : '100%'"
        v-show="visible" class="table margin-top20" 
        :tableData="tableListData" 
        :tableTitle="tableTitle" 
        @handleSelectionChange="handleSelectionChange"
        :lang="true">
        <template #uploadDate="scope">
          {{scope.row.uploadDate | dateFilter('YYYY-MM-DD')}}
        </template>
      </tableList>
    </div>
    <div slot="footer" class="footer">
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getFetchData)"
        @current-change="handleCurrentChange($event, getFetchData)"
        background
        :current-page="page.currPage"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
      
    </div>
  </iDialog>
</template>

<script>
import { iPagination, iDialog, iMessage, iButton } from 'rise'
import { mettingTableTitle as tableTitle, meetingTypes, meetingResult as meetingResultArray } from './data'
import tableList from '@/views/designate/supplier/components/tableList'
import filters from '@/utils/filters'
import { pageMixins } from '@/utils/pageMixins'

import {
    getMeetingPage
} from '@/api/designate'

export default {
  components: { tableList, iPagination, iDialog, iButton },
  mixins: [ pageMixins, filters ],
  props: {
    ...iDialog.props,
    visible: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    visible: {
      handler() {
        this.$nextTick(() => { 
          if (this.visible) {
            this.getFetchData()
          } else{
            // 刷新父列表
            this.$emit('refresh', {})
          }
        })
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      nomiAppId: this.$route.query.desinateId,
      tableTitle,
      meetingTypes,
      meetingType: '',
      meetingResultArray,
      meetingResult: '',
      controlHeight: 0,
      tableLoading: false,
      tableListData: [],
      selectedData: [],
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  methods: {
    handleSelectionChange(data) {
      this.selectedData = data
    },
    // 获取会议列表
    getFetchData() {
      if (!this.nomiAppId) return iMessage.error(this.language('nominationLanguage_DingDianIDNotNull','定点申请单id不能为空'))
      this.tableLoading = true
      const params = Object.assign({
        nomiAppId: this.nomiAppId,
        current: this.page.currPage,
        size: this.page.pageSize
      })
      getMeetingPage(params).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        console.log(res)
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    async checkNomiMeetingSubmit() {
      console.log(this.selectedData)
      const { query } = this.$route;
      const {desinateId} = query;
      const meetingIds = this.selectedData.map(o => o.meetingId) || []
      const data = {
          nominateIdArr:[Number(desinateId)],
          // nominationType: this.$store.getters.nominationType || '',
          // meetingResult: this.meetingResult,
          meetingType: this.meetingType,
          meetingId: meetingIds && Number(meetingIds[0]) || '',
      }
      if (!this.meetingType) {
        iMessage.error(this.language('QINGXUANZEHUIYILEIBIE','请选择会议类别'))
        return
      }
      if (!this.selectedData.length) {
        iMessage.error(this.language('LK_QINGXUANZEHUIYI','请选择会议'))
        return
      }
      this.$emit('success', data)
      this.$emit('update:visible', false)
      // try {
      //   this.loading = true
      //   const res = await checkNomiMeetingSubmit3(data)
      //   if (res && res.code === '200') {
      //     let dataInfo = ''
      //     if (res.data && res.data.length) {
      //       res.data.forEach((item) => {
      //       if (this.$i18n.locale === "zh") {
      //         dataInfo+= `${item.zhMsg}\n`
      //       } else {
      //         dataInfo+= `${item.engMsg}\n`
      //       }              
      //     })
      //     this.$confirm(dataInfo,'提示', {
      //       confirmButtonText: '确定',
      //       showCancelButton: false,
      //       type: 'warning'
      //     })
      //   } else {
      //     // 校验成功
      //     this.$emit('success', data)
      //     this.$emit('update:visible', false)
      //   }
        
      //   } else {
      //       iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
      //   }
      //   this.loading = false
      // } catch(e) {
      //   this.loading = false
      //   iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      // }
    }
    
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  @mixin pdtb($top: 0, $bottom: 0) {
    padding-top: $top;
    padding-bottom: $bottom;
  }

  .upload-trigger {
    margin-left: 10px;
  }

  .link-underline {
    display: inline-block;
    margin-right: 15px;
  }
  .dialog-Header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 40px;
  }
  .dialog-form-sbtn {
    min-height: 50px;
    margin-top: 15px;
    padding-top:15px;
    border-top: 1px solid #f8f8f8;
    display: flex;
    justify-content: flex-end;
  }
  ::v-deep .el-dialog {
    width: 1745px!important;
    position: absolute;
    margin: 0!important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-x: hidden;

    .body {
      height: 580px;
    }

    .el-dialog__header {
      @include pdtb(30px, 30px);
    }

    .el-dialog__body {
      @include pdtb(6px, 0);
    }

    .pagination {
      margin-top: 0;
    }

    .el-dialog__footer {
       @include pdtb(28px, 28px);
    }
  }
}
</style>