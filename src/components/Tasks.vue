<template>
    
        <div class="tasks_content">
            
            <h1>Ваши запланированные задачи</h1>
            <button type="button" class="btn" @click="showDialog" >Добавить задачу</button>
            <div class="tasks_container">
            <div class="row row-cols-1 row-cols-md-2 g-4">
  
            <div class="card" v-for="task in tasks" :key="task.id">
                    <div class="col">
                <div class="card-body">

                    <div class="title_wrapper"><h5 class="card-title">{{ task.title }}<br>{{task.date_published.split('T')[0]}}</h5></div>
                    <p class="card-text">{{ task.body }}</p>
                    <p>Дедлайн: {{ task.deadline }}</p>
                    <div class="tags_container"><div class="tag_wrapper"  v-for="tag in task.tags" :key="tag.id"><span class="tag" > {{tag}}</span></div></div>
                    <button type="button" class="complete-btn btn btn-outline-primary" @click="completeTask(task)">
                        {{ task.is_completed ? 'Отменить' : 'Выполнено' }}
                    </button>
                    <button type="button" class="del btn btn-outline-primary" @click="deleteTask(task)">Удалить</button>
            </div>
                </div>
        </div>
        </div>
        </div>
        </div>
        
    <my-dialog v-model:show="dialogVisible" >
                            <form v-on:submit.prevent="submitForm">
                            <div class="errors" v-if="errors.title">
                                <small class="text-danger" v-for="err in errors.title" >{{err}}</small>
                            </div>
                        <div class="form-group">
                            <label for="title">Заголовок</label>
                            <input type="text" class="form-control" id="title" v-model="title">
                        </div>
                        <div class="errors" v-if="errors.body">
                                <small class="text-danger" v-for="err in errors.body" >{{err}}</small>
                            </div>
                        <div class="form-group">
                            <label for="description">Описание</label>
                            <textarea class="form-control" id="description" v-model="body"></textarea>
                        </div>
                        <div class="errors" v-if="errors.deadline">
                                <small class="text-danger" v-for="err in errors.deadline" >{{err}}</small>
                            </div>
                        <div class="form-group">
                            <label for="date">Дедлайн</label>
                        <input type="date" id="date" class="form-control" :min="datemin" :max="datemax" v-model="deadline">
                        </div>
                            <div class="errors" v-if="errors.tags">
                                <small class="text-danger" v-for="err in errors.tags" >{{err}}</small>
                            </div>
                        <div class="form-group" v-for="tag in tags">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" v-model="tag.selected"> {{tag.tag_name}}
                             <button type="button" class="del btn btn-outline-primary" @click="deleteTag(tag)">-</button>
                        </label>
                        </div>
                           
                        <div class="form-group">
                            <button class=" btn-task btn" type="submit">Новая задача</button>
                        </div>
                    </form> 
                    <button type="button" class="btn-task btn" @click="newTag">Создать тэг</button>
    </my-dialog>
    

    
 <my-dialog  v-model:show="dialogTagVisible">
    <form v-on:submit.prevent="submitTag" >
                            <div class="errors" v-if="errors.tag_name">
                                <small class="text-danger" v-for="err in errors.tag_name" >{{err}}</small>
                            </div>
        <input class="tag-input form-control" type="text" placeholder="Тэг" v-model="tagname">
        <button class="tag-btn btn" type="submit"><b>+</b></button>
    </form>
</my-dialog>

</template>

