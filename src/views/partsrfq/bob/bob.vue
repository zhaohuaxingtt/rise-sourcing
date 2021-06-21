<!--
 * @Author: xuxin
 * @Date: 2021-06-16 10:41:04
 * @Description: BOB主页面
 * @FilePath: \front-web\src\views\bob\bob.vue
-->
<template>
  <div class="bob-main">
		<iSearch @reset="handleSearchReset" @sure="getTableList" :icon="false">
			<el-form  label-position="top" >
			<el-row class="margin-bottom20">
				<!--材料组-->
				<el-form-item :label="$t('LK_CAILIAOZU')">
					<iInput :placeholder="$t('请输入材料组编号/名称')" v-model="form.group"></iInput>
				</el-form-item>
				<!--零件号-->
				<el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
					<iInput :placeholder="$t('请输入零件号')" v-model="form.num"></iInput>
				</el-form-item>
				<!--供应商状态-->
				<el-form-item :label="$t('RFQ号/名称')">
					<iInput  v-model="form.rfq"></iInput>
				</el-form-item>
				<!--集团打包-->
				<el-form-item :label="$t('创建人')">
					<iInput :placeholder="$t('请输入零件号')" v-model="form.owner" />
				</el-form-item>
			</el-row>
		</el-form>
		</iSearch>
    <iCard :title="$t('BoB分析库')" class="margin-top20">
			<template v-slot:header-control>
				<div v-if="!edit">
					<iButton @click="edit=true">{{ $t("LK_BIANJI") }}</iButton>
					<iButton @click="newBob">{{ $t("新建") }}</iButton>
					<iButton @click="deleteBob">{{ $t("delete") }}</iButton>
				</div>
				<div v-else>
					<iButton @click="cancelEdit">{{ $t("LK_QUXIAO") }}</iButton>
					<iButton @click="saveEdit">{{ $t("LK_BAOCUN") }}</iButton>
				</div>
      </template>
			<el-table
				ref="multipleTable"
				:data="tableListData"
				style="width: 100%;margin-bottom: 20px;"
				row-key="id"
				border
				default-expand-all
				:tree-props="{children: 'children'}"
				@selection-change="handleSelectionChange"
				@select="checkChildren"
				@select-all="checkAll"
				>
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					type="index"
					label='#'
					width='50'
					:index="indexMethod">
				</el-table-column>
				<el-table-column
					:label="$t('分析名称')" width="200"
				>
					<template slot-scope="scope">
						<el-row type="flex" align="middle">
							<el-col :span="(scope.row.children!==null)?20:16">
								<div v-if="edit">
									<iInput v-model="scope.row.nameZh" />
								</div>
								<div v-else>
								{{scope.row.nameZh}}
								</div>
							</el-col>
							<el-col :span="4" >
								<iNumIcon style="margin-top: 20px;" v-if="scope.row.children!==undifined" :num="(scope.row.children!==null)?scope.row.children.length:0"/>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column 	:label="$t('LK_CAILIAOZU')"
					prop="group">
				</el-table-column>
				<el-table-column 	:label="$t('RFQ')"
					prop="rfqName">
				</el-table-column>
				<el-table-column 	:label="$t('默认项')"
				>
					<template slot-scope="scope">
						<div v-if="edit&&scope.row.children!==undifined">
							<iSelect v-model="scope.row.defaultRule" @change="setDefault">
								<el-option value="是" label="是" />
								<el-option value="否" label="否" />
								<el-option value="" label="" />
							</iSelect>
						</div>
						<div v-else>
						{{scope.row.defaultRule}}
						</div>
					</template>
				</el-table-column>
				<el-table-column 	:label="$t('文件类型')"
					prop="fileType">
				</el-table-column>
				<el-table-column 	:label="$t('创建人')"
					prop="owner">
				</el-table-column>
				<el-table-column 	:label="$t('LK_CHUANGJIANRIQI')"
					prop="createDate">
				</el-table-column>
				<el-table-column 	:label="$t('上次修改日期')"
					prop="modifyDate">
				</el-table-column>
				<el-table-column width="50">
					<template slot-scope="scope">
						<div v-if="scope.row.children===undifined"></div>
						<icon v-else-if="scope.row.top!=='0'" name="iconliebiaoyizhiding"  class="iconliebiaoyizhiding" symbol/>
						<icon v-else name="iconliebiaoweizhiding"  class="iconliebiaoweizhiding" symbol/>
					</template>
				</el-table-column>
		</el-table>
			<iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"/>
		</iCard>
  </div>
