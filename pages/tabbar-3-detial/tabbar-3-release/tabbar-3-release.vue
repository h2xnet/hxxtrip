<template>
	<view class="content">
		<view class="work-area">
			<view class="line-box">
				<view class="line-box-item green-color" @tap="onNext">下一步</view>
				<!--<view class="line-box-item gray-color">保存</view>-->
			</view>
			
			<uni-card :is-shadow="false" is-full>
				<uni-easyinput v-model="articleTitle" :inputBorder="false" :placeholderStyle="placeholderStyle" 
				placeholder="请输入标题" ></uni-easyinput>
			</uni-card>
			
			<view class="editor-toolbox">
				<i class="iconfont icon-undo" @tap="onEditorToolTap('undo');" />
				<i class="iconfont icon-redo" @tap="onEditorToolTap('redo');" />
				<i class="iconfont icon-img" @tap="onEditorToolTap('insertImg');" />
				<i class="iconfont icon-video" @tap="onEditorToolTap('insertVideo');" />
				<i class="iconfont icon-link" @tap="onEditorToolTap('insertLink');" />
				<i class="iconfont icon-text" @tap="onEditorToolTap('insertDate');" />
				<i class="iconfont icon-clear" @tap="onEditorToolTap('clear');" />
				<i class="iconfont icon-save" @tap="onEditorToolTap('save');" />
			</view>
			
			<view class="editor-body" :style="{height: editorBodyHeight + 'px'}">
				<editor id="editorId" class="editor-plugin" :placeholder="placeholder" @ready="onEditorReady">
				</editor>
								
			</view>
				
		</view>
	</view>
</template>

