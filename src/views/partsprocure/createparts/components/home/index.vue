<!--
 * @Author: your name
 * @Date: 2021-05-24 17:06:01
 * @LastEditTime: 2021-12-01 11:10:09
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsprocure\createparts\components\home\index.vue
-->
<template>
  <iPage class="home">
    <div class="header">
      <iNavMvp :lev="1" :list="navList" :lang="true" routerPage class="nav" />
      <div class="control">
        <logButton class="margin-left20" @click="log" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iSearch
      class="margin-top40"
      @sure="sure"
      @reset="reset"
      :resetKey="PARTSPROCURE_RESET"
      :searchKey="PARTSPROCURE_CONFIRM"
      :icon="true"
    >
      <el-form>
        <el-form-item
          :label="language('LINGJIANHAO', '零件号')"
          v-permission.auto="
            CREATEPARTSHOME_PARTNUM | (手工采购项目创建 - 零件号)
          "
        >
          <iMultiLineInput
            :placeholder="language('请输入零件号,多个逗号分隔')"
            :title="language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')"
            v-model="form.partNum"
          />
          <!-- <iInput
            :placeholder="language('QINGSHURULINGJIANHAO', '请输入零件号')"
            v-model="form.partNum"
          /> -->
        </el-form-item>
        <el-form-item
          :label="language('LINGJIANMINGZHONG', '零件名(中)')"
          v-permission.auto="
            CREATEPARTSHOME_PARTNAMEZH | (手工采购项目创建 - 零件名中)
          "
        >
          <iInput
            :placeholder="
              language('QINGSHURULINGJIANMINGZHONG', '请输入零件名(中)')
            "
            v-model="form.partNameZh"
          />
        </el-form-item>
        <el-form-item
          :label="language('LINGJIANMINGDE', '零件名(德)')"
          v-permission.auto="
            CREATEPARTSHOME_PARTNAMEDE | (手工采购项目创建 - 零件名德)
          "
        >
          <iInput
            :placeholder="
              language('QINGSHURULINGJIANMINGDE', '请输入零件名(德)')
            "
            v-model="form.partNameDe"
          />
        </el-form-item>
        <el-form-item
          :label="language('LINGJIANZHUANGTAI', '零件状态')"
          v-permission.auto="
            CREATEPARTSHOME_PARTSTATUS | (手工采购项目创建 - 零件状态)
          "
        >
          <iSelect
            :placeholder="
              language('QINGXUANZELINGJIANZHUANGTAI', '请选择零件状态')
            "
            v-model="form.partStatus"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="item in dictMap.PART_STATE"
              :key="item.code"
              :value="item.value"
              :label="item[$i18n.locale]"
            />
          </iSelect>
        </el-form-item>
        <el-form-item
          :label="language('LINGJIANLAIYUAN', '零件来源')"
          v-permission.auto="
            CREATEPARTSHOME_PARTSOURCE | (手工采购项目创建 - 零件来源)
          "
        >
          <iSelect
            :placeholder="
              language('QINGXUANZELINGJIANLAIYUAN', '请选择零件来源')
            "
            v-model="form.source"
          >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              v-for="item in dictMap.SOURCE_OF_PART"
              :key="item.code"
              :value="item.value"
              :label="item[$i18n.locale]"
            />
          </iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <template v-slot:header-control>
        <iButton
          v-permission.auto="
            CREATEPARTSHOME_CREATEBTN | (手工采购项目创建 - 创建采购项目按钮)
          "
          :loading="createPartsLoading"
          @click="createParts"
          >{{ language("CHUANGJIANCAIGOUXIANGMU", "创建采购项目") }}</iButton
        >
      </template>
      <div
        class="body"
        v-permission.auto="CREATEPARTSHOME_TABLE | (手工采购项目创建 - 表格)"
      >
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :lang="true"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #activeTime="scope">
            <span>{{ scope.row.activeTime }}</span>
            <!-- | dateFilter("YYYY-MM-DD") -->
          </template>
          <template #log="scope">
            <span class="link" @click="log(scope.row)">{{
              language("CHAKAN", "查看")
            }}</span>
          </template>
        </tableList>
        <iPagination
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getParts)"
          @current-change="handleCurrentChange($event, getParts)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>
    </iCard>
  </iPage>
</template>

