<template>
  <v-sheet class="pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="60%" :elevation="12">
      <v-form>
        <v-text-field
            label="스터디 룸 이름"
            variant="outlined"
        ></v-text-field>
        <v-textarea
            label="스터디 룸 상세설명"
            auto-grow
            variant="outlined"
            row-height="25"
            shaped
        ></v-textarea>
        <v-text-field
            label="스터디 룸 주소"
            variant="outlined"
        ></v-text-field>
        <v-text-field
            label="스터디 룸 가격"
            variant="outlined"
            placeholder="시간당 가격 기준으로 입력해주세요"
        ></v-text-field>
        <v-text-field
            label="스터디 룸 사이즈"
            variant="outlined"
            placeholder="평수기준으로 입력해주세요"
        ></v-text-field>
        <Multiselect
            v-model="example12.value"
            v-bind="example12"
        ></Multiselect>
        <br>
        <v-file-input label="File input" variant="outlined"></v-file-input>
        <br>
        <v-btn
            block
            color="primary"
            size="large"
            type="submit"
            variant="elevated"
        >
          등록하기
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Multiselect,
  },
  data: function () {
    return {
      example12: {
        mode: 'tags',
        groups: true,
        value: [
          {value: 'BackboneJS', label: 'BackboneJS'},
          {value: 'EmberJS', label: 'EmberJS'},
        ],
        placeholder: 'Select options',
        closeOnSelect: false,
        searchable: true,
        object: true,
        options: [
          {
            label: 'DC',
            options: ['Batman', 'Robin', 'Joker'],
          },
          {
            label: 'Marvel',
            options: ['Spiderman', 'Iron Man', 'Captain America'],
          },
        ]
      },
    }
  },
  methods: {
    getEquipnmet :function () {
    }
  },
  created() {
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>