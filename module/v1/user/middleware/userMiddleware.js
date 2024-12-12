const Joi = require('joi');
const jwt = require("jsonwebtoken");
const {
    responseSend,   
    STATUS_CODES,
  } = require("../../../../helper/responseHandler");
const {Customer} = require("../model/UserModel");    
const Constant = require('../../../../config/Constant');


const CustomerRegistrationMiddleware = async (req, res, next) => {
    const CustomerReq = Joi.object({     
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        country_code: Joi.string().min(2).max(5).required(), 
        phone : Joi.string().min(10).max(10).required(),
    });
    let result = CustomerReq.validate(req.body); 
    if(result.error) return responseSend(res, { status : STATUS_CODES.UNPROCESSABLE_ENTITY, message : result.error.details[0].message })
   
    let isEmailExist = await Customer.findOne({
                                    where :{
                                    email : req.body.email,
                                    is_deleted:0
                                    }
                                }) 
    let isPhoneExist = await Customer.findOne({
      where :{
                country_code : req.body.country_code,
                phone : req.body.phone,
                is_deleted:0
             }
     })         

    if(isEmailExist){
        return responseSend(res, { status : STATUS_CODES.ALREADY_EXIST, message : Constant.userEmailExist })
    }
    
    if(isPhoneExist){
      return responseSend(res, { status : STATUS_CODES.ALREADY_EXIST, message : Constant.userPhoneExist })
  }
    return next(); 
  };

const CustomerLoginMiddleware = async (req, res, next) =>{
  const CustomerReq = Joi.object({
      email: Joi.string().email().required(),  
  });
  let result = CustomerReq.validate(req.body); 
  if(result.error) return responseSend(res, { status : STATUS_CODES.UNPROCESSABLE_ENTITY, message : result.error.details[0].message })
 
  let isExist = await Customer.findOne({
                                        where :{
                                        email : req.body.email,
                                        is_deleted:0
                                        }
                                    })                             
    if(isExist){
      req.user = isExist;
      return next(); 
    }else{
      return responseSend(res, { status : STATUS_CODES.NOT_FOUND, message : Constant.userNotExist })
    }
}

const CustomerResendOTPMiddleware = async (req, res, next) =>{
  const CustomerReq = Joi.object({
      email: Joi.string().email().required(),  
  });
  let result = CustomerReq.validate(req.body); 
  if(result.error) return responseSend(res, { status : STATUS_CODES.UNPROCESSABLE_ENTITY, message : result.error.details[0].message })
 
  let isExist = await Customer.findOne({
                                        where :{
                                        email : req.body.email,
                                        is_deleted:0
                                        }
                                    })                             
    if(isExist){
      req.user = isExist;
      return next(); 
    }else{
      return responseSend(res, { status : STATUS_CODES.NOT_FOUND, message : Constant.userNotExist })
    }
}

const verifyOTPMiddleware = async (req, res, next) =>{

  let authHeader = req.header('Authorization');
  if (!authHeader) {
    return responseSend(res, { status : STATUS_CODES.UN_AUTHORISED, message : Constant.unauthorised })
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return responseSend(res, { status : STATUS_CODES.UN_AUTHORISED, message : Constant.unauthorised })
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;   
   
  } catch (err) {    
    return responseSend(res, { status : STATUS_CODES.INVALID_ACCESS_TOKEN, message : Constant.invalidToken })
  }  

  const CustomerOVReq = Joi.object({
    otp: Joi.string().min(4).max(4).required(),
  });
    let result = CustomerOVReq.validate(req.body); 
    if(result.error) return responseSend(res, { status : STATUS_CODES.UNPROCESSABLE_ENTITY, message : result.error.details[0].message })
  
    let isExist = await Customer.findOne({
                                          where :{
                                          id : req.user.verifyId, 
                                          email : req.user.email,
                                          is_deleted:0
                                          }
                                      })                             
      if(isExist){
        return next(); 
      }else{
        return responseSend(res, { status : STATUS_CODES.NOT_FOUND, message : Constant.userNotExist })
      }
}

/**
 * Check login user token 
 */
const isValidUser = async (req, res, next) => {
  let authHeader = req.header('Authorization');
  if (!authHeader) {
    return responseSend(res, { status : STATUS_CODES.UN_AUTHORISED, message : Constant.unauthorised })
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return responseSend(res, { status : STATUS_CODES.UN_AUTHORISED, message : Constant.unauthorised })
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next(); 
  } catch (err) {    
    return responseSend(res, { status : STATUS_CODES.INVALID_ACCESS_TOKEN, message : Constant.invalidToken })
  }
};

 

module.exports = { 
    CustomerRegistrationMiddleware,
    CustomerLoginMiddleware,    
    verifyOTPMiddleware,
    isValidUser,
    CustomerResendOTPMiddleware
 };