<script>
import axios from 'axios'
import {ref} from "vue";
    export default {
        data: () => ({
            tasks: [],
            errors: [],
            tags: [],
            title: '',
            body: '',
            deadline: '',
            tags_add: [],
            dialogVisible : false,
            dialogTagVisible : false,
            tagname: '',
        }),
            
        methods: {
            selectedNames() {
                return this.tags.filter(tag => tag.selected).map(tag => tag.tag_name);
            },
            newTag(){
                this.dialogTagVisible=true;
            },
            async submitTag(){
                try{
                    this.errors = []
                await axios.post(import.meta.env.VITE_HOST+'api/v1/tags', {
                        tag_name: this.tagname,
                    },{
                        headers:{'Authorization':`Token ${localStorage.auth_token}`}
                    });
                    this.getTags();
                    this.dialogTagVisible = false;
                }catch(error){
                    this.errors = error.response.data
                }
            },
            async getAcc(){
                if (localStorage.auth_token){
                    const response = await axios.get(import.meta.env.VITE_HOST+'api/v1/auth/users/me',
                    { headers:{'Authorization':`Token ${localStorage.auth_token}`}})
                    localStorage.username = response.data.username
                }
                else{
                    this.$router.push('/login')
                }
            }, 
            showDialog(){
                this.dialogVisible=true;
                this.getTags();
            },
            async getTags() {
                const response = await axios.get(import.meta.env.VITE_HOST+'api/v1/tags',{
                        headers:{'Authorization':`Token ${localStorage.auth_token} `}
                    });
                    this.tags = response.data
                    this.tags.forEach(element => {
                        element['selected'] = false
                    });
            },
            getDate(){
                return new Date()
            },
            async getData() {
                try {
                    const response = await axios.get(import.meta.env.VITE_HOST+'api/v1/tasks/',{
                        headers:{'Authorization':`Token ${localStorage.auth_token} `}
                    });
                    this.tasks = response.data; 
                } catch (error) {

                }
            },
            async submitForm(){
                this.errors = []
                try {
                    const response = await axios.post(import.meta.env.VITE_HOST+'api/v1/tasks/', {
                        title: this.title,
                        body: this.body,
                        completed: false,
                        deadline: this.deadline,
                        tags: this.selectedNames(),
                    },{
                        headers:{'Authorization':`Token ${localStorage.auth_token}`}
                    });
                    this.tasks.push(response.data);
                    this.title = '';
                    this.description = '';
                    this.getData();
                    this.dialogVisible = false;
                } catch (error) {

                    this.errors = error.response.data
                }
},
            async completeTask(task){
                 try{
        const response = await axios.patch(import.meta.env.VITE_HOST+`api/v1/tasks/${task.id}/`,
            { is_completed: !task.is_completed,}, 
            { headers:{'Authorization':`Token ${localStorage.auth_token}`},
        });
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);
        this.tasks = this.tasks.map((task) => {
            if(this.tasks.findIndex(t => t.id === task.id) === taskIndex){
                return response.data;
            }
            return task;
        });
        this.getData();
    }catch(error){

        this.errors = error.response.data;
        }
    },
        async deleteTask(task){
        try{
        await axios.delete(import.meta.env.VITE_HOST+`api/v1/tasks/${task.id}`,{
            headers:{'Authorization':`Token ${localStorage.auth_token}`},
        });
        this.getData();
        }catch(error){
            this.errors = error.response.data;
        } 
},
        async deleteTag(task){
        try{
        await axios.delete(import.meta.env.VITE_HOST+`api/v1/tags/${task.id}`,{
            headers:{'Authorization':`Token ${localStorage.auth_token}`},
        });
        this.getTags();
        }catch(error){
        this.errors = error.response.data;
        } 
}
},
        created() {
            console.log(import.meta.env.VITE_HOST)
            this.getAcc();

            this.getData();
            this.date = new Date()
            this.date.setDate(this.date.getDate() + 1)
            this.datemin = this.date.toISOString().split('T')[0]
            this.datemax = new Date()
            this.datemax.setDate(this.datemax.getDate() + 60)
            this.datemax = this.datemax.toISOString().split('T')[0]
            
        },  
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
    width: 110px;
    padding: 0.5vw;
    top: 0; right: 0;
    margin-top: 1vw;
    margin-right: 1vw;
    font-size:16px;

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
    color: white;
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
.tag-input{
    width:70%;
    display:inline;
}
.tag-btn{
    border-color:#ced4da;
    color:gray;
}
.btn-task{
    margin-top: 3%;
}
label {
    display:inline;
}
 </style>       
