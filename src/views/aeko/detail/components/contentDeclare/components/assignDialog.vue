<!--
 * @Author: wentliao
 * @Date: 2021-07-28 14:27:28
 * @Description: 分配科室弹窗
-->
<template>
  <iDialog
    :title="language('ZHUANPAICAIGOUYUAN', '转派采购员')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="25%"
    class="assignDialog"
  >
    <div class="assignDialog-contain">
      <!-- 单一分派 -->
      <div>
        <p>{{ language("XUANZEZHUANPAIDECAIGOUYUAN", "请选择转派的采购员") }}</p>
        <iSelect
          v-model="refferenceSmtNum"
          class="margin-top20"
          style="width: 100%"
          filterable
          @visible-change="selectVisibleChange($event)"
          :placeholder="language('LK_AEKO_DAIXUANZE', '待选择')"
          :filter-method="
            (val) => {
              dataFilter(val);
            }
          "
        >
          <el-option
            v-for="item in linieSelectCopyOptions || []"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </iSelect>
      </div>
    </div>
    <div class="confirmBtn padding-bottom20 padding-top20">
      <iButton @click="save" :loading="isLoading">{{
        language("QUEREN", "确认")
      }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iSelect, iButton, iMessage } from "rise";
import { searchLinie } from "@/api/aeko/manage";
import { assignContent } from "@/api/aeko/detail/partsList.js";
import { user as configUser } from "@/config";
export default {
  name: "assignDialog",
  components: {
    iDialog,
    iSelect,
    iButton,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    selectItems: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
  },
  data() {
    return {
      radioType: "1",
      isLoading: false,
      linieSelectOptions: [],
      linieSelectCopyOptions: [],
      refferenceSmtNum: "",
      deptId: null,
    };
  },
  created() {
    this.getLinieList();
  },
  methods: {
    clearDialog() {
      this.$emit("changeVisible", "transferVisible", false);
    },

    // 分派采购员
    async save() {
      let data = [];
      const {
        refferenceSmtNum,
        linieSelectOptions,
        selectItems,
      } = this;
      // 判断是否已选择
      if (!refferenceSmtNum)
        return iMessage.warn(
          this.language("LK_AEKO_QINGXUANZEHOUTIJIAO", "请选择后提交")
        );

      const depArr = linieSelectOptions.filter(
        (item) => item.id == refferenceSmtNum
      );
      let params = {
          requirementAekoId: this.selectItems[0].requirementAekoId,
          objectAekoPartIds: this.selectItems.map(item=> item.objectAekoPartId),
          userId:this.userInfo.id,
          userName: this.userInfo.nameZh,
          targetUserId: refferenceSmtNum,
          targetUserName: depArr.length ? depArr[0].nameZh : "",
        };
      this.isLoading = true;
      await assignContent(params)
        .then((res) => {
          this.isLoading = false;
          const { code } = res;
          if (code == 200) {
            iMessage.success(this.language("LK_CAOZUOCHENGGONG", "操作成功"));
            this.clearDialog();
            this.$emit("getList");
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch((err) => {
          this.isLoading = false;
        });
    },

    // 获取linie列表
    async getLinieList() {
      const { userInfo = {} } = this;
      const { deptDTO = {} } = userInfo;
      const deptId = deptDTO.id;
      await searchLinie({ tagId: configUser.LINLIE, deptId }).then((res) => {
        const { code, data } = res;
        if (code == 200) {
          let selectData = []
          data.forEach((item) => {
            if(item.id!=userInfo.id){
              item.label = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
              item.value = item.id + "";
              selectData.push(item)
            }
          });
          console.log(selectData);
          this.linieSelectOptions = selectData;
          this.linieSelectCopyOptions = selectData;
          console.log(data);
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
    },

    // 模糊搜索处理
    dataFilter(val) {
      // 去除前后空格
      const trimVal = val.trim();
      // linieSelectOptions  linieSelectCopyOptions
      const { linieSelectOptions } = this;
      if (trimVal) {
        const list = linieSelectOptions.filter((item) => {
          if (
            !!~item.nameZh.indexOf(trimVal) ||
            (item.nameEn &&
              !!~item.nameEn.toUpperCase().indexOf(trimVal.toUpperCase()))
          ) {
            return true;
          }
        });
        this.linieSelectCopyOptions = list;
      } else {
        this.linieSelectCopyOptions = linieSelectOptions;
      }
    },

    selectVisibleChange(visible, key) {
      if (!visible) {
        const { linieSelectOptions } = this;
        this.linieSelectCopyOptions = linieSelectOptions;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.assignDialog {
  .assignDialog-contain {
    ::v-deep.el-radio {
      margin: 10px 0;
      .el-radio__input.is-checked + .el-radio__label {
        color: #606266;
      }
    }
  }
  .radio-select {
    display: block;
  }
  .confirmBtn {
    text-align: right;
  }
}
</style>