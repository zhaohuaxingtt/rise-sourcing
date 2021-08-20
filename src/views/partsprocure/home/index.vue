<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 09:50:42
 * @LastEditTime: 2021-08-19 12:28:28
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目建立首页。
 * @FilePath: \rise\src\views\partsprocure\home\index.vue
-->
<template>
  <iPage class="partsprocureHome">
    <!-- <el-tabs v-model="tab" class="tab"> -->
      <!-- <el-tab-pane lazy :label="language('LK_XUNYUANZHIHANG','寻源')" name="source"> -->
        <div>
          <!-- <div class="margin-bottom33">
            <iNavMvp @change="change" lang right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div> -->
          <div class="topMenu">
            <iNavMvp class="margin-bottom30" :list="list" lang @change="change" :lev="1" routerPage></iNavMvp>
            <iNavMvp class="margin-bottom30" lang @change="change"  right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div>
          <!------------------------------------------------------------------------>
          <!--                  search 搜索模块                                   --->
          <!------------------------------------------------------------------------>
          <iSearch
            class="margin-bottom20"
            @sure="getTableListFn()"
            @reset="reset"
            :resetKey="PARTSPROCURE_RESET"
            :searchKey="PARTSPROCURE_CONFIRM"
          >
            <el-form>
              <el-form-item :label="language('partsprocure.PARTSPROCUREPARTNUMBER','零件号')">
                <iInput
                  :placeholder="language('partsprocure.PARTSPROCURE','请输入零件号，多个逗号分隔')"
                  v-model="form['partNum']"
                  v-permission="PARTSPROCURE_PARTNUMBER"
                ></iInput>
              </el-form-item>
              <el-form-item :label="language('partsprocure.PARTSPROCUREPARTNAMEZH','零件名（中）')">
                <iInput
                  :placeholder="
                    language('partsprocure.PLEENTER','请输入') +
                    language('partsprocure.PARTSPROCUREPARTNAMEZH','零件名（中）')
                  "
                  v-model="form['partNameZh']"
                  v-permission="PARTSPROCURE_PARTNAMEZH"
                ></iInput>
              </el-form-item>
              <el-form-item
                :label="language('partsprocure.PARTSPROCUREFSNFGSNFSPNR','零件采购项目号')"
              >
                <iInput
                  :placeholder="
                    language('partsprocure.PLEENTER','请输入') +
                    language('partsprocure.PARTSPROCUREFSNFGSNFSPNR','零件采购项目号')
                  "
                  v-model="form['fsnrGsnrNum']"
                  v-permission="PARTSPROCURE_FSINPUT"
                >
                </iInput>
              </el-form-item>
              <el-form-item
                :label="language('partsprocure.PARTSPROCUREINQUIRYBUYER','询价采购员')"
              >
                <iInput
                  :placeholder="
                    language('partsprocure.PLEENTER','请输入') +
                    language('partsprocure.PARTSPROCUREINQUIRYBUYER','询价采购员')
                  "
                  v-model="form['buyerName']"
                  v-permission="PARTSPROCURE_INQUIRYBUYER"
                >
                </iInput>
              </el-form-item>
              <el-form-item :label="language('partsprocure.PARTSPROCURELINIE','LINIE')">
                <iInput
                  :placeholder="
                    language('partsprocure.PLEENTER','请输入') +
                    language('partsprocure.PARTSPROCURELINIE','LINIE')
                  "
                  v-model="form['linieName']"
                  v-permission="PARTSPROCURE_LINIEINPUT"
                ></iInput>
              </el-form-item>
              <el-form-item :label="language('partsprocure.PARTSPROCUREPARTSTATUS','零件状态')">
                <iSelect
                  :placeholder="
                    language('partsprocure.CHOOSE','请选择') +
                    language('partsprocure.PARTSPROCUREPARTSTATUS','零件状态')
                  "
                  v-model="form['status']"
                  v-permission="PARTSPROCURE_PARTSTATUS"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.code"
                    :label="item.name"
                    v-for="(item, index) in fromGroup['RFQ_PART_STATUS_CODE_TYPE']"
                    :key="index"
                  ></el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="language('partsprocure.PARTSPROCUREVEHICLECATEGORIES','车型大类')"
              >
                <iSelect
                  :placeholder="
                    language('partsprocure.CHOOSE','请选择') +
                    language('partsprocure.PARTSPROCUREVEHICLECATEGORIES','车型大类')
                  "
                  v-model="form['carTypeCategory']"
                  v-permission="PARTSPROCURE_VEHICLECATEGORIES"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.code"
                    :label="item.name"
                    v-for="(item, index) in fromGroup['CARTYPE_CATEGORY']"
                    :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="language('partsprocure.PARTSPROCUREMODELPROJECT','车型项目')"
              >
                <iSelect
                  :placeholder="
                    language('partsprocure.CHOOSE','请选择') +
                    language('partsprocure.PARTSPROCUREMODELPROJECT','车型项目')
                  "
                  v-model="form['carTypeProjectZh']"
                  v-permission="PARTSPROCURE_MODELPROJECT"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.code"
                    :label="item.name"
                    v-for="(item, index) in fromGroup['CAR_TYPE_PRO']"
                    :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="language('partsprocure.PARTSPROCUREPARTITEMTYPE','零件项目类型')"
              >
                <iSelect
                  :placeholder="
                    language('partsprocure.CHOOSE','请选择') +
                    language('partsprocure.PARTSPROCUREPARTITEMTYPE','零件项目类型')
                  "
                  v-model="form['partProjectType']"
                  v-permission="PARTSPROCURE_PARTITEMTYPE"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.code"
                    :label="item.name"
                    v-for="(item, index) in fromGroup['PPT']"
                    :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
              <el-form-item
                :label="language('partsprocure.PARTSPROCUREPURCHASINGFACTORY','采购工厂')"
              >
                <iSelect
                  :placeholder="
                    language('partsprocure.CHOOSE','请选择') +
                    language('partsprocure.PARTSPROCUREPURCHASINGFACTORY','采购工厂')
                  "
                  v-model="form['procureFactory']"
                  v-permission="PARTSPROCURE_PURCHASINGFACTORY"
                >
                  <el-option
                    value=""
                    :label="language('all','全部') | capitalizeFilter"
                  ></el-option>
                  <el-option
                    :value="item.code"
                    :label="item.name"
                    v-for="(item, index) in fromGroup['FAC']"
                    :key="index"
                  >
                  </el-option>
                </iSelect>
              </el-form-item>
            </el-form>
          </iSearch>
          <iCard>
            <!------------------------------------------------------------------------>
            <!--                  table模块，向外入参表格数据，表头                    --->
            <!------------------------------------------------------------------------>
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">
                {{ language("partsprocure.PARTSPROCURENEWPROCUREMENTPROJECT",'零件采购项目管理') }}</span
              >
              <div class="floatright">
                <!-- 手工采购项目创建 -->
                <iButton @click="openCreateParts">{{ language("SHOUGONGCAIGOUXIANGMUCHUANGJIAN", "手工采购项目创建") }}</iButton>
                <iButton :loading='zpLoading' @click="openDiologChangeItems" v-permission="PARTSPROCURE_TRANSFER">{{ language("partsprocure.PARTSPROCURETRANSFER",'转派') }} </iButton>
                <creatFsGsNr :projectItems="selectTableData" @refresh="getTableListFn" v-permission="PARTSPROCURE_GENERATEFSBUTTON" ></creatFsGsNr>
                <cancelProject :backItems='selectTableData'  @refresh="getTableListFn" v-permission="PARTSPROCURE_CANCELPROCUREMENTITEMS"></cancelProject>
                <iButton @click="openBatchmiantain" v-permission="PARTSPROCURE_BATCHMAINTENANCE">{{ language("partsprocure.PARTSPROCUREBATCHMAINTENANCE",'批量维护') }}</iButton>
                <startProject :startItems='selectTableData' v-permission="PARTSPROCURE_STARTINQUIRY"></startProject>
              </div>
            </div>
            <tablelist
              :tableData="tableListData"
              :tableTitle="tableTitle"
              :tableLoading="tableLoading"
              @handleSelectionChange="handleSelectionChange"
              @openPage="openPage"
              :activeItems="'partNum'"
            >
            </tablelist>
            <!------------------------------------------------------------------------>
            <!--                  表格分页                                          --->
            <!------------------------------------------------------------------------>
            <iPagination
              v-update
              @size-change="handleSizeChange($event, getTableListFn)"
              @current-change="handleCurrentChange($event, getTableListFn)"
              background
              :current-page="page.currPage"
              :page-sizes="page.pageSizes"
              :page-size="page.pageSize"
              :layout="page.layout"
              :total="page.totalCount"
            />
          </iCard>
          <!------------------------------------------------------------------------>
          <!--                  转派弹出框                                         --->
          <!------------------------------------------------------------------------>
          <changeItems
            v-model="diologChangeItems"
            @sure="sureChangeItems"
            :title="language('LK_LINGJIANCAIGOUXIANGMUZHUANPAI','零件采购项目转派')"
          ></changeItems>
        </div>
      <!-- </el-tab-pane> -->
    <!-- </el-tabs> -->
  </iPage>
