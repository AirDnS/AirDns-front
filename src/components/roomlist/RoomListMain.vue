<template>
  <v-card flat class="w-100 h-100">
    <v-card-text>
      <div class="d-sm-flex align-center">
        <div>
          <h2 class="title text-h6 font-weight-medium">등록 방 목록</h2>
        </div>
      </div>
      <v-table fixed-header class="month-table mt-7">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-no-wrap font-weight-medium text-subtitle-1 text-center">Id</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1">방 이름</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1">설명</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1 text-end">가격</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1 text-end">크기</th>
              <th class="text-no-wrap font-weight-medium text-subtitle-1">활성화 여부</th>
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
              <td class="text-center">{{ item.roomsId }}</td>
              <td style="min-width: 200px;">
                <h4 class="font-weight-bold">
                  {{ item.name }}
                </h4>
                <h6
                  class="
                    font-weight-regular
                    text-body-2 text-grey-darken-1
                  "
                >
                  {{ item.address }}
                </h6>
              </td>
              <td>
                <h5
                  class="
                    font-weight-medium
                    text-body-2 text-grey-darken-1
                  "
                >
                  {{ item.desc }}
                </h5>
              </td>
              <td>
                <h5
                  class="
                    font-weight-medium
                    text-no-wrap text-body-2 text-grey-darken-1
                    text-end
                  "
                >
                  {{ item.price }}
                </h5>
              </td>
              <td>
                <h5
                  class="
                    font-weight-medium
                    text-no-wrap text-body-2 text-grey-darken-1
                    text-end
                  "
                >
                {{ item.size }}
                </h5>
              </td>
              <td>
                {{ item.isClose }}
              </td>
              <td class="icon-column">
                <v-btn @click="goRoomEdit(item.roomsId)" icon="mdi mdi-pencil" size="x-small"></v-btn>
                <v-btn @click="goRoomPage(item.roomsId)" icon="mdi mdi-arrow-right-bold-outline" size="x-small"></v-btn>
                <v-btn @click="deleteRoom(item.roomsId)" icon="mdi mdi-delete" size="x-small"></v-btn>
              </td>
            </tr>
          </tbody>
        </template>
        
      </v-table>
			<v-pagination class="pagination mb-2 mt-6" size="small" v-model="pageable.pageNumber" :length="pageable.pageSize" @update:modelValue="getRoomList"></v-pagination>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from '@/axios';
import router from "@/routers";

export default {
  data() {
    return {
      pageable: {
        pageNumber: 0,
        pageSize: 5,
      },
			table: []
    }
  },
  methods: {
    getRoomList: function () {
      const params = {
        page: this.pageable.pageNumber
      }
        

      axios.get(`/api/v1/rooms`, {params})
          .then((result) => {
            this.table = result.data.data.content;
            this.pageable = result.data.data.pageable
            console.log(this.pageable);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("test");
          })
    },
    goRoomEdit(roomsId) {
      router.push({
        name: 'RoomDetail',
        state: {
          data: roomsId,
        }
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
    deleteRoom(roomsId) {
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
          axios.delete(`/api/v1/rooms/` + roomsId, this.authHeader())
            .then((result) => {
              this.$swal.fire({
                title: "삭제되었습니다!",
                icon: "success"
              });
              console.log( result.data.message );
              this.getRoomList();
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
    this.getRoomList();
  },

}

</script>

<style scoped>
.icon-column {
    text-align: center;
    min-width: 160px;
}
.icon-column > .v-btn + .v-btn {
  margin-left: 5px;
}
</style>