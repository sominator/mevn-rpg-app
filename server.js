require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

server.use(express.json());
server.use(cors());
server.use(serveStatic(__dirname + "/client/dist"));

const locationRouter = require(__dirname + '/routes/Locations');
server.use('/locations', locationRouter);

const npcRouter = require(__dirname + '/routes/Npcs');
server.use('/npcs', npcRouter);

const questRouter = require(__dirname + '/routes/Quests');
server.use('/quests', questRouter);

server.listen(3000, () => console.log("Server started!"));