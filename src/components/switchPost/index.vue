<!--
 * @Author: YoHo
 * @Date: 2021-11-30 14:33:11
 * @LastEditTime: 2021-11-30 16:51:54
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div class="switchPost">
    <i-button @click="dialogVisible = !dialogVisible">{{ language("QIEHUANGANGWEI", "切换岗位") }}</i-button>
    <iDialog
      :visible.sync="dialogVisible"
      @close="clearDialog"
      width="30%"
      class="switchPostDialog"
    >
      <template slot="title">
        <h2>{{ language("QIEHUANGANGWEI", "切换岗位") }}</h2>
      </template>
      <p class="label">请选择切换的岗位</p>
      <iSelect v-model="positionId">
        <el-option
          v-for="item in positionList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </iSelect>
      <div class="confirmBtn padding-bottom20 padding-top20">
        <iButton :loading="isLoading" @click="sumbit">{{
          language("LK_BAOCUN", "保存")
        }}</iButton>
        <iButton @click="clearDialog">{{
          language("LK_QUXIAO", "取 消")
        }}</iButton>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iSelect, iButton } from "rise";
import { roleMixins } from "@/utils/roleMixins";
import { changePosition } from "@/api/aeko/approve";
export default {
  components: {
    iDialog,
    iSelect,
    iButton,
  },
  mixins: [roleMixins],
  data() {
    return {
      dialogVisible: false,
      positionId: null,
    };
  },
  computed: {
    positionList() {
      return this.userInfo.positionList;
    },
  },
  created() {
    this.positionId = this.userInfo.positionDTO.id;
  },
  methods: {
    clearDialog() {
      this.dialogVisible = false;
    },
    sumbit() {
      changePosition({
        userId: this.userInfo.id,
        positionId: this.positionId,
      }).then((res) => {
        if (res?.code == "200") {
          this.dialogVisible = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.switchPost {
  margin-left: 20px;
  .label{
    font-size: 14px;
    color: #000;
    font-weight: 400;
    line-height: 14px;
    margin-bottom: 8px;
  }
  .switchPostDialog{
    .confirmBtn {
      text-align: right;
    }
  }
}
</style>