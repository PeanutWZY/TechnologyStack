function Promise(exector){
  let _this = this;
  //status表示一种状态
  let status = "pending";
  let value = undefined;
  let reason = undefined;

  //成功
  function resolve(value){
      if(status == "pending"){
          _this.value = value;
          _this.status = "resolve";
      }
  }

  //执行失败
  function reject(value){
      if(status == "pending"){
          _this.value = value;
          _this.status = "reject"     
      }
  }

  //异步操作
  try{
      exector(resolve,reject)
  }catch(e){
      reject(e)
  }
  //测试then
  Promise.prototype.then = function(reject,resolve){
      let _this = this;
      if(this.status == "resolve"){
          reject(_this.value)
      }
      if(this.status == "reject"){
          resolve(_this.reason)
      }
  }}
  //new Promise测试
let promise = new Promise((reject,resolve)=>{
  resolve("return resolve");
});
promise.then(data=>{
  console.log(`success${data}`);},err=>{
  console.log(`err${data}`);
})