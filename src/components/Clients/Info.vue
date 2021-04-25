<template>
  <div v-if="info" class="py-4 px-6 flex flex-col">
    <div class="flex justify-between">
      <h3 class="text-xl font-semibold items-center flex-grow">
        Информация о клиенте
      </h3>
    </div>

    <div class="flex flex-col space-y-3 mt-4">
      <div class="flex items-center">
        <label class="font-medium w-24 text-gray-600">Телефон</label>
        <div class="flex flex-grow bg-white rounded border-2 border-gray-300">
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div class="w-2/3 flex-grow flex items-center pl-2">
            {{ info.phone }}
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <label class="font-medium text-gray-600 w-24">ФИО</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <input
            v-model="fio"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
          />
        </div>
      </div>

      <div class="flex items-center">
        <label class="font-medium text-gray-600 w-24">Компания</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input
            v-model="company"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
          />
        </div>
      </div>

      <div class="flex items-center">
        <label class="font-medium w-24 text-gray-600">Бюджет</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <currency-input
            v-model="budget"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
            currency="RUB"
            :precision="0"
            :distraction-free="false"
          />
        </div>
      </div>

      <div class="flex items-center">
        <label class="font-medium w-24 text-gray-600">Адрес</label>
        <div
          class="flex flex-grow bg-white rounded border-2 border-gray-300 group focus:ring-2 ring-blue-500"
        >
          <div
            class="flex items-center justify-center py-2 px-3 bg-gray-200 flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <input
            v-model="adress"
            class="w-2/3 flex-grow flex items-center pl-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CurrencyInput } from "vue-currency-input";
export default {
  props: ["info"],
  data: () => ({
    fio: "",
    company: "",
    budget: 0,
    adress: "",
  }),

  watch: {
    fio() {
      if (this.fio !== this.info.fio && this.fio !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },

    company() {
      if (this.company !== this.info.company && this.company !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },

    budget() {
      if (this.budget !== this.info.budget && this.budget !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },

    adress() {
      if (this.adress !== this.info.adress && this.adress !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },
  },

  created() {
    if (Object.keys(this.info).length !== 0) {
      this.fio = this.info.fio ? this.info.fio : "";
      this.company = this.info.company ? this.info.company : "";
      this.budget = this.info.budget ? this.info.budget : 0;
      this.adress = this.info.adress ? this.info.adress : "";
    }
  },

  methods: {
    updateInfo({ fio, budget, company, city, adress }) {
      this.fio = fio;
      this.company = company;
      this.budget = budget;
      this.adress = adress;
    },
    fioVerify() {
      if (this.fio.length < 3) return false;
      else return true;
    },

    cancel() {
      this.fio = this.info.fio;
      this.company = this.info.company;
      this.budget = this.info.budget;
      this.adress = this.info.adress;
      this.$emit("openSave", false);
    },

    getClientInfo() {
      return {
        fio: this.fio,
        company: this.company,
        budget: this.budget,
        adress: this.adress,
      };
    },
  },

  computed: {
    openSave() {
      const fio = this.info.fio;
      if (
        fio !== this.fio ||
        this.info.company !== this.company ||
        this.info.budget !== this.budget ||
        this.info.adress !== this.adress
      ) {
        this.$emit("openSave", true);
      } else {
        this.$emit("openSave", false);
      }
    },
  },

  components: {
    CurrencyInput,
  },
};
</script>
