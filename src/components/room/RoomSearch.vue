<template>
  <div class="search-field">
  <v-card class="search-card">
    <div class = "one">
      <v-dialog v-model="priceFlag" persistent>
        <template v-slot:activator="{ props }">
          <v-btn  v-bind="props"> price </v-btn>
        </template>
        <v-card class = "test-modal">
          <v-range-slider
              class="slider"
              thumb-label="always"
              ticks
              :max="priceMax"
              :min="priceMin"
              step="1000"
              v-model="priceValue"
          ></v-range-slider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="priceFlag = false">
              exit
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="priceFlag = false">
              save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class = "two">
      <v-dialog v-model="sizeFlag">
        <template v-slot:activator="{ props }">
          <v-btn  v-bind="props"> size </v-btn>
        </template>
        <v-card class = "test-modal">
          <v-range-slider
              class="slider"
              thumb-label="always"
              ticks
              :max="sizeMax"
              :min="sizeMin"
              step="1"
              v-model="sizeValue"
          ></v-range-slider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="sizeFlag = false">
              exit
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="sizeFlag = false">
              save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class = "three">
      <v-dialog v-model="equipmentFlag" persistent>
        <template v-slot:activator="{ props }">
          <v-btn  v-bind="props"> equipment </v-btn>
        </template>
        <v-card class = "test-modal">
          <Multiselect
              v-model="equipment"
              v-bind="example12"
          ></Multiselect>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="equipmentFlag = false">
              exit
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="equipmentFlag = false">
              save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-text-field  class = "four"  v-model="text" height="70px">
    </v-text-field>
    <v-btn variant="outlined" v-on:click="sendRoomList" class="five" > 검색
    </v-btn>
  </v-card>
  </div>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import axios from "@/axios";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      priceFlag : false,
      sizeFlag : false,
      equipmentFlag : false,
      priceMin : 0,
      priceMax : 50000,
      priceValue: [0, 50000],
      sizeMin : 0,
      sizeMax : 50,
      sizeValue: [0, 50],
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
      equipment: [],
      sendItem: {},
      text : "",
    }
  },
  methods : {
    sendRoomList: function () {
      const keyword = this.text;
      const priceArr = this.priceValue.join(',');
      const sizeArr = this.sizeValue.join(',');
      const equipmentArr = this.equipment.join(',');
      console.log(priceArr)
      console.log(sizeArr)
      console.log(equipmentArr)
      axios.get(`/api/v1/rooms`, {
        params: {
          keyword: keyword,
          price: priceArr,
          size: sizeArr,
          equipment: equipmentArr
        }
      })
          .then((result) => {
            console.log(result)
            this.sendItem = result.data.data.content;
            this.emitter.emit("send",this.sendItem);
          })
          .catch((error) => {
            window.alert(error)
          })
          .then(() => {
            console.log("test")
          })
    },
    getEquipment: function () {
      axios.get('/api/v1/equipments')
          .then((res) => {
            this.example12.options = res.data.data;
            localStorage.setItem("equipment", JSON.stringify(this.example12));
          })
    },
  },
  created() {
    this.getEquipment();
  }
}
</script>

<style>
.search-field {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 70px;
  justify-content: center;
}
.search-card {
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
}
.one {
  grid-column: 1/2;
}

.two {
  grid-column: 2/3;
}

.three {
  grid-column: 3/4;
}

.four {
  margin-top: 10px;
  grid-column: 4/6;
}
.five {
  margin-top: 20px;
  grid-column: 6/7;
}

.test-modal {
  align-content: center;
  width: 300px;
  height: 180px;
}

.slider {
  margin-top: 40px;
  padding-right: 20px;
  padding-left: 20px;
}

</style>