const sum = (function(){
    return function sum(...args){
        return args.reduce((a,b)=> a+b,0);
    };
})();
console.log(sum(1,2,3,4))

const realNumberArray = [4,5.6,-9.8,3.14,42,6,8.34,-2]

const squareList = (arr) => {
    const squareIntegers =  arr.filter(num =>Number.isInteger(num) && num>0).map(x=> x*x);
    return squareIntegers
}

console.log(squareList(realNumberArray))
const arr1 = ['JAN','FEB']
let arr2;
(function() {
    arr2 = [...arr1];
    arr1[0] = 'potato'
})()
console.log(arr2)
var  voxel = {x:3,y:2,z:1}
const {x:a,y:b,z:c} = voxel;


const [z,x, ,y] = [1,2,3,4,5,6];
const [, , ...arr] = [1,2,3,4,5,6];
console.log(z,x,y);
const stats = {
    max:58,
    standard_dev:4.34,
    min:23.87,
}

const half = (function(){
    return function half({max,min})
    {
        return (max+min)/2.0;
    };

})();
const person ={
    name:"Zodic Hasbro",
    age: 56
}
const greeting = 'Hello, my name is ${person.name}! I am ${person.age} years old.';

const bicycle = {
    gear: 2,
    setgear(newGear){
      "use strict";
      this.gear = newGear;
    }
  }
  bicycle.setgear(3);
  console.log(bicycle.gear);

import {capitalizeString} from "./index.js"
const cap = capitalizeString("hello")
console.log(cap)
