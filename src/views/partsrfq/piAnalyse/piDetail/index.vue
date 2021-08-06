<template>
  <iPage v-loading="pageLoading">
    <!--    顶部操作按钮-->
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language('PI.PIFENXI', 'Price Index分析') }}</span>
      <div class="floatright">
        <iButton @click="handleBack">{{ language('PI.PIFENXIKU', 'Price Index分析库') }}</iButton>
        <iButton @click="handlePreview">{{ language('PI.YULAN', '预览') }}</iButton>
        <iButton @click="() => this.saveDialog = true">{{ language('PI.BAOCUN', '保存') }}</iButton>
      </div>
    </div>
    <!--     零件列表-->
    <thePartsList
        :partList="partList"
        :partItemCurrent="partItemCurrent"
        @handleOpenCustomDialog="handleOpenCustomDialog"
        @handlePartItemClose="handlePartItemClose"
        @handlePartItemClick="handlePartItemClick"
    />
  </iPage>
</template>

<script>
import {iPage, iButton, iMessageBox} from 'rise';
import thePartsList from './components/thePartsList';
import resultMessageMixin from '@/utils/resultMessageMixin';

export default {
  mixins: [resultMessageMixin],
  components: {
    iPage,
    iButton,
    thePartsList,
  },
  data() {
    return {
      pageLoading: false,
      saveDialog: false,
      partList: [
        {partsId: 1},
        {partsId: 2},
      ],
      partItemCurrent: 0,
    };
  },
  methods: {
    handleBack() {},
    handlePreview() {},
    // 打开自定义零件
    handleOpenCustomDialog() {},
    // 关闭零件
    handlePartItemClose({event, item}) {
      event.stopPropagation();
      iMessageBox(
          this.$t('LK_SHIFOUQUERENSHANCHU'),
          this.$t('LK_WENXINTISHI'),
          {confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO')},
      ).then(async () => {
        /*const req = {
          id: item.id,
        };
        const res = await deletePartsCustomerList(req);
        if (res.result) {
          this.partItemCurrent = 0;
          this.currentBatchNumber = this.partList[0].batchNumber;
          this.currentPartsId = this.partList[0].partsId;
          this.getDataInfo();
        }
        this.resultMessage(res);*/
      });
    },
    // 点击零件
    handlePartItemClick({item, index}) {
      this.partItemCurrent = index;
    },
  },
};
</script>

<style scoped>

</style>
