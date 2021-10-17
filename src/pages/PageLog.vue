<template>
  <q-page class="q-pa-lg">
    <h4 class="q-mt-none q-mb-md text-weight-bold">About Creaters</h4>
      <h6>You can check about creaters.</h6><br/><br/>
     <q-btn 
     color="primary" 
     class="q-mb-lg"
     rounded
     unelevated
     autogrow
     @click="toLink_jhk"
     label="Personal Page_JaeHyun Kim"
     no-caps />

     <br/><br/><br/>


    <h4 class="q-mt-none q-mb-md text-weight-bold">About Devitter</h4>
      <h6>You can find out who made this.</h6><br/>
  
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      ref="tableRef"
      title="Patch Notes"
      :rows="rows"
      :columns="columns"
      :table-colspan="9"
      row-key="index"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th />

          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td>
            Patched No: {{ props.row.index }}
          </q-td>

          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>

        <q-tr :props="props" :key="`e_${props.row.index}`" class="q-virtual-scroll--with-prev">
          <!-- <q-td 
            colspan="100%"
            v-for="col in props.cols"
            :key="col.name"
            :props="props">
            <div class="text-left"> {{ props.row.whatwedid }}.</div>
          </q-td> -->
        </q-tr>
      </template>

    </q-table>
  </div>

  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'PageLog',

  setup() {
    const tableRef = ref(null)

    const columns = [
      {
        name: 'desc',
        required: true,
        label: 'Version',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { 
        name: 'madeby', 
        align: 'left', 
        label: 'Made By',
        field: row => row.madeby,
        sortable: true 
      },
      { 
        name: 'made', 
        align: 'left', 
        label: 'Notes',
        field: row => row.whatwedid,
        sortable: true 
      },
    ]

    const notes = [
      {
        name: '2021/09/ 1.0',
        madeby: 'JHKim',
        whatwedid: 'basic design, CRUD with firebase'
      },
      {
        name: '2021/09/ 1.3',
        madeby: 'JHKim',
        whatwedid: 'signin / signout avaliable.'
      },
      {
        name: '2021/09/ 1.31',
        madeby: 'JHKim',
        whatwedid: 'connected with my AWS server (SMS API, still avaliable in local)'
      },
      {
        name: '2021/10/ 1.33',
        madeby: 'JHKim',
        whatwedid: '"About page" established, modals for signs page and serverless API with netlify/cli on progressing.'
      },
    ]

    const notesSize = notes.length

    onMounted(() => {
      tableRef.value.scrollTo(0)
    })

    let rows = []
    for (let i = 0; i < notesSize-(notesSize-1); i++) {
      rows = rows.concat(notes.map((r, j) => ({ ...r, index: i * notesSize + j + 1 })))
    }

    var toLink_jhk = () => {
      window.location.assign("http://3.128.57.20:3000/")
    }

    return { toLink_jhk,
            tableRef, columns, rows,
            pagination: {
              rowsPerPage: 0
            } }

  },
methods: { 
  }
})


</script>

<style>

</style>
