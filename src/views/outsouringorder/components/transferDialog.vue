<template>
  <iDialog
    :title="$t('LK_ZHUANPAI')"
    :visible.sync="value"
    width="500px"
    @close="clearDiolog"
    class="point-dialog"
  >
    <el-form>
      <el-form-item :label="$t('LK_KESHI')">
        <iSelect
          :placeholder="$t('LK_QINGXUANZE')"
          v-model="department"
          @change="selDeptOnChange"
          value-key="deptId"
        >
          <!-- <el-option :value="{}" :label="$t('all')"/> -->
          <el-option
            :value="item"
            :label="item.commodity"
            v-for="(item, index) in deptList"
            :key="index"
          />
        </iSelect>
      </el-form-item>
      <el-form-item :label="$t('LK_ZHUANYECAIGOUYUAN')">
        <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="userId" filterable>
          <el-option
            v-for="items in userList"
            :key="items.value"
            :label="items.label"
            :value="items.value"
          />
        </iSelect>
      </el-form-item>
      <div class="comfirm-button">
        <div class="switch">
          <span>{{ language("QUANBUXIANGCI") }}</span>
          <el-switch
            class="margin-left10 zoom075"
            v-model="isAllItem"
            active-color="#1660F1"
            inactive-color="#cccccc"
          ></el-switch>
        </div>
        <div>
          <iButton @click="sureByMySelf">{{
            language("LK_ZHUANPAIZIJI", "转派自己")
          }}</iButton>
          <iButton @click="handleConfirm" :loading="transferLoading">{{
            $t("LK_QUEREN")
          }}</iButton>
        </div>
      </div>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from "rise";
import {
  getDepartmentsCombo,
  liniePullDownByDept,
} from "@/api/ws2/purchase/investmentList";
import { getRfqUserInfoList, getRfqDeptList } from "@/api/partsrfq/home";
export default {
  components: {
    iDialog,
    iSelect,
    iButton,
  },
  props: {
    value: { type: Boolean, default: false },
    transferLoading: { type: Boolean, default: false },
  },
  methods: {
    // 关闭弹窗
    clearDiolog() {
      this.department = {};
      this.userId = "";
      this.$emit("input", false);
    },
    handleConfirm() {
      if (!this.userId) {
        return iMessage.warn(
          this.$t("LK_NINDANGQIANHAIWEIXUANZEXUNJIACAIGOUYUAN")
        );
      }
      let data = {
        deptName: this.department.commodity,
        deptNum: this.department.commodity,
        ownerId: this.userId,
        isAllItem: this.isAllItem,
      };
      this.$emit("handleTransfer", data);
    },
    sureByMySelf() {
      this.$emit("handleTransfer", {
        ownerId: this.userInfo.id,
        isAllItem: this.isAllItem,
      });
    },
    getDeptList() {
      getDepartmentsCombo()
        .then((res) => {
          if (+res.code === 0) {
            this.deptList = res.data;
            this.selDeptOnChange();
          }
        })
        .catch((err) => {});
    },
    //选中部分发生变化//获取部门用户
    selDeptOnChange() {
      this.userId = "";
      let parmars = { deptId: this.department.deptId };
      getRfqUserInfoList(parmars)
        .then((res) => {
          if (res?.code == "200") {
            this.userList = res.data?.map((item) => {
              return { value: item.code, label: item.name };
            });
          }
        })
        .catch((err) => {});
    },
  },
  data() {
    return {
      department: {}, //科室
      userId: "", //前期采购员
      deptList: [],
      userList: [],
      isAllItem: true,
    };
  },
  watch: {
    value: function (val) {
      if (val) {
        this.department = {};
        this.userId = "";
        this.getDeptList();
      }
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.permission?.userInfo || {};
    },
  },
};
</script>

<style lang="scss" scoped>
.point-dialog {
  ::v-deep .el-dialog__body {
    padding-bottom: 20px !important;
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
