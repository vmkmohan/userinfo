const UserMasterController = require('../server/controllers/UserMasterController');
exports.userRoles = [
    {roleName: "ADMIN"},
    {roleName: "MANAGER"},
    {roleName: "PRODUCT MANAGER"},
    {roleName: "ACCOUNTANT"},
    {roleName: "TEAM LEADER"}
];

exports.generateUserRoles = async(addRoles)=>{
    try{
        if(addRoles){
            let count = await UserMasterController.getUserRoleCount();
            if(count==0){
                let numberOfRoles = this.userRoles.length;
                for(let i=0;i<numberOfRoles;i++){
                    let role = this.userRoles[i];
                    await UserMasterController.addUserMaster(role);
                }
                console.log('User Roles Added From Seeds');
            }else{
                console.log("User Roles Already Exists");
            }
        }
    }catch(e){
        console.log(e)
    }
    
}