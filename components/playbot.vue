<!-- 数据结构
data:{Name:"这里是名字",SrcAudio:"音频地址",Author:'作者',describe:"这里是描述"",SQ:1,DJ:1,HQ:1,VIP:1}
 -->
<template>
	<view class="playBot borderColorTop">
		<image :class="flagStart?'img zhuan':'img stop'" :src="musicPlay.img"></image>
		<view class="title">
			<view class="name">{{musicPlay.name.length>15? musicPlay.name.substring(0,15)+"...":musicPlay.name}}</view>
			<view class="desc">{{musicPlay.dec.length>15? musicPlay.dec.substring(0,15)+"...":musicPlay.dec}}</view>
		</view>
		
		<image v-if="!flagStart" class="icon" src="../static/image/icon/kaishiH.png" @click="changeStart"></image>
		<image v-else-if="flagStart" class="icon" src="../static/image/icon/zantingH.png" @click="changeStop"></image>
		<image class="icon liebiao" src="../static/image/icon/muluH.png"></image>
	</view>
</template>

<script>
	export default {
		name:'playbot',
		props:{
			flagStart:{
				type:Boolean,
			},
			musicPlay:{
				type:Object,
			},
		},
		data() {
			return {
			
			};
		},
		// watch: {
			
		// 	  'musicPlay': function(newVal){
		// 		  this.musicPlay=newVal
		// 	  }
		//   },
		methods:{
			changeStart(){
				this.$emit('changeStart')
			},
				
			changeStop(){
				this.$emit('changeStop')
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.playBot{
		position: fixed;
		display: flex;
		align-items: center;
		bottom: 0;
		left: 0;
		width: 100vw;
		padding: 20upx 25upx 10upx;
		box-sizing: border-box;
		background-color: white;
		.img{
			display: block;
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			&.zhuan{
				-webkit-transform: rotate(360deg);
				animation: rotation 8s linear infinite;
			}
			&.stop{
				-webkit-transform: rotate(360deg);
			
			}
		}
		.title{
			flex: 1;
			padding-left: 30upx;
			font-size: 34upx;
			.desc{
				font-size: 26upx;
				color: rgb(75,75,75);
			}
		}
		.icon{
			width: 65upx;
			height: 65upx;
			padding-left: 30upx;
			&.liebiao{
				width: 40upx;
				height: 40upx;
				
			}
		}
	}
</style>
