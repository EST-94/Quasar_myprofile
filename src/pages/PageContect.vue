<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end
    q-col-gutter-md">
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
            disable="!newDeviContent"
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
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHome',
  data() {
    return{
      newDeviContent: ''
    }
  }
})

</script>

<style lang="sass">
.new-devitt
  textarea
  font-size: 19px
  line-height: 1.4 !important

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-3
</style>
