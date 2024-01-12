import {createRouter, createWebHistory} from "vue-router";
import LoginMain from "@/components/user/LoginMain.vue";
import HomeMain from "@/components/home/HomeMain.vue";
import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeFooter from "@/components/home/HomeFooter.vue";
import LoginHeader from "@/components/user/LoginHeader.vue";


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
        components: {
            default : LoginMain,
            header : LoginHeader
        } // Path로 이동될 Component
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;