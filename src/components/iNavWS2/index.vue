<!--
* @author: yz
* @Date: 2021-4-26 11点32分
* @Description: WS2顶部导航栏
 -->
<template>
  <div class="btnList flex-align-center">
    <iNavMvp
      :lev='2'
      :routerPage="true"
      :list="navList"
      class="iNavMvp"
    ></iNavMvp>
    <span v-if="magicCube" @click="changeDataBase" class="dataBase">
      <transition name="bounce">
        <Popover
          :content="magicCubeHoverText"
          placement="top-start"
          trigger="hover">
            <icon slot="reference" v-if="!dataBase" symbol name="icondatabaseweixuanzhong"></icon>
        </Popover>
      </transition>
      <transition name="bounceTo">
        <Popover
          :content="magicCubeHoverText"
          placement="top-start"
          trigger="hover">
            <icon slot="reference" v-if="dataBase" symbol name="icondatabasexuanzhongzhuangtai" class="openIcon"></icon>
        </Popover>
      </transition>
    </span>
  </div>
</template>
<script>
import {
  icon,
} from "rise";
import { Popover } from "element-ui";
import {iNavMvp} from 'rise';
import store from '@/store';

export default {
  props: {
    // 导航List
    navList: {
      type: Array,
      default: () => []
    },
    // 是否展示右侧魔方
    magicCube: {
      type: Boolean,
      default: false
    },
    // 是否展示右侧魔方, PS需magicCube: true
    magicCubePath: {
      type: String,
      default: ''
    },
    // 魔方HOVER的文案, PS需magicCube: true
    magicCubeHoverText: {
      type: String,
      default: '',
    }
  },
  mounted() {
  },
  components: {
    icon,
    iNavMvp,
    Popover,
  },
  data() {
    return {
      routerPage: true,
      query: true,
      dataBase: false,
    }
  },
  computed: {
    whiteBtnList: () => {
      return store.state.permission.whiteBtnList
    }
  },
  created() {
    this.dataBase = this.$route.path.includes(this.magicCubePath) ? true : false
  },
  methods: {
    changeDataBase(){
      this.dataBase = true
      this.$router.push({path: this.magicCubePath})
      this.$emit('changeDataBase')
    },
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.card-icon{
  width: 20px;
  height: 20px;
  margin-right: 20px;
  cursor: pointer;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}

//
//.bounce-leave-active {
//  animation: bounce-in .5s reverse;
//}
//
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.bounceTo-enter-active {
  animation: bounceTo-in .5s;
}

//.bounceTo-leave-active {
//  animation: bounceTo-in .5s reverse;
//}

@keyframes bounceTo-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.iNavMvp{
  margin-right: 30px;
}
.tabs {
  display: flex;

  > ul {
    display: flex;
    flex-direction: row;

    > li {
      //max-width: 130px;
      color: #000000;
      line-height: 23px;
      font-size: 20px;
      font-weight: 400;
      opacity: 0.42;
      padding-bottom: 5px;
      margin-right: 50px;
      cursor: pointer;

      &.active {
        font-weight: bold;
        color: #000000;
        opacity: 1;
        border-bottom: 3px solid #1763F7;
      }
    }
  }

  > ul::after {
    width: 100%;
    height: 2px;
    border-bottom: 2px solid red;
  }
}

.btnList {
  > span {
    font-size: 20px;

    // opacity: 0.5;
    .log {
      font-size: 16px;
      color: #1660f1;
      margin-left: 5px;
    }
  }

  .dataBase {
    width: 31px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;

    .openIcon {
      width: 31px;
      height: 36px;
    }
  }
}


</style>
