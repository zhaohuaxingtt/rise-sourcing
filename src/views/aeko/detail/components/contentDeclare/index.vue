<!--
 * @Author: your name
 * @Date: 2021-07-26 16:46:44
 * @LastEditTime: 2021-07-26 19:06:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\aekomanage\detail\components\contentDeclare\index.vue
-->
<template>
  <div>
    <iSearch
      class="margin-top25"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSIGN_RESETBUTTON"
      :searchKey="PARTSIGN_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
          />
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGBIANHAO', '供应商编号')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURUGONGYINGSHANGBIANHAO', '请输入供应商编号')"
          />
        </el-form-item>
        <el-form-item :label="language('CHEXINGXIANGMU', '车型项目')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('NEIRONGZHUANGTAI', '内容状态')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZENEIRONGZHUANGTAI', '请选择内容状态')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('MTZXIANGGUAN', 'MTZ相关')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZEMTZXIANGGUAN', '请选择MTZ相关')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('CAIGOUGONGCHANG', '采购工厂')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZECAIGOUGONGCHANG', '请选择采购工厂')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('GONGYINGSHANGJIANCHENG', '供应商简称')">
          <iInput
            v-model="form.rfqId"
            :placeholder="language('QINGSHURUGONGYINGSHANGJIANCHENG', '请输入供应商简称')"
          />
        </el-form-item>
        <el-form-item :label="language('ZHIDINGTOUZICHEXINGXIANGMU', '指定投资⻋型项⽬')">
          <iSelect
            v-model="form.carTypeProject"
            :placeholder="language('QINGXUANZEZHIDINGTOUZICHEXINGXIANGMU', '请选择指定投资⻋型项⽬')"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="item in carTypeProjectOptions"
              :key="item.key"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20" :title="language('NEIRONGBIAOTAI', '内容表态')">
      <template v-slot:header-control>
        <iButton>{{ language("WUGUANXIANGGUANQIEHUAN", "⽆关相关切换") }}</iButton>
        <iButton>{{ language("BIAOTAICHONGZHI", "表态重置") }}</iButton>
        <iButton>{{ language("FAFANGGONGYINGSHANGBAOJIA", "发放供应商报价") }}</iButton>
        <iButton>{{ language("ZHIDINGTOUZICHEXINGXIANGMU", "指定投资⻋型项⽬") }}</iButton>
        <iButton>{{ language("DAOCHU", "导出") }}</iButton>
        <iButton>{{ language("DAORU", "导⼊") }}</iButton>
        <iButton>{{ language("TIJIAO", "提交") }}</iButton>
        <iButton>{{ language("CHEHUI", "撤回") }}</iButton>
      </template>
      <div class="body">
      <tableList
        class="table"
        index
        :lang="true"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #l="scope">
          <span class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
        </template>
        <template #m="scope">
          <span class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
        </template>
        <template #n="scope">
          <span class="link-underline" @click="view(scope.row)">{{ language("CHAKAN", "查看") }}</span>
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
import { iSearch, iInput, iSelect, iCard, iButton, iPagination } from "rise"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { contentDeclareTableTitle as tableTitle } from "../data"
import { pageMixins } from "@/utils/pageMixins"

export default {
  components: { iSearch, iInput, iSelect, iCard, iButton, tableList, iPagination },
  mixins: [ pageMixins ],
  data() {
    return {
      form: {},
      carTypeProjectOptions: [],
      tableTitle,
      tableListData: []
    };
  },
  methods: {
    sure() {},
    reset() {},
    view() {}
  },
};
</script>

<style lang="scss" scoped>
</style>