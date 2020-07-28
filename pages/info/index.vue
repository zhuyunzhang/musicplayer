<template>
	<view class="info" :style="bgStyle">
		<!-- '' -->
		<view class="bg"></view>
		<view class="content">
			<view class="top">
				<view class="name">{{audioList[audioPlaySrc].name}}</view>
				<view class="author">{{audioList[audioPlaySrc].author}}</view>
				<view class="bar">
					<view>标准</view>
					<view>音效</view>
					<view>视频</view>
				</view>
			</view>
			<view class="micImg">
			
				<image :class="playState?'zhuan':'stop'" :src="audioList[audioPlaySrc].img" ></image>
				<image class="bgCD"  src="../../static/image/bgCD.png"/>
			</view>
			<!-- <view class="micWord">Oh oh oh oh oooh</view> -->
			<view class="bot">
				 <view class="lineBar">
				 	<view class="time star">{{nowmiaoForc}}</view>
					<slider class="line" :value="nowmiao" min="0" :max="allmiao" @change="sliderChange" block-size="15" activeColor="#55A532" />
				 	<view class="time end">{{allmiaoForc}}</view>
				 </view>
				 <view class="btn">
				 	<view @tap="audioWayFunc">
						<image v-if="audioWay==0" class="iconbtn" src="../../static/image/icon/xunhuanbofang.png"></image>
						<image v-if="audioWay==2" class="iconbtn" src="../../static/image/icon/danquxunhuan.png"></image>
						<image v-if="audioWay==1" class="iconbtn" src="../../static/image/icon/suijibofang.png"></image>
					</view>
				 	<view class="palybtn">
				 		<view @tap="upPlay"><image class="iconbtn" src="../../static/image/icon/shangyishou.png"></image></view>
				 		<view @tap="play">
							<image v-if="!playState" class="iconbtn play" src="../../static/image/icon/kaishi-2.png"></image>
							<image v-if="playState" class="iconbtn play" src="../../static/image/icon/zanting-2.png"></image>
						</view>
				 		<view @tap="nextPlay"><image class="iconbtn" src="../../static/image/icon/xiayishou.png"></image></view>
				 	</view>
				 	<view><image class="iconbtn" src="../../static/image/icon/yinleliebiao.png"></image></view>
				 </view>
				 <view class="tool">
				 	<view @tap="collectFunc">
						<image v-if="!collect" class="iconbtn" src="../../static/image/icon/shoucang.png"></image>
						<image v-if="collect" class="iconbtn" src="../../static/image/icon/shoucang-2.png"></image>
					</view>
				 	<view><image class="iconbtn" src="../../static/image/icon/xiazai.png"></image></view>
				 	<view><image class="iconbtn" src="../../static/image/icon/share.png"></image></view>
				 	<view><image class="iconbtn" src="../../static/image/icon/liuyanjianyi.png"></image></view>
				 </view>
			</view>
		</view>
	</view>
</template>

<script>
	// 
	let innerAudioContext = ''
	export default {
		components:{
		},
		data() {
			return {
				bgStyle:'',
				nowmiao:0,//当前时间
				allmiao:0,//全部时间
				lineBarWid:520,//进度条的宽度跟css一只
				playState:0,//播放状态
				audioCont:'',
				audioList:[],
				audioPlaySrc:0,//当前播放的歌曲index
				audioWay:0,//播放方式 0顺序播放 1随机播放 2单曲循环
				collect:0,//是否收藏
			}
		},
		onLoad: function (param) {
		
			this.audioList=JSON.parse(decodeURIComponent(param.item))
			
		},
		onShow() {
			this.bgStyle='background-image:url('+this.audioList[this.audioPlaySrc].img+')'
		},
		computed:{
			
			width:function (){
				return 'width:' + this.nowmiao/this.allmiao * this.lineBarWid + 'upx'
			},
			playWidth:function () {
				return 'transform:translate3d(' + (this.nowmiao / this.allmiao) * this.lineBarWid + 'upx,0,0);'
			},
			nowmiaoForc:function (){
				return this.$pubFuc.secondFormact(this.nowmiao)
			},
			allmiaoForc:function(){
				return this.$pubFuc.secondFormact(this.allmiao)
			},
			
		},
		mounted:function() {
			this.audioPlaySrc = 0
			this.audioInit()
			
		},
		methods:{
			
			audioInit(){
				let src = this.audioList[this.audioPlaySrc].src
				if(innerAudioContext){
					innerAudioContext.destroy()
					innerAudioContext = ''
					//销毁====================
				}
				innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = src
				innerAudioContext.autoplay = true
				//获取时长
				let dura = setInterval(()=>{
					this.allmiao = Math.floor(innerAudioContext.duration)
					if(this.allmiao){
						clearInterval(dura)
					}
				})
				//监听事件
				innerAudioContext.onPlay(()=>{
					this.playFunc()
				})
				innerAudioContext.onPause(()=>{
					this.pauseFunc()
				})
				innerAudioContext.onTimeUpdate((e)=>{
					this.nowmiao = Math.floor(innerAudioContext.currentTime)
				})
				innerAudioContext.onEnded(()=>{
					this.nextPlay()
				})
			},
			playFunc(){
				this.playState=1
			},
			pauseFunc(){
				this.playState= 0
			},
			sliderChange(e) {
				this.nowmiao = e.detail.value
				innerAudioContext.seek(this.nowmiao)
			},
			play(){
				if(this.playState){
					//暂停
					innerAudioContext.pause()
				}else{
					//播放
					innerAudioContext.play()
				}
			},
			nextPlay(){
				if(this.audioWay==1){
					//随机
					this.audioPlaySrc = Math.floor(Math.random()*10)%this.audioList.length;
				}else if(this.audioWay==0){
					//顺序
					if(this.audioPlaySrc >= (this.audioList.length-1)){
						this.audioPlaySrc = 0
					}else{
						this.audioPlaySrc = this.audioPlaySrc+1
					}
				}//单曲循环
				this.audioInit()
			},
			upPlay(){
				if(this.audioWay==1){
					//随机
					this.audioPlaySrc = Math.floor(Math.random()*10)%this.audioList.length;
				}else if(this.audioWay==0){
					//顺序
					if(this.audioPlaySrc < 1){
						this.audioPlaySrc = this.audioList.length-1
					}else{
						this.audioPlaySrc = this.audioPlaySrc-1
					}
				}//单曲循环
				this.audioInit()
			},
			audioWayFunc(){
				if(this.audioWay>1){
					this.audioWay = 0
				}else{
					this.audioWay = this.audioWay+1
				}
			},
			collectFunc(){
				this.collect = !this.collect
			},
		},
		destroyed(){
			innerAudioContext.destroy()
			innerAudioContext = ''
		}
	}
