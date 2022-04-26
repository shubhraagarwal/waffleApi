const mongoose = require('mongoose')

const selectedWinners = new mongoose.Schema(
	{
		discord_id: { type: String , required: true },
	},
	{ collection: 'WinnersList' }
)

const model = mongoose.model('WinnersList', selectedWinners)

module.exports = model