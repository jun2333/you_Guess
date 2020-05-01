/*
 * @Descripttion: todoitem类
 * @version: 
 * @Author: chenjun
 * @Date: 2020-05-01 10:50:11
 * @LastEditors: chenjun
 * @LastEditTime: 2020-05-01 11:14:46
 */

function TodoItem(container,val){
  this.container = container;
  this.val = val;
  this.super();
}

$.inherit(Component,TodoItem);

$.extend(TodoItem.prototype,{
  render:function(){
    var item = $("<li>"+this.val+"</li>");
    this.container.append(item)
  },
  bindEvents:function(){
    this.itemEle = $("li");
    this.itemEle.on("click",$.proxy(this.removeItem,this))
  },
  removeItem:function(e){
    $(e.target).remove()
  }
})
