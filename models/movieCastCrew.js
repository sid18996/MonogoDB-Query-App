var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var movieCastCrewSchema = new Schema({
	movie_id : Number,
	title : String,
	cast :
	[
		{
			cast_id : Number,
			character : String,
			credit_id : String,
			gender : Number,
			id : Number,
			name : String,
			order : Number,
		}
	],
	crew :  
	[
		{
			credit_id : String,
			department : String,
			gender : Number,
			id : Number,
			job : String,
			name : String,
		},

	],

})


module.exports = mongoose.model('movieCastCrew', movieCastCrewSchema);
