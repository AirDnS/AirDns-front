<template>
    <RoomSearch
    @search="resetSearch"
    v-model:searchWithMap="searchWithMap"
    ></RoomSearch>

    <div class="search-container">

      
      <perfect-scrollbar style="margin-top: 1px; height: calc(100vh - 160px); min-width: 60%;">
        <v-infinite-scroll @load="load"  :empty-text="'ㅤ'">
          <div class="room_list" :class="{'room_list_with-map':searchWithMap}">
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
                    <p :class="{'d-none': v.distance == null }">{{ calDistanceText(v.distance) }}</p>
                    <h3 class="mt-3 mb-0 text-truncate" v-if="v.price">{{ "₩ " + $filters.formatNumber(v.price) }}</h3>
                  </div>
                </v-card-text>
              </v-card>

            </v-hover>
          </div>
        </v-infinite-scroll>
      </perfect-scrollbar>
      <div class="map_wrap" :class="{'d-none': !searchWithMap }">
        <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
          <div class="hAddr">
              <!-- <span id="centerAddr"></span> -->
              <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-btn 
                v-bind="props"
                :color="isHovering ? 'light-blue-accent-4' : undefined"
                class="post-btn" 
                id="postcode" @click="openPostcode">{{ isHovering ? '위치 검색' : mapdata.centerAddr }}</v-btn>
              </template>
            </v-hover>
          </div>
        </div>
      </div>
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
      isProcessed: false,
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
      userLocation: {
        latitude: null,
        longitude: null
      },

      data: {
        address: "",
        latitude: null,
        longitude: null,
      },
      
      searchWithMap: false,
      mapdata: {
        map: null,
        geocoder: null,
        marker: null,
        clusterer: null,
        centerAddr: "",
        default_coor_x: 37.5023270151927,
        default_coor_y: 127.044444694599,
        center_coor_lat: null,
        center_coor_lng: null,
        roomMarkers: [],
      }
    }
  },
  setup() {
    const store = useStore();
    const searchFilter = computed(() => store.state.searchFilter);

    return {searchFilter};
  },
  methods: {
    getRoomList: async function () {
      if (this.isProcessed == true) {
        return;
      }
      this.isProcessed = true;
      const cond = this.searchFilter || {};
      
      console.log(this.data.latitude);

      try {
        const result = await axios.get(`/api/v1/rooms`, {
          params: {
            cursor: this.cursor,
            pageSize: this.pageSize,
            keyword: cond.keyword,
            price: cond.priceArr,
            size: cond.sizeArr,
            equipment: cond.equipmentArr,
            searchDistance: 100,
            latitude: this.searchWithMap ? this.data.latitude || this.mapdata.center_coor_lat || null : null ,
            longitude: this.searchWithMap ? this.data.longitude || this.mapdata.center_coor_lng || null : null
          }})
          
        this.roomList.push(...result.data.data);

        if (result.data.data.length == this.pageSize) {
          this.cursor = result.data.data.at(-1).roomsId;
        } else {
          this.cursor = -1;
        }

        if (this.searchWithMap == true) {
          this.removeMarkers();
          this.drawMarkers();
          this.cursor = -1;

          if (result.data.data.length > 99) {
            this.$swal.fire({
                title: "데이터 수가 많아 일부만 됩니다.",
                icon: "warning"
            });
          }
        }

        this.isProcessed = false;
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
      await this.getRoomList();
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

    calDistanceText: function (distance) {
      let disText = "";
      if (distance > 10) {
        disText = Math.round(distance) + "km 거리"
      } else if (distance >= 1) {
        disText = Math.round(distance * 10) / 10 + "km 거리"
      } else if (distance > 0.1) {
        disText = Math.round(distance * 1000) + "m 거리"
      } else {
        disText = "100m 이내"
      }

      return disText;
    },


    ///////////////////////////////////////////
    /////////////// map area //////////////////
    ///////////////////////////////////////////
    openPostcode() {
      /* eslint-disable */ 
      new window.daum.Postcode({
        width: 500,
        height: 600,
        theme: this.themeObj,
        oncomplete: (data) => {
          var addr = data.address; // 최종 주소 변수

          var map = this.mapdata.map;
          var geocoder = this.mapdata.geocoder;
          var marker = this.mapdata.marker;
          var mapContainer = this.mapdata.mapContainer;
          var infowindow = this.mapdata.infowindow;
          var data = this.data;
          
          // 주소 정보를 해당 필드에 넣는다.
          this.data.address = addr;
          // 주소로 상세 정보를 검색
          geocoder.addressSearch(data.address, function(results, status) {
              // 정상적으로 검색이 완료됐으면
              if (status === daum.maps.services.Status.OK) {

                  var result = results[0]; //첫번째 결과의 값을 활용

                  data.latitude = result.y;
                  data.longitude = result.x;

                  // 해당 주소에 대한 좌표를 받아서
                  var coords = new daum.maps.LatLng(result.y, result.x);
                  // 지도를 보여준다.
                  mapContainer.style.display = "block";
                  map.relayout();
                  // 지도 중심을 변경한다.
                  map.setCenter(coords);
                  // 마커를 결과값으로 받은 위치로 옮긴다.
                  // marker.setPosition(coords)
                  
                  var detailAddr = !!result.road_address ? '<div>도로명주소 : ' + result.road_address.address_name + '</div>' : '';
                  detailAddr += '<div>지번 주소 : ' + result.address.address_name + '</div>';
                  
                  var content = '<div class="bAddr">' +
                                  '<span class="bAddr-title">법정동 주소정보</span>' + 
                                  detailAddr + 
                              '</div>';

                  // 마커를 클릭한 위치에 표시합니다 
                  marker.setPosition(coords);
                  marker.setMap(map);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
              }
          });
        }
      }).open({
        left: (window.screen.width / 2) - (500 / 2),
        top: (window.screen.height / 2) - (600 / 2),
      });
    },
    loadMap: function () {
      /* eslint-disable */ 
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = { 
              center: new kakao.maps.LatLng(this.mapdata.default_coor_x, this.mapdata.default_coor_y), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
          };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption); 

      //주소-좌표 변환 객체를 생성
      var geocoder = new daum.maps.services.Geocoder();

      var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다      
      infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
      
      this.mapdata.map = map;
      this.mapdata.geocoder = geocoder;
      this.mapdata.marker = marker;
      this.mapdata.mapContainer = mapContainer;
      this.mapdata.infowindow = infowindow;
      
      var mapdata = this.mapdata;
      var data = this.data;

      // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        data.latitude = mouseEvent.latLng.getLat();
        data.longitude = mouseEvent.latLng.getLng();

          searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
              if (status === kakao.maps.services.Status.OK) {
                  var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                  detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                  
                  var content = '<div class="bAddr">' +
                                  '<span class="bAddr-title">법정동 주소정보</span>' + 
                                  detailAddr + 
                              '</div>';

                              console.log(mouseEvent.latLng);

                  // 마커를 클릭한 위치에 표시합니다 
                  marker.setPosition(mouseEvent.latLng);
                  marker.setMap(map);

                  // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                  infowindow.setContent(content);
                  infowindow.open(map, marker);
              }   
          });
      });
      
      // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'idle', function() {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
          mapdata.center_coor_lat = map.getCenter().getLat();
          mapdata.center_coor_lng = map.getCenter().getLng();
      });

      function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
      }

      function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }

      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
          if (status === kakao.maps.services.Status.OK) {
              for(var i = 0; i < result.length; i++) {
                  // 행정동의 region_type 값은 'H' 이므로
                  if (result[i].region_type === 'H') {
                    mapdata.centerAddr = result[i].address_name;
                      break;
                  }
              }
          }    
      }
    },
    drawMarkers() {
      // 마커 이미지의 이미지 주소입니다
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
      
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35); 
      
      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      
      for (let i = 0; i < this.roomList.length; i++) {
        let room = this.roomList;
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: this.mapdata.map, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(room[i].latitude, room[i].longitude), // 마커를 표시할 위치
            title : room[i].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });

        this.mapdata.roomMarkers.push(marker);
      }
    },
    removeMarkers() {
      for (let i = 0; i < this.mapdata.roomMarkers.length; i++) {
        let marker = this.mapdata.roomMarkers[i];
        marker.setMap(null);
      }
      this.mapdata.roomMarkers = [];
    }

  },
  
  watch: {
    // 질문이 변경될 때마다 이 함수가 실행됩니다
    searchWithMap(newValue) {
      if (newValue == true) {
        setTimeout(() => {
          this.mapdata.map.relayout(); 
        });
      }

    }
  },
  mounted() {
    this.emitter.on("send", (sendItem) => {
      this.roomList = sendItem;
    })
    
    if (JSON.parse(localStorage.getItem('userInfo')) != null) {
      this.userLocation.latitude = JSON.parse(localStorage.getItem('userInfo'))["latitude"];
      this.userLocation.longitude = JSON.parse(localStorage.getItem('userInfo'))["longitude"];
    }
    
    this.loadMap();
  },
}
</script>

