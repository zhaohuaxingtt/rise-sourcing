<!--
 * @Author: your name
 * @Date: 2021-05-24 17:06:01
 * @LastEditTime: 2021-05-25 09:13:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\createparts\components\home\index.vue
-->
<template>
  <div class="home">
    <div class="control">
      <logButton class="margin-left20" @click="log" />
      <span class="margin-left20">
        <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
      </span>
    </div>
    <iSearch
      class="margin-top65"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSPROCURE_RESET"
      :searchKey="PARTSPROCURE_CONFIRM"
      :icon="true"
    >
      <el-form>
        <el-form-item :label="$t('createparts.Lingjianhao')">
          <iInput :placeholder="$t('createparts.Qingshuru')" v-model="form['search.partNum']" />
        </el-form-item>
        <el-form-item :label="$t('createparts.Lingjianmingzhong')">
          <iInput :placeholder="$t('createparts.Qingshuru')" v-model="form['search.partNameZh']" />
        </el-form-item>
        <el-form-item :label="$t('createparts.Lingjianmingde')">
          <iInput :placeholder="$t('createparts.Qingshuru')" v-model="form['search.partNameDe']" />
        </el-form-item>
        <el-form-item :label="$t('createparts.Lingjianmingde')">
          <iSelect :placeholder="$t('createparts.Qingxuanze')" v-model="form['search.partStatus']">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('createparts.Lingjianlaiyuan')">
          <iSelect :placeholder="$t('createparts.Qingxuanze')" v-model="form['search.partSource']">
            <el-option
              value=""
              :label="$t('all') | capitalizeFilter"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <template v-slot:header-control>
        <iButton>{{ $t("createparts.Chuangjiancaigouxiangmu") }}</iButton>
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
        >
          <template #date="scope">
            <span>{{ scope.row.date | dateFilter("YYYY-MM-DD") }}</span>
          </template>
          <template #log="scope">
            <span class="link" @click="log(scope.row)">{{ $t("createparts.Chakan") }}</span>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>

<script>
import { icon, iSearch, iInput, iSelect, iCard, iButton, iPagination } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import tableList from "@/views/partsign/editordetail/components/tableList";
import { tableTitle } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { 
    icon, 
    iSearch, 
    iInput, 
    iSelect, 
    iCard, 
    iButton,
    iPagination,
    logButton,
    tableList
  },
  mixins: [ filters, pageMixins ],
  data() {
    return {
      form: {
        search: {}
      },
      loading: false,
      tableTitle,
      tableListData: []
    }
  },
  methods: {
    sure() {},
    reset() {},
    getList() {
      this.loading = true

      const getList = function() {}
      getList({
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    // 查看操作日志
    log(row) {

    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .control {
    position: absolute;
    top: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>