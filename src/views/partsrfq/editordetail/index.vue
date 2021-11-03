<!--
 * @Author: your name
 * @Date: 2021-02-25 10:09:50
 * @LastEditTime: 2021-11-02 19:30:34
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\editordetail\index.vue
-->
<template>
  <iPage>
    <!-- rfq详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>{{ $route.query.id ? 'RFQ' : language('LK_XINJIANRFQ','新建RFQ') }}</span>
        <iNavMvp lang :query='$route.query' :lev='2' routerPage :list='navList' @change='changeRouter'></iNavMvp>
      </div>
      <div class="btnList">
        <span v-if="!disabled">
          <iButton :loading="newRfqOpenValidateLoading" @click="newRfq" v-permission.auto="PARTSRFQ_EDITORDETAIL_NEWRFQROUND|新建RFQ轮次">
            {{
            language('LK_XINJIANRFQLUNCI','新建RFQ轮次')
            }}
          </iButton>
          <iButton :loading='rfqloading' @click="updateRfqStatus('06')" v-permission.auto="PARTSRFQ_EDITORDETAIL_SENDINQUIRY|发出询价">{{
              language('LK_FACHUXUNJIA','发出询价')
            }}
          </iButton>
          <iButton :loading='endingloading'  @click="updateRfqStatus('05')" v-permission.auto="PARTSRFQ_EDITORDETAIL_ENDQUOTATION|结束本轮询价">
            {{ language('LK_JIESHUBENLUNXUNJIA','结束本轮询价') }}
          </iButton>
          <iButton  :loading='transferlaoding' @click="updateRfqStatus('03')" v-permission.auto="PARTSRFQ_EDITORDETAIL_TRANSFERNEGOTIATION|转谈判">
            {{ language('LK_ZHUANTANPAN','转谈判') }}
          </iButton>
          <iButton v-permission.auto="PARTSRFQ_EDITORDETAIL_CREATEAPPLICATION|创建定点申请" :loading="createDesignateLoading" @click="createDesignate">
            {{ language('LK_CHUANGJIANDINGDIANSHENQING','创建定点申请') }}
          </iButton>
          <iButton @click="backPage">{{ language('LK_FANHUI','返回') }}</iButton>
          </span>
          <iButton type="text" @click="toLogPage" v-permission.auto="PARTSRFQ_EDITORDETAIL_LOG|日志">
            <icon symbol name="iconrizhiwuzi" class="log-icon"/>
            <span class="log-word">{{ language('LK_RIZHI','日志') }}</span>
          </iButton>
        <span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
      </div>
    </div>
    <iCard collapse class="margin-bottom20 margin-top20" :title="language('LK_JICHUXINXI','基础信息')" v-loading="baseInfoLoading">
      <!------------------------------------------------------------------------>
      <!--                  基本信息区域                                       --->
      <!------------------------------------------------------------------------>
      <iFormGroup row="1" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem  v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQNUMBER|RFQ编号" :label="language('LK_RFQBIANHAO','RFQ编号')+':'" name="id">
              <iText>{{ baseInfo.id }}</iText>
            </iFormItem>
            <iFormItem v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQNAME|RFQ名称" :label="language('LK_RFQMINGCHENG','RFQ名称')+':'" name="rfqName">
              <iInput v-if="editStatus" v-model="baseInfo.rfqName"></iInput>
              <iText v-else>
                {{ baseInfo.rfqName }}
              </iText>
            </iFormItem>
            <iFormItem :label="language('LK_EP','技术评分人')+':'" name="ep" v-permission.auto="PARTSRFQ_EDITORDETAIL_EP|技术评分人">
              <iText  forceTooltip :tooltipContent="baseInfo.ep">{{ nameProcessor(baseInfo.ep) }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_CF','财务控制员')+':'" name="cf"  v-permission.auto="PARTSRFQ_EDITORDETAIL_CF|财务控制员">
              <!-- <iInput v-if="editStatus" v-model="baseInfo.cf" v-permission.auto="PARTSRFQ_EDITORDETAIL_CF"></iInput> -->
              <iText forceTooltip :tooltipContent="baseInfo.cf">{{ nameProcessor(baseInfo.cf) }}</iText>
            </iFormItem>

            <iFormItem :label="language('LK_BENLUNBAOJIAJIEZHISHIJIAN','本轮报价截止时间')+':'" name="currentRoundsEndTime">
              <iText v-permission.auto="PARTSRFQ_EDITORDETAIL_DEADLINEQUOTATIONS|本轮报价截止时间">{{ baseInfo.currentRoundsEndTime }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem :label="language('LK_RFQZHUANGTAI','RFQ状态')+':'" name="statusName">
              <iText v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQSTATUS|RFQ状态">{{ baseInfo.currentStatus }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_XUNJIACAIGOUYUAN','询价采购员')+':'" name="buyerName">
              <iText v-permission.auto="PARTSRFQ_EDITORDETAIL_INQUIRYBUYER|询价采购员">{{ baseInfo.buyerName }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_MQ','质量评分人')+':'" name="mq" v-permission.auto="PARTSRFQ_EDITORDETAIL_MQ|质量评分人">
              <iText  forceTooltip :tooltipContent="baseInfo.mq">{{ nameProcessor(baseInfo.mq) }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_DANGQIANLUNCI','当前轮次')+':'" name="currentRounds" v-permission.auto="PARTSRFQ_EDITORDETAIL_CURRENTROUND|当前轮次">
              <iText >{{ baseInfo.currentRounds }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_LUNCILEIXING','轮次类型')+':'" name="roundsTypeName" v-permission.auto="PARTSRFQ_EDITORDETAIL_ROUNDTYPE|轮次类型">
              <iText >
                {{ baseInfo.roundsTypeName }}
              </iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem :label="language('LK_CHUANGJIANRIQI','创建日期')+':'" name="createDate">
              <iText v-permission.auto="PARTSRFQ_EDITORDETAIL_CREATIONDATE|创建日期">
                {{ $route.query.id ? baseInfo.createDate : moment().format('YYYY-MM-DD') }}
              </iText>
            </iFormItem>
            <iFormItem label="LINIE：" name="linieNameZh">
              <iText v-permission.auto="PARTSRFQ_EDITORDETAIL_LINE|LINIE">{{ baseInfo.linieNameZh }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_PL','物流审核人')+':'" name="test" v-permission.auto="PARTSRFQ_EDITORDETAIL_PL|物流审核人">
              <!-- <iInput v-if="editStatus" v-model="baseInfo.pl" v-permission.auto="PARTSRFQ_EDITORDETAIL_PL"></iInput> -->
              <iText  forceTooltip :tooltipContent="baseInfo.pl">{{ nameProcessor(baseInfo.pl) }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_BENLUNZHUANGTAI','本轮状态')+':'" name="test">
              <iText v-permission.auto="PARTSRFQ_EDITORDETAIL_CURRENTSTATE|本轮状态">{{ baseInfo.currentRoundsStatus }}</iText>
            </iFormItem>
            <div class="edit-button-row">
              <i-button v-if="!disabled" @click="edit" v-permission.auto="PARTSRFQ_EDITORDETAIL_SAVE|编辑/保存">{{
                  !editStatus ? language('LK_BIANJI','编辑') : language('LK_BAOCUN','保存')
                }}
              </i-button>
            </div>
          </div>
        </div>
      </iFormGroup>
    </iCard>
    <!--------------------------------------------------------------->
    <!-------------------------RFQ待办信息---------------------------->
    <!--------------------------------------------------------------->
    <rfqPending ref="rfqPending" v-if="(navActivtyValue === '0' || navActivtyValue === '') && tabShowStatus"></rfqPending>
    <!--------------------------------------------------------------->
    <!-------------------------RFQ详情信息---------------------------->
    <!--------------------------------------------------------------->    
    <rfq-detail-info v-if="navActivtyValue === '1' && tabShowStatus" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_CARD|RFQ详情信息"></rfq-detail-info>
    <!--------------------------------------------------------------->
    <!-------------------------报价助手------------------------------->
    <!--------------------------------------------------------------->
    <rfq-detail-tpzs v-if='navActivtyValue == 2'></rfq-detail-tpzs>
    <new-rfq-round v-model="newRfqRoundDialog" @refreshBaseInfo="getBaseInfo" :dataRes="newRfqRoundDialogRes" v-if="tabShowStatus"/>

    <nominateTypeDialog :visible.sync="nominateTypeDialogVisible" @confirm="createDesignate" />
  </iPage>
</template>
<script>
import {
  iButton,
  iPage,
  icon,
  iCard,
  iFormGroup,
  iFormItem,
  iText,
  iInput,
  iMessage,
  iNavMvp
} from "rise";
import rfqPending from './components/rfqPending'
import rfqDetailInfo from './components/rfqDetailInfo'
import newRfqRound from './components/newRfqRound'
import rfqDetailTpzs from './components/rfqDetailTpzs'
import {getRfqDataList, addRfq, modification, updateRfqInfo, pageRfqRound, getRfqList} from "@/api/partsrfq/home";
import store from '@/store'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
import {navList} from './components/data'
import nominateTypeDialog from "@/views/partsrfq/home/components/nominateTypeDialog"
import { selectRfq } from "@/api/designate/designatedetail/addRfq"
import { getTabelData} from "@/api/partsprocure/home";
import { pageMixins } from "@/utils/pageMixins";
import { tableTitle,form } from "@/views/partsprocure/home/components/data";
import { getRfqInfo } from "@/api/costanalysismanage/rfqdetail"
export default {
  components: {
    iButton,
    iPage,
    icon,
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iInput,
    rfqPending,
    rfqDetailInfo,
    newRfqRound,
    iNavMvp,
    rfqDetailTpzs,
    nominateTypeDialog
  },
  mixins: [rfqCommonFunMixins,pageMixins],
  data() {
    return {
      navActivtyValue: '',
      navList: navList,
      editStatus: false,
      newRfqRoundDialog: false,
      baseInfo: {
        currentRoundsStatus:'',
        currentRounds:'',
        currentStatus:''
      },
      baseInfoLoading: false,
      tabShowStatus: true,
      newRfqRoundList: [],
      newRfqOpenValidateLoading: false,
      nominateTypeDialogVisible: false,
      parmarsHasRfq: JSON.parse(JSON.stringify(form)),
      newRfqRoundDialogRes:{}, 
      rfqloading:false,
      endingloading:false,
      transferlaoding:false,
      disabled: true,
      linieUserId:'',
      childFnList:[]
    }
  },
  mounted(){
    this.getBaseInfo()
  },
  created() {
    this.getTableList()
    this.getRfqInfo()
    this.getPartTableList = this.$store.state.rfq.partfunc
  },
  provide: function(){
    return {
      getBaseInfo:this.getBaseInfo, //当前是一个请求
      getbaseInfoData:this.getbaseInfoData,  //直接reture当前请求完的数据
      getDisabled: this.getDisabled,
      registerFn:this.registerFn
    }
  },
  methods: {
    registerFn(fn){
      this.childFnList.push(fn)
    },
    getbaseInfoData(){
      return this.baseInfo
    },
    /**
     * @description:  //获取表格数据 为新件轮次做数据准备
     * @param {*}
     * @return {*}
     */
    getTableList() {
      if (this.$route.query.id) {
        this.confirmTableLoading = true
        this.parmarsHasRfq['size'] = this.pageSize || 10
        this.parmarsHasRfq['current'] = this.currPage || 1
        // this.parmarsHasRfq['rfqId'] = this.$route.query.id
        this.parmarsHasRfq['status'] = 'NOT_IN_RFQ'
        this.parmarsHasRfq['linieId'] = this.linieUserId
        this.parmarsHasRfq['buyerId'] = this.baseInfo.buyerId
        getTabelData(this.parmarsHasRfq).then(res => {
          this.$store.dispatch('setPendingPartsList', res.data.map(r=>{return {...r,...{purchaseProjectId:r.id}}}))
        }).catch(() => this.confirmTableLoading = false)
      }
    },
    changeRouter(router){
      
    },
    backPage() {
      this.$router.go(-1)
    },
    nameProcessor(val) {
      if (!val) return ''
      const arr = val.split(',')
      if (arr.length > 3) {
        return `${ arr.splice(0, 3).join(',') }...`
      } else {
        return val
      }
    },
    async getBaseInfo() {
      const query = this.$route.query
      if (query.id) {
        this.baseInfoLoading = true
        const req = {
            userId: store.state.permission.userInfo.id,
            rfqId: query.id
        }
        try {
          const res = await getRfqList(req)
          const resList = res.data
          if (resList.length > 0) {
            this.baseInfo = res.data[0]
            this.$store.state.rfq.partfunc
            if(typeof this.$store.state.rfq.partfunc === "function")
              this.getPartTableList()
          } else {
            this.baseInfo = ''
          }
            //获取详细信息后 刷新tab栏里面的询价管理（只要存在轮次大于1则显示询价管理页签）
          this.childFnList.forEach(i=>i())
          this.baseInfoLoading = false
        } catch {
          this.baseInfoLoading = false
        }
      } else {
        this.editStatus = true
      }
    },
    getRfqInfo() {
      this.baseInfoLoading = true
      if(this.$route.query.id){
        getRfqInfo({
          rfqId: this.$route.query.id
        })
        .then(res => {
          if (res.code == 200) {
            this.disabled = !!res.data.isFreeze
            console.log(res.data.isFreeze)
            console.log(this.disabled)
          } else {
            iMessage.error(this.language("HUOQURFQDINGDIANXINXISHIBAI", "获取RFQ定点信息失败"))
          }
        })
        .finally(() => this.baseInfoLoading = false)
      } else {
        this.disabled = false
        this.baseInfoLoading = false
      }
    },
    changeNav(target) {
      this.navActivtyValue = target.index
    },
    async newRfq() {
      this.newRfqOpenValidateLoading = true
      const pendingPartsList = this.$store.state.rfq.pendingPartsList

      await this.getNewRoundList()
      if (pendingPartsList.length === 0 || this.newRfqRoundList.length === 0) {
        iMessage.warn(this.language('LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG','RFQ零件或者RFQ供应商为空，不能创建RFQ轮次'))
        this.newRfqOpenValidateLoading = false
        return false
      } else {
        this.newRfqOpenValidateLoading = false
        this.newRfqRoundDialog = true
      }
    },
    async updateRfqStatus(updateType) {
      const query = this.$route.query
      if(updateType === '06') {
        this.rfqloading = true
      }
      if(updateType === '05') {
        this.endingloading = true   
      }
      if(updateType === '03') {
        this.transferlaoding = true
      }
      const req = {
          updateType,
          tmRfqIdList: [query.id],
          userId: store.state.permission.userInfo.id
      }
      const res = await modification(req)
      this.resultMessage(res)
      this.getBaseInfo()
      if(updateType === '06') {
        this.rfqloading = false
      }      
      if(updateType === '05') {
        this.endingloading = false
      }      
      if(updateType === '03') {
        this.transferlaoding = false
      }

    },
    edit() {
      const rfqName = this.baseInfo.rfqName
      if (!rfqName && this.editStatus) {
        iMessage.warn(this.language('LK_RFQMINGCHNEGBUNENGWEIKONG','RFQ名称不能为空'))
        return false
      }
      this.editStatus = !this.editStatus
      if (!this.editStatus && rfqName) {
        this.save()
      }
    },
    async save() {
      const query = this.$route.query
      const params = {
        userId: store.state.permission.userInfo.id,
        cf: this.baseInfo.cf,
        ep: this.baseInfo.ep,
        mq: this.baseInfo.mq,
        pl: this.baseInfo.pl,
        rfqName: this.baseInfo.rfqName,
      }
      if (query.id) {
        const req = {
            rfqId: query.id,
            ...params
        }
        const res = await updateRfqInfo(req)
        this.resultMessage(res)
        this.getBaseInfo()
      } else {
        const req = {
            userName: store.state.permission.userInfo.userName,
            ...params
        }
        const res = await addRfq(req)
        this.linieUserId = res.data.linieUserId
        this.resultMessage(res)
        this.$router.push({
          path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${res.data.rfqId}`
        })
        this.getBaseInfo()
        this.tabShowStatus = false
        this.$nextTick(() => {
          this.tabShowStatus = true
        })
      }
    },
    toLogPage() {
      const id = this.$route.query.id
      if (id) {
        window.open(`/#/log?recordId=${id}`, '_blank')
      }
    },
    async getNewRoundList() {
      const id = this.$route.query.id
      if (id) {
        const req = {
            findType: '10',
            rfqId: id,
            current: 1,
            // size: 10,
            size: 9999,
        }
        try {
          const res = await pageRfqRound(req)
          this.newRfqRoundDialogRes = res;
          this.newRfqRoundList = res.data;
        } catch {
          this.newRfqOpenValidateLoading = false
        }
      }
    },
    // eslint-disable-next-line no-undef
    moment,
    // 创建定点申请
    createDesignate() {
      // this.nominateTypeDialogVisible = false
      this.createDesignateLoading = true

      selectRfq({
        rfqIdArr: [ this.$route.query.id ]
      })
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.$router.push({
            path: "/designate/rfqdetail", 
            query: {
              desinateId: res.data.nominateId, 
              designateType: res.data.nominateProcessType,
              partProjType: this.$route.query.businessKey
            }
          })
        } else {
          iMessage.error(message)
        }

        this.createDesignateLoading = false
      })
      .catch(() => this.createDesignateLoading = false)
    },
    getDisabled() {
      return this.disabled
    }
  }
}
</script>
<style lang='scss' scoped>
.pageTitle {
  .nav-box {
    flex:1;
    margin-right: 30px;
    justify-content: space-between;
    & > span {
      font-size: 20px;
      font-weight: bold;
    }

    .ml30 {
      margin-left: 30px;
    }
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 30px;
    }
  }
}

.row {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .col {
    width: 33.33%;
    border-right: 1px solid $color-border;
    margin-right: 20px;
    padding-right: 20px;

    &:last-child {
      margin-right: 0px;
      border-right: none;
    }
  }

  .items {
    width: 300px;
  }

  .edit-button-row {
    float: right;
  }

  .mb0 {
    margin-bottom: 0px;
  }
}

.baseinfo-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  color: #131523;
  margin-bottom: 10px;
}

.log-icon {
  font-size: 20px;
}

.log-word {
  color: $color-blue;
  margin-left: 4px;
}

.nav-style {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

</style>