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
				<view :class="[currentName=='focusId'?'item':'']" v-show="currentName=='focusId'">
					<BigImageList :modelDatas="focusItems"></BigImageList>
				</view>
			
				<!-- tab-page-1 推荐页面 -->
				<view :class="[currentName=='specialId'?'item':'']" v-show="currentName=='specialId'">
					<BigImageList :modelDatas="specialItems"></BigImageList>
				</view>
				
				<!-- tab-page-2 热门页面 -->
				<view :class="[currentName=='hotId'?'item':'']" v-show="currentName=='hotId'">
					<BigImageList :modelDatas="hotItems"></BigImageList>
				</view>
				
				<!-- tab-page-3 旅行页面 -->
				<view :class="[currentName=='tripId'?'item':'']" v-show="currentName=='tripId'">
					<!-- 宫格菜单栏 -->
					<GridListBar :modelDatas="tripGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-4 运动页面 -->
				<view :class="[currentName=='motionId'?'item':'']" v-show="currentName=='motionId'">
					<GridListBar :modelDatas="motionGridItems" v-on:gridListItemTap="onMotionItemTap"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-5 景点页面 -->
				<view :class="[currentName=='spotId'?'item':'']" v-show="currentName=='spotId'">
					<GridListBar :modelDatas="spotGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-6 酒店页面 -->
				<view :class="[currentName=='hotelId'?'item':'']" v-show="currentName=='hotelId'">
					<GridListBar :modelDatas="hotelGridItems"></GridListBar>
					<!-- 商品列表 -->
					<DoubleImageList :modelDatas="goodList"></DoubleImageList>
				</view>
				
				<!-- tab-page-7 人文页面 -->
				<view :class="[currentName=='humanId'?'item':'']" v-show="currentName=='humanId'">
					<!-- 二级类别列表 -->
					<GridListBar :modelDatas="humanGridItems" v-on:gridListItemTap="onHumanItemTap"></GridListBar>
					<!-- 三级话题列表 -->
					<TopicListBar :modelDatas="humanTopicItems" v-on:topicListItemTap="onHumanTopicItemTap"></TopicListBar>
					<!-- 商品列表 -->
					<!--<DoubleImageList :modelDatas="goodList"></DoubleImageList>-->
				</view>
			
			</scroll-view>
			
		</view>
	</view>
</template>

<script>	

// 网络请求
import request from '../../../utils/net/request.js'

// 事件处理类
import astrolHandler from '../../../utils/handler/human/astrol_handler.js'
	
