<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-07-13 16:37:55
 * @LastEditors: 舒杰
 * @Description: 通用表格
-->
<template>

    <el-form :model="{tableData}" status-icon :rules="rules" ref="commonTableForm">
        <el-table :height="height"
                  ref="table"
                  :span-method="handleMerge"
                  tooltip-effect='light'
                  :data='tableData'
                  :empty-text="$i18n.locale === 'zh'?'暂无数据':'No Data'"
                  v-loading='tableLoading'
                  @selection-change="handleSelectionChange"
                  :row-class-name="handleTableRow">
            <el-table-column v-if="selection" type='selection' width="50" align='center'
                             :fixed="fixed"></el-table-column>
            <el-table-column v-if='index' type='index' width='50' align='center' :label="'#'+ index "></el-table-column>
            <template v-for="(items,index) in tableTitle">
                <!-- 点击事件-->
                <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip'
                                 v-if="openPageProps.indexOf(items.props)>-1" :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name" :fixed="items.fixed">
                    <template slot-scope="scope">
                        <el-form-item>
                             <span class="openLinkText cursor linkEllipsis text"
                                   v-if="items.props=='title'"
                                   @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props],$event.target.innerText)">
                                {{scope.row[items.props]}}
                             </span>
                             <div v-else>
                                 <span v-for="key,i in openPageProps">
                                      <span v-if="key=='operation'">
                                          <span class="openLinkText cursor linkEllipsis"
                                                v-if="isAuth(whiteBtnList,'ACHIEVEMENTMGT_LIST_CONFIRM')"
                                                @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props],$event.target.innerText)">
                                            {{scope.row[key == items.props ? key : '']}}
                                          </span>
                                          <span v-if="scope.row.refresh">
                                              <span v-if="isAuth(whiteBtnList,'ACHIEVEMENTMGT_LIST_REFRESH')"
                                                    class="openLinkText cursor linkEllipsis pl10"
                                                  @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props],$event.target.innerText)">
                                                    {{scope.row.refresh}}
                                              </span>
                                          </span>
                                      </span>
                                 </span>
                             </div>

                        </el-form-item>
                    </template>
                </el-table-column>
                <!--输入框-->
                <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center'
                                 v-else-if='inputProps.includes(items.props)||items.child' :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name">
                    <template #header>
                        {{ items.key ? $t(items.key) : items.name }}
                        <span class="required" v-if="items.required">*</span>
                        <el-popover
                                trigger="hover"
                                :content="items.iconTextKey ? $t(items.iconTextKey) : items.iconText"
                                placement="top-start">
                            <icon slot="reference" symbol v-if="items.icon" :name="items.icon"
                                  class="font-size16 marin-left5"/>
                        </el-popover>
                    </template>
                    <template slot-scope="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props"
                                      :rules="items.rule ? items.rule : ''">
                            <i-input v-model="scope.row[items.props]"
                                     oninput="value = value.replace(/[^\d.]/g,'').replace(/\.{2,}/g,'.')"
                                     @focus="onFocus(scope.row[items.props],scope.$index,items.props)"
                                     @blur="onBlur(scope.row[items.props],scope.$index,items.props)"
                                     @change="changeInput(scope.row[items.props],scope.$index,items.props)"
                                     v-if=" (!scope.row.isConfirm && (scope.row['kslPriceSource']=='M'||!scope.row['price']))"
                                     :type="inputType"
                                     :maxlength="items.maxlength ? items.maxlength : 300">
                            </i-input>

                            <span v-else>{{scope.row[items.props]}}</span>
                        </el-form-item>
                    </template>
                    <template v-for="it,i in items.child">
                        <el-table-column :width="it.width" :show-overflow-tooltip='it.tooltip' :key="i" align='center'
                                         :prop="it.props" v-if='inputProps.includes(it.props)'
                                         :label="it.key ? $t(it.key) : it.name">
                            <template slot-scope="scope">
                                <el-form-item :prop="'tableData.' + scope.$index + '.' + it.props"
                                              :rules="it.rule ? it.rule : ''">
                                    <i-input v-model="scope.row[it.props]" v-if="inputType" :type="inputType"
                                             :maxlength="it.maxlength ? it.maxlength : 300"/>
                                    <i-input v-model="scope.row[it.props]" v-else
                                             :maxlength="it.maxlength ? it.maxlength : 300"/>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column :width="it.width" :show-overflow-tooltip='it.tooltip' :key="i" align='center'
                                         :prop="it.props" v-else
                                         :label="it.key ? $t(it.key) : it.name"></el-table-column>
                    </template>

                </el-table-column>
                <!--普通下拉框-->
                <el-table-column :width="items.width" :key="index" align='center'
                                 v-else-if='selectProps.includes(items.props)' :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name">
                    <template slot-scope="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props"
                                      :rules="items.rule ? items.rule : ''">
                            <i-select filterable v-model="scope.row[items.props]"
                                      v-if="!scope.row.isConfirm && items.props=='supplierName'"
                                      remote
                                      reserve-keyword
                                      :remote-method="remoteMethod"
                                      @change="changeValue(scope.row[items.props],scope.$index,selectPropsOptionsObject[items.props],items.props)">
                                <el-option v-for="items,index in selectPropsOptionsObject[items.props]"
                                           :key='index'
                                           :value='items.name'
                                           :label="items.supplierName"/>
                            </i-select>
                            <i-select filterable v-model="scope.row[items.props]"
                                      v-else-if="!scope.row.isConfirm && items.props=='partType'"
                                      @change="changeValue(scope.row[items.props],scope.$index,selectPropsOptionsObject[items.props],items.props)">
                                <el-option v-for="items,index in selectPropsOptionsObject[items.props]"
                                           :key='index'
                                           :value='items.name'
                                           :label="items.name"/>
                            </i-select>
                            <span v-else>{{scope.row[items.props]}}</span>
                        </el-form-item>
                    </template>
                </el-table-column>
                <!--文件大小-->
                <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center'
                                 v-else-if='items.props === fileSizeProps' :prop="items.props"
                                 :label="items.key ? $t(items.key) : items.name">
                    <template slot-scope="scope">
                        <el-form-item>
                            {{ scope.row[items.props] ? scope.row[items.props] / 1024 / 1024 : 0 }}
                        </el-form-item>
                    </template>
                </el-table-column>
                <!--纯展示 動態渲染-->
                <el-table-column  :width="items.width" :show-overflow-tooltip='items.tooltip' :key="items.name"
                                 align='center'
                                 v-else-if="header"
                                 :label="items.key ? $t(items.key) : items.name"
                                 :prop="items.props" :fixed="items.fixed" :render-header="renderHeader">
                    <template slot-scope="scope">
                        <div v-if="items.props=='partName'">
                            <div> {{ scope.row.partName}}</div>
                            <div> {{ scope.row.partNameDe}}</div>
                        </div>
                        <div v-else-if="items.props=='carFamily'">
                            <div> {{ scope.row.carFamily}}</div>
                            <div> {{ scope.row.familyName}}</div>
                        </div>

                        <div v-else>{{items.props == 'priceConfirm' ? toThousands(scope.row[items.props]) : scope.row[items.props]}}</div>
                    </template>
                    <!--&lt;!&ndash;自定义嵌入&ndash;&gt;-->
                    <!--<template #header>-->
                    <!--<div v-html="items.key ? $t(items.key) : items.name "></div>-->
                    <!--<span class="required">*</span>-->

                    <!--<el-popover-->
                    <!--trigger="hover"-->
                    <!--:content="items.iconTextKey ? $t(items.iconTextKey) : items.iconText"-->
                    <!--placement="top-start">-->
                    <!--<icon slot="reference" symbol v-if="items.icon" :name="items.icon"-->
                    <!--class="font-size16 marin-left5"/>-->
                    <!--</el-popover>-->
                    <!--</template>-->
                    <!--<template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">-->
                    <!--<el-form-item :prop="'tableData.' + scope.$index + '.' + items.props"-->
                    <!--:rules="items.rule ? items.rule : ''">-->
                    <!--<slot :name="items.props" :row="scope.row"></slot>-->
                    <!--</el-form-item>-->
                    <!--</template>-->

                </el-table-column>
                <!--纯展示 -->
                <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="items.name"
                                 align='center'
                                 v-else-if="!header"
                                 :label="items.key ? $t(items.key) : items.name"
                                 :fixed="items.fixed">
                    <!--自定义嵌入-->
                    <template #header>
                        <!--            {{ items.key ? $t(items.key) : items.name }}-->
                        <div v-html="items.key ? $t(items.key) : items.name "></div>
                        <span class="required" v-if="items.required">*</span>
                        <el-popover
                                trigger="hover"
                                :content="items.iconTextKey ? $t(items.iconTextKey) : items.iconText"
                                placement="top-start">
                            <icon slot="reference" symbol v-if="items.icon" :name="items.icon"
                                  class="font-size16 marin-left5"/>
                        </el-popover>
                    </template>
                    <template  v-slot="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props"
                                      :rules="items.rule ? items.rule : ''">
                            <span :class="items.props=='_type'&&scope.row._type=='批量件'?'success':''" v-text="scope.row[items.props]"></span>
                        </el-form-item>
                    </template>

                </el-table-column>

            </template>
        </el-table>
    </el-form>

