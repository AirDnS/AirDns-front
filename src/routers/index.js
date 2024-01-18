import {createRouter, createWebHistory} from "vue-router";
import HomeMain from "@/components/home/HomeMain.vue";
import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeFooter from "@/components/home/HomeFooter.vue";
import LoginMain from "@/components/login/LoginMain.vue";
import LoginHeader from "@/components/login/LoginHeader.vue";
import RoomDetailMain from "@/components/roomdetail/RoomDetailMain.vue";
import RoomDetailHeader from "@/components/roomdetail/RoomDetailHeader.vue";
import RoomDetailFooter from "@/components/roomdetail/RoomDetailFooter.vue";
import ReservationCheckMain from "@/components/reservation/ReservationCheckMain.vue";
import ReservationCheckHeader from "@/components/reservation/ReservationCheckHeader.vue";
import LoginRedirect from "@/components/login/LoginRedirect.vue";

import UserDetailMain from "@/components/userdetail/UserDetailMain.vue";
import UserDetailHeader from "@/components/userdetail/UserDetailHeader.vue";
import CheckoutView from "@/components/payment/CheckoutView.vue";
import SuccessView from "@/components/payment/SuccessView.vue";
import FailView from "@/components/payment/FailView.vue";
import LogoutRedirect from "@/components/Logout/LogoutRedirect.vue";

const routes = [
    {
        path:"/",
        name:"HomePage",
        components: {
            default : HomeMain,
            header : HomeHeader,
            footer : HomeFooter
        }
    },
    {
        path: "/login", // login.vue로 이동할 Path
        name: "LoginPage", // router name
        components: {
            default: LoginMain,
            header : LoginHeader
        }
    },
    {
        path: "/detail",
        name: "RoomDetail",
        components: {
            default: RoomDetailMain,
            header : RoomDetailHeader,
            footer : RoomDetailFooter
        }
    },
    {
        path: "/reservation",
        name: "ReservationChecking",
        components: {
            default : ReservationCheckMain,
            header : ReservationCheckHeader
        }
    },
    {
        path: "/userdetail",
        name: "UserDetailPage",
        components: {
            default : UserDetailMain,
            header : UserDetailHeader
        }
    },
    {
        path: '/login/oauth2/redirect',
        name: "LoginRedirect",
        components: {
            default: LoginRedirect
        }
    },
    {
        path: '/unlink/oauth2/redirect',
        name: "LogoutRedirect",
        components: {
            default: LogoutRedirect
        }
    },
    {
        path: "/payment",
        name: "redirectToCheckout",
        components: {
            default: CheckoutView
        }
    },
    {
        path: '/success', // 성공 페이지 경로
        name: 'paymentSuccess',
        component: SuccessView,
    },
    {
        path: '/fail', // 실패 페이지 경로
        name: 'paymentFail',
        component: FailView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;