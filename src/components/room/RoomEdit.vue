<template>
  <div style="margin:-16px">

    <div class="d-flex flex-row">
      <v-tabs
        v-model="tab"
        direction="vertical"
        color="primary"
      >
        <v-tab value="option-1">
          <v-icon start>
            mdi-information-outline
          </v-icon>
          기본 정보
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            mdi-image-frame
          </v-icon>
          이미지 수정
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            mdi-list-status
          </v-icon>
          예약 관리
        </v-tab>
        <v-tab value="option-4">
          <v-icon start>
            mdi-pine-tree
          </v-icon>
          휴무 관리
        </v-tab>
      </v-tabs>
      
      <v-window v-model="tab" style="width: 100%">
        <v-window-item value="option-1" width="100%">
          <v-card flat class="mx-auto px-6 py-8" style="max-width: 700px;">
            <v-form @submit.prevent="updateRoom">
              <v-row>
                <v-col cols="2">
                  <v-list-subheader>방 이름</v-list-subheader>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                      v-model="roomData.name"
                      variant="outlined"
                      placeholder="이름"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-list-subheader>상세 설명</v-list-subheader>
                </v-col>
                <v-col cols="10">
                  <v-textarea
                      v-model="roomData.desc"
                      placeholder="상세설명"
                      auto-grow
                      variant="outlined"
                      row-height="25"
                      shaped
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-list-subheader>주소</v-list-subheader>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                      v-model="roomData.address"
                      placeholder="주소"
                      variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              
              <v-row>
                <v-col cols="2">
                  <v-list-subheader>가격</v-list-subheader>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                      v-model="roomData.price"
                      placeholder="시간당 가격"
                      variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              
              <v-row>
                <v-col cols="2">
                  <v-list-subheader>방 평수</v-list-subheader>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                    v-model="roomData.size"
                    placeholder="방 평수"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              
              <Multiselect
                  size="12"
                  v-model="roomData.equipment"
                  v-bind="equipmentSelect"
              ></Multiselect>

              <v-row class="mt-3">
                <v-col cols="2">
                  <v-list-subheader>활성화</v-list-subheader>
                </v-col>
                <v-col cols="10">
                  <v-switch 
                    color="primary" 
                    v-model="roomData.isClosed" 
                    @update:indeterminate="updateRoomIsClosed">
                    <template v-slot:label v-if="!isChangedIsClosed">
                      변경 중
                      <v-progress-circular
                        :indeterminate="!isChangedIsClosed"
                        size="24"
                        class="ms-2"
                      ></v-progress-circular>
                    </template>
                  </v-switch>
                </v-col>
              </v-row>
              <br>
              <v-btn
                  block
                  color="primary"
                  size="large"
                  type="submit"
                  variant="elevated">
                수정하기
              </v-btn>
            </v-form>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat class="pa-5">
            <v-expansion-panels multiple v-model="panel">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                      <v-col cols="4" class="d-flex justify-start">
                        기존 이미지
                      </v-col>
                      <v-col
                        cols="8"
                        class="text-grey"
                      >
                        <v-fade-transition leave-absolute>
                          <span
                            v-if="expanded"
                            key="0"
                          >
                          </span>
                          <span
                            v-else
                            key="1"
                          >
                            {{ roomData.imageUrl.length }} 개 이미지
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  
                  <v-row>
                    <template v-for="v in roomData.imageUrl" :key="v">
                      <v-col>
                        <v-img :src ="`${v}`" width="500px" height="280px" class="room-image">
                          <v-btn class="float-right" icon="mdi-minus-circle" variant="text" @click="removeImage(v)"></v-btn>
                        </v-img>
                      </v-col>
                    </template>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-title>
                  <template v-slot:default="{ expanded }">
                    <v-row no-gutters>
                      <v-col cols="4" class="d-flex justify-start">
                        추가 이미지
                      </v-col>
                      <v-col
                        cols="8"
                        class="text-grey"
                      >
                        <v-fade-transition leave-absolute>
                          <span
                            v-if="expanded"
                            key="0"
                          >
                          </span>
                          <span
                            v-else
                            key="1"
                          >
                            {{ files.length }} 개 이미지
                          </span>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-file-input
                    label="파일 선택"
                    variant="outlined"
                    multiple
                    v-model = "files"
                    type="file"
                    accept="image/*"
                    @change="previewImage">
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
                </v-expansion-panel-text>
              </v-expansion-panel>

            </v-expansion-panels>
            <v-btn color="primary" class="float-right mt-5" @click="saveImage">
              저장
            </v-btn>

          
          </v-card>
        </v-window-item>
        <v-window-item value="option-3">
          <v-card flat>
            
            <ReservationListMain></ReservationListMain>
          </v-card>
        </v-window-item>
        <v-window-item value="option-4">            
          <v-dialog
            v-model="dialog"
            persistent
            width="auto"
            >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
              >
                휴무 추가
              </v-btn>
            </template>
            <v-card class="pa-5">
              <v-card-title>
                <span class="text-h5 mt-5">휴무 시간 선택</span>
              </v-card-title>

              <CustomDatePicker 
                :reservatedTimeList="this.roomData.reservatedTimeList"
                @select="selectRestDate"
              ></CustomDatePicker>

              <v-card-actions class="pa-0">
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  닫기
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="addRestDate"
                >
                  추가
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import axios from "@/axios";
import router from "@/routers";
import ReservationListMain from "@/components/reservationlist/ReservationListMain.vue";
import CustomDatePicker from "@/components/unit/CustomDatePicker.vue"

