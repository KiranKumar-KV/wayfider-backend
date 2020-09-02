const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.post('/add-main-card', async (req, res) => {
    try {
        let main_card_name = req.body.name;
        let mall_id = parseInt(req.body.mall_id);
        let checkData = await dbcontroller.checkForMainCard(main_card_name,mall_id)
        if(checkData.length == 0) {
            let newdata = await dbcontroller.addMainCard(main_card_name,mall_id);
            let finish = false;
            if(newdata) {
                let main_card_id = newdata[0].main_card_id;
                let imagetype = 'main-card-floor-image';
                let randomFileName = Math.random()
                            .toString(36)
                            .substring(5);

                let fileNameWithExtension  ="main-card-floor-image-"+randomFileName + ".png";
                req.files.floorimage.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        let newdata1 = await dbcontroller.addImage(main_card_id,imagetype,fileNameWithExtension);
                        if(newdata1) {
                            finish = false;
                        }
                    }
                }) 

                let imagetype1 = 'main-card-name-image';
                let randomFileName1 = Math.random()
                            .toString(36)
                            .substring(5);

                let fileNameWithExtension2  ="main-card-name-image-"+randomFileName1 + ".png";
                req.files.nameimage.mv(`${FILES_PATH}/${fileNameWithExtension2}`,async err => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        let newdata2 = await dbcontroller.addImage(main_card_id,imagetype1,fileNameWithExtension2);
                        if(newdata2) {
                            finish = false;
                        }
                    }
                }) 

                let imagetype2 = 'main-card-offers-image';
                let randomFileName2 = Math.random()
                            .toString(36)
                            .substring(5);

                let fileNameWithExtension3  ="main-card-offers-image-"+randomFileName2 + ".png";
                req.files.offersimage.mv(`${FILES_PATH}/${fileNameWithExtension3}`,async err => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        let newdata3 = await dbcontroller.addImage(main_card_id,imagetype2,fileNameWithExtension3);
                        if(newdata3) {
                            finish = true;
                        }
                    }
                    if(finish == true) {
                        return res.status(200).send({message : 'main-card added successfully'})
                    }
                }) 
            }
        }
        else {
            return res.status(400).send({error : 'already exists'});
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/change-main-card-image/:image_id', async (req, res) => {
    try {
        let image_id = req.params.image_id;
        let newdata = await dbcontroller.changeMainCardImage(image_id);
        if(newdata) {
            let main_card_id = newdata[0].image_type_id;
            let image_type = newdata[0].image_type;
            // let imagetype = 'main-card-floor-image';
            let randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            let fileNameWithExtension  =image_type+"-"+randomFileName + ".png";
            req.files.imagefile.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
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

router.put('/main-card-delete/:main_card_id', async (req, res) => {
    try {
        let {main_card_id} = req.params;
        let newdata = await dbcontroller.mainCardStatusUpdate(main_card_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-mall-main-card', async (req, res) => {
    try {
        let postdata  = req.body.data;
        let newdata = await dbcontroller.updateMainCardMall(postdata);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-all-main-cards/:user_id', async (req, res) => {
    try {
        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getMainCardsByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getMainCardsByMallId(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }
        // let newdata = await dbcontroller.getAllMainCards();
        // if(newdata) {
        //     return res.status(200).send(newdata);
        // }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-main-cards-by-mall-id/:mall_id', async (req, res) => {
    try {
        let {mall_id} = req.params;
        let newdata = await dbcontroller.getMainCardsByMallId(mall_id);
        if(newdata) { 
            return res.status(200).send(newdata)
        }
    }
    catch (e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})  

router.get('/get-main-cards-by-card-id/:main_card_id', async (req, res) => {
    try {
        let {main_card_id} = req.params;
        let newdata = await dbcontroller.getMainCardsById(main_card_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }
})

module.exports = router;