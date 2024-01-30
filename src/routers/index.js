import {createRouter, createWebHistory} from "vue-router";
import HomeMain from "@/components/home/HomeMain.vue";
import HomeHeader from "@/components/home/HomeHeader.vue";
import HomeFooter from "@/components/home/HomeFooter.vue";
import LoginMain from "@/components/login/LoginMain.vue";
import LoginHeader from "@/components/login/LoginHeader.vue";
import RoomDetailMain from "@/components/roomdetail/RoomDetailMain.vue";
import RoomDetailHeader from "@/components/roomdetail/RoomDetailHeader.vue";
import RoomDetailFooter from "@/components/roomdetail/RoomDetailFooter.vue";
import RoomListMain from "@/components/roomlist/RoomListMain.vue";
import ReservationListMain from "@/components/reservationlist/ReservationListMain.vue";
import LoginRedirect from "@/components/login/LoginRedirect.vue";

import UserDetailMain from "@/components/userdetail/UserDetailMain.vue";
import SidebarHeader from "@/components/sidebar/SidebarHeader.vue";
import CheckoutView from "@/components/payment/CheckoutView.vue";
import SuccessView from "@/components/payment/SuccessView.vue";
import FailView from "@/components/payment/FailView.vue";
import RoomCreate from "@/components/room/RoomCreate.vue";
import RoomEdit from "@/components/room/RoomEdit.vue";
import LogoutRedirect from "@/components/Logout/LogoutRedirect.vue";
import UpdateUserInfoMain from "@/components/updateuserinfo/UpdateUserInfoMain.vue";
import UpdateUserInfoHeader from "@/components/updateuserinfo/UpdateUserInfoHeader.vue";
import LoginDetail from "@/components/login/LoginDetail.vue";

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
        path: "/loginDetail",
        name: "LoginDetailPage", // router name
        components: {
            default: LoginDetail,
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
        path: "/createRoom",
        name: "CreateRoom",
        components: {
            default: RoomCreate,
        }
    },
    {
        path: "/editRoom",
        name: "EditRoom",
        components: {
            default: RoomEdit,
            header : RoomDetailHeader
        }
    },

    {
        path: "/userdetail",
        name: "UserDetailPage",
        components: {
            default : UserDetailMain,
            header : SidebarHeader
        }
    },
    {
        path: "/roomlist",
        name: "RoomListPage",
        components: {
            default : RoomListMain,
            header : SidebarHeader
        }
    },
    {
        path: "/reservationlist",
        name: "ReservationListPage",
        components: {
            default : ReservationListMain,
            header : SidebarHeader
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
        components: {
            default: SuccessView
        }
    },
    {
        path: '/fail', // 실패 페이지 경로
        name: 'paymentFail',
        component: FailView,
    },
    {
        path: "/updateuserinfo",
        name: "UserUpdatePage",
        components: {
            default : UpdateUserInfoMain,
            header : UpdateUserInfoHeader
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;