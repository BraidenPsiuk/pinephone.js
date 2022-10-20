(function(n,i){typeof exports=="object"&&typeof module!="undefined"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(n=typeof globalThis!="undefined"?globalThis:n||self,i(n.PINEPHONE={}))})(this,function(n){"use strict";const i=require("fs"),o=t=>{let e=i.readFileSync("/sys/firmware/devicetree/base/model").toString();return e=e.split("\0"),e=e[0],e=e.split("("),e=e[0],e=e.trim(),e};console.warn(`
---------[ PINEPHONE.JS - WARNING ]---------`),console.warn(`This is an early version of pinephone.js,
the API may change during this time!`),console.warn(`--------------------------------------------
`),n.getModelId=o,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
