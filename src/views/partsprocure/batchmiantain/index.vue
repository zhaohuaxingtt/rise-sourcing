<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2021-04-01 16:29:33
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目批量维护界面
 * @FilePath: \rise\src\views\partsprocure\batchmiantain\index.vue
-->

<template>
  <iPage
    class="batchmiantain"
    v-permission="PARTSPROCURE_BATCHMIANTAIN_INDEXPAGE"
  >
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        $t("LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU")
      }}</span>
      <div class="floatright">
        <iButton @click="back" v-permission="PARTSPROCURE_BATCHMIANTAIN_SAVE">{{
          $t("LK_FANHUI")
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
          {{ $t("LK_QIDONGXUNJIA") }}
        </iButton>
      </div>
    </div>
    <iSearch
      class="margin-bottom20"
      :title="$t('LK_CAIGOUXIANGMUXINXI')"
      tabCard
    >
      <el-form>
        <el-form-item :label="$t('LK_LINGJIANCAIGOUXIANGMULEIXING')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="batch.type">
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in fromGroup.PART_PROJECT_TYPE"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_LINIEBUMEN')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="batch.linieDept">
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in fromGroup.LINIE_DEPT"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item label="LINIE">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
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
        <el-form-item :label="$t('LK_LINGJIANLEIXING')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="batch.partType">
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in fromGroup.PART_TYPE"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_CHEXINGXIANGMU')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="cartypeProject"
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
        <el-form-item :label="$t('LK_CAIGOUGONGCHANG')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="batch.procureFactory"
          >
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in fromGroup.PURCHASE_FACTORY"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_DANWEI')">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="batch.unit">
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in fromGroup.UNIT"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_CFKONGZHIYUAN')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
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
          @click="save"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRM"
          >{{ $t("LK_QUEREN") }}
        </iButton>
        <iButton
          @click="reset"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASERESET"
          >{{ $t("LK_ZHONGZHI") }}
        </iButton>
      </template>
    </iSearch>
    <iSearch
      class="margin-bottom20"
      :title="$t('LK_GONGYISHEZHI')"
      tabCard
      icon
    >
    <!-- LK_CAILIAOZUGONGYISHEZHI -->
      <el-form>
        <el-form-item :label="$t('LK_CAILIAOZUSHAIXUAN')"><!-- LK_CAILIAOZU -->
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="categoryObj"
            @change="changeSelect"
            value-key="categoryCode"
          >
            <el-option
              :value="item"
              :label="item.categoryNameZh"
              v-for="(item, index) in category"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="$t('LK_GONGYIZUXUANDING')"><!-- LK_GONGYI -->
          <iSelect
            :placeholder="$t('LK_QINGXUANZHEXIANCAILIAOZU')"
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
          {{ $t("LK_QUEREN") }}
        </iButton>
        <iButton
          @click="resetStuff"
          v-permission="PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPRESET"
        >
          {{ $t("LK_ZHONGZHI") }}
        </iButton>
      </template>
    </iSearch>
    <outputPlan
      ref="outputPlan"
      class="margin-bottom20"
      @handleSelectionChange="handleSelectionChange"
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
        categoryId: "", // 材料组id
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
    this.getMaterialGroupByLinie();
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
    getMaterialGroupByLinie() {
      let data = {
        LinieId: this.$store.state.permission.userInfo.id,
      };
      materialGroupByLinie(data).then((res) => {
        this.category = res.data || [];
      });
    },
    // 获取工艺组数据
    changeSelect(val) {
      let data = {
        categoryId: val.id,
      };
      this.batch.categoryId = val.id;
      getStuffByCategory(data).then((res) => {
        this.stuffArr = res.data || [];
      });
    },

    handleSelectionChange(e) {
      this.selectTableData = e;
      let arr = [];
      this.selectTableData.map((res) => {
        arr.push(res.purchaseProjectId);
      });
      this.batch.purchaseProjectIds = arr;
    },
    // 批量修改
    save() {
      if (this.batch.purchaseProjectIds.length == 0) {
        iMessage.warn(
          this.$t("LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU")
        );
        return;
      }
      this.pushKey();
      // 复制参数对应key
      let batch = {
        ...this.batch,
      };
      changeProcure({
        batch,
      }).then((res) => {
        if (res.data) {
          iMessage.success(this.$t("LK_XIUGAICHENGGONG"));
          this.$refs.outputPlan.getData()
        } else {
          iMessage.error(res.desZh);
        }
      });
    },
    pushKey() {
      this.batch.stuffName = this.stuff.stuffName;
      this.batch.stuffCode = this.stuff.stuffCode;
      this.batch.stuffId = this.stuff.id;
      this.batch.cartypeProjectZh = this.cartypeProject.name;
      this.batch.cartypeProjectNum = this.cartypeProject.id;
      this.batch.linieName = this.linie.name;
      this.batch.linieNum = this.linie.id;
      this.batch.categoryCode = this.categoryObj.categoryCode;
      this.batch.categoryName = this.categoryObj.categoryNameZh;
    },
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
      this.categoryObj = {};
      this.stuff = {};
      this.stuffArr = [];
    },
    // 生成fs号
    creatFs() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.$t(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOSHENGCHENGFSHAODELINGJIANCAIGOUXIANGMU"
          )
        );
      let fs = {
        purchaseProjectIds: this.batch.purchaseProjectIds,
      };
      changeProcure({
        fs,
      }).then((res) => {
        if (res.data) {
          iMessage.success(this.$t("LK_CAOZUOCHENGGONG"));
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
            this.$t(
              "LK_NINDANGQIANHAIWEIXUANZEXUYAOQIDONGXUNJIADECAIGOUXIANGMU"
            )
          );
          return;
        }
        if (this.selectTableData.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
            this.$t(
              "LK_DANGQIANCAIGOUXIANGMUZHONGCUNZAIHAIWEISHENGCHENGFSNRDESHUJUWUFAWEININQIDONGXUNJIA"
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
              path: "/partsrfq/editordetail",
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
