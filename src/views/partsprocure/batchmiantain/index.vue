<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2023-02-17 18:44:11
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 零件采购项目批量维护界面
 * @FilePath: \front-sourcing\src\views\partsprocure\batchmiantain\index.vue
-->

<template>
  <iPage
    class="batchmiantain"
    v-permission.auto="
      PARTSPROCURE_BATCHMIANTAIN_INDEXPAGE | 批量维护零件采购项目
    "
  >
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language("LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU", "批量维护零件采购项目")
      }}</span>
      <div class="floatright">
        <!-- 供应商创建定点申请单 -->
        <createNomiappBtn
          v-if="
            partProjTypes.JINLINGJIANHAOGENGGAI == this.$route.query.businessKey
          "
          :datalist="selectTableData"
        ></createNomiappBtn>
        <iButton
          @click="save('partSrcProjec')"
          :loading="saveButchLoading"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRMJLJH | 保存按钮
          "
          >{{ language("LK_QUERENJINGLINGJHAOJLJHBG", "保存") }}
        </iButton>
        <!-- 	<iButton @click="creatFs" v-permission="PARTSPROCURE_BATCHMIANTAIN_GENERATEFSNUMBER">
					{{ $t("LK_SHENGCHENGFSHAO") }}
				</iButton> -->
        <creatFsGsNr
          :projectItems="selectTableData"
          keys="purchaseProjectId"
          @refresh="getTableListFn"
        ></creatFsGsNr>
        <!-- <startProject :startItems='selectTableData' keys='purchaseProjectId' v-permission="PARTSPROCURE_BATCHMIANTAIN_STARTINQUIRY"></startProject> -->
        <iButton
          @click="back"
          v-permission.auto="PARTSPROCURE_BATCHMIANTAIN_SAVE | 返回按钮"
          >{{ language("LK_FANHUI", "返回") }}</iButton
        >
      </div>
    </div>
    <iSearch
      class="margin-bottom20"
      :title="language('LK_CAIGOUXIANGMUXINXI', '采购项目信息')"
      tabCard
    >
      <el-form>
        <el-form-item
          :label="
            language('LK_LINGJIANCAIGOUXIANGMULEIXING', '零件采购项目类型')
          "
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_PARTSPROCURETYPE | 零件采购项目类型
          "
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="batch.type"
          >
            <el-option
              :value="item.code"
              :label="item.name"
              :disabled="item.disabled"
              v-for="(item, index) in filterProjectList(
                fromGroup.PART_PROJECT_TYPE,
                $route.query.businessKey
              )"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          :label="language('LK_LINIEBUMEN', 'LINIE部门')"
          v-permission.auto="PARTSPROCURE_BATCHMIANTAIN_LINIEDEPT | LINIE部门"
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="batch.linieDept"
            @change="handleChangeByLinieDept"
          >
            <el-option
              :value="item.deptNum"
              :label="item.deptNum"
              v-for="(item, index) in fromGroup.LINIE_DEPT"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          label="LINIE"
          v-permission.auto="PARTSPROCURE_BATCHMIANTAIN_LINIE | LINIE"
        >
          <iSelect
            :placeholder="
              language('LK_QINGXIANXUANZELINIEBUMEN', '请先选择LINIE部门')
            "
            v-model="linie"
            value-key="code"
          >
            <el-option
              :value="item"
              :label="item.name"
              v-for="(item, index) in fromGroup.LINIE"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          :label="language('LK_LINGJIANLEIXING', '零件类型')"
          v-permission.auto="PARTSPROCURE_BATCHMIANTAIN_PARTTYPE | 零件类型"
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="batch.partType"
            :disabled="isDisabled"
          >
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.SPT"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          v-if="
            [partProjTypes.GSCOMMONSOURCING, partProjTypes.GSLINGJIAN].includes(
              batch.type
            )
          "
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_CHEXINXIANGMU | 车型项目
          "
          :label="language('LK_CHEXING', '车型')"
        >
          <iSelect
            key="carTypeModel"
            ref="carTypeModelSelect"
            :filterable="true"
            v-model="batch.carTypeModel"
            multiple
            collapse-tags
          >
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="item in fromGroup.CAR_TYPE"
              :key="item.id"
            >
            </el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          v-else
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_CHEXINXIANGMU | 车型项目
          "
          :label="language('LK_CHEXINGXIANGMU', '车型项目')"
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="carTypeProject"
            value-key="id"
          >
            <el-option
              :value="item"
              :label="item.name"
              v-for="(item, index) in fromGroup.CAR_TYPE_PRO"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          :label="language('LK_CAIGOUGONGCHANG', '采购工厂')"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPFACTORY | 采购工厂
          "
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="batch.procureFactory"
            :disabled="isDisabled"
          >
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.PURCHASE_FACTORY"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          :label="language('LK_DANWEI', '价格单位')"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPUNIT | 价格单位
          "
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="batch.unit"
            :disabled="isDisabled"
          >
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.UNIT"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          :label="language('LK_CFKONGZHIYUAN', 'CF控制员')"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPCFCONTROLLER | CF控制员
          "
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="batch.cfController"
            :disabled="isDisabled"
          >
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in fromGroup.CF_CONTROL"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          v-show="batch.type == partProjTypes.DBLINGJIAN"
          :label="language('LK_HUOBI', '货币')"
        >
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="batch.currencyCode"
          >
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.CURRENCY_TYPE"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_SOPRIQI', 'SOP日期') + ':'">
          <iDatePicker
            v-model="batch.sopDate"
            type="date"
          ></iDatePicker>
        </el-form-item>
      </el-form>
      <template slot="button">
        <iButton
          @click="save('partSrcProjec')"
          :loading="saveButchLoading"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPCONFIRM | 确认按钮
          "
          >{{ language("LK_QUEREN", "确认") }}
        </iButton>
        <iButton
          @click="reset"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPRESET | 重置按钮
          "
          >{{ language("LK_ZHONGZHI", "重置") }}
        </iButton>
      </template>
    </iSearch>
    <iSearch
      class="margin-bottom20"
      :title="language('LK_GONGYISHEZHI', '工艺设置')"
      tabCard
      icon
    >
      <!-- LK_CAILIAOZUGONGYISHEZHI -->
      <el-form>
        <el-form-item
          :label="language('LK_CAILIAOZUSHAIXUAN', '材料组筛选')"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPCATEGORYCHOOSE | 材料组筛选
          "
          ><!-- LK_CAILIAOZU -->
          <iSelect
            :placeholder="language('LK_QINGXUANZE', '请选择')"
            v-model="categoryObj"
            @change="changeSelect"
            value-key="categoryId"
          >
            <el-option
              :value="item"
              :label="item.categoryName"
              v-for="item in category"
              :key="item.categoryId"
              :disabled="category.length!=1"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          :label="language('LK_GONGYIZUXUANDING', '工艺组选定')"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPSTUFFCHOOSE | 工艺组选定
          "
          ><!-- LK_GONGYI -->
          <iSelect
            :placeholder="
              language('LK_QINGXUANZHEXIANCAILIAOZU', '请选择先材料组')
            "
            v-model="stuff"
            value-key="stuffCode"
          >
            <el-option
              :value="item"
              :label="item.stuffName"
              v-for="(item, index) in stuffArr"
              :key="index"
            >
            </el-option>
          </iSelect>
        </el-form-item>
      </el-form>
      <template slot="button">
        <iButton
          :loading="stuffLoading"
          @click="save"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPCONFIRM | 确认按钮
          "
        >
          {{ language("LK_QUEREN", "确认") }}
        </iButton>
        <iButton
          @click="resetStuff"
          v-permission.auto="
            PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPRESET | 重置按钮
          "
        >
          {{ language("LK_ZHONGZHI", "重置") }}
        </iButton>
      </template>
    </iSearch>
    <!---------------------------------------------------------------------->
    <!----------------------------仅零件变更--------------------------------->
    <!---------------------------------------------------------------------->
    <onlyPartsChange
      @updateCategoryGroup="updateCategoryGroup"
      v-if="isOnlyPartNumChange"
      ref="onlyPartsChange"
      v-permission.auto="PARTSPROCURE_BATCHMIANTAIN_ONLYCHANGE | 仅零件变更"
      @handleSelectionChange="handleSelectionChange"
    ></onlyPartsChange>
    <!---------------------------------------------------------------------->
    <!----------------------------非仅零件变更-------------------------------->
    <!---------------------------------------------------------------------->
    <outputPlan
      v-else
      v-permission.auto="PARTSPROCURE_BATCHMIANTAIN_OUTPUTLINE | 零件产量计划"
      ref="outputPlan"
      class="margin-bottom20"
      @handleSelectionChange="handleSelectionChange"
      @updateCategoryGroup="updateCategoryGroup"
    />
  </iPage>
