<template>
	<iPage>
		<iCard title="AEKO Recommendation Sheet/AEKO 推荐表">
			<iTableCustom 
				class="margin-top24"
        :columns="newTableList"
        :data="listData"
				v-loading="tableLoading"
			/>
		</iCard>
	</iPage>
</template>

<script>
import { getAekoDetails } from "@/api/ws2/bmApply";
import { iCard, iPagination, iButton, iMessage, iPage } from "rise";
import iTableCustom from "@/components/iTableCustom";
import { recommendationFormPendingApprovalTitle as tableList } from "./components/data";
export default {
	components: {
		iPage, iCard, iTableCustom
	},
	computed: {
		newTableList: function(){
			const whiteList = ['新A价','A价变动','BNK变动','新B价','开发费'];
			if(this.isFinance){
				return this.tableList.filter(item => !whiteList.includes(item.label));
			}else{
				return this.tableList;
			}
			
		}
	},
	data(){
		return {
			listData: [],
			tableList,
			isFinance: false,
			tableLoading: false,
			pageQuery: {
				...this.$route.query,
			}
		}
	},

	created(){
		this.isFinance = ~~this.pageQuery.pageType === 1;
		this.getPageData();
	},

	methods: {
		getPageData(){
			this.tableLoading = true;
			getAekoDetails([this.pageQuery.rsNum]).then(res => {
				this.listData = res.data;
				this.tableLoading = false;
			}).catch(() => {
				this.tableLoading = false;
			})
		},
	}
}
</script>

<style>

</style>