<!-- ProductList.vue -->
<template>
    <div class="product-list-container">
      <h2>商品首页</h2>
      <!-- 搜索框 -->
      <div class="search-box">
        <input v-model="searchKeyword" placeholder="输入关键词搜索" />
        <button @click="search">搜索</button>
      </div>

      <ul class="product-list">
        <li v-for="product in displayedProducts" :key="product.id" class="product-item">
          <div class="product-info">
            <div class="product-image">
              <img :src="product.picture" alt="Product Image" />
            </div>
            <div class="product-details">
              <div class="product-name-owner">
                <h3>{{ product.productName }}</h3>
                <p>卖家: {{ product.description }}</p>
              </div>
              <div class="product-price">
                <p>现价: {{ product.price }}</p>
                <p>原价: {{ product.originPrice }}</p>
              </div>
            </div>
            <div class="product-button">
              <button @click="goToProductDetail(product.id)" class="detail-button">商品详情</button>
              <br><br/>
              <button @click="goToOrderGenerate(product.id)" class="buy-button">购买</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页/共 {{ totalPages }} 页 </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: [],
        itemsPerPage: 5,
        currentPage: 1,
        totalCount: 0
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalCount / this.itemsPerPage);
      },
      displayedProducts() {
        const start = 0;
        const end =  this.itemsPerPage;
        return this.products.slice(start, end);
      }
    },
    mounted() {
      this.fetchProductList();
    },
    methods: {
      async fetchProductList() {
        try {
            const response = await axios.get(`http://localhost/backEnd/product/list?pageNumber=${this.currentPage}&pageSize=${this.itemsPerPage}`);
            
            if (response.data.code === 200) {
                this.products = response.data.data.list;
                this.totalCount = response.data.data.total;
                this.totalPages = response.data.data.pages;
               // this.products[0].picture = `E:\x01\前端学习\study\vue-trading-platform\src\assets\logo.png`;
                console.log('Fetched product list:', this.products);
                console.log('picture:' , this.products[0].picture);
            } else {
                console.error('Error in response:', response.data.message);
            }
        } catch (error) {
          console.error('Failed to fetch product list', error);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.fetchProductList();
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.fetchProductList();
        }
      },
      goToProductDetail(productId) {  
        // 使用编程式导航跳转到商品详情页面，并传递商品 id 参数
        console.log(`/product/detail?id=${productId}` );
        this.$router.push({ path: '/product/detail', query: { id: productId } });
      },
      goToOrderGenerate(productId) {
        // 使用编程式导航跳转到购买页面，并传递商品 id 参数
        console.log(`/order/init?productId=${productId}` );
        this.$router.push({ path: '/order/init', query: { productId: productId } });
      }
    }
  };
  </script>
 
<style>
.product-list-container {
  max-width: 800px;
  margin: 100px auto;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image img {
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product-name-owner h3 {
  margin-bottom: 5px;
}

.product-buttons {
  display: flex;
}

.detail-button,
.buy-button {
  flex: 1;
  cursor: pointer;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  background-color: #3498db;
}


.pagination {
  margin-top: 20px;
}

button {
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

button:disabled {
  background-color: #ddd;
  color: #666;
}

.search-box {
  margin-bottom: 20px;
}

.search-box input {
  padding: 8px;
  margin-right: 10px;
}

.search-box button {
  padding: 8px 15px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
}
</style>