</template>
<script>
import { iPage, iButton, iSearch, iSelect, iDatePicker, iMessage } from "rise";
import outputPlan from "./components/outputPlan";
import { batchUpdateStuff, updateProcureButch } from "@/api/partsprocure/home";
import { getCartypeDict } from "@/api/partsrfq/home";
import onlyPartsChange from "./components/onlyPartsChange";
import {
  getStuffByCategory,
  dictkey,
  purchasingDept,
  purchasingLiline, getCarTypeSop,
} from "@/api/partsprocure/editordetail";
import { selectDictByRootKeys } from "@/api/dictionary";
import { creatFsGsNr, createNomiappBtn } from "@/components";
import { translateDataForService } from "../editordetail/components/data";
import { filterProjectList } from "@/utils";
import { partProjTypes } from "@/config";
export default {
  components: {
    iPage,
    iButton,
    iSearch,
    iSelect,
    iDatePicker,
    outputPlan,
    creatFsGsNr,
    createNomiappBtn,
    onlyPartsChange,
  },
  data() {
    return {
      partProjTypes,
      fromGroup: {},
      category: [], //材料组数据
      stuffArr: [], //工艺组数据
      batch: {
        carTypeProjectId: null, //车型项目编号–同上关联
        carTypeProjectZh: null, //车型项目
        carTypeModel:null,  // 车型
        categoryCode: null, //材料组
        categoryName: null, //材料名称
        cfController: null, //CF控制员
        linieDept: null, //LINIE部门
        linieDeptName: "", // LINIE部门名称
        linieName: null, //采购人名称
        linieNum: null, //采购员编号–同上关联
        partType: null, //零件类型
        procureFactory: null, //采购工厂
        stuffCode: null, //工艺组code
        stuffId: null, //工艺组id
        stuffName: null, //工艺组名称
        type: this.$route.query.businessKey, //零件采购项目类型
        unit: "PC", //单位
        purchaseProjectIds: [], //采购项目id
        categoryId: null, // 材料组id
        sopDate: null, // sop日期
      },
      stuff: {},
      categoryObj: {},
      linie: {}, //专业采购员
      carTypeProject: {}, //车型项目
      selectTableData: [],
      startLoding: false,
      purchaseProjectIds: [],
      saveButchLoading: false,
      stuffLoading: false,
      isDisabled: false,
    };
  },
  created() {
    this.getDict()
    this.getProcureGroup();
    this.getCartypeDict();
    this.purchasingDept();
    this.getCarTypeSop();
    this.purchaseProjectIds = this.$route.query.ids;
    partProjTypes.JINLINGJIANHAOGENGGAI == this.$route.query.businessKey
      ? (this.isDisabled = true)
      : (this.isDisabled = false);
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
    // 仅零件号变更
    isOnlyPartNumChange(){
      return partProjTypes.JINLINGJIANHAOGENGGAI === this.$route.query.businessKey
    }
  },
  methods: {
    filterProjectList(a=[], b) {
      /*
      * 不能直接过滤,因为外面行数据会携带涨价零件code进来,直接过滤会显示code
      * 所以这里改用disabled禁用涨价零件下拉项
      * */
      // return filterProjectList(a, b).filter(item=>![partProjTypes.ZHANGJIALINGJIAN].includes(item.code));
      return filterProjectList(a, b).map(item=>{
        if([partProjTypes.ZHANGJIALINGJIAN].includes(item.code)){
          item.disabled = true
        }
        return item
      });
    },
    //获取上方group信息
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          Object.keys(res.data).forEach((key) => {
            if (!['LINIE_DEPT','LINIE','CAR_TYPE_PRO'].includes(key)) {
              this.$set(this.fromGroup, key, res.data[key]);
            }
          });
        }
      });
    },
    // 获取零件类型字典
    getDict() {
      selectDictByRootKeys([
        { keys: "SPT" }, // 寻源零件类型，去除总成类型
      ]).then((res) => {
        if (res.code == 200) {
          Object.keys(res.data || {}).forEach((key) => {
            this.fromGroup = Object.assign({}, this.fromGroup, {
              [key]: Array.isArray(res.data[key]) ? res.data[key] : [],
            });
          });
        }
      });
    },
    
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict({isValid: true})
        .then((res) => {
          this.fromGroup["CAR_TYPE"] = res.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取车型项目
    getCarTypeSop() {
      getCarTypeSop({isValid: true}).then((res) => {
        if (res.code == 200) {
          this.$set(this.fromGroup, 'CAR_TYPE_PRO', Array.isArray(res.data) ? res.data.map((item) => ({
              code: item.cartypeProCode,
              id: item.id,
              name: item.cartypeProName,
            }))
            : [])
        }
      });
    },
    // 查询fliter数据
    getGroupList(key) {
      if (this.fromGroup.length > 0) {
        let obj = this.fromGroup.find((items) => items.type == key);
        if (!obj) return [];
        return obj.list;
      }
    },
    // 更新材料组值域
    updateCategoryGroup(group) {
      this.categoryObj = {};
      this.resetStuff();
      this.category = group;
    },
    // 获取工艺组数据
    changeSelect(val) {
      let data = {
        categoryId: val.categoryId,
      };
      this.batch.categoryId = val.categoryId;
      getStuffByCategory(data).then((res) => {
        this.stuffArr = res.data || [];
      });
    },
    handleSelectionChange(e) {
      this.selectTableData = e;
      if (
        partProjTypes.JINLINGJIANHAOGENGGAI == this.$route.query.businessKey
      ) {
        this.batch.purchaseProjectIds = this.selectTableData.map(
          (item) => item.id
        );
      } else {
        this.batch.purchaseProjectIds = this.selectTableData.map(
          (item) => item.purchaseProjectId
        );
      }
      this.oldProjectRelations = e.map((r) => {
        return {
          ...translateDataForService(r.oldFsnrGsnrNum),
          ...{ purchasingProjectId: r.id },
        };
      });
    },
    purchasingDept() {
      purchasingDept().then((r) => {
        this.fromGroup["LINIE_DEPT"] = r.data || [];
      });
    },
    handleChangeByLinieDept(value) {
      this.linie = null;
      this.batch.linieDeptName = value;
      this.getLinie(value);
    },
    getLinie(id) {
      if (!id) return;
      purchasingLiline(id).then((r) => {
        this.$set(this.fromGroup, "LINIE", r.data || []);
      });
    },
    // 修改采购项目详情和
    save(type) {
      if (this.batch.purchaseProjectIds.length == 0)
        return iMessage.warn(
          this.language(
            "LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU",
            "请选择需要修改的零件采购项目"
          )
        );
      if (type === "partSrcProjec") {
        this.updateProcureButch();
      } else {
        this.updateStuff();
      }
    },
    // 重置采购信息数据
    reset() {
      for (let i in this.batch) {
        if (i == "purchaseProjectIds") {
          this.batch[i] = [];
        } else if (i == "type") {
          break;
        } else {
          this.batch[i] = "";
        }
      }
      this.linie = {};
      this.carTypeProject = {};
    },
    // 重置stuff数据
    resetStuff() {
      this.categoryObj = {};
      this.stuff = {};
      this.stuffArr = [];
    },
    //back
    back() {
      this.$router.go(-1);
    },
    //批量修改材料组工艺组
    updateStuff() {
      this.stuffLoading = true;
      batchUpdateStuff({
        operator: this.userInfo.id,
        ids: this.batch.purchaseProjectIds,
        categoryCode: this.categoryObj.categoryCode
          ? this.categoryObj.categoryCode
          : "",
        categoryId: this.categoryObj.categoryId
          ? this.categoryObj.categoryId
          : "",
        categoryName: this.categoryObj.categoryName
          ? this.categoryObj.categoryName
          : "",
        stuffCode: this.stuff.stuffCode,
        stuffId: this.stuff.id,
        stuffName: this.stuff.stuffName,
      })
        .then((res) => {
          this.stuffLoading = false;
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            // 刷新下侧表格组件数据
            if(this.isOnlyPartNumChange){
              this.$refs.onlyPartsChange.getDataList()
            }else{
              this.$refs.outputPlan.getData()
            }
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch((err) => {
          this.stuffLoading = false;
          iMessage.error(err.desZh);
        });
    },
    //批量保存零件采购项目信息
    updateProcureButch() {
      this.saveButchLoading = true;
      const factoryItems = this.fromGroup.PURCHASE_FACTORY.find(
        (items) => items.code == this.batch.procureFactory
      );
      const updateInfo = {
        carTypeProjectId: this.carTypeProject.id, // 由code替换为id
        carTypeProjectZh: this.carTypeProject.name,
        carTypeProjectNum: this.carTypeProject.code,
        cfController: this.batch.cfController,
        linieDept: this.batch.linieDept,
        linieDeptName: this.batch.linieDeptName,
        linieName: this.linie?.name,
        linieId: this.linie?.code,
        partProjectType: this.batch.type,
        carTypeModel: this.batch.carTypeModel,
        partType: this.batch.partType,
        currencyCode: this.batch.currencyCode,
        procureFactory: this.batch.procureFactory,
        procureFactoryName: factoryItems ? factoryItems.name : null,
        unit: this.batch.unit,
        sopDate: this.batch.sopDate,
        procureFactoryId: factoryItems ? factoryItems.id : null,
      };
      if (updateInfo.carTypeModel != undefined) {
        let temData =
          (this.fromGroup.CAR_TYPE &&
            Array.isArray(this.fromGroup.CAR_TYPE) &&
            this.fromGroup["CAR_TYPE"].filter((item) => {
              return updateInfo.carTypeModel.indexOf(item.id) > -1;
            })) ||
          [];
        updateInfo["cartypes"] = temData;
      }
      updateInfo["oldProjectRelations"] = this.oldProjectRelations;
      const ids = this.batch.purchaseProjectIds;
      updateProcureButch({ updateInfo: updateInfo, ids: ids })
        .then((res) => {
          this.saveButchLoading = false;
          if (res.result === true) {
            iMessage.success(this.language("LK_XIUGAICHENGGONG", "修改成功"));
            // 刷新下侧表格组件数据
            if (this.isOnlyPartNumChange) {
              this.$refs.onlyPartsChange.getDataList();
            } else {
              this.$refs.outputPlan.getData();
            }
          } else {
            iMessage.error(res.desZh);
          }
        })
        .catch((err) => {
          this.saveButchLoading = false;
          iMessage.error(this.language("LK_XIUGAICHENGGONG", "修改失败"));
        });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
