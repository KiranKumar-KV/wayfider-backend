const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.post('/add-category', async (req,res) => {
    try{
        let postdata = req.body.data;
        let newdata = await dbcontroller.addCategory(postdata);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
       return res.status(500).send({error:`server error ${e}`});  
    }
})

router.get('/get-all-categories', async (req,res) => {
    try {
        let newdata = await dbcontroller.getAllCategory();
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error:'server error'})
    }
})

router.get('/get-category-by-id/:id', async (req,res) => {
    try {
        let category_id = req.params.id;
        let newdata = await dbcontroller.getCategoryById(category_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`});
    }
})

router.put('/update-category/:id', async (req,res) => {
    try {
        let category_id = req.params.id;
        let postdata = req.body.data;
        let newdata = await dbcontroller.updateCategoryById(category_id,postdata);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error:`server error ${e}`})
    }
})

router.put('/update-category-status/:id', async (req,res) => {
    try {
        let category_id = req.params.id;
        let newdata = await dbcontroller.updateCategoryStatus(category_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e){
        return res.status(500).send({error:`server error ${e}`})
    }
})

module.exports = router;