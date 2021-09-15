<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input 
        bottom-slots 
        class="new-devitt"
        v-model="contect" 
        placeholder="Where should I contect you?"
        :value="loginState ? contect : ''"
        counter 
        maxlength="280" 
        autogrow
        />
        <q-input 
        bottom-slots 
        class="new-devitt"
        v-model="newDeviContent" 
        placeholder="What's happening?" 
        counter 
        maxlength="280" 
        autogrow
        />   
      </div>
      <div class="col col-shrink">
          <q-btn 
            disable="!newDeviContent"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Send"
            @click="validate"
            no-caps />
      </div>
    </div>

    <q-separator size="5px" color="grey-2" class="divider"/>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { auth, db } from 'src/boot/firebase'

// import { send_message } from 'src/apis/naverSMS'

export default defineComponent({
  name: 'PageHome',
  setup() {
    const send_message = require('src/apis/naverSMS')

    var newDeviContent = ref('')
    var contect = ref('')
    var loginState = ref('false')

    auth.onAuthStateChanged((user) => {
      if (user) {
        loginState.value = 'true'
        console.log("user state isnt null")
        db.collection("users").where("id", "==", this.mapGetters.id )
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  console.log(doc.id, " => ", doc.data());
              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
        }
    })

    let validate = () => {
        if(!newDeviContent.value) {
            $q.notify({
                position : "center",
                message : "please fill with some contents.",
                color : "blue"
            })
        }
        else if(!contect.value) {
            $q.notify({
                position : "center",
                message : "please tell me your contect.",
                color : "blue"
            })
        }
        else if(validationErrors.value <= 0) {
            send_message(contect, newDeviContent);
         }
    }
    
    return {newDeviContent, contect, loginState,
            validate}
  },

  computed: {
    ...mapGetters(["getUserState", "isUserAuth"])
  },
  methods: {
    ...mapActions(["signOutAction", "authAction"])
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
</style>
