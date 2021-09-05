<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col"> 
        <q-input 
        bottom-slots 
        class="new-devitt"
        v-model="newDeviContent" 
        placeholder="What's happening?" 
        counter 
        maxlength="280" 
        autogrow
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <!-- my avatar pic -->
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </template>
        </q-input>      
      </div>
      <div class="col col-shrink">
          <q-btn 
            disable=!newDeviContent
            @click="addNewDevitt"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Devitt"
            no-caps />
      </div>
      </div>

      <q-separator size="5px" color="grey-2" class="divider"/>

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
        <q-item 
        class="q-py-md"
        v-for="devitts in devitts"
        :key="devitts.id"
        >
          <q-item-section avatar top>
            <q-avatar size="xl">
              <!-- my avatar pic -->
              <img src="https://cdn.quasar.dev/img/avatar5.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1">
              <strong>JKIM </strong>
              <span class="text-grey-7">
                @asKOPO_smartFintech4
                <br class="lt-md"/> 
                &bull; {{ relativeDate(devitts.date) }}
                </span>
              </q-item-label>
            <q-item-label class="devitt-contents text-body1">
              {{ devitts.content }}
            </q-item-label>
            <div class="devitt-icons row justify-between q-mt-sm">
              <q-btn 
              flat 
              round 
              color="grey" 
              icon="far fa-comment" 
              size="sm"
              />
              <q-btn 
              flat 
              round 
              color="grey" 
              icon="fas fa-retweet" 
              size="sm"
              />
                            <!-- @click="likeDevitt(devitts)"  -->
              <q-btn
              flat 
              round 
              @click="likeDevitt(devitts)"
              :color="devitts.liked ? 'pink' : 'grey'" 
              :icon="devitts.liked ? 'fas fa-heart' : 'far fa-heart'" 
              size="sm"
              />
              <q-btn 
              @click="deleteDevitt(devitts)"
              flat 
              round 
              color="grey" 
              icon="fas fa-trash" 
              size="sm"
              />
            </div>
          </q-item-section>
        </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>

  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { defineComponent } from 'vue';
import { formatDistance, subDays } from 'date-fns'

export default defineComponent({
  name: 'PageHome',
  data() {
    return{
      newDeviContent: '',
      devitts:[
        // {
        //   content: 'this is devitt test1',
        //   date: 1630830110454
        // },
        // {
        //   content: 'this is devitt test2',
        //   date: 1630830158781
        // },
      ]
    }
  },
  methods:{
    relativeDate(value) {
      return formatDistance(value, new Date())
    },
    addNewDevitt() {
      let newDevitt = {
        content: this.newDeviContent,
        date: Date.now(),
        liked: false
      }
      // for local adding
      // let newDevitt = {
      //   content: this.newDeviContent,
      //   date: Date.now()
      // }
      // this.devitts.unshift(newDevitt)
      // this.newDeviContent = ''

      // for add in firebase
      db.collection('devitts').add(newDevitt).then(function(docRef) {
        console.log('Document written with ID: ', docRef.id)
      }).catch(function(error) {
        console.error('Error adding document: ', error)
      })
      this.newDeviContent = ''
    },
    deleteDevitt(devitts){
      db.collection('devitts').doc(devitts.id).delete().then(() => {
          console.log("Document successfully deleted!")
      }).catch((error) => {
          console.error("Error removing document: ", error)
      })
    },
    likeDevitt(devitts){
      db.collection('devitts').doc(devitts.id).set({
        content: devitts.content,
        date: devitts.date,
        liked: !devitts.liked
      })
      .then(function() {
        console.log('Document successfully written!')
      })
      .catch(function(error) {
        console.error('Error writing document: ', error)
      })
      console.log('liked')
      console.log(devitts)
    }
  },
  mounted() {
    db.collection('devitts').orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let devittsChange = change.doc.data()
          devittsChange.id = change.doc.id
          if (change.type === "added") {
              console.log("new dev: ", change.doc.data())
              this.devitts.unshift(devittsChange)
          }
          if (change.type === "modified") {
              console.log("Modified dev: ", change.doc.data())
              let index = this.devitts.findIndex(devitts => devitts.id === devittsChange.id)
              Object.assign(this.devitts[index], devittsChange)
          }
          if (change.type === "removed") {
              console.log("Removed dev: ", change.doc.data())
              let index = this.devitts.findIndex(devitts => devitts.id === devittsChange.id)
              this.devitts.splice(index, 1)
          }
        });
    });
  }
})

</script>

<style lang="sass">
.new-devitt
  font-size: 19px
  line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-3

.devitt-contents
  white-space: pre-line

.devitt-icons
  margin-left: -5px
</style>
