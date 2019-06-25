const mongoose = require('mongoose');
const config = require("./config");
const seeds = require('../utils/seeds');

const mongodbUri = config.MongoDB["protocol"]+config.MongoDB["host"]+config.MongoDB["db"];
exports.connect = ()=>{
	mongoose.connect(mongodbUri,{useNewUrlParser: true, useCreateIndex: true});

	mongoose.connection.on('disconnected', function() {
		setTimeout(function(){
			mongoose.connect(mongodbUri);
		}, 3000);
	});
	
	mongoose.connection.on('error', function(error) {
		console.error('Error in MongoDb connection: ' + error);
		mongoose.disconnect();
	});
	
	mongoose.connection.on('connected', function(){
		console.log('connected with mongodb');
		seeds.generateUserRoles(config.addSeedsData);
	});
}