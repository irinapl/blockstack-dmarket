<template>
  <div>
    <b-container >
      <b-row>
        <b-col cols="8">
          <b-card :title="ad.name"
                  :img-src="ad.image"
                  img-alt="Image"
                  img-top
                  style="max-width: 50rem;"
                  class="mb-2">
            <p class="card-text">
              {{ad.desc}}
            </p>
            <p class="card-text">
              {{ad.price}},-
            </p>
          </b-card>
        </b-col>
        <b-col cols="3">
          <b-card :title="`Selger: ${adUserName}`"
                  :img-src="adUserImage"
                  img-top
                  tag="article"
                  style="max-width: 20rem;"
                  class="mb-2">
            <p class="card-text">
              {{adUserDescription}}
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import {lookupProfile, getFile, Person} from 'blockstack'

  const STORAGE_FILE = 'ads.json'

  export default {
    props: ['user'],
    data () {
      return {
        users: [
          'irinatest.id.blockstack',
          'trygveaa.id.blockstack',
          'dariaf22.id.blockstack'
        ],
        ad: ''
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      adUserImage: function () {
        return this.adUser ? this.adUser.avatarUrl() : ''
      },
      adUserName: function () {
        return this.adUser ? this.adUser.name() : this.$route.params.username
      },
      adUserDescription: function () {
        return this.adUser ? this.adUser.description() : ''
      }
    },
    methods: {
      fetchData () {
        this.loadUserFile(this.$route.params.username)
      },
      loadUserFile (username) {
        lookupProfile(username)
          .then((profile) => {
            this.adUser = new Person(profile)
            this.adUser.username = this.username
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

