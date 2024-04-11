<template>
    <div class="product-upload">
      <h2>商品信息上传</h2>
  
      <!-- 商品名称 -->
      <div class="input-container">
        <label for="productName">商品名称:</label>
        <input type="text" id="productName" v-model="productName" />
        <span class="error-message" v-if="!productNameValid"></span>
      </div>

      <!-- 卖出价格 -->
      <div class="input-container">
        <label for="price">卖出价格:</label>
        <input type="number" id="price" v-model="price" />
        <span class="error-message" v-if="!priceValid"></span>
      </div>
  
      <!-- 商品原价 -->
      <div class="input-container">
        <label for="originPrice">商品原价:</label>
        <input type="number" id="originPrice" v-model="originPrice" />
      </div>
  
      <!-- 商品描述 -->
      <div class="input-container">
        <label for="description">商品描述:</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
  
      <!-- 商品图片 -->
      <div class="input-container">
        <label for="image">商品图片:</label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" />
      </div>
  
      <!-- 提交按钮 -->
      <button @click="validateAndSubmit">提交</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  export default {
    data() {
      return {
        userId: '',
        productName: '',
        price:'',
        originPrice: '',
        description: '',
        imageFile: null
      };
    },
    created() {
        const token = localStorage.getItem('token');
        if (!token){
          alert('用户未登录，不能上传商品!');
          this.$router.push("/login");
        }else {
           const decodeToken = jwtDecode(token);
           this.userId = decodeToken.id;
        }
    },
    methods: {

      validateAndSubmit() {
      // 校验表单
      this.productNameValid = this.productName.trim() !== '';
      this.priceValid = this.price !== '';

      // 如果商品名称或价格为空，弹出警告
      if (!this.productNameValid || !this.priceValid) {
        if (!this.productNameValid) {
          alert('请输入商品名称');
        }
        if (!this.priceValid) {
          alert('请输入卖出价格');
        }
        return;
      }

        // 如果表单校验通过，则提交表单
        this.submit();
      },
      async submit() {
        if (!this.productName) {
          alert('请输入商品名称！ ');
        }
        if (!this.price) {
          alert('请输入商品价格');
        }
        try {

          const formData = new FormData();
          formData.append('sellerId', this.userId);
          formData.append('productName', this.productName);
          formData.append('productPrice', this.price);
          formData.append('originPrice', this.originPrice);
          formData.append('description', this.description);
  
          const productResponse = await axios.post('http://localhost/backEnd/product/upload', formData);
          console.log('商品上传结果：',productResponse.data);
          const product = productResponse.data.data;
          if (this.imageFile == null) {
            alert('商品信息上传成功！');
            this.$router.push({ path: '/product/detail', query: { id: product.id } });
            return;
          }
          
          // 如果商品信息上传成功，再上传图片
          if (productResponse.data.code === 200) {
            const imageFormData = new FormData();
            imageFormData.append('file', this.imageFile);
            imageFormData.append('type', '2');
            imageFormData.append('ownerId', this.userId);
  
            const imageResponse = await axios.post('http://localhost/backEnd/picture/upload', imageFormData);
  
            if (imageResponse.data.code === 200) {
              alert('商品信息和图片上传成功！');
            } else {
              alert('图片上传失败: ' + imageResponse.data.msg);
            }
          } else {
            alert('商品信息上传失败: ' + productResponse.data.msg);
          }
        } catch (error) {
          console.error('上传失败:', error);
        }
      },
      handleImageChange(event) {
        this.imageFile = event.target.files[0];
      }
    }
  };
  </script>
  
  <style scoped>
  .product-upload {
    max-width: 600px;
    margin: 80px 20px 10vh 20px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #ebebeb;
  }
  
  h2 {
    text-align: center;
  }
  
  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .input-container label {
    width: 150px;
  }
  
  .input-container input,
  .input-container textarea,
  .input-container select {
    flex: 1;
  }
  .error-message {
    color: red; /* 设置字体颜色为红色 */
    font-size: 14px; /* 设置字体大小 */
    margin-top: 5px; /* 设置与上方元素的垂直间距 */
  }
  </style>
  