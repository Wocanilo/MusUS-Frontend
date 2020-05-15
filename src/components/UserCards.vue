<template>
  <div class="UserCards">
    <b-container class="mt-3" fluid="xl">
      <b-card-group>
        <b-card v-for="(item, index) in cards" :key="item.id" class="shadow-sm">
          <b-card-body>
            <!-- Picture data-->
            <div class="row">
              <div class="col text-center">
                <h5>
                  {{ index + 1 }}. {{ item.firstname }} {{ item.surname }}
                </h5>
                <h6>@{{ item.username }}</h6>
              </div>
            </div>
            <b-card-text>
              {{ item.description }}
            </b-card-text>
            <!-- Link to post -->
            <b-link
              class="stretched-link"
              :to="'/profile/' + item.id"
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
  name: "UserCards",
  components: {},
  props: ["cards"],
  // Get the cards from the storage
  computed: mapState({
    userData: status => status.account,
    config: status => status.config
  })
};
</script>
