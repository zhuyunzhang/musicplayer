<template>
    <view class="index">
		<top :type='type'></top>
		
		<view class="banner">
			<swiper class="bannerContent" :autoplay="autoplay">
				<swiper-item v-for="(value,index) in bannerData" :key="index">
					<image :src="value.pic" class="swiperImg" @click="tab('../info/index',value)"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="bar">
				<view class="iconSpan" v-for="(val,index) in contentBar" :key="index">
					<image :src="val.src" class="iconBarImg"></image>
					<view class="listname">{{val.name}}</view>
				</view>
			</view>
			<view class="used">
				<view class="usedImg"  @click="goUrl('../radio/index',content[0])">
					<image :src="content[0].picUrl"></image>
					<image class="icon" v-if="imgSrc" :src="imgSrc+'icon/sanjiao.png'"></image>
					<view class="imgTitle">{{content[0].lastProgramName}}</view>
				</view>
				<view class="list">
					<view class="grayColor info" v-for="(val,index) in contentList" :key="index"  @click="goUrl('../radio/index',val)">
						<view class="name">{{val.name}}</view>
						<view class="disc">{{val.rcmdText}}</view>
						<image :src="val.picUrl" class="listImg" ></image>
					</view>
				</view>
			</view>
		</view>
		<albumblock :prodata="recommend" changeReturnParams="recom" @change="recChange"></albumblock>
		<albumblock :prodata="newest"></albumblock>
		<albumblock :prodata="sole" blockWidth='49.5%'></albumblock>
		<playbot v-if="isShow" :flagStart='flagStart' ref="playbot"  :musicPlay='musicPlay' @changeStart='changeStart' @changeStop='changeStop'></playbot>
		
	</view>
</template>

