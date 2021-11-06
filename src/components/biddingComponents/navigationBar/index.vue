<template>
  <div class="navigationBar">
    <div class="item" v-for="(item,index) of list" :key="item.title">
      <div class="text" :class="{'textActive': current === index + 1}" @click="changeCurrent(index + 1)"
           :v-permission="item.permission">
        {{ item.key ? $t(item.key) : item.title }}
        <span v-if="item.required" :class="{'required': current === index + 1}">*</span>
      </div>
      <div class="divider" v-if="index !== list.length - 1" :v-permission="item.permission"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {type: Number, default: 1},
    list: {
      type: Array,
      default: () => {
        return [
          {title: '基本信息'},
          {title: '历史沿革'},
          {title: 'FRM评级'},
          {title: '工厂信息'},
          {title: '授信银行信息'},
          {title: '股东、集团与关联公司'},
          {title: '人员及公司治理情况'},
          {title: '主要业务及产品'},
          {title: '主要客户'},
          {title: '主要分供方名称及产品'},
          {title: '历年合作记录'},
          {title: '重大事项'},
          {title: '联系人与用户'},
          {title: '相关附件'},
          {title: '材料组'},
          {title: '系统修改历史'},
          {title: '财务大数'},
          {title: '财务数据'},
        ]
      }
    }
  },
  methods: {
    changeCurrent(index) {
      this.$emit('changeCurrent', index)
    }
  }
}
</script>

<style scoped lang="scss">
.navigationBar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: center;
    margin-right: 25px;
    margin-bottom: 10px;

    .text {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      color: #999999;
      cursor: pointer;
    }

    .textActive {
      color: #1660F1;
      font-weight: bold;
    }

    .divider {
      margin-left: 25px;
      width: 0;
      height: 16px;
      border: 1px solid #909091;
    }
  }
}

.required {
  font-size: 14px;
  color: red;
}
</style>
