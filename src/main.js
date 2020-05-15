import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar,
  faThumbsUp,
  faEdit,
  faTags,
  faSearch,
  faThumbsDown,
  faHeartBroken
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCalendar);
library.add(faThumbsUp);
library.add(faEdit);
library.add(faTags);
library.add(faSearch);
library.add(faThumbsDown);
library.add(faHeartBroken);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
