<template>
  <el-card>
    <div class="cardHeader">
      <div class="title">
        <div class="textBox">
          <img :src="require('../images/' + iconName +'.png')" class="textIcon">
          <span class="text">{{ title }}</span>
        </div>
        <img src="../images/star.png" v-for="(item,index) of star" :key="index" class="starIcon"/>
      </div>
      <i class="el-icon-arrow-up collapse margin-left20 cursor" @click="handleShowHide(false)"
         :class="{ rotate: !showSlot }"></i>
    </div>
    <el-collapse-transition>
      <slot v-if="showSlot"></slot>
    </el-collapse-transition>
  </el-card>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    star: {
      type: Number,
      default: null,
    },
    iconName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showSlot: true,
    };
  },
  methods: {
    handleShowHide(params = false) {
      if (params) {
        this.showSlot = true;
      } else {
        this.showSlot = !this.showSlot;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cardHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 5px 0;
  border-bottom: 1px solid #CDDAF0;
  margin-bottom: 20px;

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .textBox {
      flex: 1;
      display: flex;
      align-items: center;

      .text {
        font-size: 18px;
        line-height: 21px;
        color: #000000;
      }

      .textIcon {
        width: 19px;
        height: 19px;
        margin-right: 10px;
      }
    }

    .starIcon {
      width: 22px;
      height: 22px;
    }

    .starIcon + .starIcon {
      margin-left: 10px;
    }
  }

  .rotate {
    transform: rotate(180deg);
  }

  .collapse {
    font-size: 25px;
    color: #D3D3DB;

    &:hover {
      color: $color-blue;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