</template>

<script>
import{iCard,iInput,iSearch,iButton,iPagination,iSelect,icon}from 'rise'
import {pageMixins} from '@/utils/pageMixins';
import iNumIcon from './iNumIcon.vue'
export default {
	mixins: [pageMixins],
  components:{
    iCard,iInput,iSearch,iButton,iPagination,iSelect,icon,iNumIcon
  },
  data(){
    return {
			form:{
			},
			rfqID:'2222',
			edit:false,
			tableListData:[]
    }
  },
	mounted(){
		this.form={
			...this.form,
			rfq:this.rfqID
		}
		this.initData()
	},
	methods:{
		indexMethod(e){
			console.log(this.tableListData)
			const rows=[]
			this.tableListData.forEach((r)=>{
				rows.push(r.myindex)
				if(r.children&&r.children!==null){
					r.children.forEach((c)=>{
						rows.push(c.myindex)
					})
				}
			})
			return rows[e]
		},
		initData(){
			this.tableListData=[
				{
					id:1,
					myindex:'1',
					nameZh:'aaaa',
					group:'1111',
					rfqName:'bbbb',
					defaultRule:'是',
					fileType:'方案',
					owner:'11',
					createDate:'',
					modifyDate:'',
					top:'1',
					children:[
						{
							id:2,
							myindex:'1.1',
							nameZh:'aaaa1',
							group:'1111',
							rfqName:'bbbb1',
							defaultRule:'',
							fileType:'报告',
							owner:'111',
							createDate:'',
							modifyDate:'',
						}
					]
				},
				{
					id:3,
					myindex:'2',
					nameZh:'aaa2',
					group:'1111',
					rfqName:'bbbb2',
					defaultRule:'',
					fileType:'方案',
					owner:'11',
					createDate:'',
					modifyDate:'',
					top:'0',
					children:null
				}
			]
		},
		handleSearchReset() {
				this.form = {
					rfq:this.rfqID
				};
				this.getTableList();
		},
		getTableList(){
			console.log(this.form)
		},
		newBob(){
			this.$router.push('bobNew')
		},
		deleteBob(){

		},
		saveEdit(){

		},
		cancelEdit(){
			this.edit=false
		},
		handleSizeChange(e,fn){

		},
		handleCurrentChange(e,fn){

		},
		handleSelectionChange(){

		},
		checkAll(currentSelect){
			const haschild =currentSelect.filter((r)=>r.children&&r.children!==null&&r.children.length>0)
			if(haschild.length>0){
				currentSelect.map((r)=>{
					if(r.children&&r.children!==null&&r.children.length>0){
						r.children.forEach((c)=>{
							this.currentSelect.push(c)
							this.$refs.multipleTable.toggleRowSelection(c,true)
						})	
					}

				})
			} else{
				this.$refs.multipleTable.clearSelection()
			}
		},
		checkChildren(currentSelect,row){
			let action=currentSelect.indexOf(row)!==-1?true:false
			if(row.children&&row.children!==null&&row.children.length>0) {
				row.children.map((c)=>{
					this.$refs.multipleTable.toggleRowSelection(c,action)
				})
			}
		},
	}
}
</script>

<style lang="scss">
.bob-main{
	margin-top: 10px;
	.el-table__expand-icon{
		float: right!important;
    margin-top: 20px!important;
	}
	
}
</style>