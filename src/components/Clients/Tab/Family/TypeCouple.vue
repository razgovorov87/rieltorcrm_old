<template>
  <div class="flex flex-col mt-10">
    <div class="flex border-b pb-2 mb-2">
      <span
        class="flex items-center justify-center font-medium text-gray-700 flex-shrink-0 w-48"
      >
        <svg
          class="mr-2 w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          stroke="currentColor"
          fill="currentColor"
        >
          <path
            class="cls-1"
            d="M52.2586,72.67626l6.74487,8.99455-5.05971,43.75525H5.567S5.90819,106.48062,7.83352,95.249a11.98538,11.98538,0,0,1,6.45842-8.69964c11.23157-5.599,35.87708-13.8731,35.87708-13.8731Z"
          />
          <path
            class="cls-1"
            d="M122.433,125.42605h-47.113L68.99648,81.675l6.74487-8.99876h2.08542s24.64972,8.27413,35.88135,13.8731a11.99594,11.99594,0,0,1,6.45837,8.69964C122.09176,106.48062,122.433,125.42605,122.433,125.42605Z"
          />
          <path
            class="cls-1"
            d="M64,64.62753h0a22.227,22.227,0,0,1-21.81889-17.987L38.78137,29.1458A23.419,23.419,0,0,1,61.98722,2.57395h4.02555A23.419,23.419,0,0,1,89.21863,29.1458L85.81891,46.64051A22.227,22.227,0,0,1,64,64.62753Z"
          />
        </svg>
        Парень
      </span>
      <div class="flex flex-col flex-grow">

        <input
          v-model="manAge"
          type="number"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Возраст"
          @input="$emit('openSave', true)"
        />

        <input
          v-model="manWork"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Сфера деятельности"
          @input="$emit('openSave', true)"
        />

        <input
          v-model="manNational"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Гражданство"
          @input="$emit('openSave', true)"
        />

        <input
          v-model="manRegister"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Прописка"
          @input="$emit('openSave', true)"
        />
      </div>
    </div>

    <div class="flex border-b pb-2 mb-2">
      <span
        class="flex items-center justify-center font-medium text-gray-700 flex-shrink-0 w-48"
      >
        <svg
          class="mr-2 w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          stroke="currentColor"
          fill="currentColor"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            class="cls-1"
            d="M123.623,102.81192c-1.80056-6.60253-5.10795-10.22105-11.7037-12.25617-6.00814-2.01448-24.54409-8.52705-29.90514-10.61182-3.63094,6.77147-8.958,13.3453-18.01411,19.48483-9.05631-6.13953-14.38334-12.71336-18.01427-19.48483-5.361,2.08477-23.897,8.59734-29.90514,10.61182C9.48491,92.59087,6.17752,96.2094,4.377,102.81192c-2.03705,7.46984-2.40139,15.43717-2.40139,23.14253H126.02442C126.02442,118.24909,125.66009,110.28176,123.623,102.81192Zm-13.62371,9.71114h-17.147a2.85785,2.85785,0,0,1,0-5.71571h17.147a2.85785,2.85785,0,0,1,0,5.71571Z"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            class="cls-1"
            d="M47.16941,64.67007l.00532-.00064.00048.00064a25.78338,25.78338,0,0,0,2.49811,2.73009c.01886.0216.03917.0482.058.06964.02644,0,.02644.02628.05288.02628a21.15871,21.15871,0,0,0,14.21,5.46744l.0029-.00016.00193.00016.0029-.00016.0029.00016a21.15933,21.15933,0,0,0,14.211-5.46744c.02644,0,.02644-.02628.05288-.02628.01886-.02144.03917-.048.058-.06964a25.78338,25.78338,0,0,0,2.49811-2.73009l.00048-.00064.00339.00064c3.96384.79235,16.5363,1.21488,21.9773-3.196.81879-.66032-10.85557-41.09813-15.31932-48.73143A20.1041,20.1041,0,0,0,80.69872,5.7961C75.94447,2.89077,70.26568,2.04554,64.772,2.04554h-.52829c-.07851.00226-.16427.00806-.24359.01064-.07932-.00258-.16508-.00838-.24359-.01064h-.52829c-5.49372,0-11.17251.84523-15.92676,3.75056a20.1041,20.1041,0,0,0-6.78808,6.94655C36.04961,20.376,24.37525,60.81376,25.194,61.47408,30.635,65.885,43.20751,65.46242,47.16941,64.67007Z"
          />
        </svg>
        Девушка
      </span>
      <div class="flex flex-col flex-grow">

        <input
          v-model="womanAge"
          type="number"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Возраст"
          @input="$emit('openSave', true)"
        />

        <input
          v-model="womanWork"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Сфера деятельности"
          @input="$emit('openSave', true)"
        />

        <input
          v-model="womanNational"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Гражданство"
          @input="$emit('openSave', true)"
        />

        <input
          v-model="womanRegister"
          type="text"
          class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
          placeholder="Прописка"
          @input="$emit('openSave', true)"
        />
      </div>
    </div>

    <div class="flex border-b pb-2 mb-2">
      <span
        class="flex items-center justify-center font-medium text-gray-700 flex-shrink-0 w-48"
      >
        <svg
          class="mr-2 w-5 h-5 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
          stroke="currentColor"
          fill="currentColor"
        >
          <path
            d="M4.5,12 C3.11928813,12 2,10.8807119 2,9.5 C2,8.11928813 3.11928813,7 4.5,7 C5.88071187,7 7,8.11928813 7,9.5 C7,10.8807119 5.88071187,12 4.5,12 Z M9,8 C7.61928813,8 6.5,6.88071187 6.5,5.5 C6.5,4.11928813 7.61928813,3 9,3 C10.3807119,3 11.5,4.11928813 11.5,5.5 C11.5,6.88071187 10.3807119,8 9,8 Z M15,8 C13.6192881,8 12.5,6.88071187 12.5,5.5 C12.5,4.11928813 13.6192881,3 15,3 C16.3807119,3 17.5,4.11928813 17.5,5.5 C17.5,6.88071187 16.3807119,8 15,8 Z M19.5,12 C18.1192881,12 17,10.8807119 17,9.5 C17,8.11928813 18.1192881,7 19.5,7 C20.8807119,7 22,8.11928813 22,9.5 C22,10.8807119 20.8807119,12 19.5,12 Z M17.34,14.86 C18.65,16.17 20.26,17.62 19.95,19.66 C19.66,20.67 18.93,21.69 17.62,21.98 C16.89,22.12 14.56,21.54 12.08,21.54 L11.9,21.54 C9.42,21.54 7.09,22.13 6.36,21.98 C5.05,21.69 4.32,20.68 4.03,19.66 C3.73,17.63 5.34,16.18 6.65,14.87 C7.53,13.85 8.26,12.98 9.13,11.96 C9.6,11.42 10.18,10.88 10.88,10.64 C10.99,10.6 11.1,10.57 11.21,10.55 C11.47,10.5 11.74,10.5 12,10.5 C12.26,10.5 12.53,10.5 12.78,10.54 C12.89,10.56 13,10.59 13.11,10.63 C13.81,10.87 14.4,11.41 14.86,11.95 C15.74,12.97 16.47,13.84 17.34,14.86 Z"
            id="🔹-Primary-Color"
            fill="#1D1D1D"
          />
        </svg>
        Питомцы
      </span>
      <div class="flex flex-col flex-grow">
        <div
          v-for="(animal, idx) in animals"
          :key="animal + idx"
          class="flex items-center"
        >
          <div class="flex flex-col flex-grow">
            <div class="flex">
              <input
                v-model="animals[idx].type"
                type="text"
                class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2 mr-2"
                placeholder="Кошка, собака, хомяк и т.д."
                @input="$emit('openSave', true)"
              />
              <input
                v-model="animals[idx].age"
                type="number"
                class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
                placeholder="Возраст питомца"
                @input="$emit('openSave', true)"
              />
            </div>
            <div>
              <input
                v-model="animals[idx].comment"
                type="text"
                class="w-full items-center px-4 py-2 flex-grow focus:outline-none border border-gray-100 rounded focus:ring-2 ring-dividerBg mb-2"
                placeholder="Комментарий"
                @input="$emit('openSave', true)"
              />
            </div> 
          </div>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-1 -mt-1 text-gray-500 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="
                (idx) => {
                  animals.splice(idx, 1);
                  $emit('openSave', true);
                }
              "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
        <div
          class="flex font-medium text-gray-700 items-center justify-center my-2 cursor-pointer select-none"
          @click="
            () => {
              animals.push({
                type: '',
                age: null,
                comment: null
              });
            }
          "
        >
          Добавить питомца
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["clientinfo"],
  data: () => ({
    manAge: null,
    manWork: null,
    manNational: null,
    manRegister: null,
    womanAge: null,
    womanWork: null,
    womanNational: null,
    womanRegister: null,
    animals: [],
  }),

  mounted() {
    if (!this.clientinfo) return;
    this.manAge = this.clientinfo.man.age ? this.clientinfo.man.age : null;
    this.manWork = this.clientinfo.man.work ? this.clientinfo.man.work : null;
    this.womanAge = this.clientinfo.woman.age
      ? this.clientinfo.woman.age
      : null;
    this.womanWork = this.clientinfo.woman.work
      ? this.clientinfo.woman.work
      : null;

    this.manNational = this.clientinfo.man.national ? this.clientinfo.man.national : null;
    this.womanNational = this.clientinfo.woman.national ? this.clientinfo.woman.national : null;
    this.manRegister = this.clientinfo.man.register ? this.clientinfo.man.register : null;
    this.womanRegister = this.clientinfo.woman.register ? this.clientinfo.woman.register : null;

    if (this.clientinfo.animals && this.clientinfo.animals.length !== 0) {
      this.clientinfo.animals.forEach((pet) => {
        this.animals.push({
          type: pet.type,
          age: pet.age,
        });
      });
    }
  },
};
</script>