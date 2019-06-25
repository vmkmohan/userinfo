const UserInfo = require('../models/UserInformation');
const UserMasterController = require('./UserMasterController');
const responseController = require('../../utils/ResponseController');
const Validation = require('../../utils/Validation');


exports.create = async(req, res)=>{
    try{
        let reqBody = req.body;
        let userInfo = await this.createUser(reqBody);
        responseController.sendSuccess(res, "User Information Created");
    }catch(e){
        if(e.known){
            responseController.sendBadRequest(res, e.error);
        }else{
            responseController.sendBadRequest(res, "Unexpected error creating user info");
        }
        
    }
};

exports.list = async(req, res)=>{
    try{
        let userInfo = await this.getUserInformation();
        responseController.sendSuccess(res, userInfo);
    }catch(e){
        responseController.sendInternalError(res, e);
    }
};  

exports.createUser = async(data)=>{
    try{
        let role = await UserMasterController.getUserMasterByName(data.role);
        let userInfo = new UserInfo();
        userInfo.firstName = data.firstName;
        userInfo.lastName = data.lastName;
        userInfo.mobileNumber = data.mobileNumber;
        userInfo.emailId = data.emailId;
        userInfo.userRole = role._id;
        let createdUserInfo = await userInfo.save();
        return createdUserInfo;
    }catch(e){
        if(e.known){
            throw e;
        }else{
            throw {known: true, error: Validation.validatingErrors(e)}
        }
    }
};

exports.getUserInformation = async ()=>{
    try{
        let data = await UserInfo.find({},{"__v": 0, createdAt:0, updatedAt:0}).populate('userRole',{roleName:1}).lean();
        return data;
    }catch(e){
        throw "Unexpected error accessing data";
    }
}