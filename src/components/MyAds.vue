<template>
  <div>
    <h1>Mine annonser</h1>
    <b-card v-for="(ad, index) in ads" :title="ad.title">
      <p class="card-text">
        {{ad.description}}
      </p>
      <router-link :to="{ name: 'view', params: { id: index }}" class="card-link">Se mer</router-link>
      <b-button variant="danger" size="sm" @click="deleteAd(index)">Delete annonse</b-button>
    </b-card>

  </div>
</template>
<script>
  import { putFile, getFile } from 'blockstack'
  const addsFileName = 'ads.json'
  export default {
    data () {
      return {
        ads: []
      }
    },
    beforeCreate () {
      const options = { decrypt: false, zoneFileLookupURL: 'https://core.blockstack.org/v1/names/' }
      getFile(addsFileName, options)
        .then((file) => {
          this.ads = JSON.parse(file || '[]')
          console.log('Data loaded:', this.ads, file)
        })
    },
    methods: {
      deleteAd (index) {
        this.ads.splice(index, 1)
        console.log('Update file to: ', this.ads)
        const options = { encrypt: false }
        putFile(addsFileName, JSON.stringify(this.ads), options)
          .then(() => {
            console.log('DONE!!')
            this.showConfirm = true
          })
      }
    }
  }
</script>

