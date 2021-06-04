<template>
  <iCard class="designate-drawing">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ $t("Drawing") }}</span
      >
      <div class="floatright" v-if="!$store.getters.isPreview">
        <!-- 排序 -->
        <iButton @click="sortVisibal = true">
          {{ $t("strategicdoc.PaiXu") }}
        </iButton>
        <!-- 全部下载 -->
        <iButton @click="batchDownload">
          {{ $t("strategicdoc.QuanBuXiaZai") }}
        </iButton>
        <!-- 上传 -->
        <iButton @click="uploadVisibal = true">
          {{ $t("strategicdoc.ShangChuan") }}
        </iButton>
      </div>
    </div>
    <div class="list" :class="{'data-null': !(dataList && dataList.length)}" v-loading="loading">
      <el-row gutter="20" v-if="dataList && dataList.length">
        <el-col class="margin-bottom25" span="12" v-for="(item, index) in dataList" :key="index">
          <div class="drawing-content">
            <img
              v-if="String(item.fileName).endsWith('.jpg') || String(item.fileName).endsWith('.jpeg') || String(item.fileName).endsWith('.png')"
              class="img-preview"
              :src="item.filePath" />
            <span v-else><i class="el-icon-document"></i>{{item.fileName}}</span>
            <a class="trigger" href="javascript:;" @click="dowloadSingleFile(item)">
              <icon class="icon" symbol name="iconicon-xiazai" />
              <span>下载</span></a>
          </div>
        </el-col>
      </el-row>
      <div class="data-null" v-else>{{$t('LK_ZANWUSHUJU')}}</div>
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
  getdDecisiondataDaringList,
  getdDecisiondataDaringListAll
} from '@/api/designate/decisiondata/drawing'
import { downloadFile } from '@/api/file'

export default {
  data() {
    return {
      sortVisibal: false,
      uploadVisibal: false,
      loading: false,
      dataList: [],
      nomiAppId: this.$route.query.desinateId || '',
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  components: {
    iCard,
    iButton,
    icon,
    sortDialog,
    uploadDialog
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    dowloadSingleFile(item) {
      if (item && item.id) {
        const params = {
          applicationName: 'rise',
          fileList: [item.id]
        }
        downloadFile(params)
      }
    },
    async batchDownload() {
      if (!this.nomiAppId) return iMessage.error(this.$t('nominationLanguage.DingDianIDNotNull'))
      try {
        const res1 = await getdDecisiondataDaringListAll({
          nomiAppId: this.nomiAppId,
          sortColumn: 'sort',
          isAsc: true,
          fileType: '101',
        })
        if (res1.code === '200') {
          const list = res1.data.records || []
          const fileList = list.map(o => o.id)
          console.log(fileList)
          if (fileList.length) {
            const params = {
              applicationName: 'rise',
              fileList
            }
            console.log('批量下载', params)
            downloadFile(params)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    getDataList() {
      if (!this.nomiAppId) return iMessage.error(this.$t('nominationLanguage.DingDianIDNotNull'))
      this.loading = true
      getdDecisiondataDaringList({
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }).then(res => {
        if (res.code === '200') {
          this.dataList = res.data.records || []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.loading = false
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.loading = false
      })
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