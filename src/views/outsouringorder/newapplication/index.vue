<template>
  <iPage class="partsprocureHome">
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane name="source">
        <div>
          <div class="pageTitle flex-between-center-center margin-botttom20">
            <span>{{ fromDetail ? `RiSE编号:  ${baseinfodata.riseCode}` : $t('LK_XIANJIANCAIGOUSHENQING') }}</span>
            <div class="btnList flex-align-center">
              <iButton @click="sendToLine" v-if="fromDetail && canEdit && applicationTypeKey">{{ $t('推送采购员') }}</iButton>
              <iButton @click="exitEditor" v-if="canEdit && applicationTypeKey">{{ $t('LK_TUICHUBIANJI') }}</iButton>
              <iButton @click="handleSave" v-if="canEdit && applicationTypeKey">{{ $t('LK_BAOCUN') }}</iButton>
              <iButton @click="handleEdit" v-if="!canEdit && applicationTypeKey && isLatest">{{ $t('LK_BIANJI') }}</iButton>
              <iButton @click="createOrder" v-if="!canEdit && applicationTypeKey">{{ $t('创建订单') }}</iButton>
              <logButton class="margin-left20" @click="lookLog" />
            </div>
          </div>
          <!--------------------------------------基础信息部分------------------------------------------>
          <div class="margin-bottom20">
            <iCard class="card" collapse>
              <iFormGroup row="1" inline>
                <div class="row">
                  <div class="col">
                    <iFormItem :label="$t('MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING') + ':'" name="test">
                      <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="baseinfodata.subType" v-if="canEdit" @change="handleTypeChange">
                        <el-option v-for="(item, index) in addType" :key="index" :value="item.label" :label="$t(item.key)"></el-option>
                      </iSelect>
                      <iText v-else>{{ applicationTypeKey ? $t(applicationTypeKey) : $t('LK_GONGXUWEIWAICAIGOUSHENQING') }}</iText>
                    </iFormItem>
                    <iFormItem :label="$t('申请人') + ':'" name="test">
                      <iText>{{ baseinfodata.applyBy }}</iText>
                    </iFormItem>
                  </div>
                  <div class="col">
                    <iFormItem :label="$t('推荐采购员') + ':'" name="test">
                      <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="baseinfodata.ownerId" v-if="canEdit" @change="handleTypeChange">
                        <el-option v-for="(item, index) in lineOptiondata" :key="index" :value="item.linieID" :label="$t(item.linieName)"></el-option>
                      </iSelect>
                      <iText v-else> {{ baseinfodata.ownerName }}</iText>
                    </iFormItem>
                    <iFormItem :label="$t('申请部门') + ':'" name="test">
                      <iText> {{ baseinfodata.deptNum }}</iText>
                    </iFormItem>
                  </div>
                  <div class="col">
                     <iFormItem :label="$t('零件编号前缀') + ':'" name="test">
                      <iText> {{ baseinfodata.partPrefix }} </iText>
                    </iFormItem>
                    <iFormItem :label="$t('备注') + ':'" name="test">
                      <iInput v-model="baseinfodata.remarks" :disabled="state == 1 ? true : false" class="width500"></iInput>
                    </iFormItem>
                  </div>
                  <div class="col">
                    <iFormItem :label="$t('状态') + ':'" name="test">
                      <iText> {{ baseinfodata.status === 'draft' ? '草稿' : '已完成' }} </iText>
                    </iFormItem>
                    <iFormItem name="test"> </iFormItem>
                  </div>
                </div>
              </iFormGroup>
            </iCard>
          </div>
          <!-- 列表部分 -->
          <iCard class="margin-top20 margin-bottom20">
            <div class="table-top">
              <iFormGroup row="5" inline :rules="rules">
                
              </iFormGroup>
              <div>
                <iButton @click="insertItem" v-if="canEdit && applicationTypeKey">{{ $t('LK_XINZHENGXIANGCI') }}</iButton>
                <iButton @click="deleteItem" v-if="canEdit && applicationTypeKey">{{ $t('LK_SHANCHUXIANGCI') }}</iButton>
                <iButton @click="exportExcel" v-if="applicationTypeKey">{{ $t('LK_DAOCHU') }}</iButton>
                <upload-button @uploadedCallback="uploadAttachments" v-if="applicationTypeKey" :upload-button-loading="uploadAttachmentsButtonLoading" :data-info="baseinfodata" class="margin-left8" />
              </div>
            </div>
            <tablelist :tableData="currentListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :fromGroup="fromGroup" :splitPurchList="splitPurchList" :canEdit="canEdit" :addressList="addressList" @handleSelectionChange="handleSelectionChange" @handleFactoryChange="handleFactoryChange" open-page-props="id" :index="true" icon-props="recordId" :keystring="keystring"> </tablelist>
            <!------------------------------------------------------------------------>
            <!--                  表格分页                                          --->
            <!------------------------------------------------------------------------>
            <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" />
          </iCard>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--日志-->
    <iUserLog :show.sync="logDialogVisible" :bizId="baseinfodata.riseCode || 0" menuId="" is-page />
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iMessage, iPagination, iFormGroup, iFormItem, iSelect, iText, iUserLog, icon, iInput } from 'rise'
import { newTableTitle, addType } from '../components/data'
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import tablelist from './components/tablelist'
import logButton from '../components/logButton'
import { purchaseFactory } from '@/api/partsprocure/editordetail'
import { dictkey, sendLinie, liniePullDownByDept } from '@/api/outsouringorder'
import { inventoryLocation, saveOrUpdate, findNormalPrByPage, findNormalPrById, deleteNormalPr, applyExport, applyImport } from '@/api/ws2/purchaserequest'
import { cloneDeep } from 'lodash'
import uploadButton from './components/uploadButton'
import { exportExcel } from '@/utils/filedowLoad'
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iButton,
    iCard,
    tablelist,
    logButton,
    iPagination,
    iFormGroup,
    iFormItem,
    iSelect,
    iText,
    uploadButton,
    iUserLog,
    icon,
    iInput
  },
  data() {
    return {
      applicationTypeKey: '',
      applicationTypeVal: '',
      tableListData: [], //table数据
      currentListData: [], //table展示数据
      tableLoading: false,
      tableTitle: newTableTitle,
      tab: 'source',
      splitPurchList: [], //采购工厂
      itemNum: 10,
      fromGroup: {},
      selectTableData: [],
      addressList: [], //库存地点
      canEdit: true,
      addType: addType,
      keystring: 0,
      fromItem: false, //是否从项次点击进入
      fromDetail: false,
      uploadAttachmentsButtonLoading: false,
      baseinfodata: {
        riseCode: '',
        type: 'GPR',
        applyBy: this.$store.state.permission.userInfo?.nameZh,
        deptNum: this.$store.state.permission.userInfo?.deptDTO.deptNum,
        subType: 'ZN_ONE',
        status: 'draft',
        owerId: '',
      },
      logDialogVisible: false,
      isLatest: true,
      lineOptiondata: []
    }
  },
  created() {
    if (this.$route.query.item) {
      this.fromItem = true
    }
    if (this.$route.query.code) {
      this.fromDetail = true
      this.baseinfodata.riseCode = this.$route.query.code
      this.getTableListFn()
      this.getTableHaderInfo()
    }
    if (this.$route.query.isLatest === 'false') {
      this.isLatest = false
    }
    if (!this.$route.query.item && !this.$route.query.code) {
      this.applicationTypeKey = addType[0].key
      this.applicationTypeVal = addType[0].label
      this.baseinfodata.subType = this.applicationTypeVal
      this.canEdit = true
    }
    this.purchaseFactory()
    this.getProcureGroup()
    this.getLocation()
    this.getLineInfo()
  },

  methods: {
    // 获取推荐采购员
    getLineInfo() {
      liniePullDownByDept({
        deptId: this.$store.state.permission.userInfo?.deptDTO.id
      }).then(res => {
        if (res.data instanceof Array && res.data.length > 0) {
          this.lineOptiondata = res.data;
        }
      }).catch(err => {
        this.lineOptiondata =[];
      })
    },

    //获取采购工厂列表
    purchaseFactory() {
      purchaseFactory({ firstId: this.firstId, isSparePart: false })
        .then((res) => {
          if (res.data) {
            this.splitPurchList = res.data
          }
        })
        .catch((err) => {})
    },
    //保存
    handleSave() {
      if (this.tableListData.length == 0) {
        return iMessage.warn('请添加数据')
      }
      if (this.page.currPage == 1) {
        this.currentListData.forEach((element, index) => {
          this.tableListData[index] = element
        })
      }
      if (this.tableListData.length > 0) {
        let temp = this.tableListData
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].partType == '' || temp[i].partNum == '' || temp[i].quantity == '' || temp[i].supplierNameZh == '' || temp[i].factoryName == '' || temp[i].deliveryDate == '') {
            return iMessage.warn('请输入必填项')
          }
        }
      }
      const query = this.tableListData.map((item) => {
        return {
          ...item,
          subType: this.applicationTypeVal
        }
      })
      saveOrUpdate(query)
        .then((res) => {
          if (res.code == '200') {
            this.baseinfodata.riseCode = res.data[0].riseCode
            this.fromDetail = true
            this.canEdit = !this.canEdit
            this.tableListData = []
            this.getTableListFn()
            return iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          } else {            
            this.canEdit = true;
            return iMessage.error(`${this.$i18n.locale === 'zh' ? res.desZh : res.desEn}`)
          }
        })
        .catch((err) => {})
    },
    //编辑
    handleEdit() {
      this.canEdit = !this.canEdit
    },
    //退出编辑
    exitEditor() {
      this.canEdit = !this.canEdit
      this.getTableList()
    },
    // 发送给采购员
    sendToLine() {
      sendLine({
        deptName: '',
        deptNum: '',
        normalPrList: [],
        ownerId: '',
        riseCodes: this.baseinfodata.riseCode
      }).then(res => {
        console.log(res);
      })
    },
    createOrder() {
      if (this.selectTableData.length == 0) {
        return iMessage.warn('请先选择数据')
      }
      let time = this.selectTableData[0].deliveryDate
      //采购工厂
      const procureFactory = this.selectTableData[0].procureFactory
      const supplierSapCode = this.selectTableData[0].supplierSapCode
      for (let index = 0; index < this.selectTableData.length; index++) {
        const item = this.selectTableData[index]
        if (index != 0 && new Date(time).getTime() > new Date(item.deliveryDate).getTime()) {
          time = item.deliveryDate
        }
        if (supplierSapCode != item.supplierSapCode) {
          return iMessage.error('请选择相同供应商的数据')
        }
        if (procureFactory != item.procureFactory) {
          return iMessage.error('请选择相同采购工厂的数据')
        }
        if (item.contractRiseCode) {
          return iMessage.error(`项次${item.sapItem}零件${item.partNum}已创建订单${item.contractRiseCode}`)
        }
      }
      const item = this.selectTableData.map((item) => {
        return item.sapItem
      })
      const purchaseInfo = {
        code: this.baseinfodata.riseCode, //采购申请RiSE编号
        item, //采购申请RiSE项次
        procureFactory, //工厂
        time,
        supplierSapCode,
        supplierNameZh: this.selectTableData[0].supplierNameZh
      }
      let routeData = this.$router.resolve({
        path: `/ws2/purchaseorder/PurchaseOrderDetails/0/-1`,
        query: {
          // code: this.baseinfodata.riseCode,  //采购申请RiSE编号
          // item: JSON.stringify(item), //采购申请RiSE项次
          purchaseInfo: JSON.stringify(purchaseInfo), // 采购申请数据
          showItem: '0', //拿到的采购申请是否显示 0 不显示 1 显示
        },
      })
      window.open(routeData.href, '_blank')
    },
    insertItem() {
      if (this.tableListData.length > 0) {
        if (this.page.currPage == 1) {
          this.currentListData.forEach((element, index) => {
            this.tableListData[index] = element
          })
        }
        let temp = this.tableListData[this.tableListData.length - 1]
        if (temp.partType == '' || temp.partNum == '' || temp.quantity == '' || temp.supplierNameZh == '' || temp.factoryName == '' || temp.deliveryDate == '' || !temp.unitCode) {
          return iMessage.warn('请输入上一条数据必填项')
        }
      }
      this.tableListData.push({
        sapItem: this.itemNum,
        partType: this.fromGroup.PART_TYPE[0].code,
        account: '',
        partNum: '',
        quantity: '',
        unitCode: '',
        supplierNameZh: '',
        supplierSapCode: '',
        factoryName: '',
        procureFactory: '',
        procureOrg: '',
        deliveryDate: '',
        storageLocationCode: '',
        requestTraceNo: '',
        subType: this.applicationTypeVal,
        type: 'SPR',
        departmentInfo: {},
      })
      this.keystring = new Date()
      this.itemNum += 10
      this.getTableList()
    },
    handleTypeChange(val) {
      addType.forEach((element) => {
        if (element.key == val) {
          this.applicationTypeVal = element.label
        }
      })
    },
    deleteItem() {
      let result = []
      let deleteList = []
      if (this.selectTableData.length == 0) {
        return iMessage.warn('请先选择数据')
      }
      this.tableListData.forEach((tableItem) => {
        let canAdd = true
        this.selectTableData.forEach((selectItem) => {
          if (selectItem.sapItem == tableItem.sapItem) {
            canAdd = false
          }
          if (selectItem.riseCode) {
            deleteList.push(selectItem.purchasingRequirementId)
          }
        })
        if (canAdd) {
          result.push(tableItem)
        }
      })
      deleteList = Array.from(new Set(deleteList))
      if (deleteList.length > 0) {
        deleteNormalPr(deleteList)
          .then((res) => {})
          .catch((err) => {})
      }
      this.tableListData = result
      if (this.tableListData.length < this.page.currPage * 10 && this.tableListData.length > 10) {
        this.page.currPage -= 1
      }
      this.getTableList()
    },
    //字典
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.fromGroup = res.data;
        }
      })
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    //工厂更改
    handleFactoryChange(val) {
      // inventoryLocation({ procureFactory: val })
      //   .then((res) => {
      //     if (res.data) {
      //       this.addressList = res.data;
      //     }
      //   })
      //   .catch((err) => {});
    },
    getLocation() {
      inventoryLocation({
        isSpare: false,
      })
        .then((res) => {
          if (res.data) {
            this.addressList = res.data
          }
        })
        .catch((err) => {})
    },
    //导出
    exportExcel() {
      applyExport(this.baseinfodata.riseCode).then((res) => {
        exportExcel(res, `采购申请${this.baseinfodata.riseCode}`)
      })
    },
    //导入
    importExcel() {
      this.baseinfodata.type = this.applicationTypeVal
    },
    // 获取头部信息
    getOutSouringHeadDetail() {
      findNormalPrById({
        riseCode: '1212',
        sapCode: 'qqweqe',
        sapItem: 10
      }).then(res => {
        if (+res.code === 200 && res.data instanceof Array) {
          console.log(res.data)
        }
      })
    },
    // 获取头部信息
    getTableHaderInfo() {
      let params = {
        riseCode: this.baseinfodata.riseCode,
      }
      findNormalPrById(params).then(res => {
        console.log(res);
      })
    },
    // 获取零件采购项目相关信息
    getTableListFn() {
      this.tableLoading = true
      let param = {
        pageSize: 100,
        currentPage: 1,
        riseCode: this.baseinfodata.riseCode,
      }
      if (this.$route.query.sapCode) {
        param.sapCode = this.$route.query.sapCode
      }
      findNormalPrByPage(param)
        .then((res) => {
          this.tableLoading = false
          this.baseinfodata.subType = res.data.records[0].subType
          const valFlag = addType.some((i) => i.label == res.data.records[0].subType)
          if (valFlag) {
            this.applicationTypeVal = addType.find((i) => i.label == res.data.records[0].subType).label
          }
          const keyFlag = addType.some((i) => i.label == res.data.records[0].subType)
          if (keyFlag) {
            this.applicationTypeKey = addType.find((i) => i.label == res.data.records[0].subType).key
          }
          let itemList = []
          res.data.records.sort(function (a, b) {
            return a.sapItem - b.sapItem
          })
          res.data.records.forEach((element) => {
            itemList.push(element.sapItem)
          })
          if (itemList.length > 0) {
            itemList.sort(function (a, b) {
              return b - a
            })
            this.itemNum = itemList[0] + 10
          }
          res.data.records.forEach((element) => {
            element.factoryInfo = `${element.procureFactory}-${element.factoryName}`
            element.supplierInfo = `${element.supplierSapCode}-${element.supplierNameZh}`
            element.locationInfo = {
              inventoryLocation: element.storageLocationCode,
              description: element.storageLocationDesc,
            }
            if (this.fromItem && element.sapItem == this.$route.query.item) {
              if (this.$route.query.subType && element.subType == this.$route.query.subType) {
                this.tableListData.push(element)
              }
              if (!this.$route.query.subType) {
                this.tableListData.push(element)
              }
            }
            if (!this.fromItem) {
              this.tableListData.push(element)
            }
          })
          this.getTableList()
        })
        .catch(() => {})
    },
    getTableList() {
      let temp = cloneDeep(this.tableListData)
      //获取展示table数据
      this.currentListData = temp.slice((this.page.currPage - 1) * 10, (this.page.currPage - 1) * 10 + 10)
      this.page.totalCount = this.tableListData.length
    },
    // 导入回调函数
    async uploadAttachments(formData) {
      this.uploadAttachmentsButtonLoading = true
      const msg = await applyImport(formData)
      if (+msg?.code === 200) {
        this.uploadAttachmentsButtonLoading = false
        this.canEdit = false
        this.tableListData = []
        if (this.baseinfodata.riseCode) {
          this.getTableListFn()
        } else {
          this.tableListData = msg.data
          this.getTableList()
        }
        if (msg.desZh == null || msg.desZh == '') {
          return iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
        } else {
          return this.$message({
            dangerouslyUseHTMLString: true,
            message: this.$i18n.locale === 'zh' ? msg.desZh.replace(/\n|\r\n/g, ' <br/> ') : msg.desEn.replace(/\n|\r\n/g, ' <br/> '),
            type: 'error',
          })
        }
      } else {
        this.uploadAttachmentsButtonLoading = false
        return iMessage.error(msg.desZh == null ? '导入失败' : this.$i18n.locale === 'zh' ? msg.desZh : msg.desEn)
      }
    },
    //查看日志
    lookLog() {
      this.logDialogVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.partsprocureHome {
  position: relative;

  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    color: #001847;
  }
  .card {
    ::v-deep .el-dropdownbtn {
      .canzhao {
        font-size: 16px;
      }
    }
    ::v-deep .el-form {
      display: flex;
      align-items: center;
    }
    ::v-deep .cardHeader {
      .title {
        color: #131523;
        font-weight: bold;
        font-size: 18px;
      }
    }
    .searchbar {
      position: absolute;
    }
  }
  .titlelist {
    margin-top: 20px;
    .ajia-list {
      display: flex;
      flex-direction: row;
      > ul {
        display: flex;
        flex-direction: row;
        > li {
          cursor: pointer;
          width: 122px;
          height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          > span {
            font-size: 18px;
            font-family: Arial;
            font-weight: 400;
            line-height: 25px;
            color: #000000;
            opacity: 0.42;
          }
          &:not(:last-child) {
            height: 25px;
            border-right: 1px solid #909091;
          }
        }
        .active {
          > span {
            font-weight: bold;
            opacity: 1;
            color: #1660f1;
          }
        }
      }
    }
    .btnList {
      > button {
        font-size: 16px;
        font-family: Arial;
        font-weight: bold;
        line-height: 18px;
      }
    }
  }
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    > span {
      width: 150px;
    }
    .select {
      width: 300px;
    }
  }
   
  .card-row {
    margin-top: 20px;
  }
  .margin-bottom20 {
    margin-top: 20px;
  }
  .btnList {
    > span {
      font-size: 20px;
      margin-left: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }

    }
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
    .tabs {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      > ul {
        display: flex;
        flex-direction: row;
        > li {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px;
          font-size: 20px;
          font-family: Arial;
          font-weight: 400;
          line-height: 23px;
          color: #727272;
          opacity: 1;
        }
        .active {
          font-size: 20px;
          font-family: Arial;
          font-weight: bold;
          line-height: 23px;
          color: #000000;
          border-radius: 2px;
          padding-bottom: 5px;
          border-bottom: 2px solid #1763f7;
        }
      }
    }
  }

  .table-top {
    display: flex;
    flex-direction: row;
    align-items: top;
    justify-content: space-between;
    height: 50px;
    > span {
      width: 150px;
    }

    ::v-deep .itext {
      width: 250px;
    }
  }
  .width500 {
    width: 590px;
  }
  .row {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    .col {
      width: 395px;
      // border-right: 1px solid $color-border;
      margin-right: 10px;
      padding-right: 20px;

      &:last-child {
        margin-right: 0px;
        border-right: none;
      }
    }

    .items {
      width: 300px;
    }
  }
}
</style>