<!--
 * @Author: your name
 * @Date: 2021-02-25 10:09:50
 * @LastEditTime: 2021-03-26 00:03:07
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
        <iTabsList type="border-card" @tab-click="changeNav" class="nav-style">
          <el-tab-pane :label="item.label" v-for="item of navList" :key="item.label">
          </el-tab-pane>
        </iTabsList>
      </div>
      <div class="btnList">
        <iButton @click="newRfq">新建RFQ轮次</iButton>
        <iButton @click="updateRfqStatus('06')">发出询价</iButton>
        <iButton @click="updateRfqStatus('05')">结束本轮询价</iButton>
        <iButton @click="updateRfqStatus('03')">转谈判</iButton>
        <iButton @click="createAFixedPointApplication" disabled>创建定点申请</iButton>
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
              <iText>{{ baseInfo.id }}</iText>
            </iFormItem>
            <iFormItem label="RFQ名称：" name="rfqName">
              <iInput v-if="editStatus" v-model="baseInfo.rfqName"></iInput>
              <iText v-else>{{ baseInfo.rfqName }}</iText>
            </iFormItem>

            <iFormItem label="EP：" name="ep">
              <iInput v-if="editStatus" v-model="baseInfo.ep"></iInput>
              <iText v-else>{{ baseInfo.ep }}</iText>
            </iFormItem>
            <iFormItem label="CF：" name="cf">
              <iInput v-if="editStatus" v-model="baseInfo.cf"></iInput>
              <iText v-else>{{ baseInfo.cf }}</iText>
            </iFormItem>

            <iFormItem label="本轮报价截止时间：" name="endDate">
              <iText>{{ baseInfo.endDate }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="RFQ状态：" name="statusName">
              <iText>{{ baseInfo.currentStatus }}</iText>
            </iFormItem>
            <iFormItem label="询价采购员：" name="buyerName">
              <iText>{{ baseInfo.buyerName }}</iText>
            </iFormItem>
            <iFormItem label="MQ：" name="mq">
              <iInput v-if="editStatus" v-model="baseInfo.mq"></iInput>
              <iText v-else>{{ baseInfo.mq }}</iText>
            </iFormItem>
            <iFormItem label="当前轮次：" name="currentRounds">
              <iText>{{ baseInfo.currentRounds }}</iText>
            </iFormItem>
            <iFormItem label="轮次类型：" name="roudsType">
              <iText>{{ baseInfo.roudsType === '00' ? '普通轮次' : '在线轮次' }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="创建日期：" name="createDate">
              <iText>{{ baseInfo.createDate }}</iText>
            </iFormItem>
            <iFormItem label="LINIE：" name="linieNameZh">
              <iText>{{ baseInfo.linieNameZh }}</iText>
            </iFormItem>
            <iFormItem label="PL：" name="test">
              <iInput v-if="editStatus" v-model="baseInfo.pl"></iInput>
              <iText v-else>{{ baseInfo.pl }}</iText>
            </iFormItem>
            <iFormItem label="本轮状态：" name="test">
              <iText>{{ baseInfo.currentRoundsStatus }}</iText>
            </iFormItem>
            <div class="edit-button-row">
              <i-button @click="edit">{{ !editStatus ? '编辑' : '保存' }}</i-button>
            </div>
          </div>
        </div>
      </iFormGroup>
    </i-card>
    <rfqPending v-if="navActivtyValue === '待办事项' || navActivtyValue === ''"></rfqPending>
    <rfq-detail-info v-if="navActivtyValue === '详情信息'"></rfq-detail-info>
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
  iTabsList
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
    iTabsList,
    rfqPending,
    rfqDetailInfo,
    newRfqRound
  },
  data() {
    return {
      navActivtyValue: '',
      navList: [
        {
          label: "待办事项",
        },
        {
          label: "详情信息",
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
    async getBaseInfo() {
      const query = this.$route.query
      if (query.id) {
        this.baseInfoLoading = true
        const req = {
          rfqMangerInfosPackage: {
            userId:store.state.permission.userInfo.id,
            rfqId: Number(query.id)
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.baseInfo = res.data.getRfqInfoVO.rfqVOList[0]
          this.baseInfoLoading = false
        } catch {
          this.baseInfoLoading = false
        }
      } else {
        this.editStatus = true
      }
    },
    changeNav(target) {
      this.navActivtyValue = target.label
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
          userId:store.state.permission.userInfo.id
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
        userId:store.state.permission.userInfo.id,
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
            operationType: '2',
            ...params
          }
        }
        const res = await addRfq(req)
        res.result ? iMessage.success(res.desZh) : iMessage.error(res.desZh)
        this.$router.push({
          path: `/partsrfq/editordetail?id=${res.data.rfqId}`
        })
      }
    },
    toLogPage() {
      const id = this.$route.query.id
      if (id) {
        window.open(`/#/log?recordId=${id}`, '_blank')
      }
    }
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

.nav-style{
  display: flex;
  align-items: center;
  margin-left: 20px;
}
</style>