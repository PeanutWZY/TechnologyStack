// 手动实现 function isInstanceOf(child, parent)
function isInstanceOf(child, parent){
  // 思路：不断向上遍历child的原型链对比是否存在parent的原型
  let parentProto = parent.prototype; 
  child = child.__proto__;
  while(true){
    if(child === null){
      return false
    }
    if(child === parentProto){
      return true
    }
    child = child.__proto__
  }
}