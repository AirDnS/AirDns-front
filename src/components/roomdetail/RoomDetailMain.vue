<template>
    <v-row class="detail-image-box" v-if="roomData.image?.length > 0">
    <div v-for="v in roomData.image" :key="v.id">
      <v-img :src ="`${v.imageUrl}`" width="500px" height="280px" class="room-image">
      </v-img>
    </div>
  </v-row>

  <v-row class="mx-5 rooms-detail-card">
    <v-col class="pa-0">
      <v-col>
        <v-card>
          <v-card-text>
            <h2 class="title font-weight-medium mb-2 text-h4">
              {{roomData.name}}
            </h2>
            <p class="text-body-2 text-grey-darken-1"><span v-if="roomData.size">방 크기 : {{roomData.size}}평, </span>{{roomData.address}}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-show="roomData.desc">
        <v-card>
          <v-card-text>
            <p class="mb-3 content">
            {{roomData.desc}}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-show="roomData.equipment?.length">
        <v-card pa=3>
          <v-card-text>
            <div v-for="(equipment, index)  in roomData.equipment" :key="index" class="equipment-wrapper mb-3">
              <h5 class="title font-weight-medium mb-2 text-h5">
                {{ equipment.label }}
              </h5>
              <div class="equipment">
                <div v-for="(eq, eqIndex)  in equipment.options" :key="eqIndex" class="equipment-item pa-3">
                  {{ eq.name }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-col>
    <v-col style="max-width: 355px" v-show="hasUser">
      <v-card>
          <v-card-text>
            <RoomReservation>
            </RoomReservation>
            <RoomLike v-bind:childVaule="roomsId"></RoomLike>
          </v-card-text>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RoomReservation from "@/components/roomdetail/RoomReservation.vue";
import RoomLike from "@/components/roomdetail/RoomLike.vue";
import axios from "@/axios";

export default {
  data() {
    return {
      roomsId: "null",
      roomData: "null",
      test: "null",
      hasUser: false
    }
  },
  mounted() {
    this.emitter.emit("roomsId", this.roomsId);
    if (localStorage.getItem('userInfo') != null) {
      this.hasUser = true;
    }
  },
  components: {
    'RoomReservation': RoomReservation,
    'RoomLike': RoomLike
  },
  methods: {
    getRoomDetail: async function () {
      console.log(this.roomsId)
      await axios.get(`/api/v1/rooms/${this.roomsId}`)
          .then((result) => {
            this.roomData = result.data.data;
            console.log(this.roomData);
            
            this.emitter.emit("price", this.roomData.price);
            this.emitter.emit("roomsName", this.roomData.name);
            this.emitter.emit("reservatedTimeList", this.roomData.reservatedTimeList);
            this.emitter.emit("restScheduleList", this.roomData.restScheduleList);
            
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
    this.getRoomDetail();
  }

}
</script>

<style scoped>
.detail-image-box {
  margin: auto;
  display: flex;
  flex-wrap: nowrap;
  height: 350px;
  overflow: auto;
  white-space: nowrap;
}

.room-image {
  margin-top: 10px;
}

.my-sidebar {
  -ms-flex: 0 0 0px;
  flex: 0 0 0px;
}

.equipment {
  display: flex;
}

.equipment-item {
  width: 100px;
  flex-wrap: wrap;  
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  font-size: 1.5em;
  line-height: 2.5rem;
}

.rooms-detail-card {
  justify-content: center;
}

@media only screen and (max-width: 900px) {
  .rooms-detail-card {
    flex-direction: column;
    align-items: center;
  }
}

</style>