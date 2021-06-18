var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var dbSchema = new Schema({
	isDone: {
		type: Boolean,
		required: true
	},
	name: {
		type: String,
		required: true,
	},
	priority: {
		type: Number,
		required: true,
		min: 1,
		max: 10,
	},
	startDate: {
		type: Date,
		required: true
	},
	deadLine: {
		type: Date,
		required: true,
		validate: [dateValidator, "Start should be before end date"],
	}
});

// https://stackoverflow.com/a/29416193/11587347
function dateValidator(value) {
  // `this` is the mongoose document
  return this.startDate <= value;
}

var db = mongoose.model("todo", dbSchema);

module.exports = db;
