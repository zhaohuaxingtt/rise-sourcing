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
                <span>{{ language('LK_BIANGENGDANZHUANGTAI', '变更单状态') }}</span>
              </div>
              <div class="disabled">{{ Number(baseInfo.changeStatus) === 1 ? '草稿' :
                  (Number(baseInfo.changeStatus) === 2 ? '审批中' :
                      (Number(baseInfo.changeStatus) === 3 ? '已批准' :
                          (Number(baseInfo.changeStatus) === 4 ? '已拒绝' :
                              (Number(baseInfo.changeStatus) === 5 ? '已驳回' :
                                  (Number(baseInfo.changeStatus) === 6 ? '自动失效' : '' ))))) }}</div>
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
              v-loading="bmBuberLoading"
              @click="bmBuberConfirmBefore">
            {{ language('LK_BIANJI', '编辑') }}
          </iButton>
          <iButton
              v-loading="sendSupplierLoading"
              @click="sendSupplier">
            {{ language('LK_CHAKANBIANGENGDAN', '查看变更单') }}
          </iButton>
          <iButton
              v-loading="sureSupplierLoading"
              @click="sureSupplier">
            {{ language('LK_QUEREN', '确认') }}
          </iButton>
        </div>

      </div>

      <iTableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :selection="false"
          :typeIndex="true"
      >
        <!-- BM单流⽔号 -->
        <template #assetPrice="scope">
          <div>{{scope.row.assetPrice ? getTousandNum(Number(scope.row.assetPrice).toFixed(2)) : scope.row.assetPrice}}</div>
        </template>
        <template #assetTotal="scope">
          <div>{{scope.row.assetTotal ? getTousandNum(Number(scope.row.assetTotal).toFixed(2)) : scope.row.assetTotal}}</div>
        </template>
        <template #picture="scope">
          <div v-if="scope.row.picture" class="table-link" @click="openPhotoList(scope.row.picture.split(','))">查看</div>
          <div v-else></div>
        </template>
        <template #partsShareNum="scope">
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
        </template>
      </iTableList>
      <div class="unitStyle">{{ $t('货币：人民币  |  单位：元  |  不含税 ') }}</div>

      <!--      <div class="UnitExplain">-->
      <!--        <UnitExplain />-->
      <!--      </div>-->
    </iCard>

    <confirm v-model="confirmShow" @sure="bmBuberConfirm"></confirm>
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
  icon
} from "rise";

import {changeTaskBmInfoTitle , changeTaskInfoTableTitle} from "../components/data"
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
  supplierToConfirm
} from "@/api/ws2/purchaseSupplier/changeTask/bmInfo.js";
import {getTousandNum} from "@/utils/tool";
import {sendSupplier} from "@/api/ws2/purchase/investmentList";

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
      imgList: [],
      isOpen: true,
      confirmShow: false,
      photoListShow: false,
      detailsTableLoading: false,
      baseInfoLoading: false,
      tableLoading: false,
      tableLoading2: false,
      bmBuberLoading: false,
      sendSupplierLoading: false,
      sureSupplierLoading: false,
      iLogShow: false,
      uploadButtonLoading: false,
      query: {
        bmId: '',
        bmChangeId: '',
        changeNum: '',
      },
      baseInfo: {},
      assetTypeNum: '',
      craftType: '',
      getTousandNum: getTousandNum,
      changeTaskInfoTableTitle,
      enclosureTableListData: [],
    }
  },
  created() {
    this.query = this.$route.query
    this.getAllSelect()
    this.moldHeaderByBmSerial()
    this.findMoldViewList()
  },
  methods: {
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
    sendSupplier(){
      this.sendSupplierLoading = true
      sendSupplier([{bmid: this.query.id}]).then((res) => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
        if (Number(res.code) === 0) {
          this.moldHeaderByBmSerial()
          iMessage.success(result);
        } else {
          iMessage.error(result);
        }
        this.sendSupplierLoading = false
      }).catch(() => {
        this.sendSupplierLoading = false
      });
    },
    getAllSelect() {
      this.loadingiSearch = true
      Promise.all([assetTypes(), craftTypes()]).then((res) => {
        const result0 = this.$i18n.locale === 'zh' ? res[0].desZh : res[0].desEn
        const result1 = this.$i18n.locale === 'zh' ? res[1].desZh : res[1].desEn
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
          this.tableListData = res.data
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
</style>