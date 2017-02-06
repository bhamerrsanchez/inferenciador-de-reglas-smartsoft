var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ruleSchema = new Schema({
    name: {type: String},
    condition: {type: String},
    conditionObjects: [{}]
});

ruleSchema.virtual('idRule').get(function () {
    return this._id;
});
module.exports = mongoose.model('Rule', ruleSchema);