<style scoped>
.search-container {
  display: flex;
}
.v-card.on-hover.v-theme--dark {
  background-color: rgba(#FFF, 0.8)
}

.v-card.on-hover.v-theme--dark > .v-card__text {
  color: #000
}

.room_list {
  padding: 20px 40px 0px 40px;
  
  display: grid;
  grid-template-columns: repeat(6, minmax(200px, 350px));
  justify-content: center;
  gap: 30px;
  /* 무한 스크롤용 옵션 */
  /* grid-template-rows: minmax(350px, 1fr) 1fr 1fr; */
}

.room_card {
  max-width: 350px;
}

.map_wrap {
  position:relative;
  width:100%; 
  min-height:100%; 
  margin: 1px;
  padding-left: 20px;
  padding-right: 20px;
}
.hAddr {position:absolute;left:20px;top:0px;z-index:1;padding:5px;}
.post-btn {
  min-width: 250px;
}


@media screen and (max-width: 550px) { .room_list { grid-template-columns: repeat(1, minmax(200px, 350px)); } }
@media screen and (min-width: 550px) and (max-width: 830px) { .room_list { grid-template-columns: repeat(2, minmax(200px, 350px)); } }
@media screen and (min-width: 830px) and (max-width: 1240px) { .room_list { grid-template-columns: repeat(3, minmax(200px, 350px));  } }
@media screen and (min-width: 1240px) and (max-width: 1650px) { .room_list { grid-template-columns: repeat(4, minmax(200px, 350px)); } }
@media screen and (min-width: 1650px) and (max-width: 2060px) { .room_list { grid-template-columns: repeat(5, minmax(200px, 350px)); } }

/* 지도 추가시 UI */
@media screen and (max-width: 1240px) { 
.search-container { 
  flex-direction: column-reverse;
  flex-wrap: wrap;
}
.map_wrap {
  height: 350px;
}
}


.room_list.room_list_with-map {
  grid-template-columns: repeat(6, minmax(200px, 350px));
}

@media screen and (max-width: 550px) { 
  .room_list.room_list_with-map { grid-template-columns: repeat(1, minmax(200px, 350px)); } 
}
@media screen and (min-width: 550px) and (max-width: 830px) { 
  .room_list.room_list_with-map { grid-template-columns: repeat(2, minmax(200px, 350px)); } 
}

@media screen and (min-width: 830px) and (max-width: 2050px) { 
  .room_list.room_list_with-map { grid-template-columns: repeat(3, minmax(200px, 350px)); }
}
@media screen and (min-width: 2050px) and (max-width: 2450px) { 
  .room_list.room_list_with-map { grid-template-columns: repeat(4, minmax(200px, 350px)); }
}
@media screen and (min-width: 2450px) and (max-width: 3100px) { 
  .room_list.room_list_with-map { grid-template-columns: repeat(5, minmax(200px, 350px)); }
}
</style>