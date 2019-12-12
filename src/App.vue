<template>
  <div id="app">
    <img id="logo" alt="DnD logo" src="https://i.etsystatic.com/15492164/r/il/f106ee/1903066961/il_570xN.1903066961_kh00.jpg">
    <h1 style="margin-top: -40px; margin-bottom: 30px">Keep on the BrianLands</h1>
    <label for="stats">
      <input type = "radio" name = "display" value = "stats" v-model="displayToggle">Party Stats
    </label>
    <label for="characters">
      <input type = "radio" name = "display" value = "characters" v-model="displayToggle">Character Stats
    </label>
    <Stats v-show = "displayToggle === 'stats'" :stats = stats />
    <Characters v-show = "displayToggle === 'characters'" :characterData = characterData />
  </div>
</template>

<script>
import Characters from './components/Characters.vue'
import Stats from './components/Stats.vue'

export default {
  name: 'app',
  components: {
    Characters,
    Stats
  },
  data: function() {
    return {
      displayToggle: "stats",
      stats: {
        monsters: 0,
        successes: 0,
        failures: 0
      },
      characterData: {
        Brian: {
          monsters: 0,
          successes: 0,
          failures: 0
        },
        John: {
          monsters: 0,
          successes: 0,
          failures: 0
        },
        Rufus: {
          monsters: 0,
          successes: 0,
          failures: 0
        },
        Ffeel: {
          monsters: 0,
          successes: 0,
          failures: 0
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica,
    Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: -60px;
  font-size: 30px;
}

#logo {
  max-width: 100%    
}
</style>
