<template>
  <iDialog
    :title="$t('LK_QIANSHOU')"
    :visible.sync="value"
    width="28%"
    @close="clearDiolog"
    class="point-dialog"
  >
    <span class="subtitle"
      >签收后系统将自动创建零件采购项目，请选择询价采购员</span
    >
    <el-form class="form">
      <el-form-item :label="$t('LK_KESHI')">
        <iSelect
          :placeholder="$t('LK_QINGXUANZE')"
          v-model="department"
          @change="selDeptOnChange"
          value-key="id"
        >
          <el-option
            :value="item"
            :label="item.deptNum"
            v-for="(item, index) in deptList"
            :key="index"
          />
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('MOULDADD.LK_QIANQICAIGOUYUAN')">
        <iSelect
          :placeholder="$t('LK_QINGXUANZE')"
          v-model="buyer"
          value-key="id"
        >
          <el-option
            v-for="(items, index) in userList"
            :key="index"
            :value="items"
            :label="items.nameZh"
          />
        </iSelect>
      </el-form-item>
      <div class="comfirm-button">
        <div class="switch">
          <span>全部项次</span>
          <el-switch
            class="margin-left10 zoom075"
            v-model="isAllItem"
            active-color="#1660F1"
            inactive-color="#cccccc"
          ></el-switch>
        </div>
        <iButton @click="confirmFunction" :loading="handleLoading">{{
          $t("LK_QUEREN")
        }}</iButton>
      </div>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton } from "rise";
import {
  getDepartmentsCombo,
  liniePullDownByDept,
} from "@/api/ws2/purchase/investmentList";
import { getDeptListByParam } from "@/api/costanalysismanage/home";
import { listByDeptId } from "@/api/outsouringorder";
export default {
  components: {
    iDialog,
    iSelect,
    iButton,
  },
  data() {
    return {
      department: {}, //科室
      buyer: {}, //前期采购员
      deptList: [],
      userList: [],
      handleLoading: false,
      isAllItem: true,
    };
  },
  watch: {
    value: function (val) {
      if (val) {
        this.department = {};
        this.buyer = {};
        this.getDeptList();
      }
    },
  },
  props: {
    value: { type: Boolean, default: false },
  },
  methods: {
    // 关闭弹窗
    clearDiolog() {
      this.department = {};
      this.buyer = {};
      this.$emit("input", false);
    },
    confirmFunction() {
      this.handleConfirm();
    },
    handleConfirm() {
      this.handleLoading = true;
      let param = {
        beforeLinie: this.buyer.nameZh,
        beforeLinieId: this.buyer.id,
        deptId: this.department.id,
        isAllItem: this.isAllItem,
      };
      this.$emit("handleTurningPoint", param);
      this.handleLoading = false;
    },
    getDeptList() {
      const params = {
        deptNum: "CS",
        grade: "3",
      };
      getDeptListByParam(params)
        .then((res) => {
          if (+res.code === 200) {
            this.deptList = res.data.filter((item) => {
              return item.level;
            });
          }
        })
        .catch((err) => {});
    },
    //选中部分发生变化//获取部门用户
    selDeptOnChange() {
      this.buyer = {};
      let parmars = { deptId: this.department.id };
      listByDeptId(parmars)
        .then((res) => {
          if (+res.code === 200) {
            this.userList = res.data;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.point-dialog {
  ::v-deep .el-dialog__body {
    padding-bottom: 20px !important;
  }
  .subtitle {
    margin-top: 5px;
  }
  .form {
    margin-top: 10px;
  }
}

.comfirm-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .switch {
    display: inline-flex;
    align-items: center;
    .zoom075 {
      zoom: 0.75;
    }
  }
}
</style>