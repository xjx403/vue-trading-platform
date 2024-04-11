<template>
    <div class="order-init-container">
      <!-- 商品信息展示容器 -->
      <div class="product-info">
        <h2>{{ product.productName }}</h2>
        <p>价格: {{ product.price }}</p>
        <img :src="product.picture" alt="Product Image" />
      </div>
  
      <!-- 选择容器 -->
      <div class="select-container">
        <h3>选择付款方式:</h3>
        <div class="payment-options">
          <label>
            <input type="radio" v-model="paymentMethod" value="1" />
            自行交易
          </label>
          <label>
            <input type="radio" v-model="paymentMethod" value="2" />
            扣除代币
          </label>
        </div>
      </div>
  
      <!-- 确认按钮 -->
      <button @click="confirmOrder">确认订单</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  export default {
    data() {
      return {
        product: {},
        paymentMethod: "1", // 默认选择自行交易
        userId: null,
        username: null,
        header: null
      };
    },
    created() {
        const token = localStorage.getItem("token");
        console.log('get user token:' , token);
        //const user = localStorage.getItem('user');
        if (!token) {
            this.$router.push('/login');
            alert('您未登录，请先登录！');
        } else {
            // 这里可以根据需要做进一步处理，比如存储到 Vuex 中或者组件的 data 中
            // 获取用户信息并赋值给页面变量
            const userInfo = jwtDecode(token);
            this.userId = userInfo.id;
            this.username = userInfo.username;
            this.header = userInfo.header;
        }
    },
    mounted() {
      this.fetchProductInfo();
    },
    methods: {
      async fetchProductInfo() {
        const productId = this.$route.query.productId;
        try {
          const response = await axios.get(`http://localhost/backEnd/product/get/ById?id=${productId}`);
          this.product = response.data.data;
          // const userObject = localStorage.getItem('myUser');
          // let arr =  Object.keys(userObject);
          console.log('读取结果：', this.product);
        } catch (error) {
          console.error('Failed to fetch product info:', error);
        }
      },
      confirmOrder() {
         // 构建表单参数
         if (this.userId == null) {
            console.log("userId is null");
            return;
         }
        const formData = new FormData();
        formData.append('userId', this.userId); // 假设用户ID存储在 Vuex 的状态中
        formData.append('productId', this.product.id);
        formData.append('payWay', this.paymentMethod);
        formData.append('remark', ''); // 备注字段暂时留空
        console.log('选择的付款方式:', this.paymentMethod == 1? "自行交易" : "扣除代币");
        console.log('本地用户信息:', localStorage.getItem('user'));
        console.log('请求参数：', formData.getAll('payWay'));
            // 发送 POST 请求
        axios.post('http://localhost/backEnd/order/buy', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (response.data.code != 200) {
              console.log(response.data.message);
            }
            // 提取订单ID
            const orderId = response.data.data.id;
            
            // 跳转到订单详情页面
            this.$router.push({ path: `/order/details`, query: { id: orderId } });
        })
        .catch(error => {
            console.error('Failed to generate order:', error);
        });
      }
    }
  };
  </script>
  
  <style>
  .order-init-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .product-info {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .product-info h2 {
    margin-bottom: 10px;
  }
  
  .product-info img {
    max-width: 200px;
    max-height: 200px;
  }
  
  .select-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .payment-options {
    display: flex;
    justify-content: center;
  }
  
  .payment-options label {
    margin-right: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  