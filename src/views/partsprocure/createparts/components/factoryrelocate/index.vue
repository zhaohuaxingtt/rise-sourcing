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
          <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
        <el-form-item :label="language('QIANYIQIANGONGCHANG', '迁移前工厂')">
          <iSelect v-model="form.partNum" :placeholder="language('QINGXUANZE', '请选择')"></iSelect>
        </el-form-item>
        <el-form-item :label="language('QIANYIHOUGONGCHANG', '迁移后工厂')">
          <iSelect v-model="form.partNum" :placeholder="language('QINGXUANZE', '请选择')"></iSelect>
        </el-form-item>
        <el-form-item :label="language('CSFCSSCAIGOUYUAN', 'CSF/CSS采购员')">
          <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
        <el-form-item :label="language('LINIECAIGOUYUAN', 'LINIE采购员')">
          <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
        <el-form-item :label="language('PICIZHUANGTAI', '批次状态')">
          <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="mainCard margin-top40" :title="language('DAORUJILU', '导入记录')">
      <template #header-control>
        <iButton v-permission.auto="FACTORYRELOCATE_DELETE|工厂迁移-删除批次" @click="handleDelete">{{ language('SHANCHUPICI','删除批次') }}</iButton>
        <iButton v-permission.auto="FACTORYRELOCATE_EXECUTE|工厂迁移-执行" @click="handleExecute">{{ language('ZHIXING','执行') }}</iButton>
        <iButton v-permission.auto="FACTORYRELOCATE_UPLOAD|工厂迁移-新建批次">{{ language('XINJIANPICI','新建批次') }}</iButton>
        <iButton v-permission.auto="FACTORYRELOCATE_DOWNLOAD|工厂迁移-下载模板">{{ language('DUNLOADTEMPATE','下载模板') }}</iButton>
        <buttonTableSetting class="setting" @click="edittableHeader"></buttonTableSetting>
      </template>
      <tablelist
        permissionKey="PARTSPROCURE_CREATEPARTS_COMPONENTS_FACTORYRELOCATE"
        v-permission.auto="FACTORYRELOCATE_TABLE|工厂迁移-表格"
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
        <template #c="scope">
          <el-popover
            v-if="scope.row.c === '已导入'"
            placement="top"
            trigger="hover">
            <div class="errorTips" slot="reference">
              <span>{{ scope.row.c }}</span><icon class="icon" symbol name="iconzhongyaoxinxitishi" />
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
import { tableTitle } from './components/data'
import { pageMixins } from '@/utils/pageMixins'
import {factoryTranslate} from '@/api/partsprocure/editordetail'
import { navList } from '../data'
import tablelist from '@/components/iTableSort'
import { tableSortMixins } from '@/components/iTableSort/tableSortMixins'
import buttonTableSetting from '@/components/buttonTableSetting'

export default {
  components:{
    iPage,
    iNavMvp,
    icon,
    iSearch,
    iMultiLineInput,
    iInput,
    iSelect,
    iCard,
    iButton,
    iPagination,
    tablelist,
    buttonTableSetting,
    logButton
  },
  mixins:[ pageMixins, tableSortMixins ],
  data() {
    return {
      form: {

      },
      navList: _.cloneDeep(navList),
      tableData: [],
      tableTitle,
      tablaLoading: false,
      multipleSelection: []
    }
  },
  created() {
    this.factoryTranslate()
  },
  methods:{
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
      if (this.multipleSelection[0].c === '已执行') return iMessage.warn(this.language('DANGQIANPICIYIZHIXINGTIPS', '当前批次已执行，仅已导入状态可操作'))
    },
    // 执行
    handleExecute() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('QINZHISHAOXUANZEYITIAOSHUJU', '请至少选择一条数据'))
      if (this.multipleSelection[0].c === '已执行') return iMessage.warn(this.language('DANGQIANPICIYIZHIXINGTIPS', '当前批次已执行，仅已导入状态可操作'))
      if (true) return iMessage.warn(this.language('PICIZHONGCUNZAISHIBAIDEMINGXIXIANGTIPS', '批次中存在失败的明细项，请删除失败记录后再进行执行'))
    },
    // 跳转项次详情
    jumpDetail(row) {
      const router =  this.$router.resolve({
        name: 'createPartsBatchDetail',
        query: {}
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