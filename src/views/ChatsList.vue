<!-- ChatPage.vue -->
<template>
  <div class="chat-container">
    <div class="chat-header">{{ myInfo.username }}的对话列表</div>
    <ul v-for="(chat,index) in chats" :key="index" class="chat-list">
        <li class="chat-item" @click="redirectToChat(chat.toUserId)">
            <img :src="chat.toUserHeader" alt="用户1" class="user-avatar">
            <div class="chat-content">
                <div class="myuser-info">
                  <div class="user-name">{{chat.toUsername}}</div>
                  <div class="message-time">{{chat.lastSendTime}}</div>
                </div>
                <div class="message-content">{{chat.lastMessage}}</div>
            </div>
        </li>
        <!-- 添加更多用户的对话项 -->
    </ul>
</div>
  </template>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  export default {
    inject:['updateNavState'],
    props: ['myId', 'toUserId'],
    data() {
      return {
        myId: -1,
        myInfo: {},
        chats: [],
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
      this.myInfo = jwtDecode(token);
      this.myId = this.myInfo.id;
      console.log('登录用户,' , this.myInfo.id);
      this.fetchChatMessages();
    },
    methods: {
      async fetchChatMessages() {
        try {
          const response = await axios.get(`http://localhost/backEnd/chat/myChats?myId=${this.myId}`);
          this.chats = response.data;
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch chat messages:', error);
        }
      },
      redirectToChat(toUserId){
        this.$router.push(`/chat?toUserId=${toUserId}`);
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
  }
  
  .chat-container {
    max-width: 80%;
    max-height: 80%;
    margin: 80px auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .chat-header {
    height: 5%;
    padding: 15px;
    background-color: #4fc08d;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  
  .chat-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    flex-grow: 1;
  }

  .chat-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .chat-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
  }
  
  .chat-item:last-child {
    border-bottom: none;
  }
  
  .chat-item:hover {
    background-color: #f0f0f0;
  }
  
  .myuser-info {
    margin-left: 0;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 20%;
    margin-right: 15px;
  }
  
  .user-name {
    font-weight: bold;
    margin-bottom: 5px;
    margin-right: 20px;
  }
  
  .message-time {
    color: #999;
    margin-left: auto;
    margin-right: 50px; /* 留出适当的右侧间距 */
  }
  
  .message-content {
    height: 70%;
    max-height: 70px;
    width: 100%;
    overflow: hidden; /* 可选，控制文本溢出时的处理方式 */
    color: #999;
    font-size: 14px;
    margin-top: 5px;
  }
  </style>