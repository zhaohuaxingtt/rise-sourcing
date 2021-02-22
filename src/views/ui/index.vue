<!--
 * @Author: your name
 * @Date: 2021-02-19 14:29:21
 * @LastEditTime: 2021-02-22 17:55:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ui\index.vue
-->
<template>
	<div class="padding20">
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
		iTabs
	} from "@/components";
	import icard from "./components/title";
	export default {
		data() {
			return {
				key: "",
			};
		},
		components: {
			icard,
			iInput,
			iSelect,
			iTabs,
		},
		methods: {

		},
	};
</script>
<style lang="scss" scoped>
</style>
