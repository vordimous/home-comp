<template>
<v-card>
  <v-card-title primary-title>
    <v-btn @click="checkDel" small color="error"><v-icon>delete</v-icon></v-btn>
    <h4 v-bind:style="{color: item.color}">Calculation</h4>
  </v-card-title>
  <v-divider></v-divider>
  <v-container fluid class="pb-1">
    <v-layout row>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Purchase Price (Value)"
                :value="item.pp"
          @blur="recalc"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pa-1">
        <v-text-field
          label="Down Paymet"
                :value="item.dp"
          @blur="recalc"></v-text-field>
      </v-flex>
    </v-layout>
    <pre> {{JSON.stringify(item, null, 1)}}</pre>
  </v-container>
</v-card>
</template>

<script>

export default {
  name: 'inputs-item',
  props: ['item'],
  mounted() {
  },
  methods: {
    checkDel() {
      this.$emit('remove');
    },
    recalc() {
      this.$emit('updated');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chart {
  /* height: 500px; */
}
</style>
