<template>
  <div class="hello">
    <div>
      <br/>
      <b-jumbotron header="Dmarket" lead="Desentralisert market på Blockstack" >
        <p></p>
        <b-btn variant="primary" @click.prevent="signIn">Sign In With Blockstack</b-btn>
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
}
</style>
