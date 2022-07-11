<template>
<nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid" v-if="getisAuth">
       <h3><a class="navbar-brand" href="#">
          <img src="/logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
          Tasks
        </a>
        </h3>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
         
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
            <h4><router-link class="nav-link" to="/tasks/completed" style="text-decoration: none;">Выполненные<br></router-link></h4>
          </li>
              <li class="nav-item">
              <h4><router-link class="nav-link" to="/tasks" style="text-decoration: none;">Список задач</router-link></h4>
              </li>
              <li class="nav-item">
            
             </li>
             <li class="login nav-item">
              <h3><b>{{getUsername}}</b></h3>
              </li>
              <button class='logout btn btn-outline-primary' @click="logout">Выйти</button>
        </ul>
        
      
            
             
             
             
    

        </div>
        
      </div>
    </nav>
</template>


<script setup>

import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import {useLoggedInUserStore} from '@/stores/users'
const { getisAuth, getUsername } = storeToRefs(useLoggedInUserStore())
const store = useLoggedInUserStore()
const router = useRouter()
function logout(){
                try{
                    console.log(localStorage.auth_token)
                    axios.post('http://127.0.0.1:8001/api/v1/auth/token/logout/',{},
                    { headers:{'Authorization':`Token ${localStorage.auth_token}`}})
                    localStorage.removeItem('auth_token');
                    localStorage.clear()
                    router.push('/login')
                    store.$reset()
                } catch(error){
                    console.log(error);
                }
            }


</script>
<style scoped>
@media (min-width: 768px){
.login{
  margin-left: 63vw;
  margin-right: 2vw;
}
}
.btn:hover{
    background-color:cornflowerblue;
    color: white;
    border-color: cornflowerblue;
}
.btn{
    color:black;
    border-color: black;
}
</style>