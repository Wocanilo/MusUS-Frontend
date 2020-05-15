<template>
  <div class="Cards">
    <b-container class="mt-3" fluid="xl">
      <b-card-group columns>
        <b-card
          v-for="item in cards"
          :key="item.id"
          class="shadow-sm"
          :img-src="item.isExternal ? item.URL : config.apiBaseUrl + item.URL"
          :img-alt="item.title"
        >
          <b-card-body>
            <!-- Picture data-->
            <div class="row">
              <div class="col">
                <h5>{{ item.title }}</h5>
              </div>
              <div class="col">
                <div class="float-lg-right">
                  <font-awesome-icon icon="thumbs-up"></font-awesome-icon>
                  {{ item.positive }}
                  <font-awesome-icon icon="thumbs-down"></font-awesome-icon>
                  {{ item.negative }}
                </div>
              </div>
            </div>
            <div class="border-top my-4"></div>
            <!-- Horizontal separator -->
            <b-card-text>
              {{ item.description }}
            </b-card-text>
            <!-- Link to post -->
            <b-link
              class="stretched-link"
              :to="'/post/' + item.id"
              v-if="userData.isLoggedIn"
            />
          </b-card-body>
        </b-card>
      </b-card-group>
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
