<template>
  <StreetsFetchingErrorModal v-show="!showLoading" />
</template>

<script lang="ts">
import Vue from "vue";
import StreetsFetchingErrorModal from "@/components/molecules/StreetsFetchingErrorModal.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { geolocationMiddleware } from "@/middleware/geolocation";

export default Vue.extend({
  name: "Streets",
  mixins: [geolocationMiddleware],
  components: { StreetsFetchingErrorModal },
  computed: {
    ...mapGetters(["showLoading"]),
  },
  methods: {
    ...mapActions("streets", ["getStreets"]),
    ...mapMutations(["setShowLoading", "setHasFetchedStreets"]),
  },
  mounted() {
    this.getStreets()
      .then(() => {
        this.setHasFetchedStreets(true);
        this.$router.push({ name: "Map" });
      })
      .catch(() => {
        this.setShowLoading(false);
      });
  },
});
</script>
