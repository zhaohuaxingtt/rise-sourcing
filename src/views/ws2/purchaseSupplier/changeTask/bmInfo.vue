<template>
  <iPage>
    <div class="head">
      <div style="display: flex;">
        <div class="title">{{language('LK_MUJUTOUZIQINGDANBIANGENGXIANGQING', '模具投资清单变更详情')}}：{{ query.changeNum }}</div>
      </div>
      <div class="logButton" @click="iLogShow = true">
        <icon symbol name="iconrizhiwuzi" class="icon"/>
        <span>{{ $t("LK_RIZHI") }}</span>
      </div>
    </div>
    <iLog :show.sync="iLogShow" :bizId="query.bmSerial"></iLog>

    <iCard v-loading="baseInfoLoading">
      <div class="head-serch">
        <div class="top-box">
          <div class="title">{{language('LK_JICHUXINXI', '基础信息')}}</div>
          <icon @click.native="changeSerch(false)" v-if="isOpen" class="icon" symbol name="iconfilterquyukuaijiantoushouqi"></icon>
          <icon @click.native="changeSerch(true)" v-else class="icon" symbol name="iconfilterquyukuaijiantouzhankai"></icon>
        </div>

        <div class="content" v-show="isOpen">
          <div class="c-line">
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_BMDANLIUSHUIHAO', 'BM单流水号') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.bmSerial }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_BMDANHAO', 'BM单号') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.bmNum }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_WBSBIANHAO', 'WBS编号') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.wbsCode }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_SHIFOUHIL', '是否HIL') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.isHilName }}</div>
            </div>

            <div class="item">
              <div class="txt">
                <span>{{ language('LK_KESHI', '科室') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.deptName }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>Linie</span>
              </div>
              <div class="disabled">{{ baseInfo.linieName }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_GONGYINGSHANG', '供应商') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.designatedSupplierName }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_CHEXINGXIANGMU', '车型项目') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.tmCartypeProName }}</div>
            </div>

            <div class="item">
              <div class="txt">
                <span>{{ language('LK_TOUZIZONGJINE', '投资总金额') }}</span>
              </div>
              <div class="disabled">{{ getTousandNum(Number(baseInfo.investmentTotalAmount).toFixed(2)) }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_BIANGENGHOUJINE', '变更后金额') }}</span>
              </div>
              <div class="disabled">{{ getTousandNum(Number(baseInfo.afterChangeAmount).toFixed(2)) }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_DINGDANHAO', '订单号') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.orderNum }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_SAPDINGDANHAO', 'SAP订单号') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.sapOrder }}</div>
            </div>

            <div class="item">
              <div class="txt">
                <span>{{ language('LK_TOUZIQINGDANLAIYUAN', '投资清单来源') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.investmentSourceName }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_LAIYUANBIANHAO', '来源编号') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.investmentSourceNum	 }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_BIANGENLEIXING', '变更类型') }}</span>
              </div>
              <div class="disabled">{{  Number(baseInfo.changeType) === 1 ? 'CBD变更' :
                  (Number(baseInfo.changeType) === 2 ? 'Aeko减值' :
                      (Number(baseInfo.changeType) === 3 ? 'Aeko-模具无变化' :
                          (Number(baseInfo.changeType) === 4 ? 'BM单零件号变化' : '')))  }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>
                  {{ language('LK_BIANGENGDANZHUANGTAI', '变更单状态') }}
                     <Popover
                         v-if="Number(baseInfo.linieConfirmSupplier) === 1"
                         class="popover"
                         placement="bottom-start"
                         :content="baseInfo.linieName + '在' + baseInfo.taskDealDate + '代确认'"
                         trigger="hover">
                        <div slot="reference">
                          <icon symbol name="iconxinxitishi"></icon>
                        </div>
                    </Popover>
                </span>
              </div>
              <div class="disabled">{{ Number(baseInfo.changeStatus) === 1 ? '草稿' :
                  (Number(baseInfo.changeStatus) === 2 ? '已拒绝' :
                      (Number(baseInfo.changeStatus) === 3 ? '待提交' :
                          (Number(baseInfo.changeStatus) === 4 ? '审批中' :
                              (Number(baseInfo.changeStatus) === 5 ? '待补充材料' :
                                  (Number(baseInfo.changeStatus) === 6 ? '已批准' :
                                      (Number(baseInfo.changeStatus) === 7 ? '自动失效' : '' )))))) }}</div>
            </div>

            <div class="item">
              <div class="txt">
                <span>{{ language('LK_RUZHANGDANHAO', '入账单号') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.enterAccountNum }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span>{{ language('LK_RUZHANGRIQI', '入账日期') }}</span>
              </div>
              <div class="disabled">{{ baseInfo.enterAccountDate }}</div>
            </div>
            <div class="item">
              <div class="txt">
                <span></span>
              </div>
              <div class="disabled disabled1"></div>
            </div>
            <div class="item">
              <div class="txt">
                <span></span>
              </div>
              <div class="disabled disabled1"></div>
            </div>
          </div>
        </div>

      </div>
    </iCard>

    <iCard class="table" v-loading="tableLoading">
      <div class="table-top">
        <div class="top-l">
          <div class="item">
            <div style="widht: 80px">{{language('LK_GONGYILEIXING', '工艺类型')}}:</div>
            <iSelect
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="craftType"
                filterable
                clearable
                class="select"
                @change="findMoldViewList"
            >
              <el-option
                  :value="item"
                  :label="item"
                  v-for="(item, index) in craftTypesList"
                  :key="index"
              ></el-option>
            </iSelect>
          </div>

          <div class="item">
            <div style="widht: 112px">{{language('LK_ZICHANFENLEIBIANHAO', '资产分类编号')}}:</div>
            <iSelect
                :placeholder="language('LK_QINGXUANZHE', '请选择')"
                v-model="assetTypeNum"
                filterable
                clearable
                class="select"
                @change="findMoldViewList"
            >
              <el-option
                  :value="item.value"
                  :label="item.name"
                  v-for="(item, index) in assetTypesList"
                  :key="index"
              ></el-option>
            </iSelect>
          </div>
        </div>

        <div class="top-r">
          <iButton
              v-show="!isEdit && (Number(baseInfo.changeStatus) === 1 || Number(baseInfo.changeStatus) === 2)"
              @click="handleEdit">
            {{ language('LK_BIANJI', '编辑') }}
          </iButton>
          <iButton
              v-show="!isEdit"
              @click="changeOrderShow = true; isCheck = true">
            {{ language('LK_CHAKANBIANGENGDAN', '查看变更单') }}
          </iButton>
          <iButton
              v-show="!isEdit && Number(baseInfo.changeStatus) === 1"
              v-loading="sureSupplierLoading"
              @click="sureSupplier">
            {{ language('LK_QUEREN', '确认') }}
          </iButton>

          <iButton
              v-show="isEdit"
              @click="backEdit">
            {{ language('LK_TUICHUBIANJI', '退出编辑') }}
          </iButton>
          <iButton
              v-show="isEdit"
              @click="handlePreView">
            {{ language('LK_YULANBIANGENGDAN', '预览变更单') }}
          </iButton>
          <iButton
              v-show="isEdit"
              v-loading="handleAddLoading"
              @click="handleAdd">
            {{ language('LK_XINZENG', '新增') }}
          </iButton>
          <iButton
              v-show="isEdit"
              @click="handleDelete">
            {{ language('LK_SHANCHU', '删除') }}
          </iButton>
          <iButton
              v-show="isEdit"
              v-loading="handleResetLoading"
              @click="handleReset">
            {{ language('LK_CHONGZHI', '重置') }}
          </iButton>
          <iButton
              v-show="isEdit"
              v-loading="handleSaveLoading"
              @click="handleSave">
            {{ language('LK_BAOCUN', '保存') }}
          </iButton>
        </div>
      </div>

      <iTableList
          class="tableClass"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableRowClassName="tableRowClassName"
          @handleSelectionChange="handleSelectionChange2"
          :selection="isEdit"
          :typeIndex="true"
      >
        <!-- BM单流⽔号 -->
        <template #craftType="scope">
          <div v-show="!isEdit">{{scope.row.craftType}}</div>
          <div v-show="isEdit"><iInput v-model="scope.row.craftType" @input="scope.row.isEdit = true" :placeholder="language('LK_QINGSHURU', '请输入')"></iInput></div>
        </template>
        <template #moldType="scope">
          <div v-show="!isEdit">{{scope.row.moldType}}</div>
          <div v-show="isEdit"><iInput v-model="scope.row.moldType" @input="scope.row.isEdit = true" :placeholder="language('LK_QINGSHURU', '请输入')"></iInput></div>
        </template>
        <template #assetTypeNum="scope">
          <div v-show="!isEdit">{{scope.row.assetTypeNum}}</div>
          <iSelect
              v-show="isEdit"
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              v-model="scope.row.assetTypeNumNo"
              @change="scope.row.isEdit = true"
              filterable
              clearable
              class="select"
          >
            <el-option
                :value="item.value"
                :label="item.name"
                v-for="(item, index) in assetTypesList"
                :key="index"
            ></el-option>
          </iSelect>
        </template>
        <template #partsTotalNum="scope">
          <div v-show="!isEdit">{{scope.row.partsTotalNum}}</div>
          <iSelect
              v-show="isEdit"
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              v-model="scope.row.partsTotalNum"
              @change="changePartsTotalNum(scope.row)"
              filterable
              clearable
              class="select"
          >
            <el-option
                :value="item.value"
                :label="item.value"
                v-for="(item, index) in assemblyPartsList"
                :key="index"
            ></el-option>
          </iSelect>
        </template>
        <template #partsName="scope">
          <div v-show="!isEdit">{{scope.row.partsName}}</div>
          <div v-show="isEdit"><iInput v-model="scope.row.partsName" @input="scope.row.isEdit = true" :placeholder="language('LK_QINGSHURU', '请输入')"></iInput></div>
        </template>
        <template #partsNum="scope">
          <div v-show="!isEdit">{{scope.row.partsNum}}</div>
          <div v-show="isEdit"><iInput v-model="scope.row.partsNum" @input="scope.row.isEdit = true" :placeholder="language('LK_QINGSHURU', '请输入')"></iInput></div>
        </template>
        <template #count="scope">
          <div v-show="!isEdit">{{scope.row.count}}</div>
          <div v-show="isEdit"><iInput
              v-model="scope.row.count"
              :placeholder="language('LK_QINGSHURU', '请输入')"
              @blur="changeAssetTotal(scope.row.index)"
              onkeyup="value=value.replace(/[^0-9]+/g, '')"
          ></iInput></div>
        </template>
        <template #assetPrice="scope">
          <div v-show="!isEdit">{{scope.row.assetPrice ? getTousandNum(Number(scope.row.assetPrice).toFixed(2)) : scope.row.assetPrice}}</div>
          <div v-show="isEdit">
            <iInput
                v-model="scope.row.assetPrice"
                :placeholder="language('LK_QINGSHURU', '请输入')"
                @input="scope.row.isEdit = true"
                @focus="focus(scope.row.index)"
                @blur="blur(scope.row.index)"
                onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')"
            >
            </iInput>
          </div>
        </template>
        <template #changeReason="scope">
          <div v-show="!isEdit">{{ scope.row.changeReason }}</div>
          <div v-show="isEdit">
            <iInput
                @input="scope.row.isEdit = true"
                v-model="scope.row.changeReason"
                :placeholder="language('LK_QINGSHURU', '请输入')"
            >
            </iInput>
          </div>
        </template>
        <template #assetTotal="scope">
          <div>{{scope.row.assetTotal ? getTousandNum(Number(scope.row.assetTotal).toFixed(2)) : scope.row.assetTotal}}</div>
        </template>
        <template #picture="scope">
          <div v-if="scope.row.picture" class="table-link" @click="openPhotoList(scope.row.picture.split(','))">查看</div>
          <div v-else></div>
        </template>
        <template #partsShareNum="scope">
          <div v-show="!isEdit">
            <div v-if="scope.row.partsShareNum">
              <Popover
                  placement="bottom"
                  trigger="hover">
                <div>
                  <div v-for="(item, index) in scope.row.partsShareNum.split(',')" :key="index">{{ item }}</div>
                </div>
                <div slot="reference">
                  {{ scope.row.partsShareNum.split(',')[0] }}<span v-if="scope.row.partsShareNum && scope.row.partsShareNum.includes(',')">...</span>
                </div>
              </Popover>
            </div>
            <div v-else>{{ scope.row.partsShareNum }}</div>
          </div>
          <iSelect
              class="multipleSelect select"
              v-show="isEdit"
              :placeholder="language('LK_QINGXUANZHE', '请选择')"
              v-model="scope.row.partsShareNumNo"
              filterable
              clearable
              collapse-tags
              multiple
          >
            <el-option
                :value="item.value"
                :label="item.value"
                v-for="(item, index) in sharePartsList"
                :key="index"
            ></el-option>
          </iSelect>
        </template>
      </iTableList>

      <div class="unitStyle">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>

      <!--      <div class="UnitExplain">-->
      <!--        <UnitExplain />-->
      <!--      </div>-->
    </iCard>

    <confirm v-model="confirmShow" @sure="bmBuberConfirm"></confirm>
    <changeOrder v-model="changeOrderShow" @sure="bmBuberConfirm" :changeOederData="changeOederData" :isCheck="isCheck"></changeOrder>
    <photoList :imgList="imgList" :visible="photoListShow" @changeLayer="() => photoListShow = false"></photoList>
  </iPage>
</template>

<script>
import {
  iTableList
} from "@/components";
import {
  iPage,
  iMessage,
  iLog,
  iButton,
  iSelect,
  iCard,
  icon,
  iInput
} from "rise";
import {
  Upload
} from "element-ui";
import {changeTaskBmInfoTitle , changeTaskInfoTableTitle} from "../components/data"
import changeOrder from "../components/changeOrder"
import confirm from "../components/confirm"
import photoList from "../components/photoList"
import { Popover } from "element-ui"
import {
  basicsInfoSupplier,
  mouldListSupplier,
  bmMoldExport,
  assetTypes,
  craftTypes,
  removeAttachment,
  bmBuberConfirm,
  upLoadFileByIds,
  attachmentUpload,
  supplierToConfirm,
  saveChange,
  reset,
} from "@/api/ws2/purchaseSupplier/changeTask/bmInfo.js";
import {
  getMoldId,
  assemblyParts,
  shareParts,
} from "@/api/ws2/purchase/changeTask/bmInfo";
import {delcommafy, getTousandNum} from "@/utils/tool";
import {recall} from "@/api/ws2/purchase/investmentList";
import {cloneDeep} from "lodash";

export default {
  components: {
    iPage,
    iSelect,
    iCard,
    icon,
    iTableList,
    iButton,
    Popover,
    confirm,
    photoList,
    iLog,
    Upload,
    iInput,
    changeOrder
  },

  data(){
    return {
      versionId: '',
      versionList: [],  //  版本列表
      technologyTypeList: [], //  工艺类型
      assetsTypeList: [], //  资产分类编号
      tableTitle: changeTaskBmInfoTitle,
      tableListData: [],
      assetTypesList: [],
      craftTypesList: [],
      sharePartsList: [],
      assemblyPartsList: [],
      imgList: [],
      isOpen: true,
      confirmShow: false,
      changeOrderShow: false,
      isCheck: false,
      changeOederData: {},
      photoListShow: false,
      detailsTableLoading: false,
      baseInfoLoading: false,
      tableLoading: false,
      tableLoading2: false,
      bmBuberLoading: false,
      recallLoading: false,
      sureSupplierLoading: false,
      sendSupplierLoading: false,
      iLogShow: false,
      uploadButtonLoading: false,
      handleSaveLoading: false,
      handleResetLoading: false,
      handleAddLoading: false,
      query: {
        bmId: '',
        bmChangeId: '',
        changeNum: '',
      },
      baseInfo: {},
      assetTypeNum: '',
      craftType: '',
      getTousandNum: getTousandNum,
      delcommafy: delcommafy,
      changeTaskInfoTableTitle,
      enclosureTableListData: [],
      multipleSelection: [],
      multipleSelection2: [],
      isEdit: false,
    }
  },
  created() {
    this.query = this.$route.query
    this.getAllSelect()
    this.moldHeaderByBmSerial()
    this.findMoldViewList()
  },
  methods: {
    changePartsTotalNum(row){
      let item = this.assemblyPartsList.find(item => row.partsTotalNum === item.value)
      this.tableListData[row.index].partsTotalName = item ? item.name : ''
      this.tableListData[row.index].isEdit  = true
    },
    handleReset(){
      this.handleResetLoading = true
      reset({
        id: this.query.bmChangeId,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.isEdit = false
          this.moldHeaderByBmSerial()
          this.findMoldViewList()
          this.attachment()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.handleResetLoading = false
      }).catch(() => {
        this.handleResetLoading = false
      });
    },
    handleRecall(){
      this.recallLoading = true
      recall({bmChangeId: this.query.bmChangeId}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.moldHeaderByBmSerial()
          this.findMoldViewList()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.recallLoading = false
      }).catch(() => {
        this.recallLoading = false
      });
    },
    handleEdit(){
      this.isEdit = true
    },
    handlePreView(){
      this.changeOederData = {
        moldChangeDtos: this.tableListData.map(item => {
          item.assetPrice = Number(this.delcommafy(item.assetPrice))
          return item
        }),
        id: this.query.bmChangeId,
        newMoldInvestmentAmount: this.baseInfo.afterChangeAmount,
        optimistic: this.baseInfo.optimistic,
      }
      this.changeOrderShow = true
      this.isCheck = false
    },
    handleAdd(){
      this.handleAddLoading = true
      getMoldId({
        changeId: this.query.bmChangeId,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          let tableListData = cloneDeep(this.tableListData)
          tableListData.unshift({
            moldId: res.data,
            bmMoldId: null,
            assetName: null,
            assetNum: null,
            assetPrice: 0,
            assetTotal: null,
            assetTypeNum: null,
            bmId: null,
            carTypeProId: null,
            carTypeProName: null,
            categoryCode: null,
            categoryName: null,
            changeReason: null,
            changeType: 1,
            changeTypeName: null,
            count: null,
            craftType: null,
            fsNum: null,
            id: null,
            isPermission: null,
            moldManufacturer: null,
            moldType: null,
            partsName: null,
            partsNum: null,
            partsShareNum: null,
            partsTotalName: null,
            partsTotalNum: null,
            picture: null,
            isEdit: true,
            isAdd: true
          })
          tableListData = tableListData.map((item, index) => {
            item.index = index
            item.partsShareNumNo = item.partsShareNum ? item.partsShareNum.split(',') : ''
            item.assetTypeNumNo = item.assetTypeNum ? item.assetTypeNum.split('-')[0] : ''
            return item
          })
          this.tableListData = tableListData
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.handleAddLoading = false
      }).catch(() => {
        this.handleAddLoading = false
      });
    },
    tableRowClassName({row, rowIndex}) {
      if(Number(row.changeType) === 0){
        return 'warning-row';
      }
      return ''
    },
    handleDelete(){
      if(!this.multipleSelection2 || this.multipleSelection2.length === 0){
        iMessage.warn(this.language('LK_BAAPPLYTISP1', '请先勾选'))
        return
      }
      let deleteItem = []
      this.multipleSelection2.map(item => {
        if(item.bmMoldId === null || item.bmMoldId === 0){
          this.tableListData.splice(this.tableListData.findIndex(a => a.moldId === item.moldId), 1)
        } else {
          deleteItem.push(item.id)
        }
      })
      this.tableListData = this.tableListData.map(a => {
        if(deleteItem.some(b => b === a.id)){
          a.changeType = 0
          a.isEdit = true
        }
        return a
      })
      iMessage.success(this.language('LK_SHANCHUCHENGGONG', '删除成功'))
    },
    backEdit(){
      this.isEdit = false
      if(this.tableListData[0].isAdd){
        this.tableListData.shift()
      }
      this.tableListData = this.tableListData.map(item => {
        item.isEdit = false
        return item
      })
    },
    handleSave(){
      this.handleSaveLoading = true
      if(this.tableListData.some(item => {
        if(item.isEdit){
          return !item.changeReason
        }
        return false
      })){
        iMessage.warn(this.language('LK_QINGTIANXIWBIANGENGYUANYIN', '请填写比变更原因'))
        this.handleSaveLoading = false
        return
      }
      saveChange({
        moldChangeDtos: this.tableListData.map(item => {
          item.assetPrice = Number(this.delcommafy(item.assetPrice))
          return item
        }),
        id: this.query.bmChangeId,
        newMoldInvestmentAmount: this.baseInfo.afterChangeAmount,
        optimistic: this.baseInfo.optimistic,
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.isEdit = false
          this.moldHeaderByBmSerial()
          this.findMoldViewList()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.handleSaveLoading = false
      }).catch(() => {
        this.handleSaveLoading = false
      });
    },
    focus(index){
      this.tableListData[index].assetPrice = this.delcommafy(this.tableListData[index].assetPrice)
    },
    blur(index){
      let value = this.tableListData[index].assetPrice
      value = value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')
      this.tableListData[index].assetPrice = this.getTousandNum(Number(value).toFixed(2))
      this.tableListData[index].assetTotal = this.tableListData[index].count * value
      this.baseInfo.afterChangeAmount = this.tableListData.map(item => item.assetTotal).reduce((a, b) => a + b)
    },
    changeAssetTotal(index, isMoney){
      this.countTemp = parseInt(String(this.tableListData[index].count))
      this.tableListData[index].count = parseInt(String(this.tableListData[index].count))
      this.tableListData[index].assetTotal = this.countTemp * this.delcommafy(this.tableListData[index].assetPrice)
      this.tableListData[index].isEdit = true
      this.baseInfo.afterChangeAmount = this.tableListData.map(item => item.assetTotal).reduce((a, b) => a + b)
    },
    handleSelectionChange2(list) {
      this.multipleSelection2 = list
    },
    beforeAvatarUpload() {},
    handleAvatarSuccess() {},
    async myUpload(content) {
      this.uploadButtonLoading = true
      const formData = new FormData()
      formData.append('applicationName', 'rise-dev')
      formData.append('businessId', this.query.bmChangeId)
      formData.append('currentUserId', this.$store.state.permission.userInfo.id)
      formData.append('multifile', content.file)
      formData.append('type', '1')
      const res = await upLoadFileByIds(formData)
      if(res){
        attachmentUpload(res.map(item => ({
          attachmentId: item.id,
          attachmentName: item.name,
          attachmentUrl: item.path,
          bmChangeId: this.query.bmChangeId
        }))).then((data) => {
          const result = this.$i18n.locale === 'zh' ? data.desZh : data.desEn
          if (Number(data.code) === 0) {
            iMessage.success(result);
          } else {
            iMessage.error(result);
          }
          this.uploadButtonLoading = false
        }).catch(() => {
          this.uploadButtonLoading = false
        });
      } else {
        this.uploadButtonLoading = false
      }
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    bmBuberConfirmBefore(){
      if(this.baseInfo.moldInvestmentStatus === '2'){
        this.confirmShow = true
      } else {
        this.bmBuberConfirm()
      }
    },
    bmBuberConfirm(){
      this.bmBuberLoading = true
      bmBuberConfirm({id: this.query.id}).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.moldHeaderByBmSerial()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.bmBuberLoading = false
      }).catch(() => {
        this.bmBuberLoading = false
      });
    },

    sureSupplier(){
      this.sureSupplierLoading = true
      supplierToConfirm(this.query.bmId, this.query.bmChangeId).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.moldHeaderByBmSerial()
          this.findMoldViewList()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.sureSupplierLoading = false
      }).catch(() => {
        this.sureSupplierLoading = false
      });
    },
    getAllSelect() {
      this.loadingiSearch = true
      Promise.all([assetTypes(), craftTypes(), shareParts({bmId: this.query.bmId}), assemblyParts({bmId: this.query.bmId})]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
        const result2 = this.$i18n.locale === 'zh' ? res[2].desZh : res[2].desEn
        const result3 = this.$i18n.locale === 'zh' ? res[3].desZh : res[3].desEn
        if (Number(res[0].code) === 0) {
          this.assetTypesList = res[0].data
        } else {
          iMessage.error(result0);
        }
        if (res[1].data) {
          this.craftTypesList = res[1].data;
        } else {
          iMessage.error(result1);
        }
        if (res[2].data) {
          this.sharePartsList = res[2].data;
        } else {
          iMessage.error(result2);
        }
        if (res[3].data) {
          this.assemblyPartsList = res[3].data;
        } else {
          iMessage.error(result3);
        }
        this.loadingiSearch = false
      }).catch(() => {
        this.loadingiSearch = false
      });

    },
    moldHeaderByBmSerial(){
      this.baseInfoLoading = true
      basicsInfoSupplier({
        changeNum : this.query.changeNum
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.baseInfo = res.data
        } else {
          iMessage.error(result);
        }
        this.baseInfoLoading = false
      }).catch(() => {
        this.baseInfoLoading = false
      });
    },

    removeAttachment(){
      if(!this.multipleSelection || this.multipleSelection.length === 0){
        iMessage.warn(this.language('LK_BAAPPLYTISP1', '请先勾选'))
        return
      }
      this.baseInfoLoading = true
      removeAttachment(this.multipleSelection.map(item => ({attachmentId: item.attachmentId, bmChangeId: item.bmChangeId}))).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.baseInfoLoading = false
      }).catch(() => {
        this.baseInfoLoading = false
      });
    },

    findMoldViewList(){
      this.tableLoading = true
      mouldListSupplier({
        assetTypeNum: this.assetTypeNum,
        bmId: this.query.bmId,
        craftType: this.craftType,
        veriosn: '',
      }).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.tableListData = res.data.map((item, index) => {
            item.index = index
            return item
          })
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    changeSerch(type){
      this.isOpen = type;
    },

    exportList(){ //  导出
      this.tableLoading = true
      bmMoldExport(this.tableListData).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      });
    },
    confirm(){
      this.confirmShow = true
    },
    openPhotoList(imgList){
      this.photoListShow = true
      this.imgList = imgList
    }
  }
}
</script>

