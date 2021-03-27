<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2021-03-27 19:18:38
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目批量维护界面
 * @FilePath: \rise\src\views\partsprocure\batchmiantain\index.vue
-->

<template>
	<iPage class="batchmiantain">
		<div class="margin-bottom20 clearFloat">
			<span class="font18 font-weight">批量维护零件采购项目</span>
			<div class="floatright">
				<iButton @click="back" v-permission="PARTSPROCURE_BATCHMIANTAIN_SAVE">返回</iButton>
				<iButton @click="creatFs" v-permission="PARTSPROCURE_BATCHMIANTAIN_GENERATEFSNUMBER">生成FS号</iButton>
				<iButton @click="start" :loading="startLoding" v-permission="PARTSPROCURE_BATCHMIANTAIN_STARTINQUIRY">启动询价</iButton>
			</div>
		</div>
		<iSearch class="margin-bottom20" title="采购项目信息" tabCard>
			<el-form>
				<el-form-item label="零件采购项目类型">
					<iSelect placeholder="请选择" v-model="batch.part_preject_type">
						<el-option :value="item.value" :label="item.label"
							v-for="(item, index) in getGroupList('part_preject_type')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="LINIE部门">
					<iSelect v-model="linie">
						<el-option :value="item" :label="item.value"
							v-for="(item, index) in getGroupList('linie_dept')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="LINIE">
					<iSelect v-model="batch.linieName">
						<el-option :value="item.value" :label="item.label"
							v-for="(item, index) in getGroupList('linie_name')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="零件类型">
					<iSelect v-model="batch.partType">
						<el-option :value="item.value" :label="item.label"
							v-for="(item, index) in getGroupList('part_type')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="车型项目">
					<iSelect placeholder="请选择车型项目" v-model="cartypeProject">
						<el-option :value="item" :label="item.value"
							v-for="(item, index) in getGroupList('cartype_project_zh')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="采购工厂">
					<iSelect placeholder="请选择车型项目" v-model="batch.procureFactory">
						<el-option :value="item.value" :label="item.label"
							v-for="(item, index) in getGroupList('procure_factory')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="单位">
					<iSelect placeholder="请选择车型项目" v-model="batch.unit">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('unit')"
							:key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="CF控制员">
					<iSelect placeholder="请选择车型项目" v-model="batch.cfController">
						<el-option :value="item.value" :label="item.label" v-for="(item, index) in getGroupList('cf_controller')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
			</el-form>
			<template slot="button">
				<iButton @click="save" v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRM">确认</iButton>
				<iButton @click="reset" v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASERESET">重置</iButton>
			</template>
		</iSearch>
		<iSearch class="margin-bottom20" title="材料组工艺设置" tabCard icon>
			<el-form>
				<el-form-item label="材料组">
					<iSelect placeholder="请选择" v-model="stuff.categoryCode" @change="changeSelect">
						<el-option :value="item.key" :label="item.value" v-for="(item, index) in getGroupList('category_name')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="工艺">
					<iSelect placeholder="请选择先材料组" v-model="stuffObj">
						<el-option :value="item"  :label="item.value" v-for="(item, index) in getGroupList('stuff_name')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
			</el-form>
			<template slot="button">
				<iButton @click="save" v-permission="PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPCONFIRM">确认</iButton>
				<iButton @click="resetStuff" v-permission="PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPRESET">重置</iButton>
			</template>
		</iSearch>
		<outputPlan class="margin-bottom20" @handleSelectionChange="handleSelectionChange" />
	</iPage>
