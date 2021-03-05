<template>
  <div class="flex h-screen bg-gray-100">
    <Divider />
    <Header />
    <main id="page" class="pt-divider flex-grow">
      <router-view/>
    </main>
  </div>
</template>


<script>
import Divider from '@/components/Layout/Divider'
import Header from '@/components/Layout/Header'
export default {

  data: () => ({

  }),

  components: {
    Divider,
    Header
  }
}
</script>

<style>
body {
  overflow-x: hidden;
}
#page {
  height: calc(100vh - 100px);
}

::-webkit-scrollbar {
    width: 3px;
}
 
/* Track */
::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(173, 173, 173, 0.8);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(173, 173, 173, 0.8);
}
</style>