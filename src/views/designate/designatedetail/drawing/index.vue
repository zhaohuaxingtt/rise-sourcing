<template>
  <iCard class="designate-drawing" v-permission.auto="SOURCING_NOMINATION_ATTATCH_DRAWING|决策资料-drawing">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ language("Drawing",'Drawing') }}</span
      >
      <div class="floatright" v-if="!$store.getters.isPreview">
        <!-- 排序 -->
        <iButton v-if="!nominationDisabled && !rsDisabled" @click="sortVisibal = true" v-permission.auto="SOURCING_NOMINATION_ATTATCH_DRAWING_SORT|排序">
          {{ language("strategicdoc_PaiXu",'排序') }}
        </iButton>
        <!-- 全部下载 -->
        <iButton @click="batchDownloadAll" v-permission.auto="SOURCING_NOMINATION_ATTATCH_DRAWING_DOWNLOADALL|全部下载">
          {{ language("strategicdoc_QuanBuXiaZai",'全部下载') }}
        </iButton>
        <!-- 上传 -->
        <iButton v-if="!nominationDisabled && !rsDisabled" @click="uploadVisibal = true" v-permission.auto="SOURCING_NOMINATION_ATTATCH_DRAWING_UPLOAD|上传">
          {{ language("strategicdoc_ShangChuan",'上传') }}
        </iButton>
      </div>
    </div>
    <div class="list" :class="{'data-null': !(dataList && dataList.length)}" v-loading="tableLoading">
      <el-row gutter="20" v-if="dataList && dataList.length">
        <el-col class="margin-bottom25" span="12" v-for="(item, index) in dataList" :key="index">
          <div class="drawing-content">
            <img
              v-if="String(item.fileName).endsWith('.jpg') || String(item.fileName).endsWith('.jpeg') || String(item.fileName).endsWith('.png')"
              class="img-preview"
              :src="item.filePath" />
            <span v-else><i class="el-icon-document"></i>{{item.fileName}}</span>
            <a class="trigger" href="javascript:;" @click="dowloadSingleFile(item)" v-permission.auto="SOURCING_NOMINATION_ATTATCH_DRAWING_DOWNLOADSINGLE|图纸下载">
              <icon class="icon" symbol name="iconicon-xiazai" />
              <span>下载</span></a>
          </div>
        </el-col>
      </el-row>
      <div class="data-null" v-else>{{language('LK_ZANWUSHUJU','暂无数据')}}</div>
    </div>
    <!-- 排序弹窗 -->
    <sortDialog :visible.sync="sortVisibal" :nomiAppId="nomiAppId" />
    <!-- 上传弹窗 -->
    <uploadDialog :visible.sync="uploadVisibal" :nomiAppId="nomiAppId" />
  </iCard>
</template>
<script>
import {
  iCard,
  iButton,
  icon,
  iMessage
} from 'rise'
import sortDialog from './components/sortDialog'
import uploadDialog from './components/uploadDialog'
import { 
  // getdDecisiondataDaringList,
  getdDecisiondataDaringListAll
} from '@/api/designate/decisiondata/drawing'
import { downloadFile, downloadUdFile } from '@/api/file'
import { attachMixins } from '@/utils/attachMixins'

export default {
  mixins: [ attachMixins ],
  data() {
    return {
      sortVisibal: false,
      uploadVisibal: false,
      // loading: false,
      dataList: [],
      nomiAppId: this.$route.query.desinateId || '',
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
  },
  components: {
    iCard,
    iButton,
    icon,
    sortDialog,
    uploadDialog
  },
  mounted() {
    this.getFetchDataList()
  },
  methods: {
    async batchDownloadAll() {
      const params = {
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
      }
      this.batchDownload(params)
      
    },
    getFetchDataList() {
      const params = {
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
      }
      this.getDataList(params)
    },

    // 下载
    dowloadSingleFile(item){
      // const { fileName } = item;
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: fileName
      // });
      downloadUdFile(item.uploadId)
    }
  },
  watch: {
    sortVisibal: {
      handler(newVal, oldVal) {
        // 由true变为false
        if (!newVal && oldVal) {
          this.getDataList()
        }
      }
    },
    uploadVisibal: {
      handler(newVal, oldVal) {
        // 由true变为false
        if (!newVal && oldVal) {
          this.getDataList()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.designate-drawing {
  .list {
    min-height: 400px;
    &.data-null {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .drawing-content {
      width: 100%;
      height: 300px;
      border: 1px solid #d9dee5;
      border-radius: 15px;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-height: 100%;
      }
      .trigger {
        position: absolute;
        display: block;
        margin-top: 15px;
        margin-right: 15px;
        top: 0px;
        right: 0px;
      }
      .el-icon-document {
        display: inline-block;
        padding-right: 5px
      }
    }
  }
}
</style>