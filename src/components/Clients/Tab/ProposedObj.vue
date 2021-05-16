<template>
    <div class="flex flex-col px-8 py-4">
      <h3 class="font-medium text-gray-500">Предложенные объекты</h3>
      <div
        v-for="(obj, idx) in objects"
        :key="obj.status + idx"
        class="flex mt-3 items-center"
      >
        <div
          v-if="objects[idx].status === 'offered'"
          type="text"
          placeholder="Ссылка на отчет в PDF"
          class="flex-grow border-2 focus:outline-none py-1 px-3 text-gray-600 rounded mr-4 bg-gray-100"
          @input="$emit('openSave', true)"
        >
          <p v-if="objects[idx].pdfNumber">
            <span  class="italic select-none">Номер презентации: </span>
            {{objects[idx].pdfNumber}}
          </p>
          <span v-else class="italic select-none">{{objects[idx].link}}</span>
        </div>
        <input
          v-else
          v-model="objects[idx].link"
          type="text"
          placeholder="Ссылка на отчет в PDF"
          class="flex-grow border-2 focus:outline-none py-1 px-3 rounded mr-4 cursor-pointer"
          @input="$emit('openSave', true)"
        />
        <button
          v-if="!obj.status"
          class="mr-4 border-2 rounded px-3 py-1 focus:outline-none text-sm transition hover:bg-gray-200 cursor-pointer" 
          @click="offerObject(obj)"
        >Предложить объект</button>
        <button
          v-else
          class="mr-4 border-2 border-green-200 rounded px-3 py-1 focus:outline-none text-green-600 text-sm transition bg-green-200 hover:bg-green-300 hover:border-green-300"
          @click="$emit('openReserveDialog', obj)"
        >Записать на просмотр</button>
        <button class="focus:outline-none" @click="openLink(obj)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-700 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
        <button v-if="!obj.status" class="focus:outline-none" @click="deleteObj(idx)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        class="flex justify-center items-center mt-4 font-medium text-gray-500 cursor-pointer"
        @click="addProposedObject"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span>Добавить новую ссылку</span>
      </div>
    </div>
</template>

<script>
export default {
    props: ['client'],
    data: () => ({
        objStartLength: null,
        objects: []
    }),

    mounted() {
        const response = this.client.proposedObjects;
        if (response) {
            this.client.proposedObjects.forEach((el) => {
                this.objects.push(el);
            });
        }
        this.objStartLength = this.objects.length;
    },

    watch: {
      objects() {
        if (this.objects.length !== this.objStartLength)
          this.$emit("openSave", true);
        else this.$emit("openSave", false);
      },
    },

    methods: {
        addProposedObject() {
            this.objects.push({
                link: "",
                status: '',
                pdfNumber: ''
            });
        },

        deleteObj(idx) {
            this.objects.splice(idx, 1);
        },

        async saveLinks() {
            const data = {
                clientId: this.client.id,
                arr: this.objects,
            };
            await this.$store.dispatch("saveClientLinks", data);
        },

        openLink(obj) {
            if ( (!obj.link.includes("http://") || !obj.link.includes("https://") ) && (!obj.link.includes("http://") && !obj.link.includes("https://"))) {
                this.$toasts.push({
                type: "error",
                message: "Недействительная ссылка",
                });
            } else window.open(obj.link, "_blank");
        },

        async offerObject(obj) {
            if ( (!obj.link.includes("http://") || !obj.link.includes("https://") ) && (!obj.link.includes("http://") && !obj.link.includes("https://"))) {
                this.$toasts.push({
                  type: "error",
                  message: "Недействительная ссылка",
                });
                return;
            }

            const reg = /\/[0-9]{1,99}\//gi;
            const match = obj.link.match(reg);
            const id = match[0].substring(1, match[0].length - 1)
            const pdfNumber = id * 2;

            const data = {
                itemId: this.client.id,
                link: obj.link,
                pdfNumber
            }


            

            let verify = true;
            Object.keys(this.client.logs).forEach(key => {

                Object.keys(this.client.logs[key]).forEach(id => {

                const log = this.client.logs[key][id]
                if(log.logType === 'offerObject') {
                    if(log.link === obj.link) {
                    this.$toasts.push({
                        type: "error",
                        message: "Данный объект уже предложен",
                    })
                    verify = false; 
                    }
                }
                })

            })

            if(!verify) {
                return
            }

            const findIdx = this.objects.findIndex(item => item === obj)
            this.objects[findIdx].status = 'offered'
            this.objects[findIdx].pdfNumber = data.pdfNumber

            try {
                const log = await this.$store.dispatch('addOfferObjectLog', data)
                this.saveLinks()
                window.open('https://office.dutyfreeflats.ru/Home/Index', '_blank')
                this.$parent.$refs.logsBlock.pushLog(log)
                this.$emit('openSave', false)
            } catch (e) {throw e}

        },
    }
}
</script>