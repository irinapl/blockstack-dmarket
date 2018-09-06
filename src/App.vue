<template>
  <div id="app">
    <div>USER SIGNED IN= {{blockstack.isUserSignedIn()}}</div>

    <landing v-if="! blockstack.isUserSignedIn()"></landing>
    <div v-if="user" >
      <router-view/>
    </div>
  </div>
</template>

<script>

import Landing from './components/Landing.vue'
import Ads from './components/Ads.vue'

export default {
  name: 'app',
  components: {Landing, Ads},
  mounted () {
    const blockstack = this.blockstack
    if (blockstack.isUserSignedIn()) {
      this.userData = blockstack.loadUserData()
      this.user = new blockstack.Person(this.userData.profile)
      this.user.username = this.userData.username
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
      .then((userData) => {
        window.location = window.location.origin
      })
    }
  },
  data () {
    return {
      blockstack: window.blockstack,
      user: null
    }
  }
}
</script>

<style src="./assets/sass/app.scss" lang="scss"></style>
