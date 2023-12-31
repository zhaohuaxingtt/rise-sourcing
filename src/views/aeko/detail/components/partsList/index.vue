<!--
 * @Author: wentliao
 * @Date: 2021-07-28 10:57:42
 * @Description: 零件清单
-->

<template>
  <div class="aeko-partsList">
    <!-- 搜索区域 -->
    <iSearch @sure="sure" @reset="reset" class="search-form">
      <el-form>
        <!-- AEKO类型为AeA显示车型，为aeko/mp显示车型项目 -->
        <el-form-item
          v-show="
            !item.showCode ||
            (item.showCode && item.showCode.includes(aekoInfo.aekoType))
          "
          v-for="(item, index) in SearchList"
          :key="'Search_aeko_partsList' + index"
          :label="language(item.labelKey, item.label)"
          v-permission.auto="item.permissionKey"
        >
          <template v-if="item.type === 'select'">
            <aeko-select
              class="multipleSelect"
              v-if="item.isNewSelect"
              :searchParams="searchParams"
              :ParamKey="item.props"
              :allOptionsData="selectOptions[item.selectOption]"
              :multiple="item.multiple"
              :clearable="item.clearable"
            />
            <iDicoptions
              v-else-if="item.isDicoptions"
              v-model="searchParams[item.props]"
              :optionKey="item.dicoptionKey"
            />
            <iSelect
              v-else
              class="multipleSelect"
              collapse-tags
              :disabled="item.disabled"
              :multiple="item.multiple"
              :clearable="item.clearable"
              :filterable="item.filterable"
              v-model="searchParams[item.props]"
              :placeholder="
                item.filterable
                  ? language('LK_QINGSHURU', '请输入')
                  : language('partsprocure.CHOOSE', '请选择')
              "
              @change="handleMultipleChange($event, item.props, item.multiple)"
              :filter-method="
                (val) => {
                  dataFilter(val, item.selectOption);
                }
              "
              @visible-change="selectVisibleChange($event, item.props)"
            >
              <el-option
                v-if="!item.noShowAll"
                value=""
                :label="language('all', '全部')"
              ></el-option>
              <el-option
                v-for="(item, index) in selectOptions[item.selectOption] || []"
                :key="index"
                :label="item.desc"
                :value="item.code"
              >
              </el-option>
            </iSelect>
          </template>
          <iMultiLineInput
            v-else-if="item.type === 'iMultiLineInput'"
            :placeholder="
              language(
                'partsprocure.PARTSPROCURE',
                '请输入零件号，多个逗号分隔'
              )
            "
            :title="language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')"
            v-model="searchParams[item.props]"
          ></iMultiLineInput>
          <iInput
            :placeholder="
              item.disabled ? '' : language('LK_QINGSHURU', '请输入')
            "
            v-else
            :disabled="item.disabled"
            v-model.trim="searchParams[item.props]"
          ></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <!-- 按钮区域 -->
      <div v-if="queryFrom != 'check'" class="floatright margin-bottom20">
        <iButton
          :disabled="btnDisabled"
          v-permission.auto="
            AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_CHEXINGBIANGEN | 车型变更
          "
          @click="changeModelProject"
        >
          {{ isAeA ? "车型变更" : "车型项目变更" }}
        </iButton>
        <template v-if="!isLinie">
          <iButton
            :disabled="btnDisabled"
            v-permission.auto="
              AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_FENPAIKESHI | 分派科室
            "
            @click="assign(null, 'commodity')"
            >{{ language("LK_AEKO_FENPAIKESHI", "分派科室") }}
          </iButton>
          <iButton
            :disabled="btnDisabled"
            v-permission.auto="
              AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_FENPAICAIGOUYUAN |
                分派采购员
            "
            @click="assign(null, 'linie')"
            >{{ language("FENPAICAIGOUYUAN", "分派采购员") }}
          </iButton>
          <!-- 非TCM导入 && 非已冻结、已通过、已撤回状态的AEKO -->
          <template v-if="isShowAddPart">
            <iButton
              :disabled="btnDisabled"
              v-permission.auto="
                AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_XINZENGLINGJIAN |
                  新增零件
              "
              @click="addParts"
              >{{ language("LK_AEKO_XINZENGLINGJIAN", "新增零件") }}
            </iButton>
            <iButton
              :disabled="btnDisabled"
              v-permission.auto="
                AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_SHANCHULINGJIAN |
                  删除零件
              "
              :loading="btnLoading.deleteParts"
              @click="deleteParts"
              >{{ language("LK_AEKO_SHANCHULINGJIAN", "删除零件") }}
            </iButton>
          </template>
          <iButton
            :disabled="btnDisabled"
            v-permission.auto="
              AEKO_DETAIL_TAB_LINGJIANQINGDAN_BUTTON_KESHITUIHUI | 科室退回
            "
            @click="back"
            >{{ language("LK_AEKO_KESHITUIHUI", "科室退回") }}
          </iButton>
        </template>
      </div>
      <!-- 表单区域 -->
      <tableList
        class="table"
        ref="tableList"
        index
        :lang="true"
        v-permissionArr="[
          'AEKO_AEKODETAIL_PARTLIST_TABLE',
          'AEKO_DETAIL_TAB_LINGJIANQINGDAN_TABLE',
        ]"
        :selection="isAekoManager || isCommodityCoordinator"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
        :handleSaveSetting="handleSaveSetting"
        :handleResetSetting="handleResetSetting"
      >
        <!-- 科室 -->
        <!-- 实际分配科室有就显示实际科室，否则就显示预设科室  表示科室是预设的 -->
        <template #linieDeptName="scoped">
          <span v-if="isLinie">{{ scoped.row.linieDeptName }}</span>
          <span v-else :class="!scoped.row.linieDeptNum ? 'isPreset' : ''">{{
            scoped.row.linieDeptNum || scoped.row.refferenceSmtNum
          }}</span>
        </template>
        <!-- linie -->
        <template #buyerName="scoped">
          <span v-if="isLinie">{{ scoped.row.buyerName }}</span>
          <span v-else :class="!scoped.row.buyerId ? 'isPreset' : ''">
            {{ isShowLine(scoped.row) }}
          </span>
        </template>
        <!-- 操作 -->
        <template #operate="scoped">
          <span
            v-if="!scoped.row.linieDeptNum && isAekoManager"
            class="link-underline"
          >
            <span v-if="btnDisabled" class="disabled">{{
              language("LK_AEKO_FENPAIKESHI", "分派科室")
            }}</span>
            <span v-else @click="assign(scoped.row, 'commodity')">{{
              language("LK_AEKO_FENPAIKESHI", "分派科室")
            }}</span>
          </span>

          <!-- coverIsSubmit:封面提交状态不能分派采购员 -->
          <span
            v-if="
              isCommodityCoordinator &&
              !scoped.row.isOperate &&
              !scoped.row.coverIsSubmit
            "
            class="link-underline"
            @click="assign(scoped.row, 'linie')"
          >
            {{ language("LK_AEKO_FENPAICAIGOUYUAN_LINE", "分派采购员") }}
          </span>
        </template>
      </tableList>
      <!-- 提示 -->
      <p class="table-tips">
        N：Neu 新增； U：Ungueltig 取消； F：Freigabe 供应商认可，沿⽤；
        A：Aenderung 修改； I：Information 信息； M：Montagetext 安装信息
      </p>
      <!-- 分页 -->
      <iPagination
        v-update
        @size-change="handleSizeChange($event, init)"
        @current-change="handleCurrentChange($event, init)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>
    <!-- 分配科室 -->
    <assignDialog
      v-if="assignVisible"
      :assignType="assignType"
      :dialogVisible="assignVisible"
      @changeVisible="changeVisible"
      @getList="getList"
      :selectItems="selectItems"
      :singleAssign="singleAssign"
      :requirementAekoId="aekoInfo.requirementAekoId"
      :linieDeptNum="selectOptions.linieDeptNumList"
      :buyerName="selectOptions.buyerName"
      :userInfo="userInfo"
    />
    <!-- 退回原因 -->
    <departBackDialog
      v-if="departBackVisible"
      :dialogVisible="departBackVisible"
      @changeVisible="changeVisible"
      @getList="getList"
      :selectItems="selectItems"
    />
    <!-- 新增零件弹窗 -->
    <addPartsDialog
      v-if="addPartskVisible"
      :dialogVisible="addPartskVisible"
      :aekoInfo="aekoInfo"
      @getList="sure"
      @changeVisible="changeVisible"
    />
    <changeModelProjectDialog
      v-if="changeModelProjectVisible"
      :tableData="selectOptions.cartypeCode"
      :dialogVisible="changeModelProjectVisible"
      @changeVisible="changeVisible"
      @updateList="updateList"
      :isAeA="isAeA"
    />
  </div>
