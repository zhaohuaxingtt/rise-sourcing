<!--
 * @Author: your name
 * @Date: 2021-06-24 10:38:09
 * @LastEditTime: 2021-06-24 11:28:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\supplierscore\components\partscore\index.vue
-->
<template>
  <iPage class="partscore">
    <div class="header clearFloat">
      <div class="title">{{ $t("零件评分") }}</div>
      <div class="control">
        <div v-if="editStatus">
          <iButton @click="editStatus = false">{{ $t("结束编辑") }}</iButton>
          <iButton :loading="saveLoading" @click="handleSave">{{ $t("保存") }}</iButton>
        </div>
        <div v-else>
          <iButton @click="editStatus = true">{{ $t("进入编辑") }}</iButton>
        </div>
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iCard class="margin-top30">
      <div class="body">
        <el-table
          height="calc(100% - 50px)"
          v-loading="loading"
          :data="tableListData"
          :empty-text="$t('LK_ZANWUSHUJU')">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column type="index" align="center" label="#"></el-table-column>
          <el-table-column align="center" :label="$t('零件号')" prop="partNum" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" :label="$t('FS号')" prop="fsNum" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" :label="$t('采购工厂')" prop="purchasingFactory" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" :label="$t('零件名称(中)')" prop="partNameZh" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" :label="$t('零件名称(德)')" prop="partNameDe" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" :label="$t('车型项目')" prop="carProjectType" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column align="center" :label="$t('相关车型')" prop="relatedModels" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
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
  </iPage>
</template>

<script>
import { iPage, iButton, icon, iCard, iPagination, iMessage } from "rise"
import { pageMixins } from "@/utils/pageMixins"
import logButton from "@/components/logButton"

export default {
  components: {
    iPage,
    iButton,
    icon,
    iCard,
    iPagination,
    logButton
  },
  mixins: [ pageMixins ],
  data() {
    return {
      editStatus: false,
      saveLoading: false,
      loading: false,
      tableListData: []
    }
  },
  methods: {
    // 保存
    handleSave() {
      const save = function () {}

      this.saveLoading = true
      save()
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.editStatus = false
        } else {
          iMessage.error(message)
        }
      })
      .catch(() => this.saveLoading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.partscore {
  .header {
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }

  .body {
    height: calc(100vh - 240px);
  }
}
</style>