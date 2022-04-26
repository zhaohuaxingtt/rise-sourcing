<!--
 * @Author: YUSZHOU
 * @Date: 2021-05-24 17:17:01
 * @LastEditTime: 2022-03-23 15:52:55
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsprocure\createparts\components\factoryrelocate\index.vue
-->
<template>
  <iPage class="factoryrelocate">
    <div class="header">
      <iNavMvp :lev="1" :list="navList" :lang="true" routerPage class="nav" />
      <div class="control">
        <logButton class="margin-left20" @click="log" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iSearch class="margin-top40" @sure="sure" @reset="reset">
      <el-form>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iMultiLineInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" :title="language('LINGJIANHAO','零件号')" />
        </el-form-item>
        <el-form-item :label="language('DAORUXIANGCIHAO', '导入项次号')">
          <iInput v-model="form.importLineNum" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
        <el-form-item :label="language('QIANYIQIANGONGCHANG', '迁移前工厂')">
          <iSelect v-model="form.beforeMigrateFactory" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option value="" :label="language('ALL', '全部') | capitalizeFilter"></el-option>
            <el-option v-for="item in factoryOptions" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('QIANYIHOUGONGCHANG', '迁移后工厂')">
          <iSelect v-model="form.afterMigrateFactory" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option value="" :label="language('ALL', '全部') | capitalizeFilter"></el-option>
            <el-option v-for="item in factoryOptions" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('CSFCSSCAIGOUYUAN', 'CSF/CSS采购员')">
          <iInput v-model="form.csfName" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
        <el-form-item :label="language('LINIECAIGOUYUAN', 'LINIE采购员')">
          <iInput v-model="form.linieName" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
        <el-form-item :label="language('PICIZHUANGTAI', '批次状态')">
          <iSelect v-model="form.batchStatus" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option value="" :label="language('ALL', '全部') | capitalizeFilter"></el-option>
            <el-option v-for="item in batchStatusOptions" :key="item.code" :value="item.value" :label="item[$i18n.locale]" />
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="mainCard margin-top40" :title="language('DAORUJILU', '导入记录')">
      <template #header-control>
        <iButton v-permission.auto="FACTORYRELOCATE_DELETE|工厂迁移-删除批次" @click="handleDelete">{{ language('SHANCHUPICI','删除批次') }}</iButton>
        <iButton v-permission.auto="FACTORYRELOCATE_EXECUTE|工厂迁移-执行" :loading="deleteLoading" @click="handleExecute">{{ language('ZHIXING','执行') }}</iButton>
        <uploadButton v-permission.auto="FACTORYRELOCATE_UPLOAD|工厂迁移-新建批次" uploadClass="uploadButton" :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError">
          <iButton :loading="uploadLoading">{{ language("XINJIANPICI", "新建批次") }}</iButton>
        </uploadButton>
        <iButton v-permission.auto="FACTORYRELOCATE_DOWNLOAD|工厂迁移-下载模板" :loading="downloadLoading" @click="handleDownload">{{ language('DUNLOADTEMPATE','下载模板') }}</iButton>
        <buttonTableSetting class="setting" @click="edittableHeader"></buttonTableSetting>
      </template>
      <tablelist
        permissionKey="PARTSPROCURE_CREATEPARTS_COMPONENTS_FACTORYRELOCATE"
        v-permission.auto="FACTORYRELOCATE_TABLE|工厂迁移-表格"
        permissionKey="PARTSPROCURE_CREATEPARTS_COMPONENTS_FACTORYRELOCATE"
        lang
        index
        ref="tableList"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tablaLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #a="scope">
          <span class="link-underline" @click="jumpDetail(scope.row)">{{ scope.row.a }}</span>
        </template>
        <template #status="scope">
          <el-popover
            v-if="scope.row.status === '已导入'"
            placement="top"
            trigger="hover">
            <div class="errorTips" slot="reference">
              <span>{{ scope.row.status }}</span><icon class="icon" symbol name="iconzhongyaoxinxitishi" />
            </div>
            <div>
              <p>{{ language('QUANBUMINGXIXIANG', '全部明细项') }}：100</p>
              <p>{{ language('CHENGGONG', '成功') }}：99</p>
              <p>{{ language('SHIBAI', '失败') }}：1</p>
            </div>
          </el-popover>
          <span v-else>{{ scope.row.c }}</span>
        </template>
      </tablelist>
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, factoryTranslate)"
        @current-change="handleCurrentChange($event, factoryTranslate)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
	      v-update
      />
    </iCard> 
  </iPage>
</template>

<script>
import { iPage, iNavMvp, icon, iSearch, iMultiLineInput, iInput, iSelect, iCard, iButton, iPagination, iMessage } from 'rise'
import logButton from '@/components/logButton'
import uploadButton from "./components/uploadButton"
import { tableTitle } from './components/data'
import filters from '@/utils/filters'
import { pageMixins } from '@/utils/pageMixins'
import {factoryTranslate} from '@/api/partsprocure/editordetail'
import { navList } from '../data'
import tablelist from '@/components/iTableSort'
import { tableSortMixins } from '@/components/iTableSort/tableSortMixins'
import buttonTableSetting from '@/components/buttonTableSetting'
import { selectDictByKeys } from '@/api/dictionary'
import { downloadFactoryMoveTemplate, deleteFactoryImportRecordsList, getFactoryImportRecordsList } from '@/api/partsprocure/editordetail'