export default {
  components: {
    Multiselect,
    ReservationListMain,
    CustomDatePicker
  },
  data: function () {
    return {
      panel: [0],
      tab: 'option-1',
      isChangedIsClosed: true,
      dialog: false,
      accessToken: {
        accessToken: ""
      },
      roomData: {},
      data: {
        name: "",
        price: "",
        address: "",
        size: "",
        desc: "",
        equipment: [],
      },
      files: [],
      removeImages: [],
      equipmentSelect: {
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
      selectRestTimes: {}
    }
  },
  methods: {
    getEquipment: function () {
      this.equipmentSelect.options = JSON.parse(localStorage.getItem("equipment")).options;
      console.log(JSON.parse(localStorage.getItem("equipment")).options);
    },
    getRoomDetail: async function () {
      console.log(this.roomsId)
      await axios.get(`/api/v1/rooms/${this.roomsId}`)
          .then((result) => {
            this.roomData = result.data.data;
            this.imageList = result.data.data.imageUrl;

            console.log(this.disabledDates);
            console.log(this.disabledDateTimes);
            console.log(this.roomData);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("test");
          })
    },
    updateRoom: function () {
      this.accessToken = localStorage.getItem('accessToken')
      this.files = this.$refs.images.files[0]
      const frm = new FormData();
      const json = JSON.stringify(this.data);
      const blob = new Blob([json], { type: "application/json" });
      console.log(this.files);
      frm.append('data',blob)
      frm.append('files', this.files)
      axios.post(`/api/v1/rooms`, frm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": this.accessToken
            }
          }).then((res) => {
        window.alert("성공")
        console.log(res);
        router.push({name:"HomePage"})
      }).catch((error) => {
        window.alert("실패")
        console.log(error)
      }).finally(() => {
        console.log("test");
      })
    },
    updateRoomIsClosed: function () {
      this.isChangedIsClosed = false;
      let params = {
        isClosed: this.roomData.isClosed
      }
      axios.patch(`/api/v1/rooms/${this.roomsId}/changeClosed`, params)
          .then(() => {
            this.isChangedIsClosed = true;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("test");
          })
    },
    saveImage: function () {
      let params = {
        removeImages: this.removeImages
      };
      const frm = new FormData();
      const blob = new Blob([params], { type: "application/json" });
      console.log(this.files);
      frm.append('data',blob)
      frm.append('files', this.files)
      axios.patch(`/api/v1/rooms/${this.roomsId}/changeClosed`, frm)
          .then(() => {
            this.isChangedIsClosed = true;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            console.log("test");
          })

    },
    removeImage: function (image) {
      this.roomData.imageUrl = this.roomData.imageUrl.filter((item) => item!= image);
      this.removeImages.push(image);
    },

    previewImage: function (file) {
      console.log(file);
      try {
        return URL.createObjectURL(file);
      } catch {
        console.log("not image!")
      }
    },
    selectRestDate(data) {
      this.selectRestTimes = data;
    },
    addRestDate: function () {
      
      this.dialog = false;
      let params = this.selectRestTimes;
      axios.post(`/api/v1/rooms/${this.roomsId}/addRestTime`, params, this.authHeader())
          .then(() => {
            this.isChangedIsClosed = true;
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
    this.getEquipment();
       
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>