const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.post('/add-mall-info', async (req, res) => {
    try {
        let postdata = req.body.data;
        let newdata = await dbcontroller.addMallInfo(postdata);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.get('/get-all-mall-info/:user_id', async (req, res) => {
    try {
        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getMallInfoByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getMallInfoByMallId(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }
        // let newdata = await dbcontroller.getAllMallInfo();
        // if(newdata) {
        //     return res.status(200).send(newdata);
        // }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-mall-info-by-id/:mall_info_id', async (req, res) => {
    try {
        let {mall_info_id} = req.params;
        let newdata = await dbcontroller.getMallInfoById(mall_info_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-mall-info-by-mall-id/:mall_id', async (req, res) => {
    try {
        let {mall_id} = req.params;
        let newdata = await dbcontroller.getMallInfoByMallId(mall_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }
})

router.put('/update-mall-info/:mall_info_id', async (req, res) => {
    try {
        let {mall_info_id} = req.params;
        let postdata = req.body.data;
        let newdata = await dbcontroller.updateMallInfo(mall_info_id,postdata);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/delete-mall-info/:mall_info_id', async (req, res) => {
    try {
        let {mall_info_id} = req.params;
        let newdata = await dbcontroller.deleteMallInfo(mall_info_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

module.exports = router;