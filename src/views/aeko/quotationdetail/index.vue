<template>
  <iPage class="quotationdetail">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language("AEKOHAO", "AEKO号") }}：{{ "AE19221" }}</span>
      <div class="floatright">
        <iButton>{{ language("TIJIAO", "提交") }}</iButton>
        <logButton class="margin-left20" @click="log" />
        <span class="margin-left20">
					<icon symbol name="icondatabaseweixuanzhong" class="font18" />
				</span>
      </div>
    </div>

    <iCard class="info" :title="language('JICHUXINXI', '基础信息')">
      <iFormGroup :key="$index" :row="4" inline>
        <iFormItem v-for="item in infoItems" :key="item.props" :label="language(item.key, item.name)">
          <iText>{{ "Empty" }}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <iCard class="margin-top20">
      <tableList
        lang
        class="table"
        :selection="false"
        :tableTitle="tableTitle"
        :tableData="tableListData">
        <template #e="scope">
          <el-popover
            placement="top"
            trigger="hover"
            :disabled="scope.row.e === scope.row.d">
            <template>
              <p>{{ language("YUANCHENGYUNFANGSHI", "原承运方式") }}：{{ language("ZIYUN", "自运") }}（{{ language("HUO", "或") }}{{ language("CHENGYUN", "承运")  }}）</p>
              <p>{{ language("XINCHENGYUNFANGSHI", "新承运方式") }}：{{ language("CHENGYUN", "承运") }}（{{ language("HUOZHE", "或者") }}{{ language("ZIYUN", "自运")  }}）</p>
            </template>
            <template #reference>
              {{ scope.row.e }}
              <icon v-if="scope.row.e !== scope.row.d" symbol name="iconzengjiacailiaochengben_lan" class="font15 rotate180" />
            </template>
          </el-popover>
        </template>
      </tableList>
    </iCard>

    <iTabsList class="margin-top20" type="card" v-model="currentTab" :before-leave="tabLeaveBefore" @tab-click="tabChange">
      <el-tab-pane v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.name">
        <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" />
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iButton, icon, iCard, iFormGroup, iFormItem, iText, iTabsList } from "rise"
import logButton from "./components/logButton" // ../../quotationdetail/components/logButton
import tableList from "./components/tableList" // ../../quotationdetail/components/tableList
import aPriceChange from "./components/aPriceChange"
import mouldInvestmentChange from "./components/mouldInvestmentChange"
import developmentFee from "./components/developmentFee"
import damages from "./components/damages"
import sampleFee from "./components/sampleFee"
import { infoItems, tableTitle } from "./components/data"

export default {
  components: { iPage, iButton, icon, iCard, iFormGroup, iFormItem, iText, iTabsList, logButton, tableList, aPriceChange, mouldInvestmentChange, developmentFee, damages, sampleFee },
  data() {
    return {
      infoItems,
      tableTitle,
      tableListData: [{ a: "10", b: "12", e: "100.00" }],
      currentTab: "aPriceChange",
      tabs: [
        { label: "A价变动(含分摊)", name: "aPriceChange", key: "AJIABIANDONGHANFENTAN", components: [ "aPriceChange" ] },
        { label: "模具投资变动", name: "mouldInvestmentChange", key: "MUJUTOUZIBIANDONG", components: [ "mouldInvestmentChange" ] },
        { label: "开发费", name: "developmentFee", key: "KAIFAFEI", components: [ "developmentFee" ] },
        { label: "终⽌费", name: "damages", key: "ZHONGZHIFEI", components: [ "damages" ] },
        { label: "样件费", name: "sampleFee", key: "YANGJIANFEI", components: [ "sampleFee" ] },
      ],
    }
  },
  methods: {
    // 日志
    log() {},
    tabLeaveBefore(active) {
      // if (this.saveStatus) {
      //   iMessageBox("当前内容暂未保存，您是否要离开？")
      //   .then(() => {
      //     this.saveStatus = false
      //     this.currentTab = active
      //   })

      //   return false
      // }
    },
    tabChange() {}
  }
}
</script>

<style lang="scss" scoped>
.quotationdetail {
  .info {
    ::v-deep .cardHeader {
      padding: 20px 40px;
      justify-content: space-between;

      .title {
        font-size: 18px;
        color: #131523;
        font-weight: bold;
      }
    }

    ::v-deep .cardBody {
      padding: 0 40px;
    }

    ::v-deep .el-form-item__label {
      width: 140px;
      font-size: 16px;
    }
  }

  ::v-deep .el-table {
    .el-table__body-wrapper {
      min-height: initial !important;  
    }

    &::before {
      background: transparent;
    }
  }

  .rotate180 {
    transform: rotate(180deg);
  }
}
</style>