</template>

<script>
import {
  iSearch,
  iCard,
  iSelect,
  iInput,
  iButton,
  iPagination,
  iMessage,
  iMessageBox,
  iMultiLineInput,
} from "rise";
import {
  SearchList,
  linieSearchList,
  tableTitle,
  linieQueryForm,
  linieTableTitle,
  commodityTableTitle,
  checkSearchList,
} from "./data";
// import tableList from "@/views/partsign/editordetail/components/tableList"
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { pageMixins } from "@/utils/pageMixins";
import assignDialog from "./components/assignDialog";
import departBackDialog from "./components/departBackDialog";
import addPartsDialog from "./components/addPartsDialog";
import changeModelProjectDialog from "./components/changeModelProjectDialog";
import { getAekoContentPart } from "@/api/aeko/detail";
import aekoSelect from "../../../components/aekoSelect";
import iDicoptions from "rise/web/components/iDicoptions";
import {
  getPartPage,
  deletePart,
  partListGetCartype,
  searchContentStatus,
  getPartViewList,
} from "@/api/aeko/detail/partsList.js";
import { searchBrand, searchCommodity } from "@/api/aeko/manage";
import { searchLinie } from "@/api/aeko/detail";
import { cloneDeep } from "lodash";
import { user as configUser } from "@/config";
import { roleMixins } from "@/utils/roleMixins";
import { setLogMenu } from "@/utils";
export default {
  name: "partsList",
  mixins: [pageMixins, roleMixins, tableSortMixins],
  components: {
    iSearch,
    iCard,
    iSelect,
    iInput,
    iButton,
    tableList,
    iPagination,
    assignDialog,
    departBackDialog,
    aekoSelect,
    addPartsDialog,
    changeModelProjectDialog,
    iDicoptions,
    iMultiLineInput,
  },
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
      permission: (state) => state.permission,
    }),
    btnDisabled() {
      // 已撤销的AEKO不允许操作
      return this.aekoInfo.aekoStatus == "CANCELED";
    },
    // 非TCM导入 && 非已冻结、已通过、已撤回状态的AEKO
    isShowAddPart() {
      const { aekoInfo = {} } = this;
      const { aekoStatus = "", sourse = "" } = aekoInfo;
      return (
        aekoStatus !== "FROZEN" &&
        aekoStatus !== "PASS" &&
        aekoStatus !== "CANCELED"
      );
      // return  sourse!=='TCM' && aekoStatus!=='FROZEN' && aekoStatus!=='PASS' && aekoStatus!=='CANCELED';
    },
    isAeA() {
      return this.aekoInfo.aekoType == "AeA";
    },
  },
  props: {
    currentTab: { type: String },
    aekoInfo: {
      type: Object,
      default: () => {},
    },
  },

  created() {
    const roleList = this.roleList;
    this.isAekoManager = roleList.includes("AEKOGLY"); // AKEO管理员
    this.isCommodityCoordinator = roleList.includes("AEKOKSXTDY"); // Aeko科室协调员
    this.isLinie = roleList.includes("LINIE") || roleList.includes("ZYCGY"); // 专业采购员

    // 判断下多角色情况 若多角色时就判断url的跳转来源
    const { query } = this.$route;
    const { from = "" } = query;
    this.queryFrom = from;
    from == "manage"
      ? setLogMenu("AEKO管理-详情页-零件清单")
      : setLogMenu("AEKO表态-详情页-零件清单");
    const roleArr = [
      this.isAekoManager,
      this.isCommodityCoordinator,
      this.isLinie,
    ].filter((item) => item == true);
    if (roleArr.length > 1) {
      if (from == "manage") {
        this.isLinie = false;
      } else if (from == "stance") {
        this.isAekoManager = false;
        this.isCommodityCoordinator = false;
      }
    }
    this.getSearchList();

    if (this.isLinie) {
      this.SearchList = linieSearchList;
      this.tableTitle = linieTableTitle;
      this.searchParams = cloneDeep(linieQueryForm);
    } else if (this.isCommodityCoordinator) {
      this.SearchList = SearchList;
      this.tableTitle = commodityTableTitle;
    } else if (this.isAekoManager) {
      this.SearchList = SearchList;
      this.tableTitle = tableTitle;
    } else {
      this.SearchList = [];
      this.tableTitle = [];
    }

    // 当AEKO查看跳转过来的时候
    if (from == "check") {
      this.tableTitle = linieTableTitle;
      this.SearchList = checkSearchList;
      this.isLinie = true;
      this.isAekoManager = false;
      this.isCommodityCoordinator = false;
      this.searchParams = {
        ...cloneDeep(linieQueryForm),
        brand: [""],
      };
    } else if (from == "manage") {
      if (this.isCommodityCoordinator) {
        this.SearchList = SearchList;
        this.tableTitle = commodityTableTitle;
      } else {
        this.SearchList = SearchList;
        this.tableTitle = tableTitle;
      }
    } else if (from == "stance") {
      this.SearchList = linieSearchList;
      this.tableTitle = linieTableTitle;
      this.searchParams = cloneDeep(linieQueryForm);
    } else {
      this.SearchList = [];
      this.tableTitle = [];
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      SearchList: [],
      searchParams: {
        brand: "",
        cartypeCode: [""],
        cartype: [""],
        linieDeptNumList: [""],
        sendStatus: "",
        buyerName: "",
      },
      selectOptions: {
        cartypeCode: [],
        buyerName: [],
        cartype: [],
        linieDeptNumList: [],
        contentStatusList: [],
        sendStatus: [
          { desc: "未分派", code: "1" },
          { desc: "已分派", code: "2" },
        ],
      },
      selectOptionsCopy: {
        cartypeCode: [],
        buyerName: [],
        cartype: [],
        linieDeptNumList: [],
        contentStatusList: [],
      },
      selectItems: [],
      loading: false,
      tableListData: [],
      tableTitle: [],
      assignVisible: false,
      singleAssign: [],
      assignType: "",
      btnLoading: {
        deleteParts: false,
      },
      departBackVisible: false,
      isAekoManager: false,
      isCommodityCoordinator: false,
      isLinie: false,
      addPartskVisible: false,
      changeModelProjectVisible: false,
      queryFrom: null,
    };
  },
  methods: {
    sure() {
      // 判断零件号查询至少大于等于3位或为空的情况下才允许查询
      if (
        this.searchParams.partNum &&
        this.searchParams.partNum.trim().length < 3
      ) {
        this.loading = false;
        return iMessage.warn(
          this.language(
            "LK_AEKO_LINGJIANHAOZHISHAOSHURU3WEI",
            "查询零件号不足,请补充至3位或以上"
          )
        );
      }

      this.page.currPage = 1;
      this.init();
    },
    reset() {
      this.page.currPage = 1;

      if (this.isLinie) {
        this.searchParams = cloneDeep(linieQueryForm);
        // this.searchParams.linieDeptNum = this.userInfo.deptDTO.nameEn
        // this.searchParams.buyerName = this.userInfo.nameZh
      } else {
        this.searchParams = {
          brand: "",
          cartypeCode: [""],
          cartype: [""],
          linieDeptNumList: [""],
        };
      }
      const { query } = this.$route;
      const { from = "" } = query;
      // 若从aeko查看跳转过来
      if (from == "check") {
        this.searchParams = {
          ...cloneDeep(linieQueryForm),
          brand: [""],
        };
      }

      this.init();
    },

    handleSelectionChange(val) {
      this.selectItems = val;
    },
    changeVisible(type, visible) {
      this[type] = visible;
      this.singleAssign = [];
    },
    updateList() {
      this.getSearchList();
      this.getList();
    },
    // 获取列表
    async getList() {
      this.loading = true;
      const { query } = this.$route;
      const { requirementAekoId = "" } = query;
      const { page, searchParams, aekoInfo = {} } = this;
      const {
        linieDeptNumList = [],
        brand,
        partNum,
        partNameZh,
        buyerName,
        sendStatus,
      } = searchParams;
      let carTypeCodeList = [];
      // 车型和车型项目同一个code参数 单独处理下
      if (aekoInfo && aekoInfo.aekoType) {
        if (aekoInfo.aekoType == "AeA") {
          // 车型
          carTypeCodeList = searchParams.cartype;
        } else if (["Aeko", "MP"].includes(aekoInfo.aekoType)) {
          // 车型项目
          carTypeCodeList = searchParams.cartypeCode;
        }
      }

      const data = {
        requirementAekoId,
        current: page.currPage,
        size: page.pageSize,
        brand,
        partNum,
        partNameZh,
        buyerName,
        sendStatus,
        carTypeCodeList:
          carTypeCodeList.length == 1 && carTypeCodeList[0] === ""
            ? []
            : carTypeCodeList,
        linieDeptNumList:
          linieDeptNumList.length == 1 && linieDeptNumList[0] === ""
            ? []
            : linieDeptNumList,
      };
      getPartPage(data)
        .then((res) => {
          this.loading = false;
          const { code, data } = res;
          if (code == 200) {
            const { records = [], total } = data;
            records.map((item, index) => {
              item.lineIndex = index + 1;
            });
            this.tableListData = records;
            this.page.totalCount = total;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 获取搜索框下拉数据
    getSearchList() {
      // 车型
      // getSearchCartype().then((res)=>{
      // const {code,data} = res;
      // if(code ==200){
      //     data.map((item)=>{
      //         item.desc = item.name;
      //         item.lowerCaseLabel = typeof item.name === "string" ? item.name.toLowerCase() : item.name
      //     })
      //     this.selectOptions.cartype = data.filter((item)=>item.name) || [];
      //     this.selectOptionsCopy.cartype = data.filter((item)=>item.name) || [];
      // }else{
      //     iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
      // }
      // })

      // 车型项目 && 车型
      const { query } = this.$route;
      const { requirementAekoId = "" } = query;
      partListGetCartype(requirementAekoId).then((res) => {
        const { code, data } = res;
        if (code == 200) {
          data.map((item) => {
            item.desc = item.name;
            item.lowerCaseLabel =
              typeof item.name === "string"
                ? item.name.toLowerCase()
                : item.name;
          });
          this.selectOptions.cartypeCode = data;
          this.selectOptionsCopy.cartypeCode = data;
          this.selectOptions.cartype = data.filter((item) => item.name) || [];
          this.selectOptionsCopy.cartype =
            data.filter((item) => item.name) || [];
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
      //品牌
      searchBrand().then((res) => {
        const { code, data = [] } = res;
        if (code == 200 && data) {
          data.map((item) => {
            item.desc = item.code;
          });
          this.selectOptions.brand = data;
          this.selectOptionsCopy.brand = data;
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });

      // LINIE  只能看见本科室的LINIE
      const { deptDTO = {} } = this.userInfo;
      const deptId = deptDTO.id;
      searchLinie({ tagId: configUser.LINLIE, deptId }).then((res) => {
        const { code, data } = res;
        if (code == 200) {
          data.map((item) => {
            item.desc = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
            item.code = this.$i18n.locale === "zh" ? item.nameZh : item.nameEn;
          });
          this.selectOptions.buyerName = data;
          this.selectOptionsCopy.buyerName = data;
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
      // 科室
      searchCommodity().then((res) => {
        const { code, data } = res;
        if (code == 200) {
          data.map((item) => {
            item.desc = item.deptNum;
            item.code = item.id;
          });
          this.selectOptions.linieDeptNumList = data;
          this.selectOptionsCopy.linieDeptNumList = data;
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });

      // 只有AEKO查看跳转过来的时候需要展示这个搜索字段
      const { from = "" } = query;
      if (from == "check") {
        // 内容状态下拉数据获取
        searchContentStatus().then((res) => {
          const { code, data = [] } = res;
          if (code == 200) {
            data.map((item) => {
              if (item.code == "EMPTY") {
                item.desc = "(空)";
              }
            });
            this.selectOptions.contentStatusList = data;
            this.selectOptionsCopy.contentStatusList = data;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        });
      }
    },
    // 删除零件
    deleteParts() {
      const { selectItems } = this;
      if (!selectItems.length) {
        iMessage.warn(
          this.language(
            "createparts.QingXuanZeZhiShaoYiTiaoShuJu",
            "请选择至少一条数据"
          )
        );
      } else {
        const h = this.$createElement;
        this.$confirm(
          this.language("LK_TIPS_SHIFOUSHANCHUGAILINGJIAN", "是否删除该零件？"),
          this.language("LK_AEKO_SHANCHULINGJIAN", "删除零件"),
          {
            confirmButtonText: this.language("nominationLanguage.Yes", "是"),
            cancelButtonText: this.language("nominationLanguage.No", "否"),
            cancelButtonClass: "confirmCancelBtn",
            customClass: "aekoMessageBoxDeleteParts",
          }
        )
          .then(() => {
            this.btnLoading.deleteParts = true;
            const aekoPartIdList = selectItems.map((item) => item.aekoPartId);
            const data = {
              aekoPartIdList,
              requirementAekoId: this.aekoInfo.requirementAekoId,
            };
            deletePart(data)
              .then((res) => {
                this.btnLoading.deleteParts = false;
                const { code } = res;
                if (code == 200) {
                  iMessage.success(
                    this.language("LK_CAOZUOCHENGGONG", "操作成功")
                  );
                  this.getList();
                } else {
                  iMessage.error(
                    this.$i18n.locale === "zh" ? res.desZh : res.desEn
                  );
                }
              })
              .catch((err) => {
                this.btnLoading.deleteParts = false;
              });
            console.log("是");
          })
          .catch(() => {
            console.log("否");
          });
      }
    },
    // 分配科室/采购员
    assign(row = null, type) {
      console.log(row);
      const { selectItems } = this;

      this.assignType = type;

      // 判断是否是单一分派
      if (row) {
        this.singleAssign = [row];
        this.assignVisible = true;
      } else {
        // 批量分派
        if (!selectItems.length) {
          return iMessage.warn(
            this.language(
              "createparts.QingXuanZeZhiShaoYiTiaoShuJu",
              "请选择至少一条数据"
            )
          );
        } else {
          // 判断是否是单一分派
          if (selectItems.length == 1) {
            // 判断所选项是否已分派
            if (type == "commodity") {
              // 科室分派
              const arr = selectItems.filter((item) => item.linieDeptNum);
              if (arr.length) {
                const tips =
                  arr[0].lineIndex +
                  this.language(
                    "LK_AEKO_HANGYIFENPAIKESHIWUFAJINXINGCHONGXINFENPAI",
                    "行已分派科室，无法进行重新分派"
                  );
                return iMessage.warn(tips);
              } else {
                this.assignVisible = true;
              }
            } else {
              // 采购员分派
              const arr = selectItems.filter(
                (item) => item.isOperate || item.coverIsSubmit
              );
              if (arr.length) {
                const tips =
                  arr[0].lineIndex +
                  this.language(
                    "LK_AEKO_HANGLINGJIANYIBIAOTAILINIEWUFAXIUGAI",
                    "行零件已表态,linie无法修改"
                  )+this.$t("若要继续执行请点击确认");

                  iMessageBox(tips).then(() => {
                    this.assignVisible = true;
                  });
              } else {
                this.assignVisible = true;
              }
            }
            this.singleAssign = selectItems;
          } else {
            // 批量分派
            if (type == "commodity") {
              // 科室分派
              const arr = selectItems.filter((item) => item.linieDeptNum);
              if (arr.length) {
                const arrIndex = arr.map((item) => item.lineIndex);
                const tips =
                  arrIndex.toString() +
                  this.language(
                    "LK_AEKO_HANGYIFENPAIKESHIWUFAJINXINGCHONGXINFENPAI",
                    "行已分派科室，无法进行重新分派"
                  );
                iMessage.warn(tips);
              } else {
                this.assignVisible = true;
              }
            } else {
              // 采购员分派
              const arr = selectItems.filter(
                (item) => item.isOperate || item.coverIsSubmit
              );
              if (arr.length) {
                const tips =
                  arr[0].lineIndex +
                  this.language(
                    "LK_AEKO_HANGLINGJIANYIBIAOTAILINIEWUFAXIUGAI",
                    "行零件已表态,linie无法修改"
                  )+this.$t("若要继续执行请点击确认");

                iMessageBox(tips).then(() => {
                  this.assignVisible = true;
                });
              } else {
                this.assignVisible = true;
              }
            }
          }
        }
      }
    },
    init() {
      const { query } = this.$route;
      const { from = "" } = query;
      if (from == "check") {
        this.fromCheckGetPartList();
      } else if (this.isLinie) this.getAekoContentPart();
      else this.getList();
    },
    // AEKO查看跳转过来的查询列表
    fromCheckGetPartList() {
      this.loading = true;

      const { searchParams, aekoInfo = {} } = this;
      const {
        linieDeptNumList = [],
        brand,
        partNum,
        partNameZh,
        buyerName,
        contentStatusList,
      } = searchParams;
      let carTypeCodeList = [];
      // 车型和车型项目同一个code参数 单独处理下
      if (aekoInfo && aekoInfo.aekoType) {
        if (aekoInfo.aekoType == "AeA") {
          // 车型
          carTypeCodeList = searchParams.cartype;
        } else if (["Aeko", "MP"].includes(aekoInfo.aekoType)) {
          // 车型项目
          carTypeCodeList = searchParams.cartypeCode;
        }
      }

      getPartViewList({
        carTypeCodeList:
          carTypeCodeList.length == 1 && carTypeCodeList[0] === ""
            ? []
            : carTypeCodeList,
        linieDeptNumList:
          linieDeptNumList.length == 1 && linieDeptNumList[0] === ""
            ? []
            : linieDeptNumList,
        contentStatusList:
          contentStatusList.length == 1 && contentStatusList[0] === ""
            ? []
            : contentStatusList,
        requirementAekoId: this.aekoInfo.requirementAekoId,
        partNum,
        partNameZh,
        buyerName,
        brandList: brand.length == 1 && brand[0] === "" ? [] : brand,
        current: this.page.currPage,
        size: this.page.pageSize,
      })
        .then((res) => {
          if (res.code == 200) {
            const records = Array.isArray(res.data) ? res.data : [];
            records.map((item, index) => {
              item.lineIndex = index + 1;
            });
            this.tableListData = records;
            this.page.totalCount = res.total || 0;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    // linie 获取列表
    getAekoContentPart() {
      this.loading = true;

      const { searchParams, aekoInfo = {} } = this;
      const {
        linieDeptNumList = [],
        brand,
        partNum,
        partNameZh,
        buyerName,
      } = searchParams;
      let carTypeCodeList = [];
      // 车型和车型项目同一个code参数 单独处理下
      if (aekoInfo && aekoInfo.aekoType) {
        if (aekoInfo.aekoType == "AeA") {
          // 车型
          carTypeCodeList = searchParams.cartype;
        } else if (["Aeko", "MP"].includes(aekoInfo.aekoType)) {
          // 车型项目
          carTypeCodeList = searchParams.cartypeCode;
        }
      }

      getAekoContentPart({
        // ...this.searchParams,
        carTypeCodeList:
          carTypeCodeList.length == 1 && carTypeCodeList[0] === ""
            ? []
            : carTypeCodeList,
        linieDeptNumList:
          linieDeptNumList.length == 1 && linieDeptNumList[0] === ""
            ? []
            : linieDeptNumList,
        requirementAekoId: this.aekoInfo.requirementAekoId,
        partNum,
        partNameZh,
        buyerName,
        brand,
        // buyerName: undefined,
        // linieDeptNum: undefined,
        current: this.page.currPage,
        size: this.page.pageSize,
      })
        .then((res) => {
          if (res.code == 200) {
            const records = Array.isArray(res.data) ? res.data : [];
            records.map((item, index) => {
              item.lineIndex = index + 1;
            });
            this.tableListData = records;
            this.page.totalCount = res.total || 0;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    // 多选处理
    handleMultipleChange(value, key, multiple) {
      // 单选不处理
      if (!multiple) {
        if (!value) {
          const { selectOptionsCopy = {} } = this;
          this.$set(this.selectOptions, key, selectOptionsCopy[key]);
          return;
        } else {
          return;
        }
      }

      if (!value[value.length - 1]) {
        this.$set(this.searchParams, key, [""]);
      } else {
        this.$set(
          this.searchParams,
          key,
          this.searchParams[key].filter((item) => item || item === 0)
        );
      }
    },

    // 判断是否勾选项
    async isSelectItem(type = false) {
      const { selectItems } = this;
      if (!selectItems.length) {
        iMessage.warn(
          this.language(
            "createparts.QingXuanZeZhiShaoYiTiaoShuJu",
            "请选择至少一条数据"
          )
        );
        return false;
      } else {
        if (type) {
          return true;
        } else {
          const confirmInfo = await this.$confirm(
            this.language("submitSure", "您确定要执行提交操作吗？")
          );
          return confirmInfo == "confirm";
        }
      }
    },

    // 科室退回
    async back() {
      const isNext = await this.isSelectItem(true);
      if (isNext) this.changeVisible("departBackVisible", true);
    },

    // 是否展示linie
    isShowLine(row) {
      const { buyerName, refferenceByuerName, refferenceSmtNum, linieDeptNum } =
        row;
      // 若已分派采购员就直接展示
      if (buyerName) {
        return buyerName;
      } else {
        // 若没有分派采购员 已分派科室与实际分派科室不一致时不展示linie
        return linieDeptNum && linieDeptNum != refferenceSmtNum
          ? ""
          : refferenceByuerName;
      }
    },

    // 模糊搜索处理
    dataFilter(val, props) {
      // 去除前后空格
      const trimVal = val.trim();
      const { selectOptionsCopy = {} } = this;
      if (props == "buyerName") {
        this.searchParams.buyerName = val;
      }
      if (trimVal) {
        // 人名要特殊处理 --- 可搜索英文去除大小写
        if (props == "buyerName") {
          const list = selectOptionsCopy[props].filter((item) => {
            if (
              !!~item.nameZh.indexOf(trimVal) ||
              (item.nameEn &&
                !!~item.nameEn.toUpperCase().indexOf(trimVal.toUpperCase()))
            ) {
              return true;
            }
          });
          this.selectOptions[props] = list;
        } else {
          const list = selectOptionsCopy[props].filter((item) => {
            if (
              ~item.desc.indexOf(trimVal) ||
              !!~item.desc.toUpperCase().indexOf(trimVal.toUpperCase())
            ) {
              return true;
            }
          });
          this.selectOptions[props] = list;
        }
      } else {
        this.selectOptions[props] = selectOptionsCopy[props];
      }
    },

    // 变更车型项目
    changeModelProject() {
      this.changeModelProjectVisible = true;
    },
    // 新增零件
    addParts() {
      this.addPartskVisible = true;
    },

    selectVisibleChange(visible, key) {
      if (!visible) {
        this.selectOptions[key] = this.selectOptionsCopy[key];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aeko-partsList {
  .search-form {
    ::v-deep .el-date-editor .el-range__close-icon {
      display: block;
      width: 10px;
    }
  }
  .table-tips {
    color: #485465;
    margin-top: 10px;
  }
  .isPreset {
    color: rgba($color: #5c6577, $alpha: 0.5);
  }
  .multipleSelect {
    ::v-deep .el-tag {
      position: relative;

      &:last-of-type {
        padding-right: 5px;
      }

      &:first-of-type {
        padding-right: 10px;
      }

      .el-select__tags-text {
        display: inline-block;
        max-width: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .el-tag__close {
        top: -25%;
      }
    }
    ::v-deep .el-input__inner {
      height: 35px !important;
    }
  }
  .link-underline {
    .disabled {
      color: #acb8cf;
    }
  }
}
</style>
<style lang="scss" >
.aekoMessageBoxDeleteParts {
  ::v-deep .confirmCancelBtn {
    float: right;
    margin-left: 15px;
  }
}
</style>
