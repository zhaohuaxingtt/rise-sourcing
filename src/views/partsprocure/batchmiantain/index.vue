<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2021-09-18 16:03:50
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
        <!-- 供应商创建定点申请单 -->
				<createNomiappBtn :datalist='selectTableData'></createNomiappBtn>
        <iButton @click="save('partSrcProjec')" :loading='saveButchLoading' v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRMJLJH"
          >{{ language("LK_QUERENJINGLINGJHAOJLJHBG",'保存') }}
        </iButton>
        <!-- 	<iButton @click="creatFs" v-permission="PARTSPROCURE_BATCHMIANTAIN_GENERATEFSNUMBER">
					{{ $t("LK_SHENGCHENGFSHAO") }}
				</iButton> -->
        <creatFsGsNr :projectItems="selectTableData" keys='purchaseProjectId' @refresh="getTableListFn"></creatFsGsNr>
        <!-- <startProject :startItems='selectTableData' keys='purchaseProjectId' v-permission="PARTSPROCURE_BATCHMIANTAIN_STARTINQUIRY"></startProject> -->
        <iButton @click="back" v-permission="PARTSPROCURE_BATCHMIANTAIN_SAVE">{{language("LK_FANHUI",'返回')}}</iButton>
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
              v-for="(item, index) in filterProjectList(fromGroup.PART_PROJECT_TYPE,$route.query.businessKey)"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('LK_LINIEBUMEN','LINIE部门')">
          <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="batch.linieDept" @change="handleChangeByLinieDept">
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
            :placeholder="language('LK_QINGXIANXUANZELINIEBUMEN','请先选择LINIE部门')"
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
        <el-form-item v-permission='PARTSPROCURE_BATCHMIANTAIN_CHEXINXIANGMU' :label="language('LK_CHEXINGXIANGMU','车型项目')">
          <iSelect
            :placeholder="language('LK_QINGXUANZE','请选择')"
            v-model='carTypeProject'
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
           :loading='saveButchLoading'
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
         :loading='stuffLoading'
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
    <!---------------------------------------------------------------------->
    <!----------------------------仅零件变更--------------------------------->
    <!---------------------------------------------------------------------->
    <onlyPartsChange @updateCategoryGroup="updateCategoryGroup" v-if='partProjTypes.JINLINGJIANHAOGENGGAI == this.$route.query.businessKey' ref='onlyPartsChange' v-permission='PARTSPROCURE_BATCHMIANTAIN_ONLYCHANGE' @handleSelectionChange="handleSelectionChange"></onlyPartsChange>
    <!---------------------------------------------------------------------->
    <!----------------------------非仅零件变更-------------------------------->
    <!---------------------------------------------------------------------->
    <outputPlan
      v-else
      v-permission='PARTSPROCURE_BATCHMIANTAIN_OUTPUTLINE'
      ref="outputPlan"
      class="margin-bottom20"
      @handleSelectionChange="handleSelectionChange"
      @updateCategoryGroup="updateCategoryGroup"
    />
  
  </iPage>
