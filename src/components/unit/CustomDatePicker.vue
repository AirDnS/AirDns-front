<template>      
  <div>
    <v-container>
      <v-row justify="space-around">
        <VueDatePicker
        v-model="selectedDate" 
        inline 
        model-type="yyyy-MM-dd" 
        auto-apply
        locale="ko"
        :min-date="new Date()"
        :enable-time-picker="false"
        :disabled-dates="disabledDates"
        @update:model-value="selectDate"
        >
        </VueDatePicker>
      </v-row>
    </v-container>
    
    <div style="width: 273px; white-space: nowrap;overflow: auto;">
      
    <perfect-scrollbar style="height: 40px;">
        <v-btn 
        size="small" 
        :disabled="selectRange[0]-1 > t || selectRange[1]+1 < t || (selectRange[0]+1 <= t && selectRange[1]-1 >= t)"
        :color="calButtonColor(t)"
        v-for="t in allowTimes" 
        :key="t" 
        @click="selectTimeButton(t)"
        >
          {{String(t).padStart(2, "0")}}:00
        </v-btn>
      </perfect-scrollbar>

      </div>
    <h5 class="font-weight-medium text-body-2">선택 시간 : {{selectedDateMessage}} </h5>
  </div>
</template>

<script>

export default {
  props: ['reservatedTimeList'],
  data: function () {
    return {
      selectedDate: null,
      selectedDateMessage: "",
      disabledDates: [], // ["2021-01-31", "2021-01-31"]
      disabledDateTimes: {}, // {"2021-01-31" : [[시작,끝], [시작,끝]]}
      allowTimes: [], // [5,6,7,10,11,12]
      selectRange: [], //[시작, 끝]
      selectedTime: [],
    }
  },
  methods: {
    selectDate: function (selectedDate) {
      this.allowTimes = [];
      this.selectRange = [];
      this.selectedDateMessage = "";
      this.calSelectDateMessage();

      let date = this.disabledDateTimes[selectedDate];
      if (date == null || date.length == 0) {
        for ( let i = 6; i < 23; i++) {
          this.allowTimes.push(i);
        }
        return;
      }

      // 정렬되어있음, 순서대로 비교
      let index = 0;
      for ( let i = 6; i < 23; i++) {
        if (index >= date.length) {
          this.allowTimes.push(i);
          continue;
        }

        if (date[index][0] <= i && i < date[index][1]) {
          continue;
        } else {
          this.allowTimes.push(i);
          if (date[index][1] <= i) {
            index++;
          }
        }
      }
      
    },
    getDateString: function (date) {
      return date.getFullYear() +
        '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
        '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
    },
    getTimeString: function (date) {
      // 시간만 예약 가능
      return date.getHours();
    },
    selectTimeButton: function (t) {
      console.log(this.selectRange);
      if (this.selectRange[0] == null) {
        this.selectRange[0] = t;
        this.selectRange[1] = t;
      } else if (this.selectRange[0] == t && this.selectRange[1] == t) {
        this.selectRange = [];
      } else if (this.selectRange[0] == t) {
        this.selectRange[0] = t+1;
      } else if (this.selectRange[1] == t) {
        this.selectRange[1] = t-1;
      } else if (this.selectRange[0] > t) {
        this.selectRange[0] = t;
      } else if (this.selectRange[1] < t) {
        this.selectRange[1] = t;
      }        
      this.calSelectDateMessage();
      this.sendDate();
      
    },
    calButtonColor: function (t) {
      if (this.selectRange[0] <= t && t <= this.selectRange[1] ) {
        return "primary"
      }
      return "secondary";
    },
    calSelectDateMessage: function () {
      this.selectedDateMessage = this.selectedDate + " " 
                + (this.selectRange.length > 0 
                  ? (String(this.selectRange[0]).padStart(2, "0") + ":00 ~ " 
                    + String(this.selectRange[1]+1).padStart(2, "0") + ":00")
                  : "");
                  
      console.log(this.selectedDateMessage);

    },
    setDisabledDate() {
      if (this.reservatedTimeList == null) {
        return;
      }

      this.reservatedTimeList.forEach((rsArr) => {
              let startdate = new Date(rsArr[0]);
              let enddate = new Date(rsArr[1]);
              if (this.disabledDateTimes[this.getDateString(startdate)] == null) {
                this.disabledDateTimes[this.getDateString(startdate)] = [];
              } 
              this.disabledDateTimes[this.getDateString(startdate)].push([this.getTimeString(startdate), this.getTimeString(enddate)]);
            })

      for (let key of Object.keys(this.disabledDateTimes)) {
        let value = this.disabledDateTimes[key];
        value.sort((a, b) => a[0] - b[0]);
        if (value[0][0] > 6) {
          continue;
        }
        if (value[value.length - 1][1] < 23) {
          continue;
        }

        let hasInterval = false;
        for (let i = 0; i < value.length-1; i++) {
          if (value[i][1] > value[i+1][0]) {
            hasInterval = true;
            continue;
          }
        }

        if (hasInterval) {
          continue;
        }

        this.disabledDates.push(key);

      }
    },

    sendDate() {
      this.$emit('select', {
        "startDate": this.selectedDate + " " + String(this.selectRange[0]).padStart(2, "0") + ":00",
        "endDate": this.selectedDate + " " + String(this.selectRange[1]+1).padStart(2, "0") + ":00"
      })

    }

  },
  created() {
    this.selectedDate = this.getDateString(new Date());
    this.selectDate(this.selectedDate); 
    this.setDisabledDate();
  }
}
</script>