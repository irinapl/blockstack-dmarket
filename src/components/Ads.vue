<template>
  <div>
    <b-container fluid>
      <h1>Annonser</h1>
      <b-card v-for="ad in ads" :title="ad.title">
        <p class="card-text">
          {{ad.description}}
        </p>
        <router-link :to="{ name: 'view', params: { id: ad.id }}" class="card-link">Se mer</router-link>

      </b-card>
    </b-container>

  </div>
</template>
<script>

  var STORAGE_FILE = 'ads.json'

  export default {
    name: 'dashboard',
    props: ['user'],
    data () {
      return {
        blockstack: window.blockstack,
        ads: [{
          id: 1,
          title: 'Sykkel, nesten som ny',
          description: 'Godt brukt sykkel',
          price: 3500
        },
        {
          id: 2,
          title: 'Høy klorestativ',
          description: 'Din katt vil elske denne. Høyde 170, velsig lite brukt',
          price: 790
        }
        ]
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      addTodo () {
        if (!this.todo.trim()) {
          return
        }
        this.todos.unshift({
          id: this.uidCount++,
          text: this.todo.trim(),
          completed: false
        })
        this.todo = ''
      },

      fetchData () {
        const blockstack = this.blockstack
        blockstack.getFile(STORAGE_FILE) // decryption is enabled by default
          .then((todosText) => {
            var todos = JSON.parse(todosText || '[]')
            todos.forEach(function (todo, index) {
              todo.id = index
            })
            this.uidCount = todos.length
            this.todos = todos
          })
      },

      signOut () {
        this.blockstack.signUserOut(window.location.href)
      }
    }
  }
</script>
