<template>
  <div class="flex flex-col px-8 py-4">
    <div class="flex items-center">
      <span class="font-medium text-gray-500 flex-shrink-0 w-48"
        >Состав проживающих</span
      >
      <div
        class="flex-grow border rounded bg-white cursor-pointer relative border-gray-100"
      >
        <div
          class="flex justify-between items-center px-4 py-2"
          @click="openList = true"
        >
          <span v-if="family">{{ family }}</span>
          <span v-else class="text-gray-400"
            >Выберите подходящих вариант из списка...</span
          >
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
          class="absolute top-full h-20 w-full right-0 pt-2 z-30"
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
                  family = $event.target.innerText;
                  openList = false;
                }
              "
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <TypeFamily
      ref="typeFamily"
      v-if="family === 'Семья'"
      :clientinfo="
        client.compositionType === 'Семья' ? client.composition : null
      "
      @openSave="$emit('openSave', true)"
    />
    <TypeCouple
      ref="typeCouple"
      v-if="family === 'Парень с девушкой'"
      :clientinfo="
        client.compositionType === 'Парень с девушкой'
          ? client.composition
          : null
      "
      @openSave="$emit('openSave', true)"
    />
    <TypeOnce
      ref="typeOnce"
      v-if="family === 'Один человек'"
      :clientinfo="
        client.compositionType === 'Один человек' ? client.composition : null
      "
      @openSave="$emit('openSave', true)"
    />
    <TypeFriends
      ref="typeFriends"
      v-if="family === 'Друзья'"
      :clientinfo="
        client.compositionType === 'Друзья' ? client.composition : null
      "
      @openSave="$emit('openSave', true)"
    />
    <TypeOther
      ref="typeOther"
      v-if="family === 'Другой состав'"
      :clientinfo="
        client.compositionType === 'Другой состав' ? client.composition : null
      "
      @openSave="$emit('openSave', true)"
    />
  </div>
</template>



<script>
import TypeFamily from "@/components/Clients/Tab/Family/TypeFamily";
import TypeCouple from "@/components/Clients/Tab/Family/TypeCouple";
import TypeOnce from "@/components/Clients/Tab/Family/TypeOnce";
import TypeFriends from "@/components/Clients/Tab/Family/TypeFriends";
import TypeOther from "@/components/Clients/Tab/Family/TypeOther";
export default {
  props: ["client"],
  data: () => ({
    family: "",
    list: [
      "Семья",
      "Парень с девушкой",
      "Один человек",
      "Друзья",
      "Другой состав",
    ],
    openList: false,
  }),

  mounted() {
    this.family = this.client.compositionType
      ? this.client.compositionType
      : "";
  },

  methods: {
    saveInfo() {
      let data;
      if (this.family === "Семья") {
        data = this.getInfoTypeFamily();
      } else if (this.family === "Парень с девушкой") {
        data = this.getInfoTypeCouple();
      } else if (this.family === "Один человек") {
        data = this.getInfoTypeOnce();
      } else if (this.family === "Друзья") {
        data = this.getInfoFriends();
      } else if (this.family === "Другой состав") {
        data = this.getInfoOthers();
      } else {
        data = null
      }

      this.$store.dispatch("saveClientComposition", [
        this.client.id,
        data,
        this.family,
      ]);
    },

    getInfoTypeFamily() {
      return {
        man: {
          age: this.$refs.typeFamily.manAge,
          work: this.$refs.typeFamily.manWork,
          national: this.$refs.typeFamily.manNational,
          register: this.$refs.typeFamily.manRegister
        },
        woman: {
          age: this.$refs.typeFamily.womanAge,
          work: this.$refs.typeFamily.womanWork,
          national: this.$refs.typeFamily.womanNational,
          register: this.$refs.typeFamily.womanRegister
        },
        kids: this.$refs.typeFamily.kids,
        animals: this.$refs.typeFamily.animals,
      };
    },

    getInfoTypeCouple() {
      return {
        man: {
          age: this.$refs.typeCouple.manAge,
          work: this.$refs.typeCouple.manWork,
          national: this.$refs.typeCouple.manNational,
          register: this.$refs.typeCouple.manRegister
        },
        woman: {
          age: this.$refs.typeCouple.womanAge,
          work: this.$refs.typeCouple.womanWork,
          national: this.$refs.typeCouple.womanNational,
          register: this.$refs.typeCouple.womanRegister
        },
        animals: this.$refs.typeCouple.animals,
      };
    },

    getInfoTypeOnce() {
      return {
        human: {
          age: this.$refs.typeOnce.humanAge,
          work: this.$refs.typeOnce.humanWork,
          gender: this.$refs.typeOnce.humanGender,
          national: this.$refs.typeOnce.humanNational,
          register: this.$refs.typeOnce.humanRegister
        },
      };
    },

    getInfoFriends() {
      return {
        friends: this.$refs.typeFriends.friends
      }
    },

    getInfoOthers() {
      return {
        peoples: this.$refs.typeOther.peoples
      }
    },


  },

  components: {
    TypeFamily,
    TypeCouple,
    TypeOnce,
    TypeFriends,
    TypeOther
  },
};
</script>
