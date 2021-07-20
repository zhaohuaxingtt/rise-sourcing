<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2021-07-20 19:10:25
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目批量维护界面
 * @FilePath: \front-web\src\views\partsprocure\batchmiantain\index.vue
-->

<template>
  <iPage
    class="batchmiantain"
    v-permission="PARTSPROCURE_BATCHMIANTAIN_INDEXPAGE"
  >
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language("LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU",'批量维护零件采购项目')
      }}</span>
      <div class="floatright">
        <iButton @click="back" v-permission="PARTSPROCURE_BATCHMIANTAIN_SAVE">{{
          language("LK_FANHUI",'返回')
        }}</iButton>
        <!-- 	<iButton @click="creatFs" v-permission="PARTSPROCURE_BATCHMIANTAIN_GENERATEFSNUMBER">
					{{ $t("LK_SHENGCHENGFSHAO") }}
				</iButton> -->
        <creatFs
          :projectIds="batch.purchaseProjectIds"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_GENERATEFSNUMBER"
        ></creatFs>
        <iButton
          @click="start"
          :loading="startLoding"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_STARTINQUIRY"
        >
          {{ language("LK_QIDONGXUNJIA",'启动询价') }}
        </iButton>
      </div>
    </div>
    <iSearch
      class="margin-bottom20"
      :title="language('LK_CAIGOUXIANGMUXINXI','采购项目信息')"
      tabCard
    >
      <el-form>
        <el-form-item :label="language('LK_LINGJIANCAIGOUXIANGMULEIXING','零件采购项目类型')">
          <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="batch.type">
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.PART_PROJECT_TYPE"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_LINIEBUMEN','LINIE部门')">
          <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="batch.linieDept">
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.LINIE_DEPT"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="LINIE">
          <iSelect
            :placeholder="language('LK_QINGXUANZE','请选择')"
            v-model="linie"
            value-key="id"
          >
            <el-option
              :value="item"
              :label="item.name"
              v-for="(item, index) in fromGroup.LINIE"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_LINGJIANLEIXING','零件类型')">
          <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="batch.partType">
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.PART_TYPE"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CHEXINGXIANGMU','车型项目')">
          <iSelect
            :placeholder="language('LK_QINGXUANZE','请选择')"
            v-model="cartypeProject"
            value-key="code"
          >
            <el-option
              :value="item"
              :label="item.name"
              v-for="(item, index) in fromGroup.CAR_TYPE_PRO"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CAIGOUGONGCHANG','采购工厂')">
          <iSelect
            :placeholder="language('LK_QINGXUANZE','请选择')"
            v-model="batch.procureFactory"
          >
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.PURCHASE_FACTORY"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_DANWEI','价格单位')">
          <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="batch.unit">
            <el-option
              :value="item.code"
              :label="item.name"
              v-for="(item, index) in fromGroup.UNIT"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_CFKONGZHIYUAN','CF控制员')">
          <iSelect
            :placeholder="language('LK_QINGXUANZE','请选择')"
            v-model="batch.cfController"
          >
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in fromGroup.CF_CONTROL"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
      <template slot="button">
        <iButton
          @click="save('partSrcProjec')"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRM"
          >{{ language("LK_QUEREN",'确认') }}
        </iButton>
        <iButton
          @click="reset"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASERESET"
          >{{ language("LK_ZHONGZHI",'重置') }}
        </iButton>
      </template>
    </iSearch>
    <iSearch
      class="margin-bottom20"
      :title="language('LK_GONGYISHEZHI','工艺设置')"
      tabCard
      icon
    >
    <!-- LK_CAILIAOZUGONGYISHEZHI -->
      <el-form>
        <el-form-item :label="language('LK_CAILIAOZUSHAIXUAN','材料组筛选')"><!-- LK_CAILIAOZU -->
          <iSelect
            :placeholder="language('LK_QINGXUANZE','请选择')"
            v-model="categoryObj"
            @change="changeSelect"
            value-key="categoryId"
          >
            <el-option
              :value="item"
              :label="item.categoryName"
              v-for="item in category"
              :key="item.categoryId"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_GONGYIZUXUANDING','工艺组选定')"><!-- LK_GONGYI -->
          <iSelect
            :placeholder="language('LK_QINGXUANZHEXIANCAILIAOZU','请选择先材料组')"
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
          @click="save"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPCONFIRM"
        >
          {{ language("LK_QUEREN",'确认') }}
        </iButton>
        <iButton
          @click="resetStuff"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPRESET"
        >
          {{ language("LK_ZHONGZHI",'重置') }}
        </iButton>
      </template>
    </iSearch>
    <outputPlan
      ref="outputPlan"
      class="margin-bottom20"
      @handleSelectionChange="handleSelectionChange"
      @updateCategoryGroup="updateCategoryGroup"
    />
  </iPage>
