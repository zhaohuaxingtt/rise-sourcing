<template>
    <iDialog
        :title="`数量-项次${detailInfo.sapItem}`"
        :visible.sync="value"
        width="40%"
        @close="clearDiolog"
        append-to-body
    >
        <div class="item-dialog">
             <tablePart
                ref="multipleTable"
                :lang="true"
                :tableData='initData' 
                :tableTitle='tbledColumns'
                :tableLoading="tableLoading"
                class="aotoTableHeight">
               <template #year="scope">
                    <el-date-picker
                    v-if="canEdit"
                    v-model="scope.row.year"
                    type="year"
                    placeholder="选择年">
                    </el-date-picker>
                    <iText v-else>{{ scope.row.year }}</iText>
                </template>
                <template #quantity="scope">
                    <iInput v-if="canEdit" v-model="scope.row.quantity" placeholder="请输入数量"/>
                    <iText>{{ scope.row.quantity }}</iText>
                </template> 
            </tablePart>
        </div>
       
    </iDialog>
</template>

<script>
import {
  iDialog,
  iText,
  iButton,
  iInput,
  iMessage,
  iDatePicker
} from "rise";
import tablePart from "@/components/iTableSort";

export default {
    components: {
        iDialog,
        iText,
        iButton,
        iInput,
        tablePart,
        iDatePicker
    },
    props: {
        value: { type: Boolean, default: false },
        detailInfo: { type: Object, default: () => {} },
        canEdit: { type: Boolean, default: false },
        isItem: { type: Boolean, default: false },
    },
    data() {
        return {
            dialogVisible: false,
            tableLoading: false,
            tbledColumns: [
                {
                    props: 'year',
                    name: '年份',
                    key: 'LK_NIANFEN',
                    tooltip: true,
                    align: 'center'
                },
                {
                    props: 'quantity',
                    name: '数量',
                    key: 'LK_SHULIANG',
                    tooltip: true,
                    align: 'center'
                },
            ],
            initData: [
                {
                    year: new Date().getFullYear(),
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 1,
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 2,
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 3,
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 4,
                    quantity: 0
                }
            ]
        }
    },
    created() {
        if(this.detailInfo.normalPrQuantityYears == null || this.detailInfo.normalPrQuantityYears.length <= 0) {
            this.initData = [
                {
                    year: new Date().getFullYear(),
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 1,
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 2,
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 3,
                    quantity: 0
                },
                {
                    year: new Date().getFullYear() + 4,
                    quantity: 0
                }
            ];
        } else {
            this.initData = this.detailInfo.normalPrQuantityYears;
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
        },

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

.openLinkText {
    color: $color-blue;
    cursor: pointer;
}
</style>