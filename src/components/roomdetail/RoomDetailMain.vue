<template>
  <div class="detail-image-box">
    <div v-for="(v, i) in imageList" :key="i">
      <v-img :src ="`${v}`" width="500px" height="280px" class="room-image">
      </v-img>
    </div>
  </div>

  <div class="detail-desc-box">
    <div class="desc-container">
      <v-sheet class="detail-desc1" :elevation="10">
        <div>{{roomData.name}}</div>
        <div>{{roomData.address}}</div>
      </v-sheet>
      <v-sheet class="detail-desc2" :elevation="10">
        <div>
          {{roomData.desc}}
        </div>
      </v-sheet>
      <v-sheet class="detail-desc3" :elevation="10">
        <RoomReservation>
        </RoomReservation>
      </v-sheet>
      <v-sheet class="detail-desc4" :elevation="10">
        <RoomLike></RoomLike>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import RoomReservation from "@/components/roomdetail/RoomReservation.vue";
import RoomLike from "@/components/roomdetail/RoomLike.vue";
import axios from "axios";

export default {
  data() {
    return {
      roomsId: "null",
      imageList: "null",
      roomData: "null"
    }
  },
  components: {
    'RoomReservation': RoomReservation,
    'RoomLike': RoomLike
  },
  methods: {
    getRoomDetail: function () {
      console.log(this.roomsId)
      axios.get(`http://localhost:8080/api/v1/rooms/${this.roomsId}`)
          .then((result) => {
            this.roomData = result.data.data;
            this.imageList = result.data.data.imageUrl;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("test");
          })
    }
  },
  created() {
    const {data} = history.state;
    this.roomsId = data;
    this.getRoomDetail()
  }

}
</script>

<style>
.detail-image-box {
  margin: auto;
  display: flex;
  height: 300px;
  width: 700px;
  overflow: auto;
  white-space: nowrap;
}
.room-image {
  margin-top: 10px;
}

.detail-desc-box {
  display: flex;
  justify-content: center;
}

.desc-container {
  width: 800px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 15px;
  margin-top: 20px;
}

.detail-desc1 {
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;;
  flex-direction: column;
  text-align: center;
}

.detail-desc2 {
  grid-column: 1/2;
  grid-row: 2/4;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: auto;
}

.detail-desc3 {
  grid-column: 2/3;
  grid-row: 1/3;
}

.detail-desc4 {
  grid-column: 2/3;
  grid-row: 3/4;
  display: flex;
}

</style>