<!--
 * @author: shujie
 * @createTime: 2021-6-16 4:08:35 
 * @Description:谈判助手-报告清单首页
 -->
<template>
	<iPage>
		<div class="flex-between-center">
			<!-- 报告清单 -->
			<span class="pageTitle">{{$t('TPZS.BGQD')}}</span>
			<div>
				<!-- 导出 -->
				<iButton @click="openExport">{{$t('LK_DAOCHU')}}</iButton>
				<!-- 返回 -->
				<iButton @click="back">{{$t('LK_FANHUI')}}</iButton>
			</div>
		</div>
		<iSearch class="margin-top20" @sure="sure" @reset="reset" icon="false">
			<el-form>
				<el-form-item :label="item.key?$t(item.key):item.name" v-for="(item,index) in search" :key="index">
					<iSelect v-if="item.type=='select'" v-model="searchCriteria[item.props]">
						<el-option :value="item.code" :label="item.name" v-for="item in fromGroup[item.select]" :key="item.code"></el-option>
					</iSelect>
					<iInput v-else :placeholder="$t(item.placeholder)" v-model="searchCriteria[item.props]" :disabled="item.props=='rfq' && inside"></iInput>
				</el-form-item>
			</el-form>
		</iSearch>
		<!-- 专项分析工具 -->
		<specialTools :searchCriteria="searchCriteria" ref="specialTools"></specialTools>
		<!------------------------------------内部进入------------------------------------>
		<el-row v-if="inside">
			<el-col :span="12">
				<!-- 报价分析 -->
				<quotationAnalysis class="margin-right20"></quotationAnalysis>
			</el-col>
			<el-col :span="12">
				<!-- 谈判基本信息 -->
				<negotiationBasic class="margin-left20"></negotiationBasic>
			</el-col>
		</el-row>
		<!-- 导出弹窗 -->
		<exportReport v-model="visible" :tableListData="selectAllData"></exportReport>
	</iPage>
</template>

<script>
	import {iPage,iSelect,iInput,iButton,iSearch,iMessage} from 'rise';
	import {search} from './components/data';
	import {selectDictByKeys} from '@/api/dictionary';
	import specialTools from './components/specialTools';
	import quotationAnalysis from './components/quotationAnalysis';
	import negotiationBasic from './components/negotiationBasic';
	import exportReport from './components/exportReport'
	export default{
		components:{
			iPage,iSelect,iInput,iButton,iSearch,specialTools,quotationAnalysis,negotiationBasic,exportReport
		},
		data() {
			return {
				search,
				fromGroup: {},//下拉框数据
				visible:false,
				searchCriteria:{
					name:"",
					toolType:"",
					materialGroup:"",
					partsNo:"",
					rfq:"",
				},
				selectAllData:[],//所有选择的数据
				inside:true,//是否内部进入
			}
		},
		created() {
			this.searchCriteria.rfq=this.$store.state.rfq.rfqId
			this.inside=this.$store.state.rfq.entryStatus===1?true:false
			this.getAllSelect()
		},
		methods:{
			// 字段查询下拉框
			getAllSelect() {
				let data = [{keys: "REPORT_TOOL_TYPE"}]
				selectDictByKeys(data).then(res => {
					if (res.data) {
						this.fromGroup = res.data
					}
				})
			},
			// 打开导出弹窗
			openExport(){
				this.selectAllData=this.$refs.specialTools.selectData
				console.log(this.selectAllData.length);
				if (this.selectAllData.length == 0) {
					iMessage.error(this.$t('TPZS.CANNOTSELECT'))
				}else if(this.selectAllData.length>10){
					iMessage.error(this.$t('TPZS.ZDDCBG'))
				}else{
					this.visible=true
				}
			},
			//搜索
			sure(){
				this.$refs.specialTools.search()
			},
			// 重置
			reset() {
				this.searchCriteria = {};
				this.$nextTick(()=>{
					this.$refs.specialTools.search()
				})
			},
			// 返回
			back(){
				this.$router.back(-1)
			}
		}
	}
</script>

<style lang="scss">
	.pageTitle{
		font-size: 20px;
		color: $color-black;
		font-weight: bold;
	}
	.openPage{
		color: $color-blue;
		font-size: 14px;
		text-decoration: underline;
		cursor: pointer;
		width: 100px;
		@include text_;
	}
</style>
