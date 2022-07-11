<template>

<TheHeader />
            <router-view></router-view>
</template>


<script>
import { ref, toRef} from "vue";
import axios from 'axios'
import Login from './components/Login.vue'
import TheHeader from './components/TheHeader.vue'
import {useLoggedInUserStore} from './stores/users'
import { storeToRefs } from 'pinia'
export default {
  components: {
    TheHeader,
    Login
  },
  name: "App",
  data: () => ({
      username: localStorage.username,
      email: localStorage.email,
    
  }),

  methods: {
    Navbar(){
      if (localStorage.auth_token){
        this.is_auth = true;
        const store = useLoggedInUserStore()
        store.$patch({
                     isAuth: true,
                     username: this.username
                     })
        
      }else{
        this.$router.push('/login')
      }
    },
    async logOut(){
                try{
                    console.log(localStorage.auth_token)
                    await axios.post('http://127.0.0.1:8001/api/v1/auth/token/logout/',{},
                    { headers:{'Authorization':`Token ${localStorage.auth_token}`}})
                    localStorage.removeItem('auth_token');
                    localStorage.clear()
                    this.$router.push('/login')
                    this.is_auth = false;
                } catch(error){
                    console.log(error);
                }
            },
  },
  created(){
    this.Navbar()
  },
  watch: {
      is_auth(){
        this.Navbar()
      }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navb{
  margin-left:2vw; 
}

</style>