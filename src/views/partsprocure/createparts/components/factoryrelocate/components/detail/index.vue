<template>
  <iPage class="createPartsBatchDetail">
    <iCard :title="`${ language('PICI', '批次') }：${ id }`">
      <template #header-control>
        <iButton v-if="operableStatus" class="executeBtn" :loading="executeLoading" @click="handleExecute"><span><i v-if="!executeLoading" class="executeIcon"></i>{{ language('ZHIXING', '执行') }}</span></iButton>
      </template>
      <iSearch class="search" @sure="sure" @reset="reset">
        <el-form>
          <el-form-item :label="language('LINGJIANHAO', '零件号')">
            <iMultiLineInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" :title="language('LINGJIANHAO','零件号')" />
          </el-form-item>
          <el-form-item :label="language('ZHUANGTAI', '状态')">
            <iSelect v-model="form.detailStatus" :placeholder="language('QINGXUANZE', '请选择')">
              <el-option value="" :label="language('ALL', '全部') | capitalizeFilter"></el-option>
              <el-option v-for="item in statusOptions" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
            </iSelect>
          </el-form-item>
        </el-form>
      </iSearch>
      <i class="cut"></i>
      <iCard class="mainCard" :title="language('MINGXIXIANG', '明细项')">
        <template #header-control>
          <iButton v-permission.auto="FACTORYRELOCATE_EXPORT_ITEMS|工厂迁移-明细项导出" :loading="exportLoading" @click="handleExport">{{ language('MINGXIXIANGDAOCHU', '明细项导出') }}</iButton>
          <uploadButton v-permission.auto="FACTORYRELOCATE_REIMPORT|工厂迁移-重新导入" v-if="operableStatus" :id="id" uploadClass="uploadButton" :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError">
            <iButton :loading="uploadLoading">{{ language('CHONGXINDAORU', '重新导入') }}</iButton>
          </uploadButton>
          <iButton v-permission.auto="FACTORYRELOCATE_DELETE|工厂迁移-删除" v-if="operableStatus" :loading="deleteLoading" @click="handleDelete">{{ language('SHANCHU', '删除') }}</iButton>
          <buttonTableSetting class="setting" @click="edittableHeader"></buttonTableSetting>
        </template>
        <tableList
          permissionKey="PARTSPROCURE_CREATEPARTS_COMPONENTS_FACTORYRELOCATE_COMPONENTS_DETAIL"
          lang
          index
          indexFixed
          ref="tableList"
          :tableData="tableData"
          :tableTitle="tableTitle"
          :tableLoading="tablaLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #status="scope">
            <el-popover
              v-if="scope.row.status === '失败'"
              placement="top"
              trigger="hover">
              <div class="errorTips" slot="reference">
                <span>{{ scope.row.status }}</span><icon class="icon" symbol name="iconzhongyaoxinxitishi" />
              </div>
              <div>
                <p v-for="(msg, $index) in msgFormat(scope.row.detailMsg)" :key="$index">{{ msg }}</p>
              </div>
            </el-popover>
            <span v-else>{{ scope.row.status }}</span>
          </template>
          <template #oldFsnrGsnrNum="scope">
            <span class="link-underline" @click="jumpPartDetail(scope.row, 'old')">{{ scope.row.oldFsnrGsnrNum }}</span>
          </template>
          <template #fsnrGsnrNum="scope">
            <span class="link-underline" @click="jumpPartDetail(scope.row, 'new')">{{ scope.row.fsnrGsnrNum }}</span>
          </template>
          <template #rfqId="scope">
            <span class="link-underline" @click="jumpRfqDetail(scope.row)">{{ scope.row.rfqId }}</span>
          </template>
          <template #sopDate="scope">
            <span>{{ scope.row.sopDate | dateFilter("YYYY-MM-DD") }}</span>
          </template>
          <template #newAPrice="scope">
            <span>{{ scope.row.newAPrice | toThousands }}</span>
          </template>
          <template #packageCost="scope">
            <span>{{ scope.row.packageCost | toThousands }}</span>
          </template>
          <template #transportCost="scope">
            <span>{{ scope.row.transportCost | toThousands }}</span>
          </template>
          <template #operateCost="scope">
            <span>{{ scope.row.operateCost | toThousands }}</span>
          </template>
          <template #newBPrice="scope">
            <span>{{ scope.row.newBPrice | toThousands }}</span>
          </template>
        </tableList>
        <iPagination
          class="pagination margin-top30"
          @size-change="handleSizeChange($event, getFactoryBatchDetail)"
          @current-change="handleCurrentChange($event, getFactoryBatchDetail)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
          v-update />
      </iCard>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iSearch, iMultiLineInput, iInput, iSelect, icon, iPagination, iMessage } from 'rise'
import uploadButton from "../uploadButton"
import buttonTableSetting from '@/components/buttonTableSetting'
import tableList from '@/components/iTableSort'
import { tableSortMixins } from '@/components/iTableSort/tableSortMixins'
import { detailTableTitle as tableTitle } from '../data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import { toThousands } from '@/utils'
import { selectDictByRootKeys } from '@/api/dictionary'
import { getFactoryImportRecordsList, executeFactoryRelocation, exportFactoryBatchDetail, deleteFactoryBatchDetailList, getFactoryBatchDetail } from '@/api/partsprocure/editordetail'

