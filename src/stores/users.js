import { defineStore } from 'pinia';

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: () => ({
  isAuth: false,
  username: null,
   }),

  getters: {
  getisAuth(state) {
  return state.isAuth;
    },
  getUsername(state) {
  return state.username;
   }
  },
 actions: {
  setUser(user) {
  this.user = user;
  },
  setAuth(boolean) {
  this.isAuth = boolean;
   }
}
});