<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 16:34:49
 * @LastEditTime: 2021-05-24 15:45:01
 * @LastEditors: Please set LastEditors
 * @Description: 界面中存在的搜索区域，公共组件。
 * @FilePath: \rise\src\components\iSearch\index.vue
-->
<template>
  <iCard :tabCard="tabCard" class="iSaveCardBox">
    <div class="iSearch-title">
      <span v-if="title" class="title">{{ title }}</span>
      <div class="action-icon-box">
        <iButton
          v-for="item in buttonList"
          :key='item.id'
          @click="$emit(item.emit)"
          class="action-button"
        >{{item.name}}</iButton>
        <div>
          <i @click="toggle" v-if='!icon' class="el-icon-arrow-up icon margin-left20 cursor"
          :class="{rotate:hidens}"></i>
        </div>
        
      </div>
    </div>
    <div class="iSearch-content" :class="{hiden:hidens}">
      <slot></slot>
    </div>
  </iCard>
</template>
<script>
import iCard from './components/iCard'
import iButton from './components/iButton'
/**
 * @example ./README.me
*/
export default {
  name:'iSearch',
  components: {iCard, iButton},
  props: {
    icon: Boolean,
    //标题名字
    title: {
      type: String
    },
    
    buttonList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      hidens: false,
      stypeWidth:0
    }
  },
  mounted(){
    this.getWidth()
  },
  methods:{
    /**
     * @description: 获取宽度设置
     * @param {*}
     * @return {*}
     */
    getWidth(){
        let rightWidth = this.hiddenRight?0:this.$el.getElementsByClassName('operation')[0]
        // this.stypeWidth = rightWidth.clientWidth
    },
    toggle(){
      this.hidens = !this.hidens
      this.$emit('toggle', this.hidens)
    }
  }
}
</script>
<style lang='scss' scoped>

.iSaveCardBox {
  margin-bottom: 20px;
}

.iSearch-title {
  display: flex;
  justify-content: space-between;

  .title {
    font-weight: 700;
    font-size: 20px;
    color: #000000;
    letter-spacing: 0;
    line-height: 35px;
  }

  .action-icon-box {
    display: flex;

    .action-button {
      margin-left: 20px;
    }
  }
}

.iSearch-content {
  transition: max-height .5s;
  max-height: 500px;
  overflow: hidden;
}

.el-icon-arrow-up {
  transition: all 0.5s;
  position: relative;
  top: 8px;
}

.rotate {
  transform: rotate(180deg);
  color: $color-blue;
}

.icon {
  font-size: 20px;
  color: #D3D3DB;

  &:hover {
    color: $color-blue;
  }
}

.hiden {
  max-height: 0;
}
</style>