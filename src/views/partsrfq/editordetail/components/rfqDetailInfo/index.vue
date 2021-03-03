<template>
  <div>
    <i-card class="mt20">
      <!------------------------------------------------------------------------>
      <!--                  基本信息区域                                       --->
      <!------------------------------------------------------------------------>
      <iFormGroup row="1" inline :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem label="RFQ编号：" name="test">
              <iText></iText>
            </iFormItem>
            <iFormItem label="RFQ名称：" name="test">
              <iText></iText>
            </iFormItem>
            <div>
              <iFormItem label="EP：" name="test">
                <iInput v-if="editStatus"></iInput>
                <iText v-else></iText>
              </iFormItem>
              <iFormItem label="MQ：" name="test">
                <iInput v-if="editStatus"></iInput>
                <iText v-else></iText>
              </iFormItem>
            </div>

            <iFormItem label="当前轮次：" name="test">
              <iText></iText>
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
            <iFormItem label="PL：" name="test">
              <iInput v-if="editStatus"></iInput>
              <iText v-else></iText>
            </iFormItem>
            <iFormItem label="本轮状态：" name="test">
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
            <div class="edit-button-row">
              <i-button @click="edit">{{ !editStatus ? '编辑' : '保存' }}</i-button>
            </div>
          </div>
        </div>
      </iFormGroup>
    </i-card>
    <div>
      <iTabsList class="margin-top20" type='border-card'>
        <el-tab-pane label="⽬标价">
          <target-price/>
        </el-tab-pane>
        <el-tab-pane label="参考产量"></el-tab-pane>
        <el-tab-pane label="物流要求"></el-tab-pane>
        <el-tab-pane label="询价附件"></el-tab-pane>
        <el-tab-pane label="BOM单信息"></el-tab-pane>
      </iTabsList>
    </div>
  </div>

</template>

<script>
import {iCard, iFormGroup, iFormItem, iText, iInput, iButton, iTabsList} from "@/components";
import targetPrice from './components/targetPrice'

export default {
  components: {
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iInput,
    iButton,
    iTabsList,
    targetPrice
  },
  data() {
    return {
      editStatus: false
    }
  },
  methods: {
    edit() {
      this.editStatus = !this.editStatus
    }
  }
}
</script>

<style scoped lang="scss">
.mt20 {
  margin-top: 20px;
}

.row {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .col {
    width: 480px;
    border-right: 1px solid $color-border;
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

  .edit-button-row {
    float: right;
    margin-top: 60px;
  }
}
</style>