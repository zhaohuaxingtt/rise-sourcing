<template>
  <div class="page-head">
    <div class="left-box">
      <div class="form-item">
        <div class="form-txt">{{ $t('LK_BANBENHAO') }}</div>
        <iSelect
          class="iSelect1"
          :placeholder="$t('LK_ALL')"
          filterable
        >
          <el-option
              :value="item.id"
              :label="item.cartypeNname"
              v-for="(item, index) in editionList"
              :key="index"
          ></el-option>
        </iSelect>
      </div>
      <div class="refresh" @click="refresh">
        <icon symbol name="iconmojukanbanshuaxin" class="refresh-icon"></icon>
        {{ $t('LK_SHUAXIN') }}<!-- 刷新 -->
      </div>
      <div class="date">{{ $t('LK_SHUAXINRIQI') }}：2021.01.31</div><!-- 刷新日期 -->
      <div class="date">
        <span>{{$t('LK_HUOBI')}}：{{$t('LK_RENMINBI')}}</span>
        <span>{{$t('LK_DANWEI')}}：{{$t('LK_BAIWANYUAN')}}</span>
        <span>{{$t('LK_BUHANSUI')}}</span>
      </div><!-- 货币：人民币  |  单位：百万元  |  不含税  -->
    </div>

    <div class="right-box">
      <slot name="btns"></slot>
    </div>
  </div>
</template>

<script>
import {
  icon,
  iTableList
} from "@/components";
import {
  iSearch,
  iMessage,
  iSelect,
  iInput,
  iButton
} from "rise";
export default {
  components: {
    iSelect, icon
  },
  data(){
    return {
      editionList: [],
    }
  },

  methods: {

    //  刷新
    refresh(){
      this.$emit('refresh');
    }
  }
}
</script>

<style lang="scss" scoped>
.page-head{
  display: flex;
  justify-content: space-between;

  .iSelect1{
    width: 120px;
  }

  .date{
    font-size: 14px;
    color: #0D2451;
    margin-left: 20px;

    span{
      margin-right: 20px;
      position: relative;

      &::after{
        content: '';
        width: 1px;
        height: 18px;
        background-color: #0D2451;
        position: absolute;
        left: -9px;
        top: 1px;
      }

      &:nth-child(1){
        &::after{
          content: '';
          display: none;
        }
      }
    }
  }

  .refresh{
    color: #1763F7;
    margin-left: 30px;
    cursor: pointer;

    .refresh-icon{
      width: 14px;
      height: 15px;
    }
  }

  .left-box{
    display: flex;
    align-items: center;

    .form-item{
      display: flex;
      align-items: center;

      .form-txt{
        color: #0D2451;
        margin-right: 20px;
      }
    }
  }
}
</style>