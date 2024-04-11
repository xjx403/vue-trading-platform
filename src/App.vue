<template>
  <div id="app">
    <nav class="main-nav">
      <div class="header-container">
        <router-link to="/product/list">首页</router-link>
        <router-link to="/product/auction">拍卖</router-link>
        <router-link to="/chats">会话</router-link>
        <div>
        <router-link v-if="!hasToken" class="user-name-text" to="/login">登录</router-link>
        <!-- <div v-if="hasToken">
            <button  @click="logout"  class="user-name-text">退出登录</button>
        </div> -->
        <el-dropdown v-if="hasToken" trigger="click">
          <div style="cursor:pointer;display: flex;align-items: center;">
            <div style="font-size: 16px;color: #409EFF;padding-right: 5px;">{{nicknameValue ? nicknameValue : username}}</div>
            <el-avatar :src="avatarValue ? avatarValue : userHeader"></el-avatar>
            <button @click="logout">注销</button>
          </div>
          <el-dropdown-menu>
            <el-dropdown-item><div @click="toMe">个人中心</div></el-dropdown-item>
            <el-dropdown-item divided style="color: red;"><div @click="loginOut">退出登录</div></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
        <!-- <div class="user-info" v-if="!hasToken">
          {{ username }}
          <div class="user-header">
            <img  v-if="userHeader" :src="userHeader" alt="User Avatar" />
          </div>
          <button @click="logout">退出</button>
        </div> -->
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'Header',
  props: ['searchInput','nicknameValue','avatarValue'],
        // data() {
        //     return {
        //         searchValue: this.searchInput,
        //         nickname:'登录',
        //         avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        //         isLogin:false
        //     };
        // },
  data() {
    return {
      hasToken: false,
      username: null,
      userHeader: null // Assuming you have a URL for the user's avatar
    };
  },
  created() {
    // const token = localStorage.getItem("token");
    // console.log("token expiration:", token.exp);
    // console.log("now date", Date.now());
    // if (token.exp < Date.now()){
    //   console.log("JWT已过期");
    // }else {
    //   console.log("JWT尚未过期");
    // }
    // console.log(' :', token);
    // if (token) {
    //   this.hasToken = true;
    //   const user = jwtDecode(token);
    //   if (user == null) {
    //     this.username =  '匿名';
    //     this.userHeader = '/home/pic?imagename=test.png';
    //   }else{
    //     this.username = user.username;
    //     this.userHeader = user.header;
    //   }
      // this.username = localStorage.getItem('myUser').username || '匿名';
      // this.userHeader = localStorage.getItem('myUser').header || '/home/pic?imagename=test.png';
    // }
  },  
  methods: {
    updateNavState() {
      // 更新导航栏状态的逻辑...
      const token = localStorage.getItem("token");
      if (token) {
        // 用户已登录
        this.hasToken = true;
        const user = jwtDecode(token);
        if (user) {
          this.username = user.username;
          this.userHeader = user.header;
        } else {
          // 未能解析用户信息
          this.username = '匿名';
          this.userHeader = '/home/pic?imagename=test.png';
        }
      } else {
        // 用户未登录
        this.hasToken = false;
        this.username = null;
        this.userHeader = null;
      }
    },
    logout() {
      // 清除本地存储的 token 和用户信息
      // this.$store.state.commit('setToken', null);
      // this.$store.state.commit('setUser', null);
      localStorage.removeItem('token');
      // 重置组件中的相关数据
      this.hasToken = false;
      this.username = '';
      this.userAvatar = '';
      
      this.updateNavState();
      // 你可能还需要导航到登录页面或其他页面
      // this.$router.push('/login');
    }
  },    
  provide() {
      return {
        // 提供 updateNavState 方法给子组件使用
        updateNavState: this.updateNavState
      }
    }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 10px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  border-bottom: #eeeeee solid 2px;
  z-index: 1000;
  background-image: url(/src/assets/nav-background.jpg);
}

.header-container{
  width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-header img {
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
}
.user-info {
  position:relative;
  top: 20%;
  left: 10%;
  display: flex;
  align-items: center;
}



nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  font-size: x-large;
  color: #132230;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
