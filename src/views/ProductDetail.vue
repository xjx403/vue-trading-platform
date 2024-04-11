<template>
    <div class="product-detail">
        <h2>商品详情页</h2>
        <div class="product-imags">
            <!-- 显示所有图片 -->
            <div v-for="(picture, index) in pictures" :key="index">
                <img :src="picture" @error="handleError" alt="Product Image" />
            </div>
        </div>
        <div class="info-container">
            <div class="owner"> <!-- 所有者 -->
                <h3 class="owner-title">所有者</h3>
                <p class="owner-name">{{ owner.username }}</p>
            </div>
            <div class="price"> <!-- 价格 -->
                <h3 class="price-title">价格</h3>
                <p class="origin-price">{{ product.originPrice }}</p>
                <p class="current-price">{{ product.price }}</p>
            </div>
            
            <div class="description"> <!-- 描述 -->
                <h3 class="description-title">描述</h3>
                <p>{{ product.description }}</p>
            </div>
        </div>
                <!-- 购买和与卖家沟通按钮 -->
        <div class="buttons">
            <button @click="buy(this.product.id)">购买</button>
            <button @click="contactOwner(this.product.sellerId)">与卖家沟通</button>
        </div>
    </div>
  </template>
  
  
  <script>
        import axios from 'axios';

        export default {
        data() {
            return {
            productId: null,
            owner: {},
            product: {},
            pictures: [],
            };
        },
        created() {
            // 在页面创建时获取 URL 中的参数，并将其赋值给 productId 变量
            this.productId = this.$route.query.id;
        },
        mounted() {

            // 发起 HTTP 请求获取商品文字信息
            axios.get(`http://localhost/backEnd/product/get/ById?id=${this.productId}`)
            .then(response => {
                this.product = response.data.data;
                axios.get(`http://localhost/backEnd/user/detail?userId=${this.product.sellerId}`)
                .then(response => {
                    this.owner = response.data.data;
                }).catch(error => {
                    consol.error('Failed to get user info', error);
                });
            })
            .catch(error => {
                console.error('Failed to fetch product details:', error);
            });

            //发起 HTTP 请求获取商品图片信息
             axios.get(`http://localhost/backEnd/picture/get/product?productId=${this.productId}`)
            .then(response => {
                this.pictures = response.data;
                if (this.pictures == null || this.pictures.length == 0) {
                    this.pictures = ["require('@/assets/no-image.jpg')"];
                }
            })
            .catch(error => {
                console.error('Failed to fetch product pictures:', error);
            });

            
        },
        methods: {
            handleError(event) {
                event.target.src = require('@/assets/no-image.jpg');
            },
            buy(productId) {
                // 使用编程式导航跳转到商品详情页面，并传递商品 id 参数
                console.log(`/order/init?productId=${productId}` );
                this.$router.push({ path: '/order/init', query: { productId: productId } });
            },
            contactOwner(sellerId) {
            // 处理与卖家沟通逻辑
                
                this.$router.push({ path: `/chat`,query: {toUserId: sellerId} });
            }
        }
        };
  </script>
 
<style>
    .product-detail {
        max-width: 800px;
        margin: 100px auto;
        background-color: #f0f8ff; /* 浅蓝色背景 */
        padding: 20px;
    }

    .product-imags{
        display: flex;
        justify-content: center; /* 水平居中 */
        flex-direction: row;
        align-items: center;
    }
    .product-detail img {
    /* margin: 5px; */
    overflow:visible;
    max-width: 100%;
    margin-bottom: 20px;
    /* float:left; */
    }

    .title {
    font-weight: bold;
    text-align: center;
    }


    .info-container {
        /* display: flex; */
        flex-direction: column;
    }

    .owner {
    margin-bottom: 20px;
    }

    .owner-title {
    font-weight: bold;
    font-size: 18px;
    }

    .owner-name {
    font-weight: bold;
    font-size: 16px;
    }

    .price {
    text-align: center;
    }

    .price-title {
    font-weight: bold;
    font-size: 18px;
    }

    .origin-price,
    .current-price {
    font-size: 16px;
    }

    .description {
        width: 60%;
        margin-top: 20px;
        text-align: center;
    }

    /*.description-title {
        display: flex;
        justify-content: center; 
        font-weight: bold;
        font-size: 18px;
    }*/
    .description {
        width: 60%;
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .buttons {
    margin-top: 20px;
    }
</style>