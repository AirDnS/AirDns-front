import {createRouter, createWebHistory} from "vue-router";
import UserLogin from "@/components/user/UserLogin.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeFooter from "@/components/home/HomeFooter.vue";


const routes = [
    {
        path:"/",
        components: {
            default : HomeMain,
            header : HomeHeader,
            footer : HomeFooter
        }
    },
    {
        path: "/login", // login.vue로 이동할 Path
        name: "UserLogin", // router name
        component: UserLogin, // Path로 이동될 Component
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;