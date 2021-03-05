<!--
 * @Author: your name
 * @Date: 2021-02-25 10:09:50
 * @LastEditTime: 2021-02-25 10:10:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\editordetail\index.vue
-->
<template>
  <iPage>
    <!-- rfq详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>新建RFQ</span>
        <iNav-mvp @change="changeNav" :list="navList" class="ml30"></iNav-mvp>
      </div>
      <div class="btnList">
        <iButton @click="save">保存</iButton>
        <iButton @click="newRfq">新建RFQ轮次</iButton>
        <iButton @click="sendInquiry">发出询价</iButton>
        <iButton @click="endInquiry">结束本轮询价</iButton>
        <iButton @click="transferNegotiation">转谈判</iButton>
        <iButton @click="createAFixedPointApplication">创建定点申请</iButton>
        <iButton @click="log">日志</iButton>
        <span>
					<icon name="icondatabaseweixuanzhong"></icon>
				</span>
      </div>
    </div>
    <i-card class="margin-bottom20 margin-top20">
      <!------------------------------------------------------------------------>
      <!--                  基本信息区域                                       --->
      <!------------------------------------------------------------------------>
      <div class="baseinfo-title">基础信息</div>
      <iFormGroup row="1" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem label="RFQ编号：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="RFQ名称：" name="test">
              <iText></iText>
            </iFormItem>

            <iFormItem label="EP：" name="test">
              <iInput v-if="editStatus"></iInput>
              <iText v-else></iText>
            </iFormItem>
            <iFormItem label="MQ：" name="test">
              <iInput v-if="editStatus"></iInput>
              <iText v-else></iText>
            </iFormItem>

            <iFormItem label="本轮报价截⽌时间：" name="test">
              <iText></iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="RFQ状态：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="询价采购员：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="MQ：" name="test">
              <iInput v-if="editStatus"></iInput>
              <iText v-else></iText>
            </iFormItem>
            <iFormItem label="当前轮次：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="轮次类型：" name="test">
              <iText></iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem label="创建⽇期：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="LINIE：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="CF：" name="test">
              <iInput v-if="editStatus"></iInput>
              <iText v-else></iText>
            </iFormItem>
            <iFormItem label="本轮状态：" name="test">
              <iText></iText>
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
    <new-rfq-round v-model="newRfqRoundDialog"/>
  </iPage>
</template>
<script>
import {iNavMvp, iButton, iPage, icon, iCard, iFormGroup, iFormItem, iText, iInput,} from "@/components";
import rfqPending from './components/rfqPending'
import rfqDetailInfo from './components/rfqDetailInfo'
import newRfqRound from './components/newRfqRound'

export default {
  components: {
    iNavMvp,
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
    newRfqRound
  },
  data() {
    return {
      navActivtyValue: '',
      navList: [
        {
          value: 1,
          name: "待办事项",
        },
        {
          value: 2,
          name: "详情信息",
        },
        {
          value: 3,
          name: "谈判助手",
        }
      ],
      editStatus: false,
      newRfqRoundDialog: false
    }
  },
  methods: {
    changeNav(item, index) {
      this.navActivtyValue = item.value
    },
    save() {

    },
    newRfq() {
      this.newRfqRoundDialog = true
    },
    sendInquiry() {},
    endInquiry() {},
    transferNegotiation() {},
    createAFixedPointApplication() {

    },
    log() {},
    edit() {
      this.editStatus = !this.editStatus
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
.baseinfo-title{
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  color: #131523;
  margin-bottom: 10px;
}
</style>