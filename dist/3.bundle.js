(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{26:function(t,o,n){"use strict";var e=n(5);n.n(e).a},27:function(t,o,n){(t.exports=n(9)(!1)).push([t.i,"\n.foo {\r\n  background: yellowgreen;\n}\r\n",""])},48:function(t,o,n){"use strict";n.r(o);var e=function(){var t=this.$createElement,o=this._self._c||t;return o("div",{staticClass:"foo"},[o("h1",{on:{click:this.onHandleClick}},[this._v("Foo")]),this._v(" "),o("p",[this._v(this._s(this.fooCount))])])};e._withStripped=!0;var s=n(8),a=n.n(s),r=n(7),i={namespaced:!0,state:function(){return{data:""}},actions:{getFoo:function(t){var o,n=t.commit;return a.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.a.awrap(r.a.request({url:"/data.json",method:"post"}));case 2:o=t.sent,n("setData",o);case 4:case"end":return t.stop()}}))}},mutations:{setData:function(t,o){t.data=o}}},c={asyncData:function(t){var o=t.store;return o.registerModule("foo",i),o.dispatch("foo/getFoo")},methods:{onHandleClick:function(){alert("foo")}},destroyed:function(){this.$store.unregisterModule("foo")},computed:{fooCount:function(){return this.$store.state.foo.data}}},u=(n(26),n(1)),f=Object(u.a)(c,e,[],!1,null,null,null);f.options.__file="src/components/Foo.vue";o.default=f.exports},5:function(t,o,n){var e=n(27);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,n(10).default)("615eb6bc",e,!1,{})}}]);