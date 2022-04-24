<template>
  <iPage class="createPartsBatchDetail">
    <iCard :title="`${ language('PICI', '批次') }：${ 'XXXXXXXXXX' }`">
      <template #header-control>
        <iButton class="executeBtn"><span><i class="executeIcon"></i>{{ language('ZHIXING', '执行') }}</span></iButton>
      </template>
      <iSearch class="search" @sure="sure" @reset="reset">
        <el-form>
          <el-form-item :label="language('LINGJIANHAO', '零件号')">
            <iMultiLineInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" :title="language('LINGJIANHAO','零件号')" />
          </el-form-item>
          <el-form-item :label="language('DAORUXIANGCIHAO', '导入项次号')">
            <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
          </el-form-item>
          <el-form-item :label="language('FSHAO', 'FS号')">
            <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
          </el-form-item>
          <el-form-item :label="language('RFQBIANHAO', 'RFQ编号')">
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
          <el-form-item :label="language('ZHUANGTAI', '状态')">
            <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
          </el-form-item>
          <el-form-item :label="language('YUANFSHAO', '原FS号')">
            <iInput v-model="form.partNum" :placeholder="language('QINGSHURU', '请输入')" />
          </el-form-item>
        </el-form>
      </iSearch>
      <i class="cut"></i>
      <iCard class="mainCard" :title="language('MINGXIXIANG', '明细项')">
        <template #header-control>
          <iButton>{{ language('MINGXIXIANGDAOCHU', '明细项导出') }}</iButton>
          <iButton>{{ language('CHONGXINDAORU', '重新导入') }}</iButton>
          <iButton>{{ language('SHANCHU', '删除') }}</iButton>
          <buttonTableSetting class="setting" @click="edittableHeader"></buttonTableSetting>
        </template>
        <tablelist
          lang
          index
          indexFixed
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
          v-update />
      </iCard>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iSearch, iMultiLineInput, iInput, iSelect, iPagination } from 'rise'
import buttonTableSetting from '@/components/buttonTableSetting'
import tablelist from '@/components/iTableSort'
import { tableSortMixins } from '@/components/iTableSort/tableSortMixins'
import { detailTableTitle as tableTitle } from '../data'
import { pageMixins } from '@/utils/pageMixins'

export default {
  name: 'createPartsBatchDetail',
  components: { iPage, iCard, iButton, iSearch, iMultiLineInput, iInput, iSelect, iPagination, buttonTableSetting, tablelist },
  mixins:[ pageMixins, tableSortMixins ],
  data() {
    return {
      form: {},
      tablaLoading: false,
      tableTitle,
      tableData: [],
    }
  }
}
</script>

<style lang="scss" scoped>
.createPartsBatchDetail {
  .executeBtn {
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
    }

    ::v-deep [class ^= card] {
      padding: 0;
    }

    ::v-deep .cardHeader {
      padding-bottom: 25px;
    }
  }
}
</style>