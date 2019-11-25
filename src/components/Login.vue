<template>
  <div>
    <form action>
      <div class="formItem" v-if="isRegister">
        名称：
        <input type="text" v-model="formData.nick" />
      </div>
      <div class="formItem">
        用户名:
        <input type="text" v-model="formData.userName" />
      </div>
      <div class="formItem">
        密码：
        <input type="password" v-model="formData.password" />
      </div>
      <div class="formItem">
        <input type="button" value="注册" @click="isRegister=true" />
        <input type="button" value="登录" v-if="!isRegister" @click="submit" />
        <input type="button" value="提交" v-else @click="submit" />
        <input type="button" value="去登录" v-if="isRegister" @click="isRegister=false" />
      </div>
    </form>
  </div>
</template>

<script>
import { register, login, userInfo } from "@/api/user";
export default {
  data() {
    return {
      isRegister: false,
      formData: {
        nick: "",
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      //注册
      let res;
      if (this.isRegister) {
        res = await register(this.formData);
        console.log(res)
      }else{
          res = await login(this.formData);
          if(res.code==='1002') {
            localStorage.setItem('token',res.data.token);
            this.$router.push('/bar')
          }else{
            alert('登录失败')
          }
      }
    }
  }
};
</script>

