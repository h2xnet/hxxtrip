<template>
	<view class="content">
		<!-- custom-head -->
		<SearchHeadBar :itemData="headBarData"></SearchHeadBar>
		
		<!-- body -->
		<view>
			<view class="tabs">
				<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
					<block v-for="(item, index) in navItems" :key="index">
						<view class="scroll-tab-item" :class="{'active' : currentIndex==index}"
						@tap="navChooseTab(index)">
							{{item.title}}
							<view class="scroll-tab-line"></view>
						</view>
					</block>
				</scroll-view>
				
			</view>
			
			<scroll-view scroll-y="true" class="tabs-wrap" :style="{height: tabPageHeight + 'px'}">
				
				<!-- tab-page-0 关注页面 -->
				<view :class="[currentIndex==0?'item':'']" v-show="currentIndex==0">
					<BigImageList :modelDatas="focusItems"></BigImageList>
				</view>
			
				<!-- tab-page-1 推荐页面 -->
				<view :class="[currentIndex==1?'item':'']" v-show="currentIndex==1">
					<BigImageList :modelDatas="specialItems"></BigImageList>
				</view>
				
				<!-- tab-page-2 热门页面 -->
				<view :class="[currentIndex==2?'item':'']" v-show="currentIndex==2">
					<BigImageList :modelDatas="hotItems"></BigImageList>
				</view>
				
				<!-- tab-page-3 旅行页面 -->
				<view :class="[currentIndex==3?'item':'']" v-show="currentIndex==3">
					<!-- 宫格菜单栏 -->
					<GridListBar :modelDatas="tripGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-4 运动页面 -->
				<view :class="[currentIndex==4?'item':'']" v-show="currentIndex==4">
					<GridListBar :modelDatas="motionGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-5 景点页面 -->
				<view :class="[currentIndex==5?'item':'']" v-show="currentIndex==5">
					<GridListBar :modelDatas="spotGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-6 酒店页面 -->
				<view :class="[currentIndex==6?'item':'']" v-show="currentIndex==6">
					<GridListBar :modelDatas="hotelGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-7 人文页面 -->
				<view :class="[currentIndex==7?'item':'']" v-show="currentIndex==7">
					<GridListBar :modelDatas="humanGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
			
			</scroll-view>
			
		</view>
	</view>
</template>

<script>	

