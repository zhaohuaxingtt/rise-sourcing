<!--
* @author:shujie
* @Date: 2021-3-5 10:56:32
 * @LastEditors: Please set LastEditors
* @Description: BDL表格数据
 -->
<template>
	<el-table :stripe="false" class="table" ref='multipleTable' :data="tableData" :empty-text="language('LK_ZANWUSHUJU','暂无数据')" v-loading="tableLoading" @selection-change="handleSelectionChange" @select="handleSelect" @select-all="handleSelectAll" :row-style="rowStyle">
		<el-table-column type="selection" align="center" :selectable="selectable" width="40">
		</el-table-column>
<!--		<el-table-column type="index" align="center" label="#"></el-table-column>-->
		<template v-for="(item, index) in tableTitle">
			<el-table-column :key="index" align="center" v-if="item.props == 'supplierNameZh'" :prop="item.props" :label="$t(item.key)"  :show-overflow-tooltip="item.tooltip">
				<template slot-scope="scope">
					<!-- <span class="openLinkText cursor" @click="openPage">{{scope.row.supplierNameZh}}</span> -->
					<span class="flexRow">
            			<span class="openLinkText cursor " @click="openPage(scope.row)"> {{ scope.row.supplierNameZh }}
							<el-tooltip effect="light" :content="`FRM评级：${scope.row.frm}`" v-if="scope.row.frm">
          					<span>
            					<icon symbol class="cursor margin-left8" name="iconzhongyaoxinxitishi" />
        			 	 	</span>
        					</el-tooltip>
						</span>
            			<span v-if="scope.row.supplierNameZh" class="icon-gray  cursor "  @click="openPage(scope.row)">
                			<icon symbol class="show" name="icontiaozhuananniu" />
                			<icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            			</span>
          			</span> 
					<!-- <span class="openLinkText cursor" @click="openPage(scope.row)">{{ scope.row.supplierNameZh }} -->
						<!-----------Spring10新增：如果供应商FRM评级为C,则认为有风险被标识出来------------------------------------------------------->
	
						<!-- <el-popover
							
							placement="bottom"
							trigger="hover"
							popper-class="tableTitleTip"
							:content="`FRM评级：${scope.row.Frm}`"
							:visible-arrow="false">
							<icon symbol class="cursor margin-left8" name='iconzhongyaoxinxitishi' ></icon>
						</el-popover> -->
					<!-- </span> -->
					
				</template>
			</el-table-column>
			<!-- <el-table-column :key="index" align="center" v-if="item.props == 'c'" :prop="item.props" :label="item.name">
				<template>
					<iSelect></iSelect>
				</template>
			</el-table-column> -->
			<el-table-column :key="index" align="center" v-else-if="item.props == 'userDefinedGrade'" :prop="item.props"
				:label="$t(item.key)">
				<template v-slot:header>
					<iInput v-model="addTitle"></iInput>
				</template>
				<template slot-scope="scope">
					<iInput v-model="scope.row.userDefinedGrade" @input="handleInput($event, scope.row)"></iInput>
				</template>
			</el-table-column>
			<el-table-column :key="index" align="center" v-else-if="item.props == 'i'" :prop="item.props"
				:label="$t(item.key)">
				<template slot-scope="scope">
					<span class="cursor look" @click="onJump360(scope.row)">
						<icon symbol name="icongongyingshangshituliebiao"></icon>
					</span>
				</template>
			</el-table-column>
			<el-table-column v-else :key="index" align="center" :label="$t(item.key)" :prop="item.props" :show-overflow-tooltip="item.tooltip">
				<template slot-scope="scope">
					<span v-if="item.props == 'bdlType'">
						{{scope.row[item.props] == '2'?'M':''}}
					</span>
					<span v-else-if="item.props == 'isCheckCbd'">
						{{scope.row[item.props]?"是":"否"}}
					</span>
					<span v-else>
						{{scope.row[item.props]}}
					</span>
				</template>
			</el-table-column>
		</template>
	</el-table>
</template>
<script>
	import tablelist from "@/views/partsign/home/components/tableList";
	import {icon} from "rise"
	import {
		// icon,
		iInput
	} from 'rise';
	export default {
		inject:['getbaseInfoData'],
		components: {
			icon,
			iInput,
		},
		props: {
			...tablelist.props,
			tableData: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				addTitle: "",
			};
		},
		watch:{
			'tableData':function(val){
				if(val.length>0){
					this.$nextTick(()=>{
					/**
					 * @description: sprint11 新增逻辑，如果是GS零件，Mbdl不需要自动选中
					 * @param {*} this
					 * @return {*}
					 */						
						if(this.getbaseInfoData().isSelectMbdl){
							this.toggleSelection()
						}
					})
				}
			}
		},
		methods: {
			//自动选中MBDL里面的数据
			toggleSelection() {
				this.tableData.forEach(items=>{
					if(items.isMbdl){
						this.$refs.multipleTable.toggleRowSelection(items);
					}
				})
      },
			//为mbdl的数据新增一个背景颜色
			rowStyle({row,index}){
					/**
					 * @description: sprint11 新增逻辑，如果是GS零件，Mbdl不需要将背景颜色加深
					 * @param {*} this
					 * @return {*}
					 */					
				if(!this.getbaseInfoData().isSelectMbdl) return
				if(row.bdlType == '2' || !row.isEdit){
					return {
						backgroundColor:'#F2F6FF'
					}
				}
			},
			//为mbdl的checkBox新增不能选中的功能
			selectable(row,index){
				if(this.getbaseInfoData().isSelectMbdl && row.bdlType == '2'){
					return false
				}else{
					return true
				}
			},
			handleSelectionChange(val) {
				this.$emit("handleSelectionChange", val);
			},
			openPage(row) {
				this.$emit("openPage", row);
			},
			onJump360(row) {
				window.open(`${ process.env.VUE_APP_PORTAL_URL }supplier/supplierList/details?subSupplierId=${row.supplierSubId}&supplierType=${row.supplierType}&nameZh=${row.supplierNameZh}&nameEn=${row.supplierNameEn}`, '_blank')
			},
			// 添加自定义项目
			addCustom() {
				if (!this.addTitle) {
					if (this.addCustomShow) {
						// this.tableTitle.splice(4, 1);
						this.tableTitle.pop()
					} else {
						let obj = {
							props: "userDefinedGrade",
							name: ""
						};
						// this.tableTitle.splice(4, 0, obj);
						this.tableTitle.push(obj)
					}
					this.addCustomShow = !this.addCustomShow;
				}
			},
			handleSelect(selection, row) {
				this.$emit('handleSelect', selection, row)
			},
			handleSelectAll(selection) {
				this.$emit('handleSelectAll', selection)
			},
			handleInput(value, row) {
				row.userDefinedGrade = value
					.replace(/[^\d.]/g, "")
					.replace(/^\.*/g, "")
					.replace(".", "$#$")
					.replace(/\./g, "")
					.replace("$#$", ".")
					.replace(/^0+([0-9].*)/, "$1")
			}
		},
	};
</script>

<style lang="scss" scoped>
	.openLinkText {
		color: $color-blue;
	}
	.operation {}
	.look {
		font-size: 28px;
	}

	.table {
		::v-deep tr:nth-child(even) {
			background-color: #FFF;
		}
	}
	.icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }
  .flexRow{
    display: flex;
    justify-content: space-between ;
    align-items: center;
  }
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }
</style>
