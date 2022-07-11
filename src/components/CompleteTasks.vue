<template>

<div class="tasks_container">
            <div class="row row-cols-1 row-cols-md-2 g-4">
  
            <div class="card" v-for="task in tasks" :key="task.id">
                    <div class="col">
                <div class="card-body">

                    <div class="title_wrapper"><h5 class="card-title">{{ task.title }}<br>{{task.date_published.split('T')[0]}}</h5></div>
                    <p class="card-text">{{ task.body }}</p>
                    <p>Дедлайн: {{ task.deadline }}</p>
                    <div class="tags_container"><div class="tag_wrapper"  v-for="tag in task.tags" :key="tag.id"><span class="tag" > {{tag}}</span></div></div>
                    
                    <button type="button" class="del btn btn-outline-primary" @click="deleteTask(task)">Удалить</button>
            </div>
                </div>
        </div>
        </div>
        </div>


</template>

<script> 
import axios from 'axios';
export default{
    data: () => ({
            tasks: [],
        }),
    
    methods: {
        async getData() {
                try {
                    const response = await axios.get('http://localhost:8001/api/v1/tasks/completed',{
                        headers:{'Authorization':`Token ${localStorage.auth_token} `}
                    });
                    this.tasks = response.data; 
                } catch (error) {
                    console.log(error);
                }
            },
        async deleteTask(task){
        try{
        await axios.delete(`http://localhost:8001/api/v1/tasks/${task.id}/`,{
            headers:{'Authorization':`Token ${localStorage.auth_token}`},
        });
        this.getData();
        }catch(error){
        console.log(error)
        }
        }
    },
    created(){
        this.getData();
    }
}

</script>

<style scoped>

@media (min-width: 768px){
.card {
    margin-left: 1%;
}

.row-cols-md-2>* {
    flex: 0 0 auto;
    width: 32.333333%;
}
}
.tag {
    background-color: crimson;
    border-radius: 5px;
    color: aliceblue;
    width: 90px;
    padding: 0.5vw;
    top: 0; right: 0;
    margin-top: 1vw;
    margin-right: 1vw;
    font-size:14px;
    
    }
.tasks_container{
    width: 80wv;
    margin-left:10vw;
    margin-right: 10vw;
    margin-top: 10px;
}
.tags_container{
    position:absolute;
    right:0;top:0;
    margin-top: 0.3vw;
    margin-right: 0.3vw;
}   
.tag_wrapper{
    margin-top: 0.7vw;
}
.title_wrapper{
    position: relative;
}
.btn{
    margin-left:3%;
    color:black;
    border-color: black;
}
.btn:active{
    background-color: white;
}
.btn:hover{
    background-color:cornflowerblue;
    color: white;
    border-color: cornflowerblue;
}
.del:hover{
    background-color: crimson;
    color: white;
    border-color: crimson;
}
.complete-btn:hover{
    background-color:forestgreen;
    color: white;
    border-color: forestgreen;
}
.btn-outline-primary:hover{
    --bs-btn-hover-bg: white;
}
 </style>   