export default {
  name: 'createPartsBatchDetail',
  components: { iPage, iCard, iButton, iSearch, iMultiLineInput, iInput, iSelect, icon, iPagination, uploadButton, buttonTableSetting, tableList },
  mixins:[ tableSortMixins, pageMixins, filters ],
  data() {
    return {
      id: '',
      operableStatus: false,
      executeLoading: false,
      statusOptions: [],
      form: {
        partNum: '',
        detailStatus: ''
      },
      uploadLoading: false,
      deleteLoading: false,
      tablaLoading: false,
      tableTitle,
      tableData: [],
      multipleSelection: []
    }
  },
  filters: {
    toThousands
  },
  created() {
    this.id = this.$route.query.id
    this.selectDictByRootKeys()
    this.getFactoryImportRecordsList()
    this.getFactoryBatchDetail()
  },
  methods: {
    selectDictByRootKeys() {
      selectDictByRootKeys([
        { keys: "BatchStatus" }
      ])
      .then(res => {
        if (res.code == 200) {
          Object.keys(res.data).forEach(key => {
            switch(key) {
              case "BatchStatus":
                this.statusOptions = Array.isArray(res.data["BatchStatus"]) ? 
                  res.data["BatchStatus"].map(item => ({
                    ...item,
                    key: item.code,
                    value: item.code,
                    zh: item.name,
                    en: item.nameEn,
                    de: item.nameDe
                  })) :
                  []
                break
              default:
            }
          })
        }
      })
    },

    getFactoryImportRecordsList() {
      getFactoryImportRecordsList({
        importLineNum: this.id
      })
      .then(res => {
        if (res.code == 200) {
          if (Array.isArray(res.data) && res.data[0]) {
            this.operableStatus = res.data[0].status === '已导入' || res.data[0].status === '执行失败'
          }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
    },

    getFactoryBatchDetail() {
      this.tablaLoading = true

      const form = {}
      Object.keys(this.form).forEach(key => this.form[key] && (form[key] = this.form[key]))

      getFactoryBatchDetail({
        importLineNum: this.id,
        ...form,
        current: this.page.currPage,
        size: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.tableData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.total
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.tableData = []
          this.page.totalCount = 0
        }
      })
      .finally(() => this.tablaLoading = false)
    },

    msgFormat(data) {
      try {
        const content = JSON.parse(data)
        return Array.isArray(content) ? content : []
      } catch {
        return []
      }
    },

    sure() {
      this.page.currPage = 1
      this.getFactoryBatchDetail()
    },

    reset() {
      Object.keys(this.form).forEach(key => {
        this.$set(this.form, key, '')
      })

      this.sure()
    },

    handleSelectionChange(list) {
      this.multipleSelection = list
    },

    // 执行
    handleExecute() {
      this.executeLoading = true

      executeFactoryRelocation({
        id: this.id
      })
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (res.code == 200) {
          iMessage.success(message)
        } else {
          iMessage.error(message)
        }
      })
      .finally(() => this.executeLoading = false)
    },

    // 明细项导出
    async handleExport() {
      this.exportLoading = true
      await exportFactoryBatchDetail({ id: this.id })
      this.exportLoading = false
    },

    /** 新建批次 **/
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadSuccess(res, file) {
      this.uploadLoading = false

      if (res.code == 200) {
        iMessage.success(`${ file.name } ${ this.language("SHANGCHUANCHENGGONG", "上传成功") }`)
        this.reset()
      } else {
        iMessage.error(`${ this.$i18n.locale === "zh" ? res.desZh : res.desEn }`)
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } ${ this.language("SHANGCHUANSHIBAI", "上传失败") }`)
    },
    /** 新建批次 **/

    // 删除批次
    async handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('QINZHISHAOXUANZEYITIAOSHUJU', '请至少选择一条数据'))

      const confirmInfo = await this.$confirm(this.language('SHIFOUQUERENSHANCHUSUOXUANJILU', '是否确认删除所选记录？'))
      if (confirmInfo !== 'confirm') return
    
      this.deleteLoading = true
      
      deleteFactoryBatchDetailList(this.multipleSelection.map(item => ({ ids: item.id })))
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (res.code == 200) {
          iMessage.success(message)
          this.getFactoryBatchDetail()
        } else {
          iMessage.error(message)
        }
      })
      .finally(() => this.deleteLoading = false)
    },

    // 跳转零件详情
    jumpPartDetail(row, type) {
      const routeData = this.$router.resolve({
        path: '/sourceinquirypoint/sourcing/partsprocure/editordetail',
        query: {
          projectId: type === 'new' ? row.partProjectId : row.oldPartProjectId,
          businessKey: row.partProjectType
        },
      })

      window.open(routeData.href, '_blank')
    },

    // 跳转RFQ详情
    jumpRfqDetail(row) {
      const routeData = this.$router.resolve({
        path: '/sourceinquirypoint/sourcing/partsrfq/editordetail',
        query: {
          id: row.rfqId,
          round: row.round,
          carTypeNames: row.carTypeProj,
          businessKey: row.partProjectType,
          rfqName: row.rfqName,
        },
      })

      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.createPartsBatchDetail {
  .executeBtn {
    display: flex;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .executeIcon {
      display: inline-block;
      margin-right: 8px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #1763f7;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
        border-left: 5px solid #fff;
        top: 50%;
        left: 50%;
        transform: translate(-1.5px, -50%);
      }
    }

    &:hover {
      .executeIcon {
        background: #DCDFE6;

        &::after {
          border-left-color: #1763f7;
        }
      }
    }
  }

  .search {
    box-shadow: none;

    ::v-deep .cardBody {
      padding: 0;

      .cursor {
        display: none;
      }
    }
  }

  .cut {
    display: block;
    margin: 25px 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .mainCard {
    box-shadow: none;

    ::v-deep .control {
      display: flex;
      align-items: center;

      .uploadButton {
        display: inline;
        margin: 0 10px;
      }
    }

    ::v-deep [class ^= card] {
      padding: 0;
    }

    ::v-deep .cardHeader {
      padding-bottom: 25px;
    }
  }

  .errorTips {
    color: #E30D0D;

    .icon {
      margin-left: 3px;
    }
  }
}
</style>