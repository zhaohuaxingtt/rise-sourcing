<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2021-02-25 16:06:04
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目批量维护界面
 * @FilePath: \rise\src\views\partsprocure\batchmiantain\index.vue
-->

<template>
	<iPage class="batchmiantain">
		<div class="margin-bottom20 clearFloat">
			<span class="font18 font-weight">批量维护零件采购项目</span>
			<div class="floatright">
				<iButton>保存</iButton>
				<iButton>生成FS号</iButton>
				<iButton>启动询价</iButton>
			</div>
		</div>
		<iSearch class="margin-bottom20" title="采购项目信息" tabCard>
			<el-form>
				<el-form-item label="零件采购项目">
					<iSelect placeholder="请选择"></iSelect>
				</el-form-item>
				<el-form-item label="LINIE部门">
					<iSelect v-model="batch.linieDept">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('linie_dept')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="LINIE">
					<iSelect v-model="batch.linieName">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('linie_name')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="零件类型">
					<iSelect v-model="batch.partType">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('part_type')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="车型项目">
					<iSelect  placeholder="请选择车型项目" v-model="batch.cartypeProjectZh">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('cartype_project_zh')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="采购工厂">
					<iSelect  placeholder="请选择车型项目" v-model="batch.procureFactory">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('procure_factory')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="单位">
					<iSelect  placeholder="请选择车型项目" v-model="batch.unit">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('unit')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="CF控制员">
					<iSelect  placeholder="请选择车型项目" v-model="batch.cfController">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('cf_controller')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
			</el-form>
			<template slot="button">
				<iButton>确认</iButton>
				<iButton>重置</iButton>
			</template>
		</iSearch>
		<iSearch class="margin-bottom20" title="材料组工艺设置" tabCard icon>
			<el-form>
				<el-form-item label="材料组">
					<iSelect placeholder="请选择"></iSelect>
				</el-form-item>
				<el-form-item label="工艺">
					<iSelect placeholder="请选择"></iSelect>
				</el-form-item>
			</el-form>
			<template slot="button">
				<iButton>确认</iButton>
				<iButton>重置</iButton>
			</template>
		</iSearch>
		<outputPlan class="margin-bottom20" />
	</iPage>
</template>
<script>
	import {
		iPage,
		iButton,
		iSearch,
		iSelect,
		iCard
	} from '@/components'
	import outputPlan from './components/outputPlan'
	import {
		getTabelData,
		changeProcure
	} from "@/api/partsprocure/home";
	import {
		getPageGroup
	} from "@/api/partsign/home";
	export default {
		components: {
			iPage,
			iButton,
			iSearch,
			iSelect,
			iCard,
			outputPlan
		},
		data() {
			return {
				purchaseProjectIds: [],
				fromGroup: [],
				batch: {
					linieDept: "",
					linieName:"",
					partType:"",
					
				},
				detailData: {}
			}
		},
		created() {
			this.purchaseProjectIds = this.$route.query.ids;
			this.getData()
			this.getPageGroup()
		},
		methods: {
			// 获取批量数据
			getData() {
				getTabelData({
						'partOutputPlanByBatchFacadeDTO.purchaseProjectIds': JSON.stringify(this.purchaseProjectIds)
					})
					.then((res) => {
						this.detailData = res.data.partOutputPlanResDTO;
					})
			},
			//获取上方group信息
			getPageGroup() {
				getPageGroup(12314).then((res) => {
					this.fromGroup = res.data.groupStatSenarioResult.groupStatInfoList;
				});
			},
			// 查询fliter数据
			getGroupList(key) {
				if (this.fromGroup.length > 0) {
					let obj = this.fromGroup.find((items) => items.name == key);
					if (!obj) return [];
					return obj.infoList;
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.batchmiantain {}
</style>
