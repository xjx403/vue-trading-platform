// 导入 Vuex 库
import { createStore } from 'vuex';

// 创建 Vuex 的 store 实例
const store = createStore({
  // 定义状态
  state: {
    user: {},
    token: ''
  },
  // 定义变更方法
  mutations: {
        // 定义 mutation 更新 user 对象
        setUser(state, newUser) {
            state.user = newUser;
        },
        // 定义 mutation 更新 token 属性
        setToken(state, newToken) {
            state.token = newToken;
        },
    },
    actions: {
        // 定义 action 更新 user 对象
        setUserAction(context, newUser) {
          context.commit('setUser', newUser);
        },
        // 定义 action 更新 token 属性
        setTokenAction(context, newToken) {
          context.commit('setToken', newToken);
        },
    },
      getters: {
        // 定义 getter 获取 user 对象
        getUser(state) {
          return state.user;
        },
        // 定义 getter 获取 token 属性
        getToken(state) {
          return state.token;
        },
    }
    
});

// 导出 Vuex 的 store 实例
export default store;
