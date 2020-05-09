<template>
  <div class="Cards">
    <b-container fluid class="mt-3">
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6">
        <b-col v-for="item in cards" :key="item.id" class="mx-auto mb-3">
          <b-card :img-src="item.isExternal ? item.URL : config.apiBaseUrl + item.URL" :img-alt="item.title" style="max-width: 20rem;" class="h-100">
            <div class="card-body">
              <!-- Picture data-->
              <div class="row">
                <div class="col">
                  <font-awesome-icon icon="calendar"></font-awesome-icon>
                  {{ item.createdAt }}
                </div>
                <div class="col">
                  <div class="float-right">
                    <font-awesome-icon icon="thumbs-up"></font-awesome-icon>
                    20 likes
                  </div>
                </div>
              </div>
              <div class="border-top my-4"></div>
              <!-- Horizontal separator -->
              <p>{{ item.title }}</p>
              <b-card-text>
                {{ item.description }}
              </b-card-text>
              <!-- Link to post -->
            <b-link class="stretched-link" :to="'/post/' + item.id" v-if="userData.isLoggedIn"/>
            </div>
          </b-card>
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
  props: ["cards"],
  // Get the cards from the storage
  computed: mapState({
    userData: status => status.account,
    config: status => status.config
  })
};
</script>
