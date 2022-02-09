<template>
    <!--VWAG评级-->
    <iDialog
            :title="$t('LK_CJNDMBGL')"
            :visible.sync="value"
            width="90%"
            @close="clearDiolog"
            :close-on-click-modal="false"
            class="dialog"
    >
        <div class="content" :style="show?'heigth:700px':'height:350px'">
            <tableList
                    ref="baseTable"
                    class="basetable"
                    :tableData="tableListData"
                    :tableTitle="tableTitle"
                    :inputProps="inputProps"
                    tableType="1"
            >
            </tableList>
            <div v-if="show">
                <div :key="index" v-for="list,index in tableListData1">
                    <div class="mt20">
                        <div style="font-weight: bold;font-size: 22px;">
                            {{ `${ $i18n.locale === 'zh' ? $t('LK_' + list['brand']) : list['brand'] }`}}
                        </div>
                        <div style="margin-top: 10px;margin-bottom: 10px;" class="target-manage1">

                            <tableList
                                    class="tablelist"
                                    :tableData="list"
                                    :tableTitle="tableTitle1"
                                    :tableLoading="tableLoading"
                                    :inputProps="['lastTarget','lastCommitment','averageTarget','averageCommitment']"
                                    tableType="2"
                            >
                            </tableList>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="target-manage">
            <span class="label">{{ $t('SUPPLIER_NIANFEN') }}</span>
            <iSelect
                    v-model="form.year"
                    class="text"
                    @change="initData(form.year)"
                    :placeholder="language('请选择')">
                <el-option :value="item" :label="item" v-for="item,index in yearList" :key="index"></el-option>
            </iSelect>
            <span class="label" style="padding-left: 55px;">{{orgName}} Total Target-Lasting</span>
            <iInput
                    v-model="form.totalTarget"
                    class="text"
                    :disabled="linie||!show"
                    :placeholder="language('请输入')"
                    oninput="value = value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')"
                    @change="InputValue($event,1)"
                    @focus="onFocus(form.totalTarget,'totalTarget')"
                    @blur="onBlur(form.totalTarget,'totalTarget')"
            >
            </iInput>
            <span class="label" style="padding-left: 55px;">{{orgName}} Total Commitment-Lasting</span>
            <iInput
                    v-model="form.totalCommitment"
                    class="text"
                    :disabled="linie||!show"
                    :placeholder="language('请输入')"
                    oninput="value = value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')"
                    @change="InputValue($event,2)"
                    @focus="onFocus(form.totalCommitment,'totalCommitment')"
                    @blur="onBlur(form.totalCommitment,'totalCommitment')"
            >
            </iInput>
        </div>
        <div slot="footer" class="dialog-footer">
            <!--<iButton @click="handleSubmit">{{ $t('LK_QUEREN') }}</iButton>-->
            <!--<iButton @click="sendDepartment(form.year)">{{ $t('LK_TZKS') }}</iButton>-->
            <iButton @click="handleSubmit" v-if="isAuth(whiteBtnList,'ANNUALTARGET_PAGE_SAVEDATA')">{{ $t('LK_QUEREN') }}</iButton>
            <iButton @click="sendDepartment(form.year)" v-if="isAuth(whiteBtnList,'ANNUALTARGET_PAGE_NOTICE')">{{ $t('LK_TZKS') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog, iSelect, iInput, iButton, icon, iMessage} from 'rise';
    import tableList from './targetTable';
    import isAuth from '@/utils/isAuth';
    import {
        querySavaTarget,       // 初始化
        queryYearTarget,       // 年度目标
        querybrandTarget,      // 品牌
        queryYearTargetDetail, // 科室
        upYearTargetDetail,    // 修改科室数据
        saveOrUpYearTarget,    // 新增修改年度头数据
        upBrandTarget,         // 修改品牌数据
        sendLetter,            // 发送站内信
    } from '@/api/achievement';
    import {tableList as tableTitle1} from './data';

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
                    "id": "",
                    "year": new Date().getFullYear(),
                    "totalTarget": "",
                    "totalCommitment": ""
                },
                fileName: '',
                selectList: [],
                tableTitle: [],
                tableTitle1: tableTitle1,
                tableLoading: false,
                tableListData: [],
                tempTableListData: [], // 做提交数据用的
                tableListData1: [],
                inputProps: [],
                orgName:'',
                isAuth,
                whiteBtnList: this.$store.state.permission.whiteBtnList,

            };
        },
        created() {
            this.initData(this.form.year)
        },
        computed: {
            show() {
                return this.$store.state.permission.userInfo.roleList.some(item => item.code == 'BZZL' || item.fullNameZh == '部长助理')
            },
            linie() {
                return this.$store.state.permission.userInfo.roleList.some(item => item.code == 'LINIE')
            }
        },
        methods: {
            // 通知科室
            sendDepartment(year) {
                sendLetter({year}).then(res => {
                    if (res.result) {
                        iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                    }
                })
            },
            clearDiolog() {
                this.$emit('input', false);
            },
            // 数据初始化
            async initData(year) {
                querySavaTarget({year}).then(res => {
                    if (res.result) {
                        this.getYearTarget()
                    }
                })
            },
            // 获取目标头
            async getYearTarget() {
                let obj = {}
                obj = {year: this.form.year}
                queryYearTarget(obj).then(res => {
                    if (res.result) {
                        this.form.id = res.data.id
                        this.form.year = res.data.year
                        this.form.totalTarget = res.data.totalTarget
                        this.form.totalCommitment = res.data.totalCommitment
                        this.orgName = res.data.orgName
                        this.getKsData(res.data.id)
                        this.show && this.getBrandContent(res.data.id)
                    }
                })
            },
            // 获取品牌内容
            getBrandContent(id) {
                this.showLoading('content')
                querybrandTarget({yearId: id}).then(res => {
                    if (res.result) {
                        this.hideLoading()
                        let data = res.data
                        data.map((item) => {
                            if (!item.tto) {
                                this.$set(item, 'tto', 0)
                            }
                        })
                        let arrayTwo = Object.values(data.reduce((res, item) => {
                            res[item.brand] ? res[item.brand].push(item) : res[item.brand] = [item];
                            return res;
                        }, {}))
                        arrayTwo.map(item => {
                            let num = 0
                            item.map((it,index, array) => {
                                num += Number(it.tto)
                                if (it.deptCode == 'CS') {
                                    it.tto = num.toFixed(2)
                                }
                            })
                        })
                        let arr  = JSON.parse(JSON.stringify(arrayTwo))
                        arr.map(item => {
                            item.brand = item[0].brand
                            item.map((it,index, array)=> {
                                if(it.deptCode == 'CS') {
                                    const data = it
                                    item.splice(index,1)
                                    item.push(data)
                                }
                            })
                        })
                        this.tableListData1 = arr
                    }
                }).catch(() => {
                    this.hideLoading()
                })
            },
            // 获取科室数据
            getKsData(id) {
                this.tableListData = []
                this.inputProps = [],
                this.tableTitle = [{props: 'A', name: '', key: '',}]
                queryYearTargetDetail({yearbaseId: id}).then(res => {
                    if (res.result) {
                        let data = res.data
                        data = data.filter((item) => {
                            return item.orgId
                        })
                        if (data.length) {
                            this.tableListData = [{A: 'Target-Lasting',}, {A: 'Commitment-Lasting',}]
                            data.map(item => {
                                this.$set(item, 'inputValue', item.orgName + item.id)
                            })
                            this.tempTableListData = data
                            data.forEach(item => {
                                let obj = {
                                    props: item.inputValue,
                                    name: item.orgName,
                                    key: item.orgName,
                                    tooltip: true,
                                }
                                this.tableTitle.push(obj)
                                this.inputProps.push(item.inputValue)
                                this.$set(this.tableListData[0], item.inputValue, item.target ? item.target : '')
                                this.$set(this.tableListData[1], item.inputValue, item.commitment ? item.commitment : '')
                            })
                        }
                    }
                })
            },
            // 提交所有数据
            handleSubmit() {
                this.saveOrUpYearTarget()   // 修改目标头
                if (this.tempTableListData.length) {
                    this.tempTableListData.map((item) => {
                        this.cb(item, this.tableListData[0], 1)
                        this.cb(item, this.tableListData[1], 2)
                    })
                    this.updksdata(this.tempTableListData) // 修改科室
                }
                this.$emit('handleSubmit', this.form)
                this.show && this.setBrandTarget(this.tableListData1)
            },
            // 修改品牌数据
            setBrandTarget(data) {
                let list = []
                data.forEach(item => {
                    item.forEach(its => {
                        its.lastTarget = its.lastTarget && its.lastTarget.indexOf('%') > -1 ? its.lastTarget : its.lastTarget && its.lastTarget + '%',
                            its.lastCommitment = its.lastCommitment && its.lastCommitment.indexOf('%') > -1 ? its.lastCommitment : its.lastCommitment && its.lastCommitment + '%',
                            its.averageTarget = its.averageTarget && its.averageTarget.indexOf('%') > -1 ? its.averageTarget : its.averageTarget && its.averageTarget + '%',
                            its.averageCommitment = its.averageCommitment && its.averageCommitment.indexOf('%') > -1 ? its.averageCommitment : its.averageCommitment && its.averageCommitment + '%',
                            list.push({
                                'lastTarget': its.lastTarget || '',
                                'lastCommitment': its.lastCommitment || '',
                                'averageTarget': its.averageTarget || '',
                                'averageCommitment': its.averageCommitment || '',
                                'id': its.id
                            })
                    })
                })
                if (list.length) {
                    upBrandTarget(list).then(res => {
                        if (res.result) {
//                            iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                        }
                    })
                }
            },
            // 修改科室数据
            updksdata(data) {
                upYearTargetDetail(data).then(res => {
                    if (res.result) {
//                      iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                    }
                })
            },
            // 保存年度表头
            saveOrUpYearTarget() {
                let {totalTarget, totalCommitment} = this.form
                totalTarget = totalTarget && totalTarget.indexOf('%') > -1 ? totalTarget : totalTarget && totalTarget + '%'
                totalCommitment = totalCommitment && totalCommitment.indexOf('%') > -1 ? totalCommitment : totalCommitment && totalCommitment + '%'
                let obj = {
                    "id": this.form.id,
                    "totalTarget": totalTarget,
                    "totalCommitment": totalCommitment

                }
                saveOrUpYearTarget(obj).then(res => {
                    iMessage.success(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
                })
            },
            cb(item, obj, n) {
                for (var key in obj) {
                    if (item.inputValue == key) {
                        if (n == 1) {
                            item.target = obj[key]
                            item.target = item.target && item.target.indexOf('%') > -1 ? item.target : item.target && item.target + '%'
                        }
                        if (n == 2) {
                            item.commitment = obj[key]
                            item.commitment = item.commitment && item.commitment.indexOf('%') > -1 ? item.commitment : item.commitment && item.commitment + '%'
                        }
                    }
                }
            },
            InputValue(val, index) {
                const reg = /(^(\d|[1-9]\d)(\.\d{1,2})?$)|(^100$)/
                let num = Number(val).toFixed(2)
                if (!reg.test(Number(num))) {
                    if (index == 1) this.form.totalTarget = ''
                    if (index == 2) this.form.totalCommitment = ''
                    iMessage.error(`${ this.$i18n.locale === 'zh' ? '请按百分比填写正确的目标值' : 'please fill in the correct target value by percentage' }`)

                } else {
                    if (index == 1) this.form.totalTarget = num
                    if (index == 2) this.form.totalCommitment = num
                }
            },
            // 获取焦点
            onFocus(val,key) {
                let value = val.replace(/%/, '')
                this.form[key] = value
            },
            // 失去焦点
            onBlur(val,key) {
                let value = val.replace(/%/, '')
                this.form[key] = value?value +'%':''
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
        text-align: left !important;
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

</style>
