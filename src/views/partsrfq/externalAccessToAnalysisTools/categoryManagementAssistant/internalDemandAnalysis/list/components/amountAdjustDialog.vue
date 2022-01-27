<template>
    <!--业绩金额调整-->
    <iDialog
            :title="language('LK_YEJIJINETIAOZHENG','业绩金额调整')"
            :visible.sync="value"
            width="90%"
            @close="clearDiolog"
            :close-on-click-modal="false"
            class="dialog"
    >
        <div class="target-manage">
            <span class="label">{{ language('LK_NIANFEN','年份') }}</span>
            <iSelect
                    v-model="form.year"
                    class="text"
                    @change="initData(form.year)"
                    :placeholder="language('请选择')">
                <el-option :value="item" :label="item" v-for="item,index in yearList" :key="index"></el-option>
            </iSelect>
        </div>
        <div class="contents mt20">
            <tableList
                    ref="baseTable"
                    class="basetable"
                    :tableData="tableListData1"
                    :tableTitle="tableTitle1"
                    mergeValue="total"
                    tableType="1"
            >
            </tableList>
            <tableList
                    ref="baseTable"
                    class="basetable mt20"
                    :tableData="tableListData2"
                    :tableTitle="tableTitle2"
                    :inputProps="inputProps"
                    :listData="tableListData1[0]"
                    @changeData="changeData"
                    tableType="1"
            >
            </tableList>
        </div>

        <div slot="footer" class="dialog-footer">
            <span class="pr20">{{$i18n.locale === 'zh' ? '单位：百万元' : 'Unit: million yuan'}}</span>
            <iButton v-if="isAuth(whiteBtnList,'ACHIEVEMENTMGT_AMOUNT_ADJUSTMENT_CONFIRM')" @click="handleSubmit">{{ language('LK_QUEREN','确认')
                }}
            </iButton>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog, iSelect, iInput, iButton, icon, iMessage} from 'rise';
    import tableList from './adjustTable';
    import {getDepartment, getProductFamily, aveEklAdjust} from '@/api/achievement';
    //    import {tableTitle1, tableTitle2} from './data';
    import {delcommafy, toThousands} from '@/utils'
    import isAuth from '@/utils/isAuth';
    export default {
        components: {
            iDialog,
            iSelect,
            iInput,
            iButton,
            icon,
            tableList,
            iMessage,
        },
        props: {
            value: {type: Boolean},
            yearList: {type: Array}
        },
        data() {
            return {
                form: {
                    "year": new Date().getFullYear(),
                },
                tableTitle1: [],
                tableTitle2: [
                    {props: 'productFamily', name: this.$i18n.locale === 'zh'?'产品家族':'Product family', key: '', tooltip: true},
                    {props: 'calcAmount', name: this.$i18n.locale === 'zh'?'系统计算金额':'System computed amount', key: '', tooltip: true,},
                    {props: 'adjustAmount', name: this.$i18n.locale === 'zh'?'调整后金额':'Adjusted amount', key: '', tooltip: true,},
                ],
                tableLoading: false,
                tableListData1: [
                    {
                        title: this.$i18n.locale === 'zh'?'系统计算金额':'System computed amount',
                        calcAmount: '',
                    },
                    {
                        title: this.$i18n.locale === 'zh'?'调整后金额':'Adjusted amount',
                        totalAmount: '',
                    }
                ],
                templateList1: [],
                templateList2: [],
                tableListData2: [
                    {
                        productFamily: '',
                        calcAmount: '',
                        adjustAmount: '',
                    },
                    {
                        productFamily: '',
                        calcAmount: '',
                        adjustAmount: '',
                    },
                ],
                inputProps: ['adjustAmount'],
                listInput: [],
                isAuth,
                whiteBtnList: this.$store.state.permission.whiteBtnList,

            };
        },
        mounted() {
            this.showLoading('contents')
            this.initData(this.form.year)
        },
        computed: {
            show() {
                return this.$store.state.permission.userInfo.roleList.some(item => item.code == 'BZZL' || item.fullNameZh == '部长助理')
            },
        },
        methods: {

            clearDiolog() {
                this.$emit('input', false);
            },
            //产品家族分组
            groupbyName(data, Name) { //data数据源，Name 根据什么字段分组
                var map = {},
                    dest = [];
                for (var i = 0; i < data.length; i++) {
                    var ai = data[i];
                    if (!map[ai[Name]]) {
                        dest.push({
                            productFamily: ai[Name],
                            data: [ai]
                        });
                        map[ai[Name]] = ai;
                    } else {
                        for (var j = 0; j < dest.length; j++) {
                            var dj = dest[j];
                            if (dj.productFamily == ai[Name]) {
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                }
                return dest;
            },
            // 数据初始化
            async initData(year) {
                const fn1 = new Promise((resolve, reject) => {
                    resolve(getDepartment({year}))
                })
                const fn2 = new Promise((resolve, reject) => {
                    resolve(getProductFamily({year}))
                })
                let res1, res2
                Promise.all([fn1, fn2]).then((result) => {
                    res1 = result[0]
                    res2 = result[1]
                    if (res1.result) {
                        const data = res1.data
                        if(!data.length) {
                            iMessage.error(`${ this.$i18n.locale === 'zh' ? '当前年份暂无数据' : 'no data' }`)
                            this.tableTitle1 = []
                            this.tableTitle2 = []
                            this.templateList1 = []
                            this.templateList2 = []
                        }
                        this.tableTitle1 = [
                            {props: 'title', name: '', key: '', width: '', tooltip: true},
                            {props: 'calcAmount', name: 'Total', key: '', width: '', tooltip: true,},
                            {props: 'calcAmount', name: 'Total', key: '', width: '', tooltip: true,},
                        ]
                        this.tableTitle2 = [
                          {props: 'productFamily', name: this.$i18n.locale === 'zh'?'产品家族':'Product family', key: '', tooltip: true},
                          {props: 'calcAmount', name: this.$i18n.locale === 'zh'?'系统计算金额':'System computed amount', key: '', tooltip: true,},
                          {props: 'adjustAmount', name: this.$i18n.locale === 'zh'?'调整后金额':'Adjusted amount', key: '', tooltip: true,},
                        ]
                        this.templateList1 = data
                        let calcAmount = 0
                        data.forEach(item => {
                            this.tableTitle1.push({
                                props: item.dptKeCode, name: item.dptKeCode, key: '', tooltip: true
                            })
                            this.tableTitle2.push({
                                props: item.dptKeCode, name: item.dptKeCode, key: '', tooltip: true
                            })
                            this.inputProps.push(item.dptKeCode)
                            this.listInput.push(item.dptKeCode)
                            calcAmount += item.calcAmount ? Number(item.calcAmount) : 0
                            this.$set(this.tableListData1[0], item.dptKeCode, item.calcAmount ? toThousands(item.calcAmount) : 0)
//                            this.$set(this.tableListData1[1], item.dptKeCode, item.dptKeCode)
                        })
                        calcAmount = calcAmount.toFixed(2)
                        this.$set(this.tableListData1[0], 'calcAmount', toThousands(calcAmount) || 0)
                        this.$set(this.tableListData1[1], 'calcAmount', 0)
                        this.$set(this.tableListData1[1], 'totalAmount', 0)
                    }
                    if (res2.result) {
                        const data = res2.data
                        if(!data.length) {
                            iMessage.error(`${ this.$i18n.locale === 'zh' ? '当前年份暂无数据' : 'no data' }`)
                        }
                        this.tableListData2 = [
                            {
                                productFamily: '',
                                calcAmount: '',
                                adjustAmount: '',
                            },
                            {
                                productFamily: '',
                                calcAmount: '',
                                adjustAmount: '',
                            }]
                        this.templateList2 = this.groupbyName(data, 'productFamily')
                        this.setListData(0)
                        this.setListData(1)
                        this.changeData(this.tableListData2, true)
                    }
                    this.hideLoading()
                }).catch((error) => {
                    this.hideLoading()
                })
            },
            setListData(n) {
                let calcAmount = 0
                let adjustAmount = 0
                let totalAmount = 0
                if (Number(this.templateList2[n].data[0].calcAmount) && (this.templateList2[n].data[0].calcAmount == this.templateList2[n].data[1].calcAmount)) {
                    this.$set(this.templateList2[n], 'calcAmount', this.templateList2[n].data[1].calcAmount)
                }
                this.templateList2[n].data.forEach((item, i) => {
                    calcAmount += Number(item.calcAmount) || 0 // 没有重复
                    adjustAmount += Number(item.adjustAmount) || 0
                    totalAmount += Number(item.adjustAmount) || 0
                    this.$set(this.tableListData2[n], item.dptKeCode, toThousands(Number(item.adjustAmount)))
                    this.$set(this.tableListData2[n], 'productFamily', this.templateList2[n].productFamily)
                    this.$set(this.tableListData2[n], item.dptKeCode+'_'+'proportion', item.proportion)
                })
                if (!this.templateList2[n].calcAmount) {
                    this.$set(this.tableListData2[n], 'calcAmount', toThousands(calcAmount.toFixed(2)) || 0)
                } else {
                    this.$set(this.tableListData2[n], 'calcAmount', this.templateList2[n].calcAmount || 0)
                }// 系统计算金额
                this.$set(this.tableListData2[n], 'totalAmount', toThousands(totalAmount.toFixed(2))) // 调整后金额
                this.$set(this.tableListData2[n], 'adjustAmount', toThousands(adjustAmount.toFixed(2))) // 调整后金额
                this.$set(this.tableListData2[n], '_adjustAmount', toThousands(adjustAmount.toFixed(2))) // 调整后金额
            },

            handleSubmit() {
                if(!this.templateList1.length||!this.templateList2.length) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '没有数据不允许提交' : 'no data' }`)
                }
                let obj = {
                    "eklAdjustCartypeUpdateDtos": [], //产品家族数据
                    "eklAdjustKeUpdateDtos": [] // 科室数据
                }
                let keData = this.tableListData1[1] // 调整后的数据
                this.templateList1.map(item => {
                    for (var key in keData) {
                        if (item.dptKeCode == key) {
                            obj.eklAdjustKeUpdateDtos.push({
                                "id": item.id,
                                "adjustAmount": keData[key] ? delcommafy(keData[key]) : 0,
                                "calcAmount": keData[key] ? delcommafy(item.calcAmount) : 0,  // 系统计算的金额
                                "totalAmount": keData[key] ? delcommafy(keData.totalAmount) : 0,
                                "dptKeId": item.dptKeId,
                                "dptKeCode": item.dptKeCode,
                                "dptKeName": item.dptKeName,
                                "year": item.year
                            })
                        }
                    }
                })
                let state = false
                if (obj.eklAdjustKeUpdateDtos.length) {
                    state = obj.eklAdjustKeUpdateDtos.every((item) => {
                        item.adjustAmount += ''
                        item.calcAmount += ''
                        item.totalAmount += ''
                        return (item.adjustAmount && item.adjustAmount.length <= 13) && (item.calcAmount && item.calcAmount.length <= 13) && (item.totalAmount && item.totalAmount.length <= 13)
                    })
                }
                if (!state) {
                    return iMessage.error(`${ this.$i18n.locale === 'zh' ? '最多13位数字' : 'Up to 13 digits' }`)
                }
                let tableData = this.tableListData2 // 调整后数据
                let tempData = this.templateList2  // 原分组数据
                tableData.map(item => {
                    tempData.map(it => {
                        if (item['productFamily'] == it['productFamily']) {
                            for (var k in item) {
                                it.data.map(data => {
                                    if (data.dptKeCode == k) {
                                        obj.eklAdjustCartypeUpdateDtos.push(
                                            {
                                                "id": data.id,
                                                "adjustAmount": item[k] ? delcommafy(item[k]) : 0,
                                                "calcAmount": item[k] ? delcommafy(item.calcAmount) : 0,
                                                "totalAmount": item[k] ? delcommafy(item.totalAmount) : 0,
                                                "brandcode": data.brandcode,
                                                "brandname": data.brandname,
                                                "dptKeId": data.dptKeId,
                                                "dptKeCode": data.dptKeCode,
                                                "dptKeName": data.dptKeName,
                                                "familyName": data.familyName,
                                                "productFamily": data.productFamily,
                                                "year": data.year,
                                            }
                                        )
                                    }
                                })
                            }
                        }
                    })
                })
                aveEklAdjust(obj).then(res => {
                    if (res.result) {
                        this.$emit('handleSubmit')
                        iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                    }
                })
            },
            changeData(data, state) {
                let list = JSON.parse(JSON.stringify(data))
                let obj = {}
                let total = 0
                this.listInput.forEach(it => {
                    obj[it] = 0
                    list.forEach(item => {
                        item[it] = delcommafy(item[it])
                        obj[it] += item[it] ? Number(item[it]) : 0
                    })
                    total += obj[it]
                    this.$set(this.tableListData1[1], it, toThousands(Number(obj[it]).toFixed(2)))
                })
                total = total.toFixed(2)
                this.$set(this.tableListData1[1], 'calcAmount', toThousands(Number(total)))
                this.$set(this.tableListData1[1], 'totalAmount', toThousands(Number(total)))

            },
        },
    };
</script>

<style scoped lang="scss">
    .content {
        overflow: auto;
        padding: 15px 10px 0 0;
    }

    ::v-deep .el-dialog .el-dialog__header {
        padding-bottom: 50px;

    }

    .dialog-footer {
        position: absolute;
        top: 30px;
        right: 84px;
    }

    .mt20 {
        margin-top: 20px;
    }

    ::v-deep .target-manage {
        position: absolute;
        top: 70px;
        .label {
            display: inline-block;
            font-size: 22px;
            font-weight: bold;
        }
        .text {
            width: 120px;
            height: 35px;
            margin-left: 10px;
            .el-input__inner {
                color: #1763f7;
                font-size: 24px;
                font-weight: bold;
                width: 120px !important;
            }
        }
    }

    ::v-deep .el-dialog .el-dialog__header .el-dialog__title {
        font-size: 24px;
    }

    .target-manage1 tr > td:first-child {
        min-width: 300px !important;
        text-align: center !important;
    }

    ::v-deep .tablelist th tr {
        height: 39px;
    }

    ::-webkit-scrollbar { /*滾動條整體樣式*/
        width: 3px; /*高寬分別對應橫豎滾動條的尺寸*/
        height: 1px;
    }

    ::-webkit-scrollbar-thumb { /*滾動條里面小方塊*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px transparent;
        background: rgba(171, 208, 254, .5);
    }

    ::-webkit-scrollbar-track { /*滾動條里面軌道*/
        -webkit-box-shadow: inset 0 0 5px transparent;
        border-radius: 5px;
        background: rgba(171, 208, 254, .2);
    }
    .pr20{
        padding-right: 20px;
    }
</style>
