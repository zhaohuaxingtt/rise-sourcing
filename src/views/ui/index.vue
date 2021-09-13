<!--
 * @Author: your name
 * @Date: 2021-02-19 14:29:21
 * @LastEditTime: 2021-09-08 16:05:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ui\index.vue
 * @FileName:
-->
<template>
	<div class="padding20 scorll">
		<span class="font14 blue">RISE
			{{$t('LK_SHENGMINGJISHUBANBEN')}}：1.15.0</span>
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
			<el-col :span="24">
				<icard title="el-tabel">
					<el-table slot="components" :data="TabelData" :empty-text="$t('LK_ZANWUSHUJU')">
						<el-table-column v-for="(items, index) in tabelTile" :key="index" align="center" :label="items.name" :prop="items.key"></el-table-column>
					</el-table>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<icard title="iButton">
					<iButton slot="components">iButton example</iButton>
					<iButton slot="components" loading>iButton loading</iButton>
					<iButton slot="components" :loading="loading" @click="repeatClick" icon="el-icon-delete">iButton NoRepeat Submit</iButton>
					<iButton slot="components" size="mini">Mini iButton example</iButton>
					<iButton slot="components" size="mini" loading>Mini iButton example</iButton>
					<iButton slot="components" size="mini" disabled>iButton disabled</iButton>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<icard title="iTabs(border-card)">
					<iTabs type="border-card" slot="components" stretch>
						<el-tab-pane label="Category">内容1</el-tab-pane>
						<el-tab-pane label="Metarial">内容2</el-tab-pane>
						<el-tab-pane label="Metarial">内容3</el-tab-pane>
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
		<el-row>
			<el-col :span="12">
				<icard title="iTabs-list">
					<iTabs-list type="border-card" slot="components">
						<el-tab-pane label="材料清单">内容1</el-tab-pane>
						<el-tab-pane :label="$t('LK_GONGYINGSHANGMING')">内容2</el-tab-pane>
					</iTabs-list>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<icard title='iSearch'>
				<iSearch slot="components">
					<el-form>
							<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
							<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
							<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
							<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
								<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
							<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
							<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
							<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>	
								<el-form-item label="活动名称">
								<iInput></iInput>
							</el-form-item>
							<el-form-item :label="language('LANGRUIGEKEY1','活动名称')">
								<iInput></iInput>
							</el-form-item>
							<el-form-item :label="language('LANGRUIGEKEY2','活动名称12')">
								<iInput></iInput>
							</el-form-item>
							<el-form-item :label="language('LANGRUIGEKEY3',languageText)">
								<iInput></iInput>
							</el-form-item>	
					</el-form>
				</iSearch>
			</icard>
			<el-col :span="24">
				<iCard title="partInfo">
					<partInfo icons :title="tabelTile" :data="partInfoData"></partInfo>
				</iCard>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<icard title="icon">
					<div class="icon-box" slot="components" v-for="(name, $index) in iconList" :key="$index">
						<icon symbol size="30" :name="name" />
						<p>{{ name }}</p>
					</div>
				</icard>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span='24'>
				<iCard class="margin-bottom20">
					<iFormGroup :row="4" inline :rules="rules" icon class="noMargin">
								<iFormItem>
										<iFormItem :row='2' label="QC" name="test">
											<iInput></iInput>
										</iFormItem>
										<iFormItem :row='2' label="QD" name="test">
											<iInput></iInput>
										</iFormItem>
								</iFormItem>
								<iFormItem label="FSNR/GSNR/SPNR：" name="test">
									<iInput></iInput>
								</iFormItem>
								<iFormItem :label="$t('LK_XUNJIACAIGOUYUAN')+':'" name="test">
									<iInput></iInput>
								</iFormItem>
								<iFormItem :label="$t('LK_QIANSHOURIQI')+':'" name="test">
									<iInput></iInput>
								</iFormItem>
					</iFormGroup>
				</iCard>
				<iCard>
				<iFormGroup :row="3" inline icon>
							<iFormItem :label="$t('LK_LINGJIANHAO')+':'" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem label="FSNR/GSNR/SPNR：" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem :label="$t('LK_XUNJIACAIGOUYUAN')+':'" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem :label="$t('LK_LINGJIANHAO')+':'" name="test">
								<iText>test</iText>
							</iFormItem>
							<iFormItem label="FSNR/GSNR/SPNR：" name="test">
								<iInput></iInput>
							</iFormItem>
				</iFormGroup>
				<iFormGroup :row="2" inline icon>
							<iFormItem :label="$t('LK_LINGJIANHAO')+':'" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem label="FSNR/GSNR/SPNR：" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem :label="$t('LK_XUNJIACAIGOUYUAN')+':'" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem :label="$t('LK_LINGJIANHAO')+':'" name="test">
								<iText>test</iText>
							</iFormItem>
							<iFormItem label="FSNR/GSNR/SPNR：" name="test">
								<iInput></iInput>
							</iFormItem>
				</iFormGroup>
					<iFormGroup :row="1" inline icon>
							<iFormItem :label="$t('LK_LINGJIANHAO')+':'">
								<iInput v-permission.auto="DANGQIANKEY|当前模块的名字"></iInput>
							</iFormItem>
							<iFormItem label="FSNR/GSNR/SPNR：" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem :label="$t('LK_XUNJIACAIGOUYUAN')+':'" name="test">
								<iInput></iInput>
							</iFormItem>
							<iFormItem :label="$t('LK_LINGJIANHAO')+':'" name="test">
								<iText>test</iText>
							</iFormItem>
							<iFormItem label="" name="test">
								<iFormItem :row='2' label="1" name="test"><iText>test</iText></iFormItem>
								<iFormItem :row='2' label="1" name="test"><iText>test</iText></iFormItem>
							</iFormItem>
				</iFormGroup>
				</iCard>
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
		iTabs,
		iTabsList,
		icon,
		iFormGroup,
		iFormItem,
		iText
	} from 'rise';
	import icard from "./components/title";
	import {
		tabelTile
	} from "./components/data";
	import {
		getTableList
	} from "@/api/ui";
	export default {
		components: {
			icard,
			iInput,
			iSelect,
			iButton,
			iCard,
			iTabs,
			icon,
			iTabsList,
			iFormGroup,
			iFormItem,
			iText
		},
		data() {
			return {
				tabelTile,
				TabelData: [],
				radio: 1,
				loading: false,
				languageText:'4',
				iconList: [
					"iconhomeweixuanzhong",
					"iconcaidanshouqi",
					"iconxiaoxi",
					"iconsousudingbu",
					"iconcaidanzhankai",
				],
				partInfoTitle:[{key:"a",name:"零件信息"}],
				partInfoData:{a:"D232121FF"}
			};
		},
		created() {
			getTableList().then((res) => {
				this.TabelData = res.data;
			});
		},
		methods: {
			repeatClick() {
				console.log("you have clicked the button");
				this.loading = !this.loading;
				//just like ajax
				setTimeout(() => {
					this.loading = !this.loading;
				}, 3000);
			},
		},
	};
</script>
<style lang="scss" scoped>
	.scorll {
		overflow-y: scroll;
		height: 100%;
	}

	.icon-box {
		width: 120px;
		display: inline-block;
		text-align: center;

		svg+p {
			margin-top: 20px;
		}

		&+& {
			margin-left: 20px;
		}
	}
</style>
