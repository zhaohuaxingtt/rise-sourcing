<!--
 * @Author: your name
 * @Date: 2021-02-25 10:09:50
 * @LastEditTime: 2021-03-27 13:40:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\editordetail\index.vue
-->
<template>
  <iPage>
    <!-- rfq详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>{{ $route.query.id ? $route.query.id : '新建RFQ' }}</span>
        <iNavMvp :list='navList' @change="changeNav"></iNavMvp>
      </div>
      <div class="btnList">
        <iButton @click="newRfq" v-permission="PARTSRFQ_EDITORDETAIL_NEWRFQROUND">新建RFQ轮次</iButton>
        <iButton @click="updateRfqStatus('06')" v-permission="PARTSRFQ_EDITORDETAIL_SENDINQUIRY">发出询价</iButton>
        <iButton @click="updateRfqStatus('05')" v-permission="PARTSRFQ_EDITORDETAIL_ENDQUOTATION">结束本轮询价</iButton>
        <iButton @click="updateRfqStatus('03')" v-permission="PARTSRFQ_EDITORDETAIL_TRANSFERNEGOTIATION">转谈判</iButton>
        <iButton @click="createAFixedPointApplication" disabled v-permission="PARTSRFQ_EDITORDETAIL_CREATEAPPLICATION">
          创建定点申请
        </iButton>
        <iButton @click="backPage">返回</iButton>
        <iButton type="text" @click="toLogPage">
          <icon symbol name="iconrizhiwuzi" class="log-icon"/>
          <span class="log-word">日志</span>
        </iButton>
        <span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
      </div>
    </div>
    <i-card class="margin-bottom20 margin-top20" v-loading="baseInfoLoading">
      <!------------------------------------------------------------------------>
      <!--                  基本信息区域                                       --->
      <!------------------------------------------------------------------------>
      <div class="baseinfo-title">基础信息</div>
      <iFormGroup row="1" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem label="RFQ编号：" name="id">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_RFQNUMBER">{{ baseInfo.id }}</iText>
            </iFormItem>
            <iFormItem label="RFQ名称：" name="rfqName">
              <iInput v-if="editStatus" v-model="baseInfo.rfqName"
                      v-permission="PARTSRFQ_EDITORDETAIL_RFQNAME"></iInput>
              <iText v-else v-permission="PARTSRFQ_EDITORDETAIL_RFQNAME">{{ baseInfo.rfqName }}</iText>
            </iFormItem>

            <iFormItem label="EP：" name="ep">
              <iInput v-if="editStatus" v-model="baseInfo.ep" v-permission="PARTSRFQ_EDITORDETAIL_EP"></iInput>
              <iText v-else v-permission="PARTSRFQ_EDITORDETAIL_EP">{{ baseInfo.ep }}</iText>
            </iFormItem>
            <iFormItem label="CF：" name="cf">
              <iInput v-if="editStatus" v-model="baseInfo.cf" v-permission="PARTSRFQ_EDITORDETAIL_CF"></iInput>
              <iText v-else v-permission="PARTSRFQ_EDITORDETAIL_CF">{{ baseInfo.cf }}</iText>
            </iFormItem>

            <iFormItem label="本轮报价截止时间：" name="currentRoundsEndTime">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_DEADLINEQUOTATIONS">{{ baseInfo.currentRoundsEndTime }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="RFQ状态：" name="statusName">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_RFQSTATUS">{{ baseInfo.currentStatus }}</iText>
            </iFormItem>
            <iFormItem label="询价采购员：" name="buyerName">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_INQUIRYBUYER">{{ baseInfo.buyerName }}</iText>
            </iFormItem>
            <iFormItem label="MQ：" name="mq">
              <iInput v-if="editStatus" v-model="baseInfo.mq" v-permission="PARTSRFQ_EDITORDETAIL_MQ"></iInput>
              <iText v-else v-permission="PARTSRFQ_EDITORDETAIL_MQ">{{ baseInfo.mq }}</iText>
            </iFormItem>
            <iFormItem label="当前轮次：" name="currentRounds">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_CURRENTROUND">{{ baseInfo.currentRounds }}</iText>
            </iFormItem>
            <iFormItem label="轮次类型：" name="roudsType">
              <iText>
                <template v-if="baseInfo.roudsType === '00'" v-permission="PARTSRFQ_EDITORDETAIL_ROUNDTYPE">普通轮次
                </template>
                <template v-else-if="baseInfo.roudsType === '01'" v-permission="PARTSRFQ_EDITORDETAIL_ROUNDTYPE">在线竞价
                </template>
                <template v-else v-permission="PARTSRFQ_EDITORDETAIL_ROUNDTYPE"></template>
              </iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="创建日期：" name="createDate">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_CREATIONDATE">
                {{ $route.query.id ? baseInfo.createDate : moment().format('YYYY-MM-DD') }}
              </iText>
            </iFormItem>
            <iFormItem label="LINIE：" name="linieNameZh">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_LINE">{{ baseInfo.linieNameZh }}</iText>
            </iFormItem>
            <iFormItem label="PL：" name="test">
              <iInput v-if="editStatus" v-model="baseInfo.pl" v-permission="PARTSRFQ_EDITORDETAIL_PL"></iInput>
              <iText v-else v-permission="PARTSRFQ_EDITORDETAIL_PL">{{ baseInfo.pl }}</iText>
            </iFormItem>
            <iFormItem label="本轮状态：" name="test">
              <iText v-permission="PARTSRFQ_EDITORDETAIL_CURRENTSTATE">{{ baseInfo.currentRoundsStatus }}</iText>
            </iFormItem>
            <div class="edit-button-row">
              <i-button @click="edit">{{ !editStatus ? '编辑' : '保存' }}</i-button>
            </div>
          </div>
        </div>
      </iFormGroup>
    </i-card>
    <rfqPending v-if="navActivtyValue === 1 || navActivtyValue === ''"></rfqPending>
    <rfq-detail-info v-if="navActivtyValue === 2"></rfq-detail-info>
    <new-rfq-round v-model="newRfqRoundDialog" @refreshBaseInfo="getBaseInfo"/>
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
} from "@/components";
import rfqPending from './components/rfqPending'
import rfqDetailInfo from './components/rfqDetailInfo'
import newRfqRound from './components/newRfqRound'
import {getRfqDataList, editRfqData, addRfq} from "@/api/partsrfq/home";
import store from '@/store'

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
    iNavMvp
  },
  data() {
    return {
      navActivtyValue: '',
      navList: [
        {
          name: "待办事项",
          value: 1
        },
        {
          name: "详情信息",
          value: 2
        },
        // {
        //   label: "谈判助手",
        // }
      ],
      editStatus: false,
      newRfqRoundDialog: false,
      baseInfo: {},
      baseInfoLoading: false
    }
  },
  created() {
    this.getBaseInfo()
  },
  methods: {
    backPage() {
      this.$router.go(-1)
    },
    async getBaseInfo() {
      const query = this.$route.query
      if (query.id) {
        this.baseInfoLoading = true
        const req = {
          rfqMangerInfosPackage: {
            userId: store.state.permission.userInfo.id,
            rfqId: Number(query.id)
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
    changeNav(item) {
      this.navActivtyValue = item.value
    },
    newRfq() {
      this.newRfqRoundDialog = true
    },
    async updateRfqStatus(updateType) {
      const query = this.$route.query
      const req = {
        updateRfqStatusPackage: {
          updateType,
          tmRfqIdList: [Number(query.id)],
          userId: store.state.permission.userInfo.id
        }
      }
      const res = await editRfqData(req)
      res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
      this.getBaseInfo()
    },
    createAFixedPointApplication() {
    },
    log() {
      window.open(`/#/log?recordId=`, '_blank')
    },
    edit() {
      this.editStatus = !this.editStatus
      if (!this.editStatus) {
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
            rfqId: Number(query.id),
            ...params
          }
        }
        const res = await editRfqData(req)
        res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
        this.getBaseInfo()
      } else {
        const req = {
          insertRfcPackage: {
            userName: store.state.permission.userInfo.userName,
            operationType: '2',
            ...params
          }
        }
        const res = await addRfq(req)
        res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
        this.$router.push({
          path: `/partsrfq/editordetail?id=${res.data.rfqId}`
        })
        this.getBaseInfo()
      }
    },
    toLogPage() {
      const id = this.$route.query.id
      if (id) {
        window.open(`/#/log?recordId=${id}`, '_blank')
      }
    },
    // eslint-disable-next-line no-undef
    moment
  }
}
</script>
<style lang='scss' scoped>
.pageTitle {
  .nav-box {
    > span {
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
</style>