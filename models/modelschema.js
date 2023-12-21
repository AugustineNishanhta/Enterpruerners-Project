const mongoose = require('mongoose');
const AqcelloratorSchema = new mongoose.Schema({
	
	Name: String,
	Roll: String,
	Address:String,
	email: String,
	Businesstype :String,
	business:String
});
module.exports = mongoose.model('Aqcellor', AqcelloratorSchema, 'Aqcellors');