<!-- Login.vue -->
<template>
  <header class="tmp"></header>
  <div class="login-container">
    <h2>Login</h2>
    <form  @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required />
      <br><br/>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <br><br/>
      <button type="submit">Login</button>
      <router-link to = "/register">
          <button>Register</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import  { jwtDecode } from 'jwt-decode';
export default {
  inject: ['updateNavState'], // 注入 updateNavState 函数
  data() {
    return {
      email: '',
      password: ''
    };
  },
  // created(){
  //   localStorage.clear()
  // },
  methods: {
    async login(){
      try {
        const formData = new FormData();
        formData.append("email", this.email);
        formData.append("password", this.password);
        const response = await axios.post('http://localhost/backEnd/user/login', formData, {
          headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }); 

        console.log('登录结果：', response.data.data.user);
        if (response.data.code == 200) {
          // 登录成功，存储 token 和 user
          const  token  = response.data.data.token;
          localStorage.setItem('token', token);
          this.updateNavState();
          this.$router.push('/product/list');
        }else {
          console.log('登陆失败', response.data);
        }
      }catch(error) {
        console.error('登录失败',error);
      }
    },
    // updateNavState() {
    //   // 调用导航栏组件中的更新状态方法
    //   this.$root.$emit('updateNavState');
    // }
  }
};
</script>

<style scoped>
/* .tmp {
  height: 68px;
} */
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>