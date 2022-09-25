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
				</view>
				
				<!-- tab-page-4 运动页面 -->
				<view :class="[currentIndex==4?'item':'']" v-show="currentIndex==4">
					<GridListBar :modelDatas="motionGridItems"></GridListBar>
				</view>
				
				<!-- tab-page-5 景点页面 -->
				<view :class="[currentIndex==5?'item':'']" v-show="currentIndex==5">
					<GridListBar :modelDatas="spotGridItems"></GridListBar>
				</view>
				
				<!-- tab-page-6 酒店页面 -->
				<view :class="[currentIndex==6?'item':'']" v-show="currentIndex==6">
					<GridListBar :modelDatas="hotelGridItems"></GridListBar>
				</view>
				
				<!-- tab-page-7 人文页面 -->
				<view :class="[currentIndex==7?'item':'']" v-show="currentIndex==7">
					<GridListBar :modelDatas="humanGridItems"></GridListBar>
				</view>
			
			</scroll-view>
			
		</view>
	</view>
</template>

<script>	
	
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
				{title: "关注", id: "focusId"},
				{title: "推荐", id: "specialId"},
				{title: "热门", id: "hotId"},
				{title: "旅行", id: "tripId"},
				{title: "运动", id: "motionId"},
				{title: "景点", id: "spotId"},
				{title: "酒店", id: "hotelId"},
				{title: "人文", id: "humanId"}
			],
			
			// 关注列表数据
			focusItems: [
				{
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
				}
			],
			
			// 推荐列表数据
			specialItems: [
				{
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
				}
			],
			
			// 热门列表数据
			hotItems: [
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
				}
			],
			
			// 旅行宫格
			tripGridItems: [
				{
					id: "1",
					title: "周末游",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "2",
					title: "亲子游",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "3",
					title: "老年游",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "4",
					title: "自由行",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "5",
					title: "飞机",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "6",
					title: "火车",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "7",
					title: "游轮",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				}
				
			],
			
			// 运动宫格数据
			motionGridItems: [
				{
					id: "1",
					title: "网球",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "2",
					title: "羽毛球",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "3",
					title: "跑步",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "4",
					title: "健身",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				}
			],
			
			// 景点宫格数据
			spotGridItems: [
				{
					id: "1",
					title: "网红打卡",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "2",
					title: "景区",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "3",
					title: "博物馆",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "3",
					title: "步行街",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				}
			],
			
			// 酒店宫格数据列表
			hotelGridItems: [
				{
					id: "1",
					title: "便捷",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "2",
					title: "商务",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "3",
					title: "星级",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				}
			],
			
			// 人文宫格数据列表
			humanGridItems: [
				{
					id: "1",
					title: "星座",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "2",
					title: "艺术",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "3",
					title: "哲学",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				},
				{
					id: "4",
					title: "历史",
					icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				}
			]
			
			
		};
	},
	onLoad() {
		console.log("tabbar-1.vue onLoad")
		// cal scorll-view height
		let That = this;
		
		uni.getSystemInfo({
			success(res) {
				let winh = res.windowHeight; 
				console.log("tabbar-1.vue winh: " + winh)
				let pageEle = uni.createSelectorQuery().select(".tabs-wrap"); //想要获取高度的元素名（class/id）
				pageEle.boundingClientRect(data=>{
					That.tabPageHeight = winh - data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
				}).exec()
			}
		})
	},
	methods: {
		// 切换tabs
		navChooseTab(index) {
			this.currentIndex = index
			
			let itemObj = this.navItems[this.currentIndex];
			console.log("tabbar-1.vue navChooseTab item id: " + itemObj.id)
		}
		
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
