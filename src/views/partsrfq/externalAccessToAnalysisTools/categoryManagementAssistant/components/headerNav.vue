<!--
 * @Author: 舒杰
 * @Date: 2021-08-12 09:58:51
 * @LastEditTime: 2022-02-25 11:35:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\components\headerNav.vue
-->
<template>
	<div>
		<div class="navBox">
			<iNavMvp
				class="margin-bottom20"
				:list="tabRouterList"
				routerPage
				:lev="1"
			/>
			<div class="flex-align-center rightNav">
				<div class="margin-right20 category">
					{{
						$store.state.rfq.categoryCode + '-' + $store.state.rfq.categoryName
					}}
				</div>
				<iNavMvp
					:list="categoryManagementAssistantList"
					:lev="2"
					right
					routerPage
					class="margin-right20"
				/>
				<template v-if="showCommonButton">
					<iButton @click="openCatecory">{{
						language('PLGLZS.CAILIAOZU', '材料组')
					}}</iButton>
					<iButton
						@click="openReportInventoryDialog"
						v-permission="CATEGORY_ASSISTANT_BAOGAOQINGDANLIST"
						>{{ language('PLGLZS.BAOGAOQINGDAN', '报告清单') }}</iButton
					>
				</template>
				<slot name="extralButton"></slot>
			</div>
			<!-- <logButton class="logButton" /> -->
			<!--      报告清单-->
			<reportInventory v-model="reportInventoryDialog" />
			<categoryGroup
				v-model="openCatecoryDialog"
				:categoryCodeProps="categoryCodeProps"
				:categoryCodeOptions="categoryCodeOptions"
			></categoryGroup>
		</div>
	</div>
</template>

<script>
import { iNavMvp, iButton } from 'rise'
import { tabRouterList, categoryManagementAssistantList } from '../../data'
import reportInventory from '../reportInventory'
import logButton from '@/components/logButton'
import categoryGroup from './categoryGroup'

export default {
	components: {
		iNavMvp,
		iButton,
		reportInventory,
		categoryGroup,
		logButton,
	},
	props: {
		showCommonButton: {
			type: Boolean,
			default: true,
		},
		categoryCodeProps: String,
		categoryCodeOptions: Array,
	},
	data() {
		return {
			tabRouterList,
			categoryManagementAssistantList,
			reportInventoryDialog: false,
			openCatecoryDialog: false,
		}
	},
	mounted() {
		if (!this.$store.state.rfq.categoryCode) {
			this.openCatecory()
		}
	},
	methods: {
		openReportInventoryDialog() {
			if (this.$store.state.rfq.categoryCode) {
				this.reportInventoryDialog = true
			} else {
				this.openCatecoryDialog = true
			}
		},
		openCatecory() {
			this.openCatecoryDialog = true
		},
		clearDiolog() {
			// this.openCatecoryDialog=false
		},
	},
}
</script>

<style scoped lang="scss">
.navBox {
	position: relative;

	.rightNav {
		display: flex;
		position: absolute;
		top: 0;
		right: 0px;
	}

	.logButton {
		position: absolute;
		top: 5px;
		right: 0;
	}
}
.category {
	font-size: 1.125rem;
	font-weight: 400;
	color: #909091;
}
</style>
