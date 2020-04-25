<template>
  <div class="home">
    <div>
      <h1 class="text-center">Lastest posts</h1>
    </div>
    <!-- Trees separator -->
    <img src="@/assets/img/forest.jpg" class="img-fluid w-100" alt="MusUS logo" />
    <!-- Content -->
    <Cards></Cards>
  </div>
</template>

<script>
import Cards from "@/views/Cards.vue";

export default {
  name: "Home",
  components: {
    Cards
  }
};
</script>
