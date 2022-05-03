const mongoose = require('mongoose')

const Winner = new mongoose.Schema(
	{
		walletAddress: { type: String, required: true},
		discord_id: { type: String , default: '' },
		syrups: { type: Number},
		won: {type: Boolean, default: false},
		hasDiscord: {type: Boolean} 
	},
	{ collection: 'waffleWhitelists' }
)

const model = mongoose.model('WinnerData', Winner)

module.exports = model