import request from '../../../utils/net/request.js'

	
export default {
	
	data() {
		return {
			headBarData: {
				height: '80px',
				title: '星游会'
			},
			
			// tab组件
			tabPageHeight: 400,
			currentIndex: 1,
			
			// tab导航数据
			navItems: [
				/*{title: "关注", id: "focusId"},
				{title: "推荐", id: "specialId"},
				{title: "热门", id: "hotId"},
				{title: "旅行", id: "tripId"},
				{title: "运动", id: "motionId"},
				{title: "景点", id: "spotId"},
				{title: "酒店", id: "hotelId"},
				{title: "人文", id: "humanId"}*/
			],
			
			// 关注列表数据
			focusItems: [
				/*{
					id: "1",
					title: "推荐001",
					extTitle: "没有上线",
					content: "推荐了一款香水",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png"
				},
				{
					id: "3",
					title: "推荐003",
					extTitle: "上善若水",
					content: "运动鞋",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png"
				}*/
			],
			
			// 推荐列表数据
			specialItems: [
				/*{
					id: "1",
					title: "推荐001",
					extTitle: "没有上线",
					content: "推荐了一款香水",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png"
				},
				{
					id: "2",
					title: "推荐002",
					extTitle: "一分钟前",
					content: "引入uni-icons插件 插件地址:点击此处跳转到uni-icons 引入以后,会发现uni-modules中新增如下目录和文件",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png"
				},
				{
					id: "3",
					title: "推荐003",
					extTitle: "上善若水",
					content: "运动鞋",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png"
				},
				{
					id: "4",
					title: "推荐004",
					extTitle: "星光",
					content: "拍摄美丽的日出和日落",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png"
				},
				{
					id: "5",
					title: "推荐005",
					extTitle: "毫哥",
					content: "拍摄日出和日落",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png"
				}*/
			],
			
			// 热门列表数据
			hotItems: [
				/*{
					id: "4",
					title: "推荐004",
					extTitle: "星光",
					content: "拍摄美丽的日出和日落",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png"
				},
				{
					id: "5",
					title: "推荐005",
					extTitle: "毫哥",
					content: "拍摄日出和日落",
					headImg: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					coverImg: "https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png"
				}*/
			],
			
			// 旅行宫格
			tripGridItems: [
				/*{
					id: "1",
					title: "周末游",
					icon: "/static/img/trip/trip1.png"
				},
				{
					id: "2",
					title: "亲子游",
					icon: "/static/img/trip/trip5.png"
				},
				{
					id: "3",
					title: "度假游",
					icon: "/static/img/trip/trip4.png"
				},
				{
					id: "4",
					title: "老年游",
					icon: "/static/img/trip/trip6.png"
				},
				{
					id: "5",
					title: "自由行",
					icon: "/static/img/trip/trip7.png"
				},
				{
					id: "6",
					title: "飞机",
					icon: "/static/img/trip/plane.png"
				},
				{
					id: "7",
					title: "火车",
					icon: "/static/img/trip/train.png"
				},
				{
					id: "8",
					title: "轮船",
					icon: "/static/img/trip/ship.png"
				}*/
				
			],
			
			// 运动宫格数据
			motionGridItems: [
				/*{
					id: "1",
					title: "网球",
					icon: "/static/img/motion/tennis.png"
				},
				{
					id: "2",
					title: "羽毛球",
					icon: "/static/img/motion/badminton.png"
				},
				{
					id: "3",
					title: "蓝球",
					icon: "/static/img/motion/blue_ball.png"
				},
				{
					id: "4",
					title: "桌球",
					icon: "/static/img/motion/table_tennis.png"
				},
				{
					id: "5",
					title: "跑步",
					icon: "/static/img/motion/run.png"
				},
				{
					id: "6",
					title: "瑜伽",
					icon: "/static/img/motion/yoga.png"
				},
				{
					id: "7",
					title: "健身",
					icon: "/static/img/motion/body_building.png"
				}*/
			],
			
			// 景点宫格数据
			spotGridItems: [
				/*{
					id: "1",
					title: "网红打卡",
					icon: "/static/img/spot/spot1.png"
				},
				{
					id: "2",
					title: "景区",
					icon: "/static/img/spot/spot3.png"
				},
				{
					id: "3",
					title: "博物馆",
					icon: "/static/img/spot/spot4.png"
				},
				{
					id: "4",
					title: "步行街",
					icon: "/static/img/spot/shopping2.png"
				}*/
			],
			
			// 酒店宫格数据列表
			hotelGridItems: [
				/*{
					id: "1",
					title: "便捷",
					icon: "/static/img/hotel/hotel1.png"
				},
				{
					id: "2",
					title: "商务",
					icon: "/static/img/hotel/hotel2.png"
				},
				{
					id: "3",
					title: "星级",
					icon: "/static/img/hotel/hotel3.png"
				},
				{
					id: "4",
					title: "民宿",
					icon: "/static/img/hotel/hotel4.png"
				}*/
			],
			
			// 人文宫格数据列表
			humanGridItems: [
				/*{
					id: "1",
					title: "星座",
					icon: "/static/img/human/constellation.png"
				},
				{
					id: "2",
					title: "艺术",
					icon: "/static/img/human/art.png"
				},
				{
					id: "3",
					title: "哲学",
					icon: "/static/img/human/philosophy.png"
				},
				{
					id: "4",
					title: "历史",
					icon: "/static/img/human/history3.png"
				}*/
			],
			
			// 商品列表
			goodList: [
				{
					id: "1",
					type: "image",
					coverImgs: [
						{
							img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						},
						{
							img: "https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png"
						},
						{
							img: "https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png"
						},
						{
							img: "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png"
						},
						{
							img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						}],
					title: "Apple iPhone X 256GB 深空灰色 移动联通电信4G手机",
					originalPrice: 9999,
					favourPrice: 8888,
					tip: "自营"
				},
				{
					id: "2",
					type: "image",
					coverImgs: [
						{
							img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						},
						{
							img: "https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png"
						},
						{
							img: "https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png"
						}],
					title: "Apple iPad 平板电脑 2018年新款9.7英寸",
					originalPrice: 3499,
					favourPrice: 3399,
					tip: "优惠"
				},
				{
					id: "3",
					type: "image",
					coverImgs: [
						{
							img: "https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png"
						},
						{
							img: "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png"
						},
						{
							img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						}],
					title: "Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）",
					originalPrice: 12999,
					favourPrice: 10688,
					tip: "秒杀"
				},
				{
					id: "4",
					type: "image",
					coverImgs: [
						{
							img: "https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png"
						},
						{
							img: "https://img-blog.csdnimg.cn/img_convert/213a362a143bd47b8b4e3dad5138d53d.png"
						}],
					title: "Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色",
					originalPrice: 999,
					favourPrice: 958,
					tip: "秒杀"
				},
				{
					id: "5",
					type: "image",
					coverImgs: [
						{
							img: "https://img-blog.csdnimg.cn/img_convert/ec13b1d884b422ad6ac1746504fa0454.png"
						}
					],
					title: "微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）",
					originalPrice: 8888,
					favourPrice: 8288,
					tip: "优惠"
				},
				{
					id: "6",
					type: "image",
					coverImgs: [
						{
							img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
						}
					],
					title: "Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）",
					originalPrice: 2899,
					favourPrice: 2799,
					tip: "自营"
				}
			]
			
			
		};
	},
	onLoad() {
		console.log("tabbar-1.vue onLoad")
		// cal scorll-view height
		let That = this;
		
		
		// 获取系统信息
		uni.getSystemInfo({
			success(res) {
				let winh = res.windowHeight; 
				console.log("tabbar-1.vue winh: " + winh)
				let pageEle = uni.createSelectorQuery().select(".tabs-wrap"); //想要获取高度的元素名（class/id）
				pageEle.boundingClientRect(data=>{
					That.tabPageHeight = winh - data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
				}).exec()
			}
		});
		
		//初始化数据
		That.initData();
		
		
		// 加载根类别列表
		/*request.categoryRootRequest({status: 1}, function(code, result){
			console.log("tabbar-1.vue categoryRootRequest code:" + code + ", result:" + JSON.stringify(result));
			if (code == 0) {
				if (result["errCode"] === 200) {
					let dataObj = result["data"];
					
					let affectedDocs = dataObj["affectedDocs"];
					let dataList = dataObj["data"];
					
					console.log("tabbar-1.vue categoryRootRequest 3 affectedDocs : " + affectedDocs);
					console.log("tabbar-1.vue categoryRootRequest 4 dataList : " + JSON.stringify(dataList));
					
					That.navItems = dataList;
					
					console.log("tabbar-1.vue navItems :" + JSON.stringify(navItems));
				}
			}
		});*/
		
	},
	
	mounted() {
		console.log("tabbar-1.vue mounted")
		
		let That = this;
		
	},
	
	methods: {
		// 初始化
		initData() {
			console.log("tabbar-1.vue initData");
			
			let That = this;
			
			// 请求所有类别数据
			request.getCategory({"status": 1}, function(code, res){
				console.log("tabbar-1.vue initData routerRequest category code:" + code + ", res:" + JSON.stringify(res));
				// 解析类别数据
				if (code == 0 && res["errCode"] == 200) {
					let dataObj = res["data"];
					let count = dataObj["count"];
					let dataList = dataObj["data"];
					if (count > 0) {
						let rootCategoryData = [];
						for(let idx = 0; idx < dataList.length; idx++) {
							let itemObj = dataList[idx];
							// 解析数据
							
							let itemName = itemObj["name"];
							
							let itemTwoObj = itemObj["data"];
							
							let itemRootObj = {};
							itemRootObj["_id"] = itemObj["_id"];
							itemRootObj["name"] = itemObj["name"];
							itemRootObj["title"] = itemObj["title"];
							itemRootObj["status"] = itemObj["status"];
							itemRootObj["sort"] = itemObj["sort"];
							
							rootCategoryData.push(itemRootObj);
							
							switch(itemName) {
								case "focusId": {
									// 关注
								}break;
								case "specialId":
								{ // 推荐
									
								}break;
								case "hotId": {
									// 热门
								}break;
								case "tripId": {
									// 旅行
									That.tripGridItems = itemTwoObj;
								}break;
								case "motionId": {
									// 运动
									That.motionGridItems = itemTwoObj;
								}break;
								case "spotId": {
									// 景点
									That.spotGridItems = itemTwoObj;
								}break;
								case "hotelId": {
									// 酒店
									That.hotelGridItems = itemTwoObj;
								}break;
								case "humanId": {
									// 人文
									That.humanGridItems = itemTwoObj
								}break;
							}
							
						}
						
						// 更新数据
						That.navItems = rootCategoryData;
						
					}
				}
			});
			
		},
		
		// 切换tabs
		navChooseTab(index) {
			this.currentIndex = index
			
			let itemObj = this.navItems[this.currentIndex];
			console.log("tabbar-1.vue navChooseTab item id: " + itemObj.id)
		},
		
	} // end methods
};
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 10upx;
	}
	
	.tabs {
		height: 35px;
	}
	
	.tabs .active {
		color: red;
	}
	
	.tabs-wrap {
		background: #ccc;
	}
	
	.scroll-tab {
		white-space: nowrap;
		border-bottom: 1rpx solid #eee;
		text-align: center;
	}
	
	.scroll-tab-item {
		display: inline-block;
		margin: 20rpx 30rpx 0 30rpx;
	}
	
	.active .scroll-tab-line {
		border-bottom: 10rpx solid red;
		color: red;
		border-radius: 20rpx;
		width: auto;
	}
	
</style>
