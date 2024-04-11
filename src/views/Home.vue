<!-- Home.vue -->
<template>
  <div class="home-container">
    <h2>欢迎来到校园闲置物品交易系统</h2>
    <p>来发现令人惊叹的产品和超值优惠！</p>
    <p>Discover amazing products and great deals!</p>
    <div >
      <router-link to="/login">
       <botton class="home-button">登录</botton>
      </router-link>
      <router-link to="/register">
        <botton class="home-button">注册</botton>
      </router-link>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
  
<script setup>
</script>
  
<style scoped>
.home-container {
  margin: 58px auto;
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
  /* background-image: url(/src/assets/logo.png); */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.home-button {
  width: 140px;
  line-height: 38px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  text-shadow:1px 1px 1px #333;
  border-radius: 5px;
  margin:0 20px 20px 0;
  position: relative;
  overflow: hidden;
  border:1px solid #64c878;
}


</style>