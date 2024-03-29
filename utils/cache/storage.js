/**
 * 判断字符串是否是json字符串
 * 判断条件 1. 排除null可能性 
           2. 确保数据是对象或数组
 * @param str  数据
 * @returns Boolean
 */
const isJsonString = str => { // 判断字符串是否是json字符串
    try {
        const toObj = JSON.parse(str);
        if (toObj && typeof toObj === 'object') {
            return true
        }
    } catch {}
    return false
}

export default {
    set(name, value) {
        if (value && typeof value == 'object') { //设置json缓存数据
            uni.setStorageSync(name, JSON.stringify(value));
        } 
		else { //设置缓存数据
            uni.setStorageSync(name, value);
        }
    },
	
    get(name) { //获取缓存数据
        var data = uni.getStorageSync(name);
        if (data) {
            if (isJsonString(data)) { //json字符串转对象
                return JSON.parse(data);
            }
            return data;
        }
        return null;
    },
	
    remove(name) { // 清除某项缓存
        uni.removeStorageSync(name);
    },
	
    clear() { // 清空缓存
        uni.clearStorageSync();
    },
	
	//
	// getUserInfo : 获取用户信息
	//
	getUserInfo() {
		let That = this;
		return That.get("userInfo");
	},
	
	//
	// setUserInfo : 设置用户信息
	//
	setUserInfo(data) {
		let That = this;
		That.set("userInfo", data);
	},
	
	//
	// setArticleData : 设置文件数据
	//
	setArticleData(data) {
		let That = this;
		That.set("articleData", data);
	},
	
	//
	// getArticleData : 获取文章数据
	//
	getArticleData() {
		let That = this;
		return That.get("articleData");
	},
	
	//
	// setCropperImageData : 设置裁剪图片数据
	//
	setCropperImageData(data) {
		let That = this;
		That.set("cropperImage", data);
	},
	
	//
	// getCropperImageData : 获取裁剪图片数据
	//
	getCropperImageData() {
		let That = this;
		return That.get("cropperImage");
	},
	
	removeCropperImageData() {
		let That = this;
		That.remove("cropperImage");
	},
	
	//
	// setTestData : 设置测试数据
	//
	setTestData(data) {
		let That = this;
		That.set("test", data);
	},
	
	//
	// getTestData : 获取测试数据
	//
	getTestData() {
		let That = this;
		return That.get("test");
	}
	
}