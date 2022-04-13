const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		walletAddress: { type: String, required: true, unique: true },
		discord_id: { type: String , default: ''},
		syrups: { type: Number, default: 0},
		won: {type: Boolean, default: false},
	},
	{ collection: 'shubhraBhaiKaData' }
)

const model = mongoose.model('UserData', User)

module.exports = model