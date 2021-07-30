<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 11:27:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-30 15:36:09
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\progroup\index.vue
-->

<template>
  <iPage class="projectGroup">
    <iCard class="projectCard">
      <div class="margin-bottom20 clearFloat">
        <div class="titleSearch">
          <span class="margin-right20 titleSearch-label">{{language('CHEXINGXIANGMU','车型项目')}}</span>
          <iSelect filterable v-model="carProject" @change="handleCarProjectChange">
            <el-option
              v-for="item in carProjectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </iSelect>
        </div>
      </div>
      <div class="projectCard-content">
        <carEmpty v-if="!carProject" />
        <carProject v-else :carProjectId="carProject" @changeSopStatus="changeSopStatus" />
      </div>
    </iCard>
    <iCard class="margin-top20 projectCard">
      <div class="margin-bottom20 clearFloat">
        <div class="titleSearch">
          <span class="margin-right20 titleSearch-label">{{language('CHANPINZU','产品组')}}</span>
          <div :class="`chooseProGroup ${!proGroup ? 'noPro' : ''}`" @click="openChooseProGroup">
            <div :title="proGroup">{{proGroup || '请选择'}}</div>
            <icon symbol name="iconshaixuankuangsousuo" class="step-icon"></icon>
          </div>
        </div>
        <div class="floatright">
          <!--------------------应用默认配置按钮----------------------------------->
          <iButton @click="openLogicSetting">{{language('SUANFAPEIZHI','算法配置')}}</iButton>
        </div>
      </div>
      <div class="projectCard-content">
        <proGroupEmpty v-if="!proGroup" />
        <periodicView ref="periodicView" v-else-if="!isNodeView" @changeNodeView="changeNodeView(true)" :cartypeProId="carProject" :carProjectName="carProjectName" :isSop="isSop" />
        <nodeView ref="nodeView" v-else @changeNodeView="changeNodeView(false)" :cartypeProId="carProject" />
      </div>
    </iCard>
    <logicSettingDialog ref="logic" :dialogVisible="logicVisible" :logicList="productLogicList" :logicData="productData" :selectOptions="selectOptions" @handleUse="handleUseLogic" @changeVisible="changeLogic" />
    <chooseProGroupDialog ref="chooseProGroup" :dialogVisible="chooseVisible" @handleConfirm="handleChooseProGroup" :allData="chooseDataList" :selectValue="chooseData" @changeVisible="changeChooseProGroup" />
  </iPage>
</template>

<script>
import { iPage, iCard, iSelect, iButton, icon, iMessage } from 'rise'
import carProject from './components/carprojectprogress'
import logicSettingDialog from './components/logicsetting'
import { productLogicList } from './data'
import chooseProGroupDialog from './components/progroupchoose'
import periodicView from './components/periodicview'
import nodeView from './components/nodeview'
import carEmpty from './components/empty/carEmpty'
import proGroupEmpty from './components/empty/proGroupEmpty'
import { selectDictByKeyss } from '@/api/dictionary'
import { getCarTypePro, getLastOperateCarType } from '@/api/project'
export default {
  components: { iPage, iCard, iSelect, iButton, carProject, logicSettingDialog, chooseProGroupDialog, icon, periodicView, nodeView, carEmpty, proGroupEmpty },
  data() {
    return {
      logicVisible: false,
      productLogicList,
      productData: {},
      selectOptions: {},
      proGroup: '',
      chooseVisible: false,
      chooseDataList: [
        {key: '1', label: '中央电脑'},
        {key: '2', label: '多媒体显示屏'},
        {key: '3', label: '燃油泵'},
        {key: '4', label: '显示泵'},
        {key: '5', label: '显示屏'},
        {key: '6', label: '变速箱控制器'},
        {key: '7', label: '保险杠'},
        {key: '8', label: '前大灯'},
        {key: '9', label: '多媒体线视频'},
      ],
      chooseData: [],
      isNodeView: false,
      carProject: '',
      carProjectName: '',
      carProjectOptions: [],
      isSop: false
    }
  },
  created() {
    const keys = 'CATEGORY_CONFIG_OPTIONS,CALCULATE_CONFIG_OPTIONS,VALUE_CONFIG_OPTIONS,YEAR_CONFIG_OPTIONS,CAR_TYPE_CONFIG_OPTIONS'
    this.selectDictByKeys(keys)
    this.getCarProjectOptinos()
    this.getLastOperateCarType()
  },
  methods: {
    getLastOperateCarType() {
      getLastOperateCarType().then(res => {
        if (res?.result) {
          if (res.data.id) {
            this.carProject = res.data.id
            this.carProjectName = res.data.cartypeProName
          }
        }
      })
    },
    handleCarProjectChange(val) {
      this.carProjectName = this.carProjectOptions.find(item => item.value === val).label
    },
    changeSopStatus(isSop) {
      this.isSop = isSop
    },
    getCarProjectOptinos() {
      getCarTypePro().then(res => {
        if (res?.result) {
          this.carProjectOptions = res.data.map(item => {
            return {
              ...item,
              value: item.id,
              label: item.cartypeProName
            }
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    selectDictByKeys(keys) {
      selectDictByKeyss(keys).then(res => {
        if (res?.result) {
          this.selectOptions = {...this.selectOptions,...res.data}
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    openLogicSetting() {
      this.logicVisible = true
    },
    changeLogic(visible) {
      this.logicVisible = visible
    },
    handleUseLogic(data) {
      this.changeLogic(false)
      this.$refs.logic.changeSaveLoading(false)
    },
    openChooseProGroup() {
      if (!this.carProject) {
        iMessage.error(this.language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目'))
        return
      }
      if (this.isSop) {
        return
      }
      this.chooseVisible = true
    },
    changeChooseProGroup(visible) {
      this.chooseVisible = visible
    },
    handleChooseProGroup(val) {
      this.chooseData = val
      this.proGroup = this.chooseDataList.filter(item => this.chooseData.includes(item.key)).map(item => item.label).join(',')
      this.changeChooseProGroup(false)
      this.$refs.chooseProGroup.changeSaveLoading(false)
      // this.$refs.periodicView.init()
      // this.$refs.nodeView.init()
      this.$nextTick(() => {
        this.initView()
      })
    },
    changeNodeView(isNodeView) {
      this.isNodeView = isNodeView
      this.$nextTick(() => {
        this.initView()
      })
    },
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
  overflow-y: auto;
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
  }
}
</style>