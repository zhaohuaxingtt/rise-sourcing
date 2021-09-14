<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 13:54:01
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-14 12:30:42
 * @Description: 创建RFQ界面
       配件：选择的配件需要是分配了询价采购员的且是同一个询价采购员, 创建时能选择LINIE
       附件：选择的附件需要时分配了LINIE且为同一个LINIE, 创建时不能再选择LINIE
 * @FilePath: \front-web\src\views\accessoryPart\createRfq\index.vue
-->

<template>
  <iPage>
    <topComponents>
      <span slot="left" class="floatleft font20 font-weight">
        RFQ编号：{{detailData.rfqId}}
      </span>
    </topComponents>
    <iCard :title="language('JICHUXINXI','基础信息')" collapse v-loading="basicLoading">
      <iFormGroup row="4" class="accessoryPartDetail">
        <iFormItem v-for="(item, index) in basicInfo" :key="index" :label="language(item.key,item.label)" :class="item.row ? 'row'+item.row : ''">
          <iText v-if="!item.editable">{{detailData[item.value]}}</iText>
          <iInput v-else-if="item.type === 'input'" v-model="detailData[item.value]"></iInput>
          <iSelect v-else-if="item.type === 'select' && item.value === 'linie'" v-model="linie" :disabled="linieAndDeptDisable(item.value)" @change="val => handleDeptChange(item.value, val)">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item) in fromGroup[item.selectOption]"
              :key="item.value"
            ></el-option>
          </iSelect>
          <iSelect v-else-if="item.type === 'select' && item.value === 'linieDept'" v-model="linieDept" :disabled="linieAndDeptDisable(item.value)" @change="val => handleDeptChange(item.value, val)">
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item) in fromGroup[item.selectOption]"
              :key="item.value"
            ></el-option>
          </iSelect>
        </iFormItem>
      </iFormGroup>
      <div style="text-align:right;">
        <iButton @click="handleSaveRfq">{{language('BAOCUN','保存')}}</iButton>
        <iButton>{{language('QUXIAO','取消')}}</iButton>
      </div>
    </iCard>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
          <div class="floatright">
            <!--------------------保存按钮----------------------------------->
            <iButton @click="handleSave" :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
            <!--------------------添加按钮----------------------------------->
            <iButton @click="handleAddParts" >{{language('TIANJIA','添加')}}</iButton>
            <!--------------------删除按钮----------------------------------->
            <iButton @click="handleDelete" >{{language('SHANCHU','删除')}}</iButton>
            <!--------------------批量更新采购工厂----------------------------------->
            <iButton @click="handleChangeFactory" >{{language('PILIANGGENGXINCAIGOUGONGCHANG','批量更新采购工厂')}}</iButton>
          </div>
      </div>
      <tableList :activeItems='"a1"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @openPlan="openPlanDialog"></tableList>
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  添加配件弹窗                                          --->
    <!------------------------------------------------------------------------>
    <addAccessoryPartDialog :dialogVisible="accDialogVisible" @changeVisible="changeAccDialogVisible" @selectPart="selectPart" :stuffId="stuffId" />
    <!------------------------------------------------------------------------>
    <!--                  批量更新采购工厂弹窗                                          --->
    <!------------------------------------------------------------------------>
    <updateFactoryDialog ref="updateFactory" :dialogVisible="factoryDialogVisible" @changeVisible="changefactoryDialogVisible" @updateFactory="updateFactory" />
    <!------------------------------------------------------------------------>
    <!--                  添加附件弹窗                                          --->
    <!------------------------------------------------------------------------>
    <addFileDialog :dialogVisible="fileDialogVisible" @changeVisible="changefileDialogVisible" @selectPart="selectPart" />
    <!------------------------------------------------------------------------>
    <!--                  产能计划弹窗                                          --->
    <!------------------------------------------------------------------------>
    <capacityPlanningDialog :dialogVisible="planDialogVisible" @changeVisible="changeplanDialogVisible" :detailInfo="selectPlanRow" />
  </iPage>
