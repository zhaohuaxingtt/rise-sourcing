<!--
* @author:shujie
* @Date: 2021-3-5 10:56:32
 * @LastEditors: Please set LastEditors
* @Description: BDL表格数据
 -->
<template>
	<el-table class="table" ref='multipleTable' :data="tableData" v-loading="tableLoading" @selection-change="handleSelectionChange" :row-style="rowStyle">
		<el-table-column type="selection" align="center" :selectable="selectable">
		</el-table-column>
		<el-table-column type="index" align="center" label="#"></el-table-column>
		<template v-for="(item, index) in tableTitle">
			<el-table-column :key="index" align="center" v-if="item.props == 'supplierNameZh'" :prop="item.props" :label="item.name">
				<template slot-scope="scope">
					<span class="openLinkText cursor" @click="openPage">{{scope.row.supplierNameZh}}</span>
				</template>
			</el-table-column>
			<!-- <el-table-column :key="index" align="center" v-if="item.props == 'c'" :prop="item.props" :label="item.name">
				<template>
					<iSelect></iSelect>
				</template>
			</el-table-column> -->
			<el-table-column :key="index" align="center" v-else-if="item.props == 'userDefinedGrade'" :prop="item.props"
				:label="item.name">
				<template v-slot:header>
					<iInput v-model="addTitle"></iInput>
				</template>
				<template slot-scope="scope">
					<iInput v-model="scope.row.userDefinedGrade"></iInput>
				</template>
			</el-table-column>
			<el-table-column :key="index" align="center" v-else-if="item.props == 'i'" :prop="item.props"
				:label="item.name">
				<template slot-scope="scope">
					<span class="cursor look" @click="onJump360(scope.row)">
						<icon symbol name="icongongyingshangshituliebiao"></icon>
					</span>
				</template>
			</el-table-column>
			<el-table-column v-else :key="index" align="center" :label="item.name" :prop="item.props">
				<template slot-scope="scope">
					<span v-if="item.props == 'isMbdl'">
						{{scope.row[item.props]?'M':''}}
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
	import {
		icon,
		iInput
	} from "@/components";
	export default {
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
						this.toggleSelection()
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
				if(row.isMbdl){
					return {
						backgroundColor:'#F8F8FA'
					}
				}
			},
			//为mbdl的checkBox新增不能选中的功能
			selectable(row,index){
				if(row.isMbdl){
					return false
				}else{
					return true
				}
			},
			handleSelectionChange(val) {
				this.$emit("handleSelectionChange", val);
			},
			openPage() {
				this.$emit("openPage");
			},
			onJump360(row) {
				window.open("https://www.baidu.com/");
			},
			// 添加自定义项目
			addCustom() {
				if (this.addCustomShow) {
					this.tableTitle.splice(4, 1);
				} else {
					let obj = {
						props: "userDefinedGrade",
						name: ""
					};
					this.tableTitle.splice(4, 0, obj);
				}
				this.addCustomShow = !this.addCustomShow;
			},
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
</style>
