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
            v-model="query"
          />

          <div class="p-4">
            <button
              class="bg-blue-900 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none w-12 h-12 flex items-center justify-center"
              @click="search"
            >
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center text-white">
      <h1 v-for="(result, index) in searchResult" :key="index">{{ result.artists }}</h1>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      query: "",
    };
  },
  computed: {
    searchResult() {
      return [{ artists: [{ idArtist: "111239" }] }];
    },
  },
  methods: {
    ...mapActions(["getSearchResults"]),
  },
  created() {
    this.getSearchResults();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
