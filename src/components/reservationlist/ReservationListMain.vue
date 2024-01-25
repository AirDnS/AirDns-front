<template>
  <v-card flat class="w-100 h-100">
    <v-card-text>
      <div class="d-sm-flex align-center">
        <div>
          <h2 class="title text-h6 font-weight-medium">예약 목록</h2>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-select
            v-model="select"
            :items="items"
            variant="outlined"
            dense
            hide-details
          ></v-select>
        </div>
      </div>
      <v-table fixed-header class="month-table mt-7">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">Id</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1">방 이름</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">체크인</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">체크아웃</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">상태</th>
              <th class="icon-column"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in table"
              :key="item.roomsId"
              :class="item.activestate"
              class="month-item"
            >
              <td class="text-center">{{ item.id }}</td>
              <td>
                <h4 class="font-weight-bold text-no-wrap">
                  {{ item.roomsName }}
                </h4>
                <h6
                  class="
                    text-no-wrap
                    font-weight-regular
                    text-no-wrap text-body-2 text-grey-darken-1
                  "
                >
                  {{ item.roomsAddress }}
                </h6>
              </td>
              <td>
                <h5
                  class="
                    font-weight-medium
                    text-no-wrap text-body-2 text-grey-darken-1
                    text-center
                  "
                >
                  {{ item.checkIn }}
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
                  {{ item.checkOut }}
                </h5>
              </td>
              <td class="text-center">
                <v-chip
                  class="ma-2"
                  :color="item.statuscolor"
                  size="small"
                  label
                  >
                {{ item.status }}
                </v-chip>
              </td>
              <td class="icon-column">
                <v-btn @click="goRoomPage(item.roomsId)" icon="mdi mdi-arrow-right-bold-outline" size="x-small"></v-btn>
                <v-btn @click="deleteReservation(item.id)" icon="mdi mdi-delete" size="x-small"></v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-text>
  </v-card>

</template>
<script>
import axios from '@/axios';
import router from "@/routers";

export default {
  data() {
    return {
      select: "예약중",
      items: ["예약중", "전체"],
      table: [],
      
      delReservationId: null,
      delDialog: false,
    }
  },
  methods: {
    getReservationList: function () {
      axios.get(`/api/v1/reservation`, this.authHeader())
          .then((result) => {
            this.table = result.data.data;
            this.table.forEach(element => {
              if (new Date(element.checkOut) > Date.now()) {
                element.status = "예약중";
                element.statuscolor = "info";
              } else {
                element.status = "종료";
                element.statuscolor = "disable";
              }
            });
            console.log(this.table);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
          })
    },
    goRoomPage(roomsId) {
      router.push({
        name: 'RoomDetail',
        state: {
          data: roomsId,
        }
      })
    },
    deleteReservation: function (reservationId) {
      this.$swal.fire({
        title: "정말 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "네",
        cancelButtonText: "아니오"
      }).then((swalResult) => {
        if (swalResult.isConfirmed) {
          console.log(reservationId);
          axios.patch(`/api/v1/reservation/` + reservationId, {}, this.authHeader())
            .then((result) => {
              this.$swal.fire({
                title: "삭제되었습니다!",
                icon: "success"
              });
              console.log( result.data.message );
              this.getReservationList();
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
            })
        }
      });
    }
  },
  mounted() {
    this.getReservationList();
  },

}

</script>

<style scoped>
.icon-column {
    text-align: center;
    min-width: 110px;
}
.icon-column > .v-btn + .v-btn {
  margin-left: 5px;
}
</style>