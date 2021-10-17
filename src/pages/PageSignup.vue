<template>
  <q-page class="q-pa-lg">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <h5 class="">Welcome!</h5>
        <h6> you need to fill the blanks of '*'. </h6>
        <q-input bottom-slots class="new-devitt" v-model="DevitterId" placeholder="*ID (email address)" autogrow>
        </q-input>
        
        <q-input bottom-slots class="new-devitt" v-model="DevitterPw" placeholder="*Password" type="password" >
        </q-input>

        <q-input 
        bottom-slots 
        class="new-devitt"
        v-model="contect" 
        placeholder="contact information (email, phone number, ...)" 
        autogrow
        >
        </q-input>  
      </div>
      </div>
      <div class="col col-shrink">
          <q-btn 
            @click.prevent="validate"
            color="primary" 
            class="q-mb-lg"
            rounded
            unelevated
            autogrow
            label="Sign up"
            no-caps />
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { auth, db } from 'src/boot/firebase'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Signup',

  setup() {
    const $q = useQuasar()
    const $router = useRouter()
    
    let DevitterId = ref('')
    let DevitterPw = ref('')
    let contect = ref('')
    let isOnline = ref('false')
    let remember = ref('false')
    let validationErrors = ref('')

    let validate = () => {
        if(!DevitterId.value) {
            $q.notify({
                position : "center",
                message : "please input your ID.",
                color : "blue"
            })
        }
        else if(/.+@.+/.test(DevitterId.value) != true) {
            $q.notify({
                position : "center",
                message : "check your ID again.",
                color : "blue"
            })
        }
        else if (!DevitterPw.value) {
            $q.notify({
                position : "center",
                message : "please input your PW.",
                color : "blue"
            })
         }
        else if (/.{6,}/.test(DevitterPw.value) != true) {
            $q.notify({
                position : "center",
                message : "PW is 6 character at least.",
                color : "blue"
            })
         }
        else if(validationErrors.value <= 0) {
            signup();
         }
    }
    let signup = () => {
        auth.createUserWithEmailAndPassword(DevitterId.value, DevitterPw.value)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log("success", user);
          $q.notify({
              position : "center",
              message : "hello, " + user.email,
              color : "blue"
          })
          db.collection("users").add({
              id: DevitterId.value,
              pw: DevitterPw.value,
              contect: contect.value
          })
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
              console.log(error.message)
          })
          $router.push({ path: '/signs'})
        })
        .catch((error) => {
          $q.notify({
              position : "center",
              message : error.message,
              color : "blue"
          })
        })
      }
    return {DevitterId, DevitterPw, contect, isOnline, remember,
            validationErrors, validate, signup}
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