export default {
	
	data() {
		return {
			headBarData: {
				height: '80px',
				title: '星游会'
			},
			
			// tab组件
			tabPageHeight: 400,
			currentIndex: 0,
			currentName: 'specialId',
			
			// tab导航数据
			navItems: [
				/*{title: "关注", name: "focusId"},
				{title: "推荐", name: "specialId"},
				{title: "热门", name: "hotId"},
				{title: "旅行", name: "tripId"},
				{title: "运动", name: "motionId"},
				{title: "景点", name: "spotId"},
				{title: "酒店", name: "hotelId"},
				{title: "人文", name: "humanId"}*/
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
			],
			
			// 运动宫格数据
			motionGridItems: [
			],
			// 运动话题数据
			motionTopicItems: [
				
			],
			// 当前选中运动话题名称
			motionTopicName: "",
			
			// 景点宫格数据
			spotGridItems: [
			],
			
			// 酒店宫格数据列表
			hotelGridItems: [
			],
			
			// 人文宫格数据列表
			humanGridItems: [
			],
			// 人文话题列表
			humanTopicItems: [
			],
			// 当前选中人文话题名称
			humanTopicName: "",
			
			// 商品列表
			goodList: [
				/*{
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
				}*/
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
						// 更新一级类别
						That.navItems = dataList;
						
						// 更新二级类别
						for(let idx = 0; idx < dataList.length; idx++) {
							let itemObj = dataList[idx];
							//console.log("---------- tabbar-1.vue onChooseTwoCategory idx:" + idx + ", itemObj:" + JSON.stringify(itemObj));
							
							let itemName = itemObj["name"];
							let itemTwoObj = itemObj["data"];
							
							if (itemName === "focusId") {
								// 关注
							}
							else if (itemName === "specialId") {
								// 推荐
							}
							else if (itemName === "hotId") {
								// 热门
							}
							else if (itemName === "tripId") {
								// 旅行
								That.tripGridItems = itemTwoObj;
							}
							else if (itemName === "motionId") {
								// 运动
								That.motionGridItems = itemTwoObj;
							}
							else if (itemName === "spotId") {
								// 景点
								That.spotGridItems = itemTwoObj;
							}
							else if (itemName === "hotelId") {
								// 酒店
								That.hotelGridItems = itemTwoObj;
							}
							else if (itemName === "humanId") {
								// 人文
								That.humanGridItems = itemTwoObj
							}
							
							
						}
						
					}
				}
				
				// 选择第0个
				That.navChooseTab(0);
				
				
			});
			
		},
		
		// 一级tabs菜单事件
		navChooseTab(index) {
			console.log("tabbar-1.vue navChooseTab params, index:" + index);
			
			let That = this;
			
			if (index >= 0 && index < That.navItems.length) {
				
				let itemObj = That.navItems[index];
				
				let itemName = itemObj["name"];
				console.log("tabbar-1.vue navChooseTab item name: " + itemName);
				
				That.currentName = itemName;
				That.currentIndex = index
				
			}
			
		},
		
		//
		// onMotionItemTap : 运动二级菜单事件
		//
		onMotionItemTap(index) {
			console.log("tabbar-1.vue onMotionItemTap params, index:" + index);
			
			let That = this;
			
			if (index >= 0 && index < That.motionGridItems.length) {
				let itemObj = That.motionGridItems[index];
				
				let itemName = itemObj["name"];
				console.log("tabbar-1.vue onMotionItemTap itemName: " + itemName);
				
				// 更新话题列表
				That.getTopicCategory("motionId", itemName);
				
			}
			
		},
		
		//
		// onHumanItemTap : 人文二级菜单事件
		//
		onHumanItemTap(index) {
			console.log("tabbar-1.vue onHumanItemTap params, index:" + index);
			
			let That = this;
			
			if (index >= 0 && index < That.humanGridItems.length) {
				let itemObj = That.humanGridItems[index];
				
				let itemName = itemObj["name"];
				console.log("tabbar-1.vue onHumanItemTap itemName: " + itemName);
				
				// 更新话题列表
				That.getTopicCategory("humanId", itemName);
				
			}
			
		},
		
		//
		// onHumanTopicItemTap : 人文话题单击事件
		//
		onHumanTopicItemTap(index) {
			console.log("tabbar-1.vue onHumanTopicItemTap params, index:" + index);
			
			let That = this;
			
			if (index >= 0 && index < That.humanTopicItems.length) {
				let itemObj = That.humanTopicItems[index];
				
				let itemName = itemObj["name"];
				console.log("tabbar-1.vue onHumanTopicItemTap itemName:" + itemName);
			}
			
		},
		
		//
		// getTopicCategory : 获取话题类别
		//
		getTopicCategory(parentName, name) {
			console.log("tabbar-1.vue getTopicCategory params, parentName:" + parentName + ", name:" + name);
			
			let That = this;
			
			switch(parentName) {
			case "motionId": {
				// 运动
				
			}break;
			
			case "humanId": {
				// 人文
				if (name == "humanId_001") {
					// 星座
					// 获取星座话题类别
					astrolHandler.getAstrolTopicCategory(That, request);
				}
				else {
					// 清空话题列表
					That.onClearAllTopicategory();
				}
			}break;
			
			default: {
				
			}break;
			
			}
		},
		
		//
		// onClearAllTopicategory : 清空话题列表
		//
		onClearAllTopicategory() {
			console.log("tabbar-1.vue onClearAllTopicategory");
			
			let That = this;
			
			That.humanTopicItems = [];
			
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