<style lang="scss" scoped>
.tableClass ::v-deep .warning-row {
  background-color: #e0e5ee;
}
.enclosure-block{
  margin-top: 20px;
  .upload{
    margin-left: 10px;
    display: inline-block;
  }
  .head{
    display: flex;
    justify-content: space-between;

    .title{
      color: #020918;
      font-weight: bold;
    }
  }


}

.table-link{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  cursor: pointer;
}
.changeList{

}
.UnitExplain{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.table{
  margin-top: 20px;

  .table-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .top-l{
      display: flex;
      align-items: center;

      .item{
        display: flex;
        align-items: center;
        margin-right: 40px;

        .select{
          width: 220px;
          margin-left: 20px;
        }
      }
    }


  }
}

.head-serch{
  .content{
    .c-line{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .disabled1{
        background-color: #fff !important;
      }

      .disabled{
        width: 250px;
        height: 35px;
        background: #F8F8FA;
        border-radius: 4px;
        text-align: center;
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
      }

      .item{
        display: flex;
        flex: 0 1 auto;
        line-height: 35px;
        margin-bottom: 20px;
      }

      .txt{
        font-size: 16px;
        color: #4B4B4C;
        width: 125px;
        .popover{
          display: inline-block;
        }
      }
      .disabled{
        font-size: 14px;
        color: #000000;
      }
    }
  }

  .top-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .icon{
      width: 25px;
      height: 14px;
      cursor: pointer;
    }

    .title{
      color: #131523;
      font-size: 18px;
      font-weight: bold;
    }
  }

}
.head{
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
  .logButton{
    font-size: 14px;
    color: #1763F7;
    font-weight: bold;
    cursor: pointer;
    .icon{
      font-size: 20px;
      margin-right: 5px;
      vertical-align: top;
    }
  }
  .title{
    font-size: 20px;
    font-weight: bold;
    margin-right: 30px;
  }

  .edition{
    display: flex;
    align-content: center;
    align-items: center;

    .txt{
      color: #0D2451;
      font-size: 14px;
    }
    .disabled{
      font-size: 14px;
      color: #000000;
    }
  }
}
.multipleSelect {
  ::v-deep .el-tag {
    max-width: calc(100% - 75px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>