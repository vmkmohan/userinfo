const UserMaster = require('../models/UserMaster');
const responseController = require('../../utils/ResponseController');
const Validation = require('../../utils/Validation')

exports.create = async(req, res)=>{
    try{
        let reqBody = req.body;
        let userMaster = await this.addUserMaster(reqBody);
        responseController.sendSuccess(res, "User Master Created");
    }catch(e){
        responseController.sendBadRequest(res, e);
    }
};

exports.addUserMaster = async (data)=>{
    try{
        let newUserMaster = new UserMaster();
        newUserMaster.roleName = data.roleName ? data.roleName.toUpperCase(): data.roleName;
        let createdUserMaster = await newUserMaster.save();
        return createdUserMaster;
    }catch(e){
        console.log(e);
        let error = Validation.validatingErrors(e);
        throw error;
    }
};

exports.getUserMasterByName = async (name)=>{
    try{
        name = name ? name.toUpperCase(): name;
        let userMaster = await UserMaster.findOne({roleName: name}).lean();
        if(userMaster){
            return userMaster;
        }else{
            throw {known: true, error: 'Invalid User Role'}
        }
    }catch(e){
        if(e.known){
            throw e;
        }else{
            throw {known: true, error: 'Unexpected error accssing data'}
        }
        
    }
};

exports.getUserRoleCount = async()=>{
    try{
        let userRoleCount = await UserMaster.countDocuments({});
        return userRoleCount;
    }catch(e){
        throw e;
    }
}