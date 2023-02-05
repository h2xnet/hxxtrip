<template>
	<view class="container">
		<view class="page-wrap margin-top-max">
			<!-- 封面 -->
			<block v-if="curCoverUrlName == 'coverUrl1'">
				<view v-if="articleInfo.coverUrl1 == ''" class="page-image-wrap justify-content-center text-align-center" style="width: 90%;">
					<view class="page-wrap" @click="onChoseCoverImage();" style="width: 100%; height: 100%; border-radius: 8upx; background-color: #e3e6e6;">
						<uni-icons type="plusempty" size="36" color="#ccc"></uni-icons>
					</view>
				</view>
				<view v-else class="page-image-wrap">
					<image :src="articleInfo.coverUrl1" mode="aspectFill" style="height: 196upx;"></image>
				</view>
			</block>
			<block v-else>
				<view v-if="articleInfo.coverUrl2 == ''" class="page-image-wrap justify-content-center text-align-center" style="width: 90%;">
					<view class="page-wrap" @click="onChoseCoverImage();" style="width: 100%; height: 100%; border-radius: 8upx; background-color: #e3e6e6;">
						<uni-icons type="plusempty" size="36" color="#ccc"></uni-icons>
					</view>
				</view>
				<view v-else class="page-image-wrap">
					<image :src="articleInfo.coverUrl2" mode="aspectFill" style="width: 196upx; height: 196upx;"></image>
				</view>
			</block>
			
			<!--<view class="line-box justify-content-center margin-top-min">
				<view class="line-box-item" @click="onSwitchCover('coverUrl1');">
					<image :src="articleInfo.coverUrl1" mode="aspectFill" style="width: 226upx; height: 96upx;"></image>
				</view>
				<view class="line-box-item margin-left-mid" @click="onSwitchCover('coverUrl2');">
					<image :src="articleInfo.coverUrl2" mode="aspectFill" style="width: 96upx; height: 96upx;"></image>
				</view>
			</view>-->
			
			<!-- 标题 -->
			<view class="line-box margin-top-max justify-content-flex-start">
				<view class="line-box-item font-size-max">
					<text class="margin-left-max font-weight-bold">{{articleInfo.title}}</text>
				</view>
			</view>
			
			<!-- 摘要 -->
			<view class="line-box margin-top-max justify-content-flex-start font-size-mid" style="height: 220upx;">
				<textarea class="margin-left-max margin-right-max font-size-mid" 
					maxlength="200" placeholder="输入摘要, 选填" :value="articleInfo.precis" @input="onInputPrecis"
					 style="height: 200upx;">
				</textarea>
			</view>
			
			<!-- 原创 -->
			<view class="card-wrap margin-top-max">
				<view class="line-box justify-content-space-between border-radius-mid" style="width: auto;">
					<view>
						<text class="font-size-mid">原创</text>
					</view>
					
					<view>
						<block v-if="articleInfo.originalState > 0">
							<switch checked="true" @change="onOriginalStateChange" style="transform:scale(0.8); margin-right: -25upx;"></switch>
						</block>
						<block v-else>
							<switch @change="onOriginalStateChange" style="transform:scale(0.8); margin-right: -25upx;"></switch>
						</block>
					</view>
				</view>
				<view class="line-box justify-content-space-between border-radius-mid" style="width: auto;">
					<view>
						<text class="font-size-mid">作者</text>
					</view>
					<view>	
						<input class="font-size-mid" type="text" :value="articleInfo.originalAuthor" placeholder="输入作者名" 
							@input="onOriginalAuthor" style="text-align: right;"/>
					</view>
				</view>
			</view>
			
			<!-- 合集 -->
			<view class="card-wrap margin-top-max">
				<view class="line-box justify-content-space-between border-radius-mid" @click="onTopicSetsClick"
					style="width: auto;">
					<view class="font-size-mid">
						合集<text class="color-gray">{{articleInfo.topicSets.length}}/5</text>
					</view>
					<view>
						<uni-icons type="right" color="gray" size="16"></uni-icons>
					</view>
				</view>
				<view class="line-box justify-content-flex-start border-radius-mid" style="width: auto;">
					<block v-for="(item,index) in articleInfo.topicSets">
						<uni-tag type="success" :inverted="true" :text="'#' + item" size="mini"></uni-tag>
						<view class="margin-left-min"></view>
					</block>
				</view>
			</view>
			
			<!-- 合集弹出层 -->
			<view>
				<uni-popup ref="topicSetDialog" type="bottom">
					<view class="container" style="width: 100%; height: 880upx; background-color: #fff;">
						<view class="page-wrap">
							<view class="line-box justify-content-space-between">
								<view class="line-box-item font-size-mid color-gray margin-left-max">
									<button type="default" size="mini" @click="onTopicSetsCloseClick('cancel');">取消</button>
								</view>
								<view class="line-box-item font-size-mid color-gray">合集</view>
								<view class="line-box-item margin-right-max">
									<button type="primary" size="mini" @click="onTopicSetsCloseClick('ok');">完成</button>
								</view>
							</view>
							
							<view class="line-box justify-content-flex-start font-size-mid">
								<view class="line-box-item font-size-mid color-gray margin-left-max">当前合集</view>
							</view>
							<view class="line-box-height-auto justify-content-flex-start font-size-mid" >
								<view class="margin-left-max margin-top-max">
									<block v-for="(item, index) in articleInfo.topicSets">
										<view class="line-box-item margin-left-mid" :key="index" @click="onTopicSetsRemove(index);" style="height: 80upx;">
											<uni-tag type="success" :inverted="true" :text="'#' + item"></uni-tag>
										</view>
									</block>
								</view>
								<view class="line-box justify-content-flex-start font-size-mid margin-top-max">
									<view class="line-box-item background-color margin-left-max margin-right-max" style="width: 100%; align-items: flex-start;">
										<input type="text" :value="inputTopicSets" placeholder="选择或输入合集" @input="onInputTopicSets" @blur="onBlurTopicSets" style="padding-left: 20upx;" />
									</view>
								</view>
							</view>
							
							<view class="line-box justify-content-flex-start font-size-mid">
								<view class="line-box-item font-size-mid color-gray margin-left-max">最近合集</view>
							</view>
							<view class="line-box-height-auto justify-content-flex-start font-size-mid">
								<view class="margin-left-max margin-top-max">
									<block v-for="(item,index) in topicSetsList">
										<view class="line-box-item margin-left-mid" :key="index" @click="onTopicAdd(index);" style="height: 80upx;">
											<uni-tag type="default" :text="'#' + item"></uni-tag>
										</view>
									</block>
								</view>
							</view>
							
						</view>
					</view>
				</uni-popup>
			</view>
			
		</view>
		
		<view class="fixed-bottom" style="height: 100upx;">
			<view class="line-box justify-content-space-around margin-top-min">
				<view class="line-box-item font-size-mid" @click="onPublishClick('saveDraft');">
					<uni-icons type="cloud-upload" size="24"></uni-icons>
					<text>存草稿</text>
				</view>
				<view class="line-box-item font-size-mid" @click="onPublishClick('timeSend');">
					<uni-icons type="notification" size="24"></uni-icons>
					<text>定时发表</text>
				</view>
				<view class="line-box-item" @click="onPublishClick('preview');">
					<button type="default" size="mini">预览</button>
				</view>
				<view class="line-box-item" @click="onPublishClick('send');">
					<button type="primary" size="mini">发表</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import request from '../../../utils/net/request.js'
	import StringTool from '../../../utils/tool/string_tool.js'
	
	export default {
		data() {
			return {
				curCoverUrlName: "coverUrl1",
				// 文章信息
				articleInfo: {
					"_id": "",
					"title": "",
					"html": "",
					"coverUrl1": "", //封面1
					"coverUrl2": "", //封面2，暂时不用
					"precis": "", //摘要
					"originalState": 0, // 原创开启标志
					"originalAuthor": "" ,// 原创作者
					"topicSets": [] // 话题合集
				},
				isCropper: 0, // 截剪标志
				topicSetsList: [], // 备选话题列表
				inputTopicSets: '' // 输入的合集
			}
		},
		
		onLoad(e) {
			console.log("tabbar-3-detial-article-publish.vue onLoad params:" + JSON.stringify(e));
			let That = this;
			
			let cacheArticleInfo = That.$storage.getArticleData();
			console.log("tabbar-3-detial-article-publish.vue onLoad cacheArticleInfo: " + JSON.stringify(cacheArticleInfo));
			
			if (cacheArticleInfo) {
				
				cacheArticleInfo["originalState"] = 0;
				//cacheArticleInfo["precis"] = "dkdwe33";
				//cacheArticleInfo["topicSets"] = ["11","22","33"];
				
				That.articleInfo = cacheArticleInfo;
			}
			
			// 备选话题列表
			That.topicSetsList.push("星座运势");
			That.topicSetsList.push("2023");
			That.topicSetsList.push("周运");
			That.topicSetsList.push("星座运程");
			That.topicSetsList.push("苏珊米勒");
			That.topicSetsList.push("玛法达");
			That.topicSetsList.push("娜迪亚");
			
		},
		
		onShow() {
			console.log("tabbar-3-detial-article-publish.vue onShow.");
			
			let That = this;
			
			if (That.isCropper > 0) {
				That.isCropper = 0;
				
				let cacheCropperImageData = That.$storage.getCropperImageData();
				console.log("tabbar-3-detial-article-publish.vue onShow cacheCropperImageData: " + JSON.stringify(cacheCropperImageData));
				
				if (cacheCropperImageData) {
					let imgUrl = cacheCropperImageData["path"];
					console.log("tabbar-3-detial-article-publish.vue onShow imgUrl: " + imgUrl);
					
					if (imgUrl != "") {
						if (That.curCoverUrlName == "coverUrl1") {
							That.articleInfo.coverUrl1 = imgUrl;
						}
					}
					
					// 清空缓存
					That.$storage.removeCropperImageData();
				}
				
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
			},
			
			//
			// onChoseCoverImage : 选择封面图片
			//
			onChoseCoverImage() {
				console.log("tabbar-3-detial-article-publish.vue onChoseCoverImage.");
				
				let That = this;
				
				request.uniChoseImage(1, function(code, res){
					console.log("tabbar-3-detial-article-publish.vue onChoseCoverImage uniChoseImage code:" + code + ", res:" + JSON.stringify(res));
					
					if (code != 0) {
						request.uniShowToast("图片加载失败", null, 3000);
						return;
					}
					
					let tempFilePaths = res["tempFilePaths"];
					let imgPath = tempFilePaths[0];
					
					// 截剪
					That.isCropper = 1;
					
					let height = 196;
					let width = 196;
					if (That.curCoverUrlName == "coverUrl1") {
						width = 460;
					}
					
					let url = "/pages/tabbar-3-detial/tabbar-3-detial-image-cropper/tabbar-3-detial-image-cropper";
					url += "?width=" + width;
					url += "&height=" + height;
					url += "&path=" + imgPath;
					request.uniGotoPage(url, {}, function(code, res, param) {
						console.log("tabbar-3-detial-article-publish.vue onChoseCoverImage uniGotoPage code:" + code + ", res:" + JSON.stringify(res));
						
					});
					
				});
			},
			
			//
			// onInputPrecis : 输入摘要
			//
			onInputPrecis(e) {
				console.log("tabbar-3-detial-article-publish.vue onInputPrecis params, " + JSON.stringify(e));
				
				let That = this;
				
				That.articleInfo.precis = e.detail.value;
				
			},
			
			//
			// onOriginalStateChange : 原创标志事件
			//
			onOriginalStateChange(e) {
				console.log("tabbar-3-detial-article-publish.vue onOriginalStateChange params, " + JSON.stringify(e));
				
				let That = this;
				
				let state = 0;
				if (e.detail.value) {
					state = 1;
				}
				
				That.articleInfo.originalState = state;
			},
			
			//
			// onOriginalAuthor : 原创作者
			//
			onOriginalAuthor(e) {
				console.log("tabbar-3-detial-article-publish.vue onOriginalAuthor params, " + JSON.stringify(e));
				
				let That = this;
				
				That.articleInfo.originalAuthor = e.detail.value;
			},
			
			//
			// onTopicSetsClick : 合集事件
			//
			onTopicSetsClick() {
				console.log("tabbar-3-detial-article-publish.vue onTopicSetsClick");
				
				let That = this;
				
				That.$refs.topicSetDialog.open("bottom");
			},
			
			//
			// onTopicAdd : 添加合集
			//
			onTopicAdd(index) {
				console.log("tabbar-3-detial-article-publish.vue onTopicAdd parmas, index:" + index);
				
				let That = this;
				
				if (That.articleInfo.topicSets.length >= 5) {
					return;
				}
				
				let val = That.topicSetsList[index];
				
				for(let idx = 0; idx < That.articleInfo.topicSets.length; idx++) {
					if (That.articleInfo.topicSets[idx] == val) {
						return 0;
					}
				}
				
				That.articleInfo.topicSets.push(val);
			},
			
			//
			// onTopicSetsRemove : 移除合集
			//
			onTopicSetsRemove(index) {
				console.log("tabbar-3-detial-article-publish.vue onTopicSetsRemove params, index: " + index);
				
				let That = this;
				
				if (index >= 0 && index < That.articleInfo.topicSets.length) {
					That.articleInfo.topicSets.splice(index, 1);
					
					console.log("tabbar-3-detial-article-publish.vue onTopicSetsRemove new topicSets: " + JSON.stringify(That.articleInfo.topicSets));
				}
			},
			
			//
			// onInputTopicSets : 输入合集
			//
			onInputTopicSets(e) {
				console.log("tabbar-3-detial-article-publish.vue onInputTopicSets params, " + JSON.stringify(e));
				
				let That = this;
				
				That.inputTopicSets = e.detail.value;
			},
			
			//
			// onBlurTopicSets :
			//
			onBlurTopicSets(e) {
				console.log("tabbar-3-detial-article-publish.vue onBlurTopicSets params, " + JSON.stringify(e));
				
				let That = this;
				
				let val = That.inputTopicSets;
				if (val == "") {
					return;
				}
				
				if (That.articleInfo.topicSets.length >= 5) {
					return;
				}
				
				for(let idx = 0; idx < That.articleInfo.topicSets.length; idx++) {
					if (That.articleInfo.topicSets[idx] == val) {
						return 0;
					}
				}
				
				That.articleInfo.topicSets.push(val);
				
				That.inputTopicSets = "";
			},
			
			//
			// onTopicSetsCloseClick : 合集关闭事件
			//
			onTopicSetsCloseClick(flag) {
				console.log("tabbar-3-detial-article-publish.vue onTopicSetsCloseClick params, flag:" + flag);
				
				let That = this;
				
				if (flag == "cancel") {
					// 清空命令内容
					That.articleInfo.topicSets = [];
				}
				else if (flag == "ok") {
					
				}
				
				That.$refs.topicSetDialog.close();
			},
			
			//
			// onPublishClick : 发布事件
			//
			onPublishClick(flag) {
				console.log("tabbar-3-detial-article-publish.vue onPublishClick params, flag:" + flag);
				
				let That = this;
				
				if (flag == "saveDraft") {
					// 存草稿
					That.onPublishSaveDraft();
				}
				else if (flag == "timeSend") {
					// 定时发表
					That.onPublishSend(true);
				}
				else if (flag == "preview") {
					// 预览
					That.onPublishPreview();
				}
				else if (flag == "send") {
					// 发表
					That.onPublishSend(false);
				}
			},
			
			//
			// onPublishSend : 发表
			// isTimeSend: 定时发表标志，true为定时发表 ，false为立即发表
			//
			onPublishSend(isTimeSend) {
				console.log("tabbar-3-detial-article-publish.vue onPublishSend params, isTimeSend:" + isTimeSend);
				
				let That = this;
				
				if (That.articleInfo.coverUrl1 == "") {
					request.uniShowToast("请添加封面", null, 3000);
					return;
				}
				
				let ret = -1;
				
				// 保存文章
				ret = That.onCloudSaveArticle();
				if (ret != 0) {
					request.uniShowToast("文章保存失败", null, 3000);
					return;
				}
				
			},
			
			//
			// onPublishSaveDraft : 发布之存草稿，保存到云上
			//
			onPublishSaveDraft() {
				console.log("tabbar-3-detial-article-publish.vue onPublishSaveDraft");
				
				let That = this;
				
				let ret = -1;
				
				// 保存文章
				ret = That.onCloudSaveArticle();
				if (ret != 0) {
					request.uniShowToast("文章保存失败", null, 3000);
					return;
				}
				
				request.uniShowToast("保存成功", null, 3000);
				
			},
			
			//
			// onPublishPreview : 发布之预览
			//
			onPublishPreview() {
				console.log("tabbar-3-detial-article-publish.vue onPublishPreview");
				
				let That = this;
			},
			
			//
			// onCloudSaveArticle : 云保存文章
			//
			onCloudSaveArticle() {
				console.log("tabbar-3-detial-article-publish.vue onCloudSaveArticle");
				
				let That = this;
				
				// 解析html中的所有图片
				let strHtml = That.articleInfo["html"];
				
				let tmpSrcImgs = [];
				StringTool.getSubStrs(strHtml, "src=\"", "\"", 0, tmpSrcImgs);
				console.log("tabbar-3-detial-article-publish.vue onCloudSaveArticle tmpSrcImgs:" + JSON.stringify(tmpSrcImgs));
				
				// 将全部图片上传
				
			}
			
		}
	}
</script>

<style>
	
.container {
	margin: 0;
	width: 100%;
}	

.page-wrap {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.page-image-wrap {
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

.line-box-height-auto {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
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

.justify-content-flex-start {
	justify-content: flex-start;
}

.justify-content-flex-end {
	justify-content: flex-end;
}

.justify-content-space-between {
	justify-content: space-between;
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

.font-weight-bold {
	font-weight: bold;
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

.card-wrap {
	width: 90%;
	border-radius: 8upx;
	background-color: #e3e6e6;
}

.background-color {
	background-color: #e3e6e6;
}

.border-radius-min {
	border-radius: 4upx;
}

.border-radius-mid {
	border-radius: 8upx;
}

.border-radius-max {
	border-radius: 15upx;
}

// 灰色分隔线
.space-gray-line {
	width: 90%;
	height: 1upx;
	background-color: #d9d9d9;
}

</style>
