<template>
	<div class="tab1 flex-align-center">
		<div class="name">
			<span>零件所属材料：</span>
			<span>0312</span>
		</div>
		<div class="name">
			<span>零件所属材料：</span>
			<span>0312</span>
		</div>
		<div class="name">
			<span>零件所属材料：</span>
			<span>0312</span>
		</div>
		<div class="name">
			<span>零件所属材料：</span>
			<span>0312</span>
		</div>
		<div class="name">
			<span>零件所的属材dd料：</span>
			<span>0312</span>
		</div>
		<div>
			<!-- <iButton>设置工艺组</iButton> -->
		</div>
	</div>
</template>

<script>
	import {iButton} from "@/components"
	export default{
		components:{
			iButton
		},
		data() {
			return {
				key: 1
			}
		},
	}
</script>

<style lang="scss" scoped>
	.tab1{
		flex-wrap: wrap;
		>div{
			width: 25%;
		}
		.name{
			display: flex;
			align-items: center;
			span:nth-of-type(1){
				min-width: 200px;
			}
		}
	}
</style>
