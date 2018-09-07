<template>
  <div class="hello">
      <div>
          <br/>
          <b-jumbotron border-variant="dark" style="background-color:white">
              <div align="center">
                  <b-img :src="require('../../static/letitgo.png')" width="100%" height="100%"/>

                  <p>Desentralisert markedsplass på Blockstack</p>

                  <p>
                      <b-btn variant="outline-success" @click.prevent="signIn">Sign In With Blockstack</b-btn>
                  </p>
              </div>
          </b-jumbotron>
      </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
      blockstack: window.blockstack
    }
  },

  methods: {
    signIn () {
      const blockstack = this.blockstack
      blockstack.redirectToSignIn()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 88, 108) !important;
}
.btn-outline-success {
  color: rgb(255, 88, 108);
  border-color: rgb(255, 88, 108);
}
.btn-outline-success:hover {
  color: #fff;
  background-color: rgb(255, 88, 108);
}
</style>
