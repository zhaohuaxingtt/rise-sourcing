<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-09-23 15:32:13
 * @LastEditors: Hao,Jiang
 * @LastEditTime: 2021-09-26 16:11:18
 * @Description: 
-->
<template>
  <div class="aeko-assign">
    <!-- 搜索 -->
    <search @search="getFetchData" ref="search" />
    <!-- 表格 -->
    <iCard class="aeko-assign-table">
      <div class="editControl">
        <iButton
            class="floatright margin-bottom20"
            @click="assign"
          >
            {{ language('LK_FENPAI', '分派') }}
          </iButton>
      </div>
      <tablelist
        height="400"
        index
        :selection="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #isTop="scope">
        <div >
          <span class="icon"><icon v-if="scope.row.isTop" symbol class="icon" name="iconAEKO_TOP" /></span>
        </div>
      </template>
      <template #aekoNum="scope">
        <div style="text-align:left">
          <a class="link-underline" href="javascript:;">
            {{scope.row.aekoNum}}
          </a>
        </div>
      </template>
      <template #describe="">
        <a class="link-underline" href="javascript:;">
          {{language('CHAKAN', '查看')}}
        </a>
      </template>
      <template #assignsheet="">
        <a class="link-underline" href="javascript:;">
          {{language('CHAKAN', '查看')}}
        </a>
      </template>
      <template #chiefName="scope">
        <iSelect
          v-if="!scope.row.chiefName"
          v-model="scope.row.chiefNames"
          :placeholder="language('LK_QINGXUANZE','请选择')"
          multiple
          filterable
          clearable
        >
          <el-option
            :value="items.code"
            :label="items.value"
            v-for="(items, index) in buyerNames || []"
            :key="index"
          ></el-option>
        </iSelect>
        <span v-else>{{scope.row.chiefName}}</span>
      </template>
      </tablelist>
      <div class="pagination">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
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
import search from '../components/search'
import {tableTitle} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iCard, iSelect, iButton, iPagination, icon, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {user as configUser } from '@/config'
import {
  searchLinie,
} from '@/api/aeko/manage'

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iSelect,
    iButton,
    iPagination,
    icon,
    search,
    tablelist
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableSelecteData: [],
      tableLoading: false,
      // linies
      buyerNames: []
    }
  },
  mounted() {
    this.getFetchData()
    this.getLinies()
  },
  methods: {
    handleSelectionChange(val) {
      this.tableSelecteData = val
    },
    onSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    getFetchData() {
      console.log(this.$refs.search.form)
      this.tableListData = [
        {
          aekoNum: '12313',
          isTop: true,
          describe: '23444',
        }
      ]
    },
    getLinies() {
      // LINIE
      searchLinie({tagId: configUser.LINLIE}).then((res)=>{
        const {code,data} = res;
        if(code === '200' ) {
          this.buyerNames = data.map((item)=>{
            item.value = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
            item.code = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
            item.lowerCaseLabel =  typeof item.nameEn === "string" ? item.nameEn.toLowerCase() : item.nameEn
            return item
          });
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      })
    },
    assign() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.aeko-assign {
  .aeko-assign-table {
    .cardBody {
      padding: 10px;
    }
  }
}
.icon {
  svg {
    font-size: 28px;
  }
}
</style>
