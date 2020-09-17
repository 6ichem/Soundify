<template>
  <div class="main">
    <div class="flex justify-center lg:mt-48">
      <div class="p-8">
        <div class="bg-white flex items-center rounded-full shadow-xl">
          <input
            class="rounded-l-full w-full py-6 px-6 text-gray-700 leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Search"
            :model="query"
          />

          <div class="p-4">
            <button
              class="bg-blue-900 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none w-12 h-12 flex items-center justify-center"
              @click="getSearchResults()"
            >
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center text-white">
      <h1
        class="text-white"
        v-for="artist in searchResult"
        :key="artist.idArtist"
      >
        {{ artist.strArtist }}
      </h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Main",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["searchResult"]),
    ...mapState({
      query: (state) => state.query,
    }),
  },
  methods: {
    ...mapActions(["getSearchResults"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
