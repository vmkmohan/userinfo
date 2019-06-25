const UserInfoCtrl = require('./server/controllers/UserInformationController');
const UserMasterCtrl = require('./server/controllers/UserMasterController');

module.exports=function(router){

    //User Information
    router.post('/api/v1/userinfo', UserInfoCtrl.create);
    router.get('/api/v1/userinfo', UserInfoCtrl.list);

    //User Master
    router.post('/api/v1/usermaster', UserMasterCtrl.create);
}
