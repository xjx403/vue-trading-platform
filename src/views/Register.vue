<!-- Register.vue -->
<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register" class="register-container">
        <label for="newUsername">Username:</label>
        <input type="text" id="newUsername" v-model="newUsername" required />
        <br><br/>
        <label for="newPassword">Password:</label>
        <input type="password" id="newPassword" v-model="newPassword" required />
        <br><br/>
        <button type="submit">Register</button>
      </form>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        newUsername: '',
        newPassword: ''
      };
    },
    methods: {
      register() {
        // 调用注册API
        console.log('Register', this.newUsername, this.newPassword);
      }
    }
  };
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
  