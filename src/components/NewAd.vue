<template>
  <div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col cols="3">
          <h1>Ny annonse</h1>
          <b-alert v-if="showConfirm" variant="success" show>
            Annonsen er lagret!
          </b-alert>
          <b-form @submit="onSubmit" v-else>
            <b-form-group id="title"
                          label="Tittel"
                          label-for="title">
              <b-form-input id="title"
                            v-model="form.name"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group id="description"
                          label="Beskrivelse"
                          label-for="description">
              <b-form-input id="description"
                            v-model="form.desc">
              </b-form-input>
            </b-form-group>
            <b-form-group id="price"
                          label="Pris"
                          label-for="price">
              <b-form-input id="price"
                            v-model="form.price">
              </b-form-input>
            </b-form-group>


            <b-button type="submit" variant="primary">Lagre</b-button>
          </b-form>
        </b-col>

      </b-row>
    </b-container>


  </div>
</template>
<script>
  import { getFile, putFile } from 'blockstack'
  const STORAGE_FILE = 'ads.json'
  export default {
    data () {
      return {
        ads: [],
        form: {
          name: '',
          desc: '',
          price: ''
        },
        showConfirm: false
      }
    },
    beforeCreate () {
      const options = { decrypt: false, zoneFileLookupURL: 'https://core.blockstack.org/v1/names/' }
      getFile(STORAGE_FILE, options)
      .then((file) => {
        this.ads = JSON.parse(file || '[]')
        console.log('Data loaded:', this.ads)
      })
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        const options = { encrypt: false }

        this.ads.push(this.form)
        putFile(STORAGE_FILE, JSON.stringify(this.ads), options)
          .then(() => {
            console.log('DONE!!')
            this.showConfirm = true
          })
      }
    }
  }
</script>

