<template>
<v-content>
  <section>
    <v-parallax src="static/img/assets/hero.jpeg" height="600">
      <v-layout
        column
        align-center
        justify-center
        class="white--text">
        <img src="static/img/assets/logo.png" alt="Real Cost Calculators" height="200">
        <h1 class="white--text mb-2 display-1 text-xs-center">Real Cost Calculators</h1>
        <div class="subheading mb-3 text-xs-center">Get all of the Facts</div>
      </v-layout>
    </v-parallax>
  </section>

  <section>
    <v-layout
      column
      wrap
      class="my-5"
      align-center>
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline">Make more informed decisions</h2>
          <span class="subheading">
            Companies are here to help but ultimately are here to make a profit.
            Doing reasearch only gets you so far, sometimes you just need to crunch the numbers.
          </span>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md6>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-btn fab large color="orange darken-3" to="/home">
                    <v-icon x-large>fas fa-home</v-icon>
                  </v-btn>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Home Cost Comparison</div>
                </v-card-title>
                <v-card-text>
                  Everyone from realtor to banker wants you to spend as much as possible on a house because
                  they make percetage profits. This tool will let you compare what kind of return you will get
                  on your total amount invested. Money not invested is money in the Bank!
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md6>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-btn fab large color="orange darken-3" to="/discuss">
                    <v-icon x-large>fas fa-lightbulb</v-icon>
                  </v-btn>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center">More comng soon...</div>
                </v-card-title>
                <v-card-text>
                  Any way to help people make better decisions is worth invesigating. If you have any suggestions
                  join the disscussion and help us grow.
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </section>

  <!-- <section>
    <v-parallax src="static/img/assets/section.jpg" height="380">
      <v-layout column align-center justify-center>
        <div class="headline white--text mb-3 text-xs-center">Web development has never been easier</div>
        <em>Kick-start your application today</em>
        <v-btn
          class="blue lighten-2 mt-5"
          dark
          large
          href="/pre-made-themes"
        >
          Get Started
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>

  <section>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="my-5">
        <v-flex xs12 sm4>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Company info</div>
            </v-card-title>
            <v-card-text>
              Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm4 offset-sm1>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">Contact us</div>
            </v-card-title>
            <v-card-text>
              Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
            </v-card-text>
            <v-list class="transparent">
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon class="blue--text text--lighten-2">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>777-867-5309</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon class="blue--text text--lighten-2">place</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Chicago, US</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon class="blue--text text--lighten-2">email</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>john@vuetifyjs.com</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section> -->
</v-content>
</template>

<script>
export default {
  name: 'Landing',
}
</script>

<style scoped>
</style>
