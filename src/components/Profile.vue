<template>
  <div>
    <h1>Din profil</h1>

    <b-card :title="name"
            :img-src="imageSource"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
      <p class="card-text">
        {{description}}
      </p>
      <b-button href="#" variant="primary">Endre</b-button>
    </b-card>
  </div>
</template>
<script>
  import {loadUserData, Person} from 'blockstack'

  export default {
    data () {
      return {
        user: {}
      }
    },
    created () {
      this.loadProfile()
    },
    computed: {
      imageSource: function () {
        return this.user.avatarUrl()
      },
      name: function () {
        return this.user.name()
      },
      description: function () {
        return this.user.description()
      }
    },
    methods: {
      loadProfile () {
        this.userData = loadUserData()
        this.user = new Person(this.userData.profile)
        this.user.username = this.userData.username
      }
    }
  }
</script>
