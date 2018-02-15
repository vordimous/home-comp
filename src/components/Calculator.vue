<template>
<v-container
  fluid
  p1
  grid-list-lg>
  <v-layout row wrap>
    <v-flex xs12 class="pb-0">
      <calc-chart/>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 class="pa-0">
      <v-container fluid grid-list-md>
        <v-data-iterator
          content-tag="v-layout"
          row
          wrap
          :items="inputSets"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            sm6
            md4
            lg3>
            <inputs-item
              :item="props.item"
              @remove="removeInput(props.index)">
            </inputs-item>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CalcChart from '@/components/CalcChart'
import InputsItem from '@/components/InputsItem'

export default {
  name: 'calculator',
  components: { CalcChart, InputsItem },
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
    }
  },
  computed: {
    ...mapGetters(['inputSets']),
  },
  methods: {
    ...mapActions([
      'changeCriteria',
      'removeInput',
      'calcDataset',
    ]),
  },
  mounted() {
    this.calcDataset()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