</template>
<script>
    import {iInput, iSelect, icon} from 'rise';
    import {toThousands,delcommafy,unique} from '@/utils'
    import isAuth from '@/utils/isAuth';
    export default {
        props: {
            label: {type: String},
            tableData: {type: Array},
            tableTitle: {type: Array},
            monthTitle: {type: Array},
            tempSupplierSelectList: {type: Array},
            tableLoading: {type: Boolean, default: false},
            state: {type: Boolean, default: false},
            selection: {type: Boolean, default: true},
            index: {type: Boolean, default: false},
            header: {type: Boolean, default: false},
            height: {type: Number || String},
            openPageProps: {type: String, default: []},
            inputProps: {
                type: Array, default: () => {
                    return [];
                },
            },
            selectProps: {
                type: Array, default: () => {
                    return [];
                },
            },
            selectPropsOptionsObject: {
                type: Object, default: () => {
                    return {};
                },
            },
            customSelectValueKey: {type: String, default: ''},
            customOpenPageWord: {type: String, default: ''},
            openPageGetRowData: {type: Boolean, default: false},
            inputType: {type: String, default: ''},
            fileSizeProps: {type: String, default: 'fileSize'},
            mergeValue: {type: String, default: ''},
            fixed: {type: Boolean, default: false}
        },
        components: {
            iInput,
            iSelect,
            icon,
        },
        data() {
            return {
                rules: [],
                show: false,
                toThousands,
                isAuth,
                whiteBtnList: this.$store.state.permission.whiteBtnList,
            };
        },
        created() {
            this.show = localStorage.getItem('status') == 'true' ? true : false
        },
        methods: {
            changeValue(name, index, data, key) {
                if (data && data.length) {
                    data.map((item) => {
                        if (name == item.nameZh && key == 'supplierName') {
                            this.tableData[index].supplierId = item.supplierId
                            this.tableData[index].supplierCode = item.code
                            this.tableData[index].supplierName = item.nameZh
                            this.tableData[index].supplierNameZh = item.shortNameZh
                            this.$set(this.tableData[index], 'editStatus', true)
                            this.$set(this.tableData[index], 'inputVal', true)
                        }
                        if (name == item.name && key == 'partType') {
                            this.tableData[index].partType = item.name
                            this.$set(this.tableData[index], 'editStatus', true)
                            this.$emit('setPartType',this.tableData[index])
                        }
                    })
                }
            },
            remoteMethod(query, name) {
                if (query) {
                    let arr = this.tempSupplierSelectList.filter(item => {
                        return item.supplierName.indexOf(query) > -1
                    })
                    if (arr.length) {
                        let data = unique([...arr, ...this.selectPropsOptionsObject.supplierName],'sapCode')
                        this.$nextTick(() => {
                            this.$set(this.selectPropsOptionsObject, 'supplierName', data)
                        })
                    }
                }
            },
            onFocus(val,index,key) {
                this.tableData[index][key] = delcommafy(val) // 转字符串数字
            },
            onBlur(val,index,key) {
                if(!isNaN(val)) { // 非数字
                    this.tableData[index][key] = val.replace(/\B(?=(\d{3})+\b)/g,',') // 转千分
                }
            },
            changeInput(value, index, key) {
                if(key) {
                    this.tableData[index][key] = value.replace(/\B(?=(\d{3})+\b)/g,',') // 转千分
                    this.$set(this.tableData[index], 'editStatus', true)
                }
            },
            handleMerge({row, column, rowIndex, columnIndex}) {
                // 判断需不需要合并
                if (this.mergeValue === 'pkpiTable1') {
                    if ((columnIndex === 1 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6) &&
                        rowIndex === 14) {
                        return {
                            rowspan: 2,
                            colspan: 1,
                        };
                    }
                }
                if (this.mergeValue === 'furtherRatingCard') {
                    if (columnIndex === 1) {
                        return [1, 3];
                    }
                }
            },
            handleSelectionChange(val) {
                this.$emit('handleSelectionChange', val);
            },
            handleSelectChange(type, val, time) {
                const res = {
                    type,
                    val,
                    time,
                };
                this.$emit('handleSelectChange', res);
            },
            openPage(params, value) {
                let obj = {...params}
                obj.value = value
                this.$emit('openPage', obj);
            },
            handleTableRow(row) {
                row.row.index = row.rowIndex;
            },
            renderHeader(h, {column, $index}) {
                // h 是一个渲染函数       column 是一个对象表示当前列      $index 第几列
                if (column.label.indexOf('KSL价来源') > -1) {
                    return h("div", [
                        h("span", column.label + "  ", {
                            align: "center",
                            marginTop: "10px"
                        }),
                        h(
                            "el-popover",
                            {
                                props: {
                                    placement: "top-start",    // 一般 icon 处可添加浮层说明，浮层位置等属性
                                    width: "260",
                                    trigger: "hover"
                                }
                            },
                            [
                                h("p", "C=正式订单价，F=上期正式订单价，D=定点价格，T=目标价，M=手工", {
                                    class: "text-align: center; margin: 0"
                                }),
                                h("i", {                            // 生成 i 标签 ，添加icon 设置 样式，slot 必填
                                    class: 'iconfont iconxinxitishi',
                                    style: 'color:#A0BFFC;font-size: 16px;position: relative; top:1px',
                                    slot: "reference"
                                })
                            ]
                        )
                    ])
                }
                if (column.label.indexOf('参考价格来源') > -1) {
                    return h("div", [
                        h("span", column.label + "  ", {
                            align: "center",
                            marginTop: "10px"
                        }),
                        h(
                            "el-popover",
                            {
                                props: {
                                    placement: "top-start",    // 一般 icon 处可添加浮层说明，浮层位置等属性
                                    width: "260",
                                    trigger: "hover"
                                }
                            },
                            [
                                h("p", "C=合同价，P=台账中正式价，A=Aeko继承价格，T=目标价，M=手工", {
                                    class: "text-align: center; margin: 0"
                                }),
                                h("i", {                            // 生成 i 标签 ，添加icon 设置 样式，slot 必填
                                    class: 'iconfont iconxinxitishi',
                                    style: 'color:#A0BFFC;font-size: 16px;position: relative; top:1px',
                                    slot: "reference"
                                })
                            ]
                        )
                    ])
                } else if (column.label == this.label || column.label == 'Year output') {
                    return this.fn(column, h, $index)
                } else if (column.label == '12月' || column.label =='december') {
                    return this.cb(column, h, $index)
                } else {
                    return h("span", column.label + "  ", {  //这是左边的
                        align: "left"
                    })
                }
            },
            cb(column, h, $index) {
                let vm = this
                if (vm.show) {
                    return h('div', null, [
                        h("span", column.label + "  ", {  //这是左边的
                            align: "left"
                        }),
                        h('span', null, [  //这个是渲染出来的icon
                            h('i', {
                                class: 'iconfont iconliebiaoshouqilishishuju',  //组件库的icon，可根据需要修改
                                style: 'color:#1663f6;font-size:24px;cursor: pointer;position: relative; top:2px',
                                on: {
                                    click: function () {
                                        vm.show = false
                                        localStorage.setItem('status', false)
                                        vm.tableTitle.splice($index - 12, 12)
                                    }
                                }
                            }, '')
                        ]),
                    ])
                } else {
                    return h("span", column.label + "  ", {  //这是左边的
                        align: "left"
                    })
                }
            },

            fn(column, h, $index) {
                let index = $index
                let vm = this
                if (vm.tableTitle.length == 22 || !vm.show) {
                    return h('div', null, [
                        h("span", column.label + "  ", {  //这是左边的
                            align: "left"
                        }),
                        h('span', null, [  //这个是渲染出来的icon
                            h('i', {
                                class: 'iconfont iconliebiaozhankailishishuju',  //组件库的icon，可根据需要修改
                                style: 'color:#1663f6;font-size:24px;cursor: pointer;position: relative;top:2px',
                                on: {
                                    click: function () {
                                        for (let i = vm.monthTitle.length - 1; i >= 0; i--) {
                                            vm.tableTitle.splice(index, 0, vm.monthTitle[i])
                                        }
                                        vm.show = true
                                        localStorage.setItem('status', true)
                                    }
                                }
                            }, '')
                        ]),
                    ])
                } else {
                    return h("span", column.label + "  ", {  //这是左边的
                        align: "left"
                    })
                }
            },
        },
    };
</script>
<style lang='scss' scoped>
    .openLinkText {
        color: $color-blue;
    }

    .linkEllipsis {
        display: inline-block;
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
            width: 100%;
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

    ::v-deep .el-table__body td:first-child {
        font-weight: bold;
    }

    ::v-deep .el-table .el-table__header tr:nth-child(even) th { //偶数行
        font-weight: 500 !important;
    }

    [v-cloak]{
        display: none;
    }
    .success{
        color: #05BB8B;
    }

</style>
