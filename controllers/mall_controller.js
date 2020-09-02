const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.get('/get-malls', async (req,res)=>{
    try{
         let newdata = await dbcontroller.getMalls();
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e){
        return res.status(500).send({error:`server error ${e}`})
    }
   
})

router.get('/get-malls-by-id/:id', async (req,res)=>{
    try{
        let mall_id = req.params.id;
        let newdata = await dbcontroller.getMallByID(mall_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e){
        return res.status(500).send({error:`server error ${e}`})
    }
   
})

router.post('/add-mall', async (req,res) => {
    try{
        let postdata = req.body;
        let newdata = await dbcontroller.addMall(postdata);
        if(newdata) {
            let mall_id = newdata[0].mall_id;
            let imagetype = 'mall-logo';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="mall-logo-"+randomFileName + ".png";
            req.files.malllogo.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(mall_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send({message : 'mall added successfully'})
                    }
                }
            }) 
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).send({error:`server error ${e}`})
    }
    
})

router.put('/update-mall-status/:id', async (req,res) => {
    try{
        let mall_id  = req.params.id;
        let newdata  = await dbcontroller.updateMallStatus(mall_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e){
        return res.status(500).send({error:`server error ${e}`})
    }
})

router.put('/update-mall-logo', async (req,res) => {
    try {
        let {image_id,mall_id} = req.body;
        let newdata = await dbcontroller.updateMallLogo(image_id);
        if(newdata) {
            let imagetype = 'mall-logo';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="mall-logo-"+randomFileName + ".png";
            req.files.malllogo.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(mall_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send({message : 'mall logo updated'})
                    }
                }
            }) 
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error ${e}`})
    }
})


module.exports = router;