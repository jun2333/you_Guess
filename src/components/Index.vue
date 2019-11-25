<template>
  <div>
    <router-link to="/bar">Goto Bar</router-link>
    <router-link to="/foo">Goto Foo</router-link>
    <router-link to="/login">To Login</router-link>
    <button @click="logout">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      localStorage.removeItem('token')
    }
  }
};
</script>

