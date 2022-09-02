// 1. 原型链继承
Parent.prototype.grand = 'grand';

function Parent (name) {
     this.name = name || 'parent';
     this.color = ['red', 'orange', 'yellow'];
 }

 function Child () {

 }

 Child.prototype = new Parent();
 var child1 = new Child('child1');
 var child2 = new Child('child2');

// 2. 经典继承（借用构造函数继承）
Parent.prototype.grand = 'grand';

function Parent (name) {
     this.name = name || 'parent';
     this.color = ['red', 'orange', 'yellow'];
 }

 function Child (name,) {
      Parent.call(this, name);
 }

 var child1 = new Child('child1');
 var child2 = new Child('child2');

// 3. 伪经典继承（组合继承）
Parent.prototype.grand = 'grand';

function Parent(name) {
    this.name = name || 'parent';
    this.color = ['red', 'orange', 'yellow'];
}


function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('child1', 18);
var child2 = new Child('child2', 19);
	

// 4. 原型式继承
var car = {
  name : 'car',
  color : ['red', 'orange', 'yellow']
}

function object (o) {
  function F () {};
  F.prototype = o;
  return new F();
}

var car1 = object(car);
var car2 = object(car);

// 5. 寄生式继承
function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = new Parent();

var child1 = new Child('kevin', '18');

console.log(child1)

// 6. 寄生组合式继承

function Parent (name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
// 最后我们封装一下这个继承方法：

function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
