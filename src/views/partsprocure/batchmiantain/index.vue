<!--
 * @Author: yuszhou
 * @Date: 2021-02-25 15:12:41
 * @LastEditTime: 2021-03-27 19:18:38
 * @LastEditors: Please set LastEditors
 * @Description: 零件采购项目批量维护界面
 * @FilePath: \rise\src\views\partsprocure\batchmiantain\index.vue
-->

<template>
	<iPage class="batchmiantain" v-permission="PARTSPROCURE_BATCHMIANTAIN_INDEXPAGE">
		<div class="margin-bottom20 clearFloat">
			<span class="font18 font-weight">{{ $t('LK_PILIANGWEIHULINGJIANCAIGOUXIANGMU') }}</span>
			<div class="floatright">
				<iButton @click="back" v-permission="PARTSPROCURE_BATCHMIANTAIN_SAVE">{{ $t('LK_FANHUI') }}</iButton>
				<iButton @click="creatFs" v-permission="PARTSPROCURE_BATCHMIANTAIN_GENERATEFSNUMBER">{{ $t('LK_SHENGCHENGFSHAO') }}</iButton>
				<iButton @click="start" :loading="startLoding" v-permission="PARTSPROCURE_BATCHMIANTAIN_STARTINQUIRY">{{ $t('LK_QIDONGXUNJIA') }}</iButton>
			</div>
		</div>
		<iSearch class="margin-bottom20" :title="$t('LK_CAIGOUXIANGMUXINXI')" tabCard>
			<el-form>
				<el-form-item label="零件采购项目类型">
					<iSelect  v-model="batch.part_preject_type">
						<el-option :value="item.key" :label="item.name"
							v-for="(item, index) in getGroupList('part_preject_type')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item :label="$t('LK_LINIEBUMEN')">
					<iSelect v-model="batch.linieDept">
						<el-option :value="item.key" :label="item.name"
							v-for="(item, index) in getGroupList('linie_dept')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="LINIE" value-key="key">
					<iSelect v-model="linie">
						<el-option :value="item" :label="item.name"
							v-for="(item, index) in getGroupList('linie_name')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item :label="$t('LK_LINGJIANLEIXING')">
					<iSelect v-model="batch.partType">
						<el-option :value="item.key" :label="item.name"
							v-for="(item, index) in getGroupList('part_type')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item :label="$t('LK_CHEXINGXIANGMU')">
					<iSelect  v-model="cartypeProject" value-key="key">
						<el-option :value="item" :label="item.name"
							v-for="(item, index) in getGroupList('cartype_project_zh')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item :label="$t('LK_CAIGOUGONGCHANG')">
					<iSelect  v-model="batch.procureFactory">
						<el-option :value="item.key" :label="item.name"
							v-for="(item, index) in getGroupList('procure_factory')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item :label="$t('LK_DANWEI')">
					<iSelect  v-model="batch.unit">
						<el-option :value="item.key" :label="item.name" v-for="(item, index) in getGroupList('unit')"
							:key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item label="CF控制员">
					<iSelect v-model="batch.cfController">
						<el-option :value="item.key" :label="item.name" v-for="(item, index) in getGroupList('cf_controller')" :key="index"></el-option>
					</iSelect>
				</el-form-item>
			</el-form>
			<template slot="button">
				<iButton @click="save" v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRM">{{ $t('LK_QUEREN') }}</iButton>
				<iButton @click="reset" v-permission="PARTSPROCURE_BATCHMIANTAIN_PURCHASERESET">{{ $t('LK_ZHONGZHI') }}</iButton>
			</template>
		</iSearch>
		<iSearch class="margin-bottom20" :title="$t('LK_CAILIAOZUGONGYISHEZHI')" tabCard icon>
			<el-form>
				<el-form-item :label="$t('LK_CAILIAOZU')">
					<iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="categoryObj"  @change="changeSelect" value-key="id">
						<el-option :value="item" :label="item.categoryNameZh" v-for="(item, index) in category" :key="index"></el-option>
					</iSelect>
				</el-form-item>
				<el-form-item :label="$t('LK_GONGYI')">
					<iSelect placeholder="请选择先材料组" v-model="stuff" value-key="stuffCode">
						<el-option :value="item"  :label="item.stuffName" v-for="(item, index) in stuffArr" :key="index"></el-option>
					</iSelect>
				</el-form-item>
			</el-form>
			<template slot="button">
				<iButton @click="save" v-permission="PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPCONFIRM">{{ $t('LK_QUEREN') }}</iButton>
				<iButton @click="resetStuff" v-permission="PARTSPROCURE_BATCHMIANTAIN_MATERIALGROUPRESET">{{ $t('LK_ZHONGZHI') }}</iButton>
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
		getProcureGroup,
	} from "@/api/partsprocure/home";
  import {
    insertRfq
  } from "@/api/partsrfq/home";
	import {materialGroupByLinie,getStuffByCategory,putMaterialGroup} from "@/api/partsprocure/editordetail";
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
				category:[],//材料组数据
				stuffArr:[],//工艺组数据
				batch: {
					cartypeProjectNum:"",//车型项目编号–同上关联
					cartypeProjectZh:"",//车型项目
					categoryCode:"",//材料组
					categoryName:"",//材料名称
					cfController: "",//CF控制员
					linieDept: "",//LINIE部门
					linieName: "",//采购人名称
					linieNum:"",//采购员编号–同上关联
					partType:"",//零件类型
					procureFactory: "",//采购工厂
					stuffCode:"",//工艺组code
					stuffId:"",//工艺组id
					stuffName:"",//工艺组名称
					type:"",//零件采购项目类型
					unit:"",//单位
					purchaseProjectIds: [],//采购项目id
				},
				stuff: {
					id:"",
					stuffCode:"",
					stuffName:""
				},
				categoryObj:{
					categoryNameZh:"",
					id:""
				},
				linie:{ //专业采购员
					key:"",
					name:""
				},
				cartypeProject:{ //车型项目
					key:"",
					name:""
				},
				// stuffObj:{
				// 	id:"",
				// 	stuffCode:"",
				// 	stuffName:""
				// },
				
				selectTableData: [],
				startLoding: false,
			}
		},
		created() {
			this.getProcureGroup();
			this.getMaterialGroupByLinie()
		},
		methods: {
			//获取上方group信息
			getProcureGroup() {
				let types=["part_preject_type","linie_dept","linie_name","part_type","cartype_project_zh","procure_factory","unit","cf_controller"]
				getProcureGroup({types}).then((res) => {
					this.fromGroup = res.data;
				});
			},
			// 查询fliter数据
			getGroupList(key) {
				if (this.fromGroup.length > 0) {
					let obj = this.fromGroup.find((items) => items.type == key);
					if (!obj) return [];
					return obj.list;
				}
			},
			// 获取材料组数据
			getMaterialGroupByLinie(){
				let data={
					LinieId:this.$store.state.permission.userInfo.id
				}
				materialGroupByLinie(data).then(res=>{
					this.category=res.data || []
				})
			},
			// 获取工艺组数据
			changeSelect(val){
				let data={
					categoryId:val.id
				}
				getStuffByCategory(data).then(res=>{
					this.stuffArr=res.data || []
				})
			},
			// 设置工艺组
			// putMaterialGroup(){
			// 	if (this.batch.purchaseProjectIds.length == 0) {
			// 		iMessage.warn("请选择需要设置的零件采购项目")
			// 		return
			// 	}
			// 	let data={
			// 		id :this.stuff.categoryCode,
			// 		partNums :this.batch.purchaseProjectIds,
			// 		stuffCode:this.stuffObj.stuffCode,
			// 		stuffId:this.stuffObj.id
			// 	}
			// 	getStuffByCategory(data).then(res=>{
			// 		if (res.data) {
			// 			iMessage.success("设置成功")
			// 		}else{
			// 			iMessage.error(res.desZh)
			// 		}
			// 	})
			// },
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
				let batch = {...this.batch}
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
				this.batch.stuffName=this.stuff.stuffName
				this.batch.stuffCode=this.stuff.stuffCode
				this.batch.stuffId=this.stuff.id
				this.batch.cartypeProjectZh=this.cartypeProject.name
				this.batch.cartypeProjectNum=this.cartypeProject.key
				this.batch.linieDept=this.linie.name
				this.batch.linieNum=this.linie.key
				this.batch.categoryCode=this.categoryObj.id
				this.batch.categoryName=this.categoryObj.categoryNameZh
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
