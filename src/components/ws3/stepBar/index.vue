<template>
  <div class="step-bar">
    <div class="box" v-for="(item,index) of list" :key="item.title">
      <div class="item" @click="handleItemClick(index + 1)">
        <div class="symbol-box" :class="{'symbol-box-gray': (index + 1) > current}">
          <div class="draw-box" :class="{
            'draw-box-gray': (index + 1) > current,
            'draw-box-current': (index + 1) === current,
          }">
            <icon name="iconrizhiwuzi" class="draw-box-icon" v-if="(index + 1) < current"/>
          </div>
        </div>
        <div class="title">
          {{ item.title }}
          <span v-if="item.required" class="required">*</span>
        </div>
      </div>
      <div class="line"
           :class="{
            'line-dash': (index + 1) === current -1,
            'line-gray': (index + 1) > current - 1
           }"
           v-show="list.length !== (index + 1)"></div>
    </div>
  </div>
</template>

<script>
import {icon} from '@/components'

export default {
  components: {
    icon
  },
  props: {
    current: {type: Number, default: 5},
    list: {
      type: Array,
      default: () => {
        return [
          {title: '1.首页', required: true},
          {title: '2.基本信息', required: true},
          {title: '3.工厂信息', required: true},
          {title: '4.授权银行信息'},
          {title: '5.主要业务及产品'},
          {title: '6.主要客户'},
          {title: '7.主要分供方及产品名称'},
          {title: '8.联系人与用户', required: true},
          {title: '9.相关附件', required: true},
          {title: '10.财务大数'},
          {title: '11.财务数据'},
        ]
      }
    }
  },
  methods: {
    handleItemClick(index) {
      this.$emit('handleItemClick', index)
    }
  }
}
</script>

<style scoped lang="scss">
.step-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: auto;

  .box {
    display: flex;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 105px;
      cursor: pointer;

      .symbol-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 36px;
        height: 36px;
        background-color: rgba(22, 96, 241, 0.2);
        border-radius: 50%;

        .draw-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          background-color: rgba(22, 96, 241);
          border-radius: 50%;

          .draw-box-icon {
            font-size: 12px;
            color: #ffffff;
          }
        }

        .draw-box-current {
          width: 10px;
          height: 10px;
        }

        .draw-box-gray {
          width: 10px;
          height: 10px;
          background-color: rgb(205, 212, 226);
        }
      }

      .symbol-box-gray {
        background-color: rgba(205, 212, 226, 0.2);
      }

      .title {
        margin-top: 15px;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: 0;
        color: #000000;
        text-align: center;

        .required {
          color: red;
          font-size: 12px;
        }
      }
    }

    .line {
      margin-top: 16px;
      width: 51px;
      height: 0;
      border: solid 2px rgba(22, 96, 241);
    }

    .line-dash {
      border: dashed 2px rgba(22, 96, 241);
    }

    .line-gray {
      border: dashed 2px #ced4e1;
    }
  }
}

</style>