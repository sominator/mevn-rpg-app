<template>
    <div id="app">
        <img id="logo" alt="DnD logo" src="https://i.etsystatic.com/15492164/r/il/f106ee/1903066961/il_570xN.1903066961_kh00.jpg">
        <h1 style="margin-top: -40px; margin-bottom: 30px">Keep on the BrianLands</h1>
        <button v-on:click="displayToggle='stats'">Party Stats</button>
        <button v-on:click="displayToggle='characters'">Character Stats</button>
        <button v-on:click="displayToggle='npcs'">NPCs</button>
        <button v-on:click="displayToggle='locations'">Locations</button>
        <button v-on:click="displayToggle='quests'">Quests</button>
        <button v-on:click="displayToggle='map'">Map</button>
        <Stats v-show="displayToggle === 'stats'" :characterData=characterData />
        <Characters v-show="displayToggle === 'characters'" :characterData=characterData />
        <div v-show="displayToggle === 'npcs'" class="journal">
            <NPC v-for="(description, npc) in npcData" :key="npc" :npc="npc" :description="description" />
        </div>
        <div v-show="displayToggle === 'locations'" class="journal">
            <Location v-for="(description, location) in locationData" :key="location" :location="location" :description="description" />
        </div>
        <div v-show="displayToggle === 'quests'">
            <button v-on:click="questToggle='add'">Add Quest</button>
            <button v-on:click="questToggle='view'; getQuests()">View Quests</button>
            <AddQuest v-show="questToggle==='add'" />
            <div class="journal" v-show="questToggle==='view'">
                <Quest v-for="(quest, index) in questData" :key="index" :quest="quest" @getQuests="getQuests"/>  
            </div>
        </div>
        <div v-show="displayToggle === 'map'">
            <img src="./Map.jpg" id="map" />
        </div>
    </div>
</template>

<script>
    import Characters from './components/Characters.vue';
    import Stats from './components/Stats.vue';
    import NPC from './components/NPC.vue';
    import Location from "./components/Location.vue";
    import Quest from "./components/Quest.vue";
    import AddQuest from "./components/AddData/AddQuest.vue";
    import json from './Data.json';
    import axios from 'axios'

    export default {
        name: 'app',
        components: {
            Characters,
            Stats,
            NPC,
            Location,
            Quest,
            AddQuest
        },
        data: function () {
            return {
                displayToggle: "stats",
                questToggle: "add",
                characterData: json.characters,
                npcData: json.npcs,
                locationData: json.locations,
                questData: null
            }
        },
        methods: {
            getQuests: function () {
                axios
                    .get('http://localhost:3000/quests')
                    .then(response => (this.questData = response.data));
            }
        },
        mounted: function () {
            this.getQuests();
        }
    }
</script>

<style>
    #app {
        font-family: 'Noto Sans', 'Myriad Pro', Calibri, Helvetica, Arial, sans-serif;
        text-align: center;
        color: #2c3e50;
        margin-top: -60px;
        font-size: 30px;
    }
    h1 {
        font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
        letter-spacing: 1px;
        font-variant: small-caps;
        font-weight: bold;
        color: #922610;
    }
    button {
        background: #E69A28;
        font-family: 'Libre Baskerville', 'Lora', 'Calisto MT', 'Bookman Old Style', Bookman, 'Goudy Old Style', Garamond, 'Hoefler Text', 'Bitstream Charter', Georgia, serif;
        letter-spacing: 1px;
        font-variant: small-caps;
        font-weight: bold;
        font-size: 16px;
        color: #922610;
        border: 1px solid #000;
        border-radius: 5px;
        box-shadow: 0 0 1.5em #867453;
        margin-right: 10px;
    }
    button:hover {
        background: #FDF1DC;
        cursor: pointer;
    }
    button:focus {
        outline: none;
    }
    #logo {
        max-width: 30%;
    }
    #map {
        max-width: 40%;
        transform: rotate(90deg);
        margin-top: 135px;
    }
    .journal {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
