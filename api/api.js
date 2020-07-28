//封装请求 get post
//面向对象的封装es6 ,promise ....
//get请求
let listing =function(urling){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:urling,
			method:'GET'
		})
		.then((res)=>{
			resolve(res[1].data)
		})
		.catch((err)=>{
			reject(err)
		})
	})
}

export{listing}