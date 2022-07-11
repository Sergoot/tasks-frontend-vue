import { createRouter, createWebHashHistory } from "vue-router";
import Tasks from "./components/Tasks.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import CompleteTasks from "./components/CompleteTasks.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes : [
        { path: '/', redirect:'/tasks' },
        { path: '/tasks', component: Tasks },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/tasks/completed', component: CompleteTasks },
    ]

})
