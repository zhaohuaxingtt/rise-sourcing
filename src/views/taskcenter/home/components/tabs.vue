value === slot.componentOptions.propsData.name<template>
  <div class="tabs">
    <div class="tabsHeader clearFloat">
      <div class="tabPaneLabel paneLabelDefault" :class="{ paneLabelCurrent: value === slot.componentOptions.propsData.name }" v-for="(slot, $index) in panes" :key="$index" @click="handleClick(slot)">
        <span class="placeholder">{{ slot.componentOptions.propsData.label }}</span>
        <div class="main" name="paneLabel">
          <transition name="icon">
            <icon v-if="value === slot.componentOptions.propsData.name" class="icon" symbol name="icontabdingweiicon" />
          </transition>
          <span>{{ slot.componentOptions.propsData.label }}</span>
        </div>
      </div>
    </div>
    <div class="tableBody">
      <slot />
    </div>
  </div>
</template>

<script>
import { icon } from '@/components'

export default {
  components: { icon },
  model: {
    prop: 'value',
    event: 'tab-click'
  },
  props: {
    value: {
      type: String,
      require: true
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      panes: []
    }
  },
  methods: {
    init() {
      this.panes = this.$slots.default ?
        this.$slots.default.filter(vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'tabPane') :
        []
    },
    handleClick(vnode) {
      this.$emit('tab-click', vnode.componentOptions.propsData.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  .color-current {
    color: $color-blue;
  }

  .tabsHeader {
    .tabPaneLabel {
      float: left;
      padding: 12px 15px;
      cursor: pointer;
      line-height: 25px;
      position: relative;
    }

    .placeholder {
      visibility: hidden;
    }

    .icon-enter,
    .icon-leave {
      font-size: 0!important;
    }

    .icon-enter-active {
      transition: all .4s;
      font-size: 0;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-5px, -50%);
    }

    .icon-enter-to {
      font-size: 16px;
      transform: translate(0, -50%);
    }

    .icon-leave-active {
      transition: all .4s;
      font-size: 16px;
      transform: translate(0, -50%);
    }

    .icon-leave-to {
      font-size: 0;
      transform: translate(-5px, -50%);
    }
    
    .paneLabelDefault {
      .main {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        word-break: keep-all;
        color: #909091;
        

        span {
          font-size: 14px;
          line-height: 20px;
          position: relative;
          padding-left: 0px;
          transition: all .4s;

          &:hover {
            color: $color-blue;
          }
        }

        .icon {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-5px, -50%);
        }
      }
    }

    .paneLabelCurrent {
      .main {
        color: $color-blue;
        
        span {
          font-size: 18px;
          line-height: 25px;
          padding-left: 16px;
          font-weight: bold;
        }

        .icon {
          font-size: 16px;
          transform: translate(0, -50%);
        }
      }
    }
  }
}
</style>