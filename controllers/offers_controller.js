const { router, dbcontroller, FILES_PATH } = require("./controller-config");


router.post('/add-offers', async (req, res) => {
    try {
        let postdata = req.body;
        let newdata = await dbcontroller.addOffers(postdata);
        if(newdata) {
            let offer_id = newdata[0].offer_id;
            let imagetype = 'offer-image';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="offer-image-"+randomFileName + ".png";
            if(req.files != null) {
                 req.files.offerimagefile.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        let newdata1 = await dbcontroller.addImage(offer_id,imagetype,fileNameWithExtension);
                        if(newdata1) {
                            return res.status(200).send(newdata1);
                        }
                    }
                }) 
            }
            else {
                return res.status(200).send(newdata);
            }
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-all-offers/:user_id', async (req, res) => {
    try {

        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getOffersByMall(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getOffersByMall(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }

        // let newdata = await dbcontroller.getAllOffers();
        // if(newdata) {
        //     return res.status(200).send(newdata)
        // }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-offers-by-id/:offer_id', async (req, res) => {
    try {
        let {offer_id} = req.params;
        let newdata = await dbcontroller.getOffersById(offer_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.get('/get-offers-by-shop-id/:shop_id', async (req, res) => {
    try {
        let {shop_id} = req.params;
        let newdata = await dbcontroller.getOffersByShopId(shop_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.put('/updateOfferValidity/:offer_id', async (req, res) => {
    try {
        let {offer_id} = req.params;
        let offer_validity_date = req.body.data.validity;
        let newdata = await dbcontroller.updateOfferValidity(offer_id,offer_validity_date);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-offer-data/:offer_id', async (req, res) => {
    try {
        let {offer_id} = req.params;
        let postdata = req.body.data;
        let newdata = await dbcontroller.updateOfferData(offer_id,postdata);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-offer-image/:image_id', async (req, res) => {
    try {
        let {image_id} = req.params;
        let newdata = await dbcontroller.changeMainCardImage(image_id);
        if(newdata) {
             let main_card_id = newdata[0].image_type_id;
            let image_type = newdata[0].image_type;
            let randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            let fileNameWithExtension  =image_type+"-"+randomFileName + ".png";
            req.files.offerimage.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(main_card_id,image_type,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send(newdata1)
                    }
                }
            }) 
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-offer-status/:offer_id', async (req, res) => {
    try {
        let {offer_id} = req.params;
        let newdata = await dbcontroller.updateOfferStatus(offer_id)
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        res.status(500).send({error : `server error:${e}`});
    }
})

module.exports = router;