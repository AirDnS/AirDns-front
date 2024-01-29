<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="540px">
      <v-form @submit.prevent="postCreateRoom">
        <v-text-field
            v-model="data.name"
            label="방 이름"
            variant="outlined"
        ></v-text-field>
        <v-textarea
            v-model="data.desc"
            label="방 상세설명"
            auto-grow
            variant="outlined"
            row-height="25"
            shaped
        ></v-textarea>
        <v-text-field
            v-model="data.address"
            label="방 주소"
            variant="outlined"
        ></v-text-field>
        <v-text-field
            v-model="data.price"
            label="방 가격"
            variant="outlined"
            placeholder="시간당 가격 기준으로 입력해주세요"
        ></v-text-field>
        <v-text-field
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
        <v-btn
            block
            color="primary"
            size="large"
            type="submit"
            variant="elevated">
          등록하기
        </v-btn>
      </v-form>
    </v-card>
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
      accessToken: {
        accessToken: ""
      },
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
    }
  },
  methods: {
    getEquipment: function () {
      this.example12.options = JSON.parse(localStorage.getItem("equipment")).options;
      console.log(JSON.parse(localStorage.getItem("equipment")).options);
    },
    postCreateRoom: function () {
      const frm = new FormData();
      const json = JSON.stringify(this.data);
      const blob = new Blob([json], { type: "application/json" });
      frm.append('data',blob);      
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
        router.push({name:"HomePage"})
      }).catch((error) => {
        window.alert("실패")
        console.log(error)
      }).finally(() => {
        console.log("test");
      })
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

<style src="@vueform/multiselect/themes/default.css"></style>