</template>
<script>
import { iPage, iButton, iSearch, iSelect, iMessage } from "@/components";
import outputPlan from "./components/outputPlan";
import { changeProcure, getProcureGroup } from "@/api/partsprocure/home";
import { insertRfq } from "@/api/partsrfq/home";
import {
  materialGroupByLinie,
  getStuffByCategory,
  putMaterialGroup,
  dictkey,
} from "@/api/partsprocure/editordetail";
import { getPageGroup } from "@/api/partsign/home";
import creatFs from "../home/components/creatFs";
export default {
  components: {
    iPage,
    iButton,
    iSearch,
    iSelect,
    outputPlan,
    creatFs,
  },
  data() {
    return {
      fromGroup: [],
      category: [], //材料组数据
      stuffArr: [], //工艺组数据
      batch: {
        cartypeProjectNum: "", //车型项目编号–同上关联
        cartypeProjectZh: "", //车型项目
        categoryCode: "", //材料组
        categoryName: "", //材料名称
        cfController: "", //CF控制员
        linieDept: "", //LINIE部门
        linieName: "", //采购人名称
        linieNum: "", //采购员编号–同上关联
        partType: "", //零件类型
        procureFactory: "", //采购工厂
        stuffCode: "", //工艺组code
        stuffId: "", //工艺组id
        stuffName: "", //工艺组名称
        type: "", //零件采购项目类型
        unit: "", //单位
        purchaseProjectIds: [], //采购项目id
        categoryId: '', // 材料组id
      },
      stuff: {},
      categoryObj: {},
      linie: {}, //专业采购员
      cartypeProject: {}, //车型项目
      selectTableData: [],
      startLoding: false,
    };
  },
  created() {
    this.getProcureGroup();
    // this.getMaterialGroupByLinie();
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
  },
  methods: {
    //获取上方group信息
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.fromGroup = res.data;
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
    // 获取材料组数据
    // getMaterialGroupByLinie() {
    //   let data = {
    //     LinieId: this.$store.state.permission.userInfo.id,
    //   };
    //   materialGroupByLinie(data).then((res) => {
    //     this.category = res.data || [];
    //   });
    // },
    // 更新材料组值域
    updateCategoryGroup(group) {
      this.categoryObj = {}
      this.resetStuff()
      this.category = group
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
      this.batch.purchaseProjectIds = this.selectTableData.map(item => item.purchaseProjectId)
    },
    // 批量修改
    save(type) {
      const batch = { operator: this.userInfo.id }
      if (type === "partSrcProjec") {
        const factoryItems = this.fromGroup.PURCHASE_FACTORY.find(items => items.code == this.batch.procureFactory)

        batch.partSrcProjectDTO = {
          carTypeProjectNum: this.cartypeProject.code,
          carTypeProjectZh: this.cartypeProject.name,
          cfController: this.batch.cfController,
          linieDept: this.batch.linieDept,
          linieName: this.linie.name, 
          linieUserId: this.linie.id,
          // partProjectType: 
          partType: this.batch.partType,
          procureFactory: this.batch.procureFactory,
          procureFactoryName: factoryItems ? factoryItems.name : '',
          unit: this.batch.unit
        }
        batch.purchaseProjectIds = this.$refs.outputPlan.tableListData.map(item => item.purchaseProjectId)
      } else {
        if (this.batch.purchaseProjectIds.length == 0) {
          iMessage.warn(
            this.language("LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU",'请选择需要修改的零件采购项目')
          );
          return;
        }

        batch.stuffDTO = {
          categoryCode: this.categoryObj.categoryCode ? this.categoryObj.categoryCode : "",
          categoryId: this.categoryObj.categoryId ? this.categoryObj.categoryId : "",
          categoryName: this.categoryObj.categoryNameZh ? this.categoryObj.categoryNameZh : "",
          stuffCode: this.stuff.stuffCode,
          stuffId: this.stuff.id,
          stuffName: this.stuff.stuffName
        }
        batch.purchaseProjectIds = this.batch.purchaseProjectIds
      }
      
      // this.pushKey();
      // 复制参数对应key
      // let batch = {
      //   ...this.batch,
      // };
      changeProcure({
        batch,
      }).then((res) => {
        if (res.data) {
          iMessage.success(this.language("LK_XIUGAICHENGGONG",'修改成功'));
          this.$refs.outputPlan.getData()
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    // pushKey() {
    //   const factoryItems = this.fromGroup.PURCHASE_FACTORY.find(items=>items.code == this.batch.procureFactory)
    //   this.batch.stuffName = this.stuff.stuffName;
    //   this.batch.stuffCode = this.stuff.stuffCode;
    //   this.batch.stuffId = this.stuff.id;
    //   this.batch.cartypeProjectZh = this.cartypeProject.name;
    //   this.batch.cartypeProjectNum = this.cartypeProject.code;
    //   this.batch.linieName = this.linie.name;
    //   this.batch.linieNum = this.linie.code;
    //   this.batch.categoryName = this.categoryObj.categoryNameZh?this.categoryObj.categoryNameZh:'';
    //   this.batch['procureFactoryName'] = factoryItems?factoryItems.name:''
    // },
    // 重置采购信息数据
    reset() {
      for (let i in this.batch) {
        if (i == "purchaseProjectIds") {
          this.batch[i] = [];
        } else {
          this.batch[i] = "";
        }
      }
      this.linie = {};
      this.cartypeProject = {};
    },
    // 重置stuff数据
    resetStuff() {
      // this.categoryObj = {};
      this.stuff = {};
      this.stuffArr = [];
    },
    // 生成fs号
    creatFs() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU",
            '抱歉，您当前还未选择您需要生成FS号的零件采购项目！'
          )
        );
      let fs = {
        purchaseProjectIds: this.batch.purchaseProjectIds,
      };
      changeProcure({
        fs,
      }).then((res) => {
        if (res.data) {
          iMessage.success(this.language("LK_CAOZUOCHENGGONG",'操作成功'));
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    validateStart() {
      return new Promise((r) => {
        if (this.selectTableData.length == 0) {
          r(false);
          iMessage.warn(
            this.language(
              "LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU",
              '抱歉，您当前还未选择需要启动询价的采购项目！'
            )
          );
          return;
        }
        if (this.selectTableData.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
            this.language(
              "LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA",
              '抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！'
            )
          );
          return;
        }
        r(true);
      });
    },
    async start() {
      if (!(await this.validateStart())) return;
      this.startLoding = true;
      insertRfq({
        rfqPartDTOList: this.selectTableData,
      })
        .then((res) => {
          this.startLoding = false;
          if (res.data && res.data.rfqId) {
            this.$router.push({
              path: "/sourcing/partsrfq/editordetail",
              query: {
                id: res.rfqId,
              },
            });
          } else {
            iMessage.warn(res.desZh);
          }
        })
        .catch((err) => {
          this.startLoding = false;
        });
    },
    //back
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.batchmiantain {
}
</style>
