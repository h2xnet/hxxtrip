<template>
	<view class="container">
		<view class="cover-wrap">
			<block v-if="curCoverUrlName == 'coverUrl1'">
				<view v-if="articleInfo.coverUrl1 == ''" class="cover-image-wrap justify-content-center text-align-center margin-top-min" style="width: 90%;">
					<view class="cover-wrap box-shadown" style="width: 100%; height: 100%; border-radius: 8upx;">
						<uni-icons type="plusempty" size="36" color="#ccc"></uni-icons>
					</view>
				</view>
				<view v-else class="cover-image-wrap">
					<block v-if="curCoverUrlName == 'coverUrl1'">
						<image src="https://mp-1b269a9a-d85c-47bc-9a6b-93394729eabf.cdn.bspapp.com/cloudstorage/3b317b44-8f49-4513-ab9a-e10d291533aa.png" mode="aspectFill" style="height: 196upx;"></image>
					</block>
					<block v-else>
						<image src="https://mp-1b269a9a-d85c-47bc-9a6b-93394729eabf.cdn.bspapp.com/cloudstorage/3b317b44-8f49-4513-ab9a-e10d291533aa.png" mode="aspectFill" style="width: 196upx; height: 196upx;"></image>
					</block>
				</view>
			</block>
			<block v-else>
				<view v-if="articleInfo.coverUrl1 == ''" class="cover-image-wrap justify-content-center text-align-center margin-top-min" style="width: 90%;">
					<view class="cover-wrap box-shadown" style="width: 100%; height: 100%; border-radius: 8upx;">
						<uni-icons type="plusempty" size="36" color="#ccc"></uni-icons>
					</view>
				</view>
				<view v-else class="cover-image-wrap">
					<block v-if="curCoverUrlName == 'coverUrl1'">
						<image src="https://mp-1b269a9a-d85c-47bc-9a6b-93394729eabf.cdn.bspapp.com/cloudstorage/3b317b44-8f49-4513-ab9a-e10d291533aa.png" mode="aspectFill" style="height: 196upx;"></image>
					</block>
					<block v-else>
						<image src="https://mp-1b269a9a-d85c-47bc-9a6b-93394729eabf.cdn.bspapp.com/cloudstorage/3b317b44-8f49-4513-ab9a-e10d291533aa.png" mode="aspectFill" style="width: 196upx; height: 196upx;"></image>
					</block>
				</view>
			</block>
			
			<view class="line-box justify-content-center margin-top-min">
				<view class="line-box-item" @click="onSwitchCover('coverUrl1');">
					<image src="" mode="aspectFill" style="width: 226upx; height: 96upx;"></image>
				</view>
				<view class="line-box-item margin-left-mid" @click="onSwitchCover('coverUrl2');">
					<image src="" mode="aspectFill" style="width: 96upx; height: 96upx;"></image>
				</view>
			</view>
		</view>
		
		<view class="fixed-bottom" style="height: 100upx;">
			<view class="line-box justify-content-space-around margin-top-min">
				<view class="line-box-item font-size-mid">
					<uni-icons type="cloud-upload" size="24"></uni-icons>
					<text>存草稿</text>
				</view>
				<view class="line-box-item font-size-mid">
					<uni-icons type="notification" size="24"></uni-icons>
					<text>定时发表</text>
				</view>
				<view class="line-box-item">
					<button type="default" size="mini">预览</button>
				</view>
				<view class="line-box-item">
					<button type="primary" size="mini">发表</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import request from '../../../utils/net/request.js'
	
	export default {
		data() {
			return {
				curCoverUrlName: "coverUrl1",
				// 文章信息
				articleInfo: {
					"title": "",
					"html": "",
					"coverUrl1": "", //封面1
					"coverUrl2": "", //封面2
					"precis": "", //摘要
					"originalState": 1, // 原创开启标志
					"originalAuthor": "" ,// 原创作者
					"topicSets": [] // 话题合集
				},
			}
		},
		
		onLoad(e) {
			console.log("tabbar-3-detial-article-publish.vue onLoad params:" + JSON.stringify(e));
			let That = this;
			
			let cacheArticleInfo = That.$storage.getArticleData();
			console.log("tabbar-3-detial-article-publish.vue onLoad cacheArticleInfo: " + JSON.stringify(cacheArticleInfo));
			
			if (cacheArticleInfo) {
				That.articleInfo = cacheArticleInfo;
			}
		},
		
		methods: {
			
			//
			// onSwitchCover : 切换封面
			//
			onSwitchCover(name) {
				console.log("tabbar-3-detial-article-publish.vue onSwitchCover params, name:" + name);
				
				let That = this;
				
				That.curCoverUrlName = name;
			}
			
		}
	}
</script>

<style>
	
.container {
	margin: 0;
	width: 100%;
}	

.cover-wrap {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.cover-image-wrap {
	margin-left: 30upx;
	margin-right: 30upx;
	width: auto;
	height: 200upx;
}

// 底部显示栏
.fixed-bottom {
	width: 100%;
	bottom: 0upx;
	position: fixed;
	padding-left: 0upx;
	padding-right: 0upx;
	padding-bottom: 30upx;
	background-color: #ffffff;
	transform: translateZ(0);
	bottom: env(safe-area-inset-bottom);
	box-shadow: 0upx -5upx 14upx #e3e6e6;
	bottom: contant(safe-area-inset-bottom);
}

.line-box {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 80upx;
}

.line-box-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 8upx;
}

.justify-content-center {
	justify-content: center;
}

.justify-content-space-around {
	justify-content: space-around;
}

.font-size-max {
	font-size: 32upx;
}

.font-size-mid {
	font-size: 30upx;
}

.font-size-min {
	font-size: 26upx;
}

.margin-top-min {
	margin-top: 10upx;
}

.margin-top-mid {
	margin-top: 15upx;
}

.margin-top-max {
	margin-top: 20upx;
}

.text-align-center {
	text-align: center;
}

.border-line {
	border: 1upx solid #e3e6e6;
}

.box-shadown {
	box-shadow: 0upx -5upx 14upx #e3e6e6;
}

</style>
