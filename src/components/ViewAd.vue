<template>
  <div>
    <b-card :title="ad.name"
      img-src="https://canadatwoway.com/wp-content/uploads/2017/11/No_Image_Available.jpg"
      img-alt="Image"
      img-top
      style="max-width: 20rem;"
      class="mb-2">
      <p class="card-text">
        {{ad.desc}}
      </p>
      <p class="card-text">
        {{ad.price}},-
      </p>
    </b-card>
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
          'trygveaa.id.blockstack'
        ],
        ad: ''
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
            // let profile = new Person(profile)
            const options = {
              username: username,
              decrypt: false,
              zoneFileLookupURL: 'https://core.blockstack.org/v1/names/'
            }
            getFile(STORAGE_FILE, options)
              .then((file) => {
                let usersAds = JSON.parse(file || '[]')
                this.ad = usersAds[this.$route.params.id]
                console.log('AD: ', this.ad)
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

