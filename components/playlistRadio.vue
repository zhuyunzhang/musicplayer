
<template>
	<view class="playList clear borderColorBottom" >
		<view class="fl" @click="check(info)">
			<view class="name">
			{{info.mainSong.name.length>10? info.mainSong.name.substring(0,10)+"...":info.mainSong.name}}
			</view>
		</view>

		<image class="fr playListGengduo" src="../static/image/icon/gengduoHui.png"></image>
		
		<image v-if="!isShow" class="fr playListBofang" src="../static/image/icon/kaishiH.png" @click="changeStart(info)"></image>
		<image v-else-if="isShow" class="fr playListBofang" src="../static/image/icon/zantingH.png"  @click="changeStop"></image>
	</view>
</template>

<script>
	export default {
		props:{
			info:{
				type:Object,
			}
		},
		data() {
			return {
				isShow:false,
				muData:{},
			};
		},
		mounted() {
		
		},
		methods:{
			check(item){
	
				this.isShow=!this.isShow
		
				this.muData=item
				this.$emit('checkData',item)
			},
			changeStart(item){
				
				this.isShow=!this.isShow
				if(JSON.stringify(this.muData)==="{}"){
					this.$emit('checkData',item)
				}else{
					console.log("=====1>>>")
					console.log(this.muData)
					this.$emit('changeStart')
				}
			},
			changeStop(){
				console.log("=====>2>>")
				this.isShow=!this.isShow
				this.$emit('changeStop')
			}
		}
	}
</script>

<style lang="scss">
	.playList{
		margin-left:30upx;
		padding:15upx 25upx 20upx 0;
		.biao{
			display: inline-block;
			vertical-align: text-bottom;
			padding: 2upx 6upx;
			margin-right: 10upx;
			border: solid 1px #f55500;
			color: #f55500;
			border-radius: 4upx;
			font-size: 24upx;
			line-height: 24upx;
			&.sq{
				color: #9c8200;
				border: solid 1px #9c8200;
			}
		}
		.playListBofang,
		.playListGengduo{
			display: block;
			width: 40upx;
			height: 40upx;
			margin-left: 45upx;
			margin-top: 20upx;
		}
		.name{
			font-size: 38upx;
			line-height: 60upx;
			float: left;
		}
		.rightImg{
			margin-right: 45upx;
			margin-top: 10upx;
			width: 40upx;
			height: 40upx;
			float: left;
		}
		.other{
			font-size: 26upx;
			line-height: 40upx;
			color: rgb(75,75,75);
			width: 520upx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
</style>
