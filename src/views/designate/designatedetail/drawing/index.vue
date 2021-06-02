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
    <div class="list" :class="{'data-null': !(dataList && dataList.length)}">
      <el-row gutter="20" v-if="dataList && dataList.length">
        <el-col class="margin-bottom25" span="12" v-for="(item, index) in dataList" :key="index">
          <div class="drawing-content">
            <img class="img-preview" :src="item.filePath" />
            <a class="trigger" href="javascript:;">
              <icon class="icon" symbol name="iconicon-xiazai" />
              <span>下载</span></a>
          </div>
        </el-col>
      </el-row>
      <div class="data-null" v-else>{{$t('LK_ZANWUSHUJU')}}</div>
    </div>
    <!-- 排序弹窗 -->
    <sortDialog :visible.sync="sortVisibal" />
    <!-- 上传弹窗 -->
    <uploadDialog :visible.sync="uploadVisibal" />
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
import { downloadFiles } from '@/api/file/upload'

export default {
  data() {
    return {
      sortVisibal: false,
      uploadVisibal: false,
      dataList: [],
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
    async batchDownload() {
      try {
        const res1 = await getdDecisiondataDaringListAll({
          nomiAppId: '1',
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
            const dInfo = await downloadFiles(params)
            console.log(dInfo)
            if (dInfo && dInfo.code === '200') {
              console.log(dInfo)
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    getDataList() {
      getdDecisiondataDaringList({
        nomiAppId: '1',
        sortColumn: 'sort',
        isAsc: true,
        fileType: '101',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.dataList = res.data.records || []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.tableLoading = false
      })
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
      display: flex;
      justify-content: flex-end;
      .trigger {
        display: block;
        margin-top: 15px;
        margin-right: 15px;
      }
    }
  }
}
</style>