<script>
import top from '../../components/top'
import albumblock from '../../components/albumblock'
import playbot from '../../components/playbot.vue'
import {url} from '../../api/request.js'
import {listing} from '../../api/api.js'
let innerAudioContext = ''
export default {
	components:{
		albumblock,top,playbot
	},
	

    data() {
        return {
			type:"1",
			songBanner:[],
			autoplay:true,
			isShow:false,
			musicPlay:[],
			flagStart:false,
			imgSrc:'../../static/image/',
			bannerData:[],
			content:[],
			contentList:[],
			audioList:[],
			
			contentBar:[
				{name:"歌手",src:'../../static/image/icon/ren_l.png'},
				{name:"排行",src:'../../static/image/icon/paixingbang_l.png'},
				{name:"分类歌单",src:'../../static/image/icon/fenlei1_l.png'},
				{name:"电台",src:'../../static/image/icon/xinhaojieshouqi_l.png'},
				{name:"视频",src:'../../static/image/icon/shipin-tianchong_l.png'}
				],
			
			recommend:{
				title:"为你推荐",
				list:[
					{name:"你的独家品味推荐",src:"../static/image/sc5.jpg",count:"53133000",updateTime:"刚刚更新"},
					{name:"慢跑随身听",src:"../static/image/sc7.jpg",count:"210000",updateTime:"刚刚更新"},
					{name:"失恋解药",src:"../static/image/sc8.jpg",count:"4000",updateTime:"刚刚更新"},
					{name:"薛之谦创作歌曲集",src:"../static/image/sc9.jpg",count:"9200000",updateTime:"刚刚更新"},
					{name:"青春是一场未知的探险",src:"../static/image/sc10.jpg",count:"8909",updateTime:"刚刚更新"},
					{name:"欧美|渐入佳境的入耳暖心旋律",src:"../static/image/sc11.jpg",count:"120000",updateTime:"刚刚更新"}
				]
			},
			newest:{
				title:"最新专辑",
				list:[
					{name:"离开的接口",author:"刘瑞琪",src:"../static/image/sc12.jpg"},
					{name:"Cerll ls:The Albuild",author:"Made Will Made It",src:"../static/image/sc13.jpg"},
					{name:"SSS.GRIDMANIDSFEF",author:"OTX",src:"../static/image/sc14.jpg"},
					{name:"No place",author:"Backstreet",src:"../static/image/sc15.jpg"},
					{name:"别再闹了",author:"毛不易",src:"../static/image/sc16.jpg"},
					{name:"即刻电音",author:"即可电音",src:"../static/image/sc17.jpg"}
				]
			},
			sole:{
				title:"独家内容",
				list:[
					{name:"乐见大牌|靖佩瑶清唱《清风是》又勾起广大会议",count:"531330000",src:"../static/image/sc22.jpg"},
					{name:"精心专用！法兰的歌声让你情绪在温暖的夜色和平",count:"53130000",src:"../static/image/sc19.jpg"},
					{name:"你妹听过的\"成功学\"说唱：人生赢家的秘诀在于洗澡",count:"31330000",src:"../static/image/sc20.jpg"},
					{name:"为N对情侣现场恋爱BGM.Kris Wu甘当电灯泡",count:"1338000",src:"../static/image/sc21.jpg"},
				]
			},
        }
    },
	// watch: {
		  
	// 	  'childByValue': function(newVal){
	// 		   console.log(newVal)
	// 	  }
	//   },
	// onShow() {
	// 	 uni.$on('musicPlay',(info)=>{this.musicPlay=info})	
	// },
	
	onLoad(){  
	    // 监听事件  
	    uni.$on('musicData',(info)=>{  
			this.musicPlay=info
			this.isShow=true
	    })  
		uni.$on('flagStart',(info)=>{
			this.flagStart=info
		}) 
		uni.$on('innerAudioContext',(info)=>{
			innerAudioContext=info
			
		}) 
		
	}, 
	mounted() {
		this.fetch()
		this.getRadio()
	},
    methods: {
		
		//获取banner图片
		fetch(){
			listing(url+'banner?type=2')
			.then((res)=>{
				this.bannerData=res.banners
			
			})
			.catch((err)=>{
				console.log(err)
			})
		},
		getRadio(){
			listing(url+'dj/today/perfered')
			.then((res)=>{	
			
				this.content=res.data
				this.contentList.push(this.content[1])
				this.contentList.push(this.content[2])			
			})
			.catch((err)=>{
				console.log(err)
			})
		},
		goUrl(str,item){
			this.$navTo.togo(str,item.id)
			
		},
		changeStart(){
			if(innerAudioContext==''){
				console.log("====-=-=->>>>")
			}
			this.flagStart=true
			uni.setStorageSync('flagStart',this.flagStart)
			innerAudioContext.play()
		},
		changeStop(){
			console.log()
			if(innerAudioContext==''){
				console.log("====-=-=->>>>")
			}
			this.flagStart=false
			uni.setStorageSync('flagStart',this.flagStart)
			innerAudioContext.pause()	
		},
		//换一批
		recChange:function(val){
			if(val=="recom"){
				let arry = this.recommend.list.splice(0,2);
 				this.recommend.list=[...this.recommend.list,...arry]
			}
		},
		
		tab : function (str,param){
			if(param.song!==null){
				this.changeStop()
				let audioList=[]
				let option={
					name:param.song.name,
					author:param.song.ar[0].name,
					img:param.pic
				}
				listing(url+'song/url?id='+param.song.id)
				.then((res)=>{
					console.log(res)
					option["src"]=res.data[0].url
					audioList.push(option)
					
					this.$navTo.togo(str,audioList)
				})
				.catch((err)=>{
					console.log(err)
				})
				
			}
		},
    }
}
</script>
<style lang="scss">
	.index {
		width: 100vw;
		padding-bottom: 60upx;
		color:#333333;
		
		.bannerContent{
			width: 100%;
			height: 320upx;
			.swiperImg{
				width: 100%;
				height: 100%;
			}
		}
		
		.content{
			padding: 20upx;
			
			.bar{
				display: flex;
				padding: 36upx 0;
				margin-top: -28upx;
				position: relative;
				z-index: 1;
				background: #FFFFFF;
				box-shadow:4upx 4upx 10upx #CCCCCC;
				
				.iconSpan{
					flex: 1;
					text-align: center;
					.iconBarImg{
						width: 44upx;
						height: 44upx;
					}
					.listname{
						font-size: 32upx;
					}
				}
			}
			
			.used{
				display: flex;
				margin-top: 40upx;
				
				.usedImg{
					position: relative;
					width: 220upx;
					height: 220upx;
					margin-right: 20upx;
					box-shadow: 4upx 4upx 10upx #CCCCCC;
					image{
						height: 100%;
						width: 100%;
					}
					
					.icon{
						position: absolute;
						width: 50upx;
						height: 50upx;
						top: 50%;
						left: 50%;
						margin: -25upx auto auto -25upx;
						opacity: .8;
					}
					
					.imgTitle{
						position: absolute;
						display: block;
						width: 100%;
						bottom: 20upx;
						text-align: center;
						color: #F55500;
					}
				}
				
				.list{
					flex: 1;
					
					.info{
						position: relative;
						height: 100upx;
						box-sizing: border-box;
						padding: 12upx 20upx;
						
						&:first-child{
							margin-bottom: 20upx;
						}
						
						.name{
							font-size: 32upx;
						}
						
						.disc{
							font-size: 26upx;
							color: #6f6f6f;
						}
						
						.listImg{
							position: absolute;
							right: 0;
							top: 0;
							width: 100upx;
							height: 100upx;
						}
					}
				}
			}
		}
		
	}
</style>
