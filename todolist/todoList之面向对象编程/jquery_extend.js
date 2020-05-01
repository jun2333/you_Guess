/*
 * @Descripttion: 扩展jquery的一个继承方法
 * @version: 
 * @Author: chenjun
 * @Date: 2020-05-01 10:37:41
 * @LastEditors: chenjun
 * @LastEditTime: 2020-05-01 10:41:48
 */

 $.extend({
   inherit:function(SuperFunc,SubFunc){
     SubFunc.prototype = new SuperFunc();
     SubFunc.prototype.constructor = SubFunc;
     SubFunc.prototype.super = SuperFunc;
   }
 })
