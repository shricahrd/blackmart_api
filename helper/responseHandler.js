const Constant = require('../config/Constant');

const STATUS_CODES = {
    OK: 200,
    DATA_CREATED: 201,
    DATA_UPDATED: 202,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 401,
    INVALID_ACCESS_TOKEN: 403,
    NOT_FOUND: 404,
    ALREADY_EXIST: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_ERROR: 500,
    PAYMENT_REQUIRED: 402
}

const CatchError = (res, error) => {
    console.log("===== Server Error ====>", {error});
    return res.status(STATUS_CODES.INTERNAL_ERROR).json({ status: Constant.statusFailure, message: Constant.serverError})
}

responseSend = (res,data) => {
    switch (data.status) {
        case STATUS_CODES.OK:
            res.status(STATUS_CODES.OK).json({         
                "status": Constant.statusSuccess,
                "message": (data.message) ? data.message :"Data get successfully",
                "data": data.data,
                ...(data.page && {
                    "page": data.page,
                    "total": data.total
                })
            });
            break;

        case STATUS_CODES.DATA_CREATED:
            res.status(STATUS_CODES.DATA_CREATED).json({          
                "status": Constant.statusSuccess,
                "message": (!data.message) ? "Data created" : data.message,
                "data": data.data
            });
            break;

        case STATUS_CODES.DATA_UPDATED:
             res.status(STATUS_CODES.DATA_UPDATED).json({         
                "status": Constant.statusSuccess,
                "message": (data.message) ? data.message :"Data updated successfully",
                "data": (data.data) ? data.data :{}
            });
            break;

        case STATUS_CODES.ALREADY_EXIST:
            res.status(STATUS_CODES.ALREADY_EXIST).json({               
                "status": Constant.statusFailure,
                "message": (data.message) ? data.message : "Already exist",
                "data": (data.data) ? data.data :{}
            });

            break;
        case STATUS_CODES.UNPROCESSABLE_ENTITY:
              res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({               
                "status": Constant.statusFailure,
                "message": (data.message) ? data.message :"Unprocessable entity",
                "data": {}
            });
    
            break;
        case STATUS_CODES.BAD_REQUEST:
             res.status(STATUS_CODES.BAD_REQUEST).json({              
                "status": Constant.statusFailure,
                "message": (data.message) ? data.message :"Bad request..",
                "data": (data.data) ? data.data :{}
            });

            break;

        case STATUS_CODES.UN_AUTHORISED:
            res.status(STATUS_CODES.UN_AUTHORISED).json({               
                "status": Constant.statusFailure,
                "message": (data.message) ? data.message :"Unauthorized request",
                "data": {}
            });

            break;

            case STATUS_CODES.PAYMENT_REQUIRED:
                res.status(STATUS_CODES.PAYMENT_REQUIRED).json({
                    "status": Constant.statusFailure,
                    "message": (data.message) ? data.message :"Payment Required",
                    "data": {}
                });
    
                break;

            case STATUS_CODES.INVALID_ACCESS_TOKEN:
                res.status(STATUS_CODES.INVALID_ACCESS_TOKEN).json({                   
                    "status": Constant.statusFailure,
                    "message": (data.message) ? data.message :"Invalid Access Token",
                    "data": {}
                });
    
                break;


        case STATUS_CODES.NOT_FOUND:
            res.status(STATUS_CODES.NOT_FOUND).json({              
                "status": Constant.statusFailure,
                "message": (data.message) ? data.message :"Resources not found",
                "data": (data.data) ? data.data : {},
                ...(data.pageNo && {
                    "pageNo": data.pageNo,
                    "length": data.length
                })
            });

            break;

        case STATUS_CODES.INTERNAL_ERROR:
            res.status(STATUS_CODES.INTERNAL_ERROR).json({              
                "status": Constant.statusFailure,
                "message": (data.message) ? data.message :"Internal Server Error",
                "data": {}
            });

            break;
        case 600:
            res.status(data.data);
            break;
    }
}

module.exports = {
    STATUS_CODES,
    CatchError,   
    responseSend
}