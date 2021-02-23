<!--
 * @Author: your name
 * @Date: 2021-02-19 14:29:21
 * @LastEditTime: 2021-02-23 09:56:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ui\index.vue
-->
<template>
	<div class="padding20 scorll">
		<span class="font14 blue">RISE
			公共UI组件展示界面，基于element的二次封装，当前element版本：1.15.0</span>
		<el-row class="margin0 padding0">
			<el-col :span="8">
				<icard title="iInput">
					<iInput slot="components"></iInput>
				</icard>
			</el-col>
			<el-col :span="8">
				<icard title="iSelect">
					<iSelect slot="components"></iSelect>
				</icard>
			</el-col>
			<el-col :span="8">
				<icard title="el-checkbox&el-radio">
					<template slot="components">
						<el-checkbox checked>checkboxItems</el-checkbox>
						<el-checkbox>checkboxItemsOther</el-checkbox>
					</template>
				</icard>
			</el-col>
			<el-col :span="24">
				<icard title="iCard">
					<el-row slot="components" :gutter="20">
						<el-col :span="8">
							<iCard title="title">
								<div>body</div>
							</iCard>
						</el-col>
						<el-col :span="8">
							<iCard title="title">
								<template v-slot:header-control>
									<el-button size="mini">button1</el-button>
									<el-button size="mini">button2</el-button>
								</template>
								<div>body</div>
							</iCard>
						</el-col>
						<el-col :span="8">
							<iCard>
								<div>body</div>
							</iCard>
						</el-col>
					</el-row>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<icard title="el-radio">
					<template slot="components">
						<el-radio-group v-model="radio">
							<el-radio label="1">radio</el-radio>
							<el-radio label="2">radiother</el-radio>
						</el-radio-group>
					</template>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='24'>
				<icard title="el-tabel">
					<el-table slot="components" :data='TabelData'>
						<el-table-column v-for="(items,index) in tabelTile" :key="index" align='center' :label="items.name" :prop="items.key"></el-table-column>
					</el-table>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='24'>
				<icard title="iButton">
					<iButton slot="components">iButton example</iButton>
					<iButton slot="components" loading>iButton loading</iButton>
					<iButton slot="components" :loading='loading' @click="repeatClick" icon='el-icon-delete'>iButton NoRepeat Submit</iButton>
					<iButton slot="components" size='mini'>Mini iButton example</iButton>
					<iButton slot="components" size='mini' loading>Mini iButton example</iButton>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<icard title="iTabs(border-card)">
					<iTabs type="border-card" slot="components">
						<el-tab-pane label="Category">内容1</el-tab-pane>
						<el-tab-pane label="Metarial">内容2</el-tab-pane>
						<el-tab-pane label="Jsdker">内容3</el-tab-pane>
					</iTabs>
				</icard>
			</el-col>
			<el-col :span="8">
				<icard title="iTabs">
					<iTabs slot="components">
						<el-tab-pane label="Category">内容1</el-tab-pane>
						<el-tab-pane label="Metarial">内容2</el-tab-pane>
					</iTabs>
				</icard>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import {
		iInput,
		iSelect,
		iButton,
		iCard,
		iTabs
	} from "@/components";
	import icard from "./components/title";
	import {
		tabelTile
	} from './components/data'
	import {
		TabelData
	} from '@/api/ui'
	export default {
		components: {
			icard,
			iInput,
			iSelect,
			iButton,
			iCard,
			iTabs
		},
		data() {
			return {
				tabelTile,
				TabelData: [],
				radio: 1,
				loading: false
			}
		},
		created() {
			TabelData().then(res => {
				this.TabelData = res.data
			})
		},
		methods: {
			repeatClick() {
				console.log('you have clicked the button')
				this.loading = !this.loading
				//just like ajax 
				setTimeout(() => {
					this.loading = !this.loading
				}, 3000);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.scorll {
		overflow-y: scroll;
		height: 100%;
	}
</style>
