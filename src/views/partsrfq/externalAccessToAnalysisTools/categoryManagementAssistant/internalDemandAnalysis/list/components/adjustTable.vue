<template>

    <el-form :model="{tableData}" status-icon :rules="rules" ref="commonTableForm">
        <el-table :height="height"
                  tooltip-effect='light'
                  :data='tableData'
                  :span-method="handleMerge"
                  :header-cell-style="headerStyle"
                  :empty-text="$i18n.locale === 'zh'?'暂无数据':'No Data'"

        >

            <template v-for="(items,index) in tableTitle">
                <!--输入框-->
                <el-table-column :width="items.width"
                                 :key="index"
                                 align='center'
                                 v-if='!inputProps.includes(items.props)'
                                 :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name">
                </el-table-column>
                <el-table-column :width="items.width"
                                 :key="index"
                                 align='center'
                                 v-if='inputProps.includes(items.props)||items.child'
                                 :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name">
                    <template slot-scope="scope">
                        <el-form-item
                                :prop="'tableData.' + scope.$index + '.' + items.props"
                                :rules="items.rule ? items.rule : ''">
                            <i-input
                                    @focus="onFocus(scope.row[items.props],scope.$index,items.props)"
                                    @blur="onBlur(scope.row[items.props],scope.$index,items.props)"
                                    @change="inputValue(scope.row[items.props],scope.$index,items.props)"
                                    oninput="value=value.replace(/[^-?\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^\./g, '')"
                                    v-model="scope.row[items.props]"
                                    :maxlength="items.maxlength ? items.maxlength : 300"/>
                        </el-form-item>
                    </template>
                    <template v-for="it,i in items.child">
                        <el-table-column :width="it.width" :key="i" align='center'
                                         :prop="it.props" v-if='inputProps.includes(it.props)'
                                         :label="it.key ? $t(it.key) : it.name">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.' + it.props"
                                              :rules="it.rule ? it.rule : ''">
                                    <i-input
                                            @change="inputValue(scope.row[it.props],scope.$index,it.props)"
                                            oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^\./g, '')"
                                            v-model="scope.row[it.props]"
                                            :maxlength="it.maxlength ? it.maxlength : 300"/>
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
    import {delcommafy, toThousands} from '@/utils'

    export default {
        props: {
            tableType: {type: Number},
            spanArr: {type: Array},
            tableData: {type: Array},
            listData: {type: Object},
            tableTitle: {type: Array},
            tableLoading: {type: Boolean},
            header: {type: Boolean, default: false},
            height: {type: Number || String},
            inputProps: {
                type: Array, default: () => {
                    return [];
                },
            },
            mergeValue: {type: String, default: ''},
        },
        components: {
            iInput,
            icon,
        },
        data() {
            return {
                rules: [],
                tempTableData: [],
            };
        },

        methods: {
            handleTableRow(row) {
                row.row.index = row.rowIndex;
            },
            headerStyle({row, column, rowIndex, columnIndex}) {
                if (this.mergeValue == 'total') {
                    row[1].colSpan = 2
                    row[2].colSpan = 0
                    if (columnIndex === 2) {
                        return 'display: none'
                    }
                }
            },
            handleMerge({row, column, rowIndex, columnIndex}) {
                if (this.mergeValue == 'total') {
                    if (columnIndex === 1) {
                        return {
                            rowspan: 1,
                            colspan: 2
                        }

                    } else if (columnIndex === 2) {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
            // 获取焦点
            onFocus(val, index, key) {
                this.tableData[index][key] = delcommafy(val) // 转字符串数字
                this.tempTableData = JSON.parse(JSON.stringify(this.tableData))
            },
            // 失去焦点
            onBlur(val, index, key) {
                if (!isNaN(val)) { // 非数字
                    this.tableData[index][key] = val.replace(/\B(?=(\d{3})+\b)/g, ',') // 转千分
                }
            },
            inputValue(val, index, key) {
                const total = this.tableData[index]['totalAmount']
                const inputProps = this.inputProps.filter(item => item != 'adjustAmount')
                if (key != 'adjustAmount') { // 不是调整后金额input
                    let num = 0
                    inputProps.forEach(item => {
                        if (key == item) {
                            let oldNum = delcommafy(this.tempTableData[index][item])
                            let newNum = delcommafy(this.tableData[index][item])
                            let diff = Number(newNum) - Number(oldNum)
                            num = Number(diff) + Number(delcommafy(total))
                        }
                    })
                    if (num) this.tableData[index]['adjustAmount'] = toThousands(num.toFixed(2))
                    if (num) this.tableData[index]['_adjustAmount'] = toThousands(num.toFixed(2))
                    if (num) this.tableData[index]['totalAmount'] = toThousands(num.toFixed(2))
                    this.$emit('changeData', this.tableData)
                } else {
                    let adjustAmount = delcommafy(this.tableData[index].adjustAmount) // 调整后总金额
                    let total = delcommafy(this.listData.calcAmount)                  // 系统总金额
                    let obj = this.listData
                    let num = 0
                    if(Number(adjustAmount)) {
                        this.inputProps.forEach(item => {
                            if (item !== 'adjustAmount') {
                                for (var key in obj) {
                                    if (key == item) {
                                        let diff = Number(this.tableData[index][item + '_proportion']) ? this.tableData[index][item + '_proportion'] * adjustAmount : 0
                                        this.tableData[index][item] = toThousands(diff)
                                    }
                                }
                            }
                        })
                    }
                    if(!adjustAmount) {
                        this.inputProps.forEach(item => {
                            if (item !== 'adjustAmount') {
                                this.tableData[index][item] = ''
                                num = ''
                            }
                        })
                    }
                    num = this.tableData[index].adjustAmount
                    num = Number(num)?Number(num).toFixed(2):''
                    this.tableData[index].totalAmount = this.tableData[index]._adjustAmount = this.tableData[index].adjustAmount = num
                    this.$emit('changeData', this.tableData)
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
            text-align: center !important;
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
        /*width: 100px;*/
        height: 35px;
    }

    ::v-deep .el-table__body td:first-child {
        font-weight: bold;
    }

    ::v-deep .el-table .el-table__header tr:nth-child(even) th { //偶数行
        font-weight: 500 !important;
    }
</style>
