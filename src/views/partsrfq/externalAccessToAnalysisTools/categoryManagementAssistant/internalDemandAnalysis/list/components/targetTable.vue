
<template>

    <el-form :model="{tableData}" status-icon :rules="rules" ref="commonTableForm">
        <el-table :height="height"
                  tooltip-effect='light'
                  :data='tableData'
                  :span-method="handleMerge"
                  :empty-text="$i18n.locale === 'zh'?'暂无数据':'No Data'"

        >

            <template v-for="(items,index) in tableTitle">
                <!--输入框-->
                <el-table-column :width="items.width" :key="index" align='center'
                                 v-if='!inputProps.includes(items.props)&&!items.child' :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name">
                </el-table-column>
                <el-table-column :width="items.width" :key="index" align='center'
                                 v-if='inputProps.includes(items.props)||items.child' :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name">
                    <template slot-scope="scope">
                        <el-form-item
                                :prop="'tableData.' + scope.$index + '.' + items.props"
                                :rules="items.rule ? items.rule : ''">
                            <i-input
                                    oninput="value = value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')"
                                    @change="inputValue(scope.row[items.props],scope.$index,items.props)"
                                    @focus="onFocus(scope.row[items.props],scope.$index,items.props)"
                                    @blur="onBlur(scope.row[items.props],scope.$index,items.props)"
                                    v-model="scope.row[items.props]"  :maxlength="items.maxlength ? items.maxlength : 300"/>
                        </el-form-item>
                    </template>
                    <template v-for="it,i in items.child">
                        <el-table-column :width="it.width" :key="i" align='center'
                                         :prop="it.props" v-if='inputProps.includes(it.props)'
                                         :label="it.key ? $t(it.key) : it.name">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.' + it.props" :rules="it.rule ? it.rule : ''">
                                    <i-input
                                            oninput="value = value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')"
                                            @change="inputValue(scope.row[it.props],scope.$index,it.props)"
                                            @focus="onFocus(scope.row[it.props],scope.$index,it.props)"
                                            @blur="onBlur(scope.row[it.props],scope.$index,it.props)"
                                            v-model="scope.row[it.props]" :maxlength="it.maxlength ? it.maxlength : 300"/>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column :width="it.width" :key="i" align='center'
                                         :prop="it.props" v-else :label="it.key ? $t(it.key) : it.name">
                        </el-table-column>
                    </template>
                </el-table-column>

            </template>
        </el-table>
    </el-form>



</template>
<script>
    import {iInput, icon} from 'rise';

    export default {
        props: {
            tableType:{type:Number},
            tableData: {type: Array},
            tableTitle: {type: Array},
            tableLoading: {type: Boolean},
            header: {type: Boolean, default: false},
            height: {type: Number || String},
            inputProps: {
                type: Array, default: () => {
                    return [];
                },
            },
        },
        components: {
            iInput,
            icon,
        },
        data() {
            return {
                rules: [],
            };
        },
        methods: {
            handleTableRow(row) {
                row.row.index = row.rowIndex;
            },
            // 获取焦点
            onFocus(val,index,key) {
                let value = val.replace(/%/, '')
                this.tableData[index][key] = value
            },
            // 失去焦点
            onBlur(val,index,key) {
                let value = val.replace(/%/, '')
                this.tableData[index][key] = value?value +'%':''
            },
            inputValue(val,index,key) {
                const reg = /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/
                let num = Number(val).toFixed(2)
                if(!reg.test(Number(num))) {
                    this.tableData[index][key] = ''
                    this.$message.error(`${ this.$i18n.locale === 'zh' ? '请按百分比填写正确的目标值' : 'please fill in the correct target value by percentage' }`)

                } else {
                    this.tableData[index][key] = num + '%'
                }
            }
        },
    };
</script>
<style lang='scss' scoped>
    .openLinkText {
        color: $color-blue;
    }

    .linkEllipsis {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .el-select {
        margin: 2px 0;
    }

    ::v-deep .el-table__row .el-input {
        height: 35px !important;

    .el-input__inner {
        height: 35px !important;
    }
    }

    .icon {
        color: $color-blue;
    }

    .required {
        font-size: 14px;
        color: red;
    }

    .el-form-item {
        margin-top: 1.375rem;
    }

    .text {
        text-decoration: underline;
    }

    .basetable ::v-deep .el-table .el-table__header {
        height: 60px;
    }

    ::v-deep .tablelist .el-table .el-table__header {
        height: 39px;
    }

    ::v-deep .el-input__inner {
        width: 100px;
        height: 35px;
    }


    ::v-deep  .el-table__body td:first-child {
        font-weight: bold;
    }
    ::v-deep  .el-table .el-table__header tr:nth-child(even) th{     //偶数行
        font-weight: 500!important;
    }
</style>
