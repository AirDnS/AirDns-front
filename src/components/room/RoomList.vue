<template>
  <div class="box-container room_search_bar">
    <RoomSearch
    @search="resetSearch"
    ></RoomSearch>
  </div>

  <v-infinite-scroll @load="load"  :empty-text="'ㅤ'">
    <div class="room_list">
      <v-hover  v-for="v in roomList" :key="v.roomsId"
          v-slot="{ isHovering, props }"
        >
        <v-card class="room_card"
          :elevation="isHovering ? 8 : 2"
          :class="{ 'on-hover': isHovering }"
          v-bind="props"
          v-on:click="goRoomDetail(`${v.roomsId}`)"
          >
          <v-img 
          cover
          :aspect-ratio="1"
            :src="v.image != null
              ? v.image
              : require('@/assets/noimage.jpg')"
            ></v-img>
          <v-card-text>
            <div>
              <h2 class="title primary--text mb-2 text-truncate">{{ v.name }}</h2>
              <p class="text-truncate">{{ v.address }}</p>
              <h3 class="mt-3 mb-0 text-truncate" v-if="v.price">{{ "₩ " + $filters.formatNumber(v.price) }}</h3>
            </div>
          </v-card-text>
        </v-card>

      </v-hover>
    </div>
    </v-infinite-scroll>
  
</template>

<script>
import axios from "@/axios";
import router from "@/routers";
import { computed } from "vue";
import { useStore } from "vuex";

import RoomSearch from "@/components/room/RoomSearch.vue";

export default {
  components: {
    "RoomSearch": RoomSearch
  },
  data() {
    return {
      cursor: null,
      pageSize: 9,
      roomList: [],
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
  setup() {
    const store = useStore();
    const searchFilter = computed(() => store.state.searchFilter);

    return {searchFilter};
  },
  methods: {
    getRoomList: async function () {
      const cond = this.searchFilter || {};
      try {
        const result = await axios.get(`/api/v1/rooms`, {
          params: {
            cursor: this.cursor,
            pageSize: this.pageSize,
            keyword: cond.keyword,
            price: cond.priceArr,
            size: cond.sizeArr,
            equipment: cond.equipmentArr,
          }})
          
        this.roomList.push(...result.data.data);

        if (result.data.data.length == this.pageSize) {
          this.cursor = result.data.data.at(-1).roomsId;
        } else {
          this.cursor = -1;
        }

      } catch (err) {
        console.log("error : " + err);
      }

    },
    async load ({ done}) {
      if (this.cursor === -1) {
        done('empty')
        return;
      }

      // Perform API call
      await this.getRoomList();


      done('ok')
    },
    resetSearch: async function () {
      this.roomList = [];
      this.cursor = null;
      // await this.getRoomList();
    },
    goRoomDetail: function (roomsId) {
      const routeData = router.resolve({
          name: 'RoomDetail',
          params: {
            roomsId: roomsId
          }
        })
      window.open(routeData.href, '_blank');

    },
  },
  // created() {
  //   this.getRoomList();
  // },
  mounted() {
    this.emitter.on("send", (sendItem) => {
      this.roomList = sendItem;
    })
  },
}
</script>

<style scoped>
.v-card.on-hover.v-theme--dark {
  background-color: rgba(#FFF, 0.8)
}

.v-card.on-hover.v-theme--dark > .v-card__text {
  color: #000
}

.room_search_bar {

  width: 1150px;
  margin: auto;
  
  font-size: 40px;
  text-align: center;
}

.room_list {
  padding: 20px 40px 0px 40px;
  
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 350px));
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  gap: 30px;
}

.room_card {
  max-width: 350px;
}

@media screen and (max-width: 550px) { .room_list { grid-template-columns: repeat(1, minmax(200px, 350px)); } }
@media screen and (min-width: 550px) and (max-width: 830px) { .room_list { grid-template-columns: repeat(2, minmax(200px, 350px)); } }
@media screen and (min-width: 830px) and (max-width: 1240px) { .room_list { grid-template-columns: repeat(3, minmax(200px, 350px));  } }
@media screen and (min-width: 1240px) and (max-width: 1650px) { .room_list { grid-template-columns: repeat(4, minmax(200px, 350px)); } }
@media screen and (min-width: 1650px) and (max-width: 2060px) { .room_list { grid-template-columns: repeat(5, minmax(200px, 350px)); } }
</style>