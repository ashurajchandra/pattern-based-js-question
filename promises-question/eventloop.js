function call(){

    return Promise.resolve()
}

call()
.then(()=>console.log("1"))
.then(()=>console.log("2"))
.then(()=>console.log("3"))


call()
.then(()=>console.log("4"))
.then(()=>console.log("5"))
.then(()=>console.log("6"))

function call1(){

    return new Promise((resolve)=>setTimeout(resolve,0))
}

call1()
.then(()=>console.log("1"))
.then(()=>console.log("2"))
.then(()=>console.log("3"))


call1()
.then(()=>console.log("4"))
.then(()=>console.log("5"))
.then(()=>console.log("6"))