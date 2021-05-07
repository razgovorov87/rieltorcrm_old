<template>
  <div v-if="info" class="py-4 px-6 flex flex-col h-full overflow-y-auto">
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
          <div class="w-2/3 flex-grow flex items-center justify-between pl-2 pr-4">
            {{ info.phone }}
            <span v-if="info.missedCall" class="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
              </svg>
              <span class="absolute -top-12 -left-24 transform translate-x-1.5 text-white bg-darkDivider z-50 rounded py-1 px-2 opacity-0 transition duration-300 group-hover:opacity-100">Пропущенный</span>
            </span>
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

      <!-- <div class="flex items-center">
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
      </div> -->

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
<!-- 
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
      </div> -->

      <div v-if="compositionType && composition" class="flex flex-col">
        <div class="flex items-center">
          <span class="font-medium text-gray-600">Состав проживающих:</span>
          <span class="text-sm rounded-full font-medium py-1 px-3 bg-white shadow text-center ml-2">{{compositionType}}</span>
        </div>
        <div class="flex flex-col flex-grow">


          <template v-if="compositionType === 'Семья'">
            <div v-if="composition.man" class="flex flex-col border-b border-gray-300 py-2">

              <span class="font-medium w-24 text-gray-600">Муж:</span>
              <div class="flex flex-col pl-2">
                <p v-if="composition.man.age" class="italic"><span class="border-b border-gray-400 border-dashed">Возраст:</span> {{composition.man.age}}</p>
                <p v-if="composition.man.work" class="italic"><span class="border-b border-gray-400 border-dashed">Сфера деятельности:</span> {{composition.man.work}}</p>
                <p v-if="composition.man.national" class="italic"><span class="border-b border-gray-400 border-dashed">Гражданство:</span> {{composition.man.national}}</p>
                <p v-if="composition.man.register" class="italic"><span class="border-b border-gray-400 border-dashed">Прописка:</span> {{composition.man.register}}</p>
              </div>

            </div>

            <div v-if="composition.woman" class="flex flex-col border-b border-gray-300 py-2">

              <span class="font-medium w-24 text-gray-600">Жена:</span>
              <div class="flex flex-col pl-2">
                <p v-if="composition.woman.age" class="italic"><span class="border-b border-gray-400 border-dashed">Возраст:</span> {{composition.woman.age}}</p>
                <p v-if="composition.woman.work" class="italic"><span class="border-b border-gray-400 border-dashed">Сфера деятельности:</span> {{composition.woman.work}}</p>
                <p v-if="composition.woman.national" class="italic"><span class="border-b border-gray-400 border-dashed">Гражданство:</span> {{composition.woman.national}}</p>
                <p v-if="composition.woman.register" class="italic"><span class="border-b border-gray-400 border-dashed">Прописка:</span> {{composition.woman.register}}</p>
              </div>

            </div>

            <div class="flex flex-col border-b border-gray-300 py-2">

              <span class="font-medium w-24 text-gray-600">Дети:</span>
              <ul v-if="composition.kids" class="flex flex-col m-0 pl-6 list-decimal">
                <li v-for="(kid, idx) in composition.kids" :key="kid + idx"  class="italic"><span class="border-b border-gray-400 border-dashed">Возраст:</span> {{kid.age}}</li>
              </ul>

            </div>

            <div class="flex flex-col border-b border-gray-300 py-2">

              <span class="font-medium w-24 text-gray-600">Питомцы:</span>
              <ul v-if="composition.animals" class="flex flex-col m-0 pl-6 list-decimal">
                <li v-for="(pet, idx) in composition.animals" :key="pet + idx"  class="italic">
                  <span v-if="pet.type" class="italic">{{pet.type}}</span>
                  <span v-if="pet.age" class="italic"> • {{pet.age + ' лет'}}</span>
                  <span v-if="pet.comment" class="italic"> • {{pet.comment}}</span>
                </li>
              </ul>

            </div>
          </template>

          <template v-if="compositionType === 'Парень с девушкой'">
            <div v-if="composition.man" class="flex flex-col border-b border-gray-300 py-2">

              <span class="font-medium w-24 text-gray-600">Муж:</span>
              <div class="flex flex-col pl-2">
                <p v-if="composition.man.age" class="italic"><span class="border-b border-gray-400 border-dashed">Возраст:</span> {{composition.man.age}}</p>
                <p v-if="composition.man.work" class="italic"><span class="border-b border-gray-400 border-dashed">Сфера деятельности:</span> {{composition.man.work}}</p>
                <p v-if="composition.man.national" class="italic"><span class="border-b border-gray-400 border-dashed">Гражданство:</span> {{composition.man.national}}</p>
                <p v-if="composition.man.register" class="italic"><span class="border-b border-gray-400 border-dashed">Прописка:</span> {{composition.man.register}}</p>
              </div>

            </div>

            <div v-if="composition.woman" class="flex flex-col border-b border-gray-300 py-2">

              <span class="font-medium w-24 text-gray-600">Жена:</span>
              <div class="flex flex-col pl-2">
                <p v-if="composition.woman.age" class="italic"><span class="border-b border-gray-400 border-dashed">Возраст:</span> {{composition.woman.age}}</p>
                <p v-if="composition.woman.work" class="italic"><span class="border-b border-gray-400 border-dashed">Сфера деятельности:</span> {{composition.woman.work}}</p>
                <p v-if="composition.woman.national" class="italic"><span class="border-b border-gray-400 border-dashed">Гражданство:</span> {{composition.woman.national}}</p>
                <p v-if="composition.woman.register" class="italic"><span class="border-b border-gray-400 border-dashed">Прописка:</span> {{composition.woman.register}}</p>
              </div>

            </div>

            <div class="flex flex-col border-b border-gray-300 py-2">

              <span class="font-medium w-24 text-gray-600">Питомцы:</span>
              <ul v-if="composition.animals" class="flex flex-col m-0 pl-6 list-decimal">
                <li v-for="(pet, idx) in composition.animals" :key="pet + idx"  class="italic">
                  <span v-if="pet.type" class="italic">{{pet.type}}</span>
                  <span v-if="pet.age" class="italic"> • {{pet.age + ' лет'}}</span>
                  <span v-if="pet.comment" class="italic"> • {{pet.comment}}</span>
                </li>
              </ul>

            </div>
          </template>

          <template v-if="compositionType === 'Один человек' || compositionType === 'Друзья' || compositionType === 'Другой состав' ">
            <div v-for="(people, idx) in peoplesArr(compositionType)" :key="people + idx" class="flex flex-col border-b border-gray-300 py-2">

              <span v-if="compositionType !== 'Один человек'" class="font-medium w-24 text-gray-600">{{idx + 1}}:</span>
              <span v-else class="font-medium w-24 text-gray-600">Человек:</span>
              <div class="flex flex-col pl-2">
                <p v-if="people.gender" class="italic"><span class="border-b border-gray-400 border-dashed">Пол:</span> {{people.gender}}</p>
                <p v-if="people.age" class="italic"><span class="border-b border-gray-400 border-dashed">Возраст:</span> {{people.age}}</p>
                <p v-if="people.work" class="italic"><span class="border-b border-gray-400 border-dashed">Сфера деятельности:</span> {{people.work}}</p>
                <p v-if="people.national" class="italic"><span class="border-b border-gray-400 border-dashed">Гражданство:</span> {{people.national}}</p>
                <p v-if="people.register" class="italic"><span class="border-b border-gray-400 border-dashed">Прописка:</span> {{people.register}}</p>
              </div>

            </div>
          </template>

        </div>
      </div>

      <div v-if="reserveArr" class="flex flex-col mt-4">
        <div class="flex items-center">
          <span class="font-medium text-gray-600 mb-2">Просмотры квартир:</span>
        </div>
        <div class="flex flex-col flex-grow rounded overflow-hidden border-2 border-gray-300">
          <div v-for="(item, idx) in sortedReserve" :key="item + idx" class="w-full bg-white px-3 py-2 border-b flex items-center justify-between">

            <div class="flex items-center flex-grow">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>

              <span class="ml-1 border-b border-dashed border-gray-400 text-sm">{{item.date | date('fullmonthDay') }} в {{ item.time }}</span>
            </div>

            <div class="flex items-center mr-2 pr-2 border-r border-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>

              <span class="ml-1 text-sm">{{ takeAgentInfo(item.agent) }}</span>
            </div>

            <div class="flex items-center">
              <a :href="item.obj.link" target="__blank">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>

    <div class="flex flex-grow"></div>
    <div v-if="info.comment">
      <div class="flex flex-col">
        <label class="font-medium text-gray-600">Комментарий менеджера</label>
        <div class="flex bg-white rounded-lg border p-3 shadow">
          {{info.comment}}
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
    budget: 0,
    composition: null,
    compositionType: null,
    reserveArr: null,
    agents: null
  }),

  watch: {
    fio() {
      if (this.fio !== this.info.fio && this.fio !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },

    // company() {
    //   if (this.company !== this.info.company && this.company !== "")
    //     this.$emit("openSave", true);
    //   else this.$emit("openSave", false);
    // },

    budget() {
      if (this.budget !== this.info.budget && this.budget !== "")
        this.$emit("openSave", true);
      else this.$emit("openSave", false);
    },

    // adress() {
    //   if (this.adress !== this.info.adress && this.adress !== "")
    //     this.$emit("openSave", true);
    //   else this.$emit("openSave", false);
    // },
  },

  created() {
    if (Object.keys(this.info).length !== 0) {
      this.fio = this.info.fio ? this.info.fio : "";
      // this.company = this.info.company ? this.info.company : "";
      this.budget = this.info.budget ? this.info.budget : 0;
      // this.adress = this.info.adress ? this.info.adress : "";
      this.compositionType = this.info.compositionType ? this.info.compositionType : 0;
      this.composition = this.info.composition ? this.info.composition : 0;
    }

  },

  async mounted() {
    this.updateReserve()
    this.agents = await this.$store.dispatch('fetchAgents')
  },

  methods: {
    async updateReserve() {
        this.reserveArr = await this.$store.dispatch('fetchClientReserves', this.info.id)
    },

    updateInfo(info) {
      this.fio = info.fio;
      // this.company = company;
      this.budget = info.budget;
      // this.adress = adress;
      this.composition = info.composition
      this.compositionType = info.compositionType
    },

    fioVerify() {
      if (this.fio.length < 3) return false;
      else return true;
    },

    cancel() {
      this.fio = this.info.fio;
      // this.company = this.info.company;
      this.budget = this.info.budget;
      // this.adress = this.info.adress;
      this.$emit("openSave", false);
    },

    getClientInfo() {
      return {
        fio: this.fio,
        // company: this.company,
        budget: this.budget,
        // adress: this.adress,
      };
    },

    peoplesArr(type) {
      if( type === 'Друзья' ) return this.composition.friends
      if( type === 'Другой состав' ) return this.composition.peoples
      else return this.composition
    },

    takeAgentInfo(id) {
			if (this.agents) {
				const agent = this.agents.filter((agent) => agent.id === id);
				if (agent[0]) return agent[0].surname + ' ' + agent[0].name;
			}
		},

  },

  computed: {
    sortedReserve() {
      if(!this.reserveArr) return []
      const result = this.reserveArr.sort( function(a, b) {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)

        return dateA - dateB
      })

      return result
    }
  },

  components: {
    CurrencyInput,
  },
};
</script>
