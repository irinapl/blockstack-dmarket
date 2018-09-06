<template>
  <div id="app">
    <landing v-if="! blockstack.isUserSignedIn()"></landing>
    <div v-if="user" >

      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">Dmarket</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item to="/new">Ny annonse</b-nav-item>
            <b-nav-item to="/favorites">Mine annonser</b-nav-item>
            <b-nav-item to="/myads">Favoritter</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text"/>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Søk</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <em>{{this.user.username}}</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="signOut()">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>

      <router-view/>
    </div>
  </div>
</template>

<script>

import Landing from './components/Landing.vue'
import Ads from './components/Ads.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
  },
  methods: {
    signOut () {
      this.blockstack.signUserOut(window.location.href)
    }
  }
}
</script>
<style>
  .bg-info {
    background-color: rgb(255, 88, 108) !important;
  }
</style>