</template>
<script>
import { iPage, iButton, iSearch, iSelect, iMessage } from 'rise';
import outputPlan from "./components/outputPlan";
import {batchUpdateStuff,updateProcureButch } from "@/api/partsprocure/home";
import onlyPartsChange from './components/onlyPartsChange'
import {getStuffByCategory,dictkey,purchasingDept,purchasingLiline} from "@/api/partsprocure/editordetail";
import {creatFsGsNr,createNomiappBtn} from '@/components'
import {translateDataForService} from '../editordetail/components/data'
import {filterProjectList} from '@/utils'
import {partProjTypes} from '@/config'
export default {
  components: {
    iPage,
    iButton,
    iSearch,
    iSelect,
    outputPlan,
    creatFsGsNr,
    createNomiappBtn,
    onlyPartsChange
  },
  data() {
    return {
      partProjTypes,
      fromGroup: {},
      category: [], //材料组数据
      stuffArr: [], //工艺组数据
      batch: {
        carTypeProjectNum: null, //车型项目编号–同上关联
        carTypeProjectZh: null, //车型项目
        categoryCode: null, //材料组
        categoryName: null, //材料名称
        cfController: null, //CF控制员
        linieDept: null, //LINIE部门
        linieName: null, //采购人名称
        linieNum: null, //采购员编号–同上关联
        partType: null, //零件类型
        procureFactory: null, //采购工厂
        stuffCode: null, //工艺组code
        stuffId: null, //工艺组id
        stuffName: null, //工艺组名称
        type:this.$route.query.businessKey, //零件采购项目类型
        unit: "PC", //单位
        purchaseProjectIds: [], //采购项目id
        categoryId: null, // 材料组id
      },
      stuff: {},
      categoryObj: {},
      linie: {}, //专业采购员
      carTypeProject: {}, //车型项目
      selectTableData: [],
      startLoding: false,
      purchaseProjectIds: [],
      saveButchLoading:false,
      stuffLoading:false
    };
  },
  created() {
    this.getProcureGroup();
    this.purchasingDept()
    this.purchaseProjectIds = this.$route.query.ids
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
  },
  methods: {
    filterProjectList(a,b){
      return filterProjectList(a,b)
    },
    //获取上方group信息
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          Object.keys(res.data).forEach(key => {
            if (key !== "LINIE_DEPT" && key !== "LINIE") {
              this.$set(this.fromGroup, key, res.data[key])
            }
          })
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
      if(partProjTypes.JINLINGJIANHAOGENGGAI == this.$route.query.businessKey){
        this.batch.purchaseProjectIds = this.selectTableData.map(item => item.id)
      }else{
        this.batch.purchaseProjectIds = this.selectTableData.map(item => item.purchaseProjectId)
      }
      this.oldProjectRelations = e.map(r=>{return {...translateDataForService(r.oldFsnrGsnrNum),...{purchasingProjectId:r.id}}})
    },
    purchasingDept() {
      purchasingDept().then(r=>{
        this.fromGroup['LINIE_DEPT'] = r.data || []
      })
    },
    handleChangeByLinieDept(value) {
      this.linie = null
      this.getLinie(value)
    },
    getLinie(id){
      purchasingLiline(id).then(r=>{
        this.$set(this.fromGroup,'LINIE',r.data || [])
      })
    },
    // 修改采购项目详情和
    save(type) {
      if (this.batch.purchaseProjectIds.length == 0) return iMessage.warn(this.language("LK_QINGXUANZHEXUYAOXIUGAIDELINGJIANCAIGOUXIANGMU",'请选择需要修改的零件采购项目'));
      if (type === "partSrcProjec") {
        this.updateProcureButch()
      } else {
        this.updateStuff()
      }
    },
    // 重置采购信息数据
    reset() {
      for (let i in this.batch) {
        if (i == "purchaseProjectIds") {
          this.batch[i] = [];
        } else if(i == 'type'){
          break
        }  else {
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
    updateStuff(){
        this.stuffLoading = true
        batchUpdateStuff({
          operator: this.userInfo.id,
          ids: this.batch.purchaseProjectIds,
          categoryCode: this.categoryObj.categoryCode ? this.categoryObj.categoryCode : "",
          categoryId: this.categoryObj.categoryId ? this.categoryObj.categoryId : "",
          categoryName: this.categoryObj.categoryName ? this.categoryObj.categoryName : "",
          stuffCode: this.stuff.stuffCode,
          stuffId: this.stuff.id,
          stuffName: this.stuff.stuffName
      }).then((res) => {
          this.stuffLoading = false
          if (res.code == 200) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        })
        .catch((err) => {
          this.stuffLoading = false
          iMessage.error(err.desZh);
        })
    },
    //批量保存零件采购项目信息
    updateProcureButch(){
       this.saveButchLoading = true
       const factoryItems = this.fromGroup.PURCHASE_FACTORY.find(items => items.code == this.batch.procureFactory)
       const updateInfo = {
          carTypeProjectNum: this.carTypeProject.code,
          carTypeProjectZh: this.carTypeProject.name,
          cfController: this.batch.cfController,
          linieDept: this.batch.linieDept,
          linieName: this.linie.name, 
          linieId: this.linie.code,
          partProjectType: this.batch.type,
          partType: this.batch.partType,
          procureFactory: this.batch.procureFactory,
          procureFactoryName: factoryItems ? factoryItems.name : null,
          unit: this.batch.unit
        }
        updateInfo['oldProjectRelations'] = this.oldProjectRelations
        const ids = this.batch.purchaseProjectIds
      updateProcureButch({updateInfo:updateInfo,ids:ids}).then(res=>{
        this.saveButchLoading = false
        if(res.result === true) {
          iMessage.success(this.language("LK_XIUGAICHENGGONG",'修改成功'));
          if(partProjTypes.JINLINGJIANHAOGENGGAI == this.$route.query.businessKey){this.$refs.onlyPartsChange.getDataList()}else{
            this.$refs.outputPlan.getData()
          }
        }
        else{
            iMessage.error(res.desZh);
        }
      }).catch(err=>{
        this.saveButchLoading = false
        iMessage.error(this.language("LK_XIUGAICHENGGONG",'修改失败'));
      })
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
