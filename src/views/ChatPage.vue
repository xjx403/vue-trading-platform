<!-- ChatPage.vue -->
<template>
    <div class="chat-container">

      <!-- 对话消息 -->
      <div v-for="(message, index) in messages" :key="index" :class="message.fromUserId !== myInfo.id ? 'chat-sender': 'chat-receiver'">
        <!-- <div><img class="chat-header" src="http://localhost:8092/picture/getById?id=3"></div> -->
        <div><img class="chat-header" :src="message.fromUserId !== myInfo.id ? myInfo.header : toUser.header"></div>
        <div>{{ message.fromUserId !== myInfo.id ? toUser ? toUser.username:'匿名' : myInfo.username }}</div>
        <div>
          <div :id= "message.fromUserId !== myInfo.id ? 'chat-left_triangle': 'chat-right_triangle'"></div>
          <span> {{ message.content }}</span>
        </div>
      </div>

      <div class="chat-input">
        <input v-model="newMessage" placeholder="输入消息..." />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { loadRouteLocation } from 'vue-router';
  import { jwtDecode } from 'jwt-decode';
  export default {
    props: ['myId', 'toUserId'],
    data() {
      return {
        //myId: '',
        myInfo:{},
        toUser: {},
        messages: [],
        newMessage: ''
      };
    },
    created() {
      const token = localStorage.getItem('token');
      if (!token){
        alert('请先登录，再进行对话！');
        this.$route.push('/login');
      }
      this.myInfo = jwtDecode(token);
      console.log('获取发送者用户名:', this.myInfo.username);
      
      // 发起 HTTP 请求接收者信息
      axios.get(`http://localhost/backEnd/user/detail?userId=${this.toUserId}`)
      .then(response => {
          this.toUser = response.data.data;
          console.log('获取接收者用户请求返回报文：', response);
          console.log('获取接收者用户名:',  this.toUser);
      })
      this.fetchChatMessages();
    },
    methods: {
      async fetchChatMessages() {
        try {
          const response = await axios.get(`http://localhost/backEnd/chat/list?myId=${this.myInfo.id}&toUserId=${this.toUserId}`);
          this.messages = response.data;
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch chat messages:', error);
        }
      },
      async sendMessage() {
        try {
          const toUserIdInt = parseInt(this.toUserId);
          if (this.newMessage != null) {
            await axios.post('http://localhost/backEnd/chat/sendMassage', {
              myId: this.myId,
              toUserId: toUserIdInt,
              content: this.newMessage
            });
          }else {
            console.error('输入内容不能为空！');
          }

          // 清空输入框
          this.newMessage = '';
          // 重新获取消息列表
          this.fetchChatMessages();
        } catch (error) {
          console.error('Failed to send message:', error);
        }
      }
    }
  };
  </script>
  
  <style>
  .chat-container {
    margin: 80px 20px 10vh 20px;
    display: flex;
    flex-direction: column;
    height: 90vh;
    background-color: #ebebeb;
  }
  
  .chat-input {
    position: fixed;
    bottom: 0;
    width: 95%;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  
  .chat-input input {
  flex: 1;
  padding: 5px;
  margin-right: 10px;
  width: 100%; /* 设置宽度为100% */
  box-sizing: border-box; /* 内边距和边框不会增加宽度 */
}

.chat-input button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: auto; /* 按钮水平居中 */
}
  .chat-header{
      height: 100%;
      width: 100%;
    }
  .chat-sender{
      clear:both;
      font-size: 80%;
    }
    .chat-sender div:nth-of-type(1){

      float: left;
      height: 40px;
      width: 40px;
    }

    .chat-sender div:nth-of-type(2){
      margin: 0 50px 2px 50px;
      padding: 0px;
      color: #848484;
      font-size: 70%;
      text-align: left;
    }
    .chat-sender div:nth-of-type(3){
      text-align: left;
      background-color: white;
      /*float: left;*/
      margin: 0 50px 10px 50px;
      padding: 10px 10px 10px 10px;
      border-radius:7px;
      text-indent: -12px;
    }
    .chat-receiver{
      clear:both;
      font-size: 80%;
    }
    .chat-receiver div:nth-of-type(1){
      float: right;
      height: 40px;
      width: 40px;
    }
    .chat-receiver div:nth-of-type(2){
      margin: 0px 50px 2px 50px;
      padding: 0px;
      color: #848484;
      font-size: 70%;
      text-align: right;
    }
    .chat-receiver div:nth-of-type(3){
      /*float:right;*/
      background-color: #b2e281;
      margin: 0px 50px 10px 50px;
      padding: 10px 10px 10px 10px;
      border-radius:7px;
      text-align: right;
    }

    #chat-left_triangle{
      height: 0px;
      width: 0px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent white transparent transparent;
      position: relative;
      left: -22px;
      top: 3px;
    }
    #chat-right_triangle{
      height: 0px;
      width: 0px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent transparent #b2e281;
      position: relative;
      right:-22px;
      top:3px;
    }
    .chat-container span {
      font-size: 20px; /* 设置字体大小为16px */
      font-weight: bold; /* 加粗字体 */
    }
  </style>
  