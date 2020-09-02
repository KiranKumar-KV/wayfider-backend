const { router, dbcontroller, FILES_PATH } = require("./controller-config");

const {getShopsDetais} = require('../db/array_formatter');

router.get('/get-device-data/:device_id', async (req,res) => {
    try {
        let {device_id} = req.params;
        let newdata = await dbcontroller.getDeviceData(device_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }   
    catch(e) {
        return res.status(500).send({ error : `server error ${e}`})
    } 
})

router.get('/get-device-data-new/:device_id', async (req,res) => {
    try {
        let {device_id} = req.params;
        let newdata = await dbcontroller.getDeviceMallId(device_id);
        if(newdata) {
            let devicedata = [];
            let mall_id = newdata[0].mall_id;
            let mall_info = await dbcontroller.getMallInfoByMallId(mall_id);
            let main_card = await dbcontroller.getMainCardsByMallId(mall_id);
            let banners = await dbcontroller.getBannersByMallId(mall_id);
            let events = await dbcontroller.getEventByMallId(mall_id);
            let floors = await dbcontroller.getFloorByMallId(mall_id);
            let stores = await dbcontroller.getStoreByMallId(mall_id);
            let shops = await dbcontroller.getShopsByMall(mall_id);
            let offers = await dbcontroller.getOffersByMall(mall_id);
            let mall = await dbcontroller.getMallByID(mall_id)
            let flooramenities = await dbcontroller.getAllAmenitiesByMallId(mall_id);
            let shopsandcategories = await dbcontroller.getDeviceShops(mall_id);
            let shopsDetails = await getShopsDetais(shops,shopsandcategories);
            let obj = {
                mall : mall,
                mall_info : mall_info,
                main_card : main_card,
                banners : banners,
                events : events,
                floors : floors,
                stores : stores,
                shops : shopsDetails,
                offers : offers,
                flooramenities : flooramenities
            }
            devicedata.push(obj)
            return res.status(200).send(devicedata);
        }
    }   
    catch(e) {
        return res.status(500).send({ error : `server error ${e}`})
    } 
})

router.get('/get-device-shops', async (req,res) => {
    try {
        let mall_id = 1;
        let newdata = await dbcontroller.getDeviceShops(mall_id);
        return res.status(200).send(newdata)
    }
    catch(e) {
        return res.status(500).send({ error : `server error ${e}`})
    }
})


module.exports = router;