</template>
<script>
	import {
		iPage,
		iButton,
		iSearch,
		iSelect,
		iMessage
	} from '@/components'
	import outputPlan from './components/outputPlan'
	import {
		changeProcure,
		insertRfq
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
			outputPlan
		},
		data() {
			return {
				fromGroup: [],
				batch: {
					part_preject_type: "",
					linieDept: "",
					linieName: "",//value
					linieNum:"",//key
					partType: "",
					cartypeProjectZh: "",//value
					cartypeProjectNum:"",//key
					procureFactory: "",
					cfController: "",
					unit: "",
					purchaseProjectIds: [],
				},
				stuff: {
					stuffName: "",//value
					stuffCode:"",//key
					categoryCode:"",
				},
				linie:{
					key:"",
					value:""
				},
				cartypeProject:{
					key:"",
					value:""
				},
				stuffObj:{
					key:"",
					value:""
				},
				selectTableData: [],
				startLoding: false,
			}
		},
		created() {
			this.getPageGroup()
		},
		methods: {
			changeSelect(val){
				if(val == '600000'){
					this.fromGroup.find(items=>items.name == 'stuff_name').infoList = [
							{
							value:'安全电器件-电镀',
							key:'600000'
						},
						{
							value:'安全电器件-注塑',
							key:'600000'
						}
					]
					
				}else{
					this.fromGroup.find(items=>items.name == 'stuff_name').infoList = [
						{
							value:'空调控制头-抛光',
							key:'600001'
						},
						{
							value:'空调控制头-焊接',
							key:'600003'
						}
					]
				}
			},
			//获取上方group信息
			getPageGroup() {
				getPageGroup(this.$store.state.permission.userInfo.id).then((res) => {
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
			//选中零件采购数据
			handleSelectionChange(e) {
				this.selectTableData = e
				let  arr=[]
				this.selectTableData.map(res => {
					arr.push(res.purchaseProjectId)
				})
				this.batch.purchaseProjectIds=arr
			},
			// 批量修改
			save() {
				if (this.batch.purchaseProjectIds.length == 0) {
					iMessage.warn("请选择需要修改的零件采购项目")
					return
				}
				this.pushKey()
				// 复制参数对应key
				let batch = {
					...this.batch,
					...this.stuff
				}
				changeProcure({
					batch
				}).then(res => {
					if (res.data) {
						iMessage.success("修改成功")
					}else{
						iMessage.error(res.desZh)
					}
				})
			},
			pushKey(){
				this.stuff.stuffName=this.stuffObj.value
				this.stuff.stuffCode=this.stuffObj.key
				this.batch.cartypeProjectZh=this.cartypeProject.value
				this.batch.cartypeProjectNum=this.cartypeProject.key
				this.batch.linieDept=this.linie.value
				this.batch.linieNum=this.linie.key
				console.log(this.stuff);
				console.log(this.stuffObj);
			},
			// 重置采购信息数据
			reset() {
				for (let i in this.batch) {
					if (i == "purchaseProjectIds") {
						this.batch[i] = []
					} else {
						this.batch[i] = "";
					}
				}
			},
			// 重置stuff数据
			resetStuff() {
				this.stuff.stuffName = ""
				this.stuff.categoryCode = ""
				this.stuff.stuffCode=""
			},
			// 生成fs号
			creatFs() {
				if (this.selectTableData.length == 0)
					return iMessage.warn(
						"抱歉，您当前还未选择您需要生成FS号的零件采购项目！"
					);
				let fs = {
					purchaseProjectIds: this.batch.purchaseProjectIds,
				};
				changeProcure({
					fs,
				}).then((res) => {
					if (res.data) {
						iMessage.success("操作成功")
					}else{
						iMessage.error(res.desZh)
					}
				});
			},
			validateStart() {
				return new Promise((r) => {
					if (this.selectTableData.length == 0) {
						r(false);
						iMessage.warn(`抱歉，您当前还未选择需要启动询价的采购项目！`);
						return;
					}
					if (this.selectTableData.find((items) => items.fsnrGsnrNum == "")) {
						r(false);
						iMessage.warn(
							`抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您启动询价！`
						);
						return;
					}
					r(true);
				});
			},
			async start() {
				if (!(await this.validateStart())) return;
				this.startLoding = true;
				insertRfq({
						rfqPartDTOList: this.selectTableData
					})
					.then((res) => {
						this.startLoding = false;
						if (res.data && res.data.rfqId) {
							this.$router.push({
								path: "/partsrfq/editordetail",
								query: {
									id: res.rfqId,
								},
							});
						} else {
							iMessage.warn(res.desZh);
						}
					})
					.catch((err) => {
						this.startLoding = false;
					});
			},
			//back
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.batchmiantain {}
</style>
