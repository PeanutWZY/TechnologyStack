var hero = {
  _name: 'John Doe',
  getSecretIdentity: function (){
  return this._name;
  }
};
var stoleSecretIdentity = hero.getSecretIdentity;
console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());