(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0333":function(t,n,e){"use strict";e.r(n);var a=e("f64e"),c=e("21ca");for(var o in c)"default"!==o&&function(t){e.d(n,t,(function(){return c[t]}))}(o);e("e39f");var i,r=e("f0c5"),s=Object(r["a"])(c["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=s.exports},"18db":function(t,n,e){},"21ca":function(t,n,e){"use strict";e.r(n);var a=e("5407"),c=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=c.a},5407:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("36fc"),c=e("2818");function o(t){return u(t)||s(t)||r(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(t,n){if(t){if("string"===typeof t)return l(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?l(t,n):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function u(t){if(Array.isArray(t))return l(t)}function l(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,a=new Array(n);e<n;e++)a[e]=t[e];return a}var f=function(){e.e("components/top").then(function(){return resolve(e("de11"))}.bind(null,e)).catch(e.oe)},g=function(){e.e("components/albumblock").then(function(){return resolve(e("97da"))}.bind(null,e)).catch(e.oe)},m=function(){e.e("components/playbot").then(function(){return resolve(e("e285"))}.bind(null,e)).catch(e.oe)},d="",p={components:{albumblock:g,top:f,playbot:m},data:function(){return{type:"1",songBanner:[],autoplay:!0,isShow:!1,musicPlay:[],flagStart:!1,imgSrc:"../../static/image/",bannerData:[],content:[],contentList:[],audioList:[],contentBar:[{name:"歌手",src:"../../static/image/icon/ren_l.png"},{name:"排行",src:"../../static/image/icon/paixingbang_l.png"},{name:"分类歌单",src:"../../static/image/icon/fenlei1_l.png"},{name:"电台",src:"../../static/image/icon/xinhaojieshouqi_l.png"},{name:"视频",src:"../../static/image/icon/shipin-tianchong_l.png"}],recommend:{title:"为你推荐",list:[{name:"你的独家品味推荐",src:"../static/image/sc5.jpg",count:"53133000",updateTime:"刚刚更新"},{name:"慢跑随身听",src:"../static/image/sc7.jpg",count:"210000",updateTime:"刚刚更新"},{name:"失恋解药",src:"../static/image/sc8.jpg",count:"4000",updateTime:"刚刚更新"},{name:"薛之谦创作歌曲集",src:"../static/image/sc9.jpg",count:"9200000",updateTime:"刚刚更新"},{name:"青春是一场未知的探险",src:"../static/image/sc10.jpg",count:"8909",updateTime:"刚刚更新"},{name:"欧美|渐入佳境的入耳暖心旋律",src:"../static/image/sc11.jpg",count:"120000",updateTime:"刚刚更新"}]},newest:{title:"最新专辑",list:[{name:"离开的接口",author:"刘瑞琪",src:"../static/image/sc12.jpg"},{name:"Cerll ls:The Albuild",author:"Made Will Made It",src:"../static/image/sc13.jpg"},{name:"SSS.GRIDMANIDSFEF",author:"OTX",src:"../static/image/sc14.jpg"},{name:"No place",author:"Backstreet",src:"../static/image/sc15.jpg"},{name:"别再闹了",author:"毛不易",src:"../static/image/sc16.jpg"},{name:"即刻电音",author:"即可电音",src:"../static/image/sc17.jpg"}]},sole:{title:"独家内容",list:[{name:"乐见大牌|靖佩瑶清唱《清风是》又勾起广大会议",count:"531330000",src:"../static/image/sc22.jpg"},{name:"精心专用！法兰的歌声让你情绪在温暖的夜色和平",count:"53130000",src:"../static/image/sc19.jpg"},{name:'你妹听过的"成功学"说唱：人生赢家的秘诀在于洗澡',count:"31330000",src:"../static/image/sc20.jpg"},{name:"为N对情侣现场恋爱BGM.Kris Wu甘当电灯泡",count:"1338000",src:"../static/image/sc21.jpg"}]}}},onLoad:function(){var n=this;t.$on("musicData",(function(t){n.musicPlay=t,n.isShow=!0})),t.$on("flagStart",(function(t){n.flagStart=t})),t.$on("innerAudioContext",(function(t){d=t}))},mounted:function(){this.fetch(),this.getRadio()},methods:{fetch:function(){var t=this;(0,c.listing)(a.url+"banner?type=2").then((function(n){t.bannerData=n.banners})).catch((function(t){console.log(t)}))},getRadio:function(){var t=this;(0,c.listing)(a.url+"dj/today/perfered").then((function(n){t.content=n.data,t.contentList.push(t.content[1]),t.contentList.push(t.content[2])})).catch((function(t){console.log(t)}))},goUrl:function(t,n){this.$navTo.togo(t,n.id)},changeStart:function(){""==d&&console.log("====-=-=->>>>"),this.flagStart=!0,t.setStorageSync("flagStart",this.flagStart),d.play()},changeStop:function(){console.log(),""==d&&console.log("====-=-=->>>>"),this.flagStart=!1,t.setStorageSync("flagStart",this.flagStart),d.pause()},recChange:function(t){if("recom"==t){var n=this.recommend.list.splice(0,2);this.recommend.list=[].concat(o(this.recommend.list),o(n))}},tab:function(t,n){var e=this;if(null!==n.song){this.changeStop();var o=[],i={name:n.song.name,author:n.song.ar[0].name,img:n.pic};(0,c.listing)(a.url+"song/url?id="+n.song.id).then((function(n){console.log(n),i["src"]=n.data[0].url,o.push(i),e.$navTo.togo(t,o)})).catch((function(t){console.log(t)}))}}}};n.default=p}).call(this,e("543d")["default"])},e39f:function(t,n,e){"use strict";var a=e("18db"),c=e.n(a);c.a},ee84:function(t,n,e){"use strict";(function(t){e("c6b6");a(e("66fd"));var n=a(e("0333"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f64e:function(t,n,e){"use strict";var a,c=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}))}},[["ee84","common/runtime","common/vendor"]]]);