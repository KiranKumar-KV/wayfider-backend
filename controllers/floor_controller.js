const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.get('/get-floor/:user_id', async (req, res) => {
    try {
        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getFloorByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getFloorByMallId(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }  
})

router.get('/get-floor-by-id/:floor_id', async (req, res) => {
    try {
        let floor_id = req.params.floor_id;
        let newdata = await dbcontroller.getFloorById(floor_id)
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.get('/get-floor-by-mall-id/:mall_id', async (req, res) => {
    try {
        let mall_id = req.params.mall_id;
        let newdata = await dbcontroller.getFloorByMallId(mall_id);
        if(newdata) { 
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.put('/update-floor-by-id/:id', async (req, res) => {
    try {
        let floor_id = req.params.id;
        let postdata = req.body.data;
        let newdata = await dbcontroller.updateFloorData(floor_id,postdata);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.put('/update-floor-status-by-id/:id', async (req, res) => {
    try {
        let floor_id = req.params.id;
        let newdata = await dbcontroller.updateFloorStatus(floor_id);
        if(newdata) { 
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.post('/add-floor', async (req, res) => {
    try {
        let postdata = req.body;
        let {mall_id,name,alias} = req.body;
        let checkData = await dbcontroller.checkForFloor(mall_id,name,alias);
        if(checkData.length === 0){
            let newdata = await dbcontroller.addFloor(postdata);
            if(newdata) {
                let floor_id = newdata[0].floor_id;
                let imagetype = 'floor';
                if(parseInt(req.body.imageCount) === 1) {
                    const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

                    const fileNameWithExtension  = "floor-"+randomFileName + ".png";
                    req.files.filename.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                        if(err) {
                            console.log(err)
                        }
                        else {
                            let newdata1 = await dbcontroller.addImage(floor_id,imagetype,fileNameWithExtension);
                            if(newdata1) {
                                return res.status(200).send(newdata1)
                            }
                        }
                    }) 
                }   
            }
        }
        else {
            return res.status(400).send({error : 'already exists'})
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-floor-image', async (req, res) => {
    try {
        let {image_id, floor_id} = req.body;
        let newdata = await dbcontroller.updateFloorImage(image_id);
        if(newdata) {
            let imagetype = 'floor';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="floor-"+randomFileName + ".png";
            req.files.floorimage.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(floor_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send({message : 'floor image updated'});
                    }
                }
            })
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

module.exports = router;