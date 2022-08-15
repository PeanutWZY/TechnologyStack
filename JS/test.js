
function Foo() {};
let f1 = new Foo;
let f2 = new Foo;
 
console.log(f1.__proto__ === Foo.prototype)
console.log(f2.__proto__ === Foo.prototype)
console.log(Foo.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
console.log(Foo.prototype.constructor === Foo)
console.log(Foo.__proto__ === Function.prototype)
// f1.__proto__ === Foo.prototype
// f2.__proto__ === Foo.prototype
// Foo.prototype.__proto__ === Object.prototype
// Object.prototype.__proto__ === null
// Foo.prototype.constructor === Foo
// Foo.__proto__ === Function.prototype