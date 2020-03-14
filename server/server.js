require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

server.use(express.json());
server.use(cors());

const locationRouter = require('./routes/locations');
server.use('/locations', locationRouter);

const npcRouter = require('./routes/npcs');
server.use('/npcs', npcRouter);

const questRouter = require('./routes/quests');
server.use('/quests', questRouter);

server.listen(3000, () => console.log("Server started!"));