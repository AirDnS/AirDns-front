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
          <div class="postcodeBox">
            <v-text-field
              :rules="[v =>  !!v || '주소를 입력해주세요.']"
              type="text"
              v-model="data.address"
              placeholder="주소"
              readonly></v-text-field>
            <v-btn class="post-btn" id="postcode" @click="openPostcode">검색
            </v-btn>
          </div>
          <v-text-field
              :rules="[v =>  !!v || '상세 주소를 입력해주세요.']"
              v-model="addressDetail"
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
          <!-- <div class="output">Data: {{ data.equipment }}</div> -->
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
      addressDetail: "",
      data: {
        name: "",
        price: "",
        address: "",
        size: "",
        desc: "",
        equipment: [],
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
    }
  },
  methods: {
    getEquipment: function () {
      this.example12.options = JSON.parse(localStorage.getItem("equipment")).options;
      console.log(JSON.parse(localStorage.getItem("equipment")).options);
    },
    postCreateRoom: async function () {
      const { valid } = await this.$refs.form.validate();
      if (!valid)
        return;

      const frm = new FormData();
      this.data.address = this.data.address + " " + this.addressDetail
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
    openPostcode() {
      new window.daum.Postcode({
        width: 500,
        height: 600,
        theme: this.themeObj,
        oncomplete: (data) => {
          this.data.address = data.roadAddress;
        }
      }).open({
        left: (window.screen.width / 2) - (500 / 2),
        top: (window.screen.height / 2) - (600 / 2),
      });
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
  },
  mounted() {
    this.getEquipment();
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

</style>