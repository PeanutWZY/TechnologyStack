// new 操作符 + Object 对象
var person = new Object();
    person.name = "lisi";
    person.age = 21;
    person.family = ["lida","lier","wangwu"];
    person.say = function(){
        alert(this.name);
    }

// 字面式创建对象
var person ={
  name: "lisi",
  age: 21,
  family: ["lida","lier","wangwu"],
  say: function(){
      alert(this.name);
  }
};

// 工厂模式
function createPerson(name,age,family) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.family = family;
  o.say = function(){
      alert(this.name);
  }
  return o;
}

var person1 =  createPerson("lisi",21,["lida","lier","wangwu"]);   //instanceof无法判断它是谁的实例，只能判断他是对象，构造函数都可以判断出
var person2 =  createPerson("wangwu",18,["lida","lier","lisi"]);
console.log(person1 instanceof Object);                           //true

// 构造函数模式
function Person(name,age,family) {
  this.name = name;
  this.age = age;
  this.family = family;
  this.say = function(){
      alert(this.name);
  }
}
var person1 = new Person("lisi",21,["lida","lier","wangwu"]);
var person2 = new Person("lisi",21,["lida","lier","lisi"]);
console.log(person1 instanceof Object); //true
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Object); //true
console.log(person2 instanceof Person); //true
console.log(person1.constructor);      //constructor 属性返回对创建此对象的数组、函数的引用

// 原型模式
function Person() {
}

Person.prototype.name = "lisi";
Person.prototype.age = 21;
Person.prototype.family = ["lida","lier","wangwu"];
Person.prototype.say = function(){
    alert(this.name);
};
console.log(Person.prototype);   //Object{name: 'lisi', age: 21, family: Array[3]}

var person1 = new Person();        //创建一个实例person1
console.log(person1.name);        //lisi

var person2 = new Person();        //创建实例person2
person2.name = "wangwu";
person2.family = ["lida","lier","lisi"];
console.log(person2);            //Person {name: "wangwu", family: Array[3]}
// console.log(person2.prototype.name);         //报错
console.log(person2.age);              //21

// 混合模式（构造函数模式+原型模式）
function Person(name,age,family){
  this.name = name;
  this.age = age;
  this.family = family;
}

Person.prototype = {
  constructor: Person,  //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
  say: function(){
      alert(this.name);
  }
}

var person1 = new Person("lisi",21,["lida","lier","wangwu"]);
console.log(person1);
var person2 = new Person("wangwu",21,["lida","lier","lisi"]);
console.log(person2);