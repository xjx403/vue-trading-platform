import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Auction from '@/views/Auction.vue';
import ChatPage from '../views/ChatPage.vue';
import ChatsList from '@/views/ChatsList.vue';
import UploadProduct from '@/views/product/UploadProduct.vue';
import Error404 from '@/views/error/Error404.vue';
import UserDetail from '@/views/user/UserDetail.vue';
import OrderInit from '@/views/OrderInit.vue';


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/product/list',
    component:ProductList
  },
  {
    path: '/product/detail',
    component:ProductDetail,
    props: route => ({id: route.query.id})
  },  
  {
    path: '/product/auction',
    component:Auction,
    props: route => ({id: route.query.id})
  },  
  {
    path: '/product/upload',
    component: UploadProduct
  },
  {
    path: '/chats',
    component: ChatsList
  },
  {
    path: '/chat',
    component:ChatPage,
    props: route => ({ toUserId: route.query.toUserId})
  },
  {
    path: '/order/init',
    component: OrderInit,
    props: route => ({productId: route.query.productId})
  },  
  {
    path: '/user/detail',
    component: UserDetail,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Error404
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
