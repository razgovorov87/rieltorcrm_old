<template>
  <div class="flex flex-col mt-10">
    <div class="flex border-b pb-2 mb-2">
      <span
        class="flex items-center justify-center font-medium text-gray-700 flex-shrink-0 w-48"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          />
        </svg>
        Человек
      </span>
      <div class="flex flex-col flex-grow">
        <div
          class="flex-grow border rounded bg-white cursor-pointer relative border-gray-100 mb-2"
        >
          <div
            class="flex justify-between items-center px-4 py-2"
            @click="openList = true"
          >
            <span v-if="humanGender">{{ humanGender }}</span>
            <span v-else class="text-gray-400">Пол</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div
            v-if="openList"
            class="absolute top-full h-20 w-full right-0 pt-2 z-20"
            v-click-outside="
              () => {
                openList = false;
              }
            "
          >
            <div
              class="bg-white flex flex-col border rounded shadow border-gray-100 overflow-hidden"
            >
              <span
                v-for="(item, idx) in list"
                :key="item + idx"
                class="border-b px-4 py-2 hover:bg-dividerBg hover:text-white select-none"
                @click="
                  ($event) => {
                    humanGender = $event.target.innerText;
                    openList = false;
                    $emit('openSave', true);
                  }
                "
                >{{ item }}</span
              >
            </div>
          </div>
        </div>
        <input
          v-model="humanAge"
          type="number"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Возраст"
          @input="$emit('openSave', true)"
        />
        <input
          v-model="humanWork"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Сфера деятельности"
          @input="$emit('openSave', true)"
        />
        <input
          v-model="humanNational"
          type="number"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Гражданство"
          @input="$emit('openSave', true)"
        />
        <input
          v-model="humanRegister"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Прописка"
          @input="$emit('openSave', true)"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["clientinfo"],
  data: () => ({
    humanGender: null,
    openList: false,
    list: ["Мужчина", "Женщина"],
    humanAge: null,
    humanWork: null,
    humanNational: null,
    humanRegister: null
  }),

  mounted() {
    if (!this.clientinfo) return;
    this.humanAge = this.clientinfo.human.age
      ? this.clientinfo.human.age
      : null;
    this.humanWork = this.clientinfo.human.work
      ? this.clientinfo.human.work
      : null;
    this.humanGender = this.clientinfo.human.gender
      ? this.clientinfo.human.gender
      : null;
    this.humanNational = this.clientinfo.human.national
      ? this.clientinfo.human.national
      : null;
    this.humanRegister = this.clientinfo.human.register
      ? this.clientinfo.human.register
      : null;
  },
};
</script>