</template>

<script>
import { iPage, iCard, iFormGroup, iFormItem, iText, iButton, iInput, iSelect, iMessage } from 'rise'
import topComponents from '../../designate/designatedetail/components/topComponents'
import { basicInfo, tableTitle, fileTableTitle } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import addAccessoryPartDialog from './components/addAccessoryPart'
import updateFactoryDialog from './components/updateFactory'
import addFileDialog from './components/addFile'
import capacityPlanningDialog from './components/capacityPlanning'
import { getPartBySP, autoInquiry, getDeptList, getUserList, updateRfq } from '@/api/accessoryPart/index'
import {addRfq,insertRfqPart} from '@/api/partsrfq/home/index'
import { updateProcureButch } from "@/api/partsprocure/home";
import {
  dictkey,
} from "@/api/partsprocure/editordetail";
import { uniq } from 'lodash'
import {partProjTypes} from '@/config'
export default {
  mixins: [pageMixins],
  components: { iPage, topComponents, iCard, iFormGroup, iFormItem, iText, iButton, iInput, iSelect, tableList, addAccessoryPartDialog, updateFactoryDialog, addFileDialog, capacityPlanningDialog },
  props: {
    partType: {type: String, default: '1'} // 零件类型：1：配件   2：附件
  },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      basicInfo,
      detailData: {},
      // tableTitle: tableTitle,
      tableData: [],
      accDialogVisible: false,
      factoryDialogVisible: false,
      selectItems: [],
      fileDialogVisible: false,
      planDialogVisible: false,
      tableLoading: false,
      ids: [],
      basicLoading: false,
      selectPlanRow: {},
      fromGroup: {},
      linie: '',
      linieDept: '',
      saveLoading: false,
      stuffId: ''
    }
  },
  computed: {
    tableTitle() {
      const type = this.$route.query.type
      return type === '1' ? tableTitle : fileTableTitle
    }
  },
  created() {
    // this.getProcureGroup()
    this.getDepOption()
    // this.getUserOptions()
    if (this.$route.query.ids) {
      this.ids = this.$route.query.ids
      this.getList()
    }
    if (this.$route.query.linie) {
      this.detailData.linie = this.$route.query.linieName
      this.linie = this.$route.query.linieName
    }
    if (this.$route.query.linieDept) {
      this.detailData.linieDept = this.$route.query.linieDeptName
      this.linieDept = this.$route.query.linieDeptName
    }
  },
  methods: {
    handleDelete() {
      if(this.selectItems.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOSHANCHUDEHANG','请选择需要删除的行'))
        return
      }
      // const selectIds = this.selectItems.map(item => item)
      this.tableData = this.tableData.filter(item => !this.selectItems.includes(item))
      this.ids = this.tableData.map(item => item.spnrNum).join(',')
      this.stuffId = this.tableData[0]?.stuffId
    },
    handleDeptChange(type, val) {
      this.detailData[type] = val
      if (type === 'linieDept') {
        this.$set(this.detailData,'linie','')
        this.linie = ''
        this.getUserOptions()
      }
    },
    /**
     * @Description: 获取linie部门下拉
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getDepOption() {
      getDeptList({tag:'4'}).then(res => {
        if (res?.result) {
          this.fromGroup = {...this.fromGroup, LINIE_DEPT: res.data?.map(item => {return {value:item.id, label:item.nameZh}})}
        } else {
          this.fromGroup = {...this.fromGroup, LINIE_DEPT: []}
        }
      })
    },
    /**
     * @Description: 获取linie下拉
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getUserOptions() {
      // this.detailData = {
      //   ...this.detailData,
      //   linie: ''
      // }
      getUserList({deptId:this.detailData.linieDept,tag:'4'}).then(res => {
        if (res?.result) {
          this.fromGroup = {...this.fromGroup, LINIE: res.data?.map(item => {return {value:item.id, label:item.nameZh}})}
        } else {
          this.fromGroup = {...this.fromGroup, LINIE: []}
        }
      })
    },
    linieAndDeptDisable(type) {
      if (type === 'linie' && this.$route.query.type !== '1') {
        return true
      }
      if (type === 'linieDept' && this.$route.query.type !== '1') {
        return true
      }
      return false
    },
    //获取上方group信息
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.fromGroup = res.data;
        }
      });
    },
    /**
     * @Description: 点击批量更新采购工厂
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleChangeFactory() {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOGENGXINDEHANGXIANGMU','请选择需要更新的行项目'))
        return
      }
      this.changefactoryDialogVisible(true)
    },
    updateFactory(procureFactory, procureFactoryName) {
      // this.pushKey();
      // 复制参数对应key
      const  params = {
        ids: this.selectItems.map(item => item.purchasingProjectId),
        updateInfo: {
          procureFactory: procureFactory,
          procureFactoryName: procureFactoryName
        }
      }
      updateProcureButch(params).then((res) => {
        if (res.data) {
          iMessage.success(this.language("XIUGAICHENGGONG",'修改成功'));
          this.changefactoryDialogVisible(false)
          this.getList()
        } else {
          iMessage.error(res.desZh);
        }
      }).finally(() => {
        this.$refs.updateFactory.changeLoading(false)
      });
    },
    updateRfq() {
      this.basicLoading = true
      const params = {
          rfqId: this.detailData.rfqId,
          rfqName: this.detailData.rfqName,
          rfqDesc: this.detailData.rfqDesc,
          userId: this.$store.state.permission.userInfo.id
      }
      updateRfq(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.basicLoading = false
      })
    },
    /**
     * @Description: 生成RFQ
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSaveRfq() {
      if(this.detailData.rfqId) {
        // 如果rfq编号已存在则变为更新rfq
        this.updateRfq()
      } else {
        this.basicLoading = true
        const params = {
            rfqName: this.detailData.rfqName,
            rfqDesc: this.detailData.rfqDesc,
            userId: this.$store.state.permission.userInfo.id
        }
        addRfq(params).then(res => {
          if (res?.result) {
            iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
            this.detailData.rfqId = res.data.rfqId
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          }
        }).finally(() => {
          this.basicLoading = false
        })
      }
    },
    /**
     * @Description: 配件保存
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async handleAccessorySave() {
      if (!this.detailData.linie || !this.detailData.linieDept) {
        iMessage.warn(this.language('QINGXUANZELINIEHEBUMEN','请选择部门和LINIE'))
        return
      }
      this.saveLoading = true
      const params = {
        linieDeptName: this.detailData.linieDept === this.$route.query.linieDeptName ? this.$route.query.linieDeptName : this.fromGroup.LINIE_DEPT.find(item => item.value === this.detailData.linieDept)?.label || this.tableData[0].linieDeptName,
        linieDept: this.detailData.linieDept === this.$route.query.linieDeptName ? this.$route.query.linieDept : this.detailData.linieDept,
        linieId: this.detailData.linie === this.$route.query.linieName ? this.$route.query.linie : this.detailData.linie,
        linieName: this.detailData.linie === this.$route.query.linieName ? this.$route.query.linieName : this.fromGroup.LINIE.find(item => item.value === this.detailData.linie)?.label || this.tableData[0].linieName,
        rfqId: this.detailData.rfqId,
        spNums: this.tableData.map(item => item.spnrNum),
        stuffId: this.tableData[0].stuffId,
        supplierSapCodes: this.tableData.map(item => item.supplierSapCode)
      }
      const res = await autoInquiry(params)
      if (res?.result) {
        this.saveLoading = false
        iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${this.detailData.rfqId}`})
        window.open(router.href,'_blank')
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        this.saveLoading = false
      }
    },
    /**
     * @Description: 附件保存
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async handleAttachmentSave() {
      this.saveLoading = true
      const params = this.tableData.map(item => {
        return {
              buyerName: item.buyerName, // 询价采购员
              linieName: item.linieName, // linie
              linieUserId: item.linieUserId, // linie
              partNum: item.partNum, // 零件号
              fsnrGsnrNum: item.spnrNum, // fs号
              stuffId: item.stuffId, // 工艺组ID，还没有
              stuffName: item.stuffName, // 工艺组name，还没有
              purchaseProjectId: item.purchasingProjectId,
              partNameZh: item.partNameZh,
              partProjectType: partProjTypes.FUJIAN,
              rfqId: this.detailData.rfqId,
              userId: this.$store.state.permission.userInfo.id
            }
      })
      const res = await insertRfqPart(params)
      if (res?.result) {
        iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        this.saveLoading = false
        const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${this.detailData.rfqId}`})
        window.open(router.href,'_blank')
      } else {
        this.saveLoading = false
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
    },
    /**
     * @Description: 保存，关联零件保存，自动发起询价
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      if (!this.detailData.rfqId) {
        iMessage.warn(this.language('QINGXIANBAOCUNRFQXINXI','请先保存rfq的信息'))
        return
      }
      if (this.$route.query.type === '1') {
        this.handleAccessorySave()
      } else {
        this.handleAttachmentSave()
      }
    },
    /**
     * @Description: 添加配件附件
     * @Author: Luoshuang
     * @param {*} selectParts 选择的零件，为sp号数组
     * @return {*}
     */    
    selectPart(selectParts) {
      this.ids = uniq([...this.ids.split(','), ...selectParts]).join(',')
      this.changeAccDialogVisible(false)
      this.changefileDialogVisible(false)
      this.getList()
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getList() {
      this.tableLoading = true
      const params = {
        spNumList: this.ids.split(','),
        // projectType: this.$route.query.type === '1' ? '0' : '1'
      }
      getPartBySP(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.detailData = {
            ...this.detailData,
            rfqName:res.data[0] ? res.data[0].partNum + (res.data[0].partNameZh && ('-'+res.data[0].partNameZh)) + (res.data[0].partNameDe && ('-'+res.data[0].partNameDe)) : ''
          }
          this.stuffId = res.data[0]?.stuffId || ''
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 点击产能计划列打开产能计划弹窗
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openPlanDialog(row) {
      this.selectPlanRow = row
      this.changeplanDialogVisible(true)
    },
    /**
     * @Description: 表格选中行
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectItems = val
    },
    /**
     * @Description: 产能计划弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeplanDialogVisible(visible) {
      this.planDialogVisible = visible
    },
    /**
     * @Description: 添加配件弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeAccDialogVisible(visible) {
      this.accDialogVisible = visible
    },
    /**
     * @Description: 添加附件弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changefileDialogVisible(visible) {
      this.fileDialogVisible = visible
    },
    /**
     * @Description: 添加按钮点击事件，根据类型打开不同的弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleAddParts() {
      if(!this.detailData.rfqId) {
        iMessage.warn(this.language('QINGXIANBAOCUNRFQXINXI','请先保存RFQ信息'))
        return
      }
      switch(this.$route.query.type) {
        case '1': // 配件
          this.changeAccDialogVisible(true)
          break
        case '2':
          this.changefileDialogVisible(true)
          break
        default:
          break
      }
    },
    /**
     * @Description: 添加配件弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changefactoryDialogVisible(visible) {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('QINGXUANZELINGJIAN','请选择零件'))
        return
      }
      this.factoryDialogVisible = visible
    }
  }
}
</script>

<style lang="scss" scoped>
.accessoryPartDetail {
  .el-form-item {
    ::v-deep .el-form-item__label {
      width: 150px;
    }
  }
}
</style>