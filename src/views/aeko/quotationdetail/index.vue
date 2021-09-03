<template>
  <iPage class="quotationdetail" v-permission.auto="AEKO_QUOTATION_DETAIL|报价单">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language("AEKOHAO", "AEKO号") }}：{{ aekoCode }}</span>
      <div class="floatright">
        <iButton v-permission.auto="AEKO_QUOTATION_DETAIL_BUTTON_TIJIAO|提交">{{ language("TIJIAO", "提交") }}</iButton>
        <logButton class="margin-left20" @click="log" v-permission.auto="AEKO_QUOTATION_DETAIL_BUTTON_RIZHI|日志" />
        <span class="margin-left20">
					<icon symbol name="icondatabaseweixuanzhong" class="font18" />
				</span>
      </div>
    </div>

    <iCard class="info" :title="language('JICHUXINXI', '基础信息')" v-permission.auto="AEKO_QUOTATION_DETAIL_VIEW_JICHUXINXI|基础信息">
      <iFormGroup :key="$index" :row="4" inline>
        <iFormItem v-for="item in infoItems" :key="item.props" :label="language(item.key, item.name)" v-permission.dynamic.auto="item.permissionKey">
          <iText>{{ partInfo[item.props] || '-' }}</iText>
        </iFormItem>
      </iFormGroup>
    </iCard>

    <iCard class="margin-top20" v-permission.auto="AEKO_QUOTATION_DETAIL_VIEW_HUIZONG|报价汇总">
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
              <!-- 针对供应商报价可跳转 -->
              <span :class="`margin-right5 ${userInfo &&userInfo.userType&&userInfo.userType == 2 ? 'link-underline' : ''}`" @click="goToBNK">{{ scope.row.e }}</span>
              <icon v-if="scope.row.e !== scope.row.d" symbol name="iconzengjiacailiaochengben_lan" class="font15 rotate180" />
            </template>
          </el-popover>
        </template>

        <template #aprice="scope">
          <span  @click="goToBNK">11111</span>
        </template>
      </tableList>
    </iCard>

    <iTabsList class="margin-top20" type="card" v-model="currentTab" :before-leave="tabLeaveBefore" @tab-click="tabChange">
      <el-tab-pane v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.name" v-permission.dynamic.auto="tab.permissionKey">
        <template v-if="tab.name == currentTab">
          <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :partInfo="partInfo" :basicInfo="basicInfo" @getBasicInfo="getBasicInfo"/>
        </template>
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iButton, icon, iCard, iFormGroup, iFormItem, iText, iTabsList,iMessage } from "rise"
import logButton from "./components/logButton" // ../../quotationdetail/components/logButton
import tableList from "./components/tableList" // ../../quotationdetail/components/tableList
import aPriceChange from "./components/aPriceChange"
import mouldInvestmentChange from "./components/mouldInvestmentChange"
import developmentFee from "./components/developmentFee"
import damages from "./components/damages"
import sampleFee from "./components/sampleFee"
import { infoItems, tableTitle } from "./components/data"
import { 
  bnkSupplierToken,
  getQuotationInfo,
 } from '@/api/aeko/quotationdetail'


export default {
  components: { iPage, iButton, icon, iCard, iFormGroup, iFormItem, iText, iTabsList, logButton, tableList, aPriceChange, mouldInvestmentChange, developmentFee, damages, sampleFee },
  data() {
    return {
      infoItems,
      tableTitle,
      tableListData: [{ a: "10", b: "12", e: "100.00" }],
      currentTab: "aPriceChange",
      tabs: [
        { label: "A价变动(含分摊)", name: "aPriceChange", key: "AJIABIANDONGHANFENTAN", components: [ "aPriceChange" ], permissionKey: "AEKO_QUOTATION_CBD_TAB_BIANDONGZHICBD|变动值CBD" },
        { label: "模具投资变动", name: "mouldInvestmentChange", key: "MUJUTOUZIBIANDONG", components: [ "mouldInvestmentChange" ], permissionKey: "AEKO_QUOTATION_CBD_TAB_MUJUTOUZIBIANDONG|模具投资变动" },
        { label: "开发费", name: "developmentFee", key: "KAIFAFEI", components: [ "developmentFee" ], permissionKey: "AEKO_QUOTATION_CBD_TAB_KAIFAFEI|开发费" },
        { label: "终⽌费", name: "damages", key: "ZHONGZHIFEI", components: [ "damages" ], permissionKey: "AEKO_QUOTATION_CBD_TAB_ZHONGZHIFEI|终⽌费" },
        { label: "样件费", name: "sampleFee", key: "YANGJIANFEI", components: [ "sampleFee" ], permissionKey: "AEKO_QUOTATION_CBD_TAB_YANGJIANFEI|样件费" },
      ],
      aekoCode:'',
      partInfo:{},
      basicInfo:{},
    }
  },
  created(){
    this.getBasicInfo();
  },
  computed: {
      //eslint-disable-next-line no-undef
      ...Vuex.mapState({
          userInfo: state => state.permission.userInfo,
      }),
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
    // 页签切换
    tabChange() {
      this.$nextTick(() => {
        const component = this.$refs[this.currentTab][0]
        if (typeof component.init === "function") component.init()
      })
    },


    // 获取基础信息
    async getBasicInfo(){
      const {query,path} = this.$route;
      const { quotationId ='',aekoCode=""} = query;
      this.aekoCode = aekoCode;
      await getQuotationInfo(quotationId).then((res)=>{
        const {code,data={}} = res;
        if(code == 200){
          const {aekoPartInfo={},quotationPriceSummaryInfo={},supplierId=''} = data;
          this.partInfo = {
            ...aekoPartInfo,
            quotationId,
            };
          this.tableListData=[quotationPriceSummaryInfo];
          this.basicInfo = data;
          if(supplierId){
            this.$router.push({
              path,
              query:{
                ...query,
                supplierId,
              }
            })
          }

          this.$nextTick(() => {
            const component = this.$refs[this.currentTab][0]
            if (typeof component.init === "function") component.init()
          })
        }else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch((err)=>{});
    },

    // 跳转至BNK相关页面
    async goToBNK(){
      const {userInfo={}} = this;
      const {userType=null} = userInfo;
      // if(userType==1) return;

      const {basicInfo={}} = this;
      const {aekoPartInfo={},rfqId,supplierId} = basicInfo;

      
      // partProjId：零件采购项目ID
      // tmRfqId：当前报价单对应的RFQ_ID;
      // ppSupplierId：供应商id
      // ppSupplierUserId：当前登录的供应商用户id
      // token：由后端提供

      const data = {
        partProjId:aekoPartInfo.partProjId,
        tmRfqId:rfqId,
        ppSupplierId:supplierId,
        ppSupplierUserId:userInfo.id
      }
      let paramsStr = '';
      for (var i in data){
        paramsStr+=`${i}=${data[i]}&`
      }

      // partProjId    零件采购项目Id String
      // rfqId           rfqId  String
      await bnkSupplierToken({
        // partProjId:aekoPartInfo.partProjId,
        // rfqId,
        partProjId:'11',
        rfqId:'11'
      }).then((res)=>{
        if(res.code == 200){
          const link = `http://svmwt038/sol-bnk/pages/bnk/quotes/lsp-view.jsf?${paramsStr}&token=${res.data}`;
          window.open(link,'_blank');
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      });
      
    },
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