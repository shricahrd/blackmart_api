const { states, cities, pages, site_info } = require("../model/MasterModel");
const Constant = require('../../../../config/Constant');

const {
    responseSend,
    CatchError,
    STATUS_CODES,
  } = require("../../../../helper/responseHandler");


  const getState = async function (req, res) {
    try {
            const { countryId } = req.query
            const stateList = await states.findAll({
                attributes: ['id', 'name'],
                where: { country_id: countryId || 101, is_deleted:'0' }
            })            
                
            return responseSend(res, {
                status: STATUS_CODES.OK,
                message: Constant.getData,
                data: stateList,
            });

        } catch (error) {
            return CatchError(res, error);
        }
}

const getCity = async function (req, res) {
    try {
            const { stateId } = req.query
            const cityList = await cities.findAll({
                attributes: ['id', 'name'],
                where: { state_id: stateId, is_deleted:'0'}
            })    
            return responseSend(res, {
                status: STATUS_CODES.OK,
                message: Constant.getData,
                data: cityList,
            });

        } catch (error) {
            return CatchError(res, error);
        }
}

const getPage = async function (req, res) {
    try {
            const { slug } = req.query
            const pageData = await pages.findOne({                
                where: { slug: slug}
            })    
            return responseSend(res, {
                status: STATUS_CODES.OK,
                message: Constant.getData,
                data: pageData,
            });

        } catch (error) {
            return CatchError(res, error);
        }
}


const getAppInfo = async function (req, res) {
    try {         
            const infoData = await site_info.findOne({                
                where: { id: 1}
            })    
            return responseSend(res, {
                status: STATUS_CODES.OK,
                message: Constant.getData,
                data: infoData,
            });

        } catch (error) {
            return CatchError(res, error);
        }
}

module.exports = {getState, getCity, getPage, getAppInfo}