<script>
	
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html'
	
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				title: 'Hello',
				placeholder: '请输入内容...',
				editorBodyHeight: 400,
				editorHtml: 'Hello word!'
			}
		},
		onLoad() {
			console.log("tabbar-3-release.vue onLoad");
			
			let That = this;
					
			uni.getSystemInfo({
				success(res) {
					let winh = res.windowHeight; 
					console.log("tabbar-3-release.vue winh: " + winh)
					let pageEle = uni.createSelectorQuery().select(".editor-body"); //想要获取高度的元素名（class/id）
					pageEle.boundingClientRect(data=>{
						That.editorBodyHeight = winh - data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
			
		},
		
		methods: {
			
			onEditorReady() {
				let That = this;
				
				// #ifdef MP-BAIDU
				That.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				// #endif
				
				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editorId').context((res) => {
				  That.editorCtx = res.context
				  
				  // 初始化
				  That.editorCtx.setContents({
					  html: That.editorHtml
				  });
				  
				}).exec()
				// #endif
			},
			
			//
			// onEditorToolTap : 编辑器工具栏按钮事件
			//
			onEditorToolTap(method) {
				console.log("tabbar-3-release.vue onEditorTollTap params, method:" + method);
				
				let That = this;
				if (method == 'undo') {
					That.editorCtx.undo();
				}
				else if (method == "redo") {
					That.editorCtx.redo();
				}
				else if (method == "insertImg") {
					That.onInsertImg();
				}
				else if (method == "insertVideo") {
					
				}
				else if (method == "insertLink") {
					
				}
				else if (method == "insertDate") {
					That.onInsertDate();
				}
				else if (method == "clear") {
					That.onClear();
				}
				else if (method == "save") {
					That.onSave();
				}
				
			},
			
			//
			// onInsertImg : 插入图片
			//
			onInsertImg() {
				console.log("tabbar-3-release.vuew onInsertImg");
				
				let That = this;
					
				/*uni.chooseImage({
					count: 1,
					success: function(res) {
						console.log("tabbar-3-release.vue onInsertImg uni.chooseImage res: " + JSON.stringify(res));
						if(process.env.NODE_ENV === 'development'){
							console.log('开发环境');
							That.upurl = 'http://local.yongen.com/api.php/Upload/uploadMoreImg';
						}
						else{
							console.log('生产环境');
							That.upurl = '/api.php/Upload/uploadMoreImg';
						}
						
						let url = res.tempFilePaths[0];
						
						That.editorCtx.insertImage({
							src: url,
							alt: '图片',
							success: function(e) {
								
							}
						});
					}							
				});*/
				
			},
			
			//
			// 添加日期
			//
			onInsertDate() {
				console.log("tabbar-3-release onInsertDate");
				
				let That = this;
				
				const date = new Date();
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
				That.editorCtx.insertText({
					text: formatDate
				});
			},
			
			//
			// 加粗
			//
			onSetBold() {
				console.log("tabbar-3-release onSetBold");
				let That = this;
				
				That.editorCtx.format("bold");
			},
			
			//
			// onAlignLeft : 排版，左对齐
			//
			onAlignLeft() {
				console.log("tabbar-3-release onAlignLeft");
				
				let That = this;
				
				That.textFormat.align = 'left';
				That.editorCtx.format('align', That.textFormat.align == 'left' ? 'left' : false);
			},
			
			//
			// onAlignCenter : 排版，居中对齐
			//
			onAlignCenter() {
				console.log("tabbar-3-release onAlignCenter");
				
				let That = this;
				
				That.textFormat.align = 'center';
				That.editorCtx.format('align', That.textFormat.align == 'center' ? 'center' : false);
			},
			
			//
			// onAlignRight : 排版，右对齐
			//
			onAlignRight() {
				console.log("tabbar-3-release onAlignRight");
				
				let That = this;
				
				That.textFormat.align = 'right';
				That.editorCtx.format('align', That.textFormat.align == 'right' ? 'right' : false);
			},
			
			// 清空编辑器内容
			onClear() {
				console.log("tabbar-3-release onClear.");
				
				let That = this;
				
				uni.showModal({
					title: '确认',
					content: '确定清空内容吗？',
					success: res => {
						if (res.confirm) {
							That.editorCtx.clear({
								success: function(res2) {
									console.log("onClear success");
								}
							});
						}
					}
				})
			},
			
			// 保存编辑器内容
			onSave() {
				console.log("tabbar-3-release onSave.");
				
				let That = this;
				
				setTimeout(() => {
					That.editorCtx.getContents({
						success: function(res) {
							console.log('保存内容:', res.html);
						}
					});
					
				}, 50)
			},
			
			//
			// onNext : 下一步
			//
			onNext() {
				console.log("tabbar-3-release onNext.");
				
				let That = this;
				
				That.editorCtx.getContents({
					success: function(res) {
						console.log('onNext editor contents:', res.html);
					}
				});
				
			},
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		/* #ifdef H5 */
		height: calc(100vh - var(--window-bottom) - var(--window-top));
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		background-color: transparent;
	}
	
	.work-area {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: white;
		border-radius: 4upx;
	}
	
	.line-box {
		margin-top: 10upx;
		margin-bottom: 10upx;
		margin-left: 15upx;
		margin-right: 15upx;
		display: inline-block;
	}
	
	.line-box-item {
		float: right;
	}
	
	.gray-color {
		color: gray;
	}
	
	.green-color {
		color: green;
	}
	
	.editor-toolbox {
		width: 100%;
		z-index: 999;
		background-color: #EDEDED;
		display: flex;
		padding: 5px;
		box-sizing: border-box;
		line-height: 1.6;
	}
	
	.editor-body {
		width: 100%;
		height: 100%;
	}
	
	.editor-plugin {
		padding: 15upx 30upx 15upx 30upx;
		width: 100%;
		height: 100%;
	}
	
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.iconfont {
		flex: 1;
		text-align: center;
		font-family: "iconfont" !important;
		font-size: 22px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-undo:before {
		content: "\e607";
	}

	.icon-redo:before {
		content: "\e606";
	}

	.icon-img:before {
		content: "\e6e2";
	}

	.icon-video:before {
		content: "\e798";
	}

	.icon-link:before {
		content: "\e60d";
	}

	.icon-text:before {
		content: "\e6ce";
	}
	
	.icon-date:before {
		content: "\e6cf";
	}

	.icon-clear:before {
		content: "\e637";
	}

	.icon-save:before {
		content: "\e501";
	}
	
	
</style>