</script>

<style lang="scss" scoped>
.info{
	position: fixed;
	right: 0;
	left: 0;
	width:100%;
    height:100%;
	background-position:center;
    background-repeat: no-repeat;
    background-size:cover;
	.bg{
		position: fixed;
		z-index: 0;
		right: 0;
		left: 0;
		height: 100%;
		width: 100%;
		filter: blur(40upx);
		background: inherit;
	}
	.content{
		position: fixed;
		z-index: 1;
		right: 0;
		left: 0;
		height: 100%;
		width: 100%;
		color: #FFFDEF;
		
		.top{
			margin-top: 20upx;
			width:100%;
			text-align:center;
			.name{
				font-size: 46upx;
			}
			.author{
				font-size: 34upx;
				line-height: 60upx;
			}
			.bar{
				width: 330upx;
				justify-content: space-between;
				display: flex;
				margin: 20upx auto;
				view{
					width: 100upx;
					height: 40upx;
					border: solid 1upx #FFFDEF;
					border-radius: 2upx;
					text-align: center;
				}
			}
		}
		
		
		.micImg{
			 margin: 25upx auto;
			 
			.bgCD{
				left: 8%;
				position: absolute;
				display: block;
				margin: 0 auto;
				width: 600upx;
				height: 600upx;
				border: solid 16upx rgba(0,0,0,.15);
				border-radius:50%;
				
			}
			.stop{
				left: 8%;
				position: absolute;
				display: block;
				margin: 0 auto;
				width: 600upx;
				height: 600upx;
				border: solid 16upx rgba(0,0,0,.15);
				border-radius:50%;
				-webkit-transform: rotate(360deg);
			}
			.zhuan{
				left: 8%;
				position: absolute;
				display: block;
				margin: 0 auto;
				width: 600upx;
				height: 600upx;
				border: solid 16upx rgba(0,0,0,.15);
				border-radius:50%;
				-webkit-transform: rotate(360deg);
				animation: rotation 8s linear infinite;
				
				
			}	
			 
		}
		.micWord{
			text-align: center;
		}
		.bot{
			position: fixed;
			bottom: 40upx;
			left: 0;
			width: 100%;
			padding: 0 26upx;
			box-sizing: border-box;
			.lineBar{
				display: flex;
				padding: 20upx 0;
				justify-content: space-between;
				.line{
					margin: 0;
					width:520upx;
				}
			}
			.iconbtn{
				display: block;
				width: 50upx;
				height: 50upx;
				margin:0 auto;
			}
			.btn{
				display: flex;
				justify-content: space-between;
				padding: 40upx 15upx;
				.palybtn{
					display: flex;
					width:500upx;
					margin-top:-15upx;
					view{
						flex: 1;
						align-items: center;
					}
					.iconbtn{
						width: 80upx;
						height: 80upx;
						&.play{
							margin-top: -20upx;
							width: 120upx;
							height: 120upx;
						}
					}
					
					
				}
			}
			.tool{
				display: flex;
				view{
					flex: 1;
					text-align: center;
				}
			}
			
		}
	}
}
</style>
