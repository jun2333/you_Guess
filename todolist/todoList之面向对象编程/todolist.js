/*
 * @Descripttion: todolist类
 * @version: 
 * @Author: chenjun
 * @Date: 2020-05-01 10:45:54
 * @LastEditors: chenjun
 * @LastEditTime: 2020-05-01 11:14:55
 */
function TodoList(container){
  this.container = container;
  this.super();
}

$.inherit(Component,TodoList);

$.extend(TodoList.prototype,{
  render:function(){
    var content = $("<input type='text' />"+
                    "<button>提交</button>"+
                    "<ul></ul>");
    this.container.append(content);
  },
  bindEvents:function(){
    this.button = $("button");
    this.input = $("input");
    this.ulEle = $("ul");
    this.button.on("click",$.proxy(this.handleItem,this))
  },
  handleItem:function(){
    var inputVal = this.input.val();
    new TodoItem(this.ulEle,inputVal);
  }
})
