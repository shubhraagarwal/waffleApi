const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT; // PORT dekh-liyo
const model = require('./model.model') ; 
const cors = require('cors')
const cron = require("node-cron");
const schedule = require('node-schedule');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected Successfully");
});


// considered SChema
// walletAddress: 
// discord_id, required: false

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('home');
})



let winners = null;
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.tz = 'Etc/UTC';
schedule.scheduleJob(rule, async function(){
	console.log("node-schedule working");
	winners = await  model.aggregate([
		// {$match: {won : 1}},
		{$sample: {size: 10}}
	], 
	// function(err, docs) {
	// 	console.log(docs);
	// }
	);

});
// async function asyncCall(){
// 	winners.map(x => {
// 		await model.updateOne(
// 			{ _id: x._id },
// 			{ $set: { won: true } }
// 		)
// 	})
// }
// asyncCall();

// Creating account
app.post('/api/v1/users/addUser' , async (req,res) =>{
    console.log(req.body)
	const wallet = req.body.walletAddress;
    try {
		
		await model.create({
			walletAddress: wallet
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate address' })
	}
})


// Entering Discord Id
app.post('/api/v1/users/addDiscordId' , async (req,res)=>{
    try{
        const wallet = req.body.walletAddress
        const disc_id = req.body.discordid
        await model.create({
			walletAddress : wallet,
			discord_id: disc_id
		})
		res.json({ code: '200' , status: 'ok' , id: disc_id })
    }
    catch(err){
        res.json({ code: '400' , status: 'error', error: 'error' })
    }
} )

app.post('/api/v1/users/getUser' , async (req,res) => {
	console.log("searching for user");
	const address = req.body.walletAddress

	try{
		const data = await model.find({ walletAddress : address})
		res.send(data);
		console.log(data);
		console.log("wallet and syrup count found");
	}catch(e){
		console.log("Failed to retrieve the Syrup Count: " + e);
	}
})

// Winner Selection
app.get('/api/v1/users/getAllWinner', async (req,res) => {
	if(winners === null){
		res.json(null)
	}else{
		res.send(winners);
	}
})
 
app.post('/api/v1/users/addViewsOfWaffleCount', async(req, res) => {
	console.log("adding 8 to syrup count");
	const walletAdd = req.body.walletAddress;
	const entryTime = req.body.entryTime;

	try{
	const data = await model.find({ walletAddress : address})
	const newSyrupVal = data[0].syrups;
	newSyrupVal+= 8;

	await model.updateOne(
		{ walletAddress: walletAdd },
		{ $set: { syrups: newSyrupVal } }
	)
	return res.json({ status: 'ok' })
}catch(err){
	console.log(err);
	res.json({ status: 'error', error: err })
}
})


app.listen(port);
console.log('Server started at http://localhost:' + port);