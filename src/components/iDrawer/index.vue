<template>
	<div class="drawer" :class="type?'showMenuList':'hideMenuList'">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type:false
			}
		},
		props: {
			
		},
		methods:{
			// 显示任务菜单
			show() {
				this.type = !this.type
			}
		},
	}
</script>

<style lang="scss" scoped>
	.drawer {
		width: 400px;
		transition: all .5s;
		position: absolute;
		right: -400px;
		top: 0;
		min-height: 100vh;
		z-index: -1;
		background: #FFFFFF;
		box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
	}

	.showMenuList {
		right: 0px;
	}

	.hideMenuList {
		right: -400px;
	}
</style>
