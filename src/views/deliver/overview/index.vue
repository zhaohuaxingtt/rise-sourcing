<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:06:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-06 14:01:28
 * @Description: 项目管理概览
 * @FilePath: \front-sourcing\src\views\project\overview\index.vue
-->

<template>
  <iPage class="overview">
    <projectTop />
    <search :searchList="searchList" :selectOptions="selectOptions"></search>
    <iCard
      class="margin-top20"
      v-permission.auto="
        PROJECTMGT_OVERVIEW_CARPROJECTTALBE | (项目管理 - 概览 - 表格)
      "
    >
      <template v-for="i in 3">
        <proItem
          :key="i"
          class="margin-top20"
          :tableTitle="tableTitle"
        ></proItem>
      </template>
      <!-- <tableList :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" ></tableList> -->
    </iCard>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iSearch,
  iButton,
  iDatePicker,
  iSelect,
  iMessage,
} from "rise";
import projectTop from "../components/projectHeader";
import search from "../components/search";
import proItem from "../components/proItem";
import moment from "moment";
import tableList from "./components/overviewTable";
import { getOverview, getAllProPurchaser } from "@/api/project";
import productPurchaserSelect from "@/views/project/components/commonSelect/productPurchaserSelect";
import { TAB, searchList } from "../components/data";
export default {
  components: {
    iPage,
    projectTop,
    search,
    proItem,
    iCard,
    iSearch,
    iButton,
    iDatePicker,
    iSelect,
    tableList,
    productPurchaserSelect,
  },
  data() {
    const currentYear = moment().year();
    return {
      searchList,
      selectOptions: {
        carProjectOptions: [
          {
            label: "test",
            value: 1,
          },
        ],
        deptOptions: [
          {
            label: "组1",
            value: 1,
          },
        ],
      },
      selectCarVisible: false,
      searchParams: {
        carProject: "",
      },
      carProjectOptions: [],
      purchaseOptions: [],
      tableTitle: [
        { props: "type", name: "分类", key: "" },
        { props: "csc", name: "CSC", key: "" },
        { props: "Kickoff", name: "Kickoff", key: "" },
        { props: "BF", name: "BF", key: "" },
        { props: "Data", name: "Data", key: "" },
        {
          props: "TM",
          name: "Start of serie Tool-making",
          key: "",
          width:120,
          isHeaderSetting: true,
          HeaderSettingList: [
            { key: "Start of serie", name: "Start of serie" },
            { key: "Tool-making", name: "Tool-making" },
          ],
        },
        { props: "T0", name: "T0", key: "" },
        { props: "tryout", name: "1st tryout", key: "" },
        {
          props: "Self",
          name: "Start of Self-testing",
          key: "",
          width:120,
          isHeaderSetting: true,
          HeaderSettingList: [
            { key: "Start of", name: "Start of" },
            { key: "Self-testing", name: "Self-testing" },
          ],
        },
        { props: "OTS", name: "OTS", key: "" },
        {
          props: "EM",
          name: "EM",
          key: "",
          chlidren: [
            { props: "M", name: "M", key: "" },
            { props: "D", name: "D", key: "" },
            { props: "C", name: "C", key: "" },
            { props: "G", name: "G", key: "" },
          ],
        },
      ],
      tableData: [],
      tableLoading: false,
      progressList: [
        { label: "PD", date: "pepPd", value: "pepPdWk", status: "pepPdStatus" },
        { label: "PF", date: "pepPf", value: "pepPfWk", status: "pepPfStatus" },
        { label: "KF", date: "pepKf", value: "pepKfWk", status: "pepKfStatus" },
        {
          label: "PLF",
          date: "pepPlf",
          value: "pepPlfWk",
          status: "pepPlfStatus",
        },
        { label: "BF", date: "pepBf", value: "pepBfWk", status: "pepBfStatus" },
        { label: "LF", date: "pepLf", value: "pepLfWk", status: "pepLfStatus" },
        {
          label: "VFF",
          date: "pepVff",
          value: "pepVffWk",
          status: "pepVffStatus",
        },
        {
          label: "PVS",
          date: "pepPvs",
          value: "pepPvsWk",
          status: "pepPvsStatus",
        },
        { label: "0S", date: "pepOs", value: "pepOsWk", status: "pepOsStatus" },
        {
          label: "SOP",
          date: "pepSop",
          value: "pepSopWk",
          status: "pepSopStatus",
        },
        { label: "ME", date: "pepMe", value: "pepMeWk", status: "pepMeStatus" },
      ],
      tableDataTemp: [],
    };
  },
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      permission: (state) => state.permission,
    }),
  },
  created() {
    console.log(this.$route, "this.$router");
    // 进来的时候判断是否有页面的权限 如果没有就顺延到下个月权限页面跳转
    for (var i = 0; i < TAB.length; i++) {
      if (
        TAB[i].permissionKey == "PROJECTMGT_OVERVIEW_TAB" &&
        this.permission.whiteBtnList[TAB[i].permissionKey]
      )
        break;
      else if (this.permission.whiteBtnList[TAB[i].permissionKey]) {
        this.$router.push({
          path: TAB[i].url,
        });
        break;
      }
    }
    this.getOverviewList();
  },
  methods: {
    /**
     * @Description: 根据筛选条件筛选
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleSure() {
      this.tableData = this.tableDataTemp.filter((item) => {
        let result = true;
        if (this.searchParams.carProject && result === true) {
          result = item.id === this.searchParams.carProject;
        }
        if (this.searchParams.buyerName && result === true) {
          result = item.projectPurchaser.includes(this.searchParams.buyerName);
        }
        if (this.searchParams.sopDate && result === true) {
          result =
            moment(item.sopDate).isBefore(
              moment(this.searchParams.sopDate[1]).add(1, "days")
            ) &&
            moment(item.sopDate).isAfter(
              moment(this.searchParams.sopDate[0]).subtract(1, "days")
            );
        }
        return result;
      });
    },
    /**
     * @Description: 重置
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleReset() {
      this.searchParams = {};
      this.handleSure();
    },
    /**
     * @Description: 获取节点状态
     * @Author: Luoshuang
     * @param {*} currDate
     * @param {*} beforeDate
     * @return {*}
     */
    getStatus(currDate, beforeDate) {
      if (moment(currDate).isBefore(moment())) {
        return 1;
      } else if (beforeDate) {
        if (moment(beforeDate).isBefore(moment())) {
          return 2;
        } else {
          return 3;
        }
      } else {
        return 2;
      }
    },
    /**
     * @Description: 整合节点信息
     * @Author: Luoshuang
     * @param {*} node
     * @return {*}
     */
    getNodeList(node) {
      if (node) {
        const sortNodeInYearList = this.progressList
          .reduce((accu, curr, index) => {
            if (
              curr.label !== "PD" &&
              node[curr.date] &&
              node[curr.date] !== ""
            ) {
              const week = Number(node[curr.value]?.split("KW")[1]);
              return [
                ...accu,
                {
                  ...curr,
                  year: Number(node[curr.value]?.split("-")[0]),
                  week: week,
                  season: week < 14 ? 1 : week < 27 ? 2 : week < 39 ? 3 : 4,
                  fullDate: node[curr.date],
                  left: (moment(node[curr.date]).month() % 3) * 13.3,
                },
              ];
            } else {
              return accu;
            }
          }, [])
          .sort(
            (a, b) => a.year - b.year,
            (a, b) => a.week - b.week
          );
        const nodeInYearList = sortNodeInYearList.map((item, index) => {
          return {
            ...item,
            status: this.getStatus(
              item.fullDate,
              sortNodeInYearList[index - 1]?.fullDate
            ),
          };
        });
        return nodeInYearList;
      }
      return [];
    },
    /**
     * @Description: 获取列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getOverviewList() {
      this.searchParams = {};
      this.tableLoading = true;
      getOverview()
        .then((res) => {
          if (res?.result) {
            const list = (res.data || []).map((item) => {
              const nodeList = this.getNodeList(item.pepTimeNode);
              return {
                ...item,
                nodeList: nodeList,
              };
            });
            // eslint-disable-next-line no-undef
            this.tableData = _.cloneDeep(list);
            // eslint-disable-next-line no-undef
            this.tableDataTemp = _.cloneDeep(list);
            this.carProjectOptions = (res.data || []).map((item) => {
              return {
                ...item,
                value: item.id,
                label: item.cartypeProjectZh,
              };
            });
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    /**
     * @Description: 打开配置车型项目弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    openSelectCar() {
      this.changeSelectCarVisible(true);
    },
    /**
     * @Description: 配置项目弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeSelectCarVisible(visible) {
      this.selectCarVisible = visible;
      if (!visible) {
        this.getOverviewList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  &-home {
    padding: 0 !important;
    padding-top: 10px !important;
    // height: calc(100% - 55px) !important;
    // overflow: auto !important;
  }
}
</style>