export default {
  components:{ iPage, iNavMvp, icon, iSearch, iMultiLineInput, iInput, iSelect, iCard, iButton, iPagination, tablelist, buttonTableSetting, logButton, uploadButton },
  mixins:[ filters, pageMixins, tableSortMixins ],
  data() {
    return {
      factoryOptions: [],
      batchStatusOptions: [],
      deleteLoading: false,
      uploadLoading: false,
      downloadLoading: false,
      fileList: [],
      timer: 0,
      form: {
        partNum: '',
        importLineNum: '',
        beforeMigrateFactory: '',
        afterMigrateFactory: '',
        csfName: '',
        linieName: '',
        batchStatus: ''
      },
      navList: _.cloneDeep(navList),
      tableData: [],
      tableTitle,
      tablaLoading: false,
      multipleSelection: [],
    }
  },
  created() {
    // this.factoryTranslate()
    this.selectDictByKeys()
    this.getFactoryImportRecordsList()
  },
  methods: {
    selectDictByKeys() {
      selectDictByKeys([
        { keys: "PROCURE_FACTORY" },
        { keys: "FactoryMigrationStatus" }
      ])
      .then(res => {
        if (res.code == 200) {
          Object.keys(res.data).forEach(key => {
            switch(key) {
              case "PROCURE_FACTORY":
                this.factoryOptions = Array.isArray(res.data["PROCURE_FACTORY"]) ? 
                  res.data["PROCURE_FACTORY"].map(item => ({
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
      this.tablaLoading = true

      const form = {}
      Object.keys(this.form).forEach(key => this.form[key] && (form[key] = this.form[key]))

      getFactoryImportRecordsList({
        ...form,
        current: this.page.currPage,
        size: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.tableData = Array.isArray(res.data) ? res.data : []
          this.page.totalCount = res.data.total
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.tablaLoading = false)
    },
    sure() {
      this.page.currPage = 1
      this.getFactoryImportRecordsList()
    },
    reset() {
      Object.keys(this.form).forEach(key => {
        this.$set(this.form, key, '')
      })

      this.sure()
    },
    factoryTranslate() {
      this.tableData = [
        { a: 'XXXXXXXXXXXXX', c: '已导入' },
        { c: '已执行' }
      ]
      // this.tablaLoading = true
      // factoryTranslate().then(res=>{
      //   this.tablaLoading = false
      //   this.tableData = res.list
      // }).catch(err=>{
      //   this.tablaLoading = false
      //   //iMessage.error()
      // })
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 删除批次
    handleDelete() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('QINZHISHAOXUANZEYITIAOSHUJU', '请至少选择一条数据'))
      if (this.multipleSelection.length > 1) return iMessage.warn(this.language('JINKECAOZUODANTIAOSHUJU', '仅可操作单条数据'))
      if (this.multipleSelection[0].status === '已执行') return iMessage.warn(this.language('DANGQIANPICIYIZHIXINGTIPS', '当前批次已执行，仅已导入状态可操作'))
    
      this.deleteLoading = true
      deleteFactoryImportRecordsList({
        id: this.multipleSelection[0].id
      })
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (res.code == 200) {
          iMessage.success(message)
        } else {
          iMessage.error(message)
        }
      })
      .finally(() => this.deleteLoading = false)
    },
    // 执行
    handleExecute() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('QINZHISHAOXUANZEYITIAOSHUJU', '请至少选择一条数据'))
      if (this.multipleSelection[0].c === '已执行') return iMessage.warn(this.language('DANGQIANPICIYIZHIXINGTIPS', '当前批次已执行，仅已导入状态可操作'))
      if (true) return iMessage.warn(this.language('PICIZHONGCUNZAISHIBAIDEMINGXIXIANGTIPS', '批次中存在失败的明细项，请删除失败记录后再进行执行'))
    },
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadSuccess(res, file) {
      if (res.code != 200) {
        iMessage.error(`${ this.$i18n.locale === "zh" ? res.desZh : res.desEn }`)
      } else {
        this.fileList = []
        clearTimeout(this.timer)
        iMessage.success(`${ file.name } ${ this.language("SHANGCHUANCHENGGONG", "上传成功") }`)
        this.fileList.push({ id: res.data[0].id, fileName: res.data[0].name, filePath: res.data[0].path, size: file.size })
        this.timer = setTimeout(() => {
          this.uploadFiles()
          clearTimeout(this.timer)
        }, 700)
      }
    },
    // 下载模板
    async handleDownload() {
      this.downloadLoading = true
      await downloadFactoryMoveTemplate()
      this.downloadLoading = false
    },
    // 跳转项次详情
    jumpDetail(row) {
      const router =  this.$router.resolve({
        name: 'createPartsBatchDetail',
        query: {
          id: row.id
        }
      })

      window.open(router.href,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.factoryrelocate {
  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .control {
    display: flex;
    align-items: center;
    height: 30px;
  }

  .mainCard {
    ::v-deep .control {
      display: flex;
      align-items: center;

      .uploadButton {
        display: inline;
        margin: 0 10px;
      }
    }
    
    .setting {
      margin-left: 10px;
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