<template>
  <v-container class="room_list">
    <v-card class="room_card" v-for = "(v, i) in roomList" :key = "i">
      <v-img :src = "`${v.imageUrl}`.substring(0,`${v.imageUrl}`.indexOf(','))" aspect-ritio="2"></v-img>
      <v-card-text>
        <div>
          <h2 class="title primary--text mb-2">{{v.name}}</h2>
          <p class="mb-0">{{v.address}}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn width="300px" variant="outlined" color="red white--text">상세 정보 확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      roomList : "null",
      imageUrlList : "null"
    }
  },
  methods: {
    getRoomList : function (){
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
  },
  created() {
    this.getRoomList();
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