<template>
  <div>
    <div class="monthlyHeader">
      <span class="versionNum">版本号</span>
      <iSelect
        class="versionSelect"
        :placeholder="$t('partsprocure.PLEENTER')"
        v-model="version"
        @change="changeVersion"
      >
        <el-option
          :value="item"
          :label="item"
          v-for="(item, index) in versionList"
          :key="index"
        ></el-option>
      </iSelect>
      <icon class="refreshIcon" symbol name="icontabdingweiicon" />
      <span class="refresh">刷新</span>
      <span class="refreshTime">刷新日期：2021.01.31</span>
      <iButton @click="saveAsList">{{ $t("上传清单") }}</iButton>
      <iButton @click="saveAsList">{{ $t("保存") }}</iButton>
      <iButton @click="saveAsList">{{ $t("保存为新版本") }}</iButton>
      <iButton @click="saveAsList">{{ $t("下载清单") }}</iButton>
    </div>
    <iCard class="margin-top20">
      <div class="cardTop">
        <div class="yearlyPlan">
          <span class="planTitle">2021月度计划</span>
          <span class="totalText">Total:</span>
          <span class="refresh">720.0</span>
          <span class="unitText margin-left20"
            >{{ $t("LK_DANWEI") }}: {{ $t("LK_BAIWANYUAN") }}</span
          >
        </div>
        <div class="legend">
          <div>CSE</div>
          <div>CSI</div>
          <div>CSM</div>
          <div>CSP</div>
          <div>CSX</div>
          <div>BU-B</div>
          <span class="unitText margin-right20">
            {{ $t("LK_DANWEI") }}: {{ $t("LK_BAIWANYUAN") }}
          </span>
        </div>
        <div class="tab-box">
          <icon
            v-if="tabIndex === 0"
            class="icon"
            symbol
            name="icontabdingweiicon"
          />
          <div
            @click="tabClick(0)"
            class="margin-right20"
            :class="tabIndex === 0 ? 'tabOn' : 'tabItem'"
          >
            当年付款计划
          </div>
          <icon
            v-if="tabIndex === 1"
            class="icon"
            symbol
            name="icontabdingweiicon"
          />
          <div
            @click="tabClick(1)"
            :class="tabIndex === 1 ? 'tabOn' : 'tabItem'"
          >
            次年付款计划
          </div>
        </div>
      </div>

      <div id="echart"></div>
    </iCard>
  </div>
</template>

<script>
import { iSelect, iButton, iCard, icon } from "rise";
import echarts from "@/utils/echarts";
import tableTitle from "./components/data";

export default {
  components: {
    iSelect,
    iButton,
    iCard,
    icon,
  },
  data() {
    return {
      version: "20210101-V1",
      versionList: ["20210101-V1", "20210101-V2"],
      tabIndex: 0, //柱状图tab
    };
  },
  methods: {
    changeVersion() {},
    saveAsList() {},
    tabClick(index) {
      if (this.tabIndex === index) {
        return;
      }
      this.tabIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.monthlyHeader {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .versionSelect {
    width: 200px;
    margin: 0 20px;
  }

  .versionNum {
    font-size: 16px;
  }

  .refreshIcon {
    margin-left: 30px;
    margin-right: 10px;
  }

  .refreshTime {
    flex: 1;
    font-size: 14px;
    margin-left: 20px;
  }

  .monthlyCard {
    // height: calc(100% - 210px);
    height: 500px;
  }
}

.refresh {
  font-size: 16px;
  color: $color-blue;
  font-weight: bold;
}

#echart {
  width: 100%;
  height: 200px;
  background-color: grey;
}

.cardTop {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.legend {
  font-size: 12px;
  font-weight: bold;

  div {
    display: inline-block;
    margin-right: 20px;

    &::before {
      content: "";
      display: inline-block;
      margin-right: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #0040be;
    }

    &:nth-of-type(2) {
      &::before {
        background-color: #6073ff;
      }
    }

    &:nth-of-type(3) {
      &::before {
        background-color: #0053ef;
      }
    }

    &:nth-of-type(4) {
      &::before {
        background-color: #3c7eff;
      }
    }

    &:nth-of-type(5) {
      &::before {
        background-color: #54a6ed;
      }
    }

    &:nth-of-type(6) {
      &::before {
        background-color: #8bd2ff;
      }
    }
  }
}

.yearlyPlan {
  flex: 1;
}

.tab-box {
  display: flex;
  align-items: center;
}

.tabOn {
  cursor: pointer;
  color: $color-blue;
  font-weight: bold;
  font-size: 18px;
}

.tabItem {
  cursor: pointer;
  color: $color-black;
  opacity: 0.42;
  font-size: 14px;
}

.icon {
  height: 18px;
  margin-right: 10px;
}

.planTitle {
  font-size: 16px;
  font-weight: bold;
}

.totalText {
  font-size: 14px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 5px;
}

.unitText {
  font-size: 14px;
  color: #aeb4bb;
}
</style>