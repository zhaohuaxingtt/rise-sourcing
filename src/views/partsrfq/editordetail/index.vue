<!--
 * @Author: your name
 * @Date: 2021-02-25 10:09:50
 * @LastEditTime: 2021-06-11 14:32:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\editordetail\index.vue
-->
<template>
  <iPage v-permission="PARTSRFQ_EDITORDETAIL_INDEXPAGE">
    <!-- rfq详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>{{ $route.query.id ? 'RFQ' : $t('LK_XINJIANRFQ') }}</span>
        <iNavMvp :query='$route.query' :lev='2' routerPage :list='navList' @change='changeRouter'></iNavMvp>
      </div>
      <div class="btnList">
        <iButton :loading="newRfqOpenValidateLoading" @click="newRfq" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND">
          {{
            $t('LK_XINJIANRFQLUNCI')
          }}
        </iButton>
        <iButton @click="updateRfqStatus('06')" v-permission="PARTSRFQ_EDITORDETAIL_SENDINQUIRY">{{
            $t('LK_FACHUXUNJIA')
          }}
        </iButton>
        <iButton @click="updateRfqStatus('05')" v-permission="PARTSRFQ_EDITORDETAIL_ENDQUOTATION">
          {{ $t('LK_JIESHUBENLUNXUNJIA') }}
        </iButton>
        <iButton @click="updateRfqStatus('03')" v-permission="PARTSRFQ_EDITORDETAIL_TRANSFERNEGOTIATION">
          {{ $t('LK_ZHUANTANPAN') }}
        </iButton>
        <iButton v-permission="PARTSRFQ_EDITORDETAIL_CREATEAPPLICATION" :loading="createDesignateLoading" @click="nominateTypeDialogVisible = true">
          {{ $t('LK_CHUANGJIANDINGDIANSHENQING') }}
        </iButton>
        <iButton @click="backPage">{{ $t('LK_FANHUI') }}</iButton>
        <iButton type="text" @click="toLogPage" v-permission="PARTSRFQ_EDITORDETAIL_LOG">
          <icon symbol name="iconrizhiwuzi" class="log-icon"/>
          <span class="log-word">{{ $t('LK_RIZHI') }}</span>
        </iButton>
        <span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
      </div>
    </div>
    <iCard collapse class="margin-bottom20 margin-top20" :title="$t('LK_JICHUXINXI')" v-loading="baseInfoLoading">
      <!------------------------------------------------------------------------>
      <!--                  基本信息区域                                       --->
      <!------------------------------------------------------------------------>
      <iFormGroup row="1" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem :label="$t('LK_RFQBIANHAO')+':'" name="id">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_RFQNUMBER">{{ baseInfo.id }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_RFQMINGCHENG')+':'" name="rfqName">
              <iInput v-if="editStatus" v-model="baseInfo.rfqName"
                      v-permission="PARTSRFQ_EDITORDETAIL_RFQNAME"></iInput>
              <iText v-else v-permission="PARTSRFQ_EDITORDETAIL_RFQNAME">
                {{ baseInfo.rfqName }}
              </iText>
            </iFormItem>

            <iFormItem :label="$t('LK_EP')+':'" name="ep">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_EP" forceTooltip :tooltipContent="baseInfo.ep">{{ nameProcessor(baseInfo.ep) }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_CF')+':'" name="cf">
              <!-- <iInput v-if="editStatus" v-model="baseInfo.cf" v-permission="PARTSRFQ_EDITORDETAIL_CF"></iInput> -->
              <iText v-permission="PARTSRFQ_EDITORDETAIL_CF" forceTooltip :tooltipContent="baseInfo.cf">{{ nameProcessor(baseInfo.cf) }}</iText>
            </iFormItem>

            <iFormItem :label="$t('LK_BENLUNBAOJIAJIEZHISHIJIAN')+':'" name="currentRoundsEndTime">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_DEADLINEQUOTATIONS">{{ baseInfo.currentRoundsEndTime }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem :label="$t('LK_RFQZHUANGTAI')+':'" name="statusName">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_RFQSTATUS">{{ baseInfo.currentStatus }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_XUNJIACAIGOUYUAN')+':'" name="buyerName">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_INQUIRYBUYER">{{ baseInfo.buyerName }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_MQ')+':'" name="mq">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_MQ" forceTooltip :tooltipContent="baseInfo.mq">{{ nameProcessor(baseInfo.mq) }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_DANGQIANLUNCI')+':'" name="currentRounds">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_CURRENTROUND">{{ baseInfo.currentRounds }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_LUNCILEIXING')+':'" name="roundsType">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_ROUNDTYPE">
                {{ baseInfo.roundsType }}
              </iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem :label="$t('LK_CHUANGJIANRIQI')+':'" name="createDate">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_CREATIONDATE">
                {{ $route.query.id ? baseInfo.createDate : moment().format('YYYY-MM-DD') }}
              </iText>
            </iFormItem>
            <iFormItem label="LINIE：" name="linieNameZh">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_LINE">{{ baseInfo.linieNameZh }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_PL')+':'" name="test">
              <!-- <iInput v-if="editStatus" v-model="baseInfo.pl" v-permission="PARTSRFQ_EDITORDETAIL_PL"></iInput> -->
              <iText v-permission="PARTSRFQ_EDITORDETAIL_PL" forceTooltip :tooltipContent="baseInfo.pl">{{ nameProcessor(baseInfo.pl) }}</iText>
            </iFormItem>
            <iFormItem :label="$t('LK_BENLUNZHUANGTAI')+':'" name="test">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_CURRENTSTATE">{{ baseInfo.currentRoundsStatus }}</iText>
            </iFormItem>
            <div class="edit-button-row">
              <i-button @click="edit" v-permission="PARTSRFQ_EDITORDETAIL_SAVE">{{
                  !editStatus ? $t('LK_BIANJI') : $t('LK_BAOCUN')
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
    <rfqPending v-if="(navActivtyValue === '0' || navActivtyValue === '') && tabShowStatus"></rfqPending>
    <!--------------------------------------------------------------->
    <!-------------------------RFQ详情信息---------------------------->
    <!--------------------------------------------------------------->    
    <rfq-detail-info v-if="navActivtyValue === '1' && tabShowStatus"></rfq-detail-info>
    <!--------------------------------------------------------------->
    <!-------------------------报价助手------------------------------->
    <!--------------------------------------------------------------->
    <rfq-detail-tpzs v-if='navActivtyValue == 2'></rfq-detail-tpzs>
    <new-rfq-round v-model="newRfqRoundDialog" @refreshBaseInfo="getBaseInfo" v-if="tabShowStatus"/>

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
import {getRfqDataList, editRfqData, addRfq} from "@/api/partsrfq/home";
import store from '@/store'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
import {navList} from './components/data'
import nominateTypeDialog from "@/views/partsrfq/home/components/nominateTypeDialog"
import { selectRfq } from "@/api/designate/designatedetail/addRfq"

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
  mixins: [rfqCommonFunMixins],
  data() {
    return {
      navActivtyValue: '',
      navList: navList,
      editStatus: false,
      newRfqRoundDialog: false,
      baseInfo: {},
      baseInfoLoading: false,
      tabShowStatus: true,
      newRfqRoundList: [],
      newRfqOpenValidateLoading: false,
      nominateTypeDialogVisible: false,
    }
  },
  created() {
    this.getBaseInfo()
  },
  provide: function() {
    return {
      getBaseInfo: this.getBaseInfo
    }
  },
  methods: {
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
          rfqMangerInfosPackage: {
            userId: store.state.permission.userInfo.id,
            rfqId: query.id
          }
        }
        try {
          const res = await getRfqDataList(req)
          const resList = res.data.getRfqInfoVO.rfqVOList
          if (resList.length > 0) {
            this.baseInfo = res.data.getRfqInfoVO.rfqVOList[0]
          } else {
            this.baseInfo = ''
          }
          this.baseInfoLoading = false
        } catch {
          this.baseInfoLoading = false
        }
      } else {
        this.editStatus = true
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
        iMessage.warn(this.$t('LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG'))
        this.newRfqOpenValidateLoading = false
        return false
      } else {
        this.newRfqOpenValidateLoading = false
        this.newRfqRoundDialog = true
      }
    },
    async updateRfqStatus(updateType) {
      const query = this.$route.query
      const req = {
        updateRfqStatusPackage: {
          updateType,
          tmRfqIdList: [query.id],
          userId: store.state.permission.userInfo.id
        }
      }
      const res = await editRfqData(req)
      this.resultMessage(res)
      this.getBaseInfo()
    },
    edit() {
      const rfqName = this.baseInfo.rfqName
      if (!rfqName && this.editStatus) {
        iMessage.warn(this.$t('LK_RFQMINGCHNEGBUNENGWEIKONG'))
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
          updateRfqInfoPackage: {
            rfqId: query.id,
            ...params
          }
        }
        const res = await editRfqData(req)
        this.resultMessage(res)
        this.getBaseInfo()
      } else {
        const req = {
          insertRfqPackage: {
            userName: store.state.permission.userInfo.userName,
            operationType: '2',
            ...params
          }
        }
        const res = await addRfq(req)
        this.resultMessage(res)
        this.$router.push({
          path: `/sourcing/partsrfq/editordetail?id=${res.data.rfqId}`
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
          otherInfoPackage: {
            findType: '10',
            rfqId: id,
            current: 1,
            size: 10,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.newRfqRoundList = res.data.rfqRoundBdlVO.rfqBdlVOList;
        } catch {
          this.newRfqOpenValidateLoading = false
        }
      }
    },
    // eslint-disable-next-line no-undef
    moment,
    // 创建定点申请
    createDesignate(nominateProcessType) {
      this.nominateTypeDialogVisible = false
      this.createDesignateLoading = true

      selectRfq({
        nominateProcessType,
        rfqIdArr: [ this.$route.query.id ]
      })
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.$router.push({
            path: "/designate/rfqdetail", 
            query: {
              desinateId: res.data, 
              designateType: nominateProcessType
            }
          })
        } else {
          iMessage.error(message)
        }

        this.createDesignateLoading = false
      })
      .catch(() => this.createDesignateLoading = false)
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