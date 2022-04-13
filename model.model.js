const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		walletAddress: { type: String, required: true, unique: true },
		discord_id: { type: String , default: ''},
		syrups: { type: Number, default: 0},
		won: {type: Boolean, default: false},
		entryTime : {type: Number, default:1449828713}
	},
	{ collection: 'shubhraBhaiKaData' }
)

const model = mongoose.model('UserData', User)

module.exports = model