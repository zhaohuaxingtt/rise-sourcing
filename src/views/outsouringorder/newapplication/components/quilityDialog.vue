<template>
    <iDialog
        :visible.sync="value"
        width="40%"
        @close="clearDiolog"
        append-to-body
    >
        <div class='titlebar' slot="title">
            <span>{{`数量-项次${detailInfo.sapItem}`}}</span>
            <iButton class="save">保存</iButton>
        </div>
        <div class="item-dialog clearFloat">
            <div class="floatright bottom20">
                <iButton>新增</iButton>
                <iButton>删除</iButton>
            </div>
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
                    <iText v-else>{{ scope.row.quantity }}</iText>
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
} from "rise";
import tablePart from "@/components/iTableSort";

export default {
    components: {
        iDialog,
        iText,
        iButton,
        iInput,
        tablePart,
    },
    props: {
        value: { type: Boolean, default: false },
        detailInfo: { type: Object, default: () => {} },
        canEdit: { type: Boolean, default: true, require: true },
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
            initData: [ ]
        }
    },
    created() {
        console.log(this.canEdit, this.detailInfo)
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
.titlebar {
    >span {
        font-size: 18px;
        font-weight: bold;
    }
    .save {
        position: relative;
        top: 0;
        margin-left: 450px;
    }
}
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