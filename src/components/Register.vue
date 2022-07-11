<template>
   <h1>Зарегистрируйтесь</h1> 
   <form class="login-form" v-on:submit.prevent="submitForm">
   <div class="form-inner">
   <div class="errors" v-if="errors.username">
   <small class="text-danger" v-for="err in errors.username" >{{err}}</small>
   </div>
      <div class="form-group">
         <label for="login">Логин</label>
         <input class="form-control" type="text" id="login" v-model="username">
      </div>
      <div class="errors" v-if="errors.email">
   <small class="text-danger" v-for="err in errors.email" >{{err}}</small>
   </div>
      <div class="form-group">
         <label for="email">Почта</label>
         <input class="form-control" type="email" id="email" v-model="email">
      </div>
       <div class="errors" v-if="errors.password">
         <small class="text-danger" v-for="err in errors.password" >{{err}}<br></small>
      </div>
      <div class="form-group">
         <label for="pass">Пароль</label>
         <input class="form-control" type="password" id="pass" v-model="pass">
      </div>
      <div class="form-group">
         <label for="pass1">Повторите пароль</label>
         <input class="form-control" type="password" id="pass1" v-model="pass1">
      </div>
   <div class="form-group">
       <button class="btn" type="submit">Регистрация</button>
        <p> Есть аккаунт? <router-link to="/login">Войти</router-link></p>
   </div>
   </div>
   </form>
</template>

<script>
import axios from 'axios'
   export default {
        data: () => ({
            errors: [],
            username:'',
            email:'',
            pass: '',
            pass1: '',
            clean_pass: ''

        }),
        methods: {
         checkToken(){
            if (localStorage.auth_token){
               localStorage.removeItem('auth_token');
               }
         },
         cleanPass(pass,pass1){
            if (pass == pass1){
                  this.clean_pass = pass;
            }
            else {
               console.log(pass)
               console.log(pass1)
               this.errors.password.push('Пароли не совпадают')
               return true
            }

         },
         async submitForm(){
            console.log(this.username)
               if (this.cleanPass(this.pass,this.pass1)){
                  return false;
               }
                try {
                    // Send a POST request to the API
                    const response = await axios.post('http://127.0.0.1:8001/api/v1/auth/users/', {
                        username: this.username,
                        email: this.email,
                        password: this.clean_pass,
                    });
                    this.checkToken()
                    this.username = ''
                    this.email = ''
                    this.pass = ''
                    this.pass1 = ''
                    this.$router.push('/')
                } catch (error) {
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