<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:27:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-24 11:07:33
 * @Description: 产品组排程页面
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\index.vue
-->

<template>
  <iPage class="projectGroup" v-permission="PROJECTMGT_SCHEDULINGASSISTANT_PRODUCTGROUPSCHEDULING">
    <!---------------------------------------------------------------------->
    <!----------                  车型项目部分                   ---------------->
    <!---------------------------------------------------------------------->
    <carProject :carProjectId="carProject" :disabled="isNodeView" @changeSopStatus="changeSopStatus" @handleCarProjectChange="handleCarProjectChange" />
    <!---------------------------------------------------------------------->
    <!----------                  产品组区域                  ---------------->
    <!---------------------------------------------------------------------->
    <iCard class="margin-top20 projectCard">
      <div class="margin-bottom20 clearFloat">
        <div class="titleSearch">
          <span class="margin-right20 titleSearch-label">{{language('CHANPINZU','产品组')}}</span>
          <div :class="`chooseProGroup ${!proGroup ? 'noPro' : ''} ${isSop || isNodeView ? 'disabled' : ''}`" @click="openChooseProGroup">
            <div :title="proGroup">{{proGroup || '请选择'}}</div>
            <icon symbol name="iconshaixuankuangsousuo" class="step-icon"></icon>
          </div>
        </div>
        <div class="floatright">
          <!--------------------算法配置按钮----------------------------------->
          <iButton @click="openLogicSetting" :disabled="isSop || isNodeView">{{language('SUANFAPEIZHI','算法配置')}}</iButton>
        </div>
      </div>
      <div class="projectCard-content">
        
        <proGroupEmpty v-if="!proGroup" />
        <periodicView ref="periodicView" v-else-if="!isNodeView" @changeNodeView="changeNodeView(true)" :cartypeProId="carProject" :carProjectName="carProjectName" :isSop="isSop" />
        <nodeView ref="nodeView" v-else @changeNodeView="changeNodeView(false)" :cartypeProId="carProject" />
      </div>
    </iCard>
    <!---------------------------------------------------------------------->
    <!----------                  算法配置弹窗                  ---------------->
    <!---------------------------------------------------------------------->
    <logicSettingDialog ref="logic" :dialogVisible="logicVisible" :logicList="productLogicList" :logicData="logicData" :selectOptions="selectOptions" @handleUse="handleUseLogic" @changeVisible="changeLogic" />
    <!---------------------------------------------------------------------->
    <!----------                  选择产品组弹窗                  ---------------->
    <!---------------------------------------------------------------------->
    <chooseProGroupDialog ref="chooseProGroup" :dialogVisible="chooseVisible" @handleConfirm="handleChooseProGroup" :allData="chooseDataList" :selectValue="chooseData" @changeVisible="changeChooseProGroup" />
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, icon, iMessage } from 'rise'
import carProject from '@/views/project/components/carprojectprogress'
import logicSettingDialog from './components/logicsetting'
import { productLogicList } from './data'
import chooseProGroupDialog from './components/progroupchoose'
import periodicView from './components/periodicview'
import nodeView from './components/nodeview'
import proGroupEmpty from '@/views/project/components/empty/proGroupEmpty'
import { selectDictByKeyss } from '@/api/dictionary'
import { getLastOperateCarType, getProductSelectList, getCarConfig, updateCarConfig, saveProductSelectList } from '@/api/project'
export default {
  components: { iPage, iCard, iButton, carProject, logicSettingDialog, chooseProGroupDialog, icon, periodicView, nodeView, proGroupEmpty },
  data() {
    return {
      logicVisible: false,
      productLogicList,
      logicData: {},
      selectOptions: {},
      proGroup: '',
      chooseVisible: false,
      chooseDataList: [],
      chooseData: [],
      isNodeView: false,
      carProject: '',
      carProjectName: '',
      isSop: false
    }
  },
  created() {
    const keys = 'CATEGORY_CONFIG_OPTIONS,CALCULATE_CONFIG_OPTIONS,VALUE_CONFIG_OPTIONS,YEAR_CONFIG_OPTIONS,CAR_TYPE_CONFIG_OPTIONS'
    this.selectDictByKeys(keys)
    if (this.$route.query.carProject) {
      this.carProject = this.$route.query.carProject
      this.carProjectName = this.$route.query.cartypeProjectZh
      this.initProductList()
    } else {
      this.getLastOperateCarType()
    }
  },
  methods: {
    /**
     * @Description: 获取选择的产品组列表，若有则渲染更新产品组部分内容
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async initProductList() {
      await this.getProductList()
      this.$nextTick(() => {
        this.initView()
      })
    },
    /**
     * @Description: 获取用户最后一次操作的车型项目
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getLastOperateCarType() {
      const res = await getLastOperateCarType()
      if (res?.result) {
        if (res.data.id) {
          this.carProject = res.data.id
          this.carProjectName = res.data.cartypeProName
          await this.getProductList()
          this.$nextTick(() => {
            this.initView()
          })
        }
      }
    },
    /**
     * @Description: 车型项目选择改变
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    async handleCarProjectChange(carProjectId, carProjectName) {
      this.carProject = carProjectId
      this.carProjectName = carProjectName
      if(carProjectId){
        await this.getProductList()
        this.$nextTick(() => {
          this.initView()
        })
      }
    },
    /**
     * @Description: 是否sop状态修改
     * @Author: Luoshuang
     * @param {*} isSop
     * @return {*}
     */    
    changeSopStatus(isSop) {
      this.isSop = isSop
    },
    /**
     * @Description: 获取字典下拉
     * @Author: Luoshuang
     * @param {*} keys
     * @return {*}
     */    
    selectDictByKeys(keys) {
      selectDictByKeyss(keys).then(res => {
        if (res?.result) {
          this.selectOptions = {...this.selectOptions,...res.data}
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @Description: 打开算法配置弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openLogicSetting() {
      if (!this.carProject) {
        iMessage.error(this.language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目'))
        return
      }
      getCarConfig(this.carProject).then(res => {
        if (res?.result) {
          this.logicData = res.data
        } else {
          this.logicData = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
      this.logicVisible = true
    },
    /**
     * @Description: 算法配置弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeLogic(visible) {
      this.logicVisible = visible
    },
    /**
     * @Description: 应用算法配置
     * @Author: Luoshuang
     * @param {*} data
     * @return {*}
     */    
    handleUseLogic(data) {
      updateCarConfig({...this.logicData,type:1,cartypeProId:this.carProject}).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeLogic(false)
          this.$nextTick(() => {
            this.initView()
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.logic.changeSaveLoading(false)
      })
      
    },
    /**
     * @Description: 获取产品组列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getProductList() {
      const res = await getProductSelectList(this.carProject)
      if (res?.result) {
        this.chooseDataList = [...(res.data.projectGroupsSelectList || []), ...(res.data.projectGroupsUnSelectList || [])].map(item => {
          return {
            ...item,
            key: item.id,
            label: item.pgNameZh
          }
        })
        this.chooseData = res.data.projectGroupsSelectList.map(item => item.id)
        this.proGroup = res.data.projectGroupsSelectList.map(item => item.pgNameZh).join(',')
      } else {
        this.chooseDataList = []
        this.chooseData = []
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
    },
    /**
     * @Description: 打开选择产品组弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openChooseProGroup() {
      if (!this.carProject) {
        iMessage.error(this.language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目'))
        return
      }
      if (this.isSop || this.isNodeView) {
        return
      }
      this.chooseVisible = true
      this.getProductList()
    },
    /**
     * @Description: 选择产品组弹窗状态确认
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeChooseProGroup(visible) {
      this.chooseVisible = visible
    },
    /**
     * @Description: 选择产品组，即产品组弹窗中的确认按钮对应操作
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    async handleChooseProGroup(val) {
      this.chooseData = val
      const params = {
        cartypeProId: this.carProject,
        projectGroupsSelectList: val.map(item => this.chooseDataList.find(findItem => findItem.key === item))
      }
      const res = await saveProductSelectList(params)
      if (res?.result) {
        iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        this.changeChooseProGroup(false)
        await this.getProductList()
        this.$nextTick(() => {
          this.initView()
        })
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
      this.$refs.chooseProGroup.changeSaveLoading(false)
    },
    /**
     * @Description: 切换节点/周期视图
     * @Author: Luoshuang
     * @param {*} isNodeView
     * @return {*}
     */    
    changeNodeView(isNodeView) {
      this.isNodeView = isNodeView
      this.$nextTick(() => {
        this.initView()
      })
    },
    /**
     * @Description: 渲染节点/周期视图
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    initView() {
      if (this.isNodeView) {
        this.$refs.nodeView && this.$refs.nodeView.init()
      } else {
        this.$refs.periodicView && this.$refs.periodicView.init()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.projectGroup {
  padding: 0;
  padding-top: 10px;
  height: auto;
  overflow: auto;
  .titleSearch {
    display: flex;
    align-items: center;
    float: left;
    &-label {
      display: block;
      width: 60px;
      font-size: 14px;
    }
    ::v-deep .el-select {
      width: 240px;
    }
  }
  .projectCard {
    &-content {
      margin-top: 20px;
      border-top: 1px dashed #BBC4D6;;
    }
  }
  .chooseProGroup {
    width: 240px;
    box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
    border-radius: 4px;
    padding: 0px 18px;
    font-size: 14px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    &.noPro {
      color: #999999;
    }
    div {
      width: calc(100% - 20px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.disabled {
      background-color: #F5F7FA;
      border-color: #E4E7ED;
      color: #C0C4CC;
      cursor: not-allowed;
    }
  }
}
</style>