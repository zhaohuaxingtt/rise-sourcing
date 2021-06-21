<template>
  <div class="block">
    <SearchBlock @sure="allSerch" />
      <iCard>
        <div class="table-head">
          <iButton @click="modifyA">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="allTableList"
          :tableTitle="allTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          
        </iTableList>
      </iCard>
  </div>
</template>

<script>
import {
  icon,
  iTableList
} from "@/components";
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
} from "rise";
import SearchBlock from "./searchBlock";
import { bmTableCount, findAllBmList, findBmWaitConfirmList, findBmAekoAddList, findBmAekoMinusList } from "@/api/ws2/bmApply";
import { allTableHead } from "./data";

export default {
  components: {
    SearchBlock, iTableList, iCard, iButton
  },

  data(){
    return {
      allTableList: [],
      allTableHead,
      allTableLoading: false,
      selectTableList: [],
    }
  },

  methods: {

    handleSelectionChange(val){
      this.selectTableList = val;
    },

    allSerch(data){
      this.allTableLoading = true;
      const param = {
        ...data,
        current: this.page.currPage,
        size: this.page.pageSize,
      }
      findAllBmList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.allTableList = res.data
        }else{
          iMessage.error(result);
        }

        this.allTableLoading = false;
      }).catch(err => {
        this.allTableLoading = false;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.block{
  .table-head{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}

</style>