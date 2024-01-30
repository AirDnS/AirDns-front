<template>
    <v-card-text>
        <div class="d-sm-flex align-center">
            <div>
            <h2 class="title text-h6 font-weight-medium">휴무 목록</h2>
            </div>
        </div>
        <v-table fixed-header class="month-table mt-7">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">ID</th>
                <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">시작시간</th>
                <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">종료시간</th>
                <th class="icon-column"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="table?.length == 0">
                <td colspan="5" class="text-center"> 데이터가 없습니다.</td>
                </tr>
                <tr
                v-for="item in table"
                :key="item.roomsId"
                :class="item.activestate"
                class="month-item"
                >
                <td class="text-center">{{ item.id }}</td>
                <td>
                    <h5
                    class="
                        font-weight-medium
                        text-no-wrap text-body-2 text-grey-darken-1
                        text-center
                    "
                    >
                    {{ item.startTime }}
                    </h5>
                </td>
                <td>
                    <h5
                    class="
                        font-weight-medium
                        text-no-wrap text-body-2 text-grey-darken-1
                        text-center
                    "
                    >
                    {{ item.endTime }}
                    </h5>
                </td>
                <td class="icon-column">
                    <v-menu location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi mdi-dots-horizontal" variant="plain" size="x-small" v-bind="props"></v-btn>
                    </template>
                    <v-list density="compact" min-width="160">
                        <v-list-item @click="cancelRestSchedule(item.id)">
                        <template v-slot:prepend><v-icon end icon="mdi mdi-delete" size="small"></v-icon></template>
                        <v-list-item-title class="font-weight-medium text-no-wrap text-body-2 text-grey-darken-3">삭제</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    </v-menu>
                </td>
                </tr>
            </tbody>
            </template>
        </v-table>
        <v-pagination class="pagination mb-2 mt-6" size="small" v-model="page.pageNumber" :length="page.totalPages" @update:modelValue="getRestScheduleList"></v-pagination>
    </v-card-text>


    <v-dialog
            v-model="dialog"
            persistent
            width="auto"
        >
        <template v-slot:activator="{ props }">
            <v-btn
                class="float-right mt-5"
                color="primary"
                v-bind="props"
            >
            휴무 추가
            </v-btn>
        </template>
        <v-card class="pa-5">
            <v-card-title>
            <span class="text-h5 mt-5">휴무 시간 선택</span>
            </v-card-title>

            <CustomDatePicker
                :reservatedTimeList="this.reservatedTimeList"
                :restScheduleList="this.restScheduleList"
                @select="selectRestDate"
            ></CustomDatePicker>

            <v-card-actions class="pa-0">
            <v-spacer></v-spacer>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="dialog = false"
            >
                닫기
            </v-btn>
            <v-btn
                color="blue-darken-1"
                variant="text"
                @click="addRestDate"
            >
                추가
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>
<script>
import { ref } from 'vue';
import axios from '@/axios';
import router from "@/routers";
import CustomDatePicker from "@/components/unit/CustomDatePicker.vue"
  
export default {
    components: {
        CustomDatePicker
    },
    props: ['roomsId', 'reservatedTimeList'],
    data() {
        return {
            page: {
            pageNumber: 1,
            totalPages: 1,
            },
            // select: "예약중",
            // items: ["예약중", "전체"],
            table: [],

            selectRestTimes: [],
            
            dialog: false,
            delReservationId: null,
            delDialog: false,
        }
    },
    methods: {
        getRestScheduleList: function () {
            axios.get(`/api/v1/rooms/${this.roomsId}/restschedule`, {
            withCredentials: true, 
            params: {
                page: this.page.pageNumber - 1
            }})
                .then((result) => {
                this.table = result.data.data.content;
                this.page.pageNumber = result.data.data.pageable.pageNumber + 1;
                this.page.totalPages = result.data.data.totalPages;
                
                this.restScheduleList = [];
                this.table.forEach((item) => {
                    this.restScheduleList.push(
                        [item.startTime, item.endTime]
                    )
                    
                })
                console.log(this.table);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
            })
        },
        cancelRestSchedule: function (restscheduleId) {
        this.$swal.fire({
            title: "휴무를 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "네",
            cancelButtonText: "아니오"
        }).then((swalResult) => {
            if (swalResult.isConfirmed) {
            console.log(restscheduleId);
            axios.delete(`/api/v1/rooms/${this.roomsId}/restschedule/` + restscheduleId,  {withCredentials: true})
                .then((result) => {
                    this.$swal.fire({
                        title: "삭제되었습니다.",
                        icon: "success"
                    });
                    console.log( result.data.message );
                    this.getRestScheduleList();
                })
                .catch((error) => {
                    if (error.response?.status == 403) {
                        this.$swal({
                        icon: "error",
                        title: "권한이 없습니다."
                        });
                    }
                console.log(error);
                })
                .finally(() => {
                })
            }
        });
        },
        goRoomPage(roomsId) {
            router.push({
                name: 'RoomDetail',
                state: {
                    data: roomsId,
                }
            })
        },
        selectRestDate(data) {
            this.selectRestTimes = data;
        },
        addRestDate: function () {
            this.dialog = false;
            let params = this.selectRestTimes;
            axios.post(`/api/v1/rooms/${this.roomsId}/restschedule`, params, {withCredentials: true})
                .then(() => {
                    this.getRestScheduleList();
                })
                .catch((error) => {
                    this.$swal.fire({
                        title: "휴무 추가에 실패했습니다!",
                        icon: "error"
                    });
                    console.log(error);
                })
                .finally(() => {
                    console.log("test");
                })
        },

    },
    mounted() {
        this.getRestScheduleList();
    },
    setup() {
        const restScheduleList = ref([]);

        return { restScheduleList };
    }

}

</script>

<style scoped>
.icon-column {
    text-align: center;
    min-width: 60px;
}
</style>