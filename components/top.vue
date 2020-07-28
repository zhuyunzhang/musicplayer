<!-- 
 -->
<template>
	<view class="top bgColor">
		<view class="bar">
			<image v-if="imgSrc" :src="imgSrc+'icon/fenlei.png'" class="icon type"></image>
			<view class="barContent">
				<view :class="type=='0'?'sel':''">我的</view>
				<view :class="type=='1'?'sel':''">音乐馆</view>
				<view :class="type=='2'?'sel':''"  @tap="goUrl('../new/index')">发现</view>
			</view>
			<image v-if="imgSrc" :src="imgSrc+'icon/jiahao.png'" class="icon add"></image>
		</view>
		<view class="serch bgDeepColor">
			<input type="text" placeholder="搜索" placeholder-style="color:rgba(255,255,255,.8)" />
			<image class="icon" v-if="imgSrc" :src="imgSrc+'icon/sousuo5.png'"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "top",
		props:{
			type:String
		},
		data() {
			return {
				imgSrc: '../static/image/',
			};
		},
		methods:{
			goUrl : function (str){
				uni.navigateTo({
					url: str
				});
			},
		},
		mounted() {
			
			console.log("type====>>>"+this.type)
		}
		
	}
</script>

<style  lang="scss" scoped>
	.bgColor{
		background-color: #F55500;
	},
	.top{
		padding: 40upx 20upx;
		width:100%;
		box-sizing: border-box;
		color: #fff;
		font-size: 32upx;
		.bar{
				display: flex;
				justify-content: space-between;
				line-height: 44upx;
				
				.icon{
					width: 44upx;
					height:44upx;
				}
				
				.barContent{
					display: flex;
					width: 360upx;
					margin: 0 auto;
					justify-content: space-between;
					
					.sel{
						font-size: 36upx;
						font-weight: 600;
					}
				}
		}
		.serch{
			position: relative;
			margin-top: 32upx;
			padding: 10upx 20upx;
			height: 76upx;
			background-color: #DC143C;
			line-height: 60upx;
			box-sizing: border-box;
			color: rgba(255,255,255,1);
			input{
				padding-left: 60upx;
			}
			.icon{
				position: absolute;
				top: 16upx;
				left: 20upx;
				width: 40upx;
				height: 40upx;
			}
		}
	}
</style>
