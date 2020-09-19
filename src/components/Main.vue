<template>
  <div class="main">
    <div class="flex justify-center lg:mt-10">
      <div class="p-8 w-full container">
        <div class="bg-white flex items-center rounded-full shadow-xl">
          <input
            class="rounded-l-full w-full py-6 px-6 text-gray-700 leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Search artist name..."
            v-model="query"
          />

          <div class="p-4">
            <button
              class="bg-blue-900 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none w-12 h-12 flex items-center justify-center"
              @click="getSearchResults(query)"
            >
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center text-white mb-16">
      <div v-if="more" class="fixed z-100 inset-0 opacity-25 bg-black"></div>
      <div class="text-white" v-for="artist in searchResult" :key="artist.idArtist">
        <div class="container">
          <div class="w-full max-w-full lg:flex shadow-xl">
            <div
              class="flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            >
              <img :src="artist.strArtistThumb" class="h-full object-cover" />
            </div>
            <div
              class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
            >
              <div class="mb-8">
                <ol>
                  <li class="text-black font-extrabold">
                    ID:
                    <span class="text-gray-700">{{ artist.idArtist }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Name:
                    <span class="text-gray-700">{{ artist.strArtist }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Region:
                    <span class="text-gray-700">{{ artist.strCountry }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Disbanded status:
                    <span class="text-gray-700">{{ artist.strDisbanded }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Label:
                    <span class="text-gray-700">{{ artist.strLabel }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Formed year:
                    <span class="text-gray-700">
                      {{
                      artist.intFormedYear
                      }}
                    </span>
                  </li>
                  <li class="text-black font-extrabold">
                    Members:
                    <span class="text-gray-700">{{ artist.intMembers }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Birth year:
                    <span class="text-gray-700">{{ artist.intBornYear }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Death year:
                    <span class="text-gray-700">{{ artist.intDiedYear }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Genre:
                    <span class="text-gray-700">{{ artist.strStyle }}</span>
                  </li>
                  <li class="text-black font-extrabold">
                    Vibe:
                    <span class="text-gray-700">{{ artist.strMood }}</span>
                  </li>
                </ol>
              </div>
              <div class="mb-8">
                <p class="text-gray-700 text-base">{{ artist.strBiographyEN }}</p>
              </div>
              <h1 class="text-black mb-3">Available music videos:</h1>
              <div v-for="mv in searchMvs" :key="mv.idTrack" class="mb-2">
                <a :href="mv.strMusicVid">
                  <button
                    class="text-black bg-gray-300 hover:bg-gray-400 w-full h-12 text-left rounded"
                    style="outline: none"
                  >
                    <span class="ml-2">
                      <font-awesome-icon :icon="['fas', 'play-circle']" />
                      {{ artist.strArtist }} - {{ mv.strTrack }}
                    </span>
                  </button>
                </a>
              </div>
              <div v-for="album in searchAlbums" :key="album.idAlbum" class="mb-2">
                <div class="flex">
                  <img :src="album.strAlbumThumb" class="h-20 w-20 mr-3" />
                  <div class="flex flex-col justify-center">
                    <h1 class="mt-0 text-black text-xl">{{ album.strAlbum }}</h1>
                    <p class="text-black text-sm">
                      Score
                      <a>{{ album.intScore }}</a>
                      -
                      {{ album.intYearReleased }}
                    </p>
                    <button class="text-black text-left" @click="more = !more">Show more...</button>
                    <div v-if="more" class="fixed inset-0 flex justify-center items-center">
                      <div class="absolute mx-auto w-auto max-w-2xl">
                        <div class="bg-white w-full rounded text-black px-5 py-5 pb-5">
                          <h1 class="mb-2 font-extrabold">Description:</h1>
                          {{ album.strDescriptionEN }}
                          <h1 class="mb-2 font-extrabold">Tracklist:</h1>
                          <div v-for="track in searchTracks" :key="track.idTrack">
                            <h1>{{ track.strTrack }}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-8 mt-8">
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  <a :href="'https://' + artist.strWebsite">
                    <font-awesome-icon :icon="['fas', 'globe']" class="text-black mr-1" />website
                  </a>
                </span>
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  <a :href="artist.strFacebook">
                    <font-awesome-icon :icon="['fab', 'facebook']" class="text-black mr-1" />facebook
                  </a>
                </span>
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  <a :href="artist.strTwitter">
                    <font-awesome-icon :icon="['fab', 'twitter']" class="text-black mr-1" />twitter
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      query: "",
      more: false,
    };
  },
  computed: {
    ...mapGetters([
      "searchResult",
      "searchMvs",
      "searchAlbums",
      "searchTracks",
    ]),
  },
  methods: {
    ...mapActions(["getSearchResults"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
