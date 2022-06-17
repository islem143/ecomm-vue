 function test(){
    let promise= new Promise((resolve,reject)=>{
       reject("no");
    })
    return promise.catch(err=>{
      return  Promise.reject("sd");
    })
}



test().catch(err=>{
    console.log(err);
})


