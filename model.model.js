const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		walletAddress: { type: String, required: true, unique: true },
		discord_id: { type: String},
		syrups: { type: String},
		quote: { type: String },
	},
	{ collection: 'shubhraBhaiKaData' }
)

const model = mongoose.model('UserData', User)

module.exports = model