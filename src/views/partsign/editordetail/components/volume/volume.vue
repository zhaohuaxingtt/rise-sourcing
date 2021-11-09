<!--
 * @Author: your name
 * @Date: 2021-02-24 17:57:52
 * @LastEditTime: 2021-10-27 13:26:16
 * @LastEditors: Hao,Jiang
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsign\editordetail\components\volume\index.vue
-->
<template>
  <iCard class="volume">
    <div class="header clearFloat">
      <span class="title">{{ language('LK_MEICHEYONGLIANG','每车用量') }}（{{ language('LK_DANGQIANBANBEN','当前版本') }} : {{ versionComputed }}）</span>
      <div class="control">
        <iButton v-if="!disabled" @click="jump" v-permission.auto="PARTSIGN_EDITORDETAIL_VOLUME_ALL|每车用量查看全部版本">{{ language('LK_CHAKANQUANBUBANBEN','查看全部版本') }}</iButton>
        <iButton v-if="!disabled" @click="download" v-permission.auto="PARTSIGN_EDITORDETAIL_VOLUME_EXPORT|每车用量导出">{{ language('LK_DAOCHU','导出') }}</iButton>
      </div>
    </div>
    <div class="body margin-top27">
      <tableList index class="table" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading" @handleSelectionChange="handleSelectionChange" />
      <iPagination v-update
        class="pagination"
        @size-change="handleSizeChange($event, getVolume)"
        @current-change="handleCurrentChange($event, getVolume)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount" />
    </div>
    <!-- <volumeDialog :visible.sync="versionVisible" /> -->
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise'
// import volumeDialog from '../versionDialog'
import tableList from '../tableList'
import { volumeTableTitle as tableTitle } from '../data'
import { pageMixins } from '@/utils/pageMixins'
import { getPerCarDosageVersion, getPerCarDosageInfo } from '@/api/partsprocure/editordetail'
import { excelExport } from '@/utils/filedowLoad'

export default {
  components: { iCard, iButton, iPagination, tableList },
  mixins: [ pageMixins ],
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      loading: false,
      version: '',
      carTypeConfigId: '',
      // versionVisible: false
    }
  },
  created() {
    this.getVolume()
  },
  computed: {
    versionComputed() {
      const str = this.version ? this.version + "" : "V1"
      
      return !/^v\d+$/i.test(str) ? `V${ str }` : str 
    }
  },
  methods: {
    async getVolume() {
      this.loading = true

      try {
        const versionRes = await getPerCarDosageVersion({
          "currPage": 1,
          "pageSize": 10,
          "status": 1,
          "tpId": this.data.tpPartID
        })

        if (versionRes.code != 200) {
          return iMessage.error(`${ this.$i18n.locale === 'zh' ? versionRes.desZh : versionRes.desEn }`)
        }

        if (versionRes.data && Array.isArray(versionRes.data.tpRecordList) && versionRes.data.tpRecordList[0]) {
          this.carTypeConfigId = versionRes.data.tpRecordList[0].carTypeConfigId
          this.version = versionRes.data.tpRecordList[0].version || 'V1'
        }

        //如果没有已确认的版本，不调用查询没车用量
        if(!this.carTypeConfigId) return;
          const infoRes = await getPerCarDosageInfo({
          carTypeConfigId: this.carTypeConfigId,
          version: this.version,
          currPage: this.page.currPage,
          pageSize: this.page.pageSize,
          status: 1,
          tpId: this.data.tpPartID
        })

        if (infoRes.code != 200) {
          return iMessage.error(`${ this.$i18n.locale === 'zh' ? infoRes.desZh : infoRes.desEn }`)
        }

        if(infoRes.data){
          this.tableListData = infoRes.data.tpRecordList
          this.page.totalCount = infoRes.data.totalCount
        }
      } catch(e) {
        console.warn(e)
      } finally {
        this.loading = false
      }
    },
    jump() {
      // this.versionVisible = true
      // window.open(`/#/sourcing/partsign/volumeVersion?tpId=${ this.data.tpPartID }`, '_blank')
      // this.$router.push('/partsign/version')
      const route = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsign/volumeVersion",
        query: {
          tpId: this.data.tpPartID
        }
      })
      window.open(route.href, "_blank")
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG','请选择需要导出的每车用量'))
      excelExport(this.multipleSelection, this.tableTitle)
    }
  }
}
</script>

<style lang="scss" scoped>
.volume {
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
    .pagination {
      margin-top: 30px;
    }
  }
}
</style>