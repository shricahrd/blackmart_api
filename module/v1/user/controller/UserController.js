
const {
    responseSend,
    CatchError,
    STATUS_CODES,
  } = require("../../../../helper/responseHandler");
const {Customer} = require("../model/UserModel");    
const {bcryptfun, bcryptCompare, jwtToken, generateOTP, otpjwtToken} = require("../../../../helper/utilFunctions");
const Constant = require('../../../../config/Constant');

const UserLogin = async function(req,res){
    try {
            const {email} =  req.body;
            let isExist = req.user;  
            if(isExist){
                if(isExist.status == 0){
                    return responseSend(res, {
                        status: STATUS_CODES.BAD_REQUEST,
                        message: Constant.accountBlocked,
                        data: {}
                    });
                }

                const OTP = await generateOTP(); 
                const data = {
                    otp : OTP,
                    expire_at : new Date(Date.now() + 5 * 60 * 1000)
                }
                let isUpdated = await Customer.update(data, {where:{email:email}}); 
                const token = await otpjwtToken({ verifyId: isExist.id, email:isExist.email});

                if(isUpdated){
                    return responseSend(res, {
                        status: STATUS_CODES.OK,
                        message: Constant.otpSent,
                        data: {email:isExist.email, token:token},
                    });
                }else{
                    return responseSend(res, {
                        status: STATUS_CODES.INTERNAL_ERROR,
                        message: Constant.serverError,
                        data : {}
                    });
                }
                

            }else{
                return responseSend(res, {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: Constant.loginFailed,
                    data: {}
                });
            }
           
        } catch (error) {
            return CatchError(res, error);
        }
}

const ResendUserOTP = async function(req,res){
    try {
        const {email} =  req.body;
        let isExist = req.user; 
        if(isExist){
            if(isExist.status == 0){
                return responseSend(res, {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: Constant.accountBlocked,
                    data: {}
                });
            }

            const OTP = await generateOTP(); 
            const data = {
                otp : OTP,
                expire_at : new Date(Date.now() + 5 * 60 * 1000)
            }
            let isUpdated = await Customer.update(data, {where:{email:email}}); 
            const token = await otpjwtToken({ verifyId: isExist.id, email:isExist.email});

            if(isUpdated){
                return responseSend(res, {
                    status: STATUS_CODES.OK,
                    message: Constant.otpSent,
                    data: {email:isExist.email, token:token},
                });
            }else{
                return responseSend(res, {
                    status: STATUS_CODES.INTERNAL_ERROR,
                    message: Constant.serverError,
                    data : {}
                });
            }
            

        }else{
            return responseSend(res, {
                status: STATUS_CODES.NOT_FOUND,
                message: Constant.noDataFound,
                data: {}
            });
        }
       
    } catch (error) {
        return CatchError(res, error);
    }
}

const UserRegistration = async function (req, res) {
    try {
            const {first_name, last_name, email, country_code, phone} = req.body;
            const NewCustomer = {
                                    first_name:first_name,
                                    last_name:last_name,
                                    email:email,   
                                    country_code:country_code,
                                    phone:phone       
                                }

            let isCreated = await Customer.create(NewCustomer);    
            if(isCreated){

                const OTP = await generateOTP(); 
                const data = {
                    otp : OTP,
                    expire_at : new Date(Date.now() + 5 * 60 * 1000)
                }
                let isUpdated = await Customer.update(data, {where:{email:email}}); 
                const token = await otpjwtToken({ verifyId: isCreated.id, email:isCreated.email});

                if(isUpdated){
                    return responseSend(res, {
                        status: STATUS_CODES.OK,
                        message: Constant.AccontCreated,
                        data: {email:isCreated.email, token:token},
                    });
                }else{
                    return responseSend(res, {
                        status: STATUS_CODES.INTERNAL_ERROR,
                        message: Constant.serverError,
                        data : {}
                    });
                }
                
            }      

        } catch (error) {
            return CatchError(res, error);
        }
}

const verifyOTP = async function (req, res){
    try{
        const {otp} =  req.body;
        const userID = req.user.verifyId;
        let User = await Customer.findOne({
            where :{
            id : userID,
            otp : otp,
            is_deleted:0
            }
        }) 
        if(User){
            if(new Date() > new Date(User.expire_at)){
                return responseSend(res, {
                    status: STATUS_CODES.BAD_REQUEST,
                    message: Constant.otpExpired,
                    data : {}
                });
            }

            if(User.is_email_verified == 0){                 
                 const data = {
                                is_email_verified : 1,
                                email_verified_at : new Date()
                              }
                let isUpdated = await Customer.update(data, {where:{id:userID}}); 
            }

            const token = await jwtToken({ userId: userID});
            return responseSend(res, {
                status: STATUS_CODES.OK,
                message: Constant.loginSuccess,
                data: { token: token } ,
            });
           
          
        }else{
            return responseSend(res, {
                status: STATUS_CODES.BAD_REQUEST,
                message: Constant.invalidOTP,
                data : {}
            });
        }
    } catch (error) {
        return CatchError(res, error);
    }
}


const UserProfile = async function (req, res){
    try{
        const userID = req.user.userId;
        let User = await Customer.findOne({
            where :{
            id : userID,          
            is_deleted:0
            }
        }) 
        if(User){
        
            return responseSend(res, {
                status: STATUS_CODES.OK,
                message: Constant.getData,
                data: { first_name: User.first_name, last_name:User.last_name, email:User.email, country_code:User.country_code, phone:User.phone } ,
            });
           
          
        }else{
            return responseSend(res, {
                status: STATUS_CODES.NOT_FOUND,
                message: Constant.noDataFound,
                data : {}
            });
        }

    } catch (error) {
        return CatchError(res, error);
    }
}



module.exports = {UserRegistration, UserLogin, verifyOTP, ResendUserOTP, UserProfile}