<script>
import Vuex from "vuex";
import {
  icon,
  iSearch,
  iInput,
  iSelect,
  iCard,
  iButton,
  iPagination,
  iMessage,
  iNavMvp,
  iPage,
  iMultiLineInput,
} from "rise";
import logButton from "@/components/logButton";
import tableList from "@/views/partsign/editordetail/components/tableList";
import { tableTitle, queryForm } from "./components/data";
import filters from "@/utils/filters";
import { pageMixins } from "@/utils/pageMixins";
import { getParts, createParts } from "@/api/partsprocure/editordetail";
import { selectDictByKeys } from "@/api/dictionary";
import { cloneDeep } from "lodash";
import { serialize } from "@/utils";
import { BKMROLETAGID } from "@/config";
import { navList, noOnlineText } from "../data";

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
    tableList,
    iNavMvp,
    iPage,
    iMultiLineInput,
  },
  mixins: [filters, pageMixins],
  data() {
    return {
      dictMap: {
        PART_STATE: [],
        SOURCE_OF_PART: [],
      },
      form: cloneDeep(queryForm),
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      createPartsLoading: false,
      navList: _.cloneDeep(navList),
    };
  },
  created() {
    this.getDict();
    this.getParts();
    this.$set(
      this.navList[this.navList.length - 1],
      "slot",
      noOnlineText(this.$i18n.locale)
    );
  },
  watch: {
    ["$i18n.locale"](lang) {
      this.$set(
        this.navList[this.navList.length - 1],
        "slot",
        noOnlineText(lang)
      );
    },
  },
  computed: {
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
    // 是否只是BKM角色
    isBKM() {
      // 扩产能的角色值，由CF提供
      const BKMID = BKMROLETAGID;
      // 获取用户角色列表
      let roleList = (this.userInfo && this.userInfo.positionList) || [];
      roleList = roleList.map((o) => o.roleDTOList || []);
      roleList = Array.from(new Set(roleList.flat(Infinity)));
      // 该用户只是BKM人员
      const isBKM =
        roleList.find((o) => o.code === BKMID) && roleList.length === 1;
      return isBKM;
    },
  },
  methods: {
    getDict() {
      selectDictByKeys([{ keys: "PART_STATE" }, { keys: "SOURCE_OF_PART" }])
        .then((res) => {
          if (res.code == 200) {
            this.dictMap = {};
            Object.keys(res.data).forEach((key) => {
              this.$set(
                this.dictMap,
                key,
                res.data[key].map((item) => ({
                  ...item,
                  key: item.code,
                  value: item.code,
                  zh: item.name,
                  en: item.nameEn,
                  de: item.nameDe,
                }))
              );
            });
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch(() => {});
    },
    sure() {
      this.page.currPage = 1;
      this.getParts();
    },
    reset() {
      this.page.currPage = 1;
      this.form = cloneDeep(queryForm);
      this.getParts();
    },
    getParts() {
      this.loading = true;

      const form = {
        current: this.page.currPage,
        size: this.page.pageSize,
      };

      Object.keys(this.form).forEach((key) => {
        if (this.form[key] || this.form[key] === 0) {
          form[key] = this.form[key];
        }
      });

      getParts(form)
        .then((res) => {
          if (res.code == 200) {
            this.tableListData = Array.isArray(res.data) ? res.data : [];
            this.page.totalCount = res.total || 0;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    handleSelectionChange(list) {
      this.multipleSelection = list;
    },
    // 创建采购项⽬
    createParts() {
      if (this.multipleSelection.length < 1)
        return iMessage.warn(
          this.language("QINGXUANZEZHISHAOYITIAOSHUJU", "请选择至少一条数据")
        );
      this.createPartsLoading = true;

      createParts(this.multipleSelection.map((item) => item.partNum))
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            if (res.data.length == 1) {
              this.$router.push({
                path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
                query: {
                  businessKey: res.data[0].partProjectType,
                  projectId: res.data[0].id,
                },
              });
            } else {
              this.$router.push({
                path: `/sourceinquirypoint/sourcing/partsprocure/batchmiantain?${serialize(
                  res.data.map((item) => ({ ids: item.id })),
                  Array
                )}&businessKey=${res.data[0].partProjectType}`,
              });
            }
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.createPartsLoading = false;
        })
        .catch(() => (this.createPartsLoading = false));
    },
    // 查看操作日志
    log(row) {},
  },
};
</script>

<style lang="scss" scoped>
.home {
  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .control {
    // position: absolute;
    // top: 30px;
    // right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }
}
</style>