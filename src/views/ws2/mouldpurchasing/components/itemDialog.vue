<template>
    <iDialog
        :title="isItem ? $t('MODEL-ORDER.LK_XIANGCI') : '明细'"
        :visible.sync="value"
        width="90%"
        @close="clearDiolog"
    >
    <div class="item-dialog">
        <iFormGroup row="4" inline :rules="rules">
            <iFormItem :label="$t('MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING')" name="test">
                <iText> {{ detailInfo.subType == 45 ? $t('LK_BIAOZHUNCAIGOUSHENQING') : detailInfo.subType == 43 ? $t('LK_YUPILIANGCAIGOUSHENQING') : ""}} </iText>
            </iFormItem>
            <iFormItem :label="$t('MODEL-ORDER.LK_CSCBIANHAO')" name="test">
                <iText> {{ detailInfo.riseCode }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('MODEL-ORDER.LK_SAPBIANHAO')" name="test">
                <iText> {{ detailInfo.sapCode }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_KEMU')" name="test">
                <iText> {{ detailInfo.account }} </iText>
            </iFormItem>
            <iFormItem :label="$t('MODEL-ORDER.LK_XIANGCI')" name="test">
                <iText> {{ detailInfo.sapItem }} </iText>
            </iFormItem>
            <iFormItem :label="$t('MODEL-ORDER.LK_XIANGCILAIYUAN')" name="test">
                <iText> {{ detailInfo.itemSource == 1 ? "SAP" : detailInfo.itemSource == 2 ? "手动同步" : detailInfo.itemSource == 3 ? "人工创建" : ""}} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_LINGJIANHAO')" name="test">
                <iText> {{ detailInfo.partNum }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('MODEL-ORDER.LK_LINGJIANMINGCENG')" name="test">
                <iText> {{ detailInfo.partNameZh }} </iText>
            </iFormItem>
            <iFormItem :label="$t('LK_DANWEI')" name="test">
                <iText> {{ detailInfo.unitCode }} </iText>
            </iFormItem>
            <iFormItem :label="$t('LK_JIAOHUORIQI')" name="test">
                <iText> {{ detailInfo.deliveryDate }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('MODEL-ORDER.LK_WULIAOZU')" name="test">
                <iText> {{ detailInfo.materialGroup }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_CAILIAOZU')" name="test">
                <iText> {{ detailInfo.csGroup }} </iText>
            </iFormItem>
            <iFormItem :label="$t('LK_CAIGOUGONGCHANG')" name="test">
                <iText> {{ detailInfo.procureFactory }} {{ detailInfo.factoryName == null ? "" : `-${detailInfo.factoryName}` }}</iText>
            </iFormItem>
            <iFormItem :label="$t('MODEL-ORDER.LK_KUCUNDIDIAN')" name="test">
                <iText> {{ detailInfo.storageLocationDesc }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_CAIGOUZU')" name="test">
                <iText> {{ detailInfo.procureGroup }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_BUMEN')" name="test">
                <iText> {{ detailInfo.applyDeptNo }} </iText>
            </iFormItem>
            <iFormItem :label="$t('MODEL-ORDER.LK_QIWANGGONGYINGSHANG')" name="test">
                <iText> {{ detailInfo.supplierSapCode }}{{ detailInfo.supplierNameZh == null ? "" : `-${detailInfo.supplierNameZh}` }} </iText>
            </iFormItem>
            <iFormItem :label="$t('LK_SHULIANG')" name="test">
                <iText> {{ detailInfo.quantity }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('MODEL-ORDER.LK_CAIGOUZUZHI')" name="test">
                <iInput
                  v-model="detailInfo.procureOrg"
                  v-if="canEdit"
                ></iInput>
                <iText v-else> {{ detailInfo.procureOrg }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_ZONGZHANGKEMU')" name="test">
                <iInput
                  v-model="detailInfo.account"
                  v-if="canEdit"
                ></iInput>
                <iText v-else> {{ detailInfo.account }} </iText>
            </iFormItem>
            <iFormItem :label="$t('LK_CHENGBENKONGZHIYU')" name="test">
                <iInput
                  v-model="detailInfo.costControllerField"
                  v-if="canEdit"
                ></iInput>
                <iText v-else> {{ detailInfo.costControllerField }} </iText>
            </iFormItem>
            <iFormItem :label="$t('MODEL-ORDER.LK_WBSYUANSU')" name="test">
                <iInput
                  v-model="detailInfo.wbs"
                  v-if="canEdit"
                ></iInput>
                <iText v-else> {{ detailInfo.wbs }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_TONGJIDINGDAN')" name="test">
                <iInput
                  v-model="detailInfo.orderStatistics"
                  v-if="canEdit"
                ></iInput>
                <iText v-else> {{ detailInfo.orderStatistics }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_CHENGBENZHONGXIN')" name="test">
                <iInput
                  v-model="detailInfo.costCenterCode"
                  v-if="canEdit"
                ></iInput>
                <iText v-else> {{ detailInfo.costCenterCode }} </iText>
            </iFormItem>
            <iFormItem :label="$t('LK_SHENQINGREN')" name="test">
                <iText> {{ detailInfo.applyBy }} </iText>
            </iFormItem>
            <iFormItem :label="$t('LK_SHENQINGRIQI')" name="test">
                <iText> {{ detailInfo.requestDate }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('MODEL-ORDER.LK_XUQIUGENZONGHAO')" name="test">
                <iText> {{ detailInfo.requestTraceNo }} </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_ZHUANGTAI')" name="test">
                <iText> {{ statusData[detailInfo.status] }} </iText>
            </iFormItem>
            <iFormItem :label="$t('MODEL-ORDER.LK_YICIXINGDINGDIANZHUANGTAI')" name="test">
                <iText> {{ detailInfo.nominationStatus }} </iText>
            </iFormItem>
            <iFormItem label="FSNR/GSNR" name="test">
                <iText> {{ detailInfo.fsnr }} </iText>
            </iFormItem> 
            <!-- <iFormItem :label="$t('LK_CHUANGJIANZHE')" name="test">
                <iText> {{ detailInfo.createName }} </iText>
            </iFormItem>  -->
            <iFormItem :label="$t('MODEL-ORDER.LK_DINGDAN')" name="test">
                <iText> <span class="order-link" @click="openOrderPage">{{ detailInfo.contractRiseCode }}</span> </iText>
            </iFormItem> 
            <iFormItem :label="$t('LK_BEIZHU')" name="test">
                <iInput
                  v-model="detailInfo.remark"
                  v-if="canEdit"
                ></iInput>
                <iText v-else> {{ detailInfo.remark }} </iText>
            </iFormItem>
        </iFormGroup>
        <iButton
          class="save-btn"
          @click="save"
          v-if="canEdit"
          >{{ $t("LK_BAOCUN") }}
        </iButton>
    </div>
    </iDialog>
</template>

<script>
import {
  iDialog,
  iFormGroup,
  iFormItem,
  iText,
  iButton,
  iInput
} from "rise";
export default {
    components: {
        iDialog,
        iFormGroup,
        iFormItem,
        iText,
        iButton,
        iInput
    },
    props: {
        value: { type: Boolean, default: false },
        detailInfo: { type: Object, default: () => ({}) },
        canEdit: { type: Boolean, default: false },
        isItem: { type: Boolean, default: false },
    },
    data() {
        return {
            statusData: {
                "1": "已创建",
                "2": "已关联订单",
                "3": "订单已推送SAP",
                "4": "关闭",
            }
        }
    },
    methods: {
        // 关闭弹窗
        clearDiolog() {
        this.$emit("input", false);
        },
        save() {
            this.$emit("handleSaveDetail", this.detailInfo);
        },
        openOrderPage() {
            this.$emit("openOrderPage", this.detailInfo);
        }
    },
    watch: {
        value: function (val) {
            if (val) {
                // console.log('ssssss')

            }
        },
    },
}
</script>

<style lang="scss" scoped>
.item-dialog {
    position: relative;

    ::v-deep .el-form-item__label {
        width: 150px;
    }

    ::v-deep .el-form--inline .el-form-item {
        display: flex;
    }

    .save-btn {
        position: absolute;
        right: 60px;
        top: -60px;
    }
}

.order-link {
    color: $color-blue;
    cursor: pointer;
}
</style>