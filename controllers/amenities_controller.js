const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.get('/get-all-amenities-data/:user_id', async (req,res) =>{
    try {
     let {user_id} = req.params;
     let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);  
        console.log(newd) 
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getAllAmenitiesByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getAllAmenitiesByMallId(mall_id)
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
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    } 
})

router.post('/add-amenities', async (req,res) => {
    try { 
        let {amenities_name,floor_id} = req.body;
        if(req.files) {
            let imagetype = 'amenities';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="amenities-"+randomFileName + ".json";
            req.files.amenities_path.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addAmenities(amenities_name,floor_id,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send(newdata1)
                    }
                }
            }) 
        } 
    }
    catch(e){
        return res.status(500).send({error : `server error : ${e}`})
    }
})

router.get('/get-amenities-by-mall-id/:mall_id', async (req,res) => {
    try {
        
        let {mall_id} = req.params;
        let newdata = await dbcontroller.getAllAmenitiesByMallId(mall_id)
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error : ${e}`})
    }
})

router.get('/get-amenities-by-id/:amenities_id', async (req,res) => {
    try {
        let {amenities_id} = req.params;
        let newdata = await dbcontroller.getAllAmenitiesById(amenities_id)
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({ error : `server error : ${e}`})
    }
})

router.get('/get-amenities/:mall_id', async (req,res) => {
    try {
        let {mall_id} = req.params;
        let newdata = await dbcontroller.getAmenities(mall_id)
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({ error : `server error : ${e}`})
    }
})

router.get('/get-amenities-by-type', async (req,res) => {
    try {
        let {mall_id,amenities_name} = req.body.data;
        let newdata = await dbcontroller.getAmenitiesByType(amenities_name,mall_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error : ${e}`})
    }
})

router.put('/update-amenities-status/:amenities_id', async (req, res) => {
    try {
        let {amenities_id} = req.params;
        let newdata = await dbcontroller.updateAmenitiesStatus(amenities_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error : ${e}`})
    }
})

router.put('/update-amenities', async (req,res) => {
    try{
        console.log("update")
        let {amenities_id, floor_id, amenities_name} = req.body;
         if(req.files) {
            let imagetype = 'amenities';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="amenities-"+randomFileName + ".json";
            req.files.amenities_path.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.updateAmenities(amenities_name,floor_id,fileNameWithExtension,amenities_id);
                    if(newdata1) {
                        return res.status(200).send(newdata1)
                    }
                }
            }) 
        }
        else {
            let newdata1 = await dbcontroller.updateAmenitiesData(amenities_name,floor_id,amenities_id);
            if(newdata1) {
                return res.status(200).send(newdata1)
            }
        } 
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error : ${e}`})
    }
})

module.exports = router;