<template>
  <v-container class="room_list v-on:">
    <v-card class="room_card" v-for="(v, i) in roomList" :key="i">
      <v-img :src=" `${v.imageUrl}`.length ? `${v.imageUrl}`.substring(0, `${v.imageUrl}`.indexOf(',') === -1 ?
        `${v.imageUrl}`.length : `${v.imageUrl}`.indexOf(',')) :
         `https://airdns-bucket.s3.ap-northeast-2.amazonaws.com/3_down-filled-triangular-arrow.png`"
             aspect-ritio="2"></v-img>
      <v-card-text>
        <div>
          <h2 class="title primary--text mb-2">{{ v.name }}</h2>
          <p class="mb-0">{{ v.address }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn width="300px" variant="outlined" color="red white--text" v-on:click="goRoomDetail">상세 정보 확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import axios from "axios";
import router from "@/routers";

export default {
  data() {
    return {
      item: "",
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
      axios.get(`http://localhost:8080/api/v1/rooms`)
          .then((result) => {
            this.roomList = result.data.data.content;
            console.log(this.roomList);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("test");
          })
    },
    getEquipment: function () {
      axios.get('http://localhost:8080/api/v1/equipments')
          .then((res) => {
            this.example12.options = res.data.data;
            localStorage.setItem("equipment", JSON.stringify(this.example12));
          })
    },
    goRoomDetail: function () {
      router.push({name: 'RoomDetail'})
    },
  },
  created() {
    this.getRoomList();
    this.getEquipment();
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