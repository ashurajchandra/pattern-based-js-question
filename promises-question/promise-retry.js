
function fetchWithRetry(fetcher, maxRetryCount = 0){
console.log("maxRetryCount", maxRetryCount)
    return new Promise((resolve, reject)=>{
        fetcher().then(resolve).catch((error)=>{
            if(maxRetryCount === 0){
              return  reject(error)
            }else{
                return fetchWithRetry(fetcher, maxRetryCount-1)
            }
        })
    })
}

fetchWithRetry(()=>{
    return new Promise((resolve,reject)=>{
        if(Math.random()>0.7){
            reject("error")
        }else{
            resolve("resolved!")
        }
    })
}, 5).then((value)=>console.log("value",value)).catch((err)=>console.log("err",err))