const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.post('/add-store', async (req,res) => {
    try {
        let postdata = req.body;
        let newdata = await dbcontroller.addStore(postdata);
        if(newdata) {
            let store_id = newdata[0].store_id;
            let imagetype = 'store-path';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="store"+randomFileName + ".json";
            req.files.pathfile.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(store_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send(newdata1)
                    }
                }
            }) 
        }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`})
    }
})

router.get('/get-all-stores/:user_id', async (req,res) => {
    try {

        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getStoreByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getStoreByMallId(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }

        // let newdata = await dbcontroller.getAllStores();
        // if(newdata){
        //     console.log(newdata)
        //     return res.status(200).send(newdata);
        // }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error:`server error ${e}`});
    }
})

router.get('/get-store-by-store-id/:id', async (req,res) => {
    try {
        let store_id = req.params.id;
        let newdata = await dbcontroller.getStoreById(store_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error ${e}`})
    }
})

router.get('/get-store-by-floor-id/:floor_id', async (req,res) => {
    try {
        let floor_id = req.params.floor_id;
        let newdata = await dbcontroller.getStoreByFloorId(floor_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error :`server error ${e}`})
    }
})

router.put('/update-store-path', async (req,res) => {
    try {
        let store_id = req.body.store_id;
        let image_id = req.body.image_id;
        let newdata = await dbcontroller.imageStatusUpdate(image_id);
        if(newdata) {
            let imagetype = 'store-path';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="store"+randomFileName + ".json";
            req.files.pathfile.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(store_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send(newdata1)
                    }
                }
            }) 
        }
    }
    catch(e) {
        console.log(e)
        return res.status(200).send({error : `server error ${e}`})
    } 
})

router.put('/update-store-status/:store_id', async (req,res) => {
    try { 
        let store_id = req.params.store_id;
        let newdata = await dbcontroller.updateStoreStatus(store_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(200).send({error : `server error ${e}`})
    }
})

router.get('/get-stores/:mall_id', async (req,res) => {
    try {
        let {mall_id} = req.params;
        let newdata = await dbcontroller.getStores(mall_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error : ${e}`})
    }
})

router.get('/get-all-empty-stores', async (req,res) => {
    try {
        let newdata = await dbcontroller.getAllEmptyStores();
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error: `server error:${e}`})
    }
})


module.exports = router;

