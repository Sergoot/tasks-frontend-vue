<template>
<div class="greet"><h1>Здравствуйте, войдите, используя данную форму.</h1> <h5> Данный сервис поможет вам с планированием ваших задач и напомнит вам об их дедлайне.</h5></div>
<form class="login-form" v-on:submit.prevent="submitForm">
<div class="form-inner">
   <div class="errors" v-if="errors.username">
   <small class="text-danger" v-for="err in errors.username" >{{err}}</small>
   </div>
      <div class="form-group">
         <label for="login">Логин</label>
         <input class="form-control" type="text" id="login" v-model="username">
      </div>
       <div class="errors" v-if="errors.password">
         <small class="text-danger" v-for="err in errors.password" >{{err}}<br></small>
      </div>
      <div class="form-group">
         <label for="pass">Пароль</label>
         <input class="form-control" type="password" id="pass" v-model="pass">
      </div>
   <div class="form-group">
      <button class="btn" type="submit">Войти</button>
      <p> Нет аккаунта? <router-link to="/register">Регистрация</router-link></p>
   </div>
   </div>
   </form>
   
</template>

<script>

import axios from 'axios'
import {useLoggedInUserStore} from '@/stores/users'



   export default {
        data: () => ({
            errors: [],
            username:'',
            pass: '',

        }),
        methods: {
         async submitForm(){
                try {
                    // Send a POST request to the API
                    const response = await axios.post('http://127.0.0.1:8001/api/v1/auth/token/login/', {
                        username: this.username,
                        password: this.pass,
                    });
                    const store = useLoggedInUserStore()
                    store.$patch({
                     isAuth: true,
                     username: this.username
                     })
                     this.username = ''
                    this.pass = ''
                    this.$router.push('/tasks')
                    localStorage.auth_token = response.data.auth_token;
                    console.log(response.data.auth_token)
                } catch (error) {
                    console.log(error)
                           this.errors = error.response.data
        }
   }
        }
   }

</script>

<style scoped>
.login-form{
   width: 30%;
   margin-left: 35vw;
   margin-right: 35vw;
   margin-top: 5vw;
   border-color: black;
}
@media (max-width: 768px){
.login-form{
  width: 70vw;
  margin-left: 15vw;
   margin-right: 15vw;
   margin-top: 5vw;
}
}
.form-inner{
   border-radius: 30px;
   border: 3px solid cornflowerblue;
   padding:10%;
}
.greet{
   margin-top:10%
}
.btn{
    margin-top: 3%;
    margin-bottom: 3%;
    border-color:#ced4da;
    color:black;
}
.btn:active{
    background-color: white;
    color: white;
}
.btn:hover{
    background-color:cornflowerblue;
    color: white;
    border-color: cornflowerblue;
}
</style>