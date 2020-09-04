<template>
	<view class="new">
		<swiper class="swiper">
			<swiper-item>
				<view class="swiper-item">
					<allplay @playAll='playAll' @changeStop='changeStop'></allplay>
					<scroll-view scroll-y="true" class="scroll-Y">
						<playlistRadio v-for="item in newList" :info="item" @checkData='checkData' @changeStart='changeStart' @changeStop='changeStop'></playlistRadio>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
		<playbot v-if="isShow" :flagStart='flagStart' :musicPlay='musicPlay' @changeStart='changeStart' @changeStop='changeStop'></playbot>
		
	</view>
</template>

<script>
	import allplay from '../../components/allpaly'
	import playlistRadio from '../../components/playlistRadio'
	import playbot from '../../components/playbot.vue'
	import {url} from '../../api/request.js'
	import {listing} from '../../api/api.js'
	let innerAudioContext = ''
	export default {
		components:{allplay,playlistRadio,playbot},
		data() {
			return {
				newList:[],
				newId:0,
				isShow:false,
				flagMsg:false,
				audioPlaySrc:0,
				musicPlay:{
					img:'',
					name:'',
					dec:'',
				},
			
				flagStart:false
				
			}
		},
		onLoad: function (param) {
			this.newId=JSON.parse(decodeURIComponent(param.item))		
			this.flagStart=uni.getStorageSync('flagStart')
			
		},
		methods: {
			audioInit(musicData){
				console.log(musicData)
				let src = musicData[0].src
				uni.setStorageSync('src',src)
				src=uni.getStorageSync('src')
				
				if(innerAudioContext){
					innerAudioContext.destroy()
					innerAudioContext = ''
					//销毁====================
				}
				innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = src
				innerAudioContext.autoplay = true
				uni.$emit('innerAudioContext',innerAudioContext)
				innerAudioContext.onEnded(()=>{
					if(this.flagMsg){
						this.audioPlaySrc=this.audioPlaySrc+1
						this.checkData(this.newList[this.audioPlaySrc])
						
					}else{
						this.changeStop()
					}
					
				})
			},
			playAll(msg){
				this.isShow=true
				this.flagMsg=msg
				this.newList[0].flag=true
				this.checkData(this.newList[0])
				
			},
			checkData(data){
				console.log(data)
				this.isShow=true
				this.musicPlay.img=data.coverUrl
				this.musicPlay.name=data.mainSong.name
				this.musicPlay.dec=data.description
				uni.$emit('musicData',this.musicPlay)
				
				uni.setStorageSync('musicData',JSON.stringify(this.musicPlay))
				this.flagStart=true
				uni.$emit('flagStart',this.flagStart)
				uni.setStorageSync('flagStart',this.flagStart)
				let musicData=[]
				listing(url+'song/url?id='+data.mainSong.id)
				.then((res)=>{
			
					let option={
						src:res.data[0].url,
						name:data.name
					}
				
					musicData.push(option)
					this.audioInit(musicData)
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			changeStart(){
				if(this.musicPlay.name !== ""){
					this.flagStart=true
					uni.$emit('flagStart',this.flagStart)
					uni.$emit('innerAudioContext',innerAudioContext)
					innerAudioContext.play()
					uni.setStorageSync('flagStart',this.flagStart)
				}
			},
			
			changeStop(){
				this.flagStart=false
				uni.$emit('flagStart',this.flagStart)
				uni.$emit('innerAudioContext',innerAudioContext)
				innerAudioContext.pause()
				uni.setStorageSync('flagStart',this.flagStart)
			},
			getMusicData(){
				listing(url+'dj/program?rid='+this.newId)
				.then((res)=>{	
					this.newList=res.programs
				})
				.catch((err)=>{
					console.log(err)
				})
			}
		},
		mounted() {
			
			if(innerAudioContext!==''){
				this.isShow=true
			}
			if(uni.getStorageSync('musicData') !==null ){
				this.musicPlay=JSON.parse(uni.getStorageSync('musicData'))
			}
			this.getMusicData()
			
			
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
.new{
	overflow: hidden;
	.bar{
		display:flex;
		justify-content: center;
		margin: 30upx 0;
		
		.li{
			padding: 0 40upx;
			line-height: 60upx;
			border: solid 1px #000000;
			color: #000000;
			background: #FFFFFF;
			border-right:none;
			&:last-child{
				border-right:solid 1px #000000;
			}
			&.sel{
				background: #000000;
				color: #FFFFFF;
			}
		}
	}
	.swiper{
		height:calc(100vh - 130upx);
	}
	.scroll-Y{
		height:calc(100vh - 230upx);
	}
}
</style>

