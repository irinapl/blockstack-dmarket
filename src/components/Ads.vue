<template>
  <div>
    <b-container fluid>
      <h1>Annonser</h1>
      <b-card v-for="(ad, index) in ads" :title="ad.name" :sub-title="ad.user">
        <p class="card-text">
          {{ad.desc}}
        </p>
        <router-link :to="{ name: 'view', params: { id: ad.ind , username: ad.user , profilename: ad.profilename}}" class="card-link">Se mer</router-link>

      </b-card>
    </b-container>

  </div>
</template>
<script>
  import {lookupProfile, getFile} from 'blockstack'

  const STORAGE_FILE = 'ads.json'

  export default {
    props: ['user'],
    data () {
      return {
        users: [
          'irinatest.id.blockstack',
          'trygveaa.id.blockstack',
          'dariaf22.id.blockstack',
          'mettelafton.id.blockstack'
        ],
        ads: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        let self = this
        this.users.forEach(function (username) {
          console.log('Henter profil: ' + username)
          self.loadUserFile(username)
        })
      },
      loadUserFile (username) {
        lookupProfile(username)
          .then((profile) => {
            console.log('JOHO profil: ', profile)
            console.log('profil name: ', profile.name)
            // let profile = new Person(profile)
            const options = {
              username: username,
              decrypt: false,
              zoneFileLookupURL: 'https://core.blockstack.org/v1/names/'
            }
            getFile(STORAGE_FILE, options)
              .then((file) => {
                let self = this
                let usersAds = JSON.parse(file || '[]')
                let ind = 0
                console.log('HENTET: ', usersAds)
                usersAds.forEach(function (ad) {
                  console.log('>>>')
                  self.ads.push({...ad, user: username, profilename: profile.name, ind: ind})
                  ind++
                })
                console.log('ADS: ', this.ads)
              })
              .catch((error) => {
                console.log('could not fetch ads for user ' + username, error)
              })
          })
          .catch((error) => {
            console.log('could not resolve profile', error)
          })
      }
    }
  }
  // Array.prototype.push.apply(this.ads, Array.from(usersAds))
</script>
<style scoped>
  .card-text {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
</style>
