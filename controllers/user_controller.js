const { router, dbcontroller, FILES_PATH } = require("./controller-config");

// Here we are not deleting anything from the database.
// Instead of that we are changing the status to false.

router.post('/add-user', async (req,res) => {
    try {
        let postdata = req.body.data;
        let emailcheck  = await dbcontroller.checkForEmailValidity(postdata.email);
        if(emailcheck.length === 0) {
             let newdata = await dbcontroller.addUser(postdata)
            if(newdata) {
                return res.status(200).send(newdata)
            } 
        }
        else {
            res.status(400).send({error :'email already exists'})
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error:`server error ${e}`})
    }   
})

router.get('/get-all-users/:user_id', async (req,res) => {
    try {
        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getUsersByMall(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getUsersByMall(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }

        // let newdata = await dbcontroller.getAllUsers()
        // if(newdata) {
        //     return res.status(200).send(newdata)
        // }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`})
    } 
})

router.get('/get-users-by-mall/:mall_id', async (req,res) => {
    try {
        let mall_id = req.params.mall_id;
        let newdata = await dbcontroller.getUsersByMall(mall_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`})
    }
})

router.get('/get-user-by-userid/:id', async (req,res) => {
    try {
        let user_id = req.params.id;
        let newdata = await dbcontroller.getUserbyId(user_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`})
    }
})

router.put('/update-user-status-by-id/:id', async (req,res) => {
    try {
        let user_id = req.params.id;
        let newdata = await dbcontroller.updateUserStatus(user_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`})
    }
})

router.put('/update-user/:id', async (req,res) => {
    try {
        let user_id = req.params.id;
        let postdata = req.body.data;
        let newdata = await dbcontroller.updateUser(user_id,postdata);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`})
    }
})

router.put('/change-password/:user_id', async (req,res) => {
    try {
        let {user_id} = req.params;
        let newdata = await dbcontroller.changeUserPassword(user_id)
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error ${e}`});
    }
})

module.exports = router;