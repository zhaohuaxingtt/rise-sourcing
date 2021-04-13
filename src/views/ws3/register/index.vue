<template>
  <i-page class="register-page">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane label="注册信息填写" name="register">
        <div class="main-box">
          <step-bar class="step-bar"
                    :current="current"
                    :list="stepBarList"
                    @handleItemClick="handleStepBarClick"
          />
          <div class="main-content">
            <div class="title">
              |{{ mainContentTitle || stepBarList[0].title }}
              <span class="required" v-if="showRequiredSymobl">*</span>
            </div>
            <div v-if="current === 1">首页</div>
            <div v-if="current === 2">基本信息</div>
          </div>
          <bottom-action-bar
              :check-code="checkCode"
              :show-check-code="true"
              :show-next-button="showNextButton"
              :show-temporary-storage-button="showTemporaryStorageButton"
              @handleNextButtonClick="handleNextButtonClick"
              @handleTemporaryStorageButtonClick="handleTemporaryStorageButtonClick"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </i-page>
</template>

<script>
import {iPage} from '@/components'
import stepBar from '@/components/ws3/stepBar'
import bottomActionBar from '@/components/ws3/bottomActionBar'

export default {
  components: {
    iPage,
    stepBar,
    bottomActionBar
  },
  data() {
    return {
      tab: 'register',
      stepBarList: [
        {title: '首页', required: true},
        {title: '基本信息', required: true},
        {title: '工厂信息', required: true},
        {title: '授权银行信息'},
        {title: '主要业务及产品'},
        {title: '主要客户'},
        {title: '主要分供方及产品名称'},
        {title: '联系人与用户', required: true},
        {title: '相关附件', required: true},
        {title: '财务大数'},
        {title: '财务数据'},
      ],
      mainContentTitle: '',
      showRequiredSymobl: true,
      current: 1,
      checkCode: 123,
      showNextButton: true,
      showTemporaryStorageButton: true
    }
  },
  methods: {
    handleStepBarClick(index, title, required) {
      this.current = index
      this.mainContentTitle = title
      this.showRequiredSymobl = required
    },
    handleNextButtonClick() {

    },
    handleTemporaryStorageButtonClick() {

    }
  }
}
</script>

<style scoped lang="scss">
.register-page {
  position: relative;

  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;

        & + & {
          padding: 0 25px;
        }
      }

      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
  }

  .main-box {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 110px);

    .main-content {
      flex: 1;
    }
  }

  .step-bar {
    margin-top: 50px;
  }
}

.required {
  color: red;
  font-size: 12px;
}

</style>