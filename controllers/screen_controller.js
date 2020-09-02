const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.post('/add-screen', async (req,res) => {
    try {
        let postdata = req.body.data;
        let newdata = await dbcontroller.addScreen(postdata);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({ error : `server error ${e}`})
    }
})

router.get('/get-all-screens/:user_id', async (req,res) => {
    try {
        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getScreenByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getScreenByMallId(mall_id)
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
        return res.status(500).send({ error : `server error ${e}`});
    }
})

router.get('/get-screen-by-mall/:mall_id', async (req,res) => {
    try {
        let {mall_id} = req.params;
        let newdata = await dbcontroller.getScreenByMallId(mall_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({ error : `server error ${e}`});
    }
})

router.get('/get-screen-by-screen-id/:screen_id', async (req,res) => {
    try {
        let {screen_id} = req.params;
        let newdata = await dbcontroller.getScreenById(screen_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({ error : `server error ${e}`});
    }
})

router.put('/update-screen-status/:screen_id', async (req,res) => {
    try {
        let {screen_id} = req.params;
        let newdata = await dbcontroller.updateScreenStatus(screen_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({ error : `server error ${e}`});
    }
})

module.exports = router;