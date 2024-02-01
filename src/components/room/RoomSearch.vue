<template>
  <div class="search-field">
    <v-card class="search-card" color="grey-lighten-5">
      <div class="search-button">
        <v-dialog v-model="priceFlag" width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props"> 
              {{ elements.priceValue[0] != priceMin || elements.priceValue[1] != priceMax 
                ? "₩ " + this.elements.priceValue.join(' ~ ₩ ') 
                : "가격 선택"}}
            </v-btn>
          </template>
          <v-card class="test-modal">
            <v-range-slider
                class="slider"
                thumb-label="always"
                ticks
                :max="priceMax"
                :min="priceMin"
                step="1000"
                v-model="elements.priceValue"
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
      <div class="search-button">
        <v-dialog v-model="sizeFlag" width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              {{ elements.sizeValue[0] != sizeMin || elements.sizeValue[1] != sizeMax 
                ? this.elements.sizeValue.join(' 평 ~ ') + " 평"
                : "평수 선택"}}
            </v-btn>
          </template>
          <v-card class="test-modal">
            <v-range-slider
                class="slider"
                thumb-label="always"
                ticks
                :max="sizeMax"
                :min="sizeMin"
                step="1"
                v-model="elements.sizeValue"
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
      <div class="search-button">
        <v-dialog v-model="equipmentFlag" width="500">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="text-truncate"> {{ this.equipmentLabel.length != 0 ? this.equipmentLabel : "장비선택" }}</v-btn>
          </template>
          <v-card class="test-modal" height="300">
            <div class="ma-5">
              <Multiselect
                  v-model="elements.equipment"
                  v-bind="example12"
                  @change="changeEquipment"
              ></Multiselect>
            </div>
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
      <div class="search-input-area">
        <v-text-field 
          clearable 
          hide-details="auto"
          density="compact"
          variant="solo"
          class="search-input" 
          v-model="elements.text" 
          @keydown.enter="sendRoomList">
        </v-text-field>
        <v-btn icon="mdi mdi-magnify" rounded="sm" variant="text" elevation="1" density="comfortable"  v-on:click="sendRoomList"></v-btn>
        <v-btn icon="mdi mdi-undo-variant" rounded="sm" variant="text" elevation="1" density="comfortable" v-on:click="resetFilter" ></v-btn>      </div>
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
      priceFlag: false,
      sizeFlag: false,
      equipmentFlag: false,
      priceMin: 0,
      priceMax: 50000,
      sizeMin: 0,
      sizeMax: 50,
      equipmentLabel: "",
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
      elements: {
        text: "",
        priceValue: [0, 50000],
        sizeValue: [0, 50],
        equipment: [],
      },
      sendItem: {},
    }
  },
  methods: {
    changeEquipment: function (value, select) {
      console.log(value);
      this.equipmentLabel = select.ariaLabel;
    },
    sendRoomList: function () {
      
      this.$store.commit("setSearchFilter", {
        keyword: this.elements.text,
        priceArr: this.elements.priceValue.join(','),
        sizeArr: this.elements.sizeValue.join(','),
        equipmentArr: this.elements.equipment.join(',')
      });

      this.$emit('search');
    },
    getEquipment: function () {
      axios.get('/api/v1/equipments')
          .then((res) => {
            this.example12.options = res.data.data;
            localStorage.setItem("equipment", JSON.stringify(this.example12));
          })
    },
    resetFilter() {
      this.elements = {
        text: "",
        priceValue: [0, 50000],
        sizeValue: [0, 50],
        equipment: [],
      };
      this.equipmentLabel = "";
      this.$store.commit("setSearchFilter", {});
      this.$emit('search');
    }
  },
  created() {
    this.getEquipment();
  },
}
</script>

<style>
.search-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
}

.search-button {
  margin: 10px;
  /* max-width: 200px; */
}

.search-input-area {
  margin: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
  flex-grow: 1;
}

.search-input {
  min-width: 200px;
  width: 100%;
  margin-right: 5px;
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