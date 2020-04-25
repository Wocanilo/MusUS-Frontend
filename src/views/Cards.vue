<template>
  <div class="Cards">
    <b-container fluid class="mt-3">
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6">
        <b-col v-for="item in cards" :key="item.id" class="mx-auto mb-3">
          <div class="card h-100">
            <b-img class="card-img-top" :src="item.pictureUrl"/>
            <div class="card-body">
              <!-- Picture data-->
              <div class="row">
                <div class="col">
                  <i class="far fa-calendar"></i>
                  26/03/2020
                </div>
                <div class="col">
                  <div class="float-right">
                    <i class="far fa-thumbs-up"></i>
                    20 likes
                  </div>
                </div>
              </div>
              <div class="border-top my-4"></div>
              <!-- Horizontal separator -->
              <p class="card-text">
                {{ item.description }}
              </p>
              <!-- Link to post -->
              <a href="post.html" class="stretched-link"></a>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Cards",
  components: {},
  // Get the cards from the storage
  computed: mapState({
    cards: state => state.cards,
    userData: status => status.userData
  })
};
</script>
