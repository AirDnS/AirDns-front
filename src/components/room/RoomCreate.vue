<template>
  <v-sheet class="pa-12" rounded>
    <v-form ref="form">
      <v-card class="mx-auto px-6 py-8" max-width="540px">
          <v-text-field
              :rules="rules.name"
              v-model="data.name"
              label="방 이름"
              variant="outlined"
          ></v-text-field>
          <v-textarea
              :rules="[v =>  !!v || '설명은 필수 입력입니다.']"
              v-model="data.desc"
              label="방 상세설명"
              auto-grow
              variant="outlined"
              row-height="25"
              shaped
          ></v-textarea>
          <div class="map_wrap">
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
          <v-text-field
              :rules="[v =>  !!v || '상세 주소를 입력해주세요.']"
              v-model="data.addressDetail"
              label="상세 주소 "
              variant="outlined"
              placeholder="상세주소를 입력해주세요"
          ></v-text-field>
          <v-text-field
              :rules="rules.price"
              v-model="data.price"
              label="방 가격"
              variant="outlined"
              placeholder="시간당 가격 기준으로 입력해주세요"
          ></v-text-field>
          <v-text-field
              :rules="rules.size"
              v-model="data.size"
              label="방 평수"
              variant="outlined"
              placeholder="평수 기준으로 입력해주세요"
          ></v-text-field>
          <Multiselect
              v-model="data.equipment"
              v-bind="example12"
          ></Multiselect>
          <br>
          <v-file-input
              :rules="rules.files"
              label="File input"
              variant="outlined"
              multiple
              v-model="files"
              type="file"
              accept="image/*"
              @change="previewImage">
            >
            <template v-slot:selection="{ fileNames }">
              <template v-for="(fileName, index) in fileNames" :key="fileName">
                <v-chip
                    v-if="index < 2"
                    color="deep-purple-accent-4"
                    label
                    size="small"
                    class="me-2"
                >
                  {{ fileName }}
                </v-chip>
                <span
                    v-else-if="index === 2"
                    class="text-overline text-grey-darken-3 mx-2">
                +{{ files.length - 2 }} 파일
                </span>
              </template>

            </template>
          </v-file-input>
          <v-row>
            <template v-for="v in files" :key="v">
              <v-col>
                <v-img :src="previewImage(v)" width="500px" height="280px" class="room-image"></v-img>
              </v-col>
            </template>
          </v-row>
          <br>
          <div class="btn-box">
            <div>
              <v-btn
                  class="create-btn"
                  color="primary"
                  v-on:click="postCreateRoom"
                  variant="elevated">
                등록하기
              </v-btn>
              <v-btn
                  class="home-btn"
                  v-on:click="goHome"
                  color="error"
                  variant="elevated">
                취소하기
              </v-btn>
            </div>
          </div>
      </v-card>
    </v-form>
  </v-sheet>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import axios from "@/axios";
import router from "@/routers";

export default {
  components: {
    Multiselect,
  },
  data: function () {
    return {
      rules: {
        name: [
          v => !!v || '방 이름을 입력해주세요.',
          v => (v && v.length >= 4) || '최소 4자 이상이어야 합니다.',
        ],
        price: [
          v => !!v || '가격을 입력해주세요.',
          v => !isNaN(v) || "숫자만 입력 가능합니다.",
          v => v <= 50000 || "50000 이하로 입력해주세요.",
        ],
        size: [
          v => !!v || '평수를 입력해주세요.',
          v => !isNaN(v) || "숫자만 입력 가능합니다.",
          v => v <= 50 || "50 이하로 입력해주세요.",
        ],
        files: [
          v => !v || !!v.length || '방 사진을 업로드해주세요.',
          v => {
            for (let file of v) {
              console.log(file);
              if (file.size > 200_0000)
                return '사진은 2MB 이하 크기만 업로드 가능합니다.'
            }
            return true;
          },

        ]

        // phone: value => {
        //   const pattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
        //   return pattern.test(value) || "잘못된 핸드폰 번호 입력입니다."
        // }
      },
      data: {
        name: "",
        price: "",
        address: "",
        addressDetail: "",
        size: "",
        desc: "",
        equipment: [],
        latitude: null,
        longitude: null,
      },
      files: [],
      optionsId: [],
      example12: {
        mode: 'tags',
        label: 'name',
        valueProp: 'id',
        value: [],
        groups: true,
        placeholder: '장비를 선택해주세요.',
        closeOnSelect: false,
        searchable: true,
        options: []
      },
      themeObj: {
        searchBgColor: "#0B65C8", //검색창 배경색
        queryTextColor: "#FFFFFF" //검색창 글자색
      },
      mapdata: {
        map: null,
        geocoder: null,
        marker: null,
        centerAddr: "",
        default_coor_x: 33.450701, 
        default_coor_y: 126.570667
      }
    }
  },
  methods: {
    getEquipment: function () {
      this.example12.options = JSON.parse(localStorage.getItem("equipment")).options;
    },
    postCreateRoom: async function () {
      const { valid } = await this.$refs.form.validate();
      if (!valid)
        return;

      if (this.data.latitude == null) {
        this.$swal.fire({
            title: "주소를 선택해주세요!",
            icon: "error"
        });
        return;
      }

      const frm = new FormData();
      const json = JSON.stringify(this.data);
      const blob = new Blob([json], {type: "application/json"});
      frm.append('data', blob);
      for (let file of this.files) {
        frm.append('files', file);
      }
      axios.post(`/api/v1/rooms`, frm,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((res) => {
        window.alert("성공")
        console.log(res);
        router.push({name: "HomePage"})
      }).catch((error) => {
        window.alert("실패")
        console.log(error)
      }).finally(() => {
        console.log("test");
      })
    },
    goHome() {
      router.push({name: "HomePage"})
    },
    previewImage: function (file) {
      try {
        return URL.createObjectURL(file);
      } catch {
        console.log("not image!")
      }
    },
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
                  data.address = result.address.address_name;

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
                  
                  data.address = result[0].address.address_name;
                  
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
    }
  },
  mounted() {
    this.getEquipment();
    this.loadMap();
  }
}
</script>

<style scoped>
.v-text-field {
  margin-bottom: 7px;
}
.postcodeBox {
  display: flex;
}

.btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-btn{
  margin-right: 10px;
}

.home-btn{
  margin-left: 10px;
}

.map_wrap {position:relative;width:100%;height:350px; margin-bottom: 10px;}
.hAddr {position:absolute;left:10px;top:0px;z-index:1;padding:5px;}
.post-btn {
  min-width: 250px;
}
</style>