</template>
<script>
import {
  iPage,
  iButton,
  iCard,
  iMessage,
  iPagination,
  iSearch,
  iInput,
  iSelect,
  iNavMvp
} from "rise";
import { pageMixins } from "@/utils/pageMixins";
import {cancelProject,creatFsGsNr,startProject} from '@/components'
import { tableTitle, form,validateProjectConfig } from "./components/data";
import tablelist from "../../partsign/home/components/tableList";
import { getTabelData,changeProcure} from "@/api/partsprocure/home";
import changeItems from "../../partsign/home/components/changeItems";
import filters from "@/utils/filters";
import { clickMessage,TAB } from "@/views/partsign/home/components/data"
import {selectDictByKeyss,procureFactorySelectVo} from '@/api/dictionary'
import {getCartypeDict} from "@/api/partsrfq/home";
// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iButton,
    iCard,
    tablelist,
    changeItems,
    iPagination,
    iNavMvp,
    iSearch,
    iInput,
    iSelect,
    creatFsGsNr,
    cancelProject,
    startProject
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      diologChangeItems: false,
      form: JSON.parse(JSON.stringify(form)),
      fromGroup: [],
      diologBack: false, //退回
      tab: "source",
      list:TAB,
      zpLoading:false,
      cancelLoading:false
    };
  },
  computed: {
    projectIds() {
      return this.getPurchasePrjectId();
    },
    ...mapState(["navList"]),
    ...mapActions(["updateNavList"])
  },
  created() {
    this.getTableListFn();
    this.getProcureGroup();
    this.updateNavList
  },
  methods: {
    //获取采购工厂
    procureFactorySelectVo(){
      procureFactorySelectVo().then(res=>{
        this.fromGroup['FAC'] = res.data
      })
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict().then(res => {
        this.fromGroup['CARTYPE_CATEGORY'] = res.data
      }).catch(err=>{
        console.log(err)  
      })
    },
    // 跳转详情
    openPage(item) {
      this.$router.push({
        path: "/sourcing/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
          businessKey:item.partProjectType //新增业务标识。
        },
      });
    },
    //获取上方group信息
    // part_status --零件状态
    // cartype_category --车型类型
    // cartype_project_zh --车型项目
    // part_preject_type --零件项目类型
    // procure_factory   --采购工厂
    // purchase_clause   --采购条款
    // part_type         --零件类型
    // unit              --单位
    // pay_clause        --支付条款
    // currency_id       --币种
    // linie_dept        --Linie部门A
    // linie_name        --Line
    // cf_controller     --Cf控制员
    // is_common_sourcing--Sourcing
    // buyer_name        --询价采购员
    getProcureGroup() {
      let types = [
        "RFQ_PART_STATUS_CODE_TYPE",
        "CAR_TYPE_PRO",
        "PPT"
      ];
      selectDictByKeyss(types).then((res) => {
        this.fromGroup = res.data;
        this.getCartypeDict();
        this.procureFactorySelectVo()
      });
    },
    //转派
    openDiologChangeItems() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDELINGJIANCAIGOUXIANGMU",
            '抱歉，您当前还未选择您需要转派的零件采购项目！'
          )
        );
      this.diologChangeItems = true;
    },
    //确认转派弹窗值。
    sureChangeItems(val) {
      this.zpLoading = true
      let transfer = {
        buyerName: val.nameZh,
        buyerId: val.id,
        ids: this.getPurchasePrjectId(),
      };
      this.diologChangeItems = false;
      changeProcure(transfer)
        .then((res) => {
          if (res.data) {
            iMessage.success(this.language("LK_ZHUANPAICHENGGONG",'转派成功'));
            this.getTableListFn();
            this.zpLoading = false
          } else {
            iMessage.error(res.desZh);
            this.zpLoading = false
          }
        })
        .catch(() => {
          this.zpLoading = false
          this.diologChangeItems = false;
        });
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    // 获取零件采购项目相关信息
    getTableListFn() {
      this.tableLoading = true;
      this.form.size = this.page.pageSize;
      this.form.current = this.page.currPage;
      // 获取预置的参数
      const acceptKeys = ['status','buyerName','linieName']
      Object.keys(this.$route.query).forEach(key => {
          acceptKeys.includes(key) && (this.$set(this.form, `${ key }`, this.$route.query[key]))
      })
      getTabelData(this.form)
        .then((res) => {
          this.tableLoading = false;
          this.page.totalCount = res.total || 0
          this.tableListData = res.data;
        })
        .catch(() => (this.tableLoading = false));
    },
    // 重置搜索条件
    reset() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.getTableListFn();
    },

    /*********************************************************************
     *                          end
     *********************************************************************/
    // 获取选中零件号ID
    getPurchasePrjectId() {
      let purchaseProjectId = this.selectTableData.map((res) => res.id);
      return purchaseProjectId;
    },
    // 跳转批量维护
    openBatchmiantain() {
      if (this.selectTableData.length == 0){
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGPILIANGWEIHUDEXIANGMU",
            '抱歉，您当前还未选择您需要生批量维护的项目！'
          )
        );
      }
      if(!this.selectTableData.every(i=>i.partProjectType == this.selectTableData[0].partProjectType)){
        return iMessage.warn(
          this.language(
            "BAOQIANNINXUANZHEDELINGJIANCAIGXIANGMUZHONGB",
            '抱歉，您当前选择的零件采购项目类型不相同，不能一起批量维护！'
          )
        );
      }
      this.$router.push({
        path: "/sourcing/partsprocure/batchmiantain",
        query: {
          ids: this.getPurchasePrjectId(),
          businessKey:this.selectTableData[0].partProjectType
        },
      });
    },
    openCreateParts() {
      this.$router.push({ path: "/sourcing/createparts/home" })
    },
    // 通过待办数跳转
    clickMessage

  }
};
</script>
<style lang="scss" scoped>
.checkBox {
  position: relative;
  top: 30px;
  left: -70px;
}

.partsprocureHome {
  position: relative;
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
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
}
</style>
