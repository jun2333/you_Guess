/*
 * @Descripttion: 
 * @version: 
 * @Author: chenjun
 * @Date: 2020-05-01 10:42:28
 * @LastEditors: chenjun
 * @LastEditTime: 2020-05-01 11:11:06
 */
function Component(){
  this.init()
}

$.extend(Component.prototype,{
  init:function(){
    this.render();
    this.bindEvents()
  },
  render:function(){},
  bindEvents:function(){}
})
