<template>
<v-content>
  <section>
    <v-parallax src="img/assets/redox01L.png" height="400">
      <v-layout
        column
        align-center
        justify-center
        class="white--text">
        <img src="img/assets/logo.png" alt="Real Cost Calculators" height="200">
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
                  <v-btn fab large color="orange darken-3" to="/home-purchase-cost-compare">
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

  <section>
    <v-parallax src="img/assets/redox01.png" height="380">
      <v-layout column align-center justify-center>
        <div class="headline white--text mb-3 text-xs-center">Did you Like the App?</div>
        <em>Help me continue to build more tools to help people.</em>
        <v-btn
          class="red lighten-1 mt-5"
          large
          href="https://www.patreon.com/Vordimous">
          <v-icon >fab fa-patreon</v-icon><span class="pl-2">Support me on Patreon</span>
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>

  <section>
    <v-container grid-list-xl class="px-0">
      <v-layout row wrap class="my-5">
        <v-flex xs12 sm6 text-xs-center>
          <v-avatar
            size="256">
            <img src="/img/assets/me.jpg" alt="AJ Danelz">
          </v-avatar>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card class="elevation-0 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline">About Me</div>
            </v-card-title>
            <v-card-text>
              I love making tools that empower people. Software has the ability to make a problem solvable by anyone.
              I want to be able to write and maintain applications that can help everyday people get the answers they need.
              I don't want to be hindered by software licensing or needing a minimum number of user with a viable business
              plan for investors to fund. Technology should be available to help everyone and there is no time like the
              present to make that happen. I hope you join me in growing a community to build, fix, and improve software
              tools for everyone!
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</v-content>
</template>

<script>
export default {
  name: 'Landing',
}
</script>

<style scoped>
</style>
