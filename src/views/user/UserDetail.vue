<template>
    <div class="user-detail">
      <!-- 用户详情容器 -->
      <div class="user-info-container">
        <div class="avatar-and-name">
          <img :src="userInfo.header" alt="Avatar" class="avatar">
          <h2>{{ userInfo.username }}</h2>
        </div>
        <div class="motto">
            <p style="margin: 5% auto 10% auto;">个人签名:</p>
          <p>{{ userInfo.motto }}</p>
        </div>
        <div class="payment-code">
          <button @click="paymentCodeUrl">用户收款码</button>
        </div>
      </div>
  
      <!-- 用户信息更新容器 -->
      <div class="update-info-container">
        <div class="update-avatar">
            <label for="updateAvatar">更新头像:</label>
            <input id="updateAvatar" type="file" @change="updateAvatar" accept="image/*">
        </div>
        <div class="update-payment-code">
            <label for="updatePaymentCode">更新收款码:</label>
            <input id="updatePaymentCode" type="file" @change="updatePaymentCode" accept="image/*">
        </div>
      </div>
  
      <!-- 在售商品容器 -->
      <div class="on-sale-container">
        <h3>在售商品</h3>
        <div v-for="product in onSaleProducts" :key="product.id">
          <img :src="product.image" alt="Product Image" class="product-image">
          <p>{{ product.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';

  export default {
    inject:['updateNavState'],
    data() {
      return {
        userId: -1,
        userInfo: {},
        paymentCodeUrl: '',
        onSaleProducts: []
      };
    },
    created() {
        const token = localStorage.getItem('token');
        console.log('获取用户token', token);
        if (!token) {
            alert("用户尚未登录，请先登录！");
            this.$router.push('/user/login');
        }
        this.updateNavState();
        const decodeToken = jwtDecode(token);
        this.userId = decodeToken.id;
        console.log('用户id:', this.userId);
      this.fetchUserInfo();
      this.fetchPaymentCode();
      this.fetchOnSaleProducts();
    },
    methods: {
      fetchUserInfo() {
        axios.get(`http://localhost/backEnd/user/detail?userId=${this.userId}`)
          .then(response => {
            this.userInfo = response.data.data;
            this.userInfo.motto = '用户暂未设置个人签名。';
          })
          .catch(error => {
            console.error('Failed to fetch user info:', error);
          });
      },
      fetchPaymentCode() {
        this.paymentCodeUrl = `http://localhost/backEnd/picture/get?type=1&ownerId=${this.userId}`;
      },
      fetchOnSaleProducts() {
        // Fetch on sale products based on user id
        // This is just a placeholder, replace it with actual API call
      },
      updateAvatar(event) {
        // Handle updating avatar logic
      },
      updatePaymentCode(event) {
        // Handle updating payment code logic
      }
    }
  };
  </script>
  
  <style>
  .user-detail {
    max-width: 96%;
    margin: 100px auto;
    background-color: #f0f8ff; /* 浅蓝色背景 */
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .user-info-container {
    width: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .avatar-and-name {
    margin-left: 5%;
    /*text-align: center;*/
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 20%;
  }
  
  .motto {
    margin: auto auto 10% auto;
    text-align: center;
  }
  
  .payment-code {
    
    text-align: center;
  }
  
  .payment-code-img {
    width: 200px;
    height: 200px;
  }
  
  .update-info-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .update-avatar,
  .update-payment-code {
    margin-bottom: 10px;
  }
  
  .on-sale-container {
    text-align: center;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    margin-bottom: 5px;
  }
  </style>
  