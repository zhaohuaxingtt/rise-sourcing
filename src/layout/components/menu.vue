<!--
 * @Author: yuszhou
 * @Date: 2021-02-22 16:50:10
 * @LastEditTime: 2021-03-25 23:17:01
 * @LastEditors: Please set LastEditors
 * @Description: 项目菜单。
 * @FilePath: \rise\src\layout\components\menu.vue
-->
<template>
  <ul class="menuItems">
    <li
      :class="{ items: true, active: items.active }"
      v-for="(items, index) in menuData"
      :key="index"
      @click="active(items)"
    >
      <icon symbol
        v-if='items.active'
        class="icon margin-right20 leftIconActive"
        name="iconxunyuandingdianxuanzhong"
      ></icon>
      <icon symbol
        v-else
        class="icon margin-right20 leftIconHiden"
        name="iconxunyuandingdianweixuanzhong"
      ></icon>
      <span>{{ items.name }}</span>
      <icon symbol class="icon floatright margin-top32" v-if="!items.active" name="iconmuluweixuanzhongshijiantou"></icon>
    </li>
  </ul>
</template>
<script>
import { icon } from 'rise';
export default {
  components: { icon },
  props: {
    menuData: {
      props: Array,
      default: () => ([])
    }
  },
  methods:{
    //路由跳转，如果当前点击的是一个已经被激活的菜单，则不作操作
    active(items){
      this.$emit('activeMeun')
      if(items.active) return
      this.menuData.forEach(key=>{
        if(key.id == items.id){
          key.active = true
        }else{
          key.active = false;
        }
      })
      this.$router.push({
          path:items.url
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.menuItems {
  height: calc(100% - 60px);
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0px;
  padding: 0px;
  .items {
    height: 84px;
    padding-left: 40px;
    line-height: 84px;
    padding-right: 30px;
    cursor: pointer;
    span{
      color: #5f6f8f;
      font-size: 20px;
    }
    .icon{
      font-size: 20px;
    }
    &:hover{
      span{
        color: #1660f1; 
      } 
    }
  }
  .active {
    background: #1660f1;
    span{
      color:white
    }
    &:hover{
      span{
        color: white;
      }
    }
  }
}
</style>
