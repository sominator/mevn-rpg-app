<template>
    <div id="app">
        <div v-bind:class="{'modal-showing': displayToggle==='modal'}">
            <img id="logo" alt="DnD logo" src="https://i.etsystatic.com/15492164/r/il/f106ee/1903066961/il_570xN.1903066961_kh00.jpg">
            <h1 style="margin-top: -40px; margin-bottom: 30px">Keep on the BrianLands</h1>
            <button v-on:click="displayToggle='stats'">Party Stats</button>
            <button v-on:click="displayToggle='characters'">Character Stats</button>
            <button v-on:click="displayToggle='npcs'">NPCs</button>
            <button v-on:click="displayToggle='locations'">Locations</button>
            <button v-on:click="displayToggle='quests'; getQuests()">Quests</button>
            <button v-on:click="displayToggle='map'">Map</button>
            <Stats v-show="displayToggle === 'stats'" :characterData=characterData />
            <Characters v-show="displayToggle === 'characters'" :characterData=characterData />
            <div v-show="displayToggle === 'locations'">
                <button v-on:click="displayToggle = 'modal'; modalToggle = 'addLocation'">Add Location</button>
                <div class="journal">
                    <Location v-for="location in locationData" :key="location._id" :location="location" @deleteLocation="deleteLocation" @patchLocation="patchLocation" />
                </div>
            </div>
            <div v-show="displayToggle === 'npcs'">
                <button v-on:click="displayToggle = 'modal'; modalToggle = 'addNpc'">Add NPC</button>
                <div class="journal">
                    <NPC v-for="npc in npcData" :key="npc._id" :npc="npc" @deleteNpc="deleteNpc" @patchNpc="patchNpc" />
                </div>
            </div>
            <div v-show="displayToggle === 'quests'">
                <button v-on:click="displayToggle = 'modal'; modalToggle = 'addQuest'">Add Quest</button>
                <div class="journal">
                    <Quest v-for="quest in questData" :key="quest._id" :quest="quest" @deleteQuest="deleteQuest" @patchQuest="patchQuest" />
                </div>
            </div>
            <div v-show="displayToggle === 'map'">
                <img src="./Map.jpg" id="map" />
            </div>
        </div>
        <div class="modal" v-show="displayToggle === 'modal'">
            <AddLocation v-show="modalToggle === 'addLocation'" @changeToggle="changeToggle" />
            <AddNPC v-show="modalToggle === 'addNpc'" @changeToggle="changeToggle" />
            <AddQuest v-show="modalToggle === 'addQuest'" @changeToggle="changeToggle" />
            <DeleteLocation v-show="modalToggle === 'deleteLocation'" :locationId="locationId" @changeToggle="changeToggle" />
            <DeleteNPC v-show="modalToggle === 'deleteNpc'" :npcId="npcId" @changeToggle="changeToggle" />
            <DeleteQuest v-show="modalToggle === 'deleteQuest'" :questId="questId" @changeToggle="changeToggle" />
            <PatchLocation v-show="modalToggle === 'patchLocation'" :locationId="locationId" @changeToggle="changeToggle" />
            <PatchNPC v-show="modalToggle === 'patchNpc'" :npcId="npcId" @changeToggle="changeToggle" />
            <PatchQuest v-show="modalToggle === 'patchQuest'" :questId="questId" @changeToggle="changeToggle" />
        </div>
    </div>
</template>

<script>
    import Characters from './components/Characters.vue';
    import Stats from './components/Stats.vue';
    import Location from "./components/Location.vue";
    import NPC from './components/NPC.vue';
    import Quest from "./components/Quest.vue";
    import AddLocation from "./components/modals/AddLocation.vue";
    import AddNPC from "./components/modals/AddNPC.vue";
    import AddQuest from "./components/modals/AddQuest.vue";
    import DeleteLocation from "./components/modals/DeleteLocation.vue";
    import DeleteNPC from "./components/modals/DeleteNPC.vue";
    import DeleteQuest from "./components/modals/DeleteQuest.vue";
    import PatchLocation from "./components/modals/PatchLocation.vue";
    import PatchNPC from "./components/modals/PatchNPC.vue";
    import PatchQuest from "./components/modals/PatchQuest.vue";
    import json from './Data.json';
    import axios from 'axios'

    export default {
        name: 'app',
        components: {
            Characters,
            Stats,
            Location,
            NPC,
            Quest,
            AddLocation,
            AddNPC,
            AddQuest,
            DeleteLocation,
            DeleteNPC,
            DeleteQuest,
            PatchLocation,
            PatchNPC,
            PatchQuest
        },
        data: function () {
            return {
                displayToggle: "stats",
                modalToggle: "",
                characterData: json.characters,
                locationData: null,
                locationId: null,
                npcData: null,
                npcId: null,
                questData: null,
                questId: null
            }
        },
        methods: {
            getLocations: function () {
                axios
                    .get('http://gaming-mevn.herokuapp.com/locations')
                    .then(response => (this.locationData = response.data))                    
            },
            getNpcs: function () {
                axios
                    .get('http://gaming-mevn.herokuapp.com/npcs')
                    .then(response => (this.npcData = response.data)) 
            },
            getQuests: function () {
                axios
                    .get('http://gaming-mevn.herokuapp.com/quests')
                    .then(response => (this.questData = response.data))                    
            },
            getAll: function () {
                this.getLocations();
                this.getNpcs();
                this.getQuests();
            },
            deleteLocation: function (locationId) {
                this.displayToggle = "modal";
                this.modalToggle = "deleteLocation";
                this.locationId = locationId;

            },
            deleteNpc: function (npcId) {
                this.displayToggle = "modal";
                this.modalToggle = "deleteNpc";
                this.npcId = npcId;

            },
            deleteQuest: function (questId) {
                this.displayToggle = "modal";
                this.modalToggle = "deleteQuest";
                this.questId = questId;
            },
            patchLocation: function (locationId) {
                this.displayToggle = "modal";
                this.modalToggle = "patchLocation";
                this.locationId = locationId;
            },
            patchNpc: function (npcId) {
                this.displayToggle = "modal";
                this.modalToggle = "patchNpc";
                this.npcId = npcId;
            },
            patchQuest: function (questId) {
                this.displayToggle = "modal";
                this.modalToggle = "patchQuest";
                this.questId = questId;
            },
            changeToggle: function (displayToggle) {
                this.getAll();
                this.displayToggle = displayToggle;
                this.getAll();
            }
        },
        mounted: function () {
            this.getAll();
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
    #modal {
        position: fixed;
        bottom: 40%;
        left: 40%;
    }
    .modal-showing {
        opacity: 0.3;
    }
    .journal {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>
