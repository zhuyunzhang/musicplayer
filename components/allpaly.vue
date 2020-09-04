<template>
	<view class="allPlay clear borderColorTop borderColorBottom">
		
		<image class="allPlayIcon fl" v-if="!isShow" src="../static/image/icon/kaishiH.png" @click="tryToParent"></image>
		<image v-else-if="isShow" class="allPlayIcon fl" src="../static/image/icon/zantingH.png" @click="tryToParent"></image>
		<view class="allPlayLabel fl" >全部播放</view>
		<image class="allPlayUpdata fr" src="../static/image/icon/muluHei.png"></image>
		<image class="allPlayList fr" src="../static/image/icon/xiazaiHei.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false
			};
		},
		 methods:{
			 tryToParent(){
				 this.isShow=!this.isShow
				 // 通过$emit进行触发
				 // 第一个参数为父组件监听的事件名，后续参数为父组件方法的参数
				 if( this.isShow){
					 this.$emit("playAll", this.isShow)
				 }else{
					 this.$emit("changeStop", this.isShow)
				 }	
			 }
		 }
	}
</script>

<style lang="scss">
	
	.allPlay{
		line-height: 56upx;
		padding: 28upx 25upx;
		font-size: 30upx;
		.allPlayIcon{
			display: block;
			width: 56upx;
			height: 56upx;
			margin-right: 30upx;
		}
		
		.allPlayList{
			margin-top: 8upx;
			display: block;
			width: 40upx;
			height: 40upx;
			margin-left:45upx ;
		}
		// .allPlayLabel{
		// 	margin-top: 8upx;
		// 	display: block;
		// 	width: 40upx;
		// 	height: 40upx;
		// 	margin-left:45upx ;
		// }
		.allPlayUpdata{
			margin-top: 8upx;
			display: block;
			width: 40upx;
			height: 40upx;
			margin-left:45upx ;
		}
	}

</style>
