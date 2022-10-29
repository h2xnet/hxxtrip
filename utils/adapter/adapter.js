//
// isMatch : 函数用于判断当前运行环境是否与适配器匹配
//
function isMatch() {
    return uni ? true : false
}

//
// genAdapter : 函数返回适配器的实体对象
//
/*
interface SDKAdapterInterface {
  // 全局根变量，浏览器环境为window
  root: any;
  // WebSocket类
  wsClass: WebSocketContructor;
  // request类
  reqClass: SDKRequestConstructor;
  // 无localstorage时persistence=local降级为none
  localStorage?: StorageInterface;
  // 无sessionStorage时persistence=session降级为none
  sessionStorage?: StorageInterface;
  // storage模式首选，优先级高于persistence
  primaryStorage?: StorageType;
  // 获取平台唯一应用标识的api
  getAppSign?(): string;
}
*/

export class UniRequest extends AbstractSDKRequest {
  // 实现post接口
  public post(options: IRequestOptions) {
    const { url, data, headers } = options
    return new Promise((resolve, reject) => {
      try {
        uni.request({
		  url,
          data,
          header: headers,
          method: 'POST',
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          }
        })
      } catch (error) {
        reject(error)
      }
    });
  }
  
  // 实现upload接口
  public upload(options: IUploadRequestOptions) {
    const { url, file, name } = options
    return new Promise((resolve, reject) => {
      try {
        uni.uploadFile({
          url,
          filePath: file,
          name,
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          }
        })
      } catch (error) {
        reject(error)
      }
    });
  }
  
  // 实现download接口
  public download(options: IRequestOptions) {
	const { url } = options
	return new Promise((resolve, reject) => {
	  try {
		uni.downloadFile({
		  url,
		  success: (res) => {
			resolve(res)
		  },
		  fail: (err) => {
			reject(err)
		  }
		})
	  } catch (error) {
		reject(error)
	  }
	});
  }
  
} // end class UniRequest


// Storage为平台特有的本地存储，必须实现setItem/getItem/removeItem/clear四个接口
export const Storage: StorageInterface = {
	
	setItem(key: string, value: any) {
	  uni.setStorage({
		key,
		data: value,
		success: (res) => {
		  console.log(res);
		}
	  })
	},

	getItem(key: string): any {
	  return uni.getStorageSync(key)
	},
	
	removeItem(key: string) {
	  uni.removeStorage({
		key,
		success: (res) => {
		  res
		}
	  })
	},
	
	clear() {
	  uni.clearStorage()
	}
};

// WebSocket为平台特有的WebSocket，与HTML5标准规范一致
export class WebSocket {
	constructor(url: string, options: object = {}) {
	  const socketTask: WebSocketInterface = {
		set onopen(cb) {
		  // ...
		},
		set onmessage(cb) {
		  // ...
		},
		set onclose(cb) {
		  // ...
		},
		set onerror(cb) {
		  // ...
		},
		send: (data) => {
		  // ...
		},
		close: (code?: number, reason?: string) => {
		  // ...
		},
		get readyState() {
		  // ...
		  return readyState;
		},
		CONNECTING: 0,
		OPEN: 1,
		CLOSING: 2,
		CLOSED: 3
	  };
	  return socketTask;
	}
	
} // end Class WebSocket
  
//
// genAdapter : 函数创建adapter实体
// 
function genAdapter() {
	const adapter: SDKAdapterInterface = {
	  // root对象为全局根对象，没有则填空对象{}
	  root: {},
	  reqClass: UniRequest,
	  wsClass: WebSocket as WebSocketContructor,
	  localStorage: Storage,
	  // 首先缓存存放策略，建议始终保持localstorage
	  primaryStorage: StorageType.local,
	  // sessionStorage为可选项，如果平台不支持可不填
	  sessionStorage: sessionStorage
	};
	return adapter;
}

const adapter = {
  genAdapter,
  isMatch,
  // runtime标记平台唯一性
  runtime: 'mp-weixin'
};
export adapter;
export default adapter;