<!--
 * @Author: youyuan
 * @Date: 2021-11-06 17:50:24
 * @LastEditTime: 2022-12-07 15:16:10
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\views\designate\home\signSheet\components\chipDetails\index.vue
-->
<template>
  <div>
    <iCard class="margin-top20">
      <el-form :inline="true" :model="infoForm" label-position="left">
        <el-form-item style="width: 300px; margin-right: 68px" :label="language('QIANZIDANHAO', '签字单号')">
          <iInput v-model="infoForm.signCode" :disabled="true" />
        </el-form-item>
        <el-form-item style="width: 300px; margin-right: 68px" :label="language('ZHUANGTAI', '状态')">
          <iInput v-model="infoForm.statusDesc" :disabled="true" />
        </el-form-item>
        <el-form-item style="width: 500px; margin-right: 68px" :label="language('CAOGAO', '草稿')">
          <iInput style="width: 300px" v-model="infoForm.description"
            :placeholder="language('QINGSHURUMIAOSHU', '请输入描述')" @input="handleInputByDescription" />
        </el-form-item>
      </el-form>
    </iCard>
    <iCard class="margin-top20">
      <div slot="header" class="headBox">
        <p class="headTitle">{{ language("XIANGQINGLIEBIAO", "详情列表") }}</p>
        <span class="buttonBox" v-if="$route.query.mode === 'add'">
          <iButton @click="handleClickChoose">{{
              language("XUANZE", "选择")
          }}</iButton>
          <iButton @click="handleRemove">{{
              language("YICHU", "移除")
          }}</iButton>
        </span>
      </div>
      <tableList class="margin-top20" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="loading"
        :index="true" @handleSelectionChange="handleSelectionChange">
        <template #appType="scope">
          {{ scope.row.appType == '1' ? $t('定点') : $t('变更') }}
        </template>
      </tableList>
    </iCard>
    <detail v-model="detailParams.visible" :key="detailParams.key" :params="detailParams.data"
      @handleCloseModal="handleCloseModal" @handleSubmitAdd="handleSubmitAdd" />
  </div>
</template>

<script>
import { iCard, iButton, iInput, iPage, iMessage } from "rise";
import tableList from "@/components/ws3/commonTable";
import { tableTitle } from "./components/data";
import detail from "./components/detail";
import {
  getsignSheetDetails,
  getCHIPSignPage,
} from "@/api/designate/nomination/signsheet";
export default {
  components: {
    iCard,
    iButton,
    iInput,
    iPage,
    tableList,
    detail,
  },
  data() {
    return {
      infoForm: {},
      tableListData: [],
      tableTitle,
      loading: false,
      detailParams: {
        key: 0,
        visible: false,
        data: [],
      },
      selection: [],
    };
  },
  props: {
    description: {
      type: String,
      default: "",
    },
  },
  watch: {
    description(nv) {
      this.infoForm.description = nv;
    },
  },
  created() {
    this.infoForm.description = this.description;
    this.getTableData();
    this.getSignSheetDetails();
  },
  methods: {
    // 获取table数据
    getTableData() {
      this.loading = true;
      getCHIPSignPage({
        signId: Number(this.$route.query.id),
      }).then((res) => {
        this.loading = false;
        if (res && res.code == 200) {
          this.tableListData = Array.isArray(res.data) ? res.data : [];
        } else iMessage.error(res.desZh);
      });
    },
    // 获取芯片签字单详情
    getSignSheetDetails() {
      getsignSheetDetails({
        signId: this.$route.query.id,
      }).then((res) => {
        if (res && res.code == 200) {
          this.infoForm = res.data;
        } else iMessage.error(res.desZh);
      });
    },
    // 点击选择
    handleClickChoose() {
      this.detailParams = {
        ...this.detailParams,
        key: Math.random(),
        visible: true,
        data: this.tableListData.map((item) => item.id),
      };
    },
    // 关闭弹窗
    handleCloseModal() {
      this.detailParams = {
        ...this.detailParams,
        visible: false,
      };
    },
    // 提交选择数据
    handleSubmitAdd(val) {
      this.detailParams.visible = false;
      if (val.length)
        val.forEach((o) => {
          // 做前端标记
          o.flagSelect = true;
          o.ttNominateAppId = o.appNo
        });
      this.$set(this, "tableListData", this.tableListData.concat(val));
      this.$emit('save')
    },
    // 选中数据
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 移除
    async handleRemove() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language("QINGZHISHAOXUANZHONGYITIAOSHUJU", "请至少选中一条数据"));
      }

      const ids = [];
      try {
        this.selection.forEach((item) => {
          if (!item.flagSelect) ids.push(item.id);
        });

        if (ids.length) throw ids;
      } catch (e) {
        return iMessage.warn(
          `${this.language("SHENQINGDANHAO", "申请单号")}: ${ids.join(
            "、"
          )} ${this.language(
            "MTZDONTDELETE",
            "与零件定点申请相关联，不能移除"
          )}`
        );
      }

      await this.$confirm(
        this.language("LK_REMOVESURE", "您确定要执行移除操作吗？")
      );
      let params = {
        chipApplyIdAttr: this.selection.map(item=>item.id),
        signId: Number(this.$route.query.id)
      }
      removeSignApp(params).then(res=>{
        if(res?.code==200){
          this.getSignSheetDetails()
        }
      })
      // this.tableListData = this.tableListData.filter(
      //   (item) => !this.selection.includes(item)
      // );
      // this.selection = [];
    },
    handleInputByDescription(value) {
      this.$emit("update:description", value);
    },
    forceDelete(ids = []) {
      this.tableListData = this.tableListData.filter(
        (item) => !ids.map((item) => item + "").includes(item.id + "")
      );
    },
  },
};
</script>

<style lang='scss' scoped>
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;

  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }

  .buttonBox {
    position: absolute;
    right: 0;
  }
}
</style>
