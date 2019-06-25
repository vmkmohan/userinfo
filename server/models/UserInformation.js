const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    firstName: {type: String, required: true},
    lastName:{type: String, required: true},
    mobileNumber: {type: Number, required: true, unique: true},
    emailId:{type: String, required: true},
    userRole:{type: Schema.Types.ObjectId, ref:'UserMaster'}
},{timestamps:true});

module.exports = mongoose.model('UserInformation', userInfoSchema);