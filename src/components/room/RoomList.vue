<template>
  <v-container class="room_list v-on:" style="min-width: max-content;">
    <v-card class="room_card" v-for="(v, i) in roomList" :key="i">
      <v-img 
        aspect-ritio="2"
        :src="v.image != null && v.image.length > 0 
          ? v.image[0].imageUrl 
          : require('@/assets/noimage.jpg')"
        ></v-img>
      <v-card-text>
        <div>
          <h2 class="title primary--text mb-2">{{ v.name }}</h2>
          <p class="mb-0">{{ v.address }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn width="300px" variant="outlined" color="red white--text" v-on:click="goRoomDetail(`${v.roomsId}`)">상세 정보
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <!-- <v-pagination class="pagination mb-2 mt-6" size="small" v-model="page.pageNumber" :length="page.totalPages" @update:modelValue="getRoomList"></v-pagination> -->

  <v-pagination v-model="page.pageNumber" :length="page.totalPages" @update:modelValue="getRoomList"></v-pagination>
</template>

<script>

import axios from "@/axios";
import router from "@/routers";
// import router from "@/routers";

export default {
  data() {
    return {
      page: {
        pageNumber: 1,
        totalPages: 1,
      },
      roomList: "null",
      imageUrl: "",
      example12: {
        mode: 'tags',
        label: 'name',
        valueProp: 'id',
        value: [],
        groups: true,
        placeholder: 'Select options',
        closeOnSelect: false,
        searchable: true,
        options: []
      },
    }
  },
  methods: {
    getRoomList: function () {
      axios.get(`/api/v1/rooms`, {
        params: {
          page: this.page.pageNumber - 1
        }})
          .then((result) => {
            this.roomList = result.data.data.content;
            this.page.pageNumber = result.data.data.pageable.pageNumber + 1;
            this.page.totalPages = result.data.data.totalPages;

            console.log(this.roomList);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("test");
          })
    },
    goRoomDetail: function (roomsId) {
      router.push({
        name: 'RoomDetail',
        state: {
          data: roomsId,
        }
      })
    },
  },
  created() {
    this.getRoomList();
  },
  mounted() {
    this.emitter.on("send", (sendItem) => {
      this.roomList = sendItem;
    })
  },
}
</script>

<style>
.room_list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 250px 250px;
  gap: 15px;
}

.room_card {
  display: grid;
  grid-template-rows: 120px 80px 50px;
}
</style>