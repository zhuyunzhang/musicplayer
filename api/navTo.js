const togo = function(url,data){  
    url += '?item=' + param(data)  

    uni.navigateTo({    
        url  
    })   
}  

export function param(data) {  
  let url = '' 
   url=encodeURIComponent(JSON.stringify(data))
  return url ? url : ''  
}  
export{togo}