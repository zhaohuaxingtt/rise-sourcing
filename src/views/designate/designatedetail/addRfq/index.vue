<!--
 * @Author: Luoshuang
 * @Date: 2021-05-24 11:27:22
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-05-24 15:53:52
 * @Description: 
 * @FilePath: \front-web\src\views\designate\designatedetail\addRfq\index.vue
-->

<template>
  <iPage>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20" icon @reset="handleSearchReset" @sure="getTableList">
      <el-form>
        <el-form-item :label="$t('LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN')" style="width: 340px">
          <iInput :placeholder="$t('LK_QINGXUANZE')" v-model="form.searchConditions"></iInput>
        </el-form-item>
        <el-form-item :label="$t('LK_CHEXINGXIANGMU')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.carType">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="items in carTypeOptions" :key='items.code' :value='items.code' :label="items.name"/>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_LINGJIANXIANGMULEIXING')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.partType">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="items in partTypeOptions" :key='items.code' :value='items.code'
                        :label="items.name"/>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_RFQZHUANGTAI')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.rfqStatus">
            <el-option value="" :label="$t('all') | capitalizeFilter"></el-option>
            <el-option v-for="items in rfqStatusOptions" :key='items.code' :value='items.code'
                        :label="items.name"/>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <div class="margin-bottom20 clearFloat">
          <div class="floatright">
            <!--------------------返回按钮----------------------------------->
            <iButton @click="goBack">返回</iButton>
            <!--------------------选择按钮----------------------------------->
            <iButton @click="handleSelect">选择</iButton>
          </div>
      </div>
        <!------------------------------------------------------------------------>
        <!--                  表格模块                                          --->
        <!------------------------------------------------------------------------>
        <tableList :activeItems='"rfqId"' selection indexKey :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @updateSlot='toTop'></tableList>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
        <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSearch, iSelect, iInput } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import { rfqListTitle } from '../rfqdetail/data'
export default {
  mixins: [pageMixins],
  components: { iPage, iCard, iPagination, iButton, tableList, iSearch, iSelect, iInput },
  data() {
    return {
      tableListData: [],
      tableTitle: rfqListTitle,
      tableLoading: false,
      carTypeOptions: [],
      rfqStatusOptions: [],
      partTypeOptions: [],
      form: {}
    }
  },
  methods: {
    getTableList() {},
    handleSelectionChange() {},
    openPage() {},
    toTop() {},
    handleSelect() {},
    goBack() {
      this.$router.push({path:'/designate/rfqdetail'})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>