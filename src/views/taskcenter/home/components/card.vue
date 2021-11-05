<template>
  <iCard class="card" @click.native="$emit('click', data)">
    <template #header>
      <div class="header">
        <div class="title font-weight">{{ title }}</div>
        <tag class="tag">{{ tag }}</tag>
      </div>
    </template>
    <div class="body">
      <div>
        <div class="backlog">
          <div class="num color-red font-weight">{{ data.expireNo }}</div>
          <div class="title">
            <icon class="icon" symbol name="iconyuqidaiban" />
            <span class="font-weight">{{language("LK_YUQIDAIBAN",'逾期待办')}}</span>
          </div>
        </div>
        <div class="line colo-cyan">/</div>
        <div class="backlog">
          <div class="num colo-cyan font-weight">{{ data.waitNo }}</div>
          <div class="title">
            <icon class="icon" symbol name="iconjinridaiban" />
            <span class="font-weight">{{ language('LK_JINRIDAIBAN','今日待办') }}</span>
          </div>
        </div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise'
import tag from './tag'

export default {
  components: { iCard, icon, tag },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: String
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  $color-black: #001847;
  $color-red: #CC4949;
  $color-cyan: #3A5280;

  position: relative;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  .color-red {
    color: $color-red;
  }

  .colo-cyan {
    color: $color-cyan;
  }

  ::v-deep .cardHeader {
    padding: 20px;
  }

  ::v-deep .cardBody {
    padding: 14px 20px 30px;
  }

  .header {
    .title {
      font-size: 16px;
      color: $color-black;
      height: 22px;
      line-height: 22px;
    }

    .tag {
      position: absolute;
      top: 20px;
      right: -4px;
    }
  }

  .body {
    text-align: center;

    .line,
    .backlog {
      display: inline-block;
      vertical-align: top;
    }

    .line {
      font-size: 46px;
      margin: 0 56px;
    }

    .backlog {
      text-align: center;

      .num {
        font-size: 46px;
      }

      .title {
        margin-top: 6px;

        .icon {
          width: 30px;
          height: 30px;
          vertical-align: top;
        }

        span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          margin-left: 4px;
          color: $color-black;
        }
      